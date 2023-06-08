import { defineStore } from "pinia";

export const usePayment = defineStore(
  "usePayment",
  () => {
    const toPayment = ref(false);
    const showPayment = ref(false);
    const amount = ref(11);
    const setShowPayment = (value: boolean) => {
      console.log("set show payment", value);
      showPayment.value = value;
    };
    const setAmount = (value: number) => {
      console.log("set amount", value);
      amount.value = value;
    };
    const setToPayment = (value: boolean) => {
      console.log("set to payment", value);
      toPayment.value = value;
    };
    return {
      showPayment,
      setShowPayment,
      amount,
      setAmount,
      toPayment,
      setToPayment,
    };
  },
  {
    persist: true,
  }
);
