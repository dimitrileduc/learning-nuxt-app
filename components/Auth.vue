<template>
  <Modal @close="$emit('close')">
    <div>Auth Form</div>
    propsTopayment : {{ props.toPayment }}
    <Login :toPayment="props.toPayment" />
    <div class="bg-white p-4 container">
      <div class="flex justify-center"></div>

      <div v-if="registered">
        <AuthLogin
          :toPayment="props.toPayment"
          :existingEmail="existingEmail"
        />
      </div>
      <div v-else>
        <AuthRegister
          :toPayment="props.toPayment"
          @set-existing-email="setExistingEmail"
          @switch-registered="switchRegistered"
        />
      </div>

      <button class="my-4 text-xs" @click="switchRegistered()">
        {{ label }}
      </button>

      <div />
    </div>
  </Modal>
</template>

<script setup lang="ts">
const registered = ref(true);
const label = ref("Pas encore inscrit ?");
const existingEmail = ref("");

function setExistingEmail(email: string) {
  existingEmail.value = email;
  console.log("existingEmail", existingEmail.value);
}

function switchRegistered() {
  registered.value = !registered.value;
  label.value = registered.value ? "Pas encore inscrit ?" : "Déja inscrit ?";
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

<style></style>
