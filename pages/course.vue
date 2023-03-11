<template>
  <div>
    <div class="text-3xl font-bold">
      <div class="mb-4 flex justify-between items-center w-full">
        <h1 class="text-3xl">
          <span class="font-medium">
            <span class="font-bold">{{ course.title }}</span>
          </span>
        </h1>
        <UserCard />
      </div>
      <!-- <div class="prose mb-12">
        <h1>
          <span class="font-medium"
            >Course:
            <span class="font-bold">{{ title }}</span>
          </span>
        </h1>
      </div> -->

      <div class="flex flex-row justify-center flex-grow text-left">
        <div
          class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] max-w-[30ch] flex flex-col"
        >
          <h3 class="space-y-1 mb-4 text-gray-500">Chapters</h3>
          <div
            class="space-y-1 mb-4 ml-2 flex flex-col"
            v-for="chapter in course.chapters"
            :key="chapter.slug"
          >
            <h4>{{ chapter.title }}</h4>
            <NuxtLink
              v-for="(lesson, index) in chapter.lessons"
              :key="lesson.slug"
              class="flex flex-row space-x-1 ml-2 no-underline prose-sm text-base py-1"
              :to="lesson.path"
              :class="{
                'text-blue-500': lesson.path === $route.fullPath,
                'text-gray-600': lesson.path !== $route.fullPath,
              }"
            >
              <span class="text-gray-500">{{ index + 1 }}.</span>
              <span>{{ lesson.title }}</span>
            </NuxtLink>
          </div>
        </div>

        <div class="prose p-12 bg-white rounded-md w-[65ch]">
          <NuxtErrorBoundary>
            <NuxtPage />

            <template #error="{ error }">
              <div class="text-base">
                <p>
                  Oh no, something broke when loading the lesson!
                  <code>{{ error }}</code>
                </p>
                <p>
                  <button
                    class="hover:cursor-pointer"
                    @click="clearError(error)"
                  >
                    Go to the first lesson
                  </button>
                </p>
              </div>
            </template>
          </NuxtErrorBoundary>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <template>
  <div class="relative h-16 ">
    <div class=" inset-x-0 top-0 h-16 text-center text-5xl font-bold shadow-md">
      <h1>COURSE: Mastering NUXT 3</h1>
    </div>
  </div>

  <div class="flex min-h-screen flex-row bg-gray-100 text-gray-800">
    <aside class="sidebar w-48 -translate-x-full transform bg-white p-4 transition-transform duration-150 ease-in md:translate-x-0 md:shadow-md">
      <div class="my-4 w-full border-b-4 border-indigo-100 text-center">
        <span class="font-mono text-xl font-bold tracking-widest"> <span class="text-indigo-600">COURSE</span> CHAPTERS </span>
      </div>
      <div class="my-4"></div>
    </aside>
    <main class="main -ml-48 flex flex-grow flex-col p-4 transition-all duration-150 ease-in md:ml-0">
      <div class="flex h-full items-center justify-center bg-white text-center text-5xl font-bold shadow-md">
        <h2>Lessons</h2>
      </div>
    </main>
  </div>
</template> -->

<script setup>
const course = await useCourse();
console.log(course);
const firstLesson = useFirstLesson();
definePageMeta({
  layout: "default",
});

const clearError = async (err) => {
  // Go to the first lesson
  await navigateTo(firstLesson.path);
  err.value = null;
};
</script>

<style scoped></style>
