"use client";

import { ReactNode } from "react";

interface PostHogWrapperProps {
  children: ReactNode;
}

/**
 * PostHog analytics wrapper component.
 * Currently a passthrough - configure with PostHog SDK when ready.
 */
export function PostHogWrapper({ children }: PostHogWrapperProps) {
  // TODO: Add PostHog initialization here when needed
  // Example:
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     posthog.init('YOUR_API_KEY', {
  //       api_host: 'https://app.posthog.com'
  //     });
  //   }
  // }, []);

  return <>{children}</>;
}
