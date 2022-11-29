import { useEffect, useRef, useState } from "react";

const useStikyHeader = () => {
  const sticky = useRef<HTMLDivElement>(null);
  const [stickyPos, setStickyPos] = useState<number>(0);

  useEffect(() => {
    if (sticky.current) {
      const offsetTop = sticky.current.offsetTop as number;
      setStickyPos(offsetTop);
    }
  }, [sticky]);

  return { sticky, stickyPos };
};

export default useStikyHeader;
