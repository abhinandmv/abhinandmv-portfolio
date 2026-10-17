"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/Button";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const current = navLinks.find((nav) => isActive(pathname, nav.href));

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 py-3 md:py-6">
      <nav className="glass flex items-center justify-between gap-2 rounded-full p-1.5 pl-2">
        {/* Desktop: all links inline */}
        <ul className="no-scrollbar hidden min-w-0 items-center gap-1 overflow-x-auto md:flex">
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

        {/* Mobile: current page label */}
        <span className="glass-strong rounded-full px-4 py-1.5 text-sm font-medium md:hidden">
          {current?.name ?? "menu"}
        </span>

        <div className="flex shrink-0 items-center">
          <ThemeToggle />
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">
              {menuOpen ? "Close menu" : "Open menu"}
            </span>
          </Button>
        </div>
      </nav>

      {/* Mobile: dropdown panel */}
      {menuOpen && (
        <ul
          id="mobile-nav"
          className="glass-strong mt-2 grid grid-cols-2 gap-1 rounded-3xl p-2 animate-in fade-in slide-in-from-top-2 md:hidden"
        >
          {navLinks.map((nav) => {
            const active = isActive(pathname, nav.href);
            return (
              <li key={nav.href}>
                <Link
                  href={nav.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "block rounded-2xl px-4 py-3 text-sm transition-colors",
                    active
                      ? "bg-foreground/10 font-medium text-foreground"
                      : "text-muted-foreground active:bg-foreground/10",
                  )}
                >
                  {nav.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </header>
  );
}
