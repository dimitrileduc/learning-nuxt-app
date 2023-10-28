import { defineStore } from "pinia";
import { useAuth } from "./useAuth";

type AstroObject = {
  tag: AstrologicalSign;
  access: Boolean;
};

type AstrologicalSign =
  | "belier"
  | "taureau"
  | "gemeaux"
  | "cancer"
  | "lion"
  | "vierge"
  | "balance"
  | "scorpion"
  | "sagittaire"
  | "capricorne"
  | "verseau"
  | "poisson";

export const useBySignVideos = defineStore("useBySignVideos", () => {
  const videosUrl = "/api/videos/bySignVideos";
  const auth = useAuth();
  const { data, error, pending, refresh } = useFetch<any>(videosUrl);
  const selectedVideo = ref(null);

  const signsOptions = computed(() => {
    const tagSet = new Set();

    // Iterate through each item in the array and add its tag to the Set
    data.value.forEach((item: AstroObject, index: number) => {
      if (item.tag) {
        const isLast = index === data.value.length - 1;
        tagSet.add({ tag: item.tag, access: item.access, isLast: isLast });
      }
    });
    // Convert the Set back to an array
    return Array.from(tagSet);
  });

  function refetchBySigns() {
    refresh();
  }

  watchEffect(() => {
    if (auth.user) {
      refetchBySigns();
    }
  });

  console.log("DATA IN COMPSABLE BY SIGNS HOME VIDEOS ", data);

  const updateSelectedVideo = (value: AstroObject) => {
    console.log("updateSelectedVideo from emi", value);
    data.value.forEach((item: any) => {
      if (item.tag === value) {
        selectedVideo.value = item;
      }
    });
  };

  return {
    data,
    error,
    pending,
    refetchBySigns,
    signsOptions,
    selectedVideo,
    updateSelectedVideo
  };
});
