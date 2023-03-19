<template>
  <div>
    <h1>Log in</h1>
    <button
      class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      @click="login"
    >
      Log in with GitHub
    </button>
  </div>
</template>

<script setup>
const { query } = useRoute();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const props = defineProps({
  toPayment: {
    type: Boolean,
    required: false,
    default: false,
  },
});

watchEffect(async () => {
  if (user.value) {
    console.log("watchEffect start", performance.now());
    if (props.toPayment) {
      await navigateTo("/payment", { replace: true });
    } else {
      await navigateTo("/", { replace: true });
    }
  }
});

const login = async () => {
  const redirectTo = props.toPayment
    ? `${window.location.origin}/payment`
    : `${window.location.origin}$/`;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo },
  });

  if (error) {
    console.error(error);
  }
};
</script>

<style scoped></style>
