<template>
  <div
    class="global_hero flex justify-center px-8 sm:px-[136px] lg:px-0 pt-4 md:pt-10 pb-14"
  >
    <div class="container">
      <div class="content">
        <div v-if="false">
          <div>Welcolme</div>
          <div v-if="user">{{ name }}</div>
          <div v-else>guest</div>
          <div>hero subtitle</div>
        </div>
        <div class="container_logo">
          <nuxt-img alt="logo" class="justify-center" src="/logo.svg" />
        </div>
        <div class="title text-2xl font-bold text-justify mt-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        <div class="description text-justify mt-4 leading-tight">
          Lorem ipsum dolor sit amet, consectetuer ma chaine Youtube, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
          molestie consequat, vel illum dolore eu feugiat nulla facilisis at
          vero eros et accumsan et iusto odio dignissim qui blandit praesent
          luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
        </div>
        <div
          class="buttons_container mt-8 flex flex-col md:flex-row gap-3 items-center"
        >
          <Button primary label="Tirage" @click="scrollToProducts" />
          <Button label="Rendez-vous" @click="scrollToRDV" />
        </div>
      </div>
      <div class="image flex justify-center">
        <nuxt-img
          class="justify-center max-w-[144px] sm:max-w-[200px] lg:max-w-sm"
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

const scrollToProducts = () => {
  console.log("scrollToProducts");
  smoothScrollTo("#section-products", 1000, -100);
};

const scrollToRDV = () => {
  console.log("scrollToProducts");
  smoothScrollTo("#section-rdv", 1000, -100);
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
