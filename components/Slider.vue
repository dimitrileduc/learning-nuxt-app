<template>
  <div
    class="w-full border border-green-400 flex flex-row items-center justify-center"
  >
    <button class="border" @click="prev">Prev</button>
    <div
      class="border border-red-500 flex flex-row items-center justify-center"
    >
      <div
        class="container-slider w-full max-w-[304px] sm:max-w-[632px] lg:max-w-[944px]"
      >
        <Carousel
          ref="myCarousel"
          v-bind="settings"
          :breakpoints="breakpoints"
          wrapAround="true"
        >
          <Slide v-for="slide in 10" :key="slide">
            <div class="carousel__item border">
              <div class="flex flex-row items-center justify-center">
                <PackCard />
              </div>
            </div>
          </Slide>
        </Carousel>
      </div>
    </div>

    <button class="border" @click="next">Next</button>
  </div>
  <Carousel
    ref="myCarousel"
    v-bind="settings"
    :breakpoints="breakpoints"
    wrapAround="true"
  >
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item border">
        <div class="flex flex-row items-center justify-center">
          <PackCard />
        </div>
      </div>
    </Slide>
  </Carousel>
</template>

<script setup>
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const myCarousel = ref(null);
const settings = {
  itemsToShow: 1,
  snapAlign: "start",
};

const breakpoints = {
  700: {
    itemsToShow: 2,
    snapAlign: "start",
  },
  1024: {
    itemsToShow: 3,
    snapAlign: "start",
  },
};

const next = () => {
  myCarousel.value.next();
};
const prev = () => {
  myCarousel.value.prev();
};
</script>

<style scoped>
.carousel__slide {
}
</style>
