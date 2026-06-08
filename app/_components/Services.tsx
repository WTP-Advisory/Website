import {
  Calculator,
  Compass,
  Megaphone,
  ReceiptText,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { services } from "../_data/content";

const icons: Record<string, LucideIcon> = {
  Compass,
  Target,
  Calculator,
  ReceiptText,
  Megaphone,
  Users,
};

export function Services() {
  return (
    <section id="dich-vu" className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={services.eyebrow}
          title={services.title}
          subtitle={services.subtitle}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((service) => {
            const Icon = icons[service.icon] ?? Compass;
            return (
              <div
                key={service.title}
                className="group rounded-2xl border border-stone-200 bg-white p-7 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
