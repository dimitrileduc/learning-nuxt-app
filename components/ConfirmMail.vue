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
      <div class="flex justify-center pt-6">
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
            label="Confirm my email"
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

const title = "Please verify your email adress";
const subTitle = computed(() => {
  return "In order to start using Moon app, you need to confirm your email adress";
});
</script>

<style scoped>
.modal {
  z-index: 100;
}
</style>
