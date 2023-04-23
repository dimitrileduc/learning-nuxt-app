<template>
  <Modal @close="$emit('close')">
    <div class="bg-slate-200 p-8 rounded-xl w-full">
      <div>{{ props.title }}</div>

      <div>{{ props.subTitle }}</div>
      <div v-if="props.primaryLabel">
        <Button @click="handlePrimaryClick" :label="props.primaryLabel" />
      </div>

      <div v-if="props.secondaryLabel">
        <Button @click="handleSecondaryClick">{{
          props.secondaryLabel
        }}</Button>
      </div>
    </div>
  </Modal>
</template>

<script setup>
const { smoothScrollTo } = useSmoothScroll();
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

const emits = defineEmits(["close"]);

const handlePrimaryClick = () => {
  emits("close");
  smoothScrollTo("#section-packs", 1000, -100);
};
</script>
