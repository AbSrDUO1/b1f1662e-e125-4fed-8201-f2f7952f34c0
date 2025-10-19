"use client";

import React, { memo } from "react";
import Image from "next/image";
import CardStack from "@/components/cardStack/CardStack";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig } from "@/components/cardStack/types";

type SocialLink = {
    icon: LucideIcon;
    url: string;
};

type TeamMember = {
    id: string;
    name: string;
    role: string;
    imageSrc: string;
    imageAlt?: string;
    socialLinks?: SocialLink[];
};

interface TeamCardThreeProps {
    members: TeamMember[];
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
    textBoxTitleClassName?: string;
    textBoxDescriptionClassName?: string;
    imageClassName?: string;
    nameClassName?: string;
    roleClassName?: string;
    socialLinksClassName?: string;
    socialIconClassName?: string;
    gridClassName?: string;
    carouselClassName?: string;
    controlsClassName?: string;
    textBoxClassName?: string;
    textBoxTagClassName?: string;
    textBoxButtonContainerClassName?: string;
    textBoxButtonClassName?: string;
    textBoxButtonTextClassName?: string;
}

interface TeamMemberCardProps {
    member: TeamMember;
    cardClassName?: string;
    imageClassName?: string;
    nameClassName?: string;
    roleClassName?: string;
    socialLinksClassName?: string;
    socialIconClassName?: string;
}

const TeamMemberCard = memo(({
    member,
    cardClassName = "",
    imageClassName = "",
    nameClassName = "",
    roleClassName = "",
    socialLinksClassName = "",
    socialIconClassName = "",
}: TeamMemberCardProps) => {
    return (
        <div className={cls("card text-foreground rounded-theme-capped p-6 flex flex-col items-center text-center gap-4", cardClassName)}>
            <div className="relative w-full aspect-square rounded-theme overflow-hidden">
                <Image
                    src={member.imageSrc}
                    alt={member.imageAlt || member.name}
                    width={800}
                    height={800}
                    className={cls("w-full h-full object-cover select-none pointer-events-none", imageClassName)}
                    unoptimized={member.imageSrc.startsWith('http') || member.imageSrc.startsWith('//')}
                    aria-hidden={member.imageAlt === ""}
                />
            </div>

            <div className="flex flex-col gap-0">
                <h3 className={cls("text-3xl font-medium text-foreground leading-[1.15]", nameClassName)}>
                    {member.name}
                </h3>
                <p className={cls("text-base text-foreground leading-[1.15]", roleClassName)}>
                    {member.role}
                </p>
            </div>


            {member.socialLinks && member.socialLinks.length > 0 && (
                <div className={cls("flex gap-3", socialLinksClassName)}>
                    {member.socialLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cls("primary-button h-9 aspect-square w-auto flex items-center justify-center rounded-theme", socialIconClassName)}
                        >
                            <link.icon className="h-4/10 text-background" strokeWidth={1.5} />
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
});

TeamMemberCard.displayName = "TeamMemberCard";

const TeamCardThree = ({
    members,
    carouselMode = "buttons",
    title,
    description,
    tag,
    tagIcon,
    buttons,
    layout = "default",
    ariaLabel = "Team section",
    className = "",
    containerClassName = "",
    cardClassName = "",
    textBoxTitleClassName = "",
    textBoxDescriptionClassName = "",
    imageClassName = "",
    nameClassName = "",
    roleClassName = "",
    socialLinksClassName = "",
    socialIconClassName = "",
    gridClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
}: TeamCardThreeProps) => {
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
            {members.map((member, index) => (
                <TeamMemberCard
                    key={`${member.id}-${index}`}
                    member={member}
                    cardClassName={cardClassName}
                    imageClassName={imageClassName}
                    nameClassName={nameClassName}
                    roleClassName={roleClassName}
                    socialLinksClassName={socialLinksClassName}
                    socialIconClassName={socialIconClassName}
                />
            ))}
        </CardStack>
    );
};

TeamCardThree.displayName = "TeamCardThree";

export default memo(TeamCardThree);
