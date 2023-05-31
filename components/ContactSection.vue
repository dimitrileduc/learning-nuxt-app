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
        @submit="onSubmit"
        :validation-schema="schema"
        @invalid-submit="onInvalidSubmit"
      >
        <div class="form mt-8 sm:mt-4 lg:mt-8 w-full flex items-center">
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
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import * as Yup from "yup";
const mail = useMail();

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required(),
  sujet: Yup.string().required(),
  message: Yup.string().required(),
});
function onSubmit(values) {
  mail.send({
    from: "John Doe",
    subject: "Incredible",
    text: "This is an incredible test message",
  });
  /*
  schema.value.validate(values).then((valid) => {
    if (!valid) {
      console.log("Form is not valid.");
    }
    console.log("Form is valid.");
  });
  */
}

function onInvalidSubmit(values) {
  props.type === "logIn"
    ? console.log("Login failed")
    : console.log("Register failed");
}
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
