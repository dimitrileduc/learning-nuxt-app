<template>
  <div v-if="user" class="rounded flex items-center space-x-3">
    <div class="text-right flex flex-row gap-6 items-center">
      <div class="flex flex-row items-center justify-center gap-2">
        <nuxt-icon class="text-[24px]" name="lune" filled />
        <div class="credits flex flex-row gap-1">
          <div>
            {{ creditsDiplayed }}
          </div>
          <div class="hidden md:flex">{{ labelCredits }}</div>
        </div>
      </div>
      <nuxt-img alt="hero" class="justify-center" src="/vertical.svg" />
      <div class="name font-medium">{{ username }}</div>
    </div>

    <div class="flex flex-center justify-center" v-if="user.profile">
      <nuxt-img
        alt="user-card"
        class="rounded-full w-9 h-9 border-2 border-blue-400"
        :src="profile"
      />
    </div>
    <div class="flex flex-center justify-center" else>
      <nuxt-img class="h-9" alt="youtube" src="/avatar.svg" />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

import { useAuth } from "~/stores/useAuth";
import { usePayment } from "~~/stores/usePayment";
import { useNav } from "~/stores/useNav";

const { username } = await useUsername();
console.log("USERNAME", username);

const { switchMenu } = useNav();

const { user } = storeToRefs(useAuth());
const { setShowPayment } = usePayment();

const emits = defineEmits(["hideAuth"]);

const { logout } = useAuth();

const logoutUser = () => {
  logout();
  emits("hideAuth");
  setShowPayment(false);
};

const name = computed(() => user.value?.user_metadata.full_name ?? "");
const profile = computed(() => user.value?.user_metadata.avatar_url);
const { credits, loading } = await useCredits();

const creditsDiplayed = computed(() => {
  if (credits.value && credits.value > 0) {
    return credits.value;
  } else {
    return 0;
  }
});

const labelCredits = computed(() => {
  console.log("credits", credits.value);
  if (credits.value && credits.value > 0) {
    return "crédits";
  } else {
    return "crédit";
  }
});

console.log(credits, "credits");
</script>

<style scoped>
.name {
  font-style: normal;
  font-weight: 700;

  text-align: right;

  color: #cfe4ba;
}

.credits {
  font-style: normal;
  font-weight: 700;

  text-align: right;

  color: #ffffff;
}
</style>
