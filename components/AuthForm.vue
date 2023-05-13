<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Form } from "vee-validate";
import * as Yup from "yup";

const props = defineProps({
  type: {
    type: String,
    default: "logIn",
  },
  existingEmail: {
    type: String,
    required: false,
  },
  toPayment: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emailInput: any = ref(null); // define the ref for the email input field

const labelButton = computed(() => {
  if (props.type === "logIn") {
    return "Connectez-vous";
  } else {
    return "Inscrivez-vous";
  }
});

const emits = defineEmits<{
  (event: "submit", data: any): void;
}>();

function onSubmit(values: any) {
  schema.value.validate(values).then((valid) => {
    if (!valid) {
      console.log("Form is not valid.");
    }
    emits("submit", values);
  });
}

function onInvalidSubmit(values: any) {
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
});

const schema = computed(() => {
  return props.type === "logIn" ? logInSchema : registerSchema;
});

emailInput?.value?.$el.focus();
</script>

<template>
  <div clas="text-white ">
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      @invalid-submit="onInvalidSubmit"
    >
      <FormInput
        ref="emailInput"
        name="email"
        input
        field
        :value="props?.existingEmail"
        type="email"
        label="E-mail"
        placeholder="Adresse e-mail"
      />
      <FormInput
        name="password"
        type="password"
        label="Mot de passe"
        placeholder="Mot de passe"
      />

      <div class="w-full mt-6">
        <Button noMaxWidth class="w-full" primary :label="labelButton" />
      </div>
    </Form>
  </div>
</template>
