<template>
  <Teleport to="body">
    <Modal @close="$emit('close')">
      <div
        class="container w-full flex flex-col items-center justify-center rounded-md"
      >
        <div class="containerInterne px-3 sm:px-6 lg:max-w-[944px] lg:px-0">
          <div
            class="hero flex flex-col items-center justify-center rounded-t-md"
          >
            <div
              class="w-full flex items-center justify-end pt-4 pr-4 z-50 cursor-pointer"
              @click="closeModal"
            >
              <div class="flex items-center justify-center">
                <nuxt-img class="w-6" alt="signe" src="/close_menu.svg" />
              </div>
            </div>
            <div class="px-[32px] md:px-[120px] pb-3 pt-1">
              <div class="w-full flex items-center justify-center">
                <nuxt-img
                  class="w-[231px] md:w-[325px]"
                  alt="signe"
                  src="/contest.svg"
                />
              </div>
              <div
                class="mt-4 md:mt-6 text-base md:text-[20px] text-white font-bold text-center uppercase"
              >
                CONCOURS !
              </div>

              <div class="subTitle text-center text-base md:text-[20px]">
                Tente ta chance de gagner une guidance personnalisée de 60
                minutes
              </div>
              <div
                class="mt-4 copy text-[14px] md:text-base text-center md:px-6"
              >
                Lors des guidances personnalisées, je vous accueille pour vous
                soutenir dans votre parcours de vie en vous apportant les
                messages que vous êtes prêts à entendre, en éclairant
                d’éventuelles zones d’ombre, en vous aidant à vous connecter à
                vos ressources personnelles afin de suivre la voie de votre âme.
              </div>
              <div class="mt-4 text-[14px] md:text-base copy text-center">
                <div class="font-bold text-[#CFE4BA] text-[14px] md:text-base">
                  Inscris-toi au concours avant le 22 décembre
                </div>
                <div
                  class="md:px-0 mt-2 text-[14px] md:text-base flex flex-center justify-center"
                >
                  <div class="hidden md:flex text-center">
                    Tirage au sort le 24 décembre. Le gagnant sera prévenu par
                    mail
                  </div>
                  <div class="flex md:hidden flex-col">
                    <div>Tirage au sort le 24 décembre.</div>
                    Le gagnant sera prévenu par mail
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-white rounded-b-md py-4 flex flex-col items-center justify-center gap-y-6 px-[32px] md:px-[244px]"
          >
            <Form
              class="w-full flex flex-col items-center gap-y-6"
              ref="form"
              @submit="onSubmit"
              :validation-schema="schema"
              @invalid-submit="onInvalidSubmit"
            >
              <div class="w-full">
                <div class="flex flex-col items-center w-full">
                  <FormInput
                    name="email"
                    label="email"
                    placeholder="Votre Email"
                    :value="emailValue"
                    type="email"
                  />
                </div>
              </div>
              <div class="flex flex-col gap-y-2 items-center justify-center">
                <Button primary label="Je m'inscris" />
                <Button secondary :hasWhiteBg="true" label="Accéder au site" />
              </div>

              <div class="font-medium text-sm">
                <div
                  v-if="requestStatus === 'ok'"
                  class="status_message text-[#34be34]"
                >
                  Mailchimp user created successfully
                </div>
                <div
                  v-if="requestStatus === 'error'"
                  class="status_message text-red-500"
                >
                  Une erreur s'est produite. Veuillez réessayer ultérieurement.
                </div>
              </div>
              <!-- <div class="button_container mt-8 sm:mt-4 lg:mt-8">
                <Button primary label="Envoyer" />
                <div class="mt-2 font-bold">
                  <div
                    v-if="status === 'ok'"
                    class="status_message text-[#104b51]"
                  >
                    Formulaire soumis avec succès !
                  </div>
                  <div
                    v-if="status === 'processing'"
                    class="status_message text-[#104b51]"
                  >
                    Traitement en cours...
                  </div>
                  <div
                    v-if="status === 'error'"
                    class="status_message text-red-500"
                  >
                    Une erreur s'est produite. Veuillez réessayer
                    ultérieurement.
                  </div>
                </div>
                <div />
              </div> -->
            </Form>

            <div class="cgv md:px-10">
              <div class="legal text-[14px] text-center text-opacity-60">
                En m'inscrivant, j’accepte les
                <span class="underline">
                  <a class="w-full h-full pt-3" href="/cgv" target="_blank"
                    >Termes et conditions</a
                  >
                </span>
                <span>
                  et la

                  <a
                    class="w-full h-full"
                    href="/confidentialite"
                    target="_blank"
                    >Politique de confidentialité.</a
                  >
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </Teleport>
</template>

<script setup>
import { Form } from "vee-validate";
import * as Yup from "yup";

const emailValue = ref("");

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
});

const emit = defineEmits(["close"]);
const closeModal = () => {
  console.log("close modal");
  emit("close");
};

const requestStatus = ref(null);

async function onSubmit(values) {
  try {
    const response = await $fetch("/api/user/mchimp", {
      method: "POST",
      body: {
        email: values.email,
        tag: "Contest",
      },
    });
    console.log(response);
    if (response?.status === "subscribed") {
      console.log("Mailchimp user created successfully");
      requestStatus.value = "ok";
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Emit the "close" event after the delay
      emit("close");
    } else {
      console.log("response", response.status);
      console.log("Failed to create mailchimp user");
      requestStatus.value = "error";
    }
  } catch (error) {
    console.log("Error creating mailchimp user:", error);
    requestStatus.value = "error";
  }

  // status.value = "processing"; // Set status to "processing" when the form is submitted
  // try {
  //   await mail.send({
  //     config: "dimitri",
  //     from: {
  //       name: values.name,
  //       address: values.email,
  //     },
  //     subject: "Moon energy contact form" + values.sujet,
  //     text: values.message,
  //   });
  // } catch (error) {
  //   console.error(error);
  //   status.value = "error"; // Set status to "error" when an error occurs during form submission
  // }

  // try {
  //   await mail.send({
  //     config: "moon",
  //     from: {
  //       name: values.name,
  //       address: values.email,
  //     },
  //     subject: "Moon energy contact form" + values.sujet,
  //     text: values.message,
  //   });
  // } catch (error) {
  //   console.error(error);
  //   status.value = "error"; // Set status to "error" when an error occurs during form submission
  // }

  // try {
  //   await mail.send({
  //     config: "delphine",
  //     from: {
  //       name: values.name,
  //       address: values.email,
  //     },
  //     subject: "Moon energy contact form" + values.sujet,
  //     text: values.message,
  //   });
  //   status.value = "ok"; // Set status to "ok" when the form submission is successful
  // } catch (error) {
  //   console.error(error);
  //   status.value = "error"; // Set status to "error" when an error occurs during form submission
  // }

  //});
}
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
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.copy {
  color: #fff;
  text-align: center;
  font-family: Lato;

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
  color: #104b51;
}
</style>
