<template>
  <div class="container_packs py-10 px-10 flex flex-col items-center">
    <div class="font-bold text-2xl text-center">
      Packs extension(s) de lecture intuitive
    </div>
    <div class="details mt-4 mb-8 text-center leading-tight max-w-[712px]">
      <span class="font-bold">Rechargez ici vos crédits</span> afin d'en savoir
      plus sur les énergies du moment pour lever des blocages, éclairer des
      zones d’ombre et pour recevoir les messages qui vous permettent de vous
      <br /><span class="font-bold">
        positionner concrètement dans votre vie.</span
      >
    </div>
    <div class="w-full sm:max-w-[644px] lg:max-w-[944px]">
      <SwiperBox :packs="packs" />
    </div>

    <div>
      <div v-if="loading">Loading...</div>
      <div v-else></div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAuth } from "~/stores/useAuth";

const { login, loading, user } = storeToRefs(useAuth());

const packs = [
  { id: 1, creditsValue: 1, price: 11, type: "lune_pack", title: "Lune" },
  { id: 2, creditsValue: 2, price: 20, type: "univers", title: "Planète" },
  { id: 3, creditsValue: 3, price: 27, type: "galaxie", title: "Galaxie" },
];
</script>

<style scoped>
.container_packs {
  background-color: #eaf4f4;
  color: #104b51;

  font-family: Lato;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
</style>
