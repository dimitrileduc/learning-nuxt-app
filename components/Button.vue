<template>
  <div class="global_button">
    <button
      :disabled="loading"
      class="px-5 xs:px-0 opacity-90 hover:opacity-100"
      :class="[
        primary ? 'primary' : 'secondary',
        noMaxWidth ? 'w-full' : 'xs:w-56',
      ]"
      @click="handleClick"
    >
      <div v-if="loading" class="flex justify-center items-center">
        <Loading class="w-5 h-5 mr-6" /> Chargement...
      </div>

      <div
        v-else
        class="label"
        :class="hasWhiteBg ? 'text-[#51BDDE] hover:text-white' : ''"
      >
        {{ label }}
      </div>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "Button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  primary: {
    type: Boolean,
    default: false,
  },
  small: {
    type: Boolean,
    default: false,
  },
  noMaxWidth: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  hasWhiteBg: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["click"]);

const handleClick = () => {
  if (!props.disabled) {
    emits("click");
  }
};
</script>

<style scoped>
.label {
  z-index: 50;
}
.secondary {
  box-sizing: border-box;
  outline: none;
  color: white;
  position: relative;
  padding-top: 8px;
  padding-bottom: 8px;
  display: inline-block;
  z-index: 1;

  background: none;

  border-image-slice: 1;

  border-radius: 20px;
  box-sizing: border-box;
}

.secondary::before {
  border-radius: 20px;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(90deg, #3fa6c6 -2.23%, #4fbcdd 100%);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
.secondary:hover::before {
  opacity: 1;
}

.secondary::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 20px;
  padding: 2px; /* control the border thickness */
  background: linear-gradient(90deg, #3fa6c6 -2.23%, #4fbcdd 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  transition: all 0.3s ease-in-out; /* add a transition to the selector */
}

.secondary:hover::after {
  opacity: 0; /* set the opacity of the mask to 0 on hover */
}

.global_button {
  font-family: Lato;
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.primary {
  position: relative;
  outline: none;
  box-sizing: border-box;
  color: white;
  background: linear-gradient(90deg, #4fbcdd 0%, #89cfe7 100%);
  z-index: 1;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 20px;
}

.primary::before {
  border-radius: 20px;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(90deg, #3fa6c6 -2.23%, #4fbcdd 100%);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
.primary:hover::before {
  opacity: 1;
}
</style>
