<template>
  <div class="bg-white container text-[#104B51]">
    <div v-if="!formSubmitted">
      <div class="image flex justify-center">
        <nuxt-img alt="hero" class="justify-center w-32" src="/hero.svg" />
      </div>
      <div class="mt-6 text-2xl font-semibold flex justify-center text-center">
        Mot de passe oublié ?
      </div>
      <div class="mt-6 w-full items-center pt-1 text-center">
        Veuillez entrer votre adresse email afin de recevoir un lien pour créer
        un nouveau mot de passe.
      </div>

      <Form
        class="mt-6"
        @submit="onSubmit"
        :validation-schema="schema"
        @invalid-submit="onInvalidSubmit"
      >
        <FormInput
          name="email"
          input
          field
          :value="props?.existingEmail"
          type="email"
          label="E-mail"
          placeholder="Adresse e-mail"
        />

        <div class="w-full">
          <Button noMaxWidth class="w-full" primary :label="labelButton" />
        </div>
      </Form>
    </div>
    <div v-if="formSubmitted">
      <div class="image flex justify-center">
        <nuxt-img alt="hero" class="justify-center w-32" src="/hero.svg" />
      </div>
      <div class="mt-6 text-2xl font-semibold flex justify-center text-center">
        Email envoyé.
      </div>
      <div class="mt-6 w-full items-center pt-1 text-center">
        Un email à été envoyé à cette adresse. Cliquez sur le lien pour choisir
        un nouveau mot de passe.
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuth } from "~/stores/useAuth";
import { Form } from "vee-validate";
import * as Yup from "yup";
const labelButton = "Envoyer le lien";

const { resetPassword } = useAuth();

const formSubmitted = ref(false);

function onSubmit(values: any) {
  schema.validate(values).then(async (valid: any) => {
    if (!valid) {
    }
    console.log("Form is valid.");
    const { data, error } = await resetPassword(values.email);
    if (error) {
      console.log(error);
      return;
    }
    formSubmitted.value = true;
  });
}

function onInvalidSubmit(values: any) {
  console.log("Invalid form submission");
}

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
});
</script>

<style scoped></style>
