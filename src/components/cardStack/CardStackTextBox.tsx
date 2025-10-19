"use client";

import { memo, useMemo } from "react";
import TextBox from "@/components/Textbox";
import { cls } from "@/lib/utils";
import type { TextBoxProps } from "./types";

const CardStackTextBox = ({
    title,
    description,
    tag,
    tagIcon,
    buttons,
    layout = "default",
    textBoxClassName = "",
    titleClassName = "",
    descriptionClassName = "",
    tagClassName = "",
    buttonContainerClassName = "",
    buttonClassName = "",
    buttonTextClassName = "",
}: TextBoxProps) => {
    // Memoize styling based on layout
    const styles = useMemo(() => {
        if (layout === "default") {
            return {
                className: cls("flex flex-col gap-3 lg:gap-1", textBoxClassName),
                titleClassName: cls("text-5xl font-medium text-center", titleClassName),
                descriptionClassName: cls("text-lg leading-[1.2] text-center lg:max-w-6/10", descriptionClassName),
                tagClassName: cls("w-fit px-3 py-1 text-sm rounded-theme card text-foreground inline-flex items-center gap-2 mb-1 lg:mb-3 mx-auto", tagClassName),
                buttonContainerClassName: cls("flex gap-4 mt-1 lg:mt-3 justify-center", buttonContainerClassName),
                center: true,
            };
        }

        return {
            className: textBoxClassName,
            titleClassName: cls("text-6xl font-medium", titleClassName),
            descriptionClassName: cls("text-lg leading-[1.2]", descriptionClassName),
            tagClassName: cls("px-3 py-1 text-sm rounded-theme card text-foreground inline-flex items-center gap-2", tagClassName),
            buttonContainerClassName: cls("flex gap-4", buttonContainerClassName),
            center: false,
        };
    }, [layout, textBoxClassName, titleClassName, descriptionClassName, tagClassName, buttonContainerClassName]);

    if (!title && !description) return null;

    return (
        <TextBox
            title={title!}
            description={description!}
            tag={tag}
            tagIcon={tagIcon}
            buttons={buttons}
            layout={layout}
            className={styles.className}
            titleClassName={styles.titleClassName}
            descriptionClassName={styles.descriptionClassName}
            tagClassName={styles.tagClassName}
            buttonContainerClassName={styles.buttonContainerClassName}
            buttonClassName={buttonClassName}
            buttonTextClassName={buttonTextClassName}
            center={styles.center}
        />
    );
};

CardStackTextBox.displayName = "CardStackTextBox";

export default memo(CardStackTextBox);
