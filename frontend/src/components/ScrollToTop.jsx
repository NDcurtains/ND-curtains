import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Reset scroll position on every route change.
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default ScrollToTop;
