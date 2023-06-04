import vsharp from "vite-plugin-vsharp";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport:
        "width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no",
    },
  },
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
          to: "hello@moon-energy.net",
        },
        smtp: {
          host: "in-v3.mailjet.com",
          port: 465,
          secure: false,
        },
        auth: {
          user: "dd296b2a38a2698b50550d4203113738",
          pass: "3be3675f65babdcfa3638fc7fa911b04",
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
    "@dargmuesli/nuxt-cookie-control",
  ],

  cookieControl: {
    isControlButtonEnabled: false,
    colors: {
      checkboxActiveBackground: "#00A34A", // text-green-600
      barButtonHoverColor: "#fff",
    },

    closeModalOnClickOutside: true,
    cookies: {
      necessary: [
        {
          description: {
            de: "Dieser Cookie tut etwas.",
            en: "This cookie does something very very very very very very very long.",
          },
          name: {
            de: "Notwendiger Cookie",
            en: "Necessary Cookie",
          },
          targetCookieIds: ["NEC"],
        },
      ],
      optional: [
        {
          id: "op",
          name: "Optional Cookie",
          links: {
            "https://example.com": "Privacy Policy",
            "https://example.cop": null,
          },
          targetCookieIds: ["_o", "_p", "_t"],
        },
      ],
    },
    isCookieIdVisible: true,
    locales: ["en", "de"],
    localeTexts: {
      de: {
        iframeBlocked: "Bitte funktionale Cookies aktivieren:",
      },
    },
  },

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
