"use client";

import { memo, useState, useCallback, Fragment } from "react";
import TextAnimation from "@/components/text/TextAnimation";
import Accordion from "@/components/Accordion";
import Button from "@/components/button/Button";
import { cls } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";
import { useTheme } from "@/providers/ThemeProvider";
import type { AnimationType } from "@/components/text/types";
import type { ButtonConfig } from "@/components/cardStack/types";

interface FaqItem {
    id: string;
    title: string;
    content: string;
}

interface FaqSplitTextProps {
    faqs: FaqItem[];
    sideTitle: string;
    sideDescription?: string;
    buttons?: ButtonConfig[];
    textPosition?: "left" | "right";
    animationType?: "smooth" | "instant";
    showCard?: boolean;
    ariaLabel?: string;
    className?: string;
    containerClassName?: string;
    contentClassName?: string;
    textContainerClassName?: string;
    sideTitleClassName?: string;
    sideDescriptionClassName?: string;
    buttonContainerClassName?: string;
    buttonClassName?: string;
    buttonTextClassName?: string;
    faqsContainerClassName?: string;
    accordionClassName?: string;
    accordionTitleClassName?: string;
    accordionIconContainerClassName?: string;
    accordionIconClassName?: string;
    accordionContentClassName?: string;
    separatorClassName?: string;
}

const FaqSplitText = ({
    faqs,
    sideTitle,
    sideDescription,
    buttons,
    textPosition = "left",
    animationType = "smooth",
    showCard = true,
    ariaLabel = "FAQ section",
    className = "",
    containerClassName = "",
    contentClassName = "",
    textContainerClassName = "",
    sideTitleClassName = "",
    sideDescriptionClassName = "",
    buttonContainerClassName = "",
    buttonClassName = "",
    buttonTextClassName = "",
    faqsContainerClassName = "",
    accordionClassName = "",
    accordionTitleClassName = "",
    accordionIconContainerClassName = "",
    accordionIconClassName = "",
    accordionContentClassName = "",
    separatorClassName = "",
}: FaqSplitTextProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const theme = useTheme();

    const handleToggle = useCallback((index: number) => {
        setActiveIndex((prevActiveIndex) =>
            prevActiveIndex === index ? null : index
        );
    }, []);

    const textContent = (
        <div className={cls("w-full lg:w-2/5 flex flex-col gap-3", textContainerClassName)}>
            <TextAnimation
                type={theme.defaultTextAnimation as AnimationType}
                text={sideTitle}
                variant="trigger"
                className={cls("text-6xl font-medium", sideTitleClassName)}
            />
            {sideDescription && (
                <TextAnimation
                    type={theme.defaultTextAnimation as AnimationType}
                    text={sideDescription}
                    variant="words-trigger"
                    className={cls("text-lg leading-[1.2]", sideDescriptionClassName)}
                />
            )}
            {buttons && buttons.length > 0 && (
                <div className={cls("flex gap-4", buttonContainerClassName)}>
                    {buttons.slice(0, 2).map((button, index) => (
                        <Button key={`${button.text}-${index}`} {...getButtonProps(button, index, theme.defaultButtonVariant, buttonClassName, buttonTextClassName)} />
                    ))}
                </div>
            )}
        </div>
    );

    const faqsContent = (
        <div className={cls("w-full lg:w-3/5 flex flex-col gap-4", faqsContainerClassName)}>
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
    );

    return (
        <section aria-label={ariaLabel} className={cls("w-full py-30", className)}>
            <div className={cls("w-content-width mx-auto", containerClassName)}>
                <div className={cls("flex flex-col lg:flex-row gap-6 lg:gap-10", contentClassName)}>
                    {textPosition === "left" && textContent}
                    {faqsContent}
                    {textPosition === "right" && textContent}
                </div>
            </div>
        </section>
    );
};

FaqSplitText.displayName = "FaqSplitText";

export default memo(FaqSplitText);
