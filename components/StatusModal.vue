<template>
  <Modal @close="$emit('close')">
    <div>{{ props.message }}</div>
  </Modal>
</template>

<script setup>
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
});
</script>
