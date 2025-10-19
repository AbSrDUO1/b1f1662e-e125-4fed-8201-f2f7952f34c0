"use client";

import { memo } from "react";
import type { LucideIcon } from "lucide-react";

interface QuantityButtonProps {
    onClick: (e: React.MouseEvent) => void;
    ariaLabel: string;
    Icon: LucideIcon;
}

const QuantityButton = memo(({ onClick, ariaLabel, Icon }: QuantityButtonProps) => (
    <button
        onClick={onClick}
        className="card h-8 aspect-square rounded-full flex items-center justify-center cursor-pointer"
        aria-label={ariaLabel}
        type="button"
    >
        <Icon className="h-4/10 text-foreground" strokeWidth={1.5} />
    </button>
));

QuantityButton.displayName = "QuantityButton";

export default QuantityButton;
