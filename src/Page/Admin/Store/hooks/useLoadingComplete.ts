import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "@/lib/state/userState";

interface Props {
  isSuccess: boolean;
}

const useLoadingComplete = ({ isSuccess }: Props) => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const [isComplete, setIsComplete] = useState(true);

  useEffect(() => {
    let time: NodeJS.Timeout;
    if (isSuccess) {
      time = setTimeout(() => {
        setIsComplete(true);
        navigate(`/admin/${user.id}/store/list`);
      }, 3000);
    }
    return () => time && clearTimeout(time);
  }, [isSuccess]);

  return { isComplete, setIsComplete };
};

export default useLoadingComplete;
