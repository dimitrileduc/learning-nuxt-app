<template>
  <div class="global">
    <Header />

    <div id="section-packs">
      <PackCreditsSection />
    </div>
    <About />
    <RdvSection id="section-rdv" />
    <ContactSection />
    <UserVideos v-if="false" />
    <ClientOnly>
      <ConfirmPurchase v-if="showPayment" @close="hidePayment" />
    </ClientOnly>
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

useHead({
  title: "Moon app",
  meta: [{ name: "description", content: "My amazing site." }],
  bodyAttrs: {
    class: "test",
  },
  htmlAttrs: {
    lang: "fr",
  },
});
</script>

<style scoped></style>
