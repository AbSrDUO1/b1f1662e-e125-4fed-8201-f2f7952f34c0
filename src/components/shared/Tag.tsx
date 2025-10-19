"use client";

import { memo } from "react";
import { cls } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface TagProps {
    text: string;
    icon?: LucideIcon;
    className?: string;
}

const Tag = memo(({
    text,
    icon: Icon,
    className = "",
}: TagProps) => {
    return (
        <div className={cls(
            "px-3 py-1 text-sm rounded-theme card text-foreground inline-flex items-center gap-2 w-fit",
            className
        )}>
            {Icon && <Icon className="h-[1em] w-auto" />}
            {text}
        </div>
    );
});

Tag.displayName = "Tag";

export default Tag;
