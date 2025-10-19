"use client";
import { memo } from "react";
import Button from "../button/Button";
import type { CTAButtonVariant } from "../button/types";
import Logo from "./Logo";
import { cls } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";

interface NavbarStyleMinimalProps {
  logoSrc?: string;
  logoAlt?: string;
  brandName?: string;
  buttonText?: string;
  buttonVariant?: CTAButtonVariant;
  onButtonClick?: () => void;
  className?: string;
  buttonClassName?: string;
  buttonTextClassName?: string;
}

const NavbarStyleMinimal = memo<NavbarStyleMinimalProps>(
  function NavbarStyleMinimal({
    logoSrc,
    logoAlt = "",
    brandName = "Webild",
    buttonText = "Join Now",
    buttonVariant = "text-stagger",
    onButtonClick = () => {},
    className = "",
    buttonClassName = "",
    buttonTextClassName = "",
  }) {
    return (
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={cls(
          "fixed z-[100] top-6 w-full",
          "transition-all duration-500 ease-in-out",
          className
        )}
      >
        <div className={cls(
          "w-content-width mx-auto",
          "flex items-center justify-between"
        )}>
          <Logo logoSrc={logoSrc} logoAlt={logoAlt} brandName={brandName} />

          <Button
            {...getButtonProps(
              { text: buttonText, onClick: onButtonClick },
              0,
              buttonVariant,
              buttonClassName,
              buttonTextClassName
            )}
          />
        </div>
      </nav>
    );
  }
);

export default NavbarStyleMinimal;
