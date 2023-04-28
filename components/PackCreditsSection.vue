<template>
  <div class="container_packs border py-10 px-10 flex flex-col items-center">
    <div class="font-bold text-2xl text-center">
      Recharge tes Moons maintenant
    </div>
    <div class="details mt-4 mb-8 text-center leading-tight max-w-[712px]">
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
      nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut
      wisi enim ad minim veniam.
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
  { id: 1, creditsValue: 1, price: 9.9, label: "Lune" },
  { id: 2, creditsValue: 2, price: 17.9, label: "Univers" },
  { id: 3, creditsValue: 3, price: 25.9, label: "30" },
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
