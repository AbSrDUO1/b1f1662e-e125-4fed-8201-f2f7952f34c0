"use client";

import React, { memo } from "react";
import Image from "next/image";
import CardStack from "@/components/cardStack/CardStack";
import { cls } from "@/lib/utils";
import { Quote } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig } from "@/components/cardStack/types";

type Testimonial = {
    id: string;
    name: string;
    role: string;
    testimonial: string;
    imageSrc?: string;
    imageAlt?: string;
    icon?: LucideIcon;
};

interface TestimonialCardTwoProps {
    testimonials: Testimonial[];
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
    imageWrapperClassName?: string;
    imageClassName?: string;
    iconClassName?: string;
    nameClassName?: string;
    roleClassName?: string;
    testimonialClassName?: string;
    gridClassName?: string;
    carouselClassName?: string;
    controlsClassName?: string;
    textBoxClassName?: string;
    textBoxTagClassName?: string;
    textBoxButtonContainerClassName?: string;
    textBoxButtonClassName?: string;
    textBoxButtonTextClassName?: string;
}

interface TestimonialCardProps {
    testimonial: Testimonial;
    cardClassName?: string;
    imageWrapperClassName?: string;
    imageClassName?: string;
    iconClassName?: string;
    nameClassName?: string;
    roleClassName?: string;
    testimonialClassName?: string;
}

const TestimonialCard = memo(({
    testimonial,
    cardClassName = "",
    imageWrapperClassName = "",
    imageClassName = "",
    iconClassName = "",
    nameClassName = "",
    roleClassName = "",
    testimonialClassName = "",
}: TestimonialCardProps) => {
    const Icon = testimonial.icon || Quote;

    return (
        <div className={cls("card rounded-theme-capped p-6 flex flex-col gap-6", cardClassName)}>
            <div className={cls("h-30 w-fit aspect-square rounded-theme flex items-center justify-center primary-button overflow-hidden", imageWrapperClassName)}>
                {testimonial.imageSrc ? (
                    <Image
                        src={testimonial.imageSrc}
                        alt={testimonial.imageAlt || testimonial.name}
                        width={800}
                        height={800}
                        className={cls("w-full h-full object-cover select-none pointer-events-none", imageClassName)}
                        unoptimized={testimonial.imageSrc.startsWith('http') || testimonial.imageSrc.startsWith('//')}
                        aria-hidden={testimonial.imageAlt === ""}
                    />
                ) : (
                    <Icon className={cls("h-1/2 w-1/2 text-background", iconClassName)} strokeWidth={1} />
                )}
            </div>

            <div className="flex flex-col gap-1 mt-1">
                <h3 className={cls("text-2xl font-medium text-foreground leading-[1.1]", nameClassName)}>
                    {testimonial.name}
                </h3>
                <p className={cls("text-base text-foreground leading-[1.1]", roleClassName)}>
                    {testimonial.role}
                </p>
            </div>

            <p className={cls("text-lg text-foreground leading-[1.25]", testimonialClassName)}>
                {testimonial.testimonial}
            </p>
        </div>
    );
});

TestimonialCard.displayName = "TestimonialCard";

const TestimonialCardTwo = ({
    testimonials,
    carouselMode = "buttons",
    title,
    description,
    tag,
    tagIcon,
    buttons,
    layout = "default",
    ariaLabel = "Testimonials section",
    className = "",
    containerClassName = "",
    cardClassName = "",
    textBoxTitleClassName = "",
    textBoxDescriptionClassName = "",
    imageWrapperClassName = "",
    imageClassName = "",
    iconClassName = "",
    nameClassName = "",
    roleClassName = "",
    testimonialClassName = "",
    gridClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
}: TestimonialCardTwoProps) => {
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
            {testimonials.map((testimonial, index) => (
                <TestimonialCard
                    key={`${testimonial.id}-${index}`}
                    testimonial={testimonial}
                    cardClassName={cardClassName}
                    imageWrapperClassName={imageWrapperClassName}
                    imageClassName={imageClassName}
                    iconClassName={iconClassName}
                    nameClassName={nameClassName}
                    roleClassName={roleClassName}
                    testimonialClassName={testimonialClassName}
                />
            ))}
        </CardStack>
    );
};

TestimonialCardTwo.displayName = "TestimonialCardTwo";

export default memo(TestimonialCardTwo);
