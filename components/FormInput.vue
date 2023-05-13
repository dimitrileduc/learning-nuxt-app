<script setup lang="ts">
import { toRef, computed, ref } from "vue";
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

const showErrorMessage = computed(() => {
  if (props.name == "password") {
    return true;
  }
  return meta.touched;
});

const passwordVisible = ref(false);

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

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
  <div class="TextInput w-full">
    <div class="">
      <!--
      <label class="label pointer-events-none" :for="name">{{
        placeholder
      }}</label>
      -->
      <div class="relative">
        <input
          :id="name"
          :name="name"
          :type="type !== 'password' || passwordVisible ? 'text' : 'password'"
          :value="inputValue"
          :placeholder="placeholder"
          @input="handleChange"
          @blur="handleBlurInput"
          :class="{
            error: meta.touched && !meta.valid,
          }"
          class="bg-[#EAF4F4] input p-2 px-4 mt-2 w-full border border-transparent rounded peer focus:outline-none focus:border-[#104B51]"
        />

        <div
          v-if="props.type === 'password'"
          class="select-none cursor-pointer absolute inset-y-0 right-0 pr-3 mt-2 flex items-center justify-center text-sm leading-5 text-[#7093976d]"
        >
          <div
            class="h-full flex items-center justify-center text-opacity-50"
            @click="togglePasswordVisibility"
          >
            {{ passwordVisible ? "Hide" : "Show" }}
          </div>
        </div>
      </div>

      <div v-if="false" class="m-4">
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

.label {
  font-family: "Lato";

  font-weight: 500;
  font-size: 16px;

  color: #104b51;
}
</style>
