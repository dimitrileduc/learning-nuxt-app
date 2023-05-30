export default async () => {
  const url = "/api/user/usernameData";

  const { data, error, pending } = useFetch<any>(url);

  console.log(data, error, "username");

  return {
    username: data,
    error,
    loading: pending,
  };
};
