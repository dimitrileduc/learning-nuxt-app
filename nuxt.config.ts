import vsharp from "vite-plugin-vsharp";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr : false,
  app: {
   
    head: {
      script: [
        {
          src: "cdn.mouseflow.com/projects/0533fffb-29d6-4f0b-9645-0ca28410892c.js",
          defer: true,
        },
      ],
      charset: "utf-8",
      viewport:
        "width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no",
    },
  },
  runtimeConfig: {
    stripeSecret: "",
    mailchimpSecret: "",
    public: {
      stripeKey: "",
      posthogKey: "",
      posthogHost: "",
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
        message: [
          { name: "moon", to: "hello@moon-energy.net" },
          { name: "dimitri", to: "dimitri.leduc87@gmail.com" },
          { name: "delphine", to: "delphine.simon@fame-us.be" },
        ],
        smtp: {
          host: "smtp-relay.sendinblue.com",
          port: 587,
          auth: {
            user: "dimitri.leduc87@gmail.com",
            pass: "hH4xpN3rZ9dcsQq0",
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
    "@dargmuesli/nuxt-cookie-control",
    "nuxt-gtag",
  ],
  gtag: {
    id: "G-27CHPQFYZJ",
  },

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
