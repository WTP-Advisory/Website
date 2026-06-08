"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Container } from "./ui/Container";
import { ButtonLink } from "./ui/Button";
import { Logo } from "./ui/Logo";
import { nav } from "../_data/content";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow ${
        scrolled ? "bg-white/95 shadow-sm backdrop-blur" : "bg-white"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <a href="#" aria-label={`${"WTP Advisory"} - Trang chủ`} className="shrink-0">
          <Logo />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-brand-600"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${nav.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 text-sm font-semibold text-brand-700"
          >
            <Phone className="h-4 w-4" />
            {nav.phone}
          </a>
          <ButtonLink href={nav.cta.href}>{nav.cta.label}</ButtonLink>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink lg:hidden"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-stone-100 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-ink-soft hover:bg-brand-50 hover:text-brand-700"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`tel:${nav.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 px-3 py-3 text-base font-semibold text-brand-700"
            >
              <Phone className="h-4 w-4" />
              {nav.phone}
            </a>
            <ButtonLink
              href={nav.cta.href}
              size="lg"
              className="mt-2"
              onClick={() => setOpen(false)}
            >
              {nav.cta.label}
            </ButtonLink>
          </Container>
        </div>
      )}
    </header>
  );
}
