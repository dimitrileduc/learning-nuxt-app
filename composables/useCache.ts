export default function useCache(key) {
  console.log("try caching", key);
  const cachedValue = ref(process.client ? localStorage.getItem(key) : null);
  console.log("caching", cachedValue.value);

  const saveCache = (value) => {
    if (process.client) {
      console.log("saving cache", value);
      localStorage.setItem(key, value);
    }
  };

  const clearCache = () => {
    if (process.client) {
      console.log("clearing cache for key", key);
      localStorage.removeItem(key);
      cachedValue.value = null;
    }
  };

  return {
    cachedValue,
    saveCache,
    clearCache,
  };
}
