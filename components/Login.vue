<template>
  <div>
    <h1>Log in</h1>
    <button
      class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      @click="handleClick"
      :disabled="loading"
    >
      <span v-if="loading">loading</span>
      <span v-else>Log in with github</span>
    </button>
  </div>
</template>

<script setup>
import { useAuth } from "~/stores/useAuth";
import { usePayment } from "~~/stores/usePayment";
import { storeToRefs } from "pinia";
const { loading, user } = storeToRefs(useAuth());
const { login } = useAuth();

const { showPayment, setShowPayment, amount, setAmount } = usePayment();

const props = defineProps({
  toPayment: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const handleClick = async () => {
  if (props.toPayment) {
    setShowPayment(true);
  }
  await login(props.toPayment);
};
</script>

<style scoped></style>
