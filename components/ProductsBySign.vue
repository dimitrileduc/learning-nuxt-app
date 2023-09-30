<template>
  <div
    class="container w-full flex flex-col items-center px-8 sm:px-0 z-50 py-12"
  >
    <div class="text-2xl text-white font-bold mt-4 text-center">
      Découvrez ci-dessous les extensions de lecture intuitive
    </div>

    <Select :options="signsOptions" @update="updateSelectedVideo" />
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

type AstrologicalSign =
  | "Bélier"
  | "Taureau"
  | "Gémeaux"
  | "Cancer"
  | "Lion"
  | "Vierge"
  | "Balance"
  | "Scorpion"
  | "Sagittaire"
  | "Capricorne"
  | "Verseau"
  | "Poissons";

const { data } = await storeToRefs(useBySignVideos());

const signsOptions = computed(() => {
  const tagSet = new Set();

  // Iterate through each item in the array and add its tag to the Set
  data.value.forEach((item: AstrologicalSign[]) => {
    if (item.tag) {
      tagSet.add(item.tag);
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

const updateSelectedVideo = (value: AstrologicalSign) => {
  console.log("updateSelectedVideo from emi", value);
  data.value.forEach((item: AstrologicalSign[]) => {
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
