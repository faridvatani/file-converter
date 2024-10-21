'use client';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { useEffect } from 'react';

const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production';
const posthog_Key = process.env.NEXT_PUBLIC_POSTHOG_KEY || '';
const posthog_Host =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (isProduction) {
      posthog.init(posthog_Key, {
        api_host: posthog_Host,
        person_profiles: 'identified_only',
        capture_pageview: false, // Disable automatic pageview capture, as we capture manually
        capture_pageleave: true, // Enable pageleave capture
        autocapture: true,
      });
    }
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
