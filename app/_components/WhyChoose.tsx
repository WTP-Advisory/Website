import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { whyChoose } from "../_data/content";

export function WhyChoose() {
  return (
    <section id="vi-sao" className="bg-surface py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={whyChoose.eyebrow}
          title={whyChoose.title}
          subtitle={whyChoose.description}
        />

        <dl className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {whyChoose.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white p-7 text-center shadow-sm ring-1 ring-inset ring-stone-100"
            >
              <dt className="text-4xl font-extrabold text-brand-600 sm:text-5xl">
                {stat.value}
              </dt>
              <dd className="mt-2 text-sm font-medium text-ink-soft">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
