import React from 'react';
import { Link } from '@nextui-org/react';
import { siteConfig } from '@/config/site';

export const Footer = () => {
  return (
    <footer className="w-full bg- text-default-600 py-3 border-t border-default-200">
      <div className="container mx-auto max-w-7xl px-6 flex-grow flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <p className="text-sm">
            © 2024 - {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
        </div>
        <Link
          isExternal
          className="flex items-center gap-1 text-default-600"
          href="https://nextui.org/"
          title="nextui.org homepage"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">NextUI</p>
        </Link>
      </div>
    </footer>
  );
};
