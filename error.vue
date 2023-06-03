<template>
  <div class="bg-[#104B51] w-full h-screen flex items-center justify-center">
    <div class="flex flex-col justify-center items-center w-full">
      <nuxt-img alt="hero" class="justify-center w-64" src="/hero.svg" />
      <div class="mt-10 text-center uppercase text-[#CFE4BA]">Erreur 404</div>
      <div class="text-2xl text-center mt-3 text-white">Page non trouvée</div>
      <div class="text-center mt-3 text-white">
        Désolé, cette page s’est perdue dans l’univers.
      </div>
      <div class="mt-6">
        <Button primary label="Retour à l'accueil" @click="goToHome" />
      </div>
    </div>
  </div>
</template>

<script setup>
const goToHome = () => {
  window.location.href = "https://moon-energy.net";
};
</script>
