import { defineStore } from "pinia";
import { useAuth } from "./useAuth";

export const useNav = defineStore("useNav", () => {
  const isMenuOpen = ref(false);
  const switchMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };

  return {
    isMenuOpen,
    switchMenu,
  };
});
