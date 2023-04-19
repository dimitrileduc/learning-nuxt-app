<template>
  <div
    class="container_car border bg-red-50 border-green-400 flex flex-row items-center justify-center"
  >
    <button class="border" @click="prev">Prev</button>
    <div
      class="border border-red-500 flex flex-row items-center justify-center"
    >
      <div class="container-slider w-[304px]">
        <Carousel
          ref="myCarousel"
          v-bind="settings"
          :breakpoints="breakpoints"
          wrapAround="true"
        >
          <Slide v-for="slide in 10" :key="slide">
            <div class="carousel__item border">
              <div class="flex flex-row items-center justify-center">
                <div class="carousel__item"><PackCard /></div>
              </div>
            </div>
          </Slide>
        </Carousel>
      </div>
    </div>

    <button class="border" @click="next">Next</button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  name: "Basic",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
});
</script>

<style>
.container_car {
}
.carousel__item {
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
