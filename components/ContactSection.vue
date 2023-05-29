<template>
  <div
    class="w-full container_contacts bg-white pt-10 pb-24 sm:pb-14 lg:pb-10 flex flex-col items-center px-10"
  >
    <div
      class="form_container w-full sm:max-w-[552px] lg:max-w-[944px] flex flex-col items-center"
    >
      <div class="icone_container">
        <nuxt-icon class="text-[32px]" name="contact" filled />
      </div>
      <div class="title text-2xl font-bold mt-4 text-center">Contactez-moi</div>
      <div class="description mt-4 leading-tight text-center max-w-[712px]">
        N’hésitez pas à m’envoyer vos questions via ce formulaire.<br />Pour
        prendre rendez-vous, merci de vous rendre sur l’onglet prévu à cet
        effet.
      </div>
      <div class="form mt-8 sm:mt-4 lg:mt-8 w-full">
        <div class="flex flex-col items-center w-full">
          <FormInput
            name="name"
            label="name"
            placeholder="Fullname"
            type="texte"
          />
          <FormInput
            name="email"
            label="email"
            placeholder="Email*"
            type="email"
          />
          <FormInput
            name="sujet"
            label="sujet"
            placeholder="Sujet"
            type="texte"
          />
          <FormInput
            name="message"
            label="message"
            placeholder="Message*"
            type="texte"
            textArea
          />
        </div>
      </div>
      <div class="button_container mt-8 sm:mt-4 lg:mt-8">
        <Button primary label="Envoyer" />
        <div />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.container_contacts {
  color: #104b51;

  font-family: Lato;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
</style>
