"use client";

import { memo } from "react";
import CardStackTextBox from "./CardStackTextBox";
import { cls } from "@/lib/utils";
import { GridLayoutProps } from "./types";

const GridLayout = ({
    children,
    itemCount,
    title,
    description,
    tag,
    tagIcon,
    buttons,
    layout = "default",
    className = "",
    containerClassName = "",
    gridClassName = "",
    textBoxClassName = "",
    titleClassName = "",
    descriptionClassName = "",
    tagClassName = "",
    buttonContainerClassName = "",
    buttonClassName = "",
    buttonTextClassName = "",
    ariaLabel,
}: GridLayoutProps) => {
    const gridColsMap = {
        1: "lg:grid-cols-1",
        2: "lg:grid-cols-2",
        3: "lg:grid-cols-3",
        4: "lg:grid-cols-4",
    };
    const gridCols = gridColsMap[itemCount as keyof typeof gridColsMap] || "lg:grid-cols-4";

    return (
        <section
            className={cls("w-full py-30", className)}
            aria-label={ariaLabel}
        >
            <div className={cls("w-content-width mx-auto flex flex-col gap-6", containerClassName)}>
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
                    className={cls(
                        "grid grid-cols-1 gap-6",
                        gridCols,
                        gridClassName
                    )}
                >
                    {children}
                </div>
            </div>
        </section>
    );
};

GridLayout.displayName = "GridLayout";

export default memo(GridLayout);
