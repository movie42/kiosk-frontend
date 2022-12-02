import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "@/lib/state";
import { useSignupMutation } from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { SignUpProps, StoreProps } from "../../interface";
import useUserQuery from "./useUserQuery";

const useSubmitSignup = () => {
  const setIsUser = useSetRecoilState(userState);
  const [storeInfo, setStoreInfo] = useState<StoreProps>();

  const { refetch } = useUserQuery();

  const { mutate, isSuccess } = useSignupMutation<Error>(
    graphqlReqeustClient(),
    {
      onSuccess: (data) => {
        const {
          signup: { accessToken, refreshToken }
        } = data;
        setIsUser((pre) => ({
          ...pre,
          isLogin: true,
          accessToken,
          refreshToken
        }));
      }
    }
  );

  const { mutate: mutateUserForStore, isSuccess: mutateUserForStoreSuccess } =
    useSignupMutation<Error>(graphqlReqeustClient(), {
      onSuccess: (data) => {
        const {
          signup: { accessToken, refreshToken }
        } = data;
        setIsUser((pre) => ({
          ...pre,
          isLogin: true,
          accessToken,
          refreshToken
        }));
        refetch();
      }
    });

  const submitUserOnly = (data: SignUpProps) => {
    const { email, name, password } = data;
    mutate({ user: { email, name, password } });
  };

  const submitUserAndStore = (data: SignUpProps) => {
    const { email, name, password, code, storeName, phone, address } = data;
    setStoreInfo(() => {
      return { code, name: storeName, phone, address };
    });
    mutateUserForStore({ user: { email, name, password } });
  };

  return {
    submitUserOnly,
    isSuccess,
    submitUserAndStore,
    mutateUserForStoreSuccess,
    storeInfo
  };
};

export default useSubmitSignup;
