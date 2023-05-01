<template>
  <Teleport to="body">
    <Modal @close="$emit('close')">
      <div class="bg-slate-200 p-8 rounded-xl w-full">
        <div v-if="verifying">Verifiying payment ...</div>
        <div
          v-else-if="success"
          class="flex flex-col justify-center items-center space-y-6"
        >
          <h2 class="text-xl font-bold">Thanks for buying the course!</h2>
        </div>
        <form v-else @submit.prevent="handleSubmit">
          <h2 class="font-bold text-xl text-center">Buying</h2>
          <div
            class="mt-8 text-base width bg-white py-6 px-8 rounded shadow-md"
          >
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
            {{ status }}
            <div class="w-full" id="payment-element">
              <!-- Mount the Payment Element here -->
            </div>
          </div>

          <button
            class="font-sans mt-4 w-full text-lg text-black h-12 px-16 rounded focus:outline-none focus:shadow-outline font-bold flex items-center justify-center transition"
            :class="
              processingPayment
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-yellow-300 hover:bg-yellow-200 cursor-pointer'
            "
            :disabled="processingPayment"
          >
            <Loading v-if="processingPayment" class="h-5 w-5" />
            <div v-else>Pay {{ amount }}</div>
          </button>
        </form>
      </div>
    </Modal>
  </Teleport>
</template>

<script setup>
import { useAuth } from "~/stores/useAuth";
import { usePayment } from "~~/stores/usePayment";
const config = useRuntimeConfig();
const stripe = ref(null);
const card = ref(null);
const email = ref("");
const processingPayment = ref(false);
const success = ref(false);
const paymentElement = ref(null);
const verifying = ref(false);

const userSupa = useSupabaseUser();

console.log("supaUser", userSupa.value);

const { refetchCredits } = await useCredits();

const { showPayment, setShowPayment, amount, setAmount } = usePayment();

const status = ref("idle");

// Access the current route
const route = useRoute();

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
const options = {
  mode: "payment",
  currency: "eur",
  amount: 1099,
};

const elements = computed(() => stripe.value?.elements(options));

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
    console.log("stripeundifned");
    await new Promise((resolve) => setTimeout(resolve, 100));
    return await setupStripe();
  }

  stripe.value = Stripe(config.public.stripeKey);

  console.log("stripe", stripe.value);

  if (elements.value && !card.value) {
    // Update the cardElement variable to reference the cardElement ref in the component's scope
    paymentElement.value = elements.value.create("payment");
    // Mount the card element to the DOM using the cardElement ref
    paymentElement.value.mount("#payment-element");
    card.value = paymentElement.value;
  }
};

watch(
  route,
  async (value) => {
    console.log("route changed", value);
    const clientSecret = value.query.payment_intent_client_secret;
    if (clientSecret) {
      console.log("clientSecret from route:", clientSecret);
      // Call the checkStatus function with the retrieved clientSecret value
      await setupStripe();
      await checkStatus(clientSecret);
    }
  },
  { deep: true, immediate: true }
);

const handleSubmit = async () => {
  if (!userSupa.value) {
    return;
  }

  const { error: submitError } = await elements.value.submit();
  status.value = "processing";
  processingPayment.value = true;
  if (submitError) {
    console.log("error stripe in form");
    handleError(submitError);
    return;
  }
  let secret;

  try {
    // Create a PaymentIntent with the order amount and currency
    console.log(email, amount, typeof amount);
    const response = await $fetch("/api/stripe/paymentIntent", {
      method: "POST",
      body: {
        email: userSupa.value.email,
        amount: parseInt(amount),
      },
    });
    secret = response;
  } catch (e) {
    console.log(e);
  }

  console.log("elements before confirm", elements.value);
  console.log("stripe", stripe.value);

  const { error } = await stripe.value.confirmPayment({
    elements: elements.value,
    clientSecret: secret,
    confirmParams: {
      return_url: "https://moonenergy.netlify.app/",
    },
    receipt_email: userSupa.value.email,
    //Uncomment below if you only want redirect for redirect-based payments
    redirect: "if_required",
  });

  if (error?.type === "card_error" || error?.type === "validation_error") {
    console.log("error stripe in confirme", error);
    status.value = error?.message;
    processingPayment.value = false;
    return;
  } else if (error) {
    console.log("An unexpected error occured.", error);

    status.value = error?.message;
    processingPayment.value = false;
    return;
  }
  checkStatus(secret);
};

async function checkStatus(clientSecret) {
  verifying.value = true;
  console.log("checkStatus", clientSecret);
  console.log("stripe in checkStatus", stripe.value);
  if (!clientSecret) {
    return;
  }

  const { paymentIntent } = await stripe.value.retrievePaymentIntent(
    clientSecret
  );

  console.log("paymentIntent in check status", paymentIntent);

  switch (paymentIntent.status) {
    case "succeeded":
      console.log("Payment succeed ! ");
      status.value = "Payment success ! ";
      success.value = true;
      console.log(userSupa.value.email, amount, paymentIntent.id);

      // for test - desactive when use webhook stripe
      await $fetch("/api/local/updatePurchase", {
        method: "POST",
        body: {
          email: userSupa.value.email,
          amount: parseInt(amount),
          verified: true,
          stripeId: paymentIntent.id,
        },
      });
      // reset defaut pack amount
      setAmount(10);
      await refetchCredits();
      break;
    case "processing":
      console.log("Your payment is processing.");
      status.value = "Your payment is processing.";

      break;
    case "requires_payment_method":
      console.log("Your payment was not successful, please try again.");
      status.value = "Your payment was not successful, please try again.";

      break;

    default:
      console.log("Something went wrong.");
      status.value = "Something went wrong.";

      break;
  }
  verifying.value = false;
  processingPayment.value = false;
}

useHead({
  script: [
    {
      src: "https://js.stripe.com/v3/",
      onload: setupStripe,
    },
  ],
});
</script>
