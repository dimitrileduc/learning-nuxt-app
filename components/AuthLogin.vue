<script setup lang="ts">
import { useAuth } from "~/stores/useAuth";
import { usePayment } from "~~/stores/usePayment";
const supabase = useSupabaseAuthClient();

const { loginWithEmail } = useAuth();
const { showPayment, setShowPayment, amount, setAmount } = usePayment();

const message = ref("");

const props = defineProps({
  toPayment: {
    type: Boolean,
    required: false,
    default: false,
  },
  existingEmail: {
    type: String,
    required: false,
  },
});

async function submit(data: any) {
  console.log("submit", data);
  if (props.toPayment) {
    setShowPayment(true);
  }
  const { success, error } = await loginWithEmail(data.email, data.password);
  if (success) {
    console.log("log in success");
  } else {
    console.log("log in failed");
  }
}
</script>

<template>
  <div class="">
    <div class="text-3xl pb-9 flex justify-center">Connexion</div>
    propsTopayment LOGIN : {{ props.toPayment }}
    <AuthForm
      @submit="submit"
      type="logIn"
      :existingEmail="props?.existingEmail"
    />
    <div>{{ message }}</div>
  </div>
</template>
