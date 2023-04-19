<template>
  <ClientOnly>
    <Carousel v-bind="settings" :breakpoints="breakpoints" :wrapAround="true">
      <Slide v-for="slide in 3" :key="slide">
        <div class="carousel__item"><PackCard /></div>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </ClientOnly>
</template>

<script setup>
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

defineProps({
  // Define any props used in the component
});

// Define the data
const settings = reactive({
  itemsToShow: 1,
  snapAlign: "start",
});

const breakpoints = reactive({
  // 700px and up
  700: {
    itemsToShow: 2,
    snapAlign: "start",
  },
  // 1024 and up
  1024: {
    itemsToShow: 3,
    snapAlign: "start",
  },
});
</script>

<style scoped>
.carousel__item {
  min-height: 200px;
  width: 100%;

  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>
