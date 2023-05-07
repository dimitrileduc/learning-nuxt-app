<template>
  <div class="dropdown_container flex items-center justify-center w-full">
    <div
      class="w-full h-screen md:h-auto flex flex-col md:flex-row px-8 lg:max-w-[944px] lg:px-0 md:pb-10"
    >
      <div class="w-full flex flex-col">
        <div
          class="item py-2 hover:font-bold"
          @click="goTo('#section-acceuil')"
        >
          Accueil
        </div>
        <div
          class="item py-2 hover:font-bold"
          @click="goTo('#section-products')"
        >
          Tirages
        </div>
        <div class="item py-2 hover:font-bold" @click="goTo('#section-packs')">
          Crédits
        </div>
        <div class="item py-2 hover:font-bold" @click="goTo('#section-about')">
          About
        </div>
        <div class="item py-2 hover:font-bold" @click="goTo('#section-rdv')">
          Rendez-vous
        </div>
        <div
          class="item py-2 hover:font-bold"
          @click="goTo('#section-contact')"
        >
          Contact
        </div>
      </div>
      <div class="md:mt-0 md:text-right w-full flex flex-col">
        <div v-if="user">
          <div class="item item_right py-2 hover:font-bold">Mon profil</div>
          <div class="item item_right py-2 hover:font-bold">Mes crédits</div>
          <div class="item item_right py-2 hover:font-bold">Mes vidéos</div>
          <div class="item item_right py-2 hover:font-bold">
            <button @click="logout">Se déconnecter</button>
          </div>
        </div>
        <div
          class="icones_group h-full py-2 flex flex-row justify-start md:justify-end gap-2"
          :class="user ? 'items-end' : 'items-start'"
        >
          <nuxt-icon class="text-[42px]" name="youtube" filled />
          <nuxt-icon class="text-[30px]" name="tiktok" filled />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAuth } from "~/stores/useAuth";
import { useNav } from "~/stores/useNav";
const { switchMenu } = useNav();
const { smoothScrollTo } = useSmoothScroll();
const { logout } = useAuth();
const { user } = storeToRefs(useAuth());

const goTo = (id) => {
  switchMenu();
  smoothScrollTo(id);
};
</script>
<style scoped>
.dropdown_container {
  background: rgb(16, 75, 81, 1);
  color: #ffffff;

  font-family: Lato;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.item:hover {
  background: linear-gradient(90deg, #145661 0%, rgba(20, 86, 97, 0) 100%);
}

@media screen and (min-width: 768px) {
  .item_right:hover {
    background: linear-gradient(270deg, #145661 0%, rgba(20, 86, 97, 0) 100%);
  }
}
</style>
