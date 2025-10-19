"use client";

import React, { memo } from "react";
import TextAnimation from "@/components/text/TextAnimation";
import Button from "@/components/button/Button";
import { cls } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";
import { useTheme } from "@/providers/ThemeProvider";
import type { ButtonConfig } from "@/types/button";

interface TextAboutProps {
  title: string;
  buttons?: ButtonConfig[];
  ariaLabel?: string;
  className?: string;
  containerClassName?: string;
  titleClassName?: string;
  buttonContainerClassName?: string;
  buttonClassName?: string;
  buttonTextClassName?: string;
}

const TextAbout = ({
  title,
  buttons,
  ariaLabel = "About section",
  className = "",
  containerClassName = "",
  titleClassName = "",
  buttonContainerClassName = "",
  buttonClassName = "",
  buttonTextClassName = "",
}: TextAboutProps) => {
  const theme = useTheme();

  return (
    <section
      aria-label={ariaLabel}
      className={cls("w-full py-30", className)}
    >
      <div className={cls("w-content-width mx-auto flex flex-col gap-6 items-center", containerClassName)}>
        <TextAnimation
          type={theme.defaultTextAnimation}
          text={title}
          variant="words-trigger"
          className={cls("text-2xl lg:text-5xl font-medium text-center leading-[1.175]", titleClassName)}
        />

        {buttons && buttons.length > 0 && (
          <div className={cls("flex gap-4", buttonContainerClassName)}>
            {buttons.slice(0, 2).map((button, index) => (
              <Button key={index} {...getButtonProps(button, index, theme.defaultButtonVariant, cls("px-8", buttonClassName), cls("text-base", buttonTextClassName))} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

TextAbout.displayName = "TextAbout";

export default memo(TextAbout);
