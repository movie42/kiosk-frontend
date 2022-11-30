import { useEffect, useRef, useState } from "react";

const useElementTopOffset = () => {
  const elemetRef = useRef<HTMLDivElement>(null);
  const [topOffset, setTopOffset] = useState<number>(0);

  useEffect(() => {
    if (elemetRef.current) {
      const offsetTop = elemetRef.current.offsetTop as number;
      setTopOffset(offsetTop);
    }
  }, [elemetRef]);

  return { elemetRef, topOffset };
};

export default useElementTopOffset;
