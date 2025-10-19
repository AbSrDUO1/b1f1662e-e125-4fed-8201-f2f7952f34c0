"use client";

import { memo } from "react";
import Image from "next/image";
import FavoriteButton from "@/components/shared/FavoriteButton";
import { cls } from "@/lib/utils";

interface ProductImageProps {
    imageSrc: string;
    imageAlt: string;
    isFavorited?: boolean;
    onFavoriteToggle?: () => void;
    className?: string;
    imageClassName?: string;
}

const ProductImage = memo(({
    imageSrc,
    imageAlt,
    isFavorited = false,
    onFavoriteToggle,
    className = "",
    imageClassName = "",
}: ProductImageProps) => {
    return (
        <div className={cls("relative w-full aspect-5/6 rounded-theme-capped overflow-hidden card", className)}>
            <div className="relative w-full h-full overflow-hidden">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className={cls("object-cover select-none pointer-events-none transition-transform duration-500 ease-in-out group-hover:scale-105", imageClassName)}
                    unoptimized={imageSrc.startsWith('http') || imageSrc.startsWith('//')}
                    aria-hidden={imageAlt === ""}
                />
            </div>

            <FavoriteButton
                initialFavorited={isFavorited}
                onToggle={onFavoriteToggle}
            />
        </div>
    );
});

ProductImage.displayName = "ProductImage";

export default ProductImage;
