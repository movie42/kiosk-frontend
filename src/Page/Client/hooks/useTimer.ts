import { useEffect, useState } from "react";

const useTimer = (
  isPaid: boolean,
  setIsPrint: (value: React.SetStateAction<boolean>) => void
) => {
  const [remain, setRemain] = useState(5);

  useEffect(() => {
    if (isPaid) {
      const closeTimer = setTimeout(() => {
        setIsPrint(true);
      }, 5000);

      return () => clearTimeout(closeTimer);
    }
  }, [isPaid]);

  useEffect(() => {
    if (isPaid) {
      const showTimer = setInterval(() => {
        setRemain((prv) => prv - 1);
      }, 1000);
      return () => clearInterval(showTimer);
    }
  }, [setRemain, isPaid]);

  return { remain };
};

export default useTimer;
