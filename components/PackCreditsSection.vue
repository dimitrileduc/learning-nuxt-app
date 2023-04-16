<template>
  <div class="border">
    <div>Pack Credit</div>
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

<style scoped></style>
