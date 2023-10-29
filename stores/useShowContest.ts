import { defineStore } from "pinia";
import { useAuth } from "./useAuth";

export const useShowContest = defineStore("useShowContest", () => {
  const isModalContestOpen = ref(true);
  
  function closeIsModalContestOpen() {
    isModalContestOpen.value = false;
  }
  

  return {
    isModalContestOpen,
    closeIsModalContestOpen,
  };
});