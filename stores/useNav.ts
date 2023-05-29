import { defineStore } from "pinia";
import { useAuth } from "./useAuth";

export const useNav = defineStore("useNav", () => {
  const isMenuOpen = ref(false);
  const switchMenu = () => {
    console.log("switchMenu");
    isMenuOpen.value = !isMenuOpen.value;
  };

  const openMenu = () => {
    console.log("openMenu");
    isMenuOpen.value = true;
  };
  

  return {
    isMenuOpen,
    switchMenu,
    openMenu,
  };
});
