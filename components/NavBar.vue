<template>
  <div class="border">
    {{ loading }}
    <div v-if="loading">Loading user data...</div>
    <div v-else-if="user"><UserCard /></div>
    <div v-else>
      <button
        class="bg-yellow-400 hover:bg-yellow-500 transition px-4 py-2 font-bold rounded-lg"
        @click="() => (showAuth = !showAuth)"
      >
        Log/sign
      </button>
      <Auth v-if="showAuth" @close="showAuth = false" />
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
