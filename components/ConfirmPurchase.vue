<template>
  <Modal @close="$emit('close')">
    <div class="bg-slate-200 p-8 rounded-xl w-full">
      {{ showPayment }}
      <div
        v-if="success"
        class="flex flex-col justify-center items-center space-y-6"
      >
        <h2 class="text-xl font-bold">Thanks for buying the course!</h2>
        <button
          @click="login"
          class="mt-4 w-full text-md text-black h-12 px-16 rounded focus:outline-none focus:shadow-outline flex items-center justify-center transition bg-blue-300 hover:bg-blue-200"
        >
          Login with Github to access
        </button>
      </div>
      <form v-else @submit.prevent="handleSubmit">
        <h2 class="font-bold text-xl text-center">Buying</h2>
        <div class="mt-8 text-base width bg-white py-6 px-8 rounded shadow-md">
          <div class="w-full flex justify-between items-center mb-8">
            <label class="font-bold"> Email </label>
            <input
              class="input ml-6 focus:outline-none text-left w-full"
              type="email"
              autocomplete="email"
              v-model="email"
              placeholder="your@email.com"
              required
            />
          </div>

          <div class="w-full h-6" id="card-element"></div>
        </div>

        <button
          class="font-sans mt-4 w-full text-lg text-black h-12 px-16 rounded focus:outline-none focus:shadow-outline font-bold flex items-center justify-center transition"
          :class="
            processingPayment || email === ''
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-yellow-300 hover:bg-yellow-200 cursor-pointer'
          "
          :disabled="processingPayment || email === ''"
        >
          <Loading v-if="processingPayment" class="h-5 w-5" />
          <div v-else>Pay {{ amount }}</div>
        </button>
      </form>
    </div>
  </Modal>
</template>

<script setup>
import { usePayment } from "~~/stores/usePayment";
const config = useRuntimeConfig();
const stripe = ref(null);
const card = ref(null);
const email = ref("");
const processingPayment = ref(false);
const success = ref(false);
const cardElement = ref(null);

const { refetch } = await useCredits();

const { showPayment, setShowPayment, amount, setAmount } = usePayment();

// The tab is closed and reopened (we're still in the same session)
console.log("cached", amount, typeof amount);

const formStyle = {
  base: {
    width: "100px",
    height: "50px",
    fontSize: "16px",
    color: "#3d4852",
    "::placeholder": {
      color: "#8795a1",
    },
  },
};

const elements = computed(() => stripe.value?.elements());

const setupStripe = async () => {
  if (!config.public.stripeKey) {
    console.error("Stripe public key not found in Nuxt configuration");
    return;
  }

  if (stripe.value) {
    console.log("Stripe already initialized");
    return;
  }

  if (typeof Stripe === "undefined") {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return await setupStripe();
  }

  stripe.value = Stripe(config.public.stripeKey);

  if (elements.value && !card.value) {
    // Update the cardElement variable to reference the cardElement ref in the component's scope
    cardElement.value = elements.value.create("card", {
      style: formStyle,
    });
    // Mount the card element to the DOM using the cardElement ref
    cardElement.value.mount("#card-element");
    card.value = cardElement.value;
  }
};

const handleSubmit = async () => {
  if (email.value === "") {
    return;
  }

  processingPayment.value = true;
  let secret;

  try {
    // Create a PaymentIntent with the order amount and currency
    const response = await $fetch("/api/stripe/paymentIntent", {
      method: "POST",
      body: {
        email: email.value,
        amount: amount,
      },
    });
    secret = response;
  } catch (e) {
    console.log(e);
  }

  try {
    const response = await stripe.value.confirmCardPayment(secret, {
      payment_method: {
        card: card.value,
      },
      receipt_email: email.value,
    });

    if (response.paymentIntent.status === "succeeded") {
      success.value = true;

      // test purpose as webhook dont work on localhost
      await $fetch("/api/local/updatePurchase", {
        method: "POST",
        body: {
          email: email.value,
          amount: parseInt(amount),
          verified: true,
          stripeId: response.paymentIntent.id,
        },
      });
      setAmount(10);
      await refetch();
    }
  } catch (e) {
    console.log(e);
  } finally {
    processingPayment.value = false;
  }
};

useHead({
  script: [
    {
      src: "https://js.stripe.com/v3/",
      onload: setupStripe,
    },
  ],
});
</script>
