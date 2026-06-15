"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navLinks, site } from "@/lib/content";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        isScrolled || isOpen
          ? "border-b border-line bg-surface/95 backdrop-blur-sm"
          : "bg-surface"
      }`}
    >
      <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-3.5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-ink transition-colors hover:text-ink-secondary"
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.slice(0, -1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink-secondary transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/#booking" className="btn-primary">
            Запись
          </Link>
        </nav>

        <button
          type="button"
          aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 flex h-9 w-9 items-center justify-center md:hidden"
        >
          <span className="sr-only">Меню</span>
          <div className="flex w-4 flex-col gap-1">
            <span
              className={`block h-px bg-ink transition-all duration-200 ${
                isOpen ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px bg-ink transition-all duration-200 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px bg-ink transition-all duration-200 ${
                isOpen ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 top-[53px] z-40 bg-surface md:hidden">
          <nav className="flex flex-col border-t border-line px-5 py-4">
            {navLinks.slice(0, -1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="border-b border-line py-3.5 text-sm text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#booking"
              onClick={closeMenu}
              className="btn-primary mt-4 block text-center"
            >
              Запись
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
