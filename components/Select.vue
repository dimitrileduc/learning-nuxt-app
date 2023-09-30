<template>
  <div>
    <div class="relative border w-full">
      <!-- Dropdown toggle button -->
      options : {{ options }}
      <button
        @click="isOpen"
        class="flex items-center p-2 text-black bg-white rounded-md"
      >
        <span class="mr-4">{{ selectedValue }}</span>
      </button>

      <!-- Dropdown menu -->
      <div
        v-show="show"
        class="absolute right-0 py-2 mt-2 bg-white rounded-md shadow-xl w-44"
      >
        <div
          v-for="option in options"
          :key="option.value"
          class="flex items-center p-2 hover:bg-gray-100 hover:cursor-pointer"
        >
          <div
            class="block px-4 py-2 text-sm"
            @click="updateSelectedValue(option)"
          >
            {{ option }}
          </div>
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
</script>
