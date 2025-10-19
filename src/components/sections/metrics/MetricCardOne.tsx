"use client";

import React, { memo } from "react";
import CardStack from "@/components/cardStack/CardStack";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig } from "@/components/cardStack/types";

type Metric = {
    id: string;
    value: string;
    title: string;
    description: string;
    icon: LucideIcon;
};

interface MetricCardOneProps {
    metrics: Metric[];
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
    valueClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    iconContainerClassName?: string;
    iconClassName?: string;
    gridClassName?: string;
    carouselClassName?: string;
    controlsClassName?: string;
    textBoxClassName?: string;
    textBoxTagClassName?: string;
    textBoxButtonContainerClassName?: string;
    textBoxButtonClassName?: string;
    textBoxButtonTextClassName?: string;
}

interface MetricCardItemProps {
    metric: Metric;
    cardClassName?: string;
    valueClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    iconContainerClassName?: string;
    iconClassName?: string;
}

const MetricCardItem = memo(({
    metric,
    cardClassName = "",
    valueClassName = "",
    titleClassName = "",
    descriptionClassName = "",
    iconContainerClassName = "",
    iconClassName = "",
}: MetricCardItemProps) => {
    return (
        <div className={cls("h-70 2xl:h-80 card text-foreground rounded-theme-capped p-6 flex flex-col items-center justify-center gap-0 relative", cardClassName)}>
            <div
                className={cls("text-9xl font-foreground font-medium leading-[1.1]", valueClassName)}
                style={{
                    backgroundImage: `linear-gradient(to bottom, var(--color-foreground) 0%, var(--color-foreground) 20%, transparent 72%, transparent 80%, transparent 100%)`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                }}
            >
                {metric.value}
            </div>
            <p className={cls("mt-[calc(var(--text-4xl)*-0.75)] lg:mt-[calc(var(--text-4xl)*-1.15)] text-4xl font-medium text-center", titleClassName)}>
                {metric.title}
            </p>
            <p className={cls("max-w-9/10 lg:max-w-7/10 text-base text-center leading-[1.1] mt-2", descriptionClassName)}>
                {metric.description}
            </p>
            <div className={cls("absolute left-6 bottom-6 h-10 aspect-square primary-button rounded-theme flex items-center justify-center", iconContainerClassName)}>
                <metric.icon className={cls("h-4/10 text-background", iconClassName)} />
            </div>
        </div>
    );
});

MetricCardItem.displayName = "MetricCardItem";

const MetricCardOne = ({
    metrics,
    carouselMode = "buttons",
    title,
    description,
    tag,
    tagIcon,
    buttons,
    layout = "default",
    ariaLabel = "Metrics section",
    className = "",
    containerClassName = "",
    cardClassName = "",
    textBoxTitleClassName = "",
    textBoxDescriptionClassName = "",
    valueClassName = "",
    titleClassName = "",
    descriptionClassName = "",
    iconContainerClassName = "",
    iconClassName = "",
    gridClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
}: MetricCardOneProps) => {
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
            {metrics.map((metric, index) => (
                <MetricCardItem
                    key={`${metric.id}-${index}`}
                    metric={metric}
                    cardClassName={cardClassName}
                    valueClassName={valueClassName}
                    titleClassName={titleClassName}
                    descriptionClassName={descriptionClassName}
                    iconContainerClassName={iconContainerClassName}
                    iconClassName={iconClassName}
                />
            ))}
        </CardStack>
    );
};

MetricCardOne.displayName = "MetricCardOne";

export default memo(MetricCardOne);
