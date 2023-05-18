<template>
  <div
    class="container px-10 pt-12 lg:pt-10 pb-14 w-full flex flex-col items-center justify-start"
  >
    <div class="flex flex-col items-center sm:max-w-[552px] lg:max-w-[944px]">
      <div><nuxt-icon class="text-[32px]" name="rdv" filled /></div>
      <div class="header">
        <div class="text-2xl font-bold mt-4 text-center">
          Rendez-vous personnel
        </div>
        <div class="text-center mt-4 leading-tight">
          Bienvenue dans un espace sécurisé ou vous pourrez prendre le temps de
          vous aligner à votre moi profond et à vos émotions.
        </div>
        <div class="text-center text-sm italic mt-2 leading-tight">
          Si vous souffrez de problèmes de santé, il est essentiel de consulter
          un médecin compétent.
        </div>
      </div>

      <div
        class="options mt-10 flex flex-col lg:flex-row items-center gap-14 lg:gap-6"
      >
        <div class="option1 w-full flex flex-col items-center">
          <div class="container_image">
            <nuxt-img
              alt="rdv"
              class="max-h-[116px]"
              src="/guidance_classique.svg"
            />
          </div>
          <div class="mt-6 text-[20px] font-bold text-center">
            Guidance personnalisé
          </div>
          <div class="mt-1 text-[14px] text-center">60 minutes /75€</div>
          <div class="mt-4 leading-tight md:min-h-[119px] text-justify">
            Je vous accueille pour vous soutenir dans votre parcours de vie en
            vous apportant les messages que vous êtes prêts à entendre, en
            éclairant d’éventuelles zones d’ombres, en vous aidant à vous
            connecter à vos ressources personnelles afin de suivre la voie de
            votre âme
          </div>
          <div class="container_button mt-4 md:mt-6 lg:mt-8">
            <Calendly60 />
          </div>
        </div>
        <div class="option1 w-full flex flex-col items-center justify-start">
          <div class="container_image max-h-[116px]">
            <nuxt-img
              alt="guidance"
              class="max-h-[116px]"
              src="/guidance_direct.svg"
            />
          </div>
          <div class="mt-6 text-[20px] font-bold text-center">
            Guidance Directe
          </div>
          <div class="mt-1 text-[14px] text-center">30 minutes / 45€</div>
          <div class="mt-4 leading-tight md:min-h-[119px] text-justify">
            Vous avez une question très précise à poser ? Lors de cette séance,
            nous pouvons nous concentrer sur votre interrogation du moment pour
            vous permettre d’éclairer les zones auxquelles vous n’avez pas
            accès, pour mettre des mots et des images sur vos émotions et vos
            ressentis mais aussi pour envisager les pistes qui vous permettront
            d’avancer sur votre chemin de vie.
          </div>
          <div class="container_button mt-4 md:mt-6 lg:mt-8">
            <Calendly30 />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.container {
  max-width: 100%;
  font-family: Lato;
  color: #104b51;
  background-color: #eaf4f4;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
</style>
