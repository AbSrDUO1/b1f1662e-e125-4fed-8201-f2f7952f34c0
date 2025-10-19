"use client";

import { memo, Children } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import CardStackTextBox from "./CardStackTextBox";
import { cls } from "@/lib/utils";
import { AutoCarouselProps } from "./types";

const AutoCarousel = ({
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
    textBoxClassName = "",
    titleClassName = "",
    descriptionClassName = "",
    tagClassName = "",
    buttonContainerClassName = "",
    buttonClassName = "",
    buttonTextClassName = "",
    ariaLabel,
}: AutoCarouselProps) => {
    const [emblaRef] = useEmblaCarousel(
        {
            loop: true,
            watchDrag: false,
        },
        [
            AutoScroll({
                playOnInit: true,
                speed: 1,
                stopOnInteraction: false,
                stopOnMouseEnter: false,
                stopOnFocusIn: false,
                startDelay: 0,
            }),
        ]
    );

    const childrenArray = Children.toArray(children);

    return (
        <section
            className={cls("w-full py-30", className)}
            aria-label={ariaLabel}
            aria-live="off"
        >
            <div className={cls("w-full md:w-content-width mx-auto", containerClassName)}>
                <div className="w-full flex flex-col items-center">
                    <div className="w-full flex flex-col gap-6">
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
                        <div
                            className={cls("overflow-hidden w-full relative z-10 flex mask-padding-x", carouselClassName)}
                            ref={emblaRef}
                        >
                            <div className="flex gap-6 w-full">
                                {Children.map(childrenArray, (child) => (
                                    <div className="flex-none w-carousel-item-3 xl:w-carousel-item-4 mb-1">
                                        {child}
                                    </div>
                                ))}
                                <div />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

AutoCarousel.displayName = "AutoCarousel";

export default memo(AutoCarousel);
