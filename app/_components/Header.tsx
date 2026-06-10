"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Menu, Search, X } from "lucide-react";
import { Container } from "./ui/Container";
import { Logo } from "./ui/Logo";
import nav from "../_data/nav.json";
import site from "../_data/site.json";

type Item = { title: string; desc?: string; href: string };
type Group = { title: string; href: string; items: Item[] };
type NavLink = {
  label: string;
  href: string;
  megamenu?: Group[];
  dropdown?: Item[];
};

const links = nav.links as NavLink[];

function MegaPanel({ groups }: { groups: Group[] }) {
  const [active, setActive] = useState(0);
  const current = groups[active] ?? groups[0];
  const cards =
    current?.items && current.items.length > 0
      ? current.items
      : [{ title: `Browse ${current?.title ?? ""}`, href: current?.href ?? "#" }];

  return (
    <div className="absolute left-0 right-0 top-full hidden max-h-[calc(100vh-70px)] overflow-y-auto overflow-x-hidden border-t border-stone-100 bg-footer-light shadow-lg group-hover:block">
      {/* red accent block, full-bleed left */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-[6%] bg-brand-600" />
      {/* faded city image, full-bleed right */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/incorp/hero/slide-power-of-one.png"
        alt=""
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-[18%] object-cover opacity-20 lg:block"
      />

      <Container className="relative">
        <div className="flex min-h-[340px]">
          {/* left: category list */}
          <ul className="w-[30%] shrink-0 border-r border-stone-300 py-6">
            {groups.map((group, i) => (
              <li key={group.title}>
                <Link
                  href={group.href}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`flex items-center justify-between gap-2 px-5 py-2.5 text-[17px] font-medium transition-colors ${
                    i === active ? "text-brand-600" : "text-ink hover:text-brand-600"
                  }`}
                >
                  {group.title}
                  <ChevronRight className="h-4 w-4 shrink-0 text-brand-600" />
                </Link>
              </li>
            ))}
          </ul>

          {/* right: cards for the active category */}
          <div className="grid flex-1 auto-rows-min grid-cols-2 gap-5 p-6 lg:grid-cols-3">
            {cards.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group/card flex flex-col bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="text-[17px] font-bold leading-snug text-brand-600">
                  {item.title}
                </span>
                {item.desc && (
                  <span className="mt-1.5 text-sm leading-snug text-ink-soft">
                    {item.desc}
                  </span>
                )}
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
                  Learn More
                  <ChevronRight className="h-4 w-4 transition-transform group-hover/card:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

function Dropdown({ items }: { items: Item[] }) {
  return (
    <div className="absolute left-0 top-full hidden min-w-[260px] rounded-b-lg border-t-2 border-brand-600 bg-white shadow-lg group-hover:block">
      <ul className="py-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block px-4 py-2 text-sm text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-600"
            >
              <span className="font-medium text-ink">{item.title}</span>
              {item.desc && (
                <span className="block text-xs text-muted">{item.desc}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-100 bg-white shadow-sm">
      <Container className="flex h-[70px] items-center justify-between gap-4">
        <Link href={site.homeUrl} aria-label={`${site.name} - Home`} className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const hasPanel = !!(link.megamenu || link.dropdown);
            return (
              <div
                key={link.label}
                className={`group flex h-[70px] items-center ${
                  link.megamenu ? "static" : "relative"
                }`}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-3 py-2 text-[15px] font-medium text-ink-soft transition-colors group-hover:text-brand-600"
                >
                  {link.label}
                  {hasPanel && <ChevronDown className="h-4 w-4" />}
                </Link>
                {link.megamenu && <MegaPanel groups={link.megamenu} />}
                {link.dropdown && <Dropdown items={link.dropdown} />}
              </div>
            );
          })}
          <Link
            href={nav.cta.href}
            className="ml-2 inline-flex h-10 items-center justify-center rounded-lg bg-brand-600 px-5 text-[15px] font-medium text-white transition-colors hover:bg-brand-700"
          >
            {nav.cta.label}
          </Link>
          <button
            type="button"
            aria-label="Search"
            className="ml-1 text-ink-soft transition-colors hover:text-brand-600"
          >
            <Search className="h-5 w-5" />
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {/* Mobile drawer */}
      {open && (
        <div className="max-h-[calc(100vh-70px)] overflow-y-auto border-t border-stone-100 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((link) => {
              const sub = link.megamenu || link.dropdown;
              const isOpen = openSub === link.label;
              if (!sub) {
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-ink-soft hover:bg-brand-50 hover:text-brand-700"
                  >
                    {link.label}
                  </Link>
                );
              }
              return (
                <div key={link.label}>
                  <button
                    type="button"
                    onClick={() => setOpenSub(isOpen ? null : link.label)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-ink-soft hover:bg-brand-50"
                  >
                    {link.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="space-y-3 pb-2 pl-4">
                      {link.megamenu?.map((group) => (
                        <div key={group.title}>
                          <Link
                            href={group.href}
                            onClick={() => setOpen(false)}
                            className="block py-1 text-sm font-bold text-brand-600"
                          >
                            {group.title}
                          </Link>
                          <ul className="space-y-0.5 pl-2">
                            {group.items.map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  onClick={() => setOpen(false)}
                                  className="block py-1 text-sm text-ink-soft hover:text-brand-600"
                                >
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      {link.dropdown?.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="block py-1 text-sm text-ink-soft hover:text-brand-600"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <Link
              href={nav.cta.href}
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-12 items-center justify-center rounded-lg bg-brand-600 px-5 text-base font-medium text-white hover:bg-brand-700"
            >
              {nav.cta.label}
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
