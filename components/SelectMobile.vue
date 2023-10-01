<template>
  <div class="container">
    <div class="relative xs:w-[328px] sm:w-[360px] lg:w-[464px]">
      <!-- Dropdown toggle button -->

      <button
        @click="isOpen"
        class="bg-white rounded-md w-full p-4 flex items-center justify-between"
      >
        <span class="mr-4 capitalize">{{ selectedValue }}</span>
        <nuxt-img class="w-6" alt="select" src="/arrowSelect.svg" />
      </button>

      <!-- Dropdown Modal menu -->

      <div v-if="show" class="">
        <Modal @close="$emit('close')">
          <div class="w-screen h-screen p-8 flex items-center justify-center">
            <div class="w-full h-auto bg-white rounded-md flex flex-col">
              <button
                @click="isOpen"
                class="bg-white rounded-md w-full p-4 flex items-center justify-between"
              >
                <span class="mr-4 capitalize text-[#104b51]">{{
                  selectedValue
                }}</span>
                <nuxt-img class="w-6" alt="select" src="/close_menu.svg" />
              </button>
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
              </div>
              <!-- <div
                class="w-full bg-[#EAF4F4] flex items-center justify-center py-5 rounded-b-md"
              >
                <Button
                  primary
                  label="Sélectionner"
                  @click="updateSelectedValue(option.tag)"
                />
              </div> -->
            </div>
          </div>
        </Modal>
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
