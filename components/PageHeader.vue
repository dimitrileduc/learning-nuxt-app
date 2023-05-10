<template>
  <div class="global_header w-full">
    <div class="container px-0 sm:px-2 lg:px-4 min-h-[500px]">
      <div class="bg">
        <div class="container_overlay w-full inline-flex justify-between">
          <div class="bg-overlay-left">
            <nuxt-img alt="header_left" src="/left.svg" />
          </div>
          <div class="bg-overlay-right">
            <nuxt-img alt="header_right" src="/right.svg" />
          </div>
        </div>
      </div>
      <div
        class="hero pt-20 w-full h-full flex flex-row items-center justify-center text-white px-8"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.global_header {
  background-color: #eaf4f4;
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
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
  justify-self: center;
  align-self: center;
  grid-area: 1 / 1 / 3 / 3;
}
</style>
