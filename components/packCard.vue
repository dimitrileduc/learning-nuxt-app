<template>
  <div class="global w-[304px] h-[448px]">
    <div class="bg-white rounded flex flex-col items-center">
      <div class="container-image flex flex-col items-center w-full pt-4">
        <nuxt-img
          loading="lazy"
          alt="pack"
          format="webp"
          src="../static/lunepack.svg"
        />
        <div class="mb-2 text-center font-bold text-sm text-white">
          {{ priceLabel }}
        </div>
      </div>
      <div class="text-center px-10 pb-8 w-full flex flex-col items-center">
        <div class="w-full py-4 font-black text-[22px]">{{ pack.price }} €</div>
        <div class="separator_container">
          <nuxt-img
            loading="lazy"
            alt="separator"
            format="webp"
            src="/separator.svg"
          />
        </div>
        <div
          class="details-container w-full py-3 flex flex-col items-center gap-2"
        >
          <div class="container-icones">
            <div class="">
              <nuxt-icon class="text-2xl sm:text-[20px]" name="lune" filled />
            </div>
          </div>
          <div class="details">
            <span class="font-normal">Crédit pour</span>&nbsp
            <span class="font-bold">{{ pack.creditsValue }} videos</span>
          </div>
        </div>
        <div class="separator_container">
          <nuxt-img
            loading="lazy"
            alt="separator"
            format="webp"
            src="/separator.svg"
          />
        </div>
        <div class="w-full py-3">
          <span class="font-normal">Valable</span>&nbsp
          <span class="font-bold">1 an</span>
        </div>
        <div class="separator_container">
          <nuxt-img
            loading="lazy"
            alt="separator"
            format="webp"
            src="/separator.svg"
          />
        </div>
        <div class="button-container w-full pt-4">
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
});

const emits = defineEmits(["buy"]);

const buyPack = () => {
  console.log("buy pack", props.pack.price);
  emits("buy", props.pack.price);
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
