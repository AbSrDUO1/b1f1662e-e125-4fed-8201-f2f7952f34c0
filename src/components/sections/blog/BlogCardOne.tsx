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
    category: string;
    title: string;
    excerpt: string;
    imageSrc: string;
    imageAlt?: string;
    authorName: string;
    authorAvatar: string;
    date: string;
    onBlogClick?: () => void;
};

interface BlogCardOneProps {
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
    categoryClassName?: string;
    cardTitleClassName?: string;
    excerptClassName?: string;
    authorContainerClassName?: string;
    authorAvatarClassName?: string;
    authorNameClassName?: string;
    dateClassName?: string;
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
    categoryClassName?: string;
    cardTitleClassName?: string;
    excerptClassName?: string;
    authorContainerClassName?: string;
    authorAvatarClassName?: string;
    authorNameClassName?: string;
    dateClassName?: string;
}

const BlogCardItem = memo(({
    blog,
    cardClassName = "",
    imageWrapperClassName = "",
    imageClassName = "",
    categoryClassName = "",
    cardTitleClassName = "",
    excerptClassName = "",
    authorContainerClassName = "",
    authorAvatarClassName = "",
    authorNameClassName = "",
    dateClassName = "",
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
                    <Badge text={blog.category} variant="primary" className={categoryClassName} />

                    <h3 className={cls("text-2xl font-medium text-foreground leading-[1.25] mt-1", cardTitleClassName)}>
                        {blog.title}
                    </h3>

                    <p className={cls("text-base text-foreground leading-[1.25]", excerptClassName)}>
                        {blog.excerpt}
                    </p>
                </div>

                <div className={cls("flex items-center gap-3", authorContainerClassName)}>
                    <Image
                        src={blog.authorAvatar}
                        alt={blog.authorName}
                        width={40}
                        height={40}
                        className={cls("h-9 w-auto aspect-square rounded-theme object-cover", authorAvatarClassName)}
                    />
                    <div className="flex flex-col">
                        <p className={cls("text-sm font-medium text-foreground", authorNameClassName)}>
                            {blog.authorName}
                        </p>
                        <p className={cls("text-xs text-foreground/75", dateClassName)}>
                            {blog.date}
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
});

BlogCardItem.displayName = "BlogCardItem";

const BlogCardOne = ({
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
    categoryClassName = "",
    cardTitleClassName = "",
    excerptClassName = "",
    authorContainerClassName = "",
    authorAvatarClassName = "",
    authorNameClassName = "",
    dateClassName = "",
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
}: BlogCardOneProps) => {
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
                    categoryClassName={categoryClassName}
                    cardTitleClassName={cardTitleClassName}
                    excerptClassName={excerptClassName}
                    authorContainerClassName={authorContainerClassName}
                    authorAvatarClassName={authorAvatarClassName}
                    authorNameClassName={authorNameClassName}
                    dateClassName={dateClassName}
                />
            ))}
        </CardStack>
    );
};

BlogCardOne.displayName = "BlogCardOne";

export default memo(BlogCardOne);
