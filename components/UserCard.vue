<template>
  <div v-if="user" class="rounded p-3 flex items-center space-x-3 bg-gray-100">
    <img
      class="rounded-full w-10 h-10 border-2 border-blue-400"
      :src="profile"
    />
    <div class="text-right">
      <div class="font-medium">{{ name }}</div>
      <div v-if="loading">loading</div>
      <div v-if="credits">Credits: {{ credits }}</div>
      <button class="text-blue-500" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from "~/stores/useAuth";
import { storeToRefs } from "pinia";
const { user } = storeToRefs(useAuth());

const { logout } = useAuth();

const name = computed(() => user.value?.user_metadata.full_name);
const profile = computed(() => user.value?.user_metadata.avatar_url);
const { credits, loading } = await useCredits();
console.log(credits, "credits");
</script>
