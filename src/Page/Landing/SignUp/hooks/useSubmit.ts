import { useState } from "react";
import useSignup from "./useSignup";
import { SignUpProps, StoreProps } from "../../interface";

interface useSubmitProps {
  checkStore: boolean;
}

const useSubmit = ({ checkStore }: useSubmitProps) => {
  const { mutate } = useSignup({ checkStore });

  const [saveStore, setSaveStore] = useState(false);
  const [storeInfo, setStoreInfo] = useState<StoreProps>();

  const onSubmit = (data: SignUpProps) => {
    const { email, name, password, code, storeName, phone, address } = data;
    setStoreInfo(() => {
      return { code, name: storeName, phone, address };
    });
    mutate(
      { user: { email, name, password } },
      {
        onSuccess: () => {
          if (checkStore) {
            setSaveStore((prv) => !prv);
          }
        }
      }
    );
  };

  return { onSubmit, saveStore, storeInfo };
};

export default useSubmit;
