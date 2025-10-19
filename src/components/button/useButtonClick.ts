import { useLenis } from "lenis/react";

export const useButtonClick = (href?: string, onClick?: () => void) => {
  const lenis = useLenis();

  const handleClick = () => {
    if (href) {
      const isExternalLink = /^(https?:\/\/|www\.)/.test(href);

      if (isExternalLink) {
        window.open(
          href.startsWith("www.") ? `https://${href}` : href,
          "_blank",
          "noopener,noreferrer"
        );
      } else if (lenis) {
        lenis.scrollTo(`#${href}`);
      }
    }
    onClick?.();
  };

  return handleClick;
};
