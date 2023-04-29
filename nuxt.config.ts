import vsharp from "vite-plugin-vsharp";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    stripeSecret: "",
    public: {
      stripeKey: "",
    },
  },
  vite: {
    plugins: [vsharp()],
  },
  fetch: {
    client: false,
    server: false,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxtjs/supabase",
    "nuxt-icon",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/google-fonts",
    "nuxt-icons",
    "nuxt-swiper",
    "@nuxt/image-edge",
  ],

  googleFonts: {
    families: {
      Lato: [300, 400, 500, 600, 700, 900],
    },
  },
  image: {
    provider: "ipx",
    // Options
  },
  compilerOptions: {
    types: ["@nuxt/types", "@nuxt/image"],
  },
});
