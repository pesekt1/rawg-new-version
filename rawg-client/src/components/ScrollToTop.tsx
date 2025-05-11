import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * A component that scrolls the window to the top whenever the route changes.
 *
 * @returns `null` as it does not render any visible UI.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top-left corner of the page when the pathname changes
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
