<template>
  <div class="global">
    <Header />
    <div v-if="false">
      {{ showPayment }}
    </div>

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

<style scoped>
.global {
}
</style>
