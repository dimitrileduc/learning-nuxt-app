<script setup lang="ts">
import { toRef, computed } from "vue";
import { useAuth } from "~/stores/useAuth";
import { useField } from "vee-validate";
import { debounce } from "lodash";

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
const debouncedCheckUserExist = debounce(async (email: string) => {
  const exist = await checkUserExist(email);
  console.log("exist", exist);
  if (exist) {
    showExixstingEmailIcon.value = true;
  } else {
    showExixstingEmailIcon.value = false;
  }
}, 5000);

const showErrorMessage = computed(() => {
  if (props.name == "password") {
    return true;
  }
  return meta.touched;
});

const handleBlurEmailInput = (e) => {
  const value = e.target.value;
  if (value.includes("@")) {
    debouncedCheckUserExist(value);
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
    <label :for="name">{{ label }}</label>
    {{ meta.dirty && !meta.valid }}
    <input
      :name="name"
      :id="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlurInput"
      @focus="showExixstingEmailIcon = false"
      :class="{
        error: meta.touched && !meta.valid,
      }"
    />
    <Icon v-if="showExixstingEmailIcon" name="uil:github" />
    <div class="m-8">
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
</template>

<style scoped>
.icon {
  position: absolute;
  top: 60%;
  right: 10px;

  color: #63c4a0;
  font-size: 22px;
}
.TextInput {
  position: relative;
  margin-bottom: calc(1em * 1.5);
  width: 100%;
}

label {
  display: block;
  margin-bottom: 4px;
  width: 100%;
}

input {
  border-radius: 5px;
  border: 1.5px solid lightgray;
  padding: 10px 15px;
  outline: none;

  width: 100%;
  transition: border-color 0.3s ease-in-out, color 0.3s ease-in-out,
    background-color 0.3s ease-in-out;
}

input:focus {
  border-color: rgb(154, 154, 154);
}

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

.TextInput.error input:focus {
  border: 1px solid #000000;
}

.TextInput.error .help-message {
}

.TextInput.success input {
  border-color: #07e092;
}

.TextInput.success input:focus {
  border-color: #07e092;
}

.TextInput.success .help-message {
  color: var(--success-color);
}
</style>
