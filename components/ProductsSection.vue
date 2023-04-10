<template>
  <div class="border">
    <ClientOnly>
      <div v-if="user">Derniers tirage user logged {{ data }}</div>
      <div v-else>Derniers tirage guest {{ data }}</div>
    </ClientOnly>
    <div>products subtitle</div>
  </div>
</template>

<script setup>
import { useAuth } from "~/stores/useAuth";
import { storeToRefs } from "pinia";
import { useHomeVideos } from "~/stores/useHomeVideos";
const { loading, user } = storeToRefs(useAuth());

const { data } = storeToRefs(useHomeVideos());
</script>

<style scoped></style>
