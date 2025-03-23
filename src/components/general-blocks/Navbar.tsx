"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  AddCircle,
  Global,
  HambergerMenu,
  Notification,
  SearchNormal,
} from "iconsax-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import Logo from "@/images/mazaady-logo.webp";
import avatar from "@/images/avatar.webp";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: "Gifts", path: "/gifts" },
] as const;

// Navbar Component
const Navbar = () => {
  const pathname= usePathname();

  return (
    <nav className=" bg-white">
      <div className="mainContainer flex items-center justify-between py-3.5">
        <div className="flex gap-10 max-sm:gap-3 items-center">
          <NavbarMenu navItems={NAV_ITEMS} pathname={pathname} />
          <Image src={Logo} alt="Mazaady Logo" width={110} />
          <NavLinks
            navItems={NAV_ITEMS}
            pathname={pathname}
            className="max-lg:hidden"
          />
        </div>
        <NavActions />
      </div>
    </nav>
  );
};

export default Navbar;

// NavLinks Component
export const NavLinks = ({
  navItems,
  pathname,
  className,
}: {
  navItems: typeof NAV_ITEMS;
  pathname: string;
  className?: string;
}) => (
  <ul className={cn("flex gap-10", className)}>
    {navItems.map((item) => (
      <li key={item.path}>
        <Link
          href={item.path}
          className={cn(
            "relative",
            pathname === item.path ? "text-primary font-bold" : "text-gray"
          )}
        >
          {item.name}
          {pathname === item.path && (
            <div className="bg-primary w-full h-1.5 top-10 absolute rounded-t-md" />
          )}
        </Link>
      </li>
    ))}
  </ul>
);

// NavActions Component
export const NavActions = () => (
  <div className="flex gap-6 max-sm:gap-5 items-center">
    <Button variant={"noStyle"} size="icon" aria-label="Open Search">
      <SearchNormal size="24" color="#000000" variant="TwoTone" />
    </Button>
    <span className="border-l-2 border-pale h-8 max-md:hidden" />
    <Button variant={"noStyle"} size="icon" aria-label="Open Notifications">
      <Notification size="24" color="#000000" variant="TwoTone" />
    </Button>
    <span className="border-l-2 border-pale h-8 max-md:hidden" />
    <Image
      src={avatar}
      alt="Avatar"
      className="w-10 h-10 object-cover rounded-full shrink-0 max-lg:w-8 max-lg:h-8"
    />
    <Button variant="main" className="max-md:hidden" aria-label="Add new product">
      <AddCircle size="20" color="#FFFFFF" variant="Outline" />
      Add new product
    </Button>
    <LanguageSelector hiddenOnMobile />
  </div>
);

// LanguageSelector Component
const LanguageSelector = ({ hiddenOnMobile }: { hiddenOnMobile?: boolean }) => (
  <Button
    variant={"noStyle"}
    size="icon"
    role="button"
    aria-label="Toggle Languages"
    className={cn(
      "flex items-center gap-2 ",
      hiddenOnMobile && "max-md:hidden"
    )}
  >
    <Global size="24" color="#000000" variant="Outline" />
    <span className="border-l-2 border-gray-200 h-6" />
    <span className="font-bold text-lg">EN</span>
  </Button>
);
// NavbarMenu Component
const NavbarMenu = ({
  navItems,
  pathname,
}: {
  navItems: typeof NAV_ITEMS;
  pathname: string;
}) => (
  <Sheet>
    <SheetTrigger className="lg:hidden cursor-pointer" aria-label="Open Menu">
      <HambergerMenu size="24" color="#000000" variant="Outline" />
    </SheetTrigger>
    <SheetContent side="left" className="px-5 py-3 space-y-10">
      <SheetTitle>
        <Image src={Logo} alt="Mazaady Logo" />
      </SheetTitle>
      <ul className="flex flex-col gap-7">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={cn(
                "relative text-xl",
                pathname === item.path ? "text-primary font-bold" : "text-gray"
              )}
            >
              {item.name}
              {pathname === item.path && (
                <div className="bg-primary w-full h-1.5 top-8 absolute rounded-t-md" />
              )}
            </Link>
          </li>
        ))}
        <li className="w-full flex items-center justify-between flex-wrap gap-x-2 gap-y-5">
          <Button variant="main">
            <AddCircle size="20" color="#FFFFFF" variant="Outline" />
            Add new product
          </Button>
          <LanguageSelector />
        </li>
      </ul>
    </SheetContent>
  </Sheet>
);
