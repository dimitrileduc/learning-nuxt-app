<template>
  <div class="global w-[304px]">
    <div class="bg-white rounded flex flex-col items-center">
      <div class="container-image flex flex-col items-center w-full pt-4">
        <img src="../static/lunepack.svg" />
        <div class="mb-2 text-center font-bold text-sm text-white">Lune</div>
      </div>
      <div class="text-center px-10 pb-8 w-full flex flex-col items-center">
        <div class="w-full py-4 font-black text-[22px]">9,90 €</div>
        <div class="separator_container">
          <img src="../static/separator.svg" />
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
            <span class="font-bold">1 videos</span>
          </div>
        </div>
        <div class="separator_container">
          <img src="../static/separator.svg" />
        </div>
        <div class="w-full py-3">
          <span class="font-normal">Valable</span>&nbsp
          <span class="font-bold">1 an</span>
        </div>
        <div class="separator_container">
          <img src="../static/separator.svg" />
        </div>
        <div class="button-container w-full pt-4">
          <Button primary label="Acheter ce pack" />
        </div>
      </div>
    </div>
    <div class="shadow_container px-10 w-full mt-4">
      <img src="../static/pack_shadow.svg" />
    </div>
  </div>
</template>

<script setup></script>

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
