<template>
  <div
    class="fixed sm:pt-2 lg:pt-4 border h-20 w-full flex px-0 sm:px-2 lg:px-4 justify-center"
  >
    <div class="max-w-[952px] inline-flex border w-full">
      {{ loading }}
      <div v-if="loading">Loading user data...</div>
      <div v-else-if="user"><UserCard /></div>
      <div v-else>
        <button
          class="bg-yellow-400 hover:bg-yellow-500 transition px-2 py-1 font-bold rounded-lg"
          @click="() => (showAuth = !showAuth)"
        >
          Log/sign
        </button>
        <Auth v-if="showAuth" @close="showAuth = false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from "~/stores/useAuth";
import { storeToRefs } from "pinia";
const { user, loading } = storeToRefs(useAuth());
const showAuth = ref(false);

const { logout } = useAuth();
console.log("nav is re render ");
</script>

<style scoped></style>
