"use client";

import { memo } from "react";
import { useButtonClick } from "./useButtonClick";
import { cls } from "@/lib/utils";

interface ButtonSlideBackgroundProps {
  text: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  textClassName?: string;
  hoverBgColor?: string;
  textColor?: string;
  hoverTextColor?: string;
  disabled?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
}

const ButtonSlideBackground = ({
  text,
  onClick,
  href,
  className = "",
  textClassName = "",
  hoverBgColor = "after:bg-background",
  textColor = "text-white",
  hoverTextColor = "after:text-foreground",
  disabled = false,
  ariaLabel,
  type = "button",
}: ButtonSlideBackgroundProps) => {
  const cubicBezier = "cubic-bezier(0.4, 0, 0, 1)";
  const handleClick = useButtonClick(href, onClick);

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel || text}
      className={cls(
        "group relative primary-button flex items-center justify-center h-9 w-fit px-6 border-0 rounded-theme overflow-hidden cursor-pointer outline-none pointer-events-auto",
        "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-full",
        "after:translate-y-[101%] after:rounded-t-[50%] hover:after:translate-y-0 hover:after:rounded-none",
        "after:transition-all after:duration-500",
        "disabled:cursor-not-allowed disabled:opacity-50",
        hoverBgColor,
        className
      )}
      style={{
        transform: "scaleX(1)",
        transition: `transform 0.5s ${cubicBezier}`,
      }}
    >
      <span
        className={cls(
          "inline-block text-sm overflow-hidden relative",
          "after:content-[attr(data-text)] after:w-full after:h-full after:inline-block after:absolute",
          "after:left-1/2 after:bottom-0 after:z-[1] after:-translate-x-1/2 after:translate-y-full group-hover:after:translate-y-0",
          "after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.2,0,0,1)]",
          textColor,
          hoverTextColor,
          textClassName
        )}
        data-text={text}
      >
        {text}
      </span>
    </button>
  );
};

ButtonSlideBackground.displayName = "ButtonSlideBackground";

export default memo(ButtonSlideBackground);
