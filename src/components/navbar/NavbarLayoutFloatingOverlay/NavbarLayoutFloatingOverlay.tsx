"use client";
import { memo } from "react";
import ExpandingMenu from "../expandingMenu/ExpandingMenu";
import Button from "../../button/Button";
import type { CTAButtonVariant } from "../../button/types";
import Logo from "../Logo";
import { useScrollDetection } from "./useScrollDetection";
import { useMenuAnimation } from "./useMenuAnimation";
import { useResponsive } from "./useResponsive";
import type { NavItem } from "@/types/navigation";
import { cls } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";

interface NavbarLayoutFloatingOverlayProps {
  navItems: NavItem[];
  logoSrc?: string;
  logoAlt?: string;
  brandName?: string;
  buttonText?: string;
  buttonVariant?: CTAButtonVariant;
  onButtonClick?: () => void;
  buttonClassName?: string;
  buttonTextClassName?: string;
}

const NavbarLayoutFloatingOverlay = memo<NavbarLayoutFloatingOverlayProps>(
  function NavbarLayoutFloatingOverlay({
    navItems,
    logoSrc,
    logoAlt = "",
    brandName = "Webild",
    buttonText = "Join Now",
    buttonVariant = "text-stagger",
    onButtonClick = () => {},
    buttonClassName = "",
    buttonTextClassName = "",
  }) {
    const isScrolled = useScrollDetection(50);
    const { menuOpen, buttonZIndex, handleMenuToggle, setMenuOpen } =
      useMenuAnimation();
    const isMobile = useResponsive(768);

    const handleMobileNavClick = () => {
      setMenuOpen(false);
    };

    return (
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={cls(
          "fixed z-[100] top-6 w-full",
          "transition-all duration-500 ease-in-out"
        )}
      >
        <div
          className={cls(
            "w-content-width mx-auto",
            "flex items-center justify-between",
            "card rounded-theme",
            "px-6 lg:pr-3"
          )}
          style={{
            height: "calc(var(--vw-0_75) + var(--vw-0_75) + var(--height-9))",
          }}
        >
          <Logo logoSrc={logoSrc} logoAlt={logoAlt} brandName={brandName} />
          <div
            className="flex items-center transition-all duration-500 ease-in-out"
            style={{ paddingRight: "calc(var(--height-9) + var(--vw-0_75))" }}
          >
            {!isMobile && (
              <div className="hidden lg:flex">
                <Button
                  {...getButtonProps(
                    { text: buttonText, onClick: onButtonClick },
                    0,
                    buttonVariant,
                    cls(buttonZIndex, buttonClassName),
                    buttonTextClassName
                  )}
                />
              </div>
            )}
            <ExpandingMenu
              isOpen={menuOpen}
              onToggle={handleMenuToggle}
              navItems={navItems}
              onNavClick={handleMobileNavClick}
              isScrolled={isScrolled}
            />
          </div>
        </div>
      </nav>
    );
  }
);

export default NavbarLayoutFloatingOverlay;
