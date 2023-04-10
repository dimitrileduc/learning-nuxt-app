<template>
  <div>
    <h2>Hello in home</h2>
    {{ showPayment }}

    <Hero />
    <ProductsSection />
    <PackCreditsSection />
    <UserVideos />
    <ConfirmPurchase v-if="showPayment" @close="hidePayment" />
  </div>
</template>

<script setup>
import { useAuth } from "~/stores/useAuth";
import { usePayment } from "~~/stores/usePayment";

import { storeToRefs } from "pinia";

const { query } = useRoute();

const { showPayment } = storeToRefs(usePayment());
const { setShowPayment } = usePayment();

const hidePayment = () => {
  setShowPayment(false);
};
</script>

<style scoped></style>
