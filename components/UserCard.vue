<template>
  <div v-if="user" class="rounded p-3 flex items-center space-x-3 bg-gray-100">
    <img
      class="rounded-full w-10 h-10 border-2 border-blue-400"
      :src="profile"
    />
    <div class="text-right">
      <div class="font-medium">{{ name }}</div>
      <button class="text-blue-500" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const { auth } = useSupabaseClient();

const name = computed(() => user.value?.user_metadata.full_name);
const profile = computed(() => user.value?.user_metadata.avatar_url);

const logout = async () => {
  console.log("login");
  const { error } = await auth.signOut();
  if (error) {
    console.log(error);
    return;
  }
  try {
    await $fetch("api/_supabase/session", {
      method: "POST",
      body: { event: "SIGNED_OUT", session: null },
    });
    user.value = null;
  } catch (error) {
    console.log(error);
  }
  await navigateTo("/");
};
</script>
