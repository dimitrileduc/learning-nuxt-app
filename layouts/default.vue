<template>
  <div class="container w-full">
    <div class="navigation z-20">
      <Navigation />
      <div class="cookies_control">
        <CookiesConsent />
      </div>
    </div>

    <div class="body w-full">
      <div class="bg-green-100 w-screen">
        <Transition>
          <div
            class="dropdown-container fixed top-0 z-10 w-full pt-20 md:pt-22 lg:pt-24 px-0 sm:px-2 lg:px-4"
            v-if="isMenuOpen"
          >
            <div ref="dropdown" class="">
              <DropDownMenu />
            </div>
          </div>
        </Transition>
        <div class="content relative z-0 flex-1">
          <slot />
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useNav } from "~/stores/useNav";
import { onClickOutside } from "@vueuse/core";

const { isMenuOpen } = storeToRefs(useNav());
const { switchMenu } = useNav();

const dropdown = ref(null);

onClickOutside(dropdown, (event) => switchMenu());
</script>

<style scoped>
/* Add CSS for the Navigation component */
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  /* Add other styles for the navigation component */
}

/* Add CSS for the DropdownMenu component */
.dropdown-container {
  position: fixed;

  z-index: 10;
  /* Add other styles for the dropdown container */
}

/* Add CSS for the Body content */

/* Add CSS for the Content component */
.content {
  position: relative;
  z-index: 0;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
