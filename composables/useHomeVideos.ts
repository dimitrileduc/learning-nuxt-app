export default async () => {
  const videosUrl = `/api/videos/homeVideos`;

  const { data, error, pending, refresh } = useFetch<any>(videosUrl);
  console.log(data);
  return { data: data, refetch: refresh };
};
