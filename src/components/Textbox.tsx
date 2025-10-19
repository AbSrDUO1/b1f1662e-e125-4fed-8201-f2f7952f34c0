"use client";

import { memo, useMemo } from "react";
import TextAnimation from "./text/TextAnimation";
import Button from "./button/Button";
import Tag from "./shared/Tag";
import { cls } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";
import { LucideIcon } from "lucide-react";
import type { AnimationType } from "./text/types";
import { useTheme } from "@/providers/ThemeProvider";
import type { ButtonConfig } from "@/types/button";

interface TextBoxProps {
  title: string;
  description: string;
  type?: AnimationType;
  layout?: "default" | "split";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  duration?: number;
  start?: string;
  end?: string;
  gradientColors?: {
    from: string;
    to: string;
  };
  children?: React.ReactNode;
  center?: boolean;
  tag?: string;
  tagIcon?: LucideIcon;
  tagClassName?: string;
  buttons?: ButtonConfig[];
  buttonContainerClassName?: string;
  buttonClassName?: string;
  buttonTextClassName?: string;
}

const TextBox = ({
  title,
  description,
  type,
  layout = "default",
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  duration = 1,
  start = "top 80%",
  end = "top 20%",
  gradientColors,
  children,
  center = false,
  tag,
  tagIcon: TagIcon,
  tagClassName = "",
  buttons,
  buttonContainerClassName = "",
  buttonClassName = "",
  buttonTextClassName = "",
}: TextBoxProps) => {
  const theme = useTheme();

  // Shared tag component
  const tagElement = useMemo(() => tag && (
    <Tag
      text={tag}
      icon={TagIcon}
      className={cls(layout === "default" && "mb-3", tagClassName)}
    />
  ), [tag, TagIcon, layout, tagClassName]);

  // Shared title component
  const titleElement = useMemo(() => (
    <TextAnimation
      type={type || theme.defaultTextAnimation}
      text={title}
      variant="trigger"
      className={cls(
        layout === "split" ? "text-7xl font-medium text-balance" : "text-6xl font-medium",
        center && layout === "default" && "text-center",
        titleClassName
      )}
      duration={duration}
      start={start}
      end={end}
      gradientColors={gradientColors}
    />
  ), [type, theme.defaultTextAnimation, title, layout, center, titleClassName, duration, start, end, gradientColors]);

  // Shared description component
  const descriptionElement = useMemo(() => (
    <TextAnimation
      type={type || theme.defaultTextAnimation}
      text={description}
      variant="words-trigger"
      className={cls(
        "text-lg leading-[1.2]",
        center && layout === "default" && "text-center",
        descriptionClassName
      )}
      duration={duration}
      start={start}
      end={end}
      gradientColors={gradientColors}
    />
  ), [type, theme.defaultTextAnimation, description, center, layout, descriptionClassName, duration, start, end, gradientColors]);

  // Shared buttons/children component
  const actionsElement = useMemo(() => buttons && buttons.length > 0 ? (
    <div className={cls(
      "flex gap-4",
      layout === "default" && "mt-3",
      center && layout === "default" && "justify-center",
      buttonContainerClassName
    )}>
      {/* Limit to 2 buttons for optimal layout */}
      {buttons.slice(0, 2).map((button, index) => (
        <Button key={`${button.text}-${index}`} {...getButtonProps(button, index, theme.defaultButtonVariant, buttonClassName, buttonTextClassName)} />
      ))}
    </div>
  ) : (
    children
  ), [buttons, layout, center, buttonContainerClassName, theme.defaultButtonVariant, buttonClassName, buttonTextClassName, children]);

  // Split layout
  if (layout === "split") {
    return (
      <div className={cls("flex flex-col lg:flex-row gap-3 lg:gap-15 lg:items-end", className)}>
        <div className="w-full lg:w-6/10">
          {titleElement}
        </div>
        <div className="w-full lg:w-4/10 flex flex-col gap-3 items-end">
          {descriptionElement}
        </div>
      </div>
    );
  }

  // Default layout
  return (
    <div className={cls("flex flex-col gap-3 md:gap-1", center && "items-center text-center", className)}>
      {tagElement}
      {titleElement}
      {descriptionElement}
      {actionsElement}
    </div>
  );
};

TextBox.displayName = "TextBox";

export default memo(TextBox);