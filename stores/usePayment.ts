import { defineStore } from "pinia";

export const usePayment = defineStore(
  "usePayment",
  () => {
    const showPayment = ref(false);
    const amount = ref(10);
    const setShowPayment = (value: boolean) => {
      console.log("set show payment", value);
      showPayment.value = value;
    };
    const setAmount = (value: number) => {
      console.log("set amount", value);
      amount.value = value;
    };
    return { showPayment, setShowPayment, amount, setAmount };
  },
  {
    persist: true,
  }
);
