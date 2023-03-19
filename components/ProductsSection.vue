<template>
  <div class="border">
    <div v-if="user">Derniers tirage user logged</div>
    <div v-else>Derniers tirage guest</div>
    <div>products subtitle</div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
</script>

<style scoped></style>
