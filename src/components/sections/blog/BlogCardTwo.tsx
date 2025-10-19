"use client";

import React, { memo } from "react";
import Image from "next/image";
import CardStack from "@/components/cardStack/CardStack";
import Badge from "@/components/shared/Badge";
import OverlayArrowButton from "@/components/shared/OverlayArrowButton";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig } from "@/components/cardStack/types";

type BlogCard = {
    id: string;
    tags: string[];
    title: string;
    excerpt: string;
    imageSrc: string;
    imageAlt?: string;
    authorName: string;
    date: string;
    onBlogClick?: () => void;
};

interface BlogCardTwoProps {
    blogs: BlogCard[];
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
    imageWrapperClassName?: string;
    imageClassName?: string;
    authorDateClassName?: string;
    cardTitleClassName?: string;
    excerptClassName?: string;
    tagsContainerClassName?: string;
    tagClassName?: string;
    textBoxTitleClassName?: string;
    textBoxDescriptionClassName?: string;
    gridClassName?: string;
    carouselClassName?: string;
    controlsClassName?: string;
    textBoxClassName?: string;
    textBoxTagClassName?: string;
    textBoxButtonContainerClassName?: string;
    textBoxButtonClassName?: string;
    textBoxButtonTextClassName?: string;
}

interface BlogCardItemProps {
    blog: BlogCard;
    cardClassName?: string;
    imageWrapperClassName?: string;
    imageClassName?: string;
    authorDateClassName?: string;
    cardTitleClassName?: string;
    excerptClassName?: string;
    tagsContainerClassName?: string;
    tagClassName?: string;
}

const BlogCardItem = memo(({
    blog,
    cardClassName = "",
    imageWrapperClassName = "",
    imageClassName = "",
    authorDateClassName = "",
    cardTitleClassName = "",
    excerptClassName = "",
    tagsContainerClassName = "",
    tagClassName = "",
}: BlogCardItemProps) => {
    return (
        <article
            className={cls("card group relative flex flex-col gap-4 cursor-pointer p-4 rounded-theme-capped", cardClassName)}
            onClick={blog.onBlogClick}
            role="article"
            aria-label={`${blog.title} by ${blog.authorName}`}
        >
            <div className={cls("relative w-full aspect-[4/3] overflow-hidden rounded-theme", imageWrapperClassName)}>
                <Image
                    src={blog.imageSrc}
                    alt={blog.imageAlt || blog.title}
                    fill
                    className={cls("object-cover select-none pointer-events-none transition-transform duration-500 ease-in-out group-hover:scale-105", imageClassName)}
                />
                <OverlayArrowButton ariaLabel={`Read ${blog.title}`} />
            </div>

            <div className="flex flex-col justify-between gap-6 flex-1">
                <div className="flex flex-col gap-2">
                    <p className={cls("text-xs text-primary", authorDateClassName)}>
                        {blog.authorName} " {blog.date}
                    </p>

                    <h3 className={cls("text-2xl font-medium text-foreground leading-[1.25]", cardTitleClassName)}>
                        {blog.title}
                    </h3>

                    <p className={cls("text-base text-foreground leading-[1.25]", excerptClassName)}>
                        {blog.excerpt}
                    </p>
                </div>

                <div className={cls("flex flex-wrap gap-2", tagsContainerClassName)}>
                    {blog.tags.map((tag, index) => (
                        <Badge key={`${tag}-${index}`} text={tag} variant="primary" className={tagClassName} />
                    ))}
                </div>
            </div>
        </article>
    );
});

BlogCardItem.displayName = "BlogCardItem";

const BlogCardTwo = ({
    blogs,
    carouselMode = "buttons",
    title,
    description,
    tag,
    tagIcon,
    buttons,
    layout = "default",
    ariaLabel = "Blog section",
    className = "",
    containerClassName = "",
    cardClassName = "",
    imageWrapperClassName = "",
    imageClassName = "",
    authorDateClassName = "",
    cardTitleClassName = "",
    excerptClassName = "",
    tagsContainerClassName = "",
    tagClassName = "",
    textBoxTitleClassName = "",
    textBoxDescriptionClassName = "",
    gridClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
}: BlogCardTwoProps) => {
    return (
        <CardStack
            mode={carouselMode}
            title={title}
            description={description}
            tag={tag}
            tagIcon={tagIcon}
            buttons={buttons}
            layout={layout}
            ariaLabel={ariaLabel}
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
        >
            {blogs.map((blog) => (
                <BlogCardItem
                    key={blog.id}
                    blog={blog}
                    cardClassName={cardClassName}
                    imageWrapperClassName={imageWrapperClassName}
                    imageClassName={imageClassName}
                    authorDateClassName={authorDateClassName}
                    cardTitleClassName={cardTitleClassName}
                    excerptClassName={excerptClassName}
                    tagsContainerClassName={tagsContainerClassName}
                    tagClassName={tagClassName}
                />
            ))}
        </CardStack>
    );
};

BlogCardTwo.displayName = "BlogCardTwo";

export default memo(BlogCardTwo);
