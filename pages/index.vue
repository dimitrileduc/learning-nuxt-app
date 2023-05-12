<template>
  <div class="global" id="home">
    <div>
      <Header />
    </div>

    <div id="credits">
      <PackCreditsSection />
    </div>
    <About id="about" />
    <RdvSection id="rdv" />
    <ContactSection id="contacts" />

    <ClientOnly>
      <Checkout v-if="showPayment && user" @close="hidePayment" />
    </ClientOnly>
    <div v-if="showPasswordRecover">
      <ResetPasswordModal @close="showPasswordRecover = false" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuth } from "~/stores/useAuth";
import { usePayment } from "~~/stores/usePayment";

const { loading, user, authEvent } = storeToRefs(useAuth());
const { smoothScrollTo } = useSmoothScroll();

const route = useRoute();
const router = useRouter();

const showPasswordRecover = ref(false);

console.log("route", route);
console.log("route.query", route.query);

watch(
  route,
  async (newRoute, oldRoute) => {
    console.log("route watching", newRoute.name);
    console.log("old route", oldRoute?.name);
    if (newRoute.query.section) {
      if (oldRoute?.name === "index" && newRoute?.name === "index") {
        console.log("direct to section");
        const id = "#" + newRoute.query.section;
        smoothScrollTo(id, 1000, -100);
      }
    }
  },
  { deep: true, immediate: true }
);

onMounted(() => {
  console.log("onMounted");
  if (route.query.section) {
    console.log("onMounted section", route.query.section);
    const id = "#" + route.query.section;
    smoothScrollTo(id, 0);
  }
});

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
