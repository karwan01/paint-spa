import { useCallback } from "react";

interface UseSmoothScrollOptions {
  navbarHeight?: number;
  onNavigate?: () => void;
}

export const useSmoothScroll = (options: UseSmoothScrollOptions = {}) => {
  const { navbarHeight = 80, onNavigate } = options;

  const smoothScrollTo = useCallback(
    (elementId: string) => {
      const element = document.getElementById(elementId);
      if (element) {
        const elementPosition = element.offsetTop - navbarHeight;

        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });
      }
    },
    [navbarHeight]
  );

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith("#")) {
        e.preventDefault();
        const elementId = href.substring(1);
        smoothScrollTo(elementId);
        onNavigate?.();
      } else if (href === "/") {
        e.preventDefault();
        scrollToTop();
        onNavigate?.();
      }
    },
    [smoothScrollTo, scrollToTop, onNavigate]
  );

  return {
    smoothScrollTo,
    scrollToTop,
    handleNavClick,
  };
};
