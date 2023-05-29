<template>
  <div class="content">
    <div class="top-border h-0 sm:h-2 lg:h-4 w-full"></div>
    <div class="sm:px-2 lg:px-4">
      <div
        class="nav w-full flex items-center justify-center"
        :class="navBgClass"
      >
        <div
          class="container-nav w-full px-8 lg:max-w-[944px] lg:px-0 py-6"
          id="app"
        >
          <div class="flex flex-row justify-between items-center">
            <div class="flex items-center justify-center">
              <div class="flex items-center justify-center" v-if="isMenuOpen">
                <button
                  class="flex items-center justify-center"
                  @click="closeMenu"
                >
                  <nuxt-img class="h-8" alt="youtube" src="/close_menu.svg" />
                </button>
              </div>
              <div class="flex items-center justify-center" v-else>
                <button
                  class="flex items-center justify-center"
                  @click="switchMenu"
                >
                  <nuxt-img class="h-8" alt="youtube" src="/menu_icon.svg" />
                </button>
              </div>
            </div>

            <div class="user_container">
              <div
                v-if="user"
                class="cursor-pointer"
                :class="
                  isMenuOpen ? 'pointer-events-none' : 'pointer-events-auto'
                "
                @click="switchMenuFromRight"
              >
                <UserCard @hideAuth="hideAuth" />
              </div>
              <div v-else class="flex flex-row">
                <button @click="() => (showAuth = !showAuth)">
                  <div
                    class="flex items-center justify-center gap-4 opacity-80 hover:opacity-100"
                  >
                    <div class="text-white font-bold">Connexion</div>

                    <div class="flex items-center justify-center">
                      <nuxt-img class="h-8" alt="youtube" src="/user.svg" />
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

const { switchMenu, closeMenu, openMenu } = useNav();
const { user, loading } = storeToRefs(useAuth());
const { isMenuOpen } = storeToRefs(useNav());

const { isScrolledToTop } = useScroll();

const showAuth = ref(false);
const { logout } = useAuth();

const hideAuth = () => {
  console.log("hide auth from child");
  showAuth.value = false;
};

const navBgClass = computed(() => {
  if (isMenuOpen.value) {
    return "nav-solid";
  } else if (isScrolledToTop.value) {
    return "nav-transparent";
  } else {
    return "nav-alpha";
  }
});

const switchMenuFromRight = () => {
  console.log(isMenuOpen.value, "isMenuOpen");
  if (isMenuOpen.value) {
  } else {
    console.log("switchMenuFromRight");
    switchMenu();
  }
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

.nav {
  transition: background-color 0.5s ease;
}

.nav-solid {
  background-color: rgb(16, 75, 81, 1);
}

.nav-alpha {
  background-color: rgb(16, 75, 81, 0.9);
}
</style>
