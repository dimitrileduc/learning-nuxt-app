<template>
  <div
    class="global w-full xs:w-[328px] sm:w-[360px] lg:w-[464px] bg-white px-3 pt-3 py-8 rounded"
  >
    <div class="image-container w-full">
      <div class="container">
        <div class="image-container">
          <div v-if="unlocked && vimeoID">
            <VimeoPlayer :videoId="vimeoID" />
          </div>

          <div v-else-if="props?.thumbnail">
            <nuxt-img
              alt="sthumbnail"
              class="image w-full object-contain rounded"
              :src="props.thumbnail"
            />
          </div>
        </div>
        <div class="overlay h-full rounded"></div>
        <div class="overlay_left flex">
          <div v-if="!unlocked" class="pt-4 flex">
            <div
              class="flex bg-white py-1 pl-1 pr-2 flex flex-row gap-1 rounded-r-md items-center justify-center"
            >
              <nuxt-img class="w-6 h-6" alt="lune" src="/lune.svg" />
              <div class="">{{ price }} {{ creditsLabel }}</div>
            </div>
          </div>
        </div>
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
          <div class="title font-bold">
            {{ props.title }}
          </div>

          <div v-if="props.date && false" class="date font-bold">
            {{ props.date }}
          </div>
        </div>
        <div
          class="description mt-3 leading-tight text-justify font-normal md:min-h-[139px]"
        >
          {{ decriptionTruncate }}
        </div>
      </div>
      <div v-if="!unlocked" class="button-container w-full flex justify-center">
        <Button
          primary
          :label="buttonLabel"
          @click="unlocked ? playVideo() : displayModalAction()"
        />
      </div>
      <!-- <div
        v-else
        class="button-container w-full flex justify-center h-10"
      ></div> -->

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
import { useUserVideos } from "~/stores/useUserVideos";
import { useBySignVideos } from "~/stores/useBySignVideos";
const { smoothScrollTo } = useSmoothScroll();
const userSupa = useSupabaseUser();
const { refetch } = useHomeVideos();
const { refetchUserVideos } = useUserVideos();

const { pending } = storeToRefs(useHomeVideos());
const { refetchBySigns } = useBySignVideos();

console.log("supaUser", userSupa.value);
const props = defineProps({
  id: {
    type: String || Number,
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
  price: {
    type: Number,
  },
});

console.log("props video", props);

const isVideoPlayed = ref(false);

const creditsLabel = computed(() => {
  return props.price > 1 ? "crédits" : "crédit";
});

const { credits, loading } = await useCredits();

const decriptionTruncate = computed(() => {
  const maxChars = 355; // Maximum number of characters
  const ellipsis = "(...)"; // Ellipsis to add at the end
  const text = props.description;
  // const text =
  //   "On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à leur phase de construction. Plusieurs versions sont apparues avec le temps, parfois par accident, souvent intentionnellement (histoire d'y rajouter de petits clins d'oeil, voire des phrases embarassantes).";

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
    return credits?.value >= props.price
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
      return "Vous devez acheter des crédits pour debloquez cette vidéo";
    case "loggedsufficientCredit":
      const creditsLabels =
        credits.value > 1 ? "crédits disponibles." : "crédit disponible.";
      return "Vous avez actuellement " + credits.value + " " + creditsLabels;
    // return credits?.value < 2
    //   ? "Vous avez actuellement " + credits.value + " crédits disponible. "
    //   : "Vous avez actuellement " + credits.value + " crédits disponibles. ";
    case "loggedInsufficientCredit":
      return "Vous n'avez pas assez de crédits pour débloquer cette vidéo";
    case "unlocked":
      return null;
  }
});

const modalSubtitle = computed(() => {
  switch (modalState.value) {
    case "notLogged":
      return "";
    case "loggedsufficientCredit":
      const creditsLabels = props.price > 1 ? "crédits" : "crédit";
      return (
        "Voulez-vous utiliser" +
        " " +
        props.price +
        " " +
        creditsLabels +
        " pour debloquer cette vidéo ?"
      );
    case "loggedInsufficientCredit":
      const neededCredits = props.price - credits.value;
      const creditString = neededCredits > 1 ? "crédits" : "crédit";
      return (
        "Veuillez acheter " +
        neededCredits +
        " " +
        creditString +
        " pour debloquer cette vidéo"
      );

    case "unlocked":
      return null;
  }
});

const primaryLabelModal = computed(() => {
  switch (modalState.value) {
    case "notLogged":
      return "Acheter des credits";
    case "loggedsufficientCredit":
      return "Acheter cette vidéo";
    case "loggedInsufficientCredit":
      return "Acheter des credits ";
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
      console.log("primaryActionModal, buy vidéo ");

      try {
        const response = await $fetch(
          "/api/videoPurchase/createVideoPurchase",
          {
            method: "POST",
            body: {
              videoID: props.id,
              creditAmount: props.price,
            },
          }
        );

        console.log("response", response);

        if (response.statusCode === 200) {
          // Success: handle response
          const { refetchCredits } = await useCredits();
          refetchCredits();
          refetch();
          refetchUserVideos();
          refetchBySigns();
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
}

.overlay {
  grid-area: 1 / 1 / 3 / 3;
  background: linear-gradient(
    252.77deg,
    #104b51 0%,
    rgba(16, 75, 81, 0) 101.21%
  );
}

.overlay_left {
  grid-area: 1 / 1 / 1/ 1;
  justify-self: start;
  align-self: start;
  color: #104b51;
  font-family: Lato;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.iconContainer {
  justify-self: end;
  align-self: start;
  grid-area: 1 / 1 / 3 / 3;
}
</style>
