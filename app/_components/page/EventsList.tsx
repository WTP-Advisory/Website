"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type EventItem = {
  title: string;
  image?: string;
  format?: string;
  date?: string;
  desc?: string;
  href: string;
  cta?: string;
};

const PAGE_SIZE = 2;

export function EventsList({ items }: { items: EventItem[] }) {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const current = Math.min(page, pageCount - 1);
  const visible = items.slice(current * PAGE_SIZE, current * PAGE_SIZE + PAGE_SIZE);

  return (
    <>
      <div className="mt-12 flex flex-col gap-12 lg:gap-16">
        {visible.map((ev, i) => (
          <article
            key={current * PAGE_SIZE + i}
            className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12"
          >
            <div className="flex-1 lg:order-1">
              {(ev.format || ev.date) && (
                <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">
                  {ev.format && (
                    <span className="text-brand-600">{ev.format}</span>
                  )}
                  {ev.format && ev.date && (
                    <span className="text-stone-400"> | </span>
                  )}
                  {ev.date}
                </p>
              )}
              <h3 className="mt-3 text-xl font-bold text-ink lg:text-2xl">
                <Link href={ev.href} className="hover:text-brand-600">
                  {ev.title}
                </Link>
              </h3>
              {ev.desc && (
                <p className="mt-3 line-clamp-2 text-ink-soft">{ev.desc}</p>
              )}
              <Link
                href={ev.href}
                className="mt-5 inline-flex w-fit items-center justify-center rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                {ev.cta ?? "Register Now"}
              </Link>
            </div>
            {ev.image && (
              <Link
                href={ev.href}
                className="group block shrink-0 overflow-hidden rounded-xl shadow-sm lg:order-2 lg:w-[46%]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </Link>
            )}
          </article>
        ))}
      </div>

      {pageCount > 1 && (
        <nav
          className="mt-12 flex items-center justify-center gap-2"
          aria-label="Phân trang sự kiện"
        >
          <button
            type="button"
            onClick={() => setPage(current - 1)}
            disabled={current === 0}
            aria-label="Trang trước"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-stone-200 text-ink-soft transition-colors hover:border-brand-600 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-stone-200 disabled:hover:text-ink-soft"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              aria-current={i === current ? "page" : undefined}
              className={`h-10 w-10 rounded-md border text-sm font-semibold transition-colors ${
                i === current
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-stone-200 text-ink-soft hover:border-brand-600 hover:text-brand-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage(current + 1)}
            disabled={current === pageCount - 1}
            aria-label="Trang sau"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-stone-200 text-ink-soft transition-colors hover:border-brand-600 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-stone-200 disabled:hover:text-ink-soft"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </nav>
      )}
    </>
  );
}
