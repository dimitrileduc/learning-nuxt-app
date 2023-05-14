<template>
  <Modal @close="$emit('close')">
    <div
      class="bg-white p-10 py-10 container text-[#104B51] w-full sm:max-w-[400px] rounded"
    >
      <div v-if="!showEmailConfirmModal && !showResetPasswordModal">
        <div class="image flex justify-center">
          <nuxt-img
            alt="hero"
            class="justify-center w-28"
            src="/modal_logo.svg"
          />
        </div>

        <div class="flex justify-center pt-6">
          <div class="text-2xl font-semibold flex justify-center">
            {{ title }}
          </div>
        </div>

        <div class="flex justify-center pt-4">
          <div class="flex justify-center text-center">
            {{ subtitle }}
          </div>
        </div>

        <div class="pt-6" v-if="registered">
          <AuthLogin
            :toPayment="props.toPayment"
            :existingEmail="existingEmail"
            @close="$emit('close')"
            @resetPassword="showResetPasswordModal = true"
          />
        </div>
        <div class="pt-6" v-else>
          <AuthRegister
            :toPayment="props.toPayment"
            @set-existing-email="setExistingEmail"
            @switch-registered="switchRegistered"
            @close="$emit('close')"
            @switch-confirm-email-modal="switchConfirmEmailModal"
            @setEmailProviderLink="setEmailProviderLink"
          />
        </div>
        <div class="w-full items-center pt-4">
          <button
            class="text-sm text-center w-full"
            @click="switchRegistered()"
          >
            {{ label }}
            <span class="labeButton underline">{{ labelButton }}</span>
          </button>
        </div>

        <div />
      </div>
      <div v-if="showEmailConfirmModal">
        <div>
          <ConfirmMail
            :emailProviderLink="emailProviderLink"
            @switch-confirm-email-modal="switchConfirmEmailModal"
            @goToMail="goToMail"
          />
        </div>
      </div>
      <div v-if="showResetPasswordModal">
        <div>
          <AskResetPassword />
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { usePayment } from "~~/stores/usePayment";
const registered = ref(true);
const label = ref("Pas encore inscrit ?");
const labelButton = ref("Inscrivez-vous");
const title = ref("Connectez-vous");
const subtitle = ref(
  "Veuillez entrer vos identifiant pour vous connecter à votre compte."
);
const existingEmail = ref("");
const showEmailConfirmModal = ref(false);
const showResetPasswordModal = ref(false);
const emailProviderLink = ref("");

const { showPayment, setShowPayment, amount, setAmount } = usePayment();

function setExistingEmail(email: string) {
  existingEmail.value = email;
  console.log("existingEmail", existingEmail.value);
}

function switchConfirmEmailModal() {
  console.log("switchConfirmEmailModal");
  showEmailConfirmModal.value = !showEmailConfirmModal.value;
  if (showEmailConfirmModal.value && props.toPayment) {
    console.log("set show payment");
    setShowPayment(true);
  } else {
  }
}

function setEmailProviderLink(emailUrl: string) {
  console.log("setEmailProviderLink", emailUrl);
  emailProviderLink.value = emailUrl;
}

function goToMail() {
  window.location.href = emailProviderLink.value;
}

function switchRegistered() {
  registered.value = !registered.value;
  label.value = registered.value ? "Pas encore de compte ?" : "Déja inscrit ?";
  title.value = registered.value ? "Connectez-vous" : "Inscrivez-vous";
  subtitle.value = registered.value
    ? "Veuillez entrer vos identifiant pour vous connecter à votre compte."
    : "Veuillez remplir les champs ci-dessous afin de créer votre compte.";
  labelButton.value = registered.value ? "Inscrivez-vous" : "Connectez-vous";
}
const props = defineProps({
  toPayment: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<script lang="ts"></script>

<style scoped>
.labeButton {
  text-decoration-line: underline;

  /* BTN_Gradient_True */

  background: linear-gradient(90deg, #1683a4 -2.23%, #4fbcdd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

.legal {
  font-size: 12px;
  line-height: 24px;
  /* or 200% */

  text-align: center;

  color: #709397;
}
</style>
