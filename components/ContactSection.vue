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
      <Form
        class="w-full flex flex-col items-center"
        ref="form"
        @submit="onSubmit"
        :validation-schema="schema"
        @invalid-submit="onInvalidSubmit"
      >
        <div class="form mt-8 sm:mt-4 lg:mt-8 w-full flex items-center">
          <div class="flex flex-col items-center w-full">
            <FormInput
              name="name"
              label="name"
              :placeholder="namePlaceHolder"
              :value="nameValue"
              type="text"
            />
            <FormInput
              name="email"
              label="email"
              :placeholder="emailPlaceHolder"
              :value="emailValue"
              type="email"
            />
            <FormInput
              name="sujet"
              label="sujet"
              :placeholder="sujetPlaceHolder"
              :value="sujetValue"
              type="text"
            />
            <FormInput
              name="message"
              label="message"
              :placeholder="messagePlaceHolder"
              :value="messageValue"
              type="text"
              textArea
            />
          </div>
        </div>
        <div class="button_container mt-8 sm:mt-4 lg:mt-8">
          <Button primary label="Envoyer" />
          <div class="mt-2 font-bold">
            <div v-if="status === 'ok'" class="status_message text-[#104b51]">
              Formulaire soumis avec succès !
            </div>
            <div
              v-if="status === 'processing'"
              class="status_message text-[#104b51]"
            >
              Traitement en cours...
            </div>
            <div v-if="status === 'error'" class="status_message text-red-500">
              Une erreur s'est produite. Veuillez réessayer ultérieurement.
            </div>
          </div>
          <div />
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import * as Yup from "yup";
const mail = useMail();
const status = ref(null);
const form = ref(null);

const namePlaceHolder = ref("Nom et prénom*");
const emailPlaceHolder = ref("Email*");
const sujetPlaceHolder = ref("Sujet*");
const messagePlaceHolder = ref("Message*");

const nameValue = ref("");
const emailValue = ref("");
const sujetValue = ref("");
const messageValue = ref("");

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required(),
  sujet: Yup.string().required(),
  message: Yup.string().required(),
});

async function onSubmit(values) {
  // schema.value.validate(values).then(async (valid) => {
  // if (!valid) {
  //  console.log("Form is not valid.");
  // }
  status.value = "processing"; // Set status to "processing" when the form is submitted
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
  //   // status.value = "error"; // Set status to "error" when an error occurs during form submission
  // }
  // finally {
  //   status.value = "ok"; // Set status to "ok" when the form submission is successful
  // }

  // try {
  //   console.log("try sending mail");
  //   await mail.send({
  //     config: "moon",
  //     from: {
  //       name: values.name,
  //       address: values.email,
  //     },
  //     subject: "Moon energy contact form" + values.sujet,
  //     text: values.message,
  //   });
  //   // status.value = "ok";
  // } catch (error) {
  //   console.error(error);
  //   // status.value = "error"; // Set status to "error" when an error occurs during form submission
  // } finally {
  //   status.value = "ok"; // Set status to "ok" when the form submission is successful
  // }

  try {
    await mail.send({
      config: "delphine",
      from: {
        name: values.name, //
        address: values.email,
      },
      subject: "Moon energy contact form" + values.sujet + values.email,
      text: values.message,
    });
    status.value = "ok"; // Set status to "ok" when the form submission is successful
  } catch (error) {
    console.error(error);
    //status.value = "error"; // Set status to "error" when an error occurs during form submission
  } finally {
    status.value = "ok"; // Set status to "ok" when the form submission is successful
  }

  try {
    await mail.send({
      config: "dimitri",
      from: {
        name: values.name, //
        address: values.email,
      },
      subject: "Moon contact form" + values.sujet + " --  " + values.email,
      text: values.message,
    });
    status.value = "ok"; // Set status to "ok" when the form submission is successful
  } catch (error) {
    console.error(error);
    //status.value = "error"; // Set status to "error" when an error occurs during form submission
  } finally {
    status.value = "ok"; // Set status to "ok" when the form submission is successful
  }
}
/*
function onInvalidSubmit(values) {
  props.type === "logIn"
    ? console.log("Login failed")
    : console.log("Register failed");
}
*/
</script>

<style scoped>
.container_contacts {
  color: #104b51;

  font-family: Lato;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
</style>
