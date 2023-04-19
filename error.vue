<template>
  <NuxtLayout>
    <h1 class="text-4xl font-bold">404</h1>
    <p class="text-xl">Custom error page</p>
    <p>
      <code>{{ error.message }}</code>
    </p>
    <p>
      Go to the
      <a class="hover:cursor-pointer" @click="handleError"> first lesson. </a>
    </p>
  </NuxtLayout>
</template>

<script setup>
const error = useError();
const handleError = () => {
  clearError({
    redirect:
      "/course/chapter/1-chapter-1/lesson/1-introduction-to-typescript-with-vue-js-3",
  });
};
</script>
