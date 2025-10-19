"use client";

import React, { memo, useState, useCallback } from "react";
import CardStackTextBox from "@/components/cardStack/CardStackTextBox";
import Accordion from "@/components/Accordion";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig } from "@/components/cardStack/types";

interface FaqItem {
    id: string;
    title: string;
    content: string;
}

interface FaqDoubleProps {
    faqs: FaqItem[];
    title?: string;
    description?: string;
    tag?: string;
    tagIcon?: LucideIcon;
    buttons?: ButtonConfig[];
    layout?: "default" | "split";
    animationType?: "smooth" | "instant";
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
    faqsContainerClassName?: string;
    columnClassName?: string;
    accordionClassName?: string;
    accordionTitleClassName?: string;
    accordionIconContainerClassName?: string;
    accordionIconClassName?: string;
    accordionContentClassName?: string;
}

const FaqDouble = ({
    faqs,
    title,
    description,
    tag,
    tagIcon,
    buttons,
    layout = "default",
    animationType = "smooth",
    ariaLabel = "FAQ section",
    className = "",
    containerClassName = "",
    textBoxTitleClassName = "",
    textBoxDescriptionClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
    faqsContainerClassName = "",
    columnClassName = "",
    accordionClassName = "",
    accordionTitleClassName = "",
    accordionIconContainerClassName = "",
    accordionIconClassName = "",
    accordionContentClassName = "",
}: FaqDoubleProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleToggle = useCallback((index: number) => {
        setActiveIndex((prevActiveIndex) =>
            prevActiveIndex === index ? null : index
        );
    }, []);

    const halfLength = Math.ceil(faqs.length / 2);
    const firstHalf = faqs.slice(0, halfLength);
    const secondHalf = faqs.slice(halfLength);

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

                <div className={cls("card p-4 rounded-theme flex flex-col lg:flex-row gap-4", faqsContainerClassName)}>
                    <div className={cls("flex-1 flex flex-col gap-4", columnClassName)}>
                        {firstHalf.map((faq, index) => (
                            <Accordion
                                key={faq.id}
                                index={index}
                                isActive={activeIndex === index}
                                onToggle={handleToggle}
                                title={faq.title}
                                content={faq.content}
                                animationType={animationType}
                                className={accordionClassName}
                                titleClassName={accordionTitleClassName}
                                iconContainerClassName={accordionIconContainerClassName}
                                iconClassName={accordionIconClassName}
                                contentClassName={accordionContentClassName}
                            />
                        ))}
                    </div>
                    {secondHalf.length > 0 && (
                        <div className={cls("flex-1 flex flex-col gap-4", columnClassName)}>
                            {secondHalf.map((faq, index) => {
                                const actualIndex = index + halfLength;
                                return (
                                    <Accordion
                                        key={faq.id}
                                        index={actualIndex}
                                        isActive={activeIndex === actualIndex}
                                        onToggle={handleToggle}
                                        title={faq.title}
                                        content={faq.content}
                                        animationType={animationType}
                                        className={accordionClassName}
                                        titleClassName={accordionTitleClassName}
                                        iconContainerClassName={accordionIconContainerClassName}
                                        iconClassName={accordionIconClassName}
                                        contentClassName={accordionContentClassName}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

FaqDouble.displayName = "FaqDouble";

export default memo(FaqDouble);
