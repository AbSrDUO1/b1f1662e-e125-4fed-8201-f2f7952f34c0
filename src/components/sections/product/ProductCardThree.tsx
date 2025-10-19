"use client";

import React, { memo, useState, useCallback } from "react";
import { Plus, Minus } from "lucide-react";
import CardStack from "@/components/cardStack/CardStack";
import ProductImage from "@/components/shared/ProductImage";
import QuantityButton from "@/components/shared/QuantityButton";
import Button from "@/components/button/Button";
import { useTheme } from "@/providers/ThemeProvider";
import { getButtonProps } from "@/lib/buttonUtils";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig } from "@/components/cardStack/types";
import type { CTAButtonVariant, ButtonPropsForVariant } from "@/components/button/types";

type ProductCard = {
    id: string;
    name: string;
    price: string;
    imageSrc: string;
    imageAlt?: string;
    onFavorite?: () => void;
    onProductClick?: () => void;
    onQuantityChange?: (quantity: number) => void;
    isFavorited?: boolean;
    initialQuantity?: number;
    priceButtonProps?: Partial<ButtonPropsForVariant<CTAButtonVariant>>;
};

interface ProductCardThreeProps {
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
    quantityControlsClassName?: string;
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
    quantityControlsClassName?: string;
}

const ProductCardItem = memo(({
    product,
    cardClassName = "",
    imageClassName = "",
    cardNameClassName = "",
    quantityControlsClassName = "",
}: ProductCardItemProps) => {
    const theme = useTheme();
    const [quantity, setQuantity] = useState(product.initialQuantity || 1);

    const handleIncrement = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        product.onQuantityChange?.(newQuantity);
    }, [quantity, product]);

    const handleDecrement = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            product.onQuantityChange?.(newQuantity);
        }
    }, [quantity, product]);

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

            <div className="flex flex-col gap-3">
                <h3 className={cls("text-xl font-medium text-foreground leading-[1.15] truncate", cardNameClassName)}>
                    {product.name}
                </h3>

                <div className="flex items-center justify-between gap-4">
                    <div className={cls("flex items-center gap-2", quantityControlsClassName)}>
                        <QuantityButton
                            onClick={handleDecrement}
                            ariaLabel="Decrease quantity"
                            Icon={Minus}
                        />
                        <span className="text-base font-medium text-foreground min-w-[2ch] text-center leading-[1]">
                            {quantity}
                        </span>
                        <QuantityButton
                            onClick={handleIncrement}
                            ariaLabel="Increase quantity"
                            Icon={Plus}
                        />
                    </div>

                    <Button
                        {...getButtonProps(
                            {
                                text: product.price,
                                props: product.priceButtonProps,
                            },
                            0,
                            theme.defaultButtonVariant
                        )}
                    />
                </div>
            </div>
        </article>
    );
});

ProductCardItem.displayName = "ProductCardItem";

const ProductCardThree = ({
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
    quantityControlsClassName = "",
    gridClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
}: ProductCardThreeProps) => {
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
                    quantityControlsClassName={quantityControlsClassName}
                />
            ))}
        </CardStack>
    );
};

ProductCardThree.displayName = "ProductCardThree";

export default memo(ProductCardThree);
