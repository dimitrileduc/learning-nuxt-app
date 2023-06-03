export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();
  // exclude index.vue page from middleware
  if (
    to.name === "index" ||
    to.name === "cgv" ||
    to.name === "confidentialite"
  ) {
    return;
  }

  if (user.value) {
    return;
  }

  return navigateTo(`/`);
});
