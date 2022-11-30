import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreProps } from "../../interface";
import useMutateStore from "./useMutateStore";

interface useSubmitStoreProps {
  mutateUserSuccess: boolean;
  mutateUserForStoreSuccess: boolean;
  storeInfo: StoreProps | undefined;
}

const useSubmitStore = ({
  mutateUserSuccess,
  mutateUserForStoreSuccess,
  storeInfo
}: useSubmitStoreProps) => {
  const [checkStore, setCheckStore] = useState(true);
  const { mutateStore } = useMutateStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (mutateUserSuccess && !checkStore) {
      navigate("/login");
    }
    if (mutateUserForStoreSuccess && checkStore && storeInfo) {
      mutateStore({ ...storeInfo });
    }
  }, [mutateUserSuccess, mutateUserForStoreSuccess, checkStore, storeInfo]);

  return { checkStore, setCheckStore };
};

export default useSubmitStore;
