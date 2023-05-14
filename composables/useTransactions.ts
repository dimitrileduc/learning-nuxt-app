export default async () => {
  const { creditsTransactions, loading: loadingCredits } =
    await useCreditsTransactions();
  const { videosTransactions, loading: loadingVideos } =
    await useVideosTransactions();

  const combinedTransactions = computed(() => {
    if (!creditsTransactions?.value && !videosTransactions?.value) {
      return [];
    }
    return [...creditsTransactions?.value, ...videosTransactions?.value].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  });

  const loading = loadingCredits || loadingVideos;
  const error = loadingCredits && loadingVideos;

  return {
    transactions: combinedTransactions,
    loading,
    error,
  };
};