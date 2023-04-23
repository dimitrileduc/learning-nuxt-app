<script setup lang="ts">
import { toRef, computed } from "vue";
import { useAuth } from "~/stores/useAuth";
import { useField } from "vee-validate";

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  value: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  successMessage: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
});

const name = toRef(props, "name");

const { checkUserExist } = useAuth();

const showExixstingEmailIcon = ref(false);

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});

/*
const debouncedCheckUserExist = debounce(async (email: string) => {
  const exist = await checkUserExist(email);
  console.log("exist", exist);
  if (exist) {
    showExixstingEmailIcon.value = true;
  } else {
    showExixstingEmailIcon.value = false;
  }
}, 5000);
*/

const showErrorMessage = computed(() => {
  if (props.name == "password") {
    return true;
  }
  return meta.touched;
});

const handleBlurEmailInput = (e) => {
  const value = e.target.value;
  if (value.includes("@")) {
    //debouncedCheckUserExist(value);
  }
};

const handleBlurInput = (e) => {
  // if (props.type === "email") { // disable because email usage rate limit
  //handleBlurEmailInput(e);
  //}
  handleBlur(e);
};
</script>

<template>
  <div class="TextInput text-sm py-4">
    <div class="">
      <label
        :for="name"
        class="pointer-events-none text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
        >{{ placeholder }}</label
      >
      <input
        :id="name"
        :name="name"
        :type="type"
        :value="inputValue"
        :placeholder="placeholder"
        @input="handleChange"
        @blur="handleBlurInput"
        :class="{
          error: meta.touched && !meta.valid,
        }"
        class="input px-2 mt-1 w-full h-10 text-gray-900 placeholder-transparent border rounded border-gray-300 peer focus:outline-none focus:border-gray-600"
      />

      <div v-if="true" class="m-8">
        <p
          class="help-message"
          :class="{
            'text-red-400': meta.touched && !meta.valid,
            'text-black': !meta.touched || meta.valid,
          }"
        >
          {{ showErrorMessage ? errorMessage : successMessage }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.help-message {
  position: absolute;
  bottom: calc(-1.5 * 1em);
  left: 0;
  margin: 0;
  font-size: 14px;
}

.error {
  border-color: red;
}
</style>
