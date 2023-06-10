<template>
  <div class="dropdown_container flex items-center justify-center w-full">
    <div
      class="w-full h-screen md:h-auto flex flex-col md:flex-row px-8 lg:max-w-[944px] lg:px-0 md:pb-10"
    >
      <div class="w-full flex flex-col">
        <div
          class="w-full item pl-3 hover:font-bold h-full"
          @click="switchMenu"
        >
          <NuxtLink
            class="w-full h-full"
            :to="{ path: '/', query: { section: 'home' } }"
            ><div class="w-full h-full py-2">Accueil</div></NuxtLink
          >
        </div>
        <div class="separator_container w-full">
          <nuxt-img
            class="w-full"
            alt="separator"
            src="/menu_item_separator.svg"
          />
        </div>
        <div class="item pl-3 hover:font-bold w-full" @click="switchMenu">
          <NuxtLink
            class="w-full"
            :to="{ path: '/', query: { section: 'tirages' } }"
            ><div class="w-full py-2">Tirages</div></NuxtLink
          >
        </div>
        <div class="separator_container w-full">
          <nuxt-img
            class="w-full"
            alt="separator"
            src="/menu_item_separator.svg"
          />
        </div>
        <div class="item pl-3 hover:font-bold w-full" @click="switchMenu">
          <NuxtLink
            class="w-full"
            :to="{ path: '/', query: { section: 'credits' } }"
            ><div class="w-full py-2">Crédits</div></NuxtLink
          >
        </div>
        <div class="separator_container w-full">
          <nuxt-img
            class="w-full"
            alt="separator"
            src="/menu_item_separator.svg"
          />
        </div>
        <div class="item pl-3 hover:font-bold w-full" @click="switchMenu">
          <NuxtLink
            class="w-full"
            :to="{ path: '/', query: { section: 'about' } }"
            ><div class="w-full py-2">Qui suis-je</div></NuxtLink
          >
        </div>
        <div class="separator_container w-full">
          <nuxt-img
            class="w-full"
            alt="separator"
            src="/menu_item_separator.svg"
          />
        </div>
        <div class="item pl-3 hover:font-bold w-full" @click="switchMenu">
          <NuxtLink
            class="w-full"
            :to="{ path: '/', query: { section: 'rdv' } }"
            ><div class="w-full py-2">Rendez-vous</div></NuxtLink
          >
        </div>
        <div class="separator_container w-full">
          <nuxt-img
            class="w-full"
            alt="separator"
            src="/menu_item_separator.svg"
          />
        </div>
        <div class="item pl-3 hover:font-bold w-full" @click="switchMenu">
          <NuxtLink
            class="w-full"
            :to="{ path: '/', query: { section: 'contacts' } }"
            ><div class="w-full py-2">Contact</div></NuxtLink
          >
        </div>
      </div>
      <div class="md:mt-0 md:text-right w-full flex flex-col">
        <div v-if="user">
          <div
            class="md:hidden my-2 separation w-full h-0.5 bg-[#0C3C41]"
          ></div>
          <div
            class="item item_right px-3 hover:font-bold w-full"
            @click="switchMenu"
          >
            <NuxtLink class="w-full" :to="{ path: 'profile' }"
              ><div class="w-full py-2">Mon profil</div></NuxtLink
            >
          </div>
          <div class="separator_container w-full">
            <nuxt-img
              class="w-full md:rotate-180"
              alt="separator"
              src="/menu_item_separator.svg"
            />
          </div>
          <div
            class="item item_right px-3 hover:font-bold w-full"
            @click="switchMenu"
          >
            <NuxtLink class="w-full" :to="{ path: 'credits' }"
              ><div class="w-full py-2">Mes crédits</div></NuxtLink
            >
          </div>
          <div class="separator_container w-full">
            <nuxt-img
              class="w-full md:rotate-180"
              alt="separator"
              src="/menu_item_separator.svg"
            />
          </div>
          <div
            class="item item_right px-3 hover:font-bold w-full"
            @click="switchMenu"
          >
            <NuxtLink class="w-full" :to="{ path: 'videos' }"
              ><div class="w-full py-2">Mes vidéos</div></NuxtLink
            >
          </div>
          <div class="separator_container w-full">
            <nuxt-img
              class="w-full md:rotate-180"
              alt="separator"
              src="/menu_item_separator.svg"
            />
          </div>
          <div
            class="item item_right px-3 hover:font-bold w-full"
            @click="switchMenu"
          >
            <button class="w-full flex" @click="logoutAndSwitchMenu">
              <div class="w-full py-2 text-left md:text-right">
                Se déconnecter
              </div>
            </button>
          </div>
        </div>
        <div
          class="icones_group h-full py-2 px-3 flex flex-row justify-start md:justify-end gap-2"
          :class="user ? 'items-end' : 'items-start'"
        >
          <button class="cursor-pointer" @click="goYoutbe">
            <nuxt-img class="h-8" alt="youtube" src="/youtube.svg" />
          </button>

          <nuxt-img v-if="false" class="h-8" alt="youtube" src="/tiktok.svg" />
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

const goYoutbe = () => {
  window.open("https://www.youtube.com/@moonenergy3259");
};

const logoutAndSwitchMenu = () => {
  logout();
};

const goTo = (id) => {
  switchMenu();
  console.log(id);
  // if (route.name === "index") return smoothScrollTo(id, 1000);
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
