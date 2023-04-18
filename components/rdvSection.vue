<template>
  <div
    class="container px-10 pt-12 lg:pt-10 pb-14 border border-red-400 w-full flex flex-col items-center"
  >
    <div class="flex flex-col items-center sm:max-w-[552px] lg:max-w-[944px]">
      <div><nuxt-icon class="text-[32px]" name="rdv" filled /></div>
      <div class="header">
        <div class="text-2xl font-bold mt-4 text-center">
          Rendez-vous personnel
        </div>
        <div class="text-center mt-4 leading-tight">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam.
        </div>
      </div>

      <div
        class="options mt-10 flex flex-col lg:flex-row items-center gap-14 lg:gap-6"
      >
        <div class="option1 w-full flex flex-col items-center">
          <div class="container_image">
            <img class="max-h-[116px]" src="../static/guidance_classique.svg" />
          </div>
          <div class="mt-6 text-2xl font-bold text-center">
            Guidance classique (60')
          </div>
          <div class="mt-4 leading-tight">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat.
          </div>
          <div class="container_button mt-6 md:mt-8 lg:mt-12">
            <Button primary label="Rendez-vous 1" />
          </div>
        </div>
        <div class="option1 w-full flex flex-col items-center">
          <div class="container_image max-h-[116px]">
            <img class="max-h-[116px]" src="../static/guidance_direct.svg" />
          </div>
          <div class="mt-6 text-2xl font-bold text-center">
            Guidance Directe (30’)
          </div>
          <div class="mt-4 leading-tight">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat.
          </div>
          <div class="container_button mt-6 md:mt-8 lg:mt-12">
            <Button primary label="Rendez-vous 1" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.container {
  max-width: 100%;
  font-family: Lato;
  color: #104b51;
  background-color: #eaf4f4;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
</style>
