"use client";

import { memo, Children } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CardStackTextBox from "./CardStackTextBox";
import { cls } from "@/lib/utils";
import { ButtonCarouselProps } from "./types";
import { usePrevNextButtons } from "./hooks/usePrevNextButtons";
import { useScrollProgress } from "./hooks/useScrollProgress";

const ButtonCarousel = ({
    children,
    title,
    description,
    tag,
    tagIcon,
    buttons,
    layout = "default",
    className = "",
    containerClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    titleClassName = "",
    descriptionClassName = "",
    tagClassName = "",
    buttonContainerClassName = "",
    buttonClassName = "",
    buttonTextClassName = "",
    ariaLabel,
}: ButtonCarouselProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

    const scrollProgress = useScrollProgress(emblaApi);

    const childrenArray = Children.toArray(children);

    return (
        <section
            className={cls("w-full px-[var(--width-0)] py-30", className)}
            aria-label={ariaLabel}
        >
            <div className={cls("w-full mx-auto", containerClassName)}>
                <div className="w-full flex flex-col items-center">
                    <div className="w-full flex flex-col gap-6">
                        <div className="w-content-width mx-auto">
                            <CardStackTextBox
                                title={title}
                                description={description}
                                tag={tag}
                                tagIcon={tagIcon}
                                buttons={buttons}
                                layout={layout}
                                textBoxClassName={textBoxClassName}
                                titleClassName={titleClassName}
                                descriptionClassName={descriptionClassName}
                                tagClassName={tagClassName}
                                buttonContainerClassName={buttonContainerClassName}
                                buttonClassName={buttonClassName}
                                buttonTextClassName={buttonTextClassName}
                            />
                        </div>
                        <div>
                            <div
                                className={cls(
                                    "overflow-hidden w-full relative z-10 flex cursor-grab",
                                    carouselClassName
                                )}
                                ref={emblaRef}
                            >
                                <div className="flex gap-6 w-full">
                                    <div className="flex-shrink-0 w-carousel-padding" />
                                    {Children.map(childrenArray, (child) => (
                                        <div className="flex-none w-carousel-item-3 xl:w-carousel-item-4 mb-6">
                                            {child}
                                        </div>
                                    ))}
                                    <div className="flex-shrink-0 w-carousel-padding" />
                                </div>
                            </div>

                            <div className={cls("w-full flex", controlsClassName)}>
                                <div className="flex-shrink-0 w-carousel-padding-controls" />
                                <div className="flex justify-between items-center w-full">
                                    <div
                                        className="rounded-full card relative h-2 w-50 overflow-hidden"
                                        role="progressbar"
                                        aria-label="Carousel progress"
                                        aria-valuenow={Math.round(scrollProgress)}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <div
                                            className="bg-foreground primary-button absolute w-full top-0 bottom-0 -left-full rounded-full"
                                            style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
                                        />
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={onPrevButtonClick}
                                            disabled={prevBtnDisabled}
                                            className="secondary-button h-8 aspect-square flex items-center justify-center rounded-theme cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                                            type="button"
                                            aria-label="Previous slide"
                                        >
                                            <ChevronLeft className="h-[40%] w-auto aspect-square text-foreground" />
                                        </button>
                                        <button
                                            onClick={onNextButtonClick}
                                            disabled={nextBtnDisabled}
                                            className="secondary-button h-8 aspect-square flex items-center justify-center rounded-theme cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                                            type="button"
                                            aria-label="Next slide"
                                        >
                                            <ChevronRight className="h-[40%] w-auto aspect-square text-foreground" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 w-carousel-padding-controls" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

ButtonCarousel.displayName = "ButtonCarousel";

export default memo(ButtonCarousel);
