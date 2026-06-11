import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { TopBar } from "../TopBar";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Container } from "../ui/Container";
import { EventRegistrationForm } from "./EventRegistrationForm";

export type EventSpeaker = { name: string; role?: string; image?: string };
export type EventDetailItem = { label: string; value: string };
export type EventAgendaItem = {
  time?: string;
  title: string;
  speaker?: string;
  desc?: string;
};
export type EventBulletSection = {
  heading: string;
  intro?: string;
  items: string[];
};
export type EventLink = { title: string; href: string };

export type EventData = {
  layout: "event";
  title: string;
  metaDescription?: string;
  banner?: string;
  format?: string;
  date?: string;
  about?: string[];
  details?: EventDetailItem[];
  speakers?: EventSpeaker[];
  matters?: { heading?: string; body: string[] };
  agenda?: EventAgendaItem[];
  bulletSections?: EventBulletSection[];
  registration?: {
    heading?: string;
    subtitle?: string;
    schedule?: string;
    formId?: string;
  };
  prev?: EventLink;
  next?: EventLink;
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold text-ink lg:text-3xl">{children}</h2>
  );
}

export function EventRenderer({ data }: { data: EventData }) {
  return (
    <>
      <TopBar />
      <Header />
      <main className="flex-1 bg-white">
        <Container className="py-10 lg:py-14">
          {/* Breadcrumb */}
          <p className="text-sm font-medium text-ink-soft">
            <Link href="/" className="hover:text-brand-600">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/events" className="hover:text-brand-600">
              Events
            </Link>{" "}
            / <span className="text-ink">{data.title}</span>
          </p>

          {/* Title */}
          <h1 className="mt-4 max-w-4xl text-3xl font-bold text-brand-600 lg:text-4xl">
            {data.title}
          </h1>

          {(data.format || data.date) && (
            <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-ink-soft">
              {[data.format, data.date].filter(Boolean).join(" | ")}
            </p>
          )}

          {/* Banner */}
          {data.banner && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.banner}
              alt={data.title}
              className="mt-7 w-full rounded-xl object-cover shadow-sm"
            />
          )}

          <div
            className={`mt-12 grid grid-cols-1 gap-12 ${
              data.registration?.formId ? "lg:grid-cols-[1fr_380px]" : ""
            }`}
          >
            {/* Main content */}
            <div className="min-w-0">
              {data.about && data.about.length > 0 && (
                <section>
                  <SectionHeading>About the Event</SectionHeading>
                  <div className="mt-4 space-y-4 text-ink-soft">
                    {data.about.map((p, i) => (
                      <p key={i} className="leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              )}

              {data.details && data.details.length > 0 && (
                <section className="mt-10">
                  <SectionHeading>Webinar Details</SectionHeading>
                  <dl className="mt-4 space-y-2 text-ink-soft">
                    {data.details.map((d, i) => (
                      <div
                        key={i}
                        className="flex flex-col gap-0.5 sm:flex-row sm:gap-2"
                      >
                        <dt className="font-semibold text-ink">{d.label}:</dt>
                        <dd>{d.value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              {data.matters && (
                <section className="mt-10">
                  <SectionHeading>
                    {data.matters.heading ?? "Why This Event Matters Now"}
                  </SectionHeading>
                  <div className="mt-4 space-y-4 text-ink-soft">
                    {data.matters.body.map((p, i) => (
                      <p key={i} className="leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              )}

              {data.speakers && data.speakers.length > 0 && (
                <section className="mt-10">
                  <SectionHeading>Featured Speakers</SectionHeading>
                  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {data.speakers.map((s, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 rounded-lg border border-stone-200 bg-surface-2 p-4"
                      >
                        {s.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={s.image}
                            alt={s.name}
                            className="h-16 w-16 shrink-0 rounded-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xl font-bold text-white">
                            {s.name.charAt(0)}
                          </span>
                        )}
                        <div>
                          <p className="font-bold text-ink">{s.name}</p>
                          {s.role && (
                            <p className="text-sm text-ink-soft">{s.role}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {data.agenda && data.agenda.length > 0 && (
                <section className="mt-10">
                  <SectionHeading>Event Agenda</SectionHeading>
                  <ol className="mt-6 space-y-5">
                    {data.agenda.map((a, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                          {i + 1}
                        </span>
                        <div className="min-w-0">
                          {a.time && (
                            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                              {a.time}
                            </p>
                          )}
                          <p className="font-bold text-ink">{a.title}</p>
                          {a.speaker && (
                            <p className="text-sm font-medium text-ink-soft">
                              {a.speaker}
                            </p>
                          )}
                          {a.desc && (
                            <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                              {a.desc}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {data.bulletSections?.map((b, i) => (
                <section key={i} className="mt-10">
                  <SectionHeading>{b.heading}</SectionHeading>
                  {b.intro && <p className="mt-3 text-ink-soft">{b.intro}</p>}
                  <ul className="mt-5 space-y-3">
                    {b.items.map((item, j) => (
                      <li key={j} className="flex gap-3 text-ink-soft">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            {/* Registration sidebar */}
            {data.registration?.formId && (
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <div>
                  <EventRegistrationForm formId={data.registration.formId} />
                </div>
              </aside>
            )}
          </div>

          {/* More events nav */}
          {(data.prev || data.next) && (
            <nav className="mt-14 flex flex-col gap-4 border-t border-stone-200 pt-8 sm:flex-row sm:justify-between">
              {data.prev ? (
                <Link
                  href={data.prev.href}
                  className="group flex max-w-md items-start gap-3 text-left"
                >
                  <ArrowLeft className="mt-1 h-5 w-5 shrink-0 text-brand-600" />
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wide text-ink-soft">
                      Previous
                    </span>
                    <span className="font-medium text-ink group-hover:text-brand-600">
                      {data.prev.title}
                    </span>
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {data.next ? (
                <Link
                  href={data.next.href}
                  className="group flex max-w-md items-start gap-3 text-right sm:flex-row-reverse"
                >
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-brand-600" />
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wide text-ink-soft">
                      Next
                    </span>
                    <span className="font-medium text-ink group-hover:text-brand-600">
                      {data.next.title}
                    </span>
                  </span>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
