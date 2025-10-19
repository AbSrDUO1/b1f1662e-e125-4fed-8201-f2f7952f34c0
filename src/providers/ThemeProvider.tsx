"use client";

import React, { createContext, useContext, ReactNode } from "react";
import type { CTAButtonVariant } from "@/components/button/types";
import type { AnimationType } from "@/components/text/types";

export type BorderRadiusPreset = "sharp" | "rounded" | "soft" | "pill";

interface ThemeConfig {
  defaultButtonVariant: CTAButtonVariant;
  defaultTextAnimation: AnimationType;
  borderRadius: BorderRadiusPreset;
}

interface ThemeProviderProps {
  children: ReactNode;
  defaultButtonVariant: CTAButtonVariant;
  defaultTextAnimation: AnimationType;
  borderRadius: BorderRadiusPreset;
}

const ThemeContext = createContext<ThemeConfig | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useTheme must be used within a ThemeProvider. Wrap your sections in <ThemeProvider> at the app/page level."
    );
  }
  return context;
};

const borderRadiusMap: Record<BorderRadiusPreset, string> = {
  sharp: "0",
  rounded: "var(--radius)",
  soft: "var(--radius-lg)",
  pill: "var(--radius-full)",
};

const borderRadiusCappedMap: Record<BorderRadiusPreset, string> = {
  sharp: "0",
  rounded: "var(--radius)",
  soft: "var(--radius-lg)",
  pill: "var(--radius-xl)", // Capped at xl instead of full
};

export const ThemeProvider = ({
  children,
  defaultButtonVariant,
  defaultTextAnimation,
  borderRadius,
}: ThemeProviderProps) => {
  const themeConfig: ThemeConfig = {
    defaultButtonVariant,
    defaultTextAnimation,
    borderRadius,
  };

  const borderRadiusValue = borderRadiusMap[borderRadius];
  const borderRadiusCappedValue = borderRadiusCappedMap[borderRadius];

  return (
    <ThemeContext.Provider value={themeConfig}>
      <style>{`:root { --theme-border-radius: ${borderRadiusValue}; --theme-border-radius-capped: ${borderRadiusCappedValue}; }`}</style>
      {children}
    </ThemeContext.Provider>
  );
};
