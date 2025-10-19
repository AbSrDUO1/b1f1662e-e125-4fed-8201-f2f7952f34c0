"use client";

import { memo } from "react";
import useMagneticEffect from "./useMagneticEffect";
import { useButtonClick } from "../useButtonClick";
import { cls } from "@/lib/utils";

interface ButtonHoverMagneticProps {
  text: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  textClassName?: string;
  strengthFactor?: number;
  disabled?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
}

const ButtonHoverMagnetic = ({
  text,
  onClick,
  href,
  className = "",
  textClassName = "",
  strengthFactor = 20,
  disabled = false,
  ariaLabel,
  type = "button",
}: ButtonHoverMagneticProps) => {
  const magneticRef = useMagneticEffect(strengthFactor);
  const handleClick = useButtonClick(href, onClick);

  return (
    <button
      ref={magneticRef as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel || text}
      className={cls(
        "relative cursor-pointer h-9 primary-button rounded-theme px-6 text-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      <span className={cls("text-sm", textClassName)}>{text}</span>
    </button>
  );
};

ButtonHoverMagnetic.displayName = "ButtonHoverMagnetic";

export default memo(ButtonHoverMagnetic);
