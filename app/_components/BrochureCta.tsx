import { Container } from "./ui/Container";
import site from "../_data/site.json";

const { brochure } = site;

export function BrochureCta() {
  return (
    <section className="bg-blue-cta py-10">
      <Container className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <p className="max-w-2xl text-xl font-medium text-white lg:text-2xl">
          {brochure.text}
        </p>
        <a
          href={brochure.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-brand-600 px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-brand-700"
        >
          {brochure.ctaLabel}
        </a>
      </Container>
    </section>
  );
}
