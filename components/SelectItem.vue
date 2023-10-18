<template>
  <button
    class="container text-sm w-full py-3 px-4 flex flex-row items-center justify-between group"
    :class="isLast ? 'rounded-b-md' : 'rounded-b-none'"
    @click="updateSelectedValue"
  >
    <div class="h-full flex items-center justify-start gap-x-3">
      <div class="h-full flex items-center justify-center group-hover:hidden">
        <nuxt-img class="w-8" alt="signe" src="/signe.svg" />
      </div>
      <div class="h-full hidden items-center justify-center group-hover:flex">
        <nuxt-img class="w-8" alt="signe" src="/signewhite.svg" />
      </div>

      <div class="text-base capitalize">{{ option }}</div>
    </div>
    <div v-if="access" class="flex items-center justify-end group-hover:hidden">
      <div class="h-full flex items-center justify-center">
        <nuxt-img class="w-6" alt="check" src="/check.svg" />
      </div>
    </div>
    <div class="hidden items-center justify-end group-hover:flex">
      <div class="h-full flex items-center justify-center">
        <nuxt-img class="w-6" alt="add" src="/add.svg" />
      </div>
    </div>
  </button>
</template>
<script setup>
const props = defineProps({
  option: {
    type: String,
    required: true,
  },
  access: {
    type: Boolean,
    required: true,
  },
  isLast: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update"]);

const updateSelectedValue = (value) => {
  emit("update", props.option);
};
</script>

<style scoped>
.container {
  max-width: 100%;
  font-family: Lato;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  color: #104b51;
}

.container:hover {
  background: linear-gradient(90deg, #4fbcdd 0%, #89cfe7 100%);
}
</style>
