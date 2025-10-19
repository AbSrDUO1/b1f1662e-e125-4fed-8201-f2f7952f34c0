"use client";

import React, { memo } from "react";
import ContactForm from "@/components/form/ContactForm";
import MediaContent from "@/components/shared/MediaContent";
import { cls } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ContactSplitProps {
    title: string;
    description: string;
    tag: string;
    tagIcon?: LucideIcon;
    imageSrc?: string;
    videoSrc?: string;
    imageAlt?: string;
    videoAriaLabel?: string;
    mediaPosition?: "left" | "right";
    inputPlaceholder?: string;
    buttonText?: string;
    termsText?: string;
    onSubmit?: (email: string) => void;
    ariaLabel?: string;
    className?: string;
    containerClassName?: string;
    contentClassName?: string;
    contactFormClassName?: string;
    tagClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    formWrapperClassName?: string;
    formClassName?: string;
    inputClassName?: string;
    buttonClassName?: string;
    buttonTextClassName?: string;
    termsClassName?: string;
    mediaWrapperClassName?: string;
    mediaClassName?: string;
}

const ContactSplit = ({
    title,
    description,
    tag,
    tagIcon,
    imageSrc,
    videoSrc,
    imageAlt = "",
    videoAriaLabel = "Contact section video",
    mediaPosition = "right",
    inputPlaceholder = "Enter your email",
    buttonText = "Sign Up",
    termsText = "By clicking Sign Up you're confirming that you agree with our Terms and Conditions.",
    onSubmit,
    ariaLabel = "Contact section",
    className = "",
    containerClassName = "",
    contentClassName = "",
    contactFormClassName = "",
    tagClassName = "",
    titleClassName = "",
    descriptionClassName = "",
    formWrapperClassName = "",
    formClassName = "",
    inputClassName = "",
    buttonClassName = "",
    buttonTextClassName = "",
    termsClassName = "",
    mediaWrapperClassName = "",
    mediaClassName = "",
}: ContactSplitProps) => {
    const contactContent = (
        <div className="card rounded-theme p-6 py-15 lg:py-6 flex items-center justify-center">
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
                className={cls("w-full", contactFormClassName)}
                tagClassName={tagClassName}
                titleClassName={titleClassName}
                descriptionClassName={descriptionClassName}
                formWrapperClassName={cls("w-full lg:w-8/10 2xl:w-7/10", formWrapperClassName)}
                formClassName={formClassName}
                inputClassName={inputClassName}
                buttonClassName={buttonClassName}
                buttonTextClassName={buttonTextClassName}
                termsClassName={termsClassName}
            />
        </div>
    );

    const mediaContent = (
        <div className={cls("overflow-hidden rounded-theme card h-130", mediaWrapperClassName)}>
            <MediaContent
                imageSrc={imageSrc}
                videoSrc={videoSrc}
                imageAlt={imageAlt}
                videoAriaLabel={videoAriaLabel}
                imageClassName={cls("w-full h-full object-cover", mediaClassName)}
            />
        </div>
    );

    return (
        <section aria-label={ariaLabel} className={cls("w-full py-30", className)}>
            <div className={cls("w-content-width mx-auto", containerClassName)}>
                <div className={cls("grid grid-cols-1 lg:grid-cols-2 gap-6 lg:auto-rows-fr", contentClassName)}>
                    {mediaPosition === "left" && mediaContent}
                    {contactContent}
                    {mediaPosition === "right" && mediaContent}
                </div>
            </div>
        </section>
    );
};

ContactSplit.displayName = "ContactSplit";

export default memo(ContactSplit);
