"use client";

import { memo } from "react";
import Image from "next/image";
import { cls } from "@/lib/utils";

interface LogoProps {
  logoSrc?: string;
  logoAlt?: string;
  brandName?: string;
  className?: string;
  imageClassName?: string;
  textClassName?: string;
}

const Logo = memo<LogoProps>(function Logo({
  logoSrc,
  logoAlt = "",
  brandName = "Webild",
  className = "",
  imageClassName = "",
  textClassName = ""
}) {
  if (logoSrc) {
    return (
      <div className={cls("relative h-[var(--text-xl)] w-auto", className)}>
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={100}
          height={24}
          className={cls("h-full w-auto object-contain", imageClassName)}
        />
      </div>
    );
  }

  return (
    <h2 className={cls("text-xl font-medium text-foreground", textClassName)}>
      {brandName}
    </h2>
  );
});

Logo.displayName = "Logo";

export default Logo;