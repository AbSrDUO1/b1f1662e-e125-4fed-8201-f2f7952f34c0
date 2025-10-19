"use client";

import React, { memo } from "react";
import CardStack from "@/components/cardStack/CardStack";
import PricingBadge from "@/components/shared/PricingBadge";
import PricingFeatureList from "@/components/shared/PricingFeatureList";
import Button from "@/components/button/Button";
import { useTheme } from "@/providers/ThemeProvider";
import { getButtonProps } from "@/lib/buttonUtils";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig } from "@/components/cardStack/types";

type PricingPlan = {
    id: string;
    badge: string;
    badgeIcon?: LucideIcon;
    price: string;
    subtitle: string;
    buttons: ButtonConfig[];
    features: string[];
};

interface PricingCardTwoProps {
    plans: PricingPlan[];
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
    badgeClassName?: string;
    priceClassName?: string;
    subtitleClassName?: string;
    planButtonContainerClassName?: string;
    planButtonClassName?: string;
    featuresClassName?: string;
    featureItemClassName?: string;
    gridClassName?: string;
    carouselClassName?: string;
    controlsClassName?: string;
    textBoxClassName?: string;
    textBoxTagClassName?: string;
    textBoxButtonContainerClassName?: string;
    textBoxButtonClassName?: string;
    textBoxButtonTextClassName?: string;
}

interface PricingCardItemProps {
    plan: PricingPlan;
    cardClassName?: string;
    badgeClassName?: string;
    priceClassName?: string;
    subtitleClassName?: string;
    planButtonContainerClassName?: string;
    planButtonClassName?: string;
    featuresClassName?: string;
    featureItemClassName?: string;
}

const PricingCardItem = memo(({
    plan,
    cardClassName = "",
    badgeClassName = "",
    priceClassName = "",
    subtitleClassName = "",
    planButtonContainerClassName = "",
    planButtonClassName = "",
    featuresClassName = "",
    featureItemClassName = "",
}: PricingCardItemProps) => {
    const theme = useTheme();

    return (
        <div className={cls("card text-foreground rounded-theme-capped p-6 flex flex-col items-center gap-6 lg:gap-8", cardClassName)}>
            <PricingBadge
                badge={plan.badge}
                badgeIcon={plan.badgeIcon}
                className={badgeClassName}
            />

            <div className="flex flex-col gap-1 text-center">
                <div className={cls("text-5xl font-medium", priceClassName)}>
                    {plan.price}
                </div>

                <p className={cls("text-base text-foreground", subtitleClassName)}>
                    {plan.subtitle}
                </p>
            </div>

            {plan.buttons && plan.buttons.length > 0 && (
                <div className={cls("flex flex-col gap-3 w-full", planButtonContainerClassName)}>
                    {plan.buttons.slice(0, 2).map((button, index) => (
                        <Button
                            key={`${button.text}-${index}`}
                            {...getButtonProps(button, index, theme.defaultButtonVariant, cls("w-full", planButtonClassName))}
                        />
                    ))}
                </div>
            )}

            <div className="w-full h-px bg-foreground/10 my-3" />

            <PricingFeatureList
                features={plan.features}
                className={featuresClassName}
                featureItemClassName={featureItemClassName}
            />
        </div>
    );
});

PricingCardItem.displayName = "PricingCardItem";

const PricingCardTwo = ({
    plans,
    carouselMode = "buttons",
    title,
    description,
    tag,
    tagIcon,
    buttons,
    layout = "default",
    ariaLabel = "Pricing section",
    className = "",
    containerClassName = "",
    cardClassName = "",
    textBoxTitleClassName = "",
    textBoxDescriptionClassName = "",
    badgeClassName = "",
    priceClassName = "",
    subtitleClassName = "",
    planButtonContainerClassName = "",
    planButtonClassName = "",
    featuresClassName = "",
    featureItemClassName = "",
    gridClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
}: PricingCardTwoProps) => {
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
            {plans.map((plan, index) => (
                <PricingCardItem
                    key={`${plan.id}-${index}`}
                    plan={plan}
                    cardClassName={cardClassName}
                    badgeClassName={badgeClassName}
                    priceClassName={priceClassName}
                    subtitleClassName={subtitleClassName}
                    planButtonContainerClassName={planButtonContainerClassName}
                    planButtonClassName={planButtonClassName}
                    featuresClassName={featuresClassName}
                    featureItemClassName={featureItemClassName}
                />
            ))}
        </CardStack>
    );
};

PricingCardTwo.displayName = "PricingCardTwo";

export default memo(PricingCardTwo);
