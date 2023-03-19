<template>
  <div class="border">
    <div v-if="loading">Loading user data...</div>
    <div v-else-if="user"><UserCard /></div>
    <div v-else>
      <button
        class="bg-yellow-400 hover:bg-yellow-500 transition px-4 py-2 font-bold rounded-lg"
        @click="() => (showAuthForm = !showAuthForm)"
      >
        Log/sign
      </button>
      <AuthForm v-if="showAuthForm" @close="showAuthForm = false" />
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
const showAuthForm = ref(false);
const loading = ref(true);

watchEffect(() => {
  if (user.value) {
    loading.value = false;
  }
});
</script>

<style scoped></style>
