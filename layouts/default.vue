<template>
  <div class="w-full h-full m-w-[320px]">
    <div class="container w-full h-full">
      <div class="content bg-green-100 w-full"><slot /></div>
      <div class="nav mt-0 sm:mt-2 lg:mt-4"><NavBar /></div>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.global {
}
.container {
  display: grid;
  grid-template-columns: 100vw;
  grid-template-rows: 1fr 1fr;
  grid-auto-columns: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
}

.content {
  justify-self: stretch;
  align-self: start;
  grid-area: 1 / 1 / 3 / 2;
}

.nav {
  justify-self: stretch;
  align-self: start;
  grid-area: 1 / 1 / 2 / 2;
}
</style>
