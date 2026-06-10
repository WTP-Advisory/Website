import { Container } from "./ui/Container";
import stats from "../_data/stats.json";

export function StatsBand() {
  return (
    <section className="bg-surface-2 py-16 lg:py-20">
      <Container>
        <h2 className="text-center text-3xl font-bold text-ink lg:text-[36px]">
          {stats.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-ink-soft">
          {stats.intro}
        </p>

        <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.items.map((item) => (
            <div key={item.label} className="flex flex-col items-center text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.icon} alt={item.alt} className="h-16 w-16" loading="lazy" />
              <h3 className="mt-4 text-3xl font-bold text-brand-600 lg:text-4xl">
                {item.value}
              </h3>
              <p className="mt-1 text-sm text-ink-soft">{item.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
