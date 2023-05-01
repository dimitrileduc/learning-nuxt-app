<template>
  <div class="bg-white container text-[#104B51]">
    <div v-if="!formSubmitted">
      <div class="text-2xl font-semibold flex justify-center text-center">
        Mot de passe oublié ?
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
      <div class="text-2xl font-semibold flex justify-center text-center">
        Un email pour reinitialiser votre mot de passe vous a été envoyé.
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuth } from "~/stores/useAuth";
import { Form } from "vee-validate";
import * as Yup from "yup";
const labelButton = "Reset my password";

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
