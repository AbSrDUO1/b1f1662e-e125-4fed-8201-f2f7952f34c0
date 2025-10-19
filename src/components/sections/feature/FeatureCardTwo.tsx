"use client";

import React, { memo } from "react";
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
    icon: LucideIcon;
    button?: ButtonConfig;
};

interface FeatureCardTwoProps {
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
    iconClassName?: string;
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

const FeatureCardTwo = ({
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
    iconClassName = "",
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
}: FeatureCardTwoProps) => {
    const theme = useTheme();

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
            {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                    <div
                        key={`${feature.title}-${index}`}
                        className={cls("card flex flex-col justify-between gap-4 p-6 rounded-theme-capped h-70 2xl:h-80 select-none", cardClassName)}
                    >
                        <div className={cls("primary-button h-15 w-fit aspect-square flex items-center justify-center rounded-theme", iconClassName)} aria-hidden="true">
                            <Icon className="h-[40%] w-auto text-background" strokeWidth={1.5} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className={cls("text-2xl font-medium", cardTitleClassName)}>
                                {feature.title}
                            </h3>
                            <p className={cls("text-sm text-foreground leading-[1.1]", cardDescriptionClassName)}>
                                {feature.description}
                            </p>
                            {feature.button && (
                                <div className="mt-2" >
                                    <Button {...getButtonProps(feature.button, 0, theme.defaultButtonVariant, cls("w-full", cardButtonClassName), cardButtonTextClassName)} />
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </CardStack>
    );
};

FeatureCardTwo.displayName = "FeatureCardTwo";

export default memo(FeatureCardTwo);
