"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  {
    name: "home",
    href: "/",
  },
  {
    name: "projects",
    href: "/projects",
  },
  {
    name: "certifications",
    href: "/certifications",
  },
  {
    name: "publications",
    href: "/publications",
  },
  {
    name: "blog",
    href: "/blog",
  },
  {
    name: "contact",
    href: "/contact",
  },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 py-4 sm:py-6">
      <nav className="glass flex items-center justify-between gap-2 rounded-full p-1.5 pl-2">
        <ul className="no-scrollbar flex min-w-0 items-center gap-1 overflow-x-auto">
          {navLinks.map((nav) => {
            const active = isActive(pathname, nav.href);
            return (
              <li key={nav.href} className="shrink-0">
                <Link
                  href={nav.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block rounded-full px-3 py-1.5 text-sm transition-all duration-300",
                    active
                      ? "glass-strong font-medium text-foreground"
                      : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
                  )}
                >
                  {nav.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex shrink-0">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
