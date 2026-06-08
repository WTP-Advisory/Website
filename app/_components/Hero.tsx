import { ArrowRight } from "lucide-react";
import { Container } from "./ui/Container";
import { ButtonLink } from "./ui/Button";
import { hero } from "../_data/content";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-950 text-white">
      {/* Background video (WTP-style animated backdrop) */}
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-poster.jpg"
        aria-hidden
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* World-map overlay + dark gradient for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[url('/world-map.png')] bg-cover bg-center opacity-15 mix-blend-screen"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/95 via-brand-950/80 to-brand-950/40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_85%_15%,var(--color-brand-600)_0%,transparent_55%)] opacity-40"
      />

      <Container className="relative grid gap-12 py-24 lg:grid-cols-12 lg:items-center lg:py-32">
        <div className="max-w-2xl lg:col-span-7">
          <p className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-brand-100 ring-1 ring-inset ring-white/15">
            {hero.eyebrow}
          </p>
          <h1 className="mt-6 whitespace-pre-line text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
            Think <span className="text-brand-500">Global</span> – Go{" "}
            <span className="text-brand-500">Global</span>
          </p>
          <p className="mt-6 max-w-xl text-lg leading-8 text-brand-100">
            {hero.description}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={hero.primaryCta.href} variant="primary" size="lg">
              {hero.primaryCta.label}
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="ghost" size="lg">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        {/* Group mission quote card */}
        <div className="lg:col-span-5">
          <figure className="rounded-3xl bg-white/10 p-7 ring-1 ring-inset ring-white/15 backdrop-blur-sm">
            <blockquote className="text-lg font-medium leading-8 text-white">
              {hero.quote}
            </blockquote>
            <figcaption className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-brand-500">20+</span>
              <span className="text-sm text-brand-100">
                năm kinh nghiệm quản trị doanh nghiệp
              </span>
            </figcaption>
          </figure>
        </div>
      </Container>

      {/* Trust strip */}
      <div className="relative border-t border-white/10 bg-black/20">
        <Container className="flex flex-col items-center gap-4 py-6 sm:flex-row sm:justify-between">
          <p className="text-sm font-medium text-brand-200">{hero.trustLabel}</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {hero.trustLogos.map((logo) => (
              <li
                key={logo}
                className="text-sm font-semibold tracking-wide text-white/70"
              >
                {logo}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
