import { defineStore } from "pinia";
import { useAuth } from "./useAuth";

type AstroObject = {
  tag: AstrologicalSign;
  access: Boolean;
};

type AstrologicalSign =
  | "Bélier"
  | "Taureau"
  | "Gémeaux"
  | "Cancer"
  | "Lion"
  | "Vierge"
  | "Balance"
  | "Scorpion"
  | "Sagittaire"
  | "Capricorne"
  | "Verseau"
  | "Poissons";

export const useBySignVideos = defineStore("useBySignVideos", () => {
  const videosUrl = "/api/videos/bySignVideos";
  const auth = useAuth();
  const { data, error, pending, refresh } = useFetch<any>(videosUrl);
  const selectedVideoTag = ref(null);

 

  function refetchBySigns() {
    console.log("refetch by signs")
    refresh();
  }

  watchEffect(() => {
    if (auth.user) {
      refetchBySigns();
    }
  });

  console.log("DATA IN COMPSABLE BY SIGNS HOME VIDEOS ", data);

  const updateSelectedVideoTag = (value: any) => {
    // console.log("updateSelectedVideo from emi", value);
    // data.value.forEach((item: any) => {
    //   if (item.tag === value) {
    //     selectedVideo.value = item;
    //   }
    // });
    selectedVideoTag.value = value;
  };

  

  return {
    data,
    error,
    pending,
    refetchBySigns,
  
    selectedVideoTag,
    updateSelectedVideoTag
  };
});
