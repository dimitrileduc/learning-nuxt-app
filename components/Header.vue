<template>
  <div class="global_header w-full relative">
    <div class="absolute inset-0 z-0">
      <nuxt-img
        alt="header_lune"
        class="absolute z-0 mx-auto w-10/12 top-4 left-0 right-0 md:top-20 md:left-0 md:right-0 md:w-[656px] lg:right-auto lg:-top-4 lg:left-48 lg:w-[660px]"
        src="/lune_gradient.svg"
      />
    </div>
    <div class="container px-0 sm:px-2 lg:px-4">
      <div class="bg mb-[112px] sm:mb-[106px] lg:mb-[56px]">
        <div class="container_overlay w-full inline-flex justify-between">
          <div class="bg-overlay-left">
            <nuxt-img alt="header_left" src="/left.svg" />
          </div>
          <div class="bg-overlay-right">
            <nuxt-img alt="header_right" src="/right.svg" />
          </div>
        </div>
      </div>
      <div class="hero pt-24 relative z-10"><Hero /></div>
      <div id="tirages" class="products"><ProductsSection /></div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.global_header {
  background-color: #eaf4f4;
}
.container {
  max-width: 100vw;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  gap: 0px 0px;
  grid-auto-flow: row;
}

.bg {
  background: radial-gradient(50% 50% at 50% 50%, #145661 0%, #104b51 100%);
  border-radius: 0px 0px 10px 10px;
  justify-self: stretch;
  align-self: stretch;
  grid-area: 1 / 1 / 3 / 2;
}

.hero {
  justify-self: stretch;
  align-self: start;
  grid-area: 1 / 1 / 2 / 2;
}

.products {
  justify-self: stretch;
  align-self: start;
  grid-area: 2 / 1 / 3 / 2;
}
</style>
