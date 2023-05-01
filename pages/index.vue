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
      <Checkout v-if="showPayment && user" @close="hidePayment" />
    </ClientOnly>
    <div v-if="showPasswordRecover">
      <ResetPasswordModal @close="showPasswordRecover = false" />
    </div>
  </div>
</template>

<script setup>
import { useAuth } from "~/stores/useAuth";
import { usePayment } from "~~/stores/usePayment";

const { loading, user, authEvent } = storeToRefs(useAuth());

const showPasswordRecover = ref(false);

watchEffect(() => {
  if (authEvent.value) {
    if (authEvent.value === "PASSWORD_RECOVERY") {
      showPasswordRecover.value = true;
    }
    console.log("authEvent listen in index", authEvent.value);
  }
});

const { setShowPayment } = usePayment();

import { storeToRefs } from "pinia";

const { query } = useRoute();

const { showPayment } = storeToRefs(usePayment());

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
