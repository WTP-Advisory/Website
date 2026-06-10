"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Container } from "../ui/Container";

export type JobItem = {
  title: string;
  desc?: string;
  href?: string;
  location?: string;
};

export function JobBoard({
  eyebrow,
  heading,
  subtitle,
  items,
  keywordPlaceholder = "Job Title, Keyword",
  buttonLabel = "Find Job",
  columns = 3,
}: {
  eyebrow?: string;
  heading?: string;
  subtitle?: string;
  items: JobItem[];
  keywordPlaceholder?: string;
  buttonLabel?: string;
  columns?: number;
}) {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const locations = useMemo(
    () =>
      Array.from(
        new Set(
          items.map((i) => i.location).filter((l): l is string => Boolean(l)),
        ),
      ).sort(),
    [items],
  );

  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    return items.filter((job) => {
      const matchesKeyword =
        !kw ||
        job.title.toLowerCase().includes(kw) ||
        (job.desc?.toLowerCase().includes(kw) ?? false);
      const matchesLocation = !location || job.location === location;
      return matchesKeyword && matchesLocation;
    });
  }, [items, keyword, location]);

  const isFiltering = keyword.trim() !== "" || location !== "";

  const gridCols =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <>
      <section className="justify-center items-center bg-white pb-4">
        <Container>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-3 rounded-xl bg-[#2c3e50] p-4 shadow-xl sm:flex-row sm:items-center"
          >
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="text"
                aria-label="Job title or keyword"
                placeholder={keywordPlaceholder}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="h-12 w-full rounded-lg border border-stone-300 bg-white pl-10 pr-3 text-sm text-ink focus:border-brand-600 focus:outline-none"
              />
            </div>
            <select
              aria-label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-12 rounded-lg border border-stone-300 bg-white px-3 text-sm text-ink focus:border-brand-600 focus:outline-none sm:w-56"
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="h-12 shrink-0 rounded-lg bg-brand-600 px-7 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              {buttonLabel}
            </button>
          </form>
        </Container>
      </section>

      <section className="bg-surface-2 py-12 lg:py-16">
        <Container>
          {(eyebrow || heading || subtitle) && (
            <div className="mx-auto max-w-3xl text-center">
              {eyebrow && (
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
                  {eyebrow}
                </p>
              )}
              {heading && (
                <h2 className="mt-2 text-2xl font-bold text-ink lg:text-[34px]">
                  {heading}
                </h2>
              )}
              {subtitle && <p className="mt-4 text-ink-soft">{subtitle}</p>}
            </div>
          )}

          {isFiltering && (
            <p
              className="mt-8 text-center text-sm text-ink-soft"
              aria-live="polite"
            >
              {filtered.length} {filtered.length === 1 ? "role" : "roles"} found
            </p>
          )}

          {filtered.length > 0 ? (
            <div className={`mt-8 grid grid-cols-1 gap-5 ${gridCols}`}>
              {filtered.map((job, i) => {
                const inner = (
                  <>
                    <h3 className="font-bold text-brand-600 group-hover/job:underline">
                      {job.title}
                    </h3>
                    {job.desc && (
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                        {job.desc}
                      </p>
                    )}
                  </>
                );
                return job.href ? (
                  <Link
                    key={i}
                    href={job.href}
                    className="group/job rounded-lg border border-stone-200 bg-surface-2 p-5 transition-shadow hover:shadow-md"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div
                    key={i}
                    className="rounded-lg border border-stone-200 bg-surface-2 p-5"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-10 rounded-lg border border-dashed border-stone-300 bg-white p-10 text-center">
              <p className="font-medium text-ink">
                No roles match your search.
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                Try a different keyword or location.
              </p>
              <button
                type="button"
                onClick={() => {
                  setKeyword("");
                  setLocation("");
                }}
                className="mt-4 text-sm font-medium text-brand-600 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
