<template>
  <div class="border border-red-600 flex items-center justify-center">
    <ClientOnly>
      <div class="max-w-[944px]" v-if="user">
        <div
          class="flex flex-col md:flex-row flex-wrap gap-4 justify-center content-center justify-items-center items-center"
        >
          <div v-for="video in data" :key="video.id">
            <VideoCard
              :id="video.id"
              :logged="true"
              :title="video.title"
              :description="video.description"
              :access="true"
              :videoUrl="video.url"
            />
          </div>
        </div>
      </div>

      <div v-else>there is no video as user not logged {{ data }}</div>
    </ClientOnly>
  </div>
</template>

<script setup>
import { useAuth } from "~/stores/useAuth";
import { storeToRefs } from "pinia";
import { useUserVideos } from "~/stores/useUserVideos";
const { loading, user } = storeToRefs(useAuth());

const { data } = storeToRefs(useUserVideos());
console.log(data, "data");
</script>

<style scoped></style>
