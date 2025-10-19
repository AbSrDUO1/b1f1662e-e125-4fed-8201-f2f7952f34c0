"use client";

import { memo } from "react";
import { Check } from "lucide-react";
import { cls } from "@/lib/utils";

interface PricingFeatureListProps {
    features: string[];
    className?: string;
    featureItemClassName?: string;
    featureIconClassName?: string;
    featureTextClassName?: string;
}

const PricingFeatureList = memo(({
    features,
    className = "",
    featureItemClassName = "",
    featureIconClassName = "",
    featureTextClassName = "",
}: PricingFeatureListProps) => {
    return (
        <div className={cls("flex flex-col gap-3", className)}>
            {features.map((feature, featureIndex) => (
                <div key={featureIndex} className={cls("flex items-start gap-3", featureItemClassName)}>
                    <div className={cls("h-6 aspect-square primary-button rounded-theme flex items-center justify-center", featureIconClassName)}>
                        <Check className="h-4/10 text-background" strokeWidth={1.5} />
                    </div>
                    <span className={cls("text-base text-foreground", featureTextClassName)}>{feature}</span>
                </div>
            ))}
        </div>
    );
});

PricingFeatureList.displayName = "PricingFeatureList";

export default PricingFeatureList;
