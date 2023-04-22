<template>
  <div
    class="container-fluid w-full px-0 sm:px-2 lg:px-4 pt-0 sm:pt-2 lg:pt-4 border border-red-500 h-20"
    id="app"
  >
    <div class="nav flex flex-row justify-between items-center">
      <div class="menu_button_container">
        <button @click="switchMenu">button</button>
      </div>
      <div class="user_container">
        <div>user_cont</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNav } from "~/stores/useNav";
const { isMenuOpen, switchMenu } = useNav();
</script>
<style scoped>
.container {
  background: none;
}
</style>
