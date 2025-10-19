"use client";

import { memo, useState } from "react";
import Button from "@/components/button/Button";
import { cls } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";
import { useTheme } from "@/providers/ThemeProvider";

interface EmailSignupFormProps {
    inputPlaceholder?: string;
    buttonText?: string;
    onSubmit?: (email: string) => void;
    className?: string;
    inputClassName?: string;
    buttonClassName?: string;
    buttonTextClassName?: string;
}

const EmailSignupForm = memo(({
    inputPlaceholder = "Enter your email",
    buttonText = "Sign Up",
    onSubmit,
    className = "",
    inputClassName = "",
    buttonClassName = "",
    buttonTextClassName = "",
}: EmailSignupFormProps) => {
    const theme = useTheme();
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(email);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={cls("flex flex-row gap-1 w-full card rounded-theme p-1", className)}>
            <input
                type="email"
                placeholder={inputPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={cls(
                    "flex-1 px-4 text-base text-foreground placeholder:text-foreground/75 focus:outline-none focus:border-none",
                    inputClassName
                )}
                aria-label="Email address"
            />
            <Button
                {...getButtonProps(
                    { text: buttonText },
                    0,
                    theme.defaultButtonVariant,
                    buttonClassName,
                    buttonTextClassName
                )}
            />
        </form>
    );
});

EmailSignupForm.displayName = "EmailSignupForm";

export default EmailSignupForm;
