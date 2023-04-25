<template>
  <div class="vimeo-player-container">
    <vueVimeoPlayer
      ref="player"
      :video-id="videoID"
      @ready="onReady"
      :key="width"
      class="vimeo-player"
      :options="options"
    />
  </div>
</template>

<script setup>
import { vueVimeoPlayer } from "vue-vimeo-player";

const videoID = "814000175";
const options = {
  responsive: true,
  title: false,
};

const playerRef = ref(null);
const playerReady = ref(false);

const onReady = () => {
  playerReady.value = true;
};

const play = () => {
  playerRef.value.play();
};

const pause = () => {
  playerRef.value.pause();
};
</script>

<style scoped></style>
