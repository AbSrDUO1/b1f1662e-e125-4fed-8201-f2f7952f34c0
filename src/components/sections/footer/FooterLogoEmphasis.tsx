"use client";

import { memo } from "react";
import ButtonTextUnderline from "@/components/button/ButtonTextUnderline";
import { ChevronRight } from "lucide-react";
import FooterLogo from "./FooterLogo";
import { cls } from "@/lib/utils";

interface FooterColumn {
  items: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
  }>;
}

interface FooterLogoEmphasisProps {
  logoSrc?: string;
  logoAlt?: string;
  columns: FooterColumn[];
  logoText?: string;
  ariaLabel?: string;
  className?: string;
  containerClassName?: string;
  logoClassName?: string;
  columnsClassName?: string;
  columnClassName?: string;
  itemClassName?: string;
  iconClassName?: string;
  buttonClassName?: string;
}

const FooterLogoEmphasis = memo<FooterLogoEmphasisProps>(
  function FooterLogoEmphasis({
    logoSrc,
    logoAlt = "Logo",
    columns,
    logoText = "Webild",
    ariaLabel = "Site footer",
    className = "",
    containerClassName = "",
    logoClassName = "",
    columnsClassName = "",
    columnClassName = "",
    itemClassName = "",
    iconClassName = "",
    buttonClassName = "",
  }) {
    const columnCount = Math.min(columns.length, 5);
    const gridColsClass = columnCount === 1
      ? "grid-cols-1"
      : columnCount === 2
      ? "grid-cols-1 lg:grid-cols-2"
      : columnCount === 3
      ? "grid-cols-1 lg:grid-cols-3"
      : columnCount === 4
      ? "grid-cols-2 lg:grid-cols-4"
      : "grid-cols-2 lg:grid-cols-5";

    return (
      <footer
        className={cls(
          "w-full flex justify-center relative overflow-hidden primary-button text-background rounded-t-theme-capped",
          logoSrc ? "py-15" : "pt-0 pb-15",
          className
        )}
        role="contentinfo"
        aria-label={ariaLabel}
      >
        <div
          className={cls(
            "w-content-width mx-auto flex flex-col relative z-10",
            logoSrc ? "gap-10 lg:gap-20" : "gap-0",
            containerClassName
          )}
        >
          <FooterLogo
            logoSrc={logoSrc}
            logoAlt={logoAlt}
            logoText={logoText}
            className={logoClassName}
          />

          <div
            className={cls("w-full grid gap-[var(--width-10)] lg:gap-[calc(var(--width-10)/2)] mb-10", gridColsClass, columnsClassName)}
          >
            {columns.map((column, index) => (
              <div
                key={`column-${index}`}
                className={cls("flex items-start flex-col gap-4", columnClassName)}
              >
                {column.items.map((item) => (
                  <div
                    key={`${item.label}-${index}`}
                    className={cls("flex items-center gap-2 text-base", itemClassName)}
                  >
                    <ChevronRight
                      className={cls("h-[1em] w-auto", iconClassName)}
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                    <ButtonTextUnderline
                      text={item.label}
                      href={item.href}
                      onClick={item.onClick}
                      className={cls("font-medium text-base", buttonClassName)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </footer>
    );
  }
);

FooterLogoEmphasis.displayName = "FooterLogoEmphasis";

export default FooterLogoEmphasis;
