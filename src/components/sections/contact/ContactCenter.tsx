"use client";

import React, { memo } from "react";
import ContactForm from "@/components/form/ContactForm";
import { cls } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ContactCenterProps {
    title: string;
    description: string;
    tag: string;
    tagIcon?: LucideIcon;
    tagClassName?: string;
    inputPlaceholder?: string;
    buttonText?: string;
    termsText?: string;
    onSubmit?: (email: string) => void;
    ariaLabel?: string;
    className?: string;
    containerClassName?: string;
    contentClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    formWrapperClassName?: string;
    formClassName?: string;
    inputClassName?: string;
    buttonClassName?: string;
    buttonTextClassName?: string;
    termsClassName?: string;
}

const ContactCenter = ({
    title,
    description,
    tag,
    tagIcon,
    tagClassName = "",
    inputPlaceholder = "Enter your email",
    buttonText = "Sign Up",
    termsText = "By clicking Sign Up you're confirming that you agree with our Terms and Conditions.",
    onSubmit,
    ariaLabel = "Contact section",
    className = "",
    containerClassName = "",
    contentClassName = "",
    titleClassName = "",
    descriptionClassName = "",
    formWrapperClassName = "",
    formClassName = "",
    inputClassName = "",
    buttonClassName = "",
    buttonTextClassName = "",
    termsClassName = "",
}: ContactCenterProps) => {
    return (
        <section aria-label={ariaLabel} className={cls("w-full py-30", className)}>
            <div className={cls("w-content-width mx-auto", containerClassName)}>
                <div className={cls("w-full card p-6 lg:p-0 py-20 lg:py-30 rounded-theme-capped flex items-center justify-center", contentClassName)}>
                    <div className="w-full lg:w-1/2">
                        <ContactForm
                            tag={tag}
                            tagIcon={tagIcon}
                            title={title}
                            description={description}
                            inputPlaceholder={inputPlaceholder}
                            buttonText={buttonText}
                            termsText={termsText}
                            onSubmit={onSubmit}
                            centered={true}
                            tagClassName={tagClassName}
                            titleClassName={titleClassName}
                            descriptionClassName={descriptionClassName}
                            formWrapperClassName={cls("lg:w-8/10 2xl:w-6/10", formWrapperClassName)}
                            formClassName={formClassName}
                            inputClassName={inputClassName}
                            buttonClassName={buttonClassName}
                            buttonTextClassName={buttonTextClassName}
                            termsClassName={termsClassName}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

ContactCenter.displayName = "ContactCenter";

export default memo(ContactCenter);
