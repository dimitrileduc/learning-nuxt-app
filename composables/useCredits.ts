interface CreditData {
  credits: number;
}

export default async () => {
  const creditUrl = `/api/credits/credits`;

  const { data, error, pending, refresh } = useFetch<CreditData>(creditUrl);

  return {
    credits: data,
    error,
    loading: pending,
    refetchCredits: refresh,
  };
};
