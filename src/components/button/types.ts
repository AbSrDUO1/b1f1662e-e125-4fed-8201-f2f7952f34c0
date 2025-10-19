export type ButtonVariant =
  | "hover-magnetic"
  | "icon-arrow"
  | "shift-hover"
  | "slide-background"
  | "text-stagger"
  | "text-underline";

export type CTAButtonVariant = Exclude<ButtonVariant, "text-underline">;

export type ButtonWithBgClassName = "text-stagger" | "shift-hover";

export const hasBgClassName = (variant?: string): variant is ButtonWithBgClassName => {
  return variant === "text-stagger" || variant === "shift-hover";
};

export type BaseButtonProps = {
  text: string;
  onClick?: () => void;
  href?: string;
  className?: string;
};

export type ButtonVariantProps =
  | ({
      variant?: "hover-magnetic";
      strengthFactor?: number;
    } & BaseButtonProps)
  | ({
      variant: "icon-arrow";
      textClassName?: string;
      iconClassName?: string;
    } & BaseButtonProps)
  | ({
      variant: "shift-hover";
      bgClassName?: string;
      textClassName?: string;
    } & BaseButtonProps)
  | ({
      variant: "slide-background";
      contentClassName?: string;
      hoverBgColor?: string;
      textColor?: string;
      hoverTextColor?: string;
    } & BaseButtonProps)
  | ({
      variant: "text-stagger";
      bgClassName?: string;
    } & BaseButtonProps)
  | ({
      variant: "text-underline";
      disabled?: boolean;
    } & BaseButtonProps);

export type ButtonPropsForVariant<V extends ButtonVariant> = Extract<
  ButtonVariantProps,
  { variant?: V }
>;