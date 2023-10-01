<template>
  <Teleport to="body">
    <Modal @close="$emit('close')">
      <div
        class="container w-full flex flex-col items-center justify-center rounded-md"
      >
        <div class="w-3/5 containerInterne">
          <div
            class="hero flex flex-col items-center justify-center rounded-t-md"
          >
            <div
              class="w-full flex items-center justify-end p-4 z-50 cursor-pointer"
              @click="closeModal"
            >
              <div class="flex items-center justify-center">
                <nuxt-img class="w-6" alt="signe" src="/close_menu.svg" />
              </div>
            </div>
            <div class="px-[120px] pb-12 pt-1">
              <div class="w-full flex items-center justify-center">
                <nuxt-img class="w-[392px]" alt="signe" src="/contest.svg" />
              </div>
              <div class="text-[24px] text-white font-bold text-center">
                Participez à mon concours !
              </div>

              <div class="subTitle text-center">
                Une guidance personnalisée de 60 minutes.
              </div>
              <div class="mt-4 copy text-center">
                Je vous accueille pour vous soutenir dans votre parcours de vie
                en vous apportant les messages que vous êtes prêts à entendre,
                en éclairant d’éventuelles zones d’ombres, en vous aidant à vous
                connecter à vos ressources personnelles afin de suivre la voie
                de votre âme.
              </div>
              <div class="mt-4 copy text-center">
                <span class="font-bold text-[#CFE4BA]"
                  >Inscrivez-vous à notre newsletter et prenez partie au tirage
                  au sort
                </span>
                qui aura lieu le xx/xx/xx pour remportez une séance pour vous ou
                la personne de votre choix..
              </div>
            </div>
          </div>
          <div
            class="bg-white rounded-b-md py-8 flex flex-col items-center justify-center gap-y-6 px-[244px]"
          >
            <FormInput
              name="email"
              input
              field
              value=""
              type="email"
              label="E-mail"
              placeholder="Entrez votre adresse email"
            />
            <div class="flex flex-col gap-y-2 items-center justify-center">
              <Button primary label="Je m'inscris" />
              <Button secondary :hasWhiteBg="true" label="Accéder au site" />
            </div>
            <div class="cgv">
              En m’inscrivant, j’accepte les conditions générales et la
              politique de confidentialité du site et du concours.
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </Teleport>
</template>

<script setup>
const emit = defineEmits(["close"]);
const closeModal = () => {
  console.log("close modal");
  emit("close");
};
</script>

<style scoped>
.hero {
  background: linear-gradient(180deg, #104b51 0%, #145661 100%);
}
.container {
  max-width: 100%;
  font-family: Lato;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
.subTitle {
  background: var(
    --BTN_Gradient_False,
    linear-gradient(90deg, #4fbcdd 0%, #89cfe7 100%)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: Lato;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.copy {
  color: #fff;
  text-align: center;
  font-family: Lato;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.containerInterne {
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.25);
}

.cgv {
  text-align: center;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>
