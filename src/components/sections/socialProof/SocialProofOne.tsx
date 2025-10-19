"use client";

import React, { memo } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import CardStackTextBox from "@/components/cardStack/CardStackTextBox";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig } from "@/components/cardStack/types";

interface SocialProofOneProps {
    logos: string[];
    title?: string;
    description?: string;
    tag?: string;
    tagIcon?: LucideIcon;
    buttons?: ButtonConfig[];
    layout?: "default" | "split";
    speed?: number;
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
    logoItemClassName?: string;
    logoCardClassName?: string;
    logoImageClassName?: string;
}

const SocialProofOne = ({
    logos,
    title,
    description,
    tag,
    tagIcon,
    buttons,
    layout = "default",
    speed = 40,
    showCard = true,
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
    logoItemClassName = "",
    logoCardClassName = "",
    logoImageClassName = "",
}: SocialProofOneProps) => {
    const repeatedLogos = [...logos, ...logos, ...logos];

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

                <div className={cls("mask-padding-x", contentClassName)}>
                    <Marquee gradient={false} speed={speed}>
                        {repeatedLogos.map((src, i) => (
                            <div className={cls(showCard ? "mx-4" : "mx-8", logoItemClassName)} key={i}>
                                <div className={cls(showCard ? "card px-4 py-3 mb-1 rounded-theme" : "", logoCardClassName)}>
                                    <Image
                                        width={500}
                                        height={500}
                                        src={src}
                                        alt={`Partner ${i + 1}`}
                                        className={cls(showCard ? "h-7 w-auto" : "h-8 w-auto", logoImageClassName)}
                                        unoptimized={src.startsWith('http') || src.startsWith('//')}
                                    />
                                </div>
                            </div>
                        ))}
                    </Marquee>
                </div>
            </div>
        </section>
    );
};

SocialProofOne.displayName = "SocialProofOne";

export default memo(SocialProofOne);
