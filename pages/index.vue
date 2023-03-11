<template>
  <div>
    <h2>Hello</h2>
    <NuxtLink :to="courseLocation"> Go to Courses </NuxtLink>
    <p></p>
    <NuxtLink class="underline font-medium" :href="firstLesson.path">
      Go to firs Lesson
    </NuxtLink>
  </div>
</template>

<script setup>
const courseLocation = "/course";
const firstLesson = await useFirstLesson();
</script>

<style scoped></style>
