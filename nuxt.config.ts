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
    [
      "nuxt-mail",
      {
        message: {
          to: "foo@bar.de",
        },
        smtp: {
          service: "gmail",
          auth: {
            user: "foo@gmail.com",
            pass: "<app-specific password>",
          },
        },
      },
    ],
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
    "nuxt-calendly",
  ],

  googleFonts: {
    families: {
      Lato: [300, 400, 500, 600, 700, 900],
    },
  },
  image: {
    // Options
  },

  meta: {
    title: "Moon energy",
  },

  compilerOptions: {
    paths: {
      "*": ["types/*"],
    },
    types: ["@nuxt/types", "@nuxt/image"],
  },
});
