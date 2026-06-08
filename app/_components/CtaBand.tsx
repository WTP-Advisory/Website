import { ArrowRight } from "lucide-react";
import { Container } from "./ui/Container";
import { ButtonLink } from "./ui/Button";
import { ctaBand } from "../_data/content";

export function CtaBand() {
  return (
    <section className="bg-brand-700 py-16 text-white sm:py-20">
      <Container className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {ctaBand.title}
          </h2>
          <p className="mt-3 text-base text-brand-100 sm:text-lg">
            {ctaBand.description}
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <ButtonLink href={ctaBand.primaryCta.href} variant="secondary" size="lg">
            {ctaBand.primaryCta.label}
            <ArrowRight className="h-5 w-5" />
          </ButtonLink>
          <ButtonLink href={ctaBand.secondaryCta.href} variant="ghost" size="lg">
            {ctaBand.secondaryCta.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
