<template>
  <Modal @close="$emit('close')">
    <div
      class="bg-white p-8 py-14 container text-[#104B51] w-full sm:max-w-[375px] rounded"
    >
      <div v-if="!wasReset">
        <div class="image flex justify-center">
          <nuxt-img alt="hero" class="justify-center w-32" src="/hero.svg" />
        </div>
        <div
          class="mt-6 text-2xl font-semibold flex justify-center text-center"
        >
          Choisissez votre nouveau mot de passe.
        </div>

        <Form
          class="mt-8"
          @submit="onSubmit"
          :validation-schema="schema"
          @invalid-submit="onInvalidSubmit"
        >
          <FormInput
            name="password"
            type="password"
            label="Votre nouveau mot de passe"
            placeholder="Mot de passe"
          />

          <div class="w-full">
            <Button noMaxWidth class="w-full" primary :label="labelButton" />
          </div>
          <div class="mt-4 text-opacity-30 text-sm text-center">
            A request has been made to reset your password. If you did not make
            this request, please
            <button class="underline" @clik="$emit('close')">cancel</button>
          </div>
        </Form>
      </div>
      <div v-if="wasReset">
        <div class="image flex justify-center">
          <nuxt-img alt="hero" class="justify-center w-32" src="/hero.svg" />
        </div>
        <div
          class="mt-6 text-2xl font-semibold flex justify-center text-center"
        >
          Felicitations !
        </div>
        <div class="mt-6 w-full items-center pt-1 text-center">
          Votre nouveau mot de passe à bien été enregistré.
        </div>
        <div class="w-full">
          <Button
            class="mt-6 w-full"
            primary
            label="Go to app"
            @click="$emit('close')"
          />
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
//import { updatePassword } from "~/stores/useAuth";
import { storeToRefs } from "pinia";
import { Form } from "vee-validate";
import * as Yup from "yup";
import { useAuth } from "~/stores/useAuth";

const { user } = storeToRefs(useAuth());
const labelButton = "Enregistrer";

const wasReset = ref(false);

const { updatePassword } = useAuth();

function onSubmit(values: any) {
  schema.validate(values).then(async (valid: any) => {
    if (!valid) {
      console.log("Form is not valid.");
    }

    const { data, error } = await updatePassword(values.password);
    if (error) {
      console.log("error", error);
      return;
    } else {
      wasReset.value = true;
    }
  });
}

function onInvalidSubmit(values: any) {
  console.log("Invalid form submission");
}

const schema = Yup.object().shape({
  password: Yup.string().min(6).required(),
});
</script>

<script lang="ts"></script>

<style scoped></style>
