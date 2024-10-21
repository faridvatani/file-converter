'use client';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

const posthog_Key = process.env.NEXT_PUBLIC_POSTHOG_KEY || '';
const posthog_Host =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

if (typeof window !== 'undefined') {
  posthog.init(posthog_Key, {
    api_host: posthog_Host,
    person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
  });
}
export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
