import { defineStore } from "pinia";
import { useAuth } from "./useAuth";

export const useBySignVideos = defineStore("useBySignVideos", () => {
  const videosUrl = "/api/videos/bySignVideos";
  const auth = useAuth();
  const { data, error, pending, refresh } = useFetch<any>(videosUrl);

  function refetchBySigns() {
    refresh();
  }

  watchEffect(() => {
    if (auth.user) {
      refetchBySigns();
    }
  });

  console.log("DATA IN COMPSABLE BY SIGNS HOME VIDEOS ", data);

  return {
    data,
    error,
    pending,
    refetchBySigns,
  };
});
