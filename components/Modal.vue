<template>
  <Teleport to="body">
    <div
      class="modal backdrop-blur-l backdrop-brightness-50 w-100vw h-100vh flex flex-col justify-center items-center fixed inset-0 z-50"
      @click.self="$emit('close')"
    >
      <slot />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
//backdrop-blur-xl backdrop-brightness-50
const previousOverflow = ref("");
onMounted(() => {
  // Lock the scrollbar by removing overflow if we have any
  previousOverflow.value = document.body.style.overflow;
  document.body.style.overflow = "hidden";
});

onBeforeUnmount(() => {
  // Restore the overflow and position
  document.body.style.overflow = previousOverflow.value;
});
</script>

<style scoped>
.modal {
  z-index: 100;
  background-color: rgb(16, 75, 81, 0.7);
}
</style>
