"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Compass } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Islamic Tools", href: "/islamic-tools" },
  { label: "Hajj Guide", href: "/hajj-guide" },
  { label: "Umrah Guide", href: "/umrah-guide" },
  { label: "Duas", href: "/duas" },
  { label: "Ziyaraat Guide", href: "/ziyaraat-guide" },
  { label: "Travel Tips", href: "/travel-tips" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-soft-beige bg-white/95 backdrop-blur-md">
      {/* Main Header */}
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-8">
        {/* Brand */}
                      <div className="shrink-0">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="group flex items-center gap-2.5"
          >
            {/* Logo mark: crescent and star on a deep-teal tile with a gold ring */}
          
            <span className="flex flex-col leading-none">
              {/* Wordmark: bold, two-tone gradient, raised (embossed) look */}
              <span className="font-heading text-xl font-bold tracking-tight [filter:drop-shadow(0_1px_0_rgba(255,255,255,0.9))_drop-shadow(0_2px_2px_rgba(2,51,47,0.28))] sm:text-[22px]">
                <span className="bg-gradient-to-b from-deep-teal to-dark-teal bg-clip-text text-transparent transition-all duration-200 group-hover:from-emerald group-hover:to-deep-teal">
                  Islam
                </span>{" "}
                <span className="bg-gradient-to-b from-[#ad8a10] to-[#7a5f00] bg-clip-text text-transparent">
                  Religion
                </span>
              </span>

              <span className="mt-1.5 flex items-center gap-2 text-[9px] font-semibold tracking-[0.22em] text-gold-text [text-shadow:0_1px_0_rgba(255,255,255,0.95),0_1px_2px_rgba(135,106,0,0.35)] sm:text-[10px]">
                ISLAMIC TOOLS
                <span
                  aria-hidden="true"
                  className="h-2.5 w-px bg-gradient-to-b from-transparent via-gold to-transparent"
                />
                GUIDES
              </span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden lg:flex">
          <div className="flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative flex h-[72px] items-center whitespace-nowrap font-heading text-[13px] font-semibold tracking-[0.01em] text-charcoal transition-colors duration-200 hover:text-emerald xl:text-[14px]"
              >
                {link.label}

                <span className="absolute bottom-[18px] left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden shrink-0 lg:flex">
          <Link
            href="/islamic-tools"
            className="group flex min-h-10 items-center gap-2 whitespace-nowrap rounded-full border border-emerald/80 bg-gradient-to-r from-deep-teal to-emerald px-4 py-2.5 font-heading text-[13px] font-semibold text-warm-white shadow-[0_4px_0_#045c48,0_7px_16px_rgba(6,63,58,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_5px_0_#045c48,0_11px_22px_rgba(6,63,58,0.22)] active:translate-y-[1px] xl:px-5"
          >
            <Compass
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6"
            />
            Plan Your Journey
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-deep-teal transition-all duration-200 hover:bg-warm-white hover:text-emerald lg:hidden"
        >
          {mobileOpen ? (
            <X aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Menu aria-hidden="true" className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation: scrolls inside itself if the screen is short */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-68px)] overflow-y-auto border-t border-soft-beige bg-white sm:max-h-[calc(100dvh-72px)] lg:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="mx-auto max-w-7xl px-4 py-3 sm:px-6"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-11 items-center rounded-xl border border-soft-beige bg-warm-white px-4 py-2 font-heading text-[13px] font-semibold text-charcoal shadow-[0_3px_10px_rgba(6,63,58,0.08)] transition-all duration-200 hover:border-gold/60 hover:text-emerald hover:shadow-[0_5px_14px_rgba(6,63,58,0.14)] active:translate-y-[1px] active:shadow-[0_1px_4px_rgba(6,63,58,0.1)]"
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile CTA */}
              <Link
                href="/islamic-tools"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex min-h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-deep-teal to-emerald px-5 py-2.5 font-heading text-[13px] font-semibold text-warm-white shadow-[0_4px_0_#045c48,0_8px_18px_rgba(6,63,58,0.18)] transition-all duration-300 active:translate-y-[1px]"
              >
                <Compass aria-hidden="true" className="h-4 w-4" />
                Plan Your Journey
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}