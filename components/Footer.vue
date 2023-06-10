<template>
  <div class="lg:px-4 lg:pb-4 bg-white">
    <div
      class="container-interne flex flex-col items-center pt-12 lg:pt-14 pb-6 md:pb-8"
    >
      <div>
        <nuxt-img alt="footer" src="/footer_center.svg" />
      </div>
      <div
        class="mt-12 flex flex-col md:flex-row items-center justify-items-center gap-2 md:gap-10"
      >
        <div class="text-center text-sm">
          <NuxtLink
            class="w-full h-full"
            :to="{ path: '/', query: { section: 'home' } }"
            ><div class="w-full h-full py-2">Accueil</div></NuxtLink
          >
        </div>
        <div class="text-center text-sm">
          <NuxtLink
            class="w-full"
            :to="{ path: '/', query: { section: 'tirages' } }"
            ><div class="w-full py-2">Tirages</div></NuxtLink
          >
        </div>
        <div class="text-center text-sm">
          <NuxtLink
            class="w-full"
            :to="{ path: '/', query: { section: 'credits' } }"
            ><div class="w-full py-2">Crédits</div></NuxtLink
          >
        </div>
        <div class="text-center text-sm">
          <NuxtLink
            class="w-full"
            :to="{ path: '/', query: { section: 'about' } }"
            ><div class="w-full py-2">Qui suis-je</div></NuxtLink
          >
        </div>
        <div class="text-center text-sm">
          <NuxtLink
            class="w-full"
            :to="{ path: '/', query: { section: 'rdv' } }"
            ><div class="w-full py-2">Rendez-vous</div></NuxtLink
          >
        </div>
        <div class="text-center text-sm">
          <NuxtLink
            class="w-full"
            :to="{ path: '/', query: { section: 'contacts' } }"
            ><div class="w-full py-2">Contact</div></NuxtLink
          >
        </div>
      </div>
      <div
        class="icones_group mt-10 flex flex-row items-center justify-items-center gap-4"
      >
        <button class="cursor-pointer" @click="goYoutbe">
          <nuxt-img class="h-8" alt="youtube" src="/youtube.svg" />
        </button>
        <nuxt-img v-if="false" class="h-8" alt="youtube" src="/tiktok.svg" />
      </div>
      <div class="px-2 mt-3 text-center text-xs text-white flex flex-col">
        <NuxtLink class="w-full h-full pt-3" :to="{ path: '/cgv' }"
          ><div class="w-full h-full">Termes et conditions</div></NuxtLink
        >
        <NuxtLink class="w-full h-full" :to="{ path: '/confidentialite' }"
          ><div class="w-full h-full pb-3 pt-1">
            Politique de confidentialité
          </div></NuxtLink
        >
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

const goYoutbe = () => {
  window.open("https://www.youtube.com/@moonenergy3259");
};
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
