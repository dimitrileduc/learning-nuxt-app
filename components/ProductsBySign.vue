<template>
  <div
    class="container w-full flex flex-col items-center px-8 sm:px-0 z-50 pb-12"
  >
    <div
      class="text-[24px] text-white font-bold mt-4 text-center flex flex-col items-center justify-center"
    >
      <div class="text-[#CFE4BA]">Nouveau !</div>
      <div>Découvrez ici les projections du 1er semestre 2024</div>
      <div>Signe par signe</div>
    </div>
    <div class="mt-3 max-w-[710px] text-white text-base text-center">
      Sélectionne le signe de ton choix et découvre les prévisions des 6
      premiers mois 2024
    </div>

    <div class="mt-4">
      <div class="hidden md:flex z-50">
        <Select :options="signsOptions" @update="updateSelectedVideoTag" />
      </div>
      <div class="flex md:hidden z-50">
        <SelectMobile
          :options="signsOptions"
          @update="updateSelectedVideoTag"
        />
      </div>
    </div>
    <div
      class="mt-6 flex flex-col md:flex-row gap-4 justify-center content-center justify-items-center items-center"
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
          :price="2"
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
console.log("video by signs initialized from productsBySign component", data);

const { selectedVideoTag } = storeToRefs(useBySignVideos());
const { updateSelectedVideoTag } = useBySignVideos();

const signsOptions = computed(() => {
  const tagSet = new Set();
  if (!data.value) return;
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

// make a computed to get selectedVideo from selectedVideoTag
const selectedVideo = computed(() => {
  if (!data.value) return;
  return data.value.find((item: any) => item.tag === selectedVideoTag.value);
});

// const signsOptions = computed(() => {
//   const tagSet = new Set();

//   // Iterate through each item in the array and add its tag to the Set
//   data.value.forEach((item: AstroObject, index: number) => {
//     if (item.tag) {
//       const isLast = index === data.value.length - 1;
//       tagSet.add({ tag: item.tag, access: item.access, isLast: isLast });
//     }
//   });
//   // Convert the Set back to an array
//   return Array.from(tagSet);
// });

// const defaultVideoData = {
//   id: "",
//   logged: false,
//   title: "Vidéo loading ",
//   description: "Description loading...",
//   access: "",
//   thumbnailUrl: "",
//   videoUrl: "",
// };

// const defaultVideo = computed(() => {
//   return data?.value?.[0] || defaultVideoData;
// });

// const selectedVideo = ref(null);

// const updateSelectedVideo = (value: AstroObject) => {
//   console.log("updateSelectedVideo from emi", value);
//   data.value.forEach((item: any) => {
//     if (item.tag === value) {
//       selectedVideo.value = item;
//     }
//   });
// };

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
