<template>
  <div class="container z-50">
    <div class="relative xs:w-[328px] sm:w-[360px] lg:w-[464px]">
      <!-- Dropdown toggle button -->

      <button
        @click="isOpen"
        class="bg-white rounded-md w-full p-4 flex items-center justify-between"
      >
        <div class="flex justify-start items-center gap-3">
          <div
            v-if="selectedValue !== 'Sélectionnez un signe astrologique'"
            class="h-full flex items-center justify-center group-hover:hidden"
          >
            <nuxt-img
              class="w-6 h-6"
              alt="signe"
              :src="'/' + removeAccents(selectedValue) + '.svg'"
            />
          </div>
          <span
            class="mr-4"
            :class="
              selectedValue !== 'Sélectionnez un signe astrologique'
                ? 'capitalize'
                : 'normal-case'
            "
            >{{ selectedValue }}</span
          >
        </div>
        <nuxt-img class="w-6" alt="select" src="/arrowSelect.svg" />
      </button>

      <!-- Dropdown menu -->
      <div
        v-show="show"
        class="absolute right-0 pt-1 -mt-1 bg-white rounded-b-md shadow-xl w-full"
      >
        <div
          v-for="option in options"
          :key="option.value"
          class="flex items-center"
        >
          <SelectItem
            :option="option.tag"
            @update="updateSelectedValue"
            :access="option.access"
            :isLast="option.isLast"
          />
          <!-- <div
            class="block px-4 py-2 text-sm"
            @click="updateSelectedValue(option)"
          >
            {{ option }}
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update"]);

const show = ref(false);
const isOpen = () => (show.value = !show.value);
const selectedValue = ref("Sélectionnez un signe astrologique");

const updateSelectedValue = (value) => {
  selectedValue.value = value;
  emit("update", value);
  isOpen();
};

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
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
</style>
