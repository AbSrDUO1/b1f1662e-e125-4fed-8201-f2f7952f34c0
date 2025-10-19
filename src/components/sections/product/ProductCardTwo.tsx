"use client";

import React, { memo } from "react";
import { Star } from "lucide-react";
import CardStack from "@/components/cardStack/CardStack";
import ProductImage from "@/components/shared/ProductImage";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig } from "@/components/cardStack/types";

type ProductCard = {
    id: string;
    brand: string;
    name: string;
    price: string;
    rating: number;
    reviewCount: string;
    imageSrc: string;
    imageAlt?: string;
    onFavorite?: () => void;
    onProductClick?: () => void;
    isFavorited?: boolean;
};

interface ProductCardTwoProps {
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
    cardBrandClassName?: string;
    cardNameClassName?: string;
    cardPriceClassName?: string;
    cardRatingClassName?: string;
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
    cardBrandClassName?: string;
    cardNameClassName?: string;
    cardPriceClassName?: string;
    cardRatingClassName?: string;
}

const ProductCardItem = memo(({
    product,
    cardClassName = "",
    imageClassName = "",
    cardBrandClassName = "",
    cardNameClassName = "",
    cardPriceClassName = "",
    cardRatingClassName = "",
}: ProductCardItemProps) => {
    return (
        <article
            className={cls("card group relative flex flex-col gap-4 cursor-pointer p-4 rounded-theme-capped", cardClassName)}
            onClick={product.onProductClick}
            role="article"
            aria-label={`${product.brand} ${product.name} - ${product.price}`}
        >
            <ProductImage
                imageSrc={product.imageSrc}
                imageAlt={product.imageAlt || `${product.brand} ${product.name}`}
                isFavorited={product.isFavorited}
                onFavoriteToggle={product.onFavorite}
                imageClassName={imageClassName}
            />

            <div className="flex-1 min-w-0 flex flex-col gap-2">
                <p className={cls("text-sm text-foreground leading-[1]", cardBrandClassName)}>
                    {product.brand}
                </p>
                <div className="flex flex-col gap-1" >
                    <h3 className={cls("text-xl font-medium text-foreground truncate leading-[1.15]", cardNameClassName)}>
                        {product.name}
                    </h3>
                    <div className={cls("flex items-center gap-2", cardRatingClassName)}>
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={cls(
                                        "h-4 w-auto",
                                        i < Math.floor(product.rating)
                                            ? "text-foreground fill-foreground"
                                            : "text-foreground opacity-20"
                                    )}
                                    strokeWidth={1.5}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-foreground leading-[1.3]">
                            ({product.reviewCount})
                        </span>
                    </div>
                </div>
                <p className={cls("text-2xl font-medium text-foreground leading-[1.3]", cardPriceClassName)}>
                    {product.price}
                </p>
            </div>
        </article>
    );
});

ProductCardItem.displayName = "ProductCardItem";

const ProductCardTwo = ({
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
    cardBrandClassName = "",
    cardNameClassName = "",
    cardPriceClassName = "",
    cardRatingClassName = "",
    gridClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
}: ProductCardTwoProps) => {
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
                    cardBrandClassName={cardBrandClassName}
                    cardNameClassName={cardNameClassName}
                    cardPriceClassName={cardPriceClassName}
                    cardRatingClassName={cardRatingClassName}
                />
            ))}
        </CardStack>
    );
};

ProductCardTwo.displayName = "ProductCardTwo";

export default memo(ProductCardTwo);
