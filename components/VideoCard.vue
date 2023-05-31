<template>
  <div
    class="global w-full xs:w-[328px] sm:w-[360px] lg:w-[464px] bg-white px-3 pt-3 py-6 rounded"
  >
    <div class="image-container w-full">
      <div class="container">
        <div class="image-container">
          <div v-if="unlocked && vimeoID">
            <VimeoPlayer :videoId="vimeoID" />
          </div>

          <div v-else-if="props.thumbnail">
            <nuxt-img
              alt="thumbnail"
              format="webp"
              class="image w-full object-contain rounded"
              :src="props.thumbnail"
            />
          </div>
          <div v-else>
            <nuxt-img
              alt="sthumbnail"
              format="webp"
              class="image w-full object-contain rounded"
              src="https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-network-placeholder-png-image_3416659.jpg"
            />
          </div>
        </div>
        <div class="overlay w-full h-full rounded"></div>
        <div class="iconContainer mr-4 mt-4">
          <nuxt-icon
            class="text-2xl sm:text-[40px]"
            :name="unlocked ? 'unlocked' : 'locked'"
            filled
          />
        </div>
      </div>

      <div class="text-container mt-3 my-6 mx-3 sm:mx-4">
        <div class="flex flex-col sm:flex-row sm:gap-2">
          <div class="title font-bold">{{ props.title }}</div>
          <div v-if="props.date" class="date font-bold">{{ props.date }}</div>
        </div>
        <div class="description mt-3 leading-tight text-justify font-normal">
          {{ decriptionTruncate }}
        </div>
      </div>
      <div
        v-show="!unlocked"
        class="button-container w-full flex justify-center"
      >
        <Button
          primary
          :label="buttonLabel"
          @click="unlocked ? playVideo() : displayModalAction()"
        />
      </div>

      <ActionModal
        class="w-full sm:w-[400px]"
        v-if="showModal && !pending"
        @close="closeModal"
        :title="modalTitle"
        :subTitle="modalSubtitle"
        :primaryLabel="primaryLabelModal"
        @primaryAction="primaryActionModal"
      />
      <ActionModal
        class="w-full sm:w-[400px]"
        v-if="showStatusModal"
        @close="closeStatusModal"
        :title="statusModalMessage"
      />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useHomeVideos } from "~/stores/useHomeVideos";
const { smoothScrollTo } = useSmoothScroll();
const userSupa = useSupabaseUser();
const { refetch } = useHomeVideos();

const { pending } = storeToRefs(useHomeVideos());

console.log("supaUser", userSupa.value);
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "Default description",
  },
  access: {
    type: Boolean,
    default: false,
  },
  logged: {
    type: Boolean,
    default: false,
  },
  thumbnail: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  date: {
    type: String,
  },
});

console.log("props video", props);

const { credits, loading } = await useCredits();

const decriptionTruncate = computed(() => {
  const maxChars = 350; // Maximum number of characters
  const ellipsis = "(...)"; // Ellipsis to add at the end
  const text = props.description;

  if (text.length > maxChars) {
    return text.substring(0, maxChars) + ellipsis;
  } else {
    return text;
  }
});

const vimeoID = computed(() => {
  if (!props?.videoUrl) return null;
  const regex = /vimeo\.com\/(\d+)/;
  const match = props?.videoUrl.match(regex);
  if (match) {
    console.log("match", match[1]);
    return match[1];
  }
  return null;
});

const unlocked = computed(() => {
  return props.access && props.logged;
});

const buttonLabel = computed(() => {
  if (unlocked.value) {
    return "Regarder la vidéo";
  } else {
    return "Débloquer la vidéo";
  }
});

const showModal = ref(false);

const showStatusModal = ref(false);
const statusModalMessage = ref("");

const closeStatusModal = () => {
  showStatusModal.value = false;
};

const closeModal = () => {
  console.log("closeModal");
  showModal.value = false;
};

