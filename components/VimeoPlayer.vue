<template>
  {{ props.videoID }}
  <div class="vimeo-player-container">
    <vueVimeoPlayer
      ref="player"
      :video-id="props.videoId.toString()"
      @ready="onReady"
      :key="width"
      class="vimeo-player"
      :options="options"
    />
  </div>
</template>

<script setup>
import { vueVimeoPlayer } from "vue-vimeo-player";

const props = defineProps({
  videoId: {
    type: Number,
    required: true,
  },
});

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
