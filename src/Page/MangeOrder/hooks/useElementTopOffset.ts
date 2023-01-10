import { useEffect, useRef, useState } from "react";

const useElementTopOffset = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [topOffset, setTopOffset] = useState<number>(0);

  useEffect(() => {
    if (elementRef.current) {
      const offsetTop = elementRef.current.offsetTop as number;
      setTopOffset(offsetTop);
    }
  }, [elementRef]);

  return { elementRef, topOffset };
};

export default useElementTopOffset;
