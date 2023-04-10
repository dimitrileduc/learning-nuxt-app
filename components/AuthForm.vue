<script setup lang="ts">
import { Form } from "vee-validate";
import * as Yup from "yup";

//define emits onsubmit?

const props = defineProps({
  type: {
    type: String,
    default: "logIn",
  },
  existingEmail: {
    type: String,
    required: false,
  },
});

const labelButton = computed(() => {
  if (props.type === "logIn") {
    return "Log in";
  } else {
    return "Create Account";
  }
});

const emits = defineEmits<{
  (event: "submit", data: any): void;
}>();

function onSubmit(values) {
  console.log("onSubmit", values);
  emits("submit", values);
}

function onInvalidSubmit(values) {
  props.type === "logIn"
    ? console.log("Login failed")
    : console.log("Register failed");
}

const logInSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});
const registerSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

console.log(props.type);

const schema = computed(() => {
  return props.type === "logIn" ? logInSchema : registerSchema;
});
</script>

<template>
  <div clas="text-white">
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      @invalid-submit="onInvalidSubmit"
    >
      <FormInput
        name="email"
        :value="props?.existingEmail"
        type="email"
        label="E-mail"
        placeholder="Ton adresse email"
      />
      <FormInput
        name="password"
        type="password"
        label="Mot de passe"
        placeholder="Ton mot de passe"
      />
      <div v-if="props.type === 'register'">
        <FormInput
          name="confirm_password"
          type="password"
          label="Confirmation du mot de passe"
          placeholder="Confirme ton mot de passe"
        />
      </div>

      <FormButton :label="labelButton" />
    </Form>
  </div>
</template>

<style></style>
