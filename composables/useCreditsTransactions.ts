export default async () => {
  const creditsTransactionUrl = `/api/credits/transactions`;

  const { data, error, pending, refresh } = useFetch<any>(
    creditsTransactionUrl
  );

  return {
    creditsTransactions: data,
    error,
    loading: pending,
    refetchCreditsTransactions: refresh,
  };
};
