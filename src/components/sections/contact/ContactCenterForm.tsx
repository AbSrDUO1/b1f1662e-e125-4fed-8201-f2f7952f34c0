"use client";

import React, { memo, useState } from "react";
import TextAnimation from "@/components/text/TextAnimation";
import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import Textarea from "@/components/form/Textarea";
import { cls } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";
import { getButtonProps } from "@/lib/buttonUtils";
import type { AnimationType } from "@/components/text/types";

export interface InputField {
    name: string;
    type: string;
    placeholder: string;
    required?: boolean;
    className?: string;
}

export interface TextareaField {
    name: string;
    placeholder: string;
    rows?: number;
    required?: boolean;
    className?: string;
}

interface ContactCenterFormProps {
    title: string;
    description: string;
    inputs: InputField[];
    textarea?: TextareaField;
    buttonText?: string;
    onSubmit?: (data: Record<string, string>) => void;
    ariaLabel?: string;
    className?: string;
    containerClassName?: string;
    contentClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    buttonClassName?: string;
    buttonTextClassName?: string;
}

const ContactCenterForm = ({
    title,
    description,
    inputs,
    textarea,
    buttonText = "Submit",
    onSubmit,
    ariaLabel = "Contact section",
    className = "",
    containerClassName = "",
    contentClassName = "",
    titleClassName = "",
    descriptionClassName = "",
    buttonClassName = "",
    buttonTextClassName = "",
}: ContactCenterFormProps) => {
    const theme = useTheme();

    // Validate minimum inputs requirement
    if (inputs.length < 2) {
        throw new Error("ContactCenterForm requires at least 2 inputs");
    }

    // Initialize form data dynamically
    const initialFormData: Record<string, string> = {};
    inputs.forEach(input => {
        initialFormData[input.name] = "";
    });
    if (textarea) {
        initialFormData[textarea.name] = "";
    }

    const [formData, setFormData] = useState(initialFormData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    return (
        <section aria-label={ariaLabel} className={cls("w-full py-30", className)}>
            <div className={cls("w-content-width mx-auto", containerClassName)}>
                <div className={cls("w-full card p-6 lg:p-0 py-20 lg:py-30 rounded-theme-capped flex items-center justify-center", contentClassName)}>
                    <div className="w-full lg:w-1/2">
                        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
                            <div className="w-full flex flex-col gap-0 text-center">
                                <TextAnimation
                                    type={theme.defaultTextAnimation as AnimationType}
                                    text={title}
                                    variant="trigger"
                                    className={cls("text-4xl font-medium leading-[1.175] text-balance", titleClassName)}
                                />

                                <TextAnimation
                                    type={theme.defaultTextAnimation as AnimationType}
                                    text={description}
                                    variant="words-trigger"
                                    className={cls("text-base leading-[1.15] text-balance", descriptionClassName)}
                                />
                            </div>

                            <div className="w-full flex flex-col gap-4">
                                {inputs.map((input) => (
                                    <Input
                                        key={input.name}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        value={formData[input.name] || ""}
                                        onChange={(value) => setFormData({ ...formData, [input.name]: value })}
                                        required={input.required}
                                        ariaLabel={input.placeholder}
                                        className={input.className}
                                    />
                                ))}

                                {textarea && (
                                    <Textarea
                                        placeholder={textarea.placeholder}
                                        value={formData[textarea.name] || ""}
                                        onChange={(value) => setFormData({ ...formData, [textarea.name]: value })}
                                        required={textarea.required}
                                        rows={textarea.rows || 5}
                                        ariaLabel={textarea.placeholder}
                                        className={textarea.className}
                                    />
                                )}

                                <Button
                                    {...getButtonProps(
                                        { text: buttonText },
                                        0,
                                        theme.defaultButtonVariant,
                                        cls("w-full", buttonClassName),
                                        cls("text-base", buttonTextClassName)
                                    )}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

ContactCenterForm.displayName = "ContactCenterForm";

export default memo(ContactCenterForm);
