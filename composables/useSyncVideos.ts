export default async () => {
  const url = "/api/videos/syncVideos";

  const { data, error, pending } = useFetch<any>(url);

  console.log(data, error, "syncVideos ????");

  return {
    videos: data,
    error,
    loading: pending,
  };
};
