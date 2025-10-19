"use client";

import { memo, Fragment } from "react";
import Image from "next/image";
import CardStackTextBox from "@/components/cardStack/CardStackTextBox";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig } from "@/components/cardStack/types";

interface SocialProofTwoProps {
    logos: string[];
    title?: string;
    description?: string;
    tag?: string;
    tagIcon?: LucideIcon;
    buttons?: ButtonConfig[];
    layout?: "default" | "split";
    showCard?: boolean;
    ariaLabel?: string;
    className?: string;
    containerClassName?: string;
    textBoxTitleClassName?: string;
    textBoxDescriptionClassName?: string;
    textBoxClassName?: string;
    textBoxTagClassName?: string;
    textBoxButtonContainerClassName?: string;
    textBoxButtonClassName?: string;
    textBoxButtonTextClassName?: string;
    contentClassName?: string;
    logoRowClassName?: string;
    logoItemClassName?: string;
    logoCardClassName?: string;
    logoImageClassName?: string;
    separatorClassName?: string;
}

const SocialProofTwo = ({
    logos,
    title,
    description,
    tag,
    tagIcon,
    buttons,
    layout = "default",
    showCard = false,
    ariaLabel = "Social proof section",
    className = "",
    containerClassName = "",
    textBoxTitleClassName = "",
    textBoxDescriptionClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
    contentClassName = "",
    logoRowClassName = "",
    logoItemClassName = "",
    logoCardClassName = "",
    logoImageClassName = "",
    separatorClassName = "",
}: SocialProofTwoProps) => {
    // Calculate flex basis based on number of logos (for card version)
    const getFlexBasis = () => {
        if (!showCard) return "";
        const count = logos.length;
        if (count === 2) return "lg:basis-1/2";
        if (count === 3) return "lg:basis-1/3";
        if (count === 4) return "lg:basis-1/4";
        if (count === 5) return "lg:basis-1/5";
        return "lg:flex-1";
    };
    return (
        <section aria-label={ariaLabel} className={cls("w-full py-30", className)}>
            <div className={cls("w-content-width mx-auto flex flex-col gap-8", containerClassName)}>
                {(title || description) && (
                    <CardStackTextBox
                        title={title}
                        description={description}
                        tag={tag}
                        tagIcon={tagIcon}
                        buttons={buttons}
                        layout={layout}
                        textBoxClassName={textBoxClassName}
                        titleClassName={textBoxTitleClassName}
                        descriptionClassName={textBoxDescriptionClassName}
                        tagClassName={textBoxTagClassName}
                        buttonContainerClassName={textBoxButtonContainerClassName}
                        buttonClassName={textBoxButtonClassName}
                        buttonTextClassName={textBoxButtonTextClassName}
                    />
                )}

                <div className={cls("", contentClassName)}>
                    <div className={cls("flex flex-col lg:flex-row items-center", showCard ? "gap-4" : "", logoRowClassName)}>
                        {logos.map((src, i) => (
                            <Fragment key={i}>
                                <div className={cls(
                                    "flex items-center justify-center w-full",
                                    showCard ? getFlexBasis() : "lg:flex-1",
                                    logoItemClassName
                                )}>
                                    <div className={cls(showCard ? "card p-6 rounded-theme w-full h-full flex items-center justify-center" : "", logoCardClassName)}>
                                        <Image
                                            width={500}
                                            height={500}
                                            src={src}
                                            alt={`Partner ${i + 1}`}
                                            className={cls(
                                                "w-1/2 h-auto 2xl:h-10",
                                                showCard ? "lg:w-auto lg:h-8" : "lg:h-8 lg:w-auto lg:max-w-full",
                                                logoImageClassName
                                            )}
                                            unoptimized={src.startsWith('http') || src.startsWith('//')}
                                        />
                                    </div>
                                </div>
                                {!showCard && i < logos.length - 1 && (
                                    <div className={cls(
                                        "w-full h-px lg:w-px lg:h-20 bg-foreground/20",
                                        separatorClassName
                                    )} />
                                )}
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

SocialProofTwo.displayName = "SocialProofTwo";

export default memo(SocialProofTwo);
