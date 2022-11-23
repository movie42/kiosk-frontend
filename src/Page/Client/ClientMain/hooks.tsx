import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { orderType } from "../../../lib/state/orderState";

interface ParamTypes {
  userId: string | undefined;
  storeId: string | undefined;
}

export const useNavigateHereToGo = ({ userId, storeId }: ParamTypes) => {
  const navigate = useNavigate();
  const setOrderType = useSetRecoilState(orderType);

  const handleOrderMethod = (ordertype: string) => {
    if (ordertype === "here") setOrderType("here");
    if (ordertype === "go") setOrderType("go");
    navigate(`/client/${userId}/${storeId}/menu`);
  };

  return { handleOrderMethod };
};
