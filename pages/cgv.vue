<template>
  <div class="w-full bg-white">
    <div class="w-full bg-white">
      <PageHeader>
        <div class="flex flex-col items-center justify-center text-center">
          <div v-if="title" class="text-3xl">{{ title }}</div>
          <div v-if="subtitle" class="mt-2">{{ subtitle }}</div>
        </div>
      </PageHeader>
      <div class="w-full h-80 bg-white"></div>
    </div>
  </div>
</template>

<script setup>
const title = "CGV";

const subtitle = "Conditions générales de vente";
</script>

<style scoped></style>
