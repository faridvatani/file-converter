import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';
import { prefix, siteConfig } from '@/config/site';
import { geistMono, geistSans } from '@/config/fonts';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import { PHProvider } from '@/components/analytics/CSPostHogProvider';
const PostHogPageView = dynamic(
  () => import('@/components/analytics/PostHogPageView'),
  {
    ssr: false,
  }
);
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  creator: siteConfig.creator,
  keywords: siteConfig.keywords,
  icons: {
    icon: prefix + '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="manifest"
          href={prefix + '/manifest.webmanifest'}
          crossOrigin="use-credentials"
        />
      </head>
      <PHProvider>
        <body
          className={clsx(
            'min-h-screen bg-background font-sans antialiased',
            geistSans.variable,
            geistMono.variable
          )}
          suppressHydrationWarning
        >
          <PostHogPageView />
          <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
            <div className="relative flex flex-col h-screen">
              <Navbar />
              <Toaster />
              <main className="container mx-auto max-w-full pt-4 px-6 flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </Providers>
        </body>
      </PHProvider>
    </html>
  );
}
