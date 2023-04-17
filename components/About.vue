<template>
  <div class="container_about bg-white pt-14 pb-12 flex flex-col items-center">
    <div
      class="container-layout w-full flex flex-col lg:flex-row-reverse gap-10 lg:gap-5 lg:max-w-[944px]"
    >
      <div class="content px-10 lg:p-0 flex flex-col items-center lg:w-6/12">
        <div class="text-2xl font-bold text-center">
          L’influence de l’énergie de la lune
        </div>
        <div class="mt-10 leading-tight text-justify">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
          molestie consequat, vel illum dolore eu feugiat nulla facilisis at
          vero eros et accumsan et iusto odio dignissim qui blandit praesent
          luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
          Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
          molestie consequat, vel illum dolore eu feugiat nulla facilisis at
          vero eros et accumsan et iusto odio dignissim qui blandit praesent
          luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
          Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
        </div>
      </div>
      <div
        class="image w-full px-10 lg:p-0 flex flex-col lg:flex-row items-center lg:w-6/12"
      >
        <img class="w-full max-w-[464px]" src="../static/about.png" />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.container-layout {
  color: #104b51;

  font-family: Lato;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
.image {
  background: linear-gradient(#ffffff 50%, #eaf4f4 50%);
}
@media (min-width: 1024px) {
  .image {
    background: none;
  }
}
</style>
