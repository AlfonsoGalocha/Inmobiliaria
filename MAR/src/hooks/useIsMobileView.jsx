import { useState, useEffect } from "react";

const useIsMobileView = (breakpoint = 736) => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= breakpoint);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isMobileView;
};

export default useIsMobileView;
