<template>
  <div class="global_header w-full">
    <div class="container px-0 sm:px-2 lg:px-4">
      <div class="bg mb-[112px] sm:mb-[106px] lg:mb-[56px]">
        <div class="container_overlay w-full flex inline-flex justify-between">
          <div class="bg-overlay-left">
            <img src="../static/left.svg" />
          </div>
          <div class="bg-overlay-right">
            <img src="../static/right.svg" />
          </div>
        </div>
      </div>
      <div class="hero border border-red-400 pt-20"><Hero /></div>
      <div id="section-products" class="products"><ProductsSection /></div>
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
