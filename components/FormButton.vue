<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div>
    <button class="form_button">{{ props.label }}</button>
  </div>
</template>

<style scoped>
.form_button {
  background: rgb(4, 111, 72);
  background: linear-gradient(
    90deg,
    rgba(4, 111, 72, 1) 0%,
    rgba(7, 224, 146, 1) 100%
  );
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;

  font-weight: 500;
  cursor: pointer;
  width: 100%;
}
</style>
