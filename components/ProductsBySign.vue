<template>
  <div
    class="container w-full flex flex-col items-center px-8 sm:px-0 z-50 py-12"
  >
    <div class="text-2xl text-white font-bold mt-4 text-center">
      <span class="text-[#CFE4BA]">Nouveau ! </span>
      <span>Découvrez aussi la tendance 2024 par signe astrologique</span>
    </div>
    <div class="mt-3 max-w-[710px] text-white text-base text-center">
      <span class="font-bold"
        >Envie d’en savoir plus sur un signe astrologique précis ?
      </span>
      Afin d'en savoir plus sur les énergies du moment pour lever des blocages,
      éclairer des zones d’ombres et pour recevoir les messages qui vous
      permettent de
      <span class="font-bold"
        >vous positionner concrètement dans votre vie.</span
      >
    </div>

    <div class="mt-10">
      <div class="hidden md:flex">
        <Select :options="signsOptions" @update="updateSelectedVideo" />
      </div>
      <div class="flex md:hidden">
        <SelectMobile :options="signsOptions" @update="updateSelectedVideo" />
      </div>
    </div>
    <div
      class="pt-6 flex flex-col md:flex-row gap-4 justify-center content-center justify-items-center items-center"
    >
      <ClientOnly>
        <VideoCard
          v-if="selectedVideo"
          :id="selectedVideo.id"
          :logged="selectedVideo.logged"
          :title="selectedVideo.title"
          :description="selectedVideo.description"
          :access="selectedVideo.access"
          :thumbnail="selectedVideo.thumbnailUrl"
          :videoUrl="selectedVideo.videoUrl"
          :date="currentMonth"
        />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "~/stores/useAuth";
import { storeToRefs } from "pinia";
import { useBySignVideos } from "~/stores/useBySignVideos";
const { loading, user } = storeToRefs(useAuth());

type AstroObject = {
  tag: AstrologicalSign;
  access: Boolean;
};

type AstrologicalSign =
  | "belier"
  | "taureau"
  | "gemeaux"
  | "cancer"
  | "lion"
  | "vierge"
  | "balance"
  | "scorpion"
  | "sagittaire"
  | "capricorne"
  | "verseau"
  | "poisson";

const { data } = await storeToRefs(useBySignVideos());

const signsOptions = computed(() => {
  const tagSet = new Set();

  // Iterate through each item in the array and add its tag to the Set
  data.value.forEach((item: AstroObject, index: number) => {
    if (item.tag) {
      const isLast = index === data.value.length - 1;
      tagSet.add({ tag: item.tag, access: item.access, isLast: isLast });
    }
  });
  // Convert the Set back to an array
  return Array.from(tagSet);
});

console.log("video by signs from store in product by sign", data);

const defaultVideoData = {
  id: "",
  logged: false,
  title: "Vidéo loading ",
  description: "Description loading...",
  access: "",
  thumbnailUrl: "",
  videoUrl: "",
};

const defaultVideo = computed(() => {
  return data?.value?.[0] || defaultVideoData;
});

const selectedVideo = ref(defaultVideo.value);

const updateSelectedVideo = (value: AstroObject) => {
  console.log("updateSelectedVideo from emi", value);
  data.value.forEach((item: any) => {
    if (item.tag === value) {
      selectedVideo.value = item;
    }
  });
};

const currentMonth = computed(() => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString("en", {
    month: "2-digit",
  })}/${currentDate.getFullYear()}`;
  return formattedDate;
});
</script>

<style scoped>
.container {
  max-width: 100%;
  font-family: Lato;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
</style>
