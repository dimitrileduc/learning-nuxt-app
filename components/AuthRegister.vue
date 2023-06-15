<script setup lang="ts">
import { useAuth } from "~/stores/useAuth";
import { usePayment } from "~~/stores/usePayment";
const user = useSupabaseUser();
const { registerUser } = useAuth();
const { $posthog } = useNuxtApp();

const {} = useAuth();

const emailExist = ref(false);
const existingEmail = ref("");

const props = defineProps({
  toPayment: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits([
  "switch-registered",
  "setExistingEmail",
  "switch-confirm-email-modal",
  "setEmailProviderLink",
  "close",
]);

const emailProviderUrl = ref("");

function getEmailProviderUrl(email: any) {
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
      emailProviderUrl.value = "unknowProvider";
  }
}

async function handleSignUp(data: any) {
  const { auth, error } = await registerUser(data);
  if (error) {
    if ((error.message = "User already exists")) {
      console.log("User already exists");
      // console.log("identitied", auth.identities);
      (emailExist.value = true), (existingEmail.value = data.email);
    } else console.log(error);
  } else {
    if (props.toPayment) {
      //  setShowPayment(true);
    }
    console.log("please confirm email");
    getEmailProviderUrl(data.email);
    emit("switch-confirm-email-modal");
    console.log("emailProviderUrl", emailProviderUrl.value);

    emit("setEmailProviderLink", emailProviderUrl.value);

    if ($posthog) {
      const posthog = $posthog();
      posthog?.capture("user_registered");
    }

    // Redirect to another page or do something else
  }
}

function redirectLogin() {
  emit("switch-registered");
  emit("setExistingEmail", existingEmail.value);
}
</script>

<template>
  <div class="">
    <AuthForm
      @submit="handleSignUp"
      type="register"
      :toPayment="props.toPayment"
    >
      <div class="legal text-sm pt-6 text-center text-opacity-60">
        En m'inscrivant, j’accepte les
        <span class="underline">
          <a class="w-full h-full pt-3" href="/cgv" target="_blank"
            >Termes et conditions</a
          >
        </span>
        et la
        <span class="underline">
          <a class="w-full h-full" href="/confidentialite" target="_blank"
            >Politique de confidentialité.</a
          >
        </span>
      </div>
    </AuthForm>

    <div v-if="existingEmail" class="error-box py-4">
      <div class="error-message">
        <div class="text-red-400 p-2 mt-2 rounded">
          <button class="" v-if="emailExist" @click="redirectLogin">
            An account with this email already exists. Please
            <span class="underline">log in</span> with your existing account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
