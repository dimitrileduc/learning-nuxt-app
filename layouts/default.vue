<template>
  <div class="container w-full">
    <div class="navigation z-20">
      <Navigation />
    </div>

    <div class="body w-full">
      <div class="bg-green-100 w-screen relative">
        <div
          class="dropdown-container fixed top-0 z-10 flex items-center justify-center"
          :class="{ hidden: !isMenuOpen }"
        >
          <div class="">
            <DropDownMenu />
          </div>
        </div>
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

const { isMenuOpen } = storeToRefs(useNav());
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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  /* Add other styles for the dropdown container */
}

/* Add CSS for the Body content */
.body {
  /* Add styles for the body component */
}

/* Add CSS for the Content component */
.content {
  position: relative;
  z-index: 0;
  /* Add other styles for the content component */
}
</style>
