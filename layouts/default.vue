<template>
  <div class="container w-full">
    <div class="navigation z-20">
      <Navigation />
    </div>

    <div class="body w-full">
      <div class="bg-green-100 w-screen relative">
        <div
          class="dropdown-container fixed top-0 z-10 w-full pt-20 md:pt-22 lg:pt-24 px-0 sm:px-2 lg:px-4"
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
