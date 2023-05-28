<template>
  <div class="global w-[304px]">
    <div class="bg-white rounded flex flex-col items-center">
      <div class="container-image flex flex-col items-center w-full pt-4">
        <nuxt-img alt="pack" class="w-52" :src="imgSrc" />
        <div class="mb-2 text-center font-bold text-sm text-white">
          {{ pack.title }}
        </div>
      </div>
      <div
        class="text-center px-10 w-full flex flex-col items-center"
        :class="noButton ? 'pb-3' : 'pb-8'"
      >
        <div class="w-full py-4 font-black text-[22px]">{{ pack.price }} €</div>
        <div class="separator_container">
          <nuxt-img alt="separator" src="/separator.svg" />
        </div>
        <div
          class="details-container w-full py-3 flex flex-col items-center gap-0.5"
        >
          <div class="container-icones flex flex-row gap-2">
            <div v-for="index in pack.creditsValue" class="">
              <nuxt-img class="h-5" alt="youtube" src="/lune.svg" />
            </div>
          </div>
          <div class="details">
            <span class="font-normal">Crédit pour</span>
            <span class="pl-1 font-bold">{{ pack.creditsValue }} videos</span>
          </div>
        </div>
        <div class="separator_container">
          <nuxt-img alt="separator" src="/separator.svg" />
        </div>
        <div class="w-full py-3">
          <span class="font-normal">Valable</span>
          <span class="font-bold pl-1">1 an</span>
        </div>
        <div v-if="!noButton" class="separator_container">
          <nuxt-img alt="separator" src="/separator.svg" />
        </div>
        <div
          v-if="!noButton"
          class="text-base w-full pt-7 flex flex-col justify-center"
        >
          <Button primary label="Acheter ce pack" @click="buyPack" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  pack: {
    type: Object,
    required: true,
  },
  noButton: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const imgSrc = computed(() => {
  return `/${props.pack.type}.svg`;
});

const emits = defineEmits(["buy"]);

const buyPack = () => {
  console.log("buy pack", props.pack.price);
  emits("buy", props.pack.creditsValue);
};

const priceLabel = computed(() => {
  return `${props.pack.price.toFixed(2)} €`;
});
</script>

<style scoped>
.global {
  font-family: Lato;
  color: #104b51;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
.container-image {
  background: radial-gradient(50% 50% at 50% 50%, #145661 0%, #104b51 100%);
  border-radius: 5px 5px 0px 0px;
}
</style>
