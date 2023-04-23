<template>
  <div
    class="global border w-full xs:w-[328px] sm:w-[360px] lg:w-[464px] bg-white px-3 pt-3 py-6 rounded"
  >
    <div class="image-container w-full">
      <div class="container">
        <div class="image-container">
          <img
            class="image w-full object-contain rounded"
            alt=""
            :src="props.thumbnail"
          />
        </div>
        <div class="overlay w-full h-full rounded"></div>
        <div class="iconContainer mr-4 mt-4">
          <nuxt-icon
            class="text-2xl sm:text-[32px]"
            :name="unlocked ? 'unlocked' : 'locked'"
            filled
          />
        </div>
      </div>

      <div class="text-container mt-3 my-6 mx-3 sm:mx-4">
        <div class="flex flex-col sm:flex-row sm:gap-2">
          <div class="title font-bold">{{ props.title }}</div>
          <div class="date font-bold">date field</div>
        </div>
        <div class="description mt-3 leading-tight text-justify font-normal">
          {{ props.description }}
        </div>
      </div>
      <div class="button-container w-full flex justify-center">
        <Button
          primary
          :label="buttonLabel"
          @click="unlocked ? playVideo() : displayModalAction()"
        />
      </div>

      <ActionModal
        v-if="showModal"
        @close="closeModal"
        :title="modalTitle"
        :subTitle="modalSubtitle"
        :primaryLabel="primaryLabelModal"
      />
    </div>
  </div>
</template>

<script setup>
const userSupa = useSupabaseUser();

const { credits, loading } = await useCredits();

console.log("supaUser", userSupa.value);
const props = defineProps({
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

const closeModal = () => {
  console.log("closeModal");
  showModal.value = false;
};

const modalTitle = computed(() => {
  console.log(!userSupa.value && !unlocked.value);
  console.log(!unlocked.value);
  if (!userSupa.value && !unlocked.value) {
    return "Vous devez achetez des credits pour debloquez cette video ( et etre connecte )";
  }
  if (userSupa.value && !unlocked.value) {
    return "vous avez actuellement " + credits.value + " credits. ";
  }
});

const modalSubtitle = computed(() => {
  if (!userSupa.value && !unlocked.value) {
    return "Vous devez vous connectez et achetez 3 credits pour debloquez cette video";
  }
  if (userSupa.value && !unlocked.value) {
    return credits.value > 3
      ? "Vous pouvez debloquez cette video, cliker sur '" +
          primaryLabelModal.value +
          "' cette video' pour confirmer'"
      : "Vous n'avez pas assez de credits. Vous devez achetez des credits pour debloquez cette video";
  }
});

const primaryLabelModal = computed(() => {
  if (!userSupa.value && !unlocked.value) {
    return "Achetez des credits et connectez vous";
  }
  if (userSupa.value && !unlocked.value) {
    return credits.value > 3
      ? "Achetez cette video"
      : "Achetez des credits ( vous etes deja connecte)";
  }
});

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
.icon {
}
</style>
