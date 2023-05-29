<template>
  <div
    class="global_hero flex justify-center px-10 sm:px-[136px] lg:px-0 pt-4 md:pt-10 pb-14"
  >
    <div class="container">
      <div class="content">
        <div v-if="false">
          <div>Welcolme</div>
          <div v-if="user">{{ name }}</div>
          <div v-else>guest</div>
          <div>hero subtitle</div>
        </div>
        <div class="container_logo mt-6 md:mt-8 lg:mt-0">
          <nuxt-img alt="logo" class="justify-center w-48" src="/logo.svg" />
        </div>
        <div class="text-center lg:text-justify">
          <div class="title text-2xl font-bold mt-8">Tout est énergie</div>
          <div class="description mt-4 leading-tight">
            Bienvenue sur ce site, si vous êtes arrivés ici c'est probablement
            grâce à mes vidéos gratuite sur
            <button class="text-[#CFE4BA] font-bold" @click="goYoutbe">
              Youtube
            </button>
            que je partage avec plaisir à chaque lunaison :
            <span class="font-bold">Nouvelle Lune et Pleine Lune.</span>
            <br /><br />
            La dernière vidéo vous a justement interpellée ?<br />
            <span class="font-bold"
              >Vous vous sentez proche des énergies du moment
            </span>
            et voudriez en savoir plus pour mieux aborder les prochains jours et
            les prochaines semaines?<br /><br />
            <span class="font-bold"
              >Alors ces extensions de lectures intuitives sont faites pour vous
              !</span
            >
          </div>
        </div>
        <div
          class="buttons_container mt-8 flex flex-col md:flex-row gap-3 items-center"
        >
          <Button
            primary
            label="Découvrir le tirage"
            @click="scrollToProducts"
          />
          <Button label="Prendre rendez-vous" @click="scrollToRDV" />
        </div>
      </div>
      <div class="image flex justify-center">
        <nuxt-img
          class="justify-center w-96 max-w-[144px] sm:max-w-[200px] lg:max-w-sm"
          src="/hero.svg"
          alt="hero"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const { smoothScrollTo } = useSmoothScroll();
const user = useSupabaseUser();
const name = computed(() => user.value?.user_metadata.full_name);

const goYoutbe = () => {
  window.open("https://www.youtube.com/@moonenergy3259");
};

const scrollToProducts = () => {
  console.log("scrollToProducts");
  smoothScrollTo("#tirages", 1000, -100);
};

const scrollToRDV = () => {
  console.log("scrollToProducts");
  smoothScrollTo("#rdv", 1000, -100);
};
</script>

<style scoped>
.global_hero {
  font-family: Lato;
  color: white;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
.container {
  max-width: 952px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: "content image";
}

@media (max-width: 1024px) {
  .container {
    max-width: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    grid-template-areas: "image" "content";
  }
}

.content {
  justify-self: stretch;
  align-self: center;
  grid-area: content;
}

@media (max-width: 1024px) {
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.image {
  justify-self: end;
  align-self: center;
  grid-area: image;
}

@media (max-width: 1024px) {
  .image {
    justify-self: center;
  }
}
</style>
