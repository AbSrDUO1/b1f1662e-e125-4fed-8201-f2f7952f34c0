"use client";

import React, { memo } from "react";
import { ArrowUpRight } from "lucide-react";
import CardStack from "@/components/cardStack/CardStack";
import ProductImage from "@/components/shared/ProductImage";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig } from "@/components/cardStack/types";

type ProductCard = {
    id: string;
    name: string;
    price: string;
    imageSrc: string;
    imageAlt?: string;
    onFavorite?: () => void;
    onProductClick?: () => void;
    isFavorited?: boolean;
};

interface ProductCardOneProps {
    products: ProductCard[];
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
    imageClassName?: string;
    textBoxTitleClassName?: string;
    textBoxDescriptionClassName?: string;
    cardNameClassName?: string;
    cardPriceClassName?: string;
    gridClassName?: string;
    carouselClassName?: string;
    controlsClassName?: string;
    textBoxClassName?: string;
    textBoxTagClassName?: string;
    textBoxButtonContainerClassName?: string;
    textBoxButtonClassName?: string;
    textBoxButtonTextClassName?: string;
}

interface ProductCardItemProps {
    product: ProductCard;
    cardClassName?: string;
    imageClassName?: string;
    cardNameClassName?: string;
    cardPriceClassName?: string;
}

const ProductCardItem = memo(({
    product,
    cardClassName = "",
    imageClassName = "",
    cardNameClassName = "",
    cardPriceClassName = "",
}: ProductCardItemProps) => {
    return (
        <article
            className={cls("card group relative flex flex-col gap-4 cursor-pointer p-4 rounded-theme-capped", cardClassName)}
            onClick={product.onProductClick}
            role="article"
            aria-label={`${product.name} - ${product.price}`}
        >
            <ProductImage
                imageSrc={product.imageSrc}
                imageAlt={product.imageAlt || product.name}
                isFavorited={product.isFavorited}
                onFavoriteToggle={product.onFavorite}
                imageClassName={imageClassName}
            />

            <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <h3 className={cls("text-base font-medium text-foreground truncate leading-[1.3]", cardNameClassName)}>
                        {product.name}
                    </h3>
                    <p className={cls("text-2xl font-medium text-foreground leading-[1.3]", cardPriceClassName)}>
                        {product.price}
                    </p>
                </div>

                <button
                    className="relative cursor-pointer primary-button h-10 w-auto aspect-square rounded-theme flex items-center justify-center flex-shrink-0"
                    aria-label={`View ${product.name} details`}
                    type="button"
                >
                    <ArrowUpRight className="h-4/10 text-background transition-transform duration-300 group-hover:rotate-45" strokeWidth={1.5} />
                </button>
            </div>
        </article>
    );
});

ProductCardItem.displayName = "ProductCardItem";

const ProductCardOne = ({
    products,
    carouselMode = "buttons",
    title,
    description,
    tag,
    tagIcon,
    buttons,
    layout = "default",
    ariaLabel = "Product section",
    className = "",
    containerClassName = "",
    cardClassName = "",
    imageClassName = "",
    textBoxTitleClassName = "",
    textBoxDescriptionClassName = "",
    cardNameClassName = "",
    cardPriceClassName = "",
    gridClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
}: ProductCardOneProps) => {
    return (
        <CardStack
            mode={carouselMode}
            title={title}
            description={description}
            tag={tag}
            tagIcon={tagIcon}
            buttons={buttons}
            layout={layout}
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
            ariaLabel={ariaLabel}
        >
            {products.map((product, index) => (
                <ProductCardItem
                    key={`${product.id}-${index}`}
                    product={product}
                    cardClassName={cardClassName}
                    imageClassName={imageClassName}
                    cardNameClassName={cardNameClassName}
                    cardPriceClassName={cardPriceClassName}
                />
            ))}
        </CardStack>
    );
};

ProductCardOne.displayName = "ProductCardOne";

export default memo(ProductCardOne);
