<template>
  <div
    class="container_about bg-white pt-14 lg:pb-12 flex flex-col items-center"
  >
    <div
      class="container-layout w-full flex flex-col lg:flex-row-reverse gap-10 lg:gap-10 lg:max-w-[944px]"
    >
      <div
        class="content px-10 md:px-0 lg:p-0 flex flex-col items-center lg:w-6/12"
      >
        <div class="sm:max-w-[552px]">
          <div class="text-2xl font-bold text-center lg:text-left">
            Qui suis-je ?
          </div>
          <div class="mt-10 leading-tight text-justify max-w-[712px]">
            Je m’appelle Delphine et je suis ravie de vous accueillir dans cet
            <span class="font-bold">espace de confiance.</span>
            <br />
            <br />
            Depuis ma jeunesse, j'ai été en contact avec la médiumnité.
            Cependant, j'ai longtemps enfoui cette partie de moi, bien qu’elle
            était essentielle. Ce n'est qu’à l’âge adulte que j'ai décidé
            d'accepter mon don et de m'ouvrir pleinement à cette dimension de ma
            vie. Ce choix a été le point de départ d'une merveilleuse aventure
            qui s’intensifie chaque jour.
            <br />
            <br />
            Aujourd'hui,
            <span class="font-bold"
              >à travers différents outils dont le tarot, la clairaudience, la
              clairvoyance, les soins énergétiques ou encore le reiki, je suis
              en mesure de canaliser les messages qui vous sont adressés et de
              vous aider à vous connecter davantage à votre moi profond.</span
            >
            Mon approche se veut bienveillante et non-jugeante, pour vous
            accompagner sur votre chemin de vie en toute sérénité. <br />
            <br />
            En travaillant ensemble, nous allons explorer les différentes
            dimensions de votre vie,
            <span class="font-bold"
              >en prenant en compte vos préoccupations, vos questionnements et
              vos aspirations.</span
            >
            Mon objectif est de vous aider à
            <span class="font-bold"> trouver des réponses</span> aux questions
            que vous vous posez, à dissiper vos doutes afin de vous aider à
            prendre les bonnes décisions pour votre avenir. En vous connectant
            davantage à votre être profond, vous pourrez ainsi
            <span class="font-bold"
              >vous épanouir pleinement et réaliser votre plein potentiel.</span
            >
            <br />
            <br />
            Je suis là pour vous accompagner avec bienveillance,
            <span class="font-bold">
              dans le respect de vos besoins et à votre rythme.</span
            >
          </div>
        </div>
      </div>
      <div
        class="image w-full px-10 pb-12 lg:pb-0 lg:p-0 flex flex-col lg:flex-row items-center lg:w-6/12"
      >
        <nuxt-img
          alt="about"
          format="webp"
          class="w-full max-w-[464px]"
          src="/about.png"
        />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.container-layout {
  color: #104b51;

  font-family: Lato;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
.image {
  background: linear-gradient(#ffffff 50%, #eaf4f4 50%);
}
@media (min-width: 1024px) {
  .image {
    background: none;
  }
}
</style>
