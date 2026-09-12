"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Compass } from "lucide-react";

const guidesDropdown = [
  { label: "Preparation", href: "/preparation" },
  { label: "Travel Tips", href: "/travel-tips" },
  { label: "Visa", href: "/visa" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Hajj", href: "/hajj-guide" },
  { label: "Umrah", href: "/umrah-guide" },
  { label: "Duas", href: "/duas" },
  { label: "Ziyaaraat", href: "/ziyarat" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const [mobileGuidesOpen, setMobileGuidesOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setGuidesOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setGuidesOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-soft-beige bg-white/95 backdrop-blur-md">
      {/* Main Header */}
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="shrink-0">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="group flex flex-col leading-none"
          >
            <span className="font-heading text-xl font-semibold tracking-tight text-deep-teal transition-colors duration-200 group-hover:text-emerald sm:text-[21px]">
              Manasik
            </span>

            <span className="mt-1 text-[9px] font-medium tracking-[0.25em] text-gold sm:text-[10px]">
              HAJJ &amp; UMRAH{" "}
              <span className="text-deep-teal/60">|</span> BLOG
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex">
          <div className="flex items-center gap-6 xl:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative flex h-[72px] items-center font-heading text-[14px] font-semibold tracking-[0.01em] text-charcoal transition-colors duration-200 hover:text-emerald"
              >
                {link.label}

                <span className="absolute bottom-[18px] left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            {/* Guides Dropdown */}
            <div
              className="relative flex h-[72px] items-center"
              ref={dropdownRef}
            >
              <button
                type="button"
                onClick={() => setGuidesOpen((open) => !open)}
                aria-expanded={guidesOpen}
                aria-haspopup="true"
                className="group relative flex items-center gap-1 font-heading text-[14px] font-semibold tracking-[0.01em] text-charcoal transition-colors duration-200 hover:text-emerald"
              >
                Guides

                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    guidesOpen ? "rotate-180 text-gold" : ""
                  }`}
                />

                <span className="absolute -bottom-[25px] left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-gold transition-all duration-300 group-hover:w-full" />
              </button>

              {guidesOpen && (
                <div className="absolute left-1/2 top-[65px] z-20 w-48 -translate-x-1/2 overflow-hidden rounded-2xl border border-soft-beige bg-white p-1.5 shadow-[0_14px_35px_rgba(6,63,58,0.12)]">
                  {guidesDropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setGuidesOpen(false)}
                      className="block rounded-xl px-4 py-2.5 font-heading text-[13px] font-medium text-charcoal transition-all duration-200 hover:bg-warm-white hover:pl-5 hover:text-emerald"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden shrink-0 lg:flex">
          <Link
            href="/planning/estimate-cost"
            className="group flex min-h-10 items-center gap-2 rounded-full border border-emerald/80 bg-gradient-to-r from-deep-teal to-emerald px-5 py-2.5 font-heading text-[13px] font-semibold text-warm-white shadow-[0_4px_0_#045c48,0_7px_16px_rgba(6,63,58,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_5px_0_#045c48,0_11px_22px_rgba(6,63,58,0.22)] active:translate-y-[1px]"
          >
            <Compass className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6" />
            Plan Your Journey
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-deep-teal transition-all duration-200 hover:bg-warm-white hover:text-emerald lg:hidden"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t border-soft-beige bg-white lg:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 font-heading text-[14px] font-semibold text-charcoal transition-all duration-200 hover:bg-warm-white hover:text-emerald"
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Guides */}
              <div className="overflow-hidden rounded-xl">
                <button
                  type="button"
                  onClick={() =>
                    setMobileGuidesOpen((open) => !open)
                  }
                  aria-expanded={mobileGuidesOpen}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 font-heading text-[14px] font-semibold text-charcoal transition-colors hover:bg-warm-white hover:text-emerald"
                >
                  Guides

                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      mobileGuidesOpen ? "rotate-180 text-gold" : ""
                    }`}
                  />
                </button>

                {mobileGuidesOpen && (
                  <div className="ml-3 flex flex-col border-l-2 border-gold/30 pl-3">
                    {guidesDropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-muted-teal transition-colors hover:bg-warm-white hover:text-emerald"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile CTA */}
              <Link
                href="/planning/estimate-cost"
                onClick={() => setMobileOpen(false)}
                className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-deep-teal to-emerald px-5 py-3 font-heading text-sm font-semibold text-warm-white shadow-[0_4px_0_#045c48,0_8px_18px_rgba(6,63,58,0.18)] transition-all duration-300 active:translate-y-[1px]"
              >
                <Compass className="h-4 w-4" />
                Plan Your Journey
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
