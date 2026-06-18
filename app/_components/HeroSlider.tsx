"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import hero from "../_data/hero.json";

const slides = hero.slides;

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count]
  );

  useEffect(() => {
    const id = setInterval(() => go(index + 1), 6000);
    return () => clearInterval(id);
  }, [index, go]);

  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="relative aspect-[1536/792] max-h-[560px] w-full">
        {slides.map((slide, i) => {
          const active = i === index;
          const content = (
            <>
              <Image
                src={slide.image}
                alt={slide.alt}
                width={1536}
                height={792}
                className="h-full w-full object-cover"
                priority={i === 0}
              />
              {slide.heading && (
                <div className="absolute inset-0 flex items-center bg-black/35">
                  <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
                    <div className="max-w-xl text-white">
                      <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-[42px]">
                        {slide.heading}
                      </h1>
                      {slide.subtitle && (
                        <p className="mt-4 text-base text-white/90 sm:text-lg">
                          {slide.subtitle}
                        </p>
                      )}
                      {slide.cta && (
                        <Link
                          href={slide.cta.href}
                          className="mt-7 inline-flex h-12 items-center justify-center rounded-lg bg-brand-600 px-7 text-base font-medium text-white transition-colors hover:bg-brand-700"
                        >
                          {slide.cta.label}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          );

          return (
            <div
              key={slide.image}
              className={`absolute inset-0 transition-opacity duration-700 ${
                active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              aria-hidden={!active}
            >
              {slide.href && !slide.heading ? (
                <Link href={slide.href} className="block h-full w-full">
                  {content}
                </Link>
              ) : (
                content
              )}
            </div>
          );
        })}

        {/* Arrows */}
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous"
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink shadow transition hover:bg-white"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next"
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink shadow transition hover:bg-white"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`${i + 1} of ${count}`}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-6 bg-brand-600" : "w-2.5 bg-white/70 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
