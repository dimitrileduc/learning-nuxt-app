<template>
  <div class="ex_container w-full">
    <div class="px-0 sm:px-2 lg:px-4 w-full">
      <div class="border w-full flex items-center justify-center">
        <div class="slot_container w-full text-center pt-8 pb-9">
          <div class="px-8">
            <div v-if="props.title" class="title font-bold text-2xl">
              {{ props.title }}
            </div>
            <div
              v-if="props.subtitle"
              class="subtitle mt-4 w-full flex items-center justify-center"
            >
              <div class="max-w-[712px]">{{ props.subtitle }}</div>
            </div>
            <div class="border mt-10"><slot></slot></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "Title",
  },
  subtitle: {
    type: String,
  },
});
</script>

<style scoped>
.ex_container {
  background-color: #eaf4f4;
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  color: #104b51;
}
</style>
