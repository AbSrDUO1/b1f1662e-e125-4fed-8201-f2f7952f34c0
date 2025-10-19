"use client";
import { memo } from "react";
import Button from "../button/Button";
import ButtonTextUnderline from "../button/ButtonTextUnderline";
import type { CTAButtonVariant } from "../button/types";
import Logo from "./Logo";
import { NavItem } from "@/types/navigation";
import { cls } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";

interface NavbarLayoutFloatingInlineProps {
  navItems: NavItem[];
  logoSrc?: string;
  logoAlt?: string;
  brandName?: string;
  buttonText?: string;
  buttonVariant?: CTAButtonVariant;
  onButtonClick?: () => void;
  className?: string;
  navItemClassName?: string;
  buttonClassName?: string;
  buttonTextClassName?: string;
}

const NavbarLayoutFloatingInline = memo<NavbarLayoutFloatingInlineProps>(
  function NavbarLayoutFloatingInline({
    navItems,
    logoSrc,
    logoAlt = "",
    brandName = "Webild",
    buttonText = "Join Now",
    buttonVariant = "text-stagger",
    onButtonClick = () => {},
    className = "",
    navItemClassName = "",
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
          "flex items-center justify-between",
          "card rounded-theme",
          "p-3 pl-6 h-fit relative"
        )}>
          <Logo logoSrc={logoSrc} logoAlt={logoAlt} brandName={brandName} />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex gap-6 items-center">
            {navItems.map((item, index) => (
              <ButtonTextUnderline
                key={index}
                text={item.name}
                href={item.id}
                className={cls("!text-base", navItemClassName)}
              />
            ))}
          </div>

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

export default NavbarLayoutFloatingInline;
