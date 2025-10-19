"use client";

import React, { memo } from "react";
import CardStack from "@/components/cardStack/CardStack";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig } from "@/components/cardStack/types";

type Metric = {
    id: string;
    value: string;
    description: string;
};

interface MetricCardTwoProps {
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
    metricDescriptionClassName?: string;
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
    metricDescriptionClassName?: string;
}

const MetricCardItem = memo(({
    metric,
    cardClassName = "",
    valueClassName = "",
    metricDescriptionClassName = "",
}: MetricCardItemProps) => {
    return (
        <div className={cls("h-50 lg:h-60 2xl:h-70 card text-foreground rounded-theme-capped p-6 flex flex-col justify-between", cardClassName)}>
            <div className={cls("text-9xl lg:text-7xl font-medium", valueClassName)}>
                {metric.value}
            </div>
            <p className={cls("text-xl text-foreground", metricDescriptionClassName)}>
                {metric.description}
            </p>
        </div>
    );
});

MetricCardItem.displayName = "MetricCardItem";

const MetricCardTwo = ({
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
    metricDescriptionClassName = "",
    gridClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
}: MetricCardTwoProps) => {
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
                    metricDescriptionClassName={metricDescriptionClassName}
                />
            ))}
        </CardStack>
    );
};

MetricCardTwo.displayName = "MetricCardTwo";

export default memo(MetricCardTwo);
