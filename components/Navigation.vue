<template>
  <div class="content">
    <div class="top-border h-0 sm:h-2 lg:h-4 w-full"></div>
    <div class="sm:px-2 lg:px-4">
      <div
        class="w-full flex items-center justify-center"
        :style="{
          background: isMenuOpen
            ? 'rgb(16, 75, 81, 1)'
            : 'rgb(16, 75, 81, 0.9)',
        }"
      >
        <div
          class="container-nav w-full px-8 h-20 lg:max-w-[944px] lg:px-0"
          id="app"
        >
          <div class="nav flex flex-row justify-between items-center h-full">
            <div class="icones_group flex items-center justify-center">
              <button @click="switchMenu">
                <nuxt-icon
                  v-if="isMenuOpen"
                  class="text-[32px]"
                  name="close"
                  filled
                />
                <nuxt-icon v-else class="text-[32px]" name="menu" filled />
              </button>
            </div>

            <div class="user_container">
              <div v-if="user"><UserCard @hideAuth="hideAuth" /></div>
              <div v-else class="flex flex-row">
                <button @click="() => (showAuth = !showAuth)">
                  <div class="flex items-center justify-center gap-4">
                    <div class="text-white hover:font-bold">Connexion</div>

                    <div>
                      <nuxt-icon class="text-[40px]" name="user" filled />
                    </div>
                  </div>
                </button>

                <AuthModal v-if="showAuth" @close="showAuth = false" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useNav } from "~/stores/useNav";
import { useAuth } from "~/stores/useAuth";

const { switchMenu } = useNav();
const { user, loading } = storeToRefs(useAuth());
const { isMenuOpen } = storeToRefs(useNav());

const showAuth = ref(false);
const { logout } = useAuth();

const hideAuth = () => {
  console.log("hide auth from child");
  showAuth.value = false;
};
</script>
<style scoped>
.content {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
.top-border {
  background-color: #eaf4f4;
}
</style>
