import Image from "next/image";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { ecosystem } from "../_data/content";

export function Ecosystem() {
  return (
    <section
      id="he-sinh-thai"
      className="relative isolate overflow-hidden bg-surface py-20 sm:py-28"
    >
      {/* Faint world-map backdrop tying the whole grid together */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[url('/world-map.png')] bg-cover bg-center opacity-[0.06]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_50%_at_50%_0%,var(--color-brand-100)_0%,transparent_60%)] opacity-60"
      />

      <Container>
        <SectionHeading
          eyebrow={ecosystem.eyebrow}
          title={ecosystem.title}
          subtitle={ecosystem.subtitle}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ecosystem.members.map((member) => {
            const isSelf = member.name === "WTP Advisory";

            return (
              <article
                key={member.name}
                className={`group relative isolate flex flex-col items-center overflow-hidden rounded-2xl border p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                  isSelf
                    ? "border-brand-200 bg-brand-50/80 ring-1 ring-inset ring-brand-200 hover:shadow-brand-200/40"
                    : "border-stone-200 bg-white/90 hover:border-brand-200 hover:shadow-stone-300/40"
                }`}
              >
                {/* Per-card world map, brightening on hover (echoes reference) */}
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 bg-[url('/world-map.png')] bg-cover bg-center opacity-[0.05] transition-opacity duration-500 group-hover:opacity-[0.12]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 bg-linear-to-b from-brand-100/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                {/* "Self" badge so WTP Advisory reads as the hub */}
                {isSelf && (
                  <span className="absolute right-4 top-4 rounded-full bg-brand-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                    Chúng tôi
                  </span>
                )}

                {/* Real member logo on a clean badge */}
                <div
                  className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-3 shadow-sm ring-1 ring-inset transition-transform duration-300 group-hover:scale-105 ${
                    isSelf ? "ring-brand-200" : "ring-stone-200/80"
                  }`}
                >
                  <Image
                    src={member.logo}
                    alt={member.name}
                    width={160}
                    height={160}
                    className="h-full w-full object-contain"
                  />
                </div>

                <h3 className="mt-5 text-lg font-bold text-ink">{member.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{member.role}</p>

                {/* Accent underline that grows on hover */}
                <span
                  aria-hidden
                  className={`mt-4 h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-12 ${
                    isSelf ? "bg-brand-500" : "bg-brand-200 group-hover:bg-brand-500"
                  }`}
                />
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
