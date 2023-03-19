<template>
  <div class="border">
    <div>Welcolme</div>
    <div v-if="user">{{ name }}</div>
    <div v-else>guest</div>
    <div>hero subtitle</div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
const name = computed(() => user.value?.user_metadata.full_name);
</script>

<style scoped></style>