const modalState = computed(() => {
  if (!userSupa.value && !unlocked.value) {
    return "notLogged";
  }

  console.log("credits", credits);

  if (userSupa.value && !unlocked.value) {
    return credits?.value > 0
      ? "loggedsufficientCredit"
      : "loggedInsufficientCredit";
  }
  if (userSupa.value && unlocked.value) {
    return "unlocked";
  }
});

const modalTitle = computed(() => {
  switch (modalState.value) {
    case "notLogged":
      return "Vous devez achetez des credits pour debloquez cette video ( et etre connecte )";
    case "loggedsufficientCredit":
      return (
        "Vous avez actuellement " + credits.value + " credits disponibles. "
      );
    case "loggedInsufficientCredit":
      return "Vous n'avez pas assez de credits pour débloquer cette vidéo";
    case "unlocked":
      return null;
  }
});

const modalSubtitle = computed(() => {
  switch (modalState.value) {
    case "notLogged":
      return "Vous devez vous connectez et achetez 3 credits pour debloquez cette video";
    case "loggedsufficientCredit":
      return "Vous pouvez debloquez cette video, cliker sur 'Achetez cette video' pour confirmer";
    case "loggedInsufficientCredit":
      return "Veuillez achetez 1 crédit pour accéder à cette vidéo";
    case "unlocked":
      return null;
  }
});

const primaryLabelModal = computed(() => {
  switch (modalState.value) {
    case "notLogged":
      return "Achetez des credits et connectez vous";
    case "loggedsufficientCredit":
      return "Achetez cette video";
    case "loggedInsufficientCredit":
      return "Achetez des credits ";
    case "unlocked":
      return null;
  }
});

const primaryActionModal = async () => {
  switch (modalState.value) {
    case "notLogged":
      console.log("primaryActionModal, user not logged ");
      closeModal();
      smoothScrollTo("#credits", 1000, -100);
      break;
    case "loggedsufficientCredit":
      console.log("primaryActionModal, buy video ");
      try {
        const response = await $fetch(
          "/api/videoPurchase/createVideoPurchase",
          {
            method: "POST",
            body: {
              videoID: props.id,
              creditAmount: 1,
            },
          }
        );

        console.log("response", response);

        if (response.statusCode === 200) {
          // Success: handle response
          const { refetchCredits } = await useCredits();
          refetchCredits();
          refetch();
          statusModalMessage.value = "Vidéo debloquée avec succès";
        } else {
          // Error: handle response

          statusModalMessage.value = "Il y a eu une erreur lors l'achat";
        }
      } catch (error) {
        // Catch error from endpoint request
        statusModalMessage.value = "Il y a eu une erreur lors l'achat";
        console.error("Endpoint request error:", error);
      }
      closeModal();
      showStatusModal.value = true;
      break;
    case "loggedInsufficientCredit":
      console.log("primaryActionModal, logged,buy credits ");
      closeModal();
      smoothScrollTo("#credits", 1000, -100);
      break;
    case "unlocked":
      console.log("primaryActionModal , playvideo");
      break;
  }
};

const displayModalAction = () => {
  console.log("displayModalAction");
  showModal.value = true;
};

const playVideo = () => {
  console.log("playVideo");
};
</script>

<style scoped>
.global {
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
  font-family: Lato;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
}

.title {
  color: #104b51;
}

.date {
  color: #104b51;
}
.description {
  color: #104b51;
}
.image-container {
  grid-area: 1 / 1 / 3 / 3;
}

.image {
  height: 247px;
}

.overlay {
  grid-area: 1 / 1 / 3 / 3;
  background: linear-gradient(
    252.77deg,
    #104b51 0%,
    rgba(16, 75, 81, 0) 101.21%
  );
}

.iconContainer {
  justify-self: end;
  align-self: start;
  grid-area: 1 / 1 / 3 / 3;
}
</style>
