export default async () => {
  const url = "/api/videos/syncBySigns";

  

  const { data, error, pending } = useFetch<any>(url);

  console.log(data, error, "syncVideos by signs");

  return {
    videos: data,
    error,
    loading: pending,
  };
};