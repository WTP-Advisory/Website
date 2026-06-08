import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { process } from "../_data/content";

export function Process() {
  return (
    <section id="quy-trinh" className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={process.eyebrow}
          title={process.title}
          subtitle={process.subtitle}
        />

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((item) => (
            <li
              key={item.step}
              className="relative rounded-2xl border border-stone-200 bg-surface p-7"
            >
              <span className="text-5xl font-extrabold text-brand-100">
                {item.step}
              </span>
              <h3 className="mt-3 text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
