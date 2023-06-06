<template>
  <div class="container w-full flex flex-col items-center px-8 sm:px-0">
    <div class="text-2xl text-white font-bold mt-4 text-center">
      Découvrez ci-dessous les extensions de lecture intuitive
    </div>
    <div
      class="pt-6 flex flex-col md:flex-row gap-4 justify-center content-center justify-items-center items-center"
    >
      <VideoCard
        :id="lune.id"
        :logged="lune.logged"
        :title="lune.title"
        :description="lune.description"
        :access="lune.access"
        thumbnail="https://i.vimeocdn.com/video/1667518871-2228ca55bdf568194df096c6876503c07d9248133ff0827160642caa79a48803-d_295x166?r=pad"
        :videoUrl="lune.videoUrl"
        :date="currentMonth"
      />

      <VideoCard
        :id="demiLune.id"
        :logged="demiLune.logged"
        :title="demiLune.title"
        :description="demiLune.description"
        :access="demiLune.access"
        :thumbnail="demiLune.thumbnailUrl"
        :videoUrl="demiLune.videoUrl"
        date="previousMonth"
      />
    </div>
  </div>
</template>

<script setup>
import { useAuth } from "~/stores/useAuth";
import { storeToRefs } from "pinia";
import { useHomeVideos } from "~/stores/useHomeVideos";
const { loading, user } = storeToRefs(useAuth());

const videosSyncResult = useSyncVideos();
console.log("videosSyncResult", videosSyncResult);

const defaultVideo = {
  id: "",
  logged: false,
  title: "Vidéo loading ",
  description: "Description loading...",
  access: "",
  thumbnailUrl: "",
  videoUrl: "",
};

const { data } = await storeToRefs(useHomeVideos());

const currentMonth = computed(() => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString("en", {
    month: "2-digit",
  })}/${currentDate.getFullYear()}`;
  return formattedDate;
});

const previousMonth = computed(() => {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 1); // Set the date to the previous month
  const formattedDate = `${currentDate.toLocaleDateString("en", {
    month: "2-digit",
  })}/${currentDate.getFullYear()}`;
  return formattedDate;
});

console.log("data in products sections", data);
const lune = computed(() => {
  return data?.value?.[1] || defaultVideo;
});

const demiLune = computed(() => {
  return data?.value?.[0] || defaultVideo;
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
