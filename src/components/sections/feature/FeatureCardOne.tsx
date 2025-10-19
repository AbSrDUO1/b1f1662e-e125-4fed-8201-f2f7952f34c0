"use client";

import React, { memo } from "react";
import Image from "next/image";
import CardStack from "@/components/cardStack/CardStack";
import Button from "@/components/button/Button";
import { cls } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";
import { useTheme } from "@/providers/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig } from "@/components/cardStack/types";

type FeatureCard = {
  title: string;
  description: string;
  button?: ButtonConfig;
} & (
  | {
      imageSrc: string;
      imageAlt?: string;
      videoSrc?: never;
      videoAriaLabel?: never;
    }
  | {
      videoSrc: string;
      videoAriaLabel?: string;
      imageSrc?: never;
      imageAlt?: never;
    }
);

interface FeatureCardOneProps {
  features: FeatureCard[];
  carouselMode?: "auto" | "buttons";
  title?: string;
  description?: string;
  tag?: string;
  tagIcon?: LucideIcon;
  buttons?: ButtonConfig[];
  layout?: "default" | "split";
  ariaLabel?: string;
  className?: string;
  containerClassName?: string;
  cardClassName?: string;
  imageClassName?: string;
  videoClassName?: string;
  textBoxTitleClassName?: string;
  textBoxDescriptionClassName?: string;
  cardTitleClassName?: string;
  cardDescriptionClassName?: string;
  cardButtonClassName?: string;
  cardButtonTextClassName?: string;
  gridClassName?: string;
  carouselClassName?: string;
  controlsClassName?: string;
  textBoxClassName?: string;
  textBoxTagClassName?: string;
  textBoxButtonContainerClassName?: string;
  textBoxButtonClassName?: string;
  textBoxButtonTextClassName?: string;
}

const FeatureCardOne = ({
  features,
  carouselMode = "buttons",
  title,
  description,
  tag,
  tagIcon,
  buttons,
  layout = "default",
  ariaLabel = "Feature section",
  className = "",
  containerClassName = "",
  cardClassName = "",
  imageClassName = "",
  videoClassName = "",
  textBoxTitleClassName = "",
  textBoxDescriptionClassName = "",
  cardTitleClassName = "",
  cardDescriptionClassName = "",
  cardButtonClassName = "",
  cardButtonTextClassName = "",
  gridClassName = "",
  carouselClassName = "",
  controlsClassName = "",
  textBoxClassName = "",
  textBoxTagClassName = "",
  textBoxButtonContainerClassName = "",
  textBoxButtonClassName = "",
  textBoxButtonTextClassName = "",
}: FeatureCardOneProps) => {
  const theme = useTheme();

  const hasVideo = (feature: FeatureCard): feature is Extract<FeatureCard, { videoSrc: string }> => {
    return "videoSrc" in feature && !!feature.videoSrc;
  };

  return (
    <CardStack
      mode={carouselMode}
      title={title}
      description={description}
      tag={tag}
      tagIcon={tagIcon}
      buttons={buttons}
      layout={layout}
      className={className}
      containerClassName={containerClassName}
      gridClassName={gridClassName}
      carouselClassName={carouselClassName}
      controlsClassName={controlsClassName}
      textBoxClassName={textBoxClassName}
      titleClassName={textBoxTitleClassName}
      descriptionClassName={textBoxDescriptionClassName}
      tagClassName={textBoxTagClassName}
      buttonContainerClassName={textBoxButtonContainerClassName}
      buttonClassName={textBoxButtonClassName}
      buttonTextClassName={textBoxButtonTextClassName}
      ariaLabel={ariaLabel}
    >
      {features.map((feature, index) => (
        <div
          key={`${feature.title}-${index}`}
          className={cls("card flex flex-col gap-4 p-4 rounded-theme-capped h-full select-none", cardClassName)}
        >
          {hasVideo(feature) ? (
            <video
              src={feature.videoSrc}
              aria-label={feature.videoAriaLabel || "Feature video"}
              aria-hidden={feature.videoAriaLabel === ""}
              autoPlay
              loop
              muted
              playsInline
              className={cls("w-full h-auto rounded-theme-capped select-none pointer-events-none", videoClassName)}
            />
          ) : (
            <Image
              src={feature.imageSrc}
              alt={feature.imageAlt || "Feature image"}
              width={1920}
              height={1080}
              className={cls("w-full h-auto object-cover rounded-theme-capped select-none pointer-events-none", imageClassName)}
              unoptimized={feature.imageSrc.startsWith('http') || feature.imageSrc.startsWith('//')}
              aria-hidden={feature.imageAlt === ""}
            />
          )}
          <div className="flex flex-col gap-1">
            <h3 className={cls("text-2xl font-medium", cardTitleClassName)}>
              {feature.title}
            </h3>
            <p className={cls("text-sm text-foreground leading-[1.1]", cardDescriptionClassName)}>
              {feature.description}
            </p>
          </div>
          {feature.button && (
            <Button {...getButtonProps(feature.button, 0, theme.defaultButtonVariant, cls("w-full", cardButtonClassName), cardButtonTextClassName)} />
          )}
        </div>
      ))}
    </CardStack>
  );
};

FeatureCardOne.displayName = "FeatureCardOne";

export default memo(FeatureCardOne);
