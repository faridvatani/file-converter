"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <NextUINavbar maxWidth="xl" position="sticky" isBordered>
      <NavbarContent justify="start">
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">{siteConfig.name}</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center" className="hidden sm:flex basis-3/5">
        <ul className="hidden sm:flex gap-8 justify-start">
          {siteConfig.navItems.map((item, index) => (
            <NavbarItem key={index} isActive={pathname === item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item?.href ?? "#"}
              >
                {item?.label}
              </NextLink>
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
                color={index === 0 ? "primary" : "foreground"}
                href={item?.href ?? "#"}
                size="lg"
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
