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
      <SwiperSlide v-for="pack in packs" class="rounded flex flex-col">
        <PackCard :pack="pack" @buy="buyPack" />
        <div class="shadow_container px-10 mt-4">
          <nuxt-img alt="shadow" src="/pack_shadow.svg" /></div
      ></SwiperSlide>
    </Swiper>

    <div
      class="mt-4 pagination flex flex-row items-center justify-center gap-2"
    ></div>

    <AuthModal :toPayment="true" v-if="showAuthForm" @close="closeAuth" />
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { usePayment } from "~~/stores/usePayment";
import { useAuth } from "~/stores/useAuth";

const showAuthForm = ref(false);
const { showPayment, setShowPayment, amount, setAmount } = usePayment();
const { login, loading, user } = storeToRefs(useAuth());

const props = defineProps({
  packs: {
    type: Array,
    required: true,
  },
});

const closeAuth = () => {
  console.log("Close auth");
  showAuthForm.value = false;
};

const buyPack = (price) => {
  console.log("buy pack", price);
  showAuthForm.value = false;
  setShowPayment(false);
  setAmount(price);
  if (user.value) {
    setShowPayment(true);
  } else {
    showAuthForm.value = true;
  }
};

//setShowPayment(true);
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

.pagination {
  /* Your styles for the pagination container */
}

.swiper-pagination-bullet {
  background: none;
  border: 1px solid #104b51;
  width: 12px;
  height: 12px;
  opacity: 1;
  /* Your styles for each pagination bullet */
}

.swiper-pagination-bullet-active {
  background-color: #104b51;
  /* Your styles for the active pagination bullet */
}
</style>
