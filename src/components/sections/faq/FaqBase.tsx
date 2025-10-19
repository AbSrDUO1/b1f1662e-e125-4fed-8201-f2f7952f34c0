"use client";

import { memo, useState, Fragment } from "react";
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

interface FaqBaseProps {
    faqs: FaqItem[];
    title?: string;
    description?: string;
    tag?: string;
    tagIcon?: LucideIcon;
    buttons?: ButtonConfig[];
    layout?: "default" | "split";
    animationType?: "smooth" | "instant";
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
    faqsContainerClassName?: string;
    accordionClassName?: string;
    accordionTitleClassName?: string;
    accordionIconContainerClassName?: string;
    accordionIconClassName?: string;
    accordionContentClassName?: string;
    separatorClassName?: string;
}

const FaqBase = ({
    faqs,
    title,
    description,
    tag,
    tagIcon,
    buttons,
    layout = "default",
    animationType = "smooth",
    showCard = true,
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
    accordionClassName = "",
    accordionTitleClassName = "",
    accordionIconContainerClassName = "",
    accordionIconClassName = "",
    accordionContentClassName = "",
    separatorClassName = "",
}: FaqBaseProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
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

                <div className={cls("flex flex-col gap-4", faqsContainerClassName)}>
                    {faqs.map((faq, index) => (
                        <Fragment key={faq.id}>
                            <Accordion
                                index={index}
                                isActive={activeIndex === index}
                                onToggle={handleToggle}
                                title={faq.title}
                                content={faq.content}
                                animationType={animationType}
                                showCard={showCard}
                                className={accordionClassName}
                                titleClassName={accordionTitleClassName}
                                iconContainerClassName={accordionIconContainerClassName}
                                iconClassName={accordionIconClassName}
                                contentClassName={accordionContentClassName}
                            />
                            {!showCard && index < faqs.length - 1 && (
                                <div className={cls("w-full border-b border-foreground/10", separatorClassName)} />
                            )}
                        </Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};

FaqBase.displayName = "FaqBase";

export default memo(FaqBase);
