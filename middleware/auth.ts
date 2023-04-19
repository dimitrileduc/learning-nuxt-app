export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();
  // exclude index.vue page from middleware
  if (to.name === "index") {
    return;
  }

  if (user.value) {
    return;
  }

  return navigateTo(`/`);
});
