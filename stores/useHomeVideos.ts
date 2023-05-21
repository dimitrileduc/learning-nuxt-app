import { defineStore } from "pinia";
import { useAuth } from "./useAuth";

export const useHomeVideos = defineStore("useHomeVideos", () => {
  const videosUrl = "/api/videos/homeVideos";
  const auth = useAuth();
  const { data, error, pending, refresh } = useFetch<any>(videosUrl);

  function refetch() {
    refresh();
  }

  watchEffect(() => {
    if (auth.user) {
      refetch();
    }
  });

  return {
    data,
    error,
    pending,
    refetch,
  };
});
