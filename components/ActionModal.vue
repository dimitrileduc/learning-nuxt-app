<template>
  <Modal @close="$emit('close')">
    <div
      class="bg-white p-8 py-14 container text-[#104B51] w-full sm:max-w-[375px] rounded"
    >
      <div class="image flex justify-center">
        <nuxt-img alt="hero" class="justify-center w-32" src="/hero.svg" />
      </div>
      <div class="mt-6 text-2xl font-semibold flex justify-center text-center">
        <div>{{ props.title }}</div>
      </div>
      <div
        class="mt-6 w-full flex flex-col items-center pt-1 text-center gap-4"
      >
        <div>{{ props.subTitle }}</div>
        <div v-if="props.primaryLabel">
          <Button
            primary
            @click="handlePrimaryClick"
            :label="props.primaryLabel"
          />
        </div>

        <div v-if="props.secondaryLabel">
          <Button @click="handleSecondaryClick">{{
            props.secondaryLabel
          }}</Button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  primaryLabel: {
    type: String,
  },
  secondaryLabel: {
    type: String,
  },
});

const emits = defineEmits(["close,primaryAction"]);

const handlePrimaryClick = () => {
  emits("primaryAction");
};
</script>

<style scoped>
.container {
  max-width: none !important;
}
</style>
