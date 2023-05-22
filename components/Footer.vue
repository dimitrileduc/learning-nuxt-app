<template>
  <div class="lg:px-4 lg:pb-4 bg-white">
    <div
      class="container-interne flex flex-col items-center pt-12 lg:pt-14 pb-6 md:pb-8"
    >
      <div>
        <nuxt-img alt="footer" src="/footer_center.svg" />
      </div>
      <div
        class="mt-12 flex flex-row items-center justify-items-center gap-4 md:gap-10"
      >
        <div class="text-center text-sm">Accueil</div>
        <div class="text-center text-sm">Tirages</div>
        <div class="text-center text-sm">Credits</div>
        <div class="text-center text-sm">About</div>
        <div class="text-center text-sm">Contacts</div>
      </div>
      <div
        class="icones_group mt-10 flex flex-row items-center justify-items-center gap-4"
      >
        <nuxt-img class="h-8" alt="youtube" src="/youtube.svg" />
        <nuxt-img class="h-8" alt="youtube" src="/tiktok.svg" />
      </div>
      <div class="px-2 mt-3 text-center text-xs text-white">
        Termes et conditions
      </div>
      <div class="px-2 mt-2 text-center text-xs text-white">
        Copyright 2023 - Moon Energy. All rights reserved.
      </div>
    </div>
    <div class="hidden md:flex absolute bottom-4 left-4">
      <div>
        <nuxt-img alt="footer" src="/footer_left.svg" />
      </div>
    </div>
    <div class="hidden md:flex absolute bottom-4 right-4">
      <div>
        <nuxt-img alt="footer" src="/footer_right.svg" />
      </div>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
</script>

<style scoped>
.container-interne {
  color: #cfe4ba;
  position: relative;

  font-family: Lato;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;

  background: radial-gradient(50% 50% at 50% 50%, #145661 0%, #104b51 100%);
  border-radius: 10px 10px 0px 0px;
}

.my-div::before,
.my-div::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
}

.my-div::before {
  background-image: url(tiktok.svg);
}

.my-div::after {
  background-image: url(image2.jpg);
}
</style>
