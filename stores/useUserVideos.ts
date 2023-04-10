import { defineStore } from "pinia";
import { useAuth } from "./useAuth";

export const useUserVideos = defineStore("useUserVideos", () => {
  const videosUrl = "/api/videos/userVideos";
  const auth = useAuth();
  const { data, error, pending, refresh } = useFetch<any>(videosUrl);

  function refetch() {
    console.log("refetching users videos", auth);
    console.log("data users video", data);
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
    refetchUserVideos: refetch,
  };
});
