<script setup lang="ts">
import { useAuth } from "~/stores/useAuth";
import { usePayment } from "~~/stores/usePayment";
const user = useSupabaseUser();
const { registerUser } = useAuth();
const { showPayment, setShowPayment, amount, setAmount } = usePayment();
const { listenVerifiedEmail } = useAuth();
const showEmailButton = ref(false);
const emailExist = ref(false);
const existingEmail = ref("");

const props = defineProps({
  toPayment: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(["switch-registered", "setExistingEmail"]);

const emailProviderUrl = ref("");

function getEmailProviderUrl(email) {
  console.log("get email provider", email);
  const emailDomain = email.split("@")[1];
  console.log("emailDomain", emailDomain);
  switch (emailDomain) {
    case "gmail.com":
      console.log("email is gmail");
      emailProviderUrl.value = "https://mail.google.com";
      break;
    case "yahoo.com":
      console.log("email is yahoo");
      emailProviderUrl.value = "https://mail.yahoo.com";
      break;
    // add more email providers here as needed
    default:
      console.log("email is not gmail or yahoo");
      emailProviderUrl.value = "";
  }
}

async function handleSignUp(data: any) {
  const { auth, error } = await registerUser(data);
  if (error) {
    if ((error.message = "User already exists")) {
      console.log("User already exists");
      console.log("identitied", auth.identities);
      (emailExist.value = true), (existingEmail.value = data.email);
    } else console.log(error);
  } else {
    if (props.toPayment) {
      //setShowPayment(true);
    }
    console.log("please confirm email");
    getEmailProviderUrl(data.email);
    showEmailButton.value = true;
    listenVerifiedEmail();
    // Redirect to another page or do something else
  }
}

function redirectToEmail() {
  // Redirect to the user's email provider here
  window.location.href = emailProviderUrl.value;
}

function redirectLogin() {
  emit("switch-registered");
  emit("setExistingEmail", existingEmail.value);
}
</script>

<template>
  <div class="">
    <div class="text-3xl pb-9">Sign up</div>
    <AuthForm
      @submit="handleSignUp"
      type="register"
      :toPayment="props.toPayment"
    />
    <button v-if="showEmailButton" @click="redirectToEmail">
      Go to Email Provider {{ emailProviderUrl }}
    </button>
    <button v-if="emailExist" @click="redirectLogin">
      An account with this email already exists. Please log in with your
      existing account
    </button>
  </div>
</template>
