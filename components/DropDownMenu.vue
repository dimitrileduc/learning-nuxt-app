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
          <NuxtLink to="/">Acceuil</NuxtLink>
        </div>
        <div
          class="item py-2 hover:font-bold"
          @click="goTo('#section-products')"
        >
          <NuxtLink to="/">Tirages</NuxtLink>
        </div>
        <div class="item py-2 hover:font-bold" @click="goTo('#section-packs')">
          <NuxtLink to="/">Credits</NuxtLink>
        </div>
        <div class="item py-2 hover:font-bold" @click="goTo('#section-about')">
          <NuxtLink to="/">About</NuxtLink>
        </div>
        <div class="item py-2 hover:font-bold" @click="goTo('#section-rdv')">
          <NuxtLink to="/">Rendez-vous</NuxtLink>
        </div>
        <div
          class="item py-2 hover:font-bold"
          @click="goTo('#section-contact')"
        >
          <NuxtLink to="/">Contacts</NuxtLink>
        </div>
      </div>
      <div class="md:mt-0 md:text-right w-full flex flex-col">
        <div v-if="user">
          <div class="item item_right py-2 hover:font-bold">Mon profil</div>
          <div class="item item_right py-2 hover:font-bold">Mes crédits</div>
          <div class="item item_right py-2 hover:font-bold">Mes vidéos</div>
          <div class="item item_right py-2 hover:font-bold">
            <button @click="logoutAndSwitchMenu">Se déconnecter</button>
          </div>
        </div>
        <div
          class="icones_group h-full py-2 flex flex-row justify-start md:justify-end gap-2"
          :class="user ? 'items-end' : 'items-start'"
        >
          <nuxt-icon class="text-[40px]" name="youtube" filled />
          <nuxt-icon class="text-[40px]" name="tiktok" filled />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAuth } from "~/stores/useAuth";
import { useNav } from "~/stores/useNav";
const route = useRoute();
const router = useRouter();
const { switchMenu } = useNav();
const { smoothScrollTo } = useSmoothScroll();
const { logout } = useAuth();
const { user } = storeToRefs(useAuth());

const logoutAndSwitchMenu = () => {
  logout();
  switchMenu();
};

const goTo = (id) => {
  switchMenu();
  console.log(id);
  if (route.name === "index") return smoothScrollTo(id, 1000);
};
</script>
<style scoped>
.dropdown_container {
  background-color: rgb(16, 75, 81, 1);
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
