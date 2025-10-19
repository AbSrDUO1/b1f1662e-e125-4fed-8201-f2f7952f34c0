"use client";

import { memo, Children } from "react";
import { CardStackProps } from "./types";
import GridLayout from "./GridLayout";
import AutoCarousel from "./AutoCarousel";
import ButtonCarousel from "./ButtonCarousel";

const CardStack = ({
    children,
    mode = "buttons",
    title,
    description,
    tag,
    tagIcon,
    buttons,
    layout = "default",
    className = "",
    containerClassName = "",
    gridClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    titleClassName = "",
    descriptionClassName = "",
    tagClassName = "",
    buttonContainerClassName = "",
    buttonClassName = "",
    buttonTextClassName = "",
    ariaLabel = "Card stack",
}: CardStackProps) => {
    const childrenArray = Children.toArray(children);
    const itemCount = childrenArray.length;

    // Use grid for 1-4 items, carousel for 5+ items
    const useCarousel = itemCount >= 5;

    // Grid layout for 1-4 items
    if (!useCarousel) {
        return (
            <GridLayout
                itemCount={itemCount}
                title={title}
                description={description}
                tag={tag}
                tagIcon={tagIcon}
                buttons={buttons}
                layout={layout}
                className={className}
                containerClassName={containerClassName}
                gridClassName={gridClassName}
                textBoxClassName={textBoxClassName}
                titleClassName={titleClassName}
                descriptionClassName={descriptionClassName}
                tagClassName={tagClassName}
                buttonContainerClassName={buttonContainerClassName}
                buttonClassName={buttonClassName}
                buttonTextClassName={buttonTextClassName}
                ariaLabel={ariaLabel}
            >
                {childrenArray}
            </GridLayout>
        );
    }

    // Auto-scroll carousel for 5+ items
    if (mode === "auto") {
        return (
            <AutoCarousel
                title={title}
                description={description}
                tag={tag}
                tagIcon={tagIcon}
                buttons={buttons}
                layout={layout}
                className={className}
                containerClassName={containerClassName}
                carouselClassName={carouselClassName}
                textBoxClassName={textBoxClassName}
                titleClassName={titleClassName}
                descriptionClassName={descriptionClassName}
                tagClassName={tagClassName}
                buttonContainerClassName={buttonContainerClassName}
                buttonClassName={buttonClassName}
                buttonTextClassName={buttonTextClassName}
                ariaLabel={ariaLabel}
            >
                {childrenArray}
            </AutoCarousel>
        );
    }

    // Button-controlled carousel for 5+ items
    return (
        <ButtonCarousel
            title={title}
            description={description}
            tag={tag}
            tagIcon={tagIcon}
            buttons={buttons}
            layout={layout}
            className={className}
            containerClassName={containerClassName}
            carouselClassName={carouselClassName}
            controlsClassName={controlsClassName}
            textBoxClassName={textBoxClassName}
            titleClassName={titleClassName}
            descriptionClassName={descriptionClassName}
            tagClassName={tagClassName}
            buttonContainerClassName={buttonContainerClassName}
            buttonClassName={buttonClassName}
            buttonTextClassName={buttonTextClassName}
            ariaLabel={ariaLabel}
        >
            {childrenArray}
        </ButtonCarousel>
    );
};

CardStack.displayName = "CardStack";

export default memo(CardStack);
