'use client';
import { useState } from 'react';
import { Link } from '@nextui-org/link';
import { Logo } from '@/components/icons';
import { siteConfig } from '@/config/site';
import { usePathname } from 'next/navigation';
import { ThemeSwitch } from '@/components/theme-switch';
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from '@nextui-org/navbar';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          className="sm:hidden"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <Link
            color="foreground"
            className="flex justify-start items-center gap-1"
            href="/"
          >
            <Logo />
            <p className="font-bold text-inherit">{siteConfig.name}</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center" className="hidden sm:flex basis-3/5">
        <ul className="hidden sm:flex gap-8 justify-start">
          {siteConfig.navItems.map((item, index) => (
            <NavbarItem key={index} isActive={pathname === item.href}>
              <Link
                isBlock
                color={pathname === item.href ? 'secondary' : 'foreground'}
                href={item?.href ?? '#'}
              >
                {item?.label}
              </Link>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent justify="end">
        <ThemeSwitch />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 flex flex-col gap-4">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={index} isActive={pathname === item.href}>
              <Link
                color={pathname === item.href ? 'secondary' : 'foreground'}
                href={item?.href ?? '#'}
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {item?.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
