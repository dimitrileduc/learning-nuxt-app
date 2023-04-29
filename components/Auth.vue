<template>
  <Modal @close="$emit('close')">
    <div
      class="bg-white p-8 py-14 container text-[#104B51] w-full sm:max-w-[375px] rounded"
    >
      <div class="image flex justify-center">
        <nuxt-img alt="hero" class="justify-center w-32" src="/hero.svg" />
      </div>

      <div class="flex justify-center pt-6">
        <div class="text-2xl font-semibold flex justify-center">
          {{ title }}
        </div>
      </div>
      <div class="w-full items-center pt-1">
        <button class="text-sm text-center w-full" @click="switchRegistered()">
          {{ label }}
          <span class="labeButton underline">{{ labelButton }}</span>
        </button>
      </div>
      <div class="pt-10" v-if="registered">
        <AuthLogin
          :toPayment="props.toPayment"
          :existingEmail="existingEmail"
          @close="$emit('close')"
        />
      </div>
      <div class="pt-10" v-else>
        <AuthRegister
          :toPayment="props.toPayment"
          @set-existing-email="setExistingEmail"
          @switch-registered="switchRegistered"
          @close="$emit('close')"
        />
      </div>

      <div class="legal px-6 pt-6">
        By using Moon you agree  to the
        <span class="underline">Terms of Service</span> and
        <span class="underline">Privacy Policy</span>
      </div>

      <div />
    </div>
  </Modal>
</template>

<script setup lang="ts">
const registered = ref(true);
const label = ref("Pas encore inscrit ?");
const labelButton = ref("Inscrivez-vous");
const title = ref("Connectez-vous");
const existingEmail = ref("");

function setExistingEmail(email: string) {
  existingEmail.value = email;
  console.log("existingEmail", existingEmail.value);
}

function switchRegistered() {
  registered.value = !registered.value;
  label.value = registered.value ? "Pas encore de compte ?" : "Déja inscrit ?";
  title.value = registered.value ? "Connectez-vous" : "Inscrivez-vous";
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
