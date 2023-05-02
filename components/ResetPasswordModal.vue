<template>
  <Modal @close="$emit('close')">
    <div
      class="bg-white p-8 py-14 container text-[#104B51] w-full sm:max-w-[375px] rounded"
    >
      <div v-if="!wasReset">
        <div class="text-2xl font-semibold flex justify-center text-center">
          Hello {{ user?.email }}
        </div>
        <div class="w-full items-center pt-1">
          Veuillez entrer votre adresse email afin de recevoir un lien pour
          créer un nouveau mot de passe.
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
            placeholder="Votre nouveau mot de passe"
          />

          <div class="w-full">
            <Button noMaxWidth class="w-full" primary :label="labelButton" />
          </div>
          <div class="mt-4 text-opacity-30 text-sm">
            A request has been made to reset your password. If you did not make
            this request, please
            <button class="underline" @clik="$emit('close')">cancel</button>
          </div>
        </Form>
      </div>
      <div v-if="wasReset">
        <div>You password was succes reset you can no use this app</div>
        <Button primary label="Go to app" @click="$emit('close')" />
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
const labelButton = "Reset  my password";

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
