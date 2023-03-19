<template>
  <div class="border">
    <div>Pack Credit</div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="user">
      <div>BUY CREDITS DIRECT</div>
    </div>
    <div v-else>
      <button
        class="bg-yellow-400 hover:bg-yellow-500 transition px-4 py-2 font-bold rounded-lg"
        @click="() => (showAuthForm = !showAuthForm)"
      >
        Log/sign and go payment
      </button>
      <AuthForm
        :toPayment="true"
        v-if="showAuthForm"
        @close="showAuthForm = false"
      />
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
const loading = ref(true);
const showAuthForm = ref(false);

watchEffect(() => {
  if (user.value) {
    loading.value = false;
  }
});
</script>

<style scoped></style>
