import { defineStore } from "pinia";
import { useAuth } from "./useAuth";

export const useUsername = defineStore("useUsername", () => {
  const url = "/api/user/usernameData";
  const auth = useAuth();
  const { data, error, pending, refresh } = useFetch<any>(url);

  return {
    data,
    error,
    pending,
  };
});
