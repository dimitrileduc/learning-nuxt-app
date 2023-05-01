<script setup lang="ts">
import { useAuth } from "~/stores/useAuth";
import { usePayment } from "~~/stores/usePayment";
const supabase = useSupabaseAuthClient();

const { loginWithEmail } = useAuth();
const { showPayment, setShowPayment, amount, setAmount } = usePayment();

const emit = defineEmits(["close"]);

const errorMessage = ref("");

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
  setShowPayment(false);
  console.log("submit", data);

  const { success, error } = await loginWithEmail(data.email, data.password);
  if (success) {
    if (props.toPayment) {
      setShowPayment(true);
      emit("close");
    }
    console.log("log in success");
  }
  if (error) {
    errorMessage.value = error.message;
    console.log("log in failed");
  }
}
</script>

<template>
  <div class="">
    <AuthForm
      @submit="submit"
      type="logIn"
      :existingEmail="props?.existingEmail"
    />
    <div class="mt-2 w-full flex items-center text-center text-sm">
      <button class="label_button w-full" @click="$emit('resetPassword')">
        Mot de passe oublié ?
      </button>
    </div>
    <div>{{ message }}</div>
    <div v-if="errorMessage" class="error-box py-4">
      <div class="error-message">
        <div class="text-red-400 p-2 rounded text-sm">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.label_button {
  text-decoration-line: underline;
}
</style>
