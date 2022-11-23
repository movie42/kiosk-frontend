import { useMutation } from "react-query";

export const usePost = (url: RequestInfo) => {
  return useMutation(async () => {
    const response = await fetch(url);
    return response.json();
  });
};
