<template>
  <div
    class="global border w-full xs:w-[328px] sm:w-[360px] lg:w-[464px] bg-white px-3 pt-3 py-6 rounded"
  >
    <div class="image-container w-full">
      <div class="container">
        <div class="image-container">
          <img
            class="image w-full object-contain rounded"
            alt=""
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAQlBMVEX///+hoaGenp6ampr39/fHx8fOzs7j4+P8/Pyvr6/d3d3FxcX29va6urqYmJjs7OzU1NSlpaW1tbWtra3n5+e/v78TS0zBAAACkUlEQVR4nO3b63KCMBCGYUwUUVEO6v3fagWVY4LYZMbZnff51xaZ5jON7CZNEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQb5tvI8qzX4/nH84XG5Upfj2ir2V2E5fZ/XpIX9saMnhkYLIkiyRJjdgMoiEDMmiQgfwM8rSu77ew2wnPoLTmwdZBs0J2BuXrYckcQm4nOoP+WcmWAbcTnUHZPy9eA24nOoN7n0HI54ToDM5k8PjluwyqgNuJzqDoaugPg8gWZ4noDAYLwuIg75fLeeHHsjNIzrZJwWwW+0DNsmEWPjiEZ5AcD8ZUu8VZ8HyQMifvBdIz+PS33i8adu+7Qn4Gn1Tdupl7rlCfQb9seosK7RkcBy1o30iVZ5CPOtDW3WhQnsF13IV3v0p3BqfJRoSpXVepzmA/24+yqeMyzRm4tqOs44lSUwa3yfgOri25av5CPRnklR33VlPnrqSZV09qMsiqSWV082xOz1uPajJ49pTM/f115k6guWa6JGjJ4N1lt8fXN2rv/vysjFaSQdFXBc/KKF04ptFPliclGVR9Bu27XCyeVOkmy5OODAZN9rYyyip/AIPJ8qIig+PoXbf7YdPdncFoSdCQQT4ZceV+MhiFMBy0hgyu0yGvOLI17KwpyGBaHK5jtt0N5GcwLw7XZdB31sRn8O+ziqYro8Vn4CwOV+k6a9Iz+PwRsKC7h+gMfMXhKu/OmuwM/MXhKq8yWnYG/uJw5Uxoy2jRGZTBZ/jboxuSM1guDtdNhKazJjiDbNMe0AxzKUVnkO+jEJxBxNtJzWCTxlNLzSB8KehJ/H+mJGYAjaDjzj9SnHZRuXZiAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECXP1XDHv7U4SNFAAAAAElFTkSuQmCC"
          />
        </div>
        <div class="overlay w-full h-full rounded"></div>
        <div class="iconContainer mr-4 mt-4">
          <nuxt-icon
            class="text-2xl sm:text-[32px]"
            :name="unlocked ? 'unlocked' : 'locked'"
            filled
          />
        </div>
      </div>

      <div class="text-container mt-3 my-6 mx-3 sm:mx-4">
        <div class="flex flex-col sm:flex-row sm:gap-2">
          <div class="title font-bold">Titre de la vidéo Youtube</div>
          <div class="date font-bold">05/04/2023</div>
        </div>
        <div class="description mt-3 leading-tight text-justify font-normal">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat
        </div>
      </div>
      <div class="button-container w-full flex justify-center">
        <Button primary :label="buttonLabel" @click="buyCredits" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  unlocked: {
    type: Boolean,
    default: false,
  },
});

const buttonLabel = computed(() => {
  if (props.unlocked) {
    return "Regarder la vidéo";
  } else {
    return "Débloquer la vidéo";
  }
});
</script>

<style scoped>
.global {
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
  font-family: Lato;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
}

.title {
  color: #104b51;
}

.date {
  color: #104b51;
}
.description {
  color: #104b51;
}
.image-container {
  grid-area: 1 / 1 / 3 / 3;
}

.image {
  height: 247px;
}

.overlay {
  grid-area: 1 / 1 / 3 / 3;
  background: linear-gradient(
    252.77deg,
    #104b51 0%,
    rgba(16, 75, 81, 0) 101.21%
  );
}

.iconContainer {
  justify-self: end;
  align-self: start;
  grid-area: 1 / 1 / 3 / 3;
}
.icon {
}
</style>
