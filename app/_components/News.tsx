"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "./ui/Container";
import news from "../_data/news.json";

const PER_PAGE = 3;
const pages = Math.ceil(news.articles.length / PER_PAGE);

export function News() {
  const [page, setPage] = useState(0);
  const start = page * PER_PAGE;
  const visible = news.articles.slice(start, start + PER_PAGE);

  return (
    <section className="bg-surface-2 py-16 lg:py-20">
      <Container>
        <h2 className="text-center text-3xl font-bold text-ink lg:text-[40px]">
          {news.heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((article) => (
            <article
              key={article.href}
              className="flex flex-col overflow-hidden rounded-lg bg-surface-3"
            >
              <Link href={article.href} className="block overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.image}
                  alt={article.alt}
                  className="aspect-[16/9] w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-bold leading-snug text-ink">
                  <Link href={article.href} className="hover:text-brand-600">
                    {article.title}
                  </Link>
                </h3>
                <Link
                  href={article.href}
                  className="mt-4 inline-flex w-fit items-center gap-1 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700"
                >
                  {news.readMoreLabel} <span aria-hidden>🡢</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {pages > 1 && (
          <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`${i + 1} of ${pages}`}
                className={`h-2.5 rounded-full transition-all ${
                  i === page ? "w-6 bg-brand-600" : "w-2.5 bg-stone-300 hover:bg-stone-400"
                }`}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
