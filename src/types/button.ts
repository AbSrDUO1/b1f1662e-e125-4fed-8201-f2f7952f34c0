import type { CTAButtonVariant, ButtonPropsForVariant } from "@/components/button/types";

/**
 * Configuration for button components used across sections.
 *
 * @property text - Button label text (required, 2-15 characters recommended)
 * @property onClick - Optional click handler
 * @property href - Optional link destination (converted to Next.js Link)
 * @property props - Additional variant-specific props (e.g., iconClassName for icon-arrow)
 *
 * @example
 * ```tsx
 * const buttons: ButtonConfig[] = [
 *   { text: "Get Started", href: "/signup" },
 *   { text: "Learn More", onClick: () => console.log("clicked") }
 * ];
 * ```
 *
 * @remarks
 * Button variant (text-stagger, icon-arrow, etc.) is controlled by ThemeProvider.
 * Do not specify variant in ButtonConfig - it's applied automatically.
 */
export interface ButtonConfig {
  text: string;
  onClick?: () => void;
  href?: string;
  props?: Partial<ButtonPropsForVariant<CTAButtonVariant>>;
}
