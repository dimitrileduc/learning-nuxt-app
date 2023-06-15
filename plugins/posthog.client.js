import { defineNuxtPlugin } from "#app";
import posthog from "posthog-js";
export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  console.log("runtimeConfig", runtimeConfig);
  const posthogClient = posthog.init(runtimeConfig.public.posthogKey, {
    api_host: runtimeConfig.public.posthogHost || "https://app.posthog.com",
    loaded: (posthog) => {
      if (import.meta.env.MODE === "development") posthog.debug();
    },
  });

  // Make sure that pageviews are captured with each route change
  const router = useRouter();
  router.afterEach((to) => {
    console.log("capture pageview", to.fullPath);
    posthog.capture("$pageview", {
      current_url: to.fullPath,
    });
  });

  return {
    provide: {
      posthog: () => posthogClient,
    },
  };
});
