<template>
  <div class="border border-red-600">
    <ClientOnly>
      <div v-if="user">User videos {{ data }}</div>
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
</script>

<style scoped></style>
