export default async () => {
  const videosTransactionUrl = `/api/videoPurchase/transactions`;

  const { data, error, pending, refresh } = useFetch<any>(videosTransactionUrl);

  return {
    videosTransactions: data,
    error,
    loading: pending,
    refetchVideosTransactions: refresh,
  };
};
