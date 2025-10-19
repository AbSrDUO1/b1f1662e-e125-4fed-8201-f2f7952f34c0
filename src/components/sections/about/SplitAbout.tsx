"use client";

import { memo, Fragment } from "react";
import MediaContent from "@/components/shared/MediaContent";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface BulletPoint {
  title: string;
  description: string;
  icon?: LucideIcon;
}

interface SplitAboutProps {
  bulletPoints: BulletPoint[];
  imageSrc?: string;
  videoSrc?: string;
  imageAlt?: string;
  videoAriaLabel?: string;
  ariaLabel?: string;
  imagePosition?: "left" | "right";
  className?: string;
  containerClassName?: string;
  contentClassName?: string;
  bulletPointClassName?: string;
  bulletTitleClassName?: string;
  bulletDescriptionClassName?: string;
  mediaWrapperClassName?: string;
  imageClassName?: string;
}

const SplitAbout = ({
  bulletPoints,
  imageSrc,
  videoSrc,
  imageAlt = "",
  videoAriaLabel = "About section video",
  ariaLabel = "About section",
  imagePosition = "right",
  className = "",
  containerClassName = "",
  contentClassName = "",
  bulletPointClassName = "",
  bulletTitleClassName = "",
  bulletDescriptionClassName = "",
  mediaWrapperClassName = "",
  imageClassName = "",
}: SplitAboutProps) => {
  const mediaContent = (
    <div className={cls("w-full lg:w-6/10 2xl:w-7/10 overflow-hidden rounded-theme card p-4 flex items-center justify-center", mediaWrapperClassName)}>
      <MediaContent
        imageSrc={imageSrc}
        videoSrc={videoSrc}
        imageAlt={imageAlt}
        videoAriaLabel={videoAriaLabel}
        imageClassName={cls("w-full h-full object-cover", imageClassName)}
      />
    </div>
  );

  return (
    <section
      aria-label={ariaLabel}
      className={cls("w-full py-30", className)}
    >
      <div className={cls("w-content-width mx-auto flex flex-col lg:flex-row gap-6 lg:items-stretch", containerClassName)}>
        {imagePosition === "left" && mediaContent}

        <div className={cls("w-full lg:w-4/10 2xl:w-3/10 rounded-theme card p-6 flex flex-col gap-6 items-center justify-center", contentClassName)}>
          {bulletPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <Fragment key={index}>
                <div className={cls("flex flex-col gap-2", bulletPointClassName)}>
                  {Icon && (
                    <div className="h-10 w-fit aspect-square rounded-theme primary-button flex items-center justify-center flex-shrink-0 mb-1">
                      <Icon className="h-[40%] w-[40%] text-background" strokeWidth={1.5} />
                    </div>
                  )}
                  <div className="flex flex-col gap-0">
                    <h3 className={cls("text-xl font-medium", bulletTitleClassName)}>
                      {point.title}
                    </h3>
                    <p className={cls("text-base leading-[1.4] text-foreground", bulletDescriptionClassName)}>
                      {point.description}
                    </p>
                  </div>
                </div>
                {index < bulletPoints.length - 1 && (
                  <div className="w-full border-b border-foreground/10" />
                )}
              </Fragment>
            );
          })}
        </div>

        {imagePosition === "right" && mediaContent}
      </div>
    </section>
  );
};

SplitAbout.displayName = "SplitAbout";

export default memo(SplitAbout);
