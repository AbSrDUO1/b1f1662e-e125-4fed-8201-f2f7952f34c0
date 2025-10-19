"use client";

import "./FeatureCardThree.css";
import React, { memo, useRef, useCallback } from "react";
import CardStack from "@/components/cardStack/CardStack";
import FeatureCardThreeItem from "./FeatureCardThreeItem";
import { useDynamicDimensions } from "./useDynamicDimensions";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig } from "@/components/cardStack/types";

type FeatureCard = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
};

interface FeatureCardThreeProps {
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
  textBoxTitleClassName?: string;
  textBoxDescriptionClassName?: string;
  cardTitleClassName?: string;
  cardDescriptionClassName?: string;
  gridClassName?: string;
  carouselClassName?: string;
  controlsClassName?: string;
  textBoxClassName?: string;
  textBoxTagClassName?: string;
  textBoxButtonContainerClassName?: string;
  textBoxButtonClassName?: string;
  textBoxButtonTextClassName?: string;
  itemContentClassName?: string;
}

const FeatureCardThree = ({
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
  textBoxTitleClassName = "",
  textBoxDescriptionClassName = "",
  cardTitleClassName = "",
  cardDescriptionClassName = "",
  gridClassName = "",
  carouselClassName = "",
  controlsClassName = "",
  textBoxClassName = "",
  textBoxTagClassName = "",
  textBoxButtonContainerClassName = "",
  textBoxButtonClassName = "",
  textBoxButtonTextClassName = "",
  itemContentClassName = "",
}: FeatureCardThreeProps) => {
  const featureCardThreeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      if (featureCardThreeRefs.current) {
        featureCardThreeRefs.current[index] = el;
      }
    },
    []
  );

  useDynamicDimensions([featureCardThreeRefs], {
    titleSelector: ".feature-card-three-title-row .feature-card-three-title",
    descriptionSelector: ".feature-card-three-description-wrapper .feature-card-three-description",
  });

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
        <FeatureCardThreeItem
          key={`${feature.id}-${index}`}
          ref={setRef(index)}
          item={feature}
          className={cardClassName}
          itemContentClassName={itemContentClassName}
          itemTitleClassName={cardTitleClassName}
          itemDescriptionClassName={cardDescriptionClassName}
        />
      ))}
    </CardStack>
  );
};

FeatureCardThree.displayName = "FeatureCardThree";

export default memo(FeatureCardThree);
