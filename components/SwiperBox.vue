<template>
  <div class="flex flex-col items-center justify-center">
    <Swiper
      :breakpoints="breakpoints"
      :autoHeight="true"
      :pagination="{ clickable: true, el: '.pagination' }"
      :loop="false"
      :grabCursor="true"
      :modules="[SwiperController, SwiperNavigation, SwiperPagination]"
      class="rounded"
    >
      <SwiperSlide class="rounded flex flex-col">
        <PackCard />
        <div class="shadow_container px-10 mt-4">
          <img src="../static/pack_shadow.svg" /></div
      ></SwiperSlide>
      <SwiperSlide class="rounded flex flex-col">
        <PackCard />
        <div class="shadow_container px-10 mt-4">
          <img src="../static/pack_shadow.svg" /></div
      ></SwiperSlide>
      <SwiperSlide class="rounded flex flex-col">
        <PackCard />
        <div class="shadow_container px-10 mt-4">
          <img src="../static/pack_shadow.svg" /></div
      ></SwiperSlide>
    </Swiper>

    <div
      class="mt-4 pagination flex flex-row items-center justify-center gap-4"
    ></div>
  </div>
</template>
<script setup>
const breakpoints = {
  320: {
    slidesPerView: 1,
  },
  770: {
    slidesPerView: 2,
  },

  1040: {
    slidesPerView: 3,
  },
};
</script>

<style>
.swiper {
  width: 100%;
  height: 100%;
  border-radius: 5px 5px 0px 0px;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
