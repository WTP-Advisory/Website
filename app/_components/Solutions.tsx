import { Container } from "./ui/Container";
import { ServiceCards } from "./ServiceCards";
import solutions from "../_data/solutions.json";

export function Solutions() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-3xl rounded-xl bg-surface-2 px-6 py-10 text-center">
          <h2 className="text-3xl font-bold text-ink lg:text-[34px]">
            {solutions.heading}
          </h2>
          <p className="mt-5 text-ink-soft">{solutions.subtitle}</p>
        </div>

        <div className="mt-12 lg:mt-16">
          <ServiceCards items={solutions.items} />
        </div>
      </Container>
    </section>
  );
}
