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
    handle: string;
    testimonial: string;
    imageSrc?: string;
    imageAlt?: string;
    icon?: LucideIcon;
};

interface TestimonialCardThreeProps {
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
    handleClassName?: string;
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
    handleClassName?: string;
    testimonialClassName?: string;
}

const TestimonialCard = memo(({
    testimonial,
    cardClassName = "",
    imageWrapperClassName = "",
    imageClassName = "",
    iconClassName = "",
    nameClassName = "",
    handleClassName = "",
    testimonialClassName = "",
}: TestimonialCardProps) => {
    const Icon = testimonial.icon || Quote;

    return (
        <div className={cls("card rounded-theme-capped p-6 flex flex-col gap-5", cardClassName)}>
            <div className="flex items-center gap-4">
                <div className={cls("h-11 w-fit aspect-square rounded-theme flex items-center justify-center primary-button overflow-hidden", imageWrapperClassName)}>
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

                <div className="flex flex-col gap-0">
                    <h3 className={cls("text-2xl font-medium text-foreground leading-[1.15]", nameClassName)}>
                        {testimonial.name}
                    </h3>
                    <p className={cls("text-sm text-foreground leading-[1.15]", handleClassName)}>
                        {testimonial.handle}
                    </p>
                </div>
            </div>

            <p className={cls("text-lg text-foreground leading-[1.2]", testimonialClassName)}>
                {testimonial.testimonial}
            </p>
        </div>
    );
});

TestimonialCard.displayName = "TestimonialCard";

const TestimonialCardThree = ({
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
    handleClassName = "",
    testimonialClassName = "",
    gridClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
}: TestimonialCardThreeProps) => {
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
                    handleClassName={handleClassName}
                    testimonialClassName={testimonialClassName}
                />
            ))}
        </CardStack>
    );
};

TestimonialCardThree.displayName = "TestimonialCardThree";

export default memo(TestimonialCardThree);
