<template>
  <Modal @close="$emit('close')">
    <div>Auth Form</div>
    <Login :toPayment="$props.toPayment" />
  </Modal>
</template>

<script setup lang="ts">
defineProps<{
  toPayment?: boolean;
}>();
</script>

<script lang="ts"></script>

<style></style>
