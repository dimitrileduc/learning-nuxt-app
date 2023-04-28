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
  <div class="TextInput text-sm">
    <div class="">
      <label class="label pointer-events-none" :for="name">{{
        placeholder
      }}</label>
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
        class="input p-2 px-4 mt-2 w-full placeholder-transparent border rounded border-[#7093976d] peer focus:outline-none focus:border-[#104B51]"
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

.label {
  font-family: "Lato";

  font-weight: 500;
  font-size: 16px;

  color: #104b51;
}
</style>
