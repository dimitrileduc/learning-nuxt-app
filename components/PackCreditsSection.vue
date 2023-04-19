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
    <div class="flex flex-col items-center lg:flex-row gap-4">
      <PackCard />
      <PackCard />
      <PackCard />
    </div>
    <div class="w-full">
      <Slider />
      <TestSlider />
    </div>
    <div v-if="false">
      <div v-if="loading">Loading...</div>
      <div v-else-if="user">
        <div>BUY CREDITS DIRECT</div>
      </div>
      <div v-else>
        selected pack: {{ selectedPack }}
        <select v-model="selectedPack">
          <option v-for="pack in packs" :key="pack.id" :value="pack.value">
            {{ pack.label }}
          </option>
        </select>
        <div class="flex inline-flex">
          <Button small primary label="Débloquer small" @click="buyCredits" />
          <Button label="Débloquer la video" @click="buyCredits" />
        </div>
        <button
          class="bg-yellow-400 hover:bg-yellow-500 transition px-4 py-2 font-bold rounded-lg"
          @click="buyCredits"
        >
          Buy credits pack (login before)
        </button>
        <Auth
          :toPayment="true"
          v-if="showAuthForm"
          @close="showAuthForm = false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from "~/stores/useAuth";
import { usePayment } from "~~/stores/usePayment";
import { storeToRefs } from "pinia";
const showAuthForm = ref(false);

const { login, loading, user } = storeToRefs(useAuth());
const { showPayment, setShowPayment, amount, setAmount } = usePayment();

const packs = [
  { id: 1, value: 10, label: "10" },
  { id: 2, value: 20, label: "20" },
  { id: 3, value: 30, label: "30" },
];

const selectedPack = ref(packs[0].value);

const buyCredits = () => {
  // Get our synced ref
  setAmount(selectedPack.value);

  showAuthForm.value = !showAuthForm.value;
};
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
