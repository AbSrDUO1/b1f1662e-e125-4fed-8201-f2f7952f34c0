"use client";

import { memo } from "react";
import Image from "next/image";
import ButtonTextUnderline from "@/components/button/ButtonTextUnderline";
import { cls } from "@/lib/utils";

interface FooterColumn {
  title: string;
  items: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
  }>;
}

interface FooterBaseProps {
  logoSrc?: string;
  logoWidth?: number;
  logoHeight?: number;
  columns: FooterColumn[];
  copyrightText?: string;
  onPrivacyClick?: () => void;
  ariaLabel?: string;
  className?: string;
  containerClassName?: string;
  logoClassName?: string;
  columnsClassName?: string;
  columnClassName?: string;
  columnTitleClassName?: string;
  columnItemClassName?: string;
  copyrightContainerClassName?: string;
  copyrightTextClassName?: string;
  privacyButtonClassName?: string;
}

const FooterBase = memo<FooterBaseProps>(function FooterBase({
  logoSrc = "/brand/logowhite.svg",
  logoWidth = 120,
  logoHeight = 40,
  columns,
  copyrightText = `© 2025 | Webild`,
  onPrivacyClick,
  ariaLabel = "Site footer",
  className = "",
  containerClassName = "",
  logoClassName = "",
  columnsClassName = "",
  columnClassName = "",
  columnTitleClassName = "",
  columnItemClassName = "",
  copyrightContainerClassName = "",
  copyrightTextClassName = "",
  privacyButtonClassName = "",
}) {
  return (
    <footer
      role="contentinfo"
      aria-label={ariaLabel}
      className={cls("relative overflow-hidden w-full primary-button text-background py-15", className)}
    >
      <div
        className={cls("relative w-content-width mx-auto z-10", containerClassName)}
      >
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-0 justify-between items-start mb-10">
          {logoSrc && (
            <div className="flex-shrink-0">
              <Image
                src={logoSrc}
                alt="Logo"
                width={logoWidth}
                height={logoHeight}
                className={cls("object-contain", logoClassName)}
                unoptimized={logoSrc.startsWith('http') || logoSrc.startsWith('//')}
                aria-hidden={true}
              />
            </div>
          )}

          <div
            className={cls("w-full lg:w-fit flex gap-[var(--width-10)] lg:gap-[calc(var(--width-10)/2)]", columnsClassName)}
          >
            {columns.map((column) => (
              <div
                key={column.title}
                className={cls("flex items-start flex-col gap-4", columnClassName)}
              >
                <h3
                  className={cls("text-sm font-medium text-background/50", columnTitleClassName)}
                >
                  {column.title}
                </h3>
                {column.items.map((item) => (
                  <ButtonTextUnderline
                    key={item.label}
                    text={item.label}
                    href={item.href}
                    onClick={item.onClick}
                    className={cls("text-base font-medium text-background", columnItemClassName)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div
          className={cls("w-full flex items-center justify-between pt-9 border-t border-background/20", copyrightContainerClassName)}
        >
          <span className={cls("text-background/50 text-sm", copyrightTextClassName)}>
            {copyrightText}
          </span>
          <ButtonTextUnderline
            text="Privacy Policy"
            onClick={onPrivacyClick}
            className={cls("text-background/50", privacyButtonClassName)}
          />
        </div>
      </div>
    </footer>
  );
});

FooterBase.displayName = "FooterBase";

export default FooterBase;
