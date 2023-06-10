<template>
  <div class="bg-white container text-[#104B51]">
    <div class="image flex justify-center">
      <nuxt-img
        alt="confirm_mail"
        class="justify-center w-24"
        src="/mail.svg"
      />
    </div>
    <div class="pt-6">
      <div class="text-2xl font-semibold flex justify-center text-center">
        {{ title }}
      </div>
      <div v-if="false" class="flex justify-center pt-6">
        <div class="flex justify-center text-center">
          {{ subTitle }}
        </div>
      </div>

      <div
        v-if="emailProviderLink !== 'unknowProvider'"
        class="flex justify-center pt-6"
      >
        <div class="flex justify-center text-center">
          <Button
            primary
            label="Confirmer mon email"
            :href="emailProviderLink"
            @click="$emit('goToMail')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  emailProviderLink: {
    type: String,
    required: false,
  },
});

const title =
  "Pour valider votre inscription, veuillez cliquer sur le lien du mail de confirmation qui vous a été envoyé.";
const subTitle = computed(() => {
  return "Pour valider votre inscription, merci de confirmer votre adresse e-mail.";
});
</script>

<style scoped>
.modal {
  z-index: 100;
}
</style>
