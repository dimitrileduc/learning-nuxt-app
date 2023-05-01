<template>
  <div class="top-border h-0 sm:h-2 lg:h-4 w-full"></div>
  <div
    class="container-nav w-full px-0 sm:px-2 lg:px-4 border border-red-500 h-20"
    id="app"
  >
    <div
      class="nav flex flex-row justify-between items-center border border-green-400 h-full"
      :style="{
        background: isMenuOpen
          ? 'rgb(16, 75, 81, 0.9)'
          : 'rgb(16, 75, 81, 0.9)',
      }"
    >
      <div class="menu_button_container">
        <button @click="switchMenu">button</button>
      </div>
      <div class="user_container">
        <div v-if="loading">Loading user data...</div>
        <div v-else-if="user"><UserCard @hideAuth="hideAuth" /></div>
        <div v-else>
          <button
            class="bg-yellow-400 hover:bg-yellow-500 transition px-2 py-1 font-bold rounded-lg"
            @click="() => (showAuth = !showAuth)"
          >
            Log/sign
          </button>
          {{ showAuth }}
          <AuthModal v-if="showAuth" @close="showAuth = false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useNav } from "~/stores/useNav";
import { useAuth } from "~/stores/useAuth";

const { isMenuOpen, switchMenu } = useNav();
const { user, loading } = storeToRefs(useAuth());

const showAuth = ref(false);
const { logout } = useAuth();

const hideAuth = () => {
  console.log("hide auth from child");
  showAuth.value = false;
};
</script>
<style scoped>
.top-border {
  background-color: #eaf4f4;
}
</style>
