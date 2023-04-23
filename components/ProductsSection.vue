<template>
  <ClientOnly>
    <div
      class="container border w-full flex flex-col items-center px-8 sm:px-0"
    >
      <div class="text-2xl text-white font-bold mt-4 text-center">
        Découvre tout de suite les extensions des derniers tirages
      </div>

      <div
        class="pt-6 flex flex-col md:flex-row gap-4 justify-center content-center justify-items-center items-center"
      >
        <VideoCard
          :logged="lune.logged"
          :title="lune.title"
          description="lune.description"
          :access="lune.access"
          :thumbnail="lune.thumbnailUrl"
          :videoUrl="lune.vidoUrl"
        />
        <VideoCard
          :logged="demiLune.logged"
          :title="demiLune.title"
          description="demiLune.description"
          :access="demiLune.access"
          :thumbnail="demiLune.thumbnailUrl"
          :videoUrl="demiLune.videoUrl"
        />
      </div>
      <div v-if="true">
        <div class="mt-6" />
        <div v-if="user">Derniers tirage user logged {{ data }}</div>
        <div v-else>Derniers tirage guest {{ data }}</div>

        <div>products subtitle</div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { useAuth } from "~/stores/useAuth";
import { storeToRefs } from "pinia";
import { useHomeVideos } from "~/stores/useHomeVideos";
const { loading, user } = storeToRefs(useAuth());

const { data } = storeToRefs(useHomeVideos());

const lune = computed(() => {
  return data.value.find((item) => item.title === "lune");
});

const demiLune = computed(() => {
  return data.value.find((item) => item.title === "demiLune");
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
