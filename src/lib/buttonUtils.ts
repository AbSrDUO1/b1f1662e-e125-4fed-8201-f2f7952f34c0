import { cls } from "./utils";
import { hasBgClassName } from "@/components/button/types";
import type { CTAButtonVariant, ButtonPropsForVariant } from "@/components/button/types";
import type { ButtonConfig } from "@/types/button";

export const getButtonProps = (
  button: ButtonConfig,
  index: number,
  variant: CTAButtonVariant,
  buttonClassName?: string,
  buttonTextClassName?: string
): ButtonPropsForVariant<CTAButtonVariant> => {
  const isPrimary = index === 0;
  const buttonBgClass = isPrimary ? "primary-button" : "secondary-button";
  const buttonTextClass = isPrimary ? "" : "text-foreground";

  // Base props shared by all variants
  const baseProps = {
    text: button.text,
    variant,
    href: button.href,
    onClick: button.onClick,
  };

  // Variants with bgClassName (text-stagger, shift-hover)
  if (hasBgClassName(variant)) {
    const { bgClassName, textClassName } = (button.props || {}) as { bgClassName?: string; textClassName?: string };
    return {
      ...button.props,
      ...baseProps,
      className: cls(buttonTextClass, buttonClassName, button.props?.className),
      bgClassName: cls(buttonBgClass, bgClassName),
      textClassName: cls(buttonTextClassName, textClassName),
    } as ButtonPropsForVariant<CTAButtonVariant>;
  }

  // icon-arrow variant
  if (variant === "icon-arrow") {
    const iconBgClass = isPrimary ? "secondary-button text-foreground" : "primary-button text-background";
    const { textClassName, iconClassName } = (button.props || {}) as { textClassName?: string; iconClassName?: string };
    return {
      ...button.props,
      ...baseProps,
      className: cls(buttonBgClass, buttonTextClass, buttonClassName, button.props?.className),
      textClassName: cls(buttonTextClassName, textClassName),
      iconClassName: cls(iconBgClass, iconClassName),
    } as ButtonPropsForVariant<CTAButtonVariant>;
  }

  // slide-background variant
  if (variant === "slide-background") {
    const { contentClassName } = (button.props || {}) as { contentClassName?: string };

    return {
      ...button.props,
      ...baseProps,
      className: cls(buttonBgClass, buttonClassName, button.props?.className),
      contentClassName: cls(buttonTextClassName, contentClassName),
      ...(isPrimary
        ? {}
        : {
            hoverBgColor: "after:bg-foreground",
            textColor: "text-foreground",
            hoverTextColor: "after:text-background",
          }),
    } as ButtonPropsForVariant<CTAButtonVariant>;
  }

  // hover-magnetic variant (default fallback)
  return {
    ...button.props,
    ...baseProps,
    className: cls(buttonBgClass, buttonTextClass, buttonClassName, button.props?.className),
  } as ButtonPropsForVariant<CTAButtonVariant>;
};
