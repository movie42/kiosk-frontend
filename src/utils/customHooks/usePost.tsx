import { useMutation } from "react-query";

export const usePost = (url: RequestInfo) => {
  const { mutate, data, isSuccess, isError } = useMutation(async () => {
    const response = await fetch(url);
    return response.json();
  });

  return [data, mutate, isSuccess, isError] as const;
};
