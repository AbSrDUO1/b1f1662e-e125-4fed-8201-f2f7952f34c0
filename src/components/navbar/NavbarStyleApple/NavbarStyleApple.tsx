"use client";
import { useState, memo, useCallback } from "react";
import MobileMenu from "../mobileMenu/MobileMenu";
import ButtonTextUnderline from "@/components/button/ButtonTextUnderline";
import Logo from "../Logo";
import { Plus } from "lucide-react";
import { NavbarProps } from "@/types/navigation";
import { useScrollState } from "./useScrollState";
import { cls } from "@/lib/utils";

const SCROLL_THRESHOLD = 50;

const NavbarStyleApple = ({
  navItems,
  logoSrc,
  logoAlt = "",
  brandName = "Webild",
}: NavbarProps) => {
  const isScrolled = useScrollState(SCROLL_THRESHOLD);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleMobileNavClick = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <nav
      className={cls(
        "fixed z-[1000] top-0 left-0 w-full transition-all duration-500 ease-in-out",
        isScrolled
          ? "bg-background/80 backdrop-blur-sm h-15"
          : "bg-background/0 backdrop-blur-0 h-20"
      )}
    >
      <div className="flex items-center justify-between h-full w-content-width mx-auto">
        <div className="flex items-center transition-all duration-500 ease-in-out">
          <Logo logoSrc={logoSrc} logoAlt={logoAlt} brandName={brandName} />
        </div>

        <div
          className="hidden lg:flex items-center gap-6 transition-all duration-500 ease-in-out"
          role="navigation"
        >
          {navItems.map((item, index) => (
            <ButtonTextUnderline
              key={index}
              text={item.name}
              href={item.id}
              className="!text-base"
            />
          ))}
        </div>

        <button
          className="flex lg:hidden shrink-0 h-8 aspect-square rounded-theme bg-foreground items-center justify-center cursor-pointer"
          onClick={handleMenuToggle}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <Plus
            className={cls(
              "w-1/2 h-1/2 text-background transition-transform duration-300",
              menuOpen ? "rotate-45" : "rotate-0"
            )}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </button>
      </div>

      <MobileMenu
        menuOpen={menuOpen}
        onMenuToggle={handleMenuToggle}
        navItems={navItems}
        onNavClick={handleMobileNavClick}
      />
    </nav>
  );
};

export default memo(NavbarStyleApple);
