import Link from "next/link";
import { Check, Mail, Search } from "lucide-react";
import { Container } from "../ui/Container";
import { ServiceCards, type ServiceItem } from "../ServiceCards";
import { JobBoard } from "./JobBoard";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function MemberSocials({
  member,
  className = "",
  iconClass = "h-5 w-5",
}: {
  member: { name: string; linkedin?: string; email?: string };
  className?: string;
  iconClass?: string;
}) {
  if (!member.linkedin && !member.email) return null;
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="text-ink transition-colors hover:text-brand-600"
        >
          <LinkedinIcon className={iconClass} />
        </a>
      )}
      {member.email && (
        <a
          href={`mailto:${member.email}`}
          aria-label={`Email ${member.name}`}
          className="text-ink transition-colors hover:text-brand-600"
        >
          <Mail className={iconClass} />
        </a>
      )}
    </div>
  );
}

/* ----------------------------- types ----------------------------- */

export type CtaData = { label: string; href: string };

export type Section =
  | {
      type: "richText";
      eyebrow?: string;
      heading?: string;
      body: string[];
      align?: "left" | "center";
    }
  | {
      type: "cards";
      eyebrow?: string;
      heading?: string;
      subtitle?: string;
      columns?: number;
      items: CardItem[];
    }
  | {
      type: "list";
      eyebrow?: string;
      heading?: string;
      subtitle?: string;
      columns?: number;
      items: string[];
    }
  | {
      type: "steps";
      eyebrow?: string;
      heading?: string;
      subtitle?: string;
      items: StepItem[];
    }
  | { type: "stats"; eyebrow?: string; heading?: string; items: StatItem[] }
  | {
      type: "imageText";
      eyebrow?: string;
      heading?: string;
      body: string[];
      image: string;
      imageSide?: "left" | "right";
    }
  | { type: "faq"; eyebrow?: string; heading?: string; items: FaqItem[] }
  | {
      type: "events";
      eyebrow?: string;
      heading?: string;
      subtitle?: string;
      items: EventItem[];
    }
  | {
      type: "team";
      eyebrow?: string;
      heading?: string;
      subtitle?: string;
      columns?: number;
      variant?: "portrait" | "avatar";
      items: TeamMember[];
    }
  | {
      type: "logos";
      eyebrow?: string;
      heading?: string;
      subtitle?: string;
      columns?: number;
      items: LogoItem[];
    }
  | {
      type: "jobSearch";
      keywordPlaceholder?: string;
      locations?: string[];
      buttonLabel?: string;
    }
  | {
      type: "jobs";
      eyebrow?: string;
      heading?: string;
      subtitle?: string;
      columns?: number;
      items: JobItem[];
    }
  | {
      type: "jobBoard";
      eyebrow?: string;
      heading?: string;
      subtitle?: string;
      columns?: number;
      keywordPlaceholder?: string;
      buttonLabel?: string;
      items: JobItem[];
    }
  | {
      type: "solutions";
      eyebrow?: string;
      heading?: string;
      subtitle?: string;
      items: ServiceItem[];
    }
  | {
      type: "cta";
      title: string;
      subtitle?: string;
      button: CtaData;
      variant?: "blue" | "red";
    };

type CardItem = { title: string; desc?: string; href?: string; image?: string };
type StepItem = { title: string; desc?: string };
type StatItem = { value: string; label: string };
type FaqItem = { q: string; a: string };
type TeamMember = {
  name: string;
  role?: string;
  image?: string;
  profileHref?: string;
  linkedin?: string;
  email?: string;
};
type LogoItem = { name: string; image?: string };
type JobItem = {
  title: string;
  desc?: string;
  href?: string;
  location?: string;
};
type EventItem = {
  title: string;
  image?: string;
  format?: string;
  date?: string;
  desc?: string;
  href: string;
  cta?: string;
};

/* --------------------------- primitives --------------------------- */

function Heading({
  eyebrow,
  heading,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  heading?: string;
  subtitle?: string;
  center?: boolean;
}) {
  if (!eyebrow && !heading && !subtitle) return null;
  return (
    <div
      className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}
    >
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
          {eyebrow}
        </p>
      )}
      {heading && (
        <h2 className="mt-2 text-2xl font-bold text-ink lg:text-[34px]">
          {heading}
        </h2>
      )}
      {subtitle && <p className="mt-4 text-ink-soft">{subtitle}</p>}
    </div>
  );
}

/* --------------------------- renderer --------------------------- */

export function SectionRenderer({
  section,
  index,
}: {
  section: Section;
  index: number;
}) {
  const zebra = index % 2 === 1;
  const band = zebra ? "bg-surface-2" : "bg-white";

  switch (section.type) {
    case "richText":
      return (
        <section className={`${band} py-12 lg:py-16`}>
          <Container>
            <Heading
              eyebrow={section.eyebrow}
              heading={section.heading}
              center={section.align === "center"}
            />
            <div
              className={`mt-6 space-y-4 text-ink-soft ${
                section.align === "center"
                  ? "mx-auto max-w-3xl text-center"
                  : "max-w-4xl"
              }`}
            >
              {section.body.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </Container>
        </section>
      );

    case "cards": {
      const cols = section.columns ?? 3;
      const gridCols =
        cols === 2
          ? "sm:grid-cols-2"
          : cols === 4
            ? "sm:grid-cols-2 lg:grid-cols-4"
            : "sm:grid-cols-2 lg:grid-cols-3";
      return (
        <section className={`${band} py-12 lg:py-16`}>
          <Container>
            <Heading
              eyebrow={section.eyebrow}
              heading={section.heading}
              subtitle={section.subtitle}
            />
            <div className={`mt-10 grid grid-cols-1 gap-6 ${gridCols}`}>
              {section.items.map((item, i) => {
                const inner = (
                  <>
                    {item.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt={item.title}
                        className="mb-4 aspect-[3/2] w-full rounded-md object-cover"
                        loading="lazy"
                      />
                    )}
                    <h3 className="text-lg font-bold text-ink group-hover:text-brand-600">
                      {item.title}
                    </h3>
                    {item.desc && (
                      <p className="mt-2 text-sm text-ink-soft">{item.desc}</p>
                    )}
                  </>
                );
                return item.href ? (
                  <Link
                    key={i}
                    href={item.href}
                    className="group rounded-lg border border-stone-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div
                    key={i}
                    className="group rounded-lg border border-stone-200 bg-white p-6 shadow-sm"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      );
    }

    case "list": {
      const cols = section.columns ?? 2;
      const gridCols =
        cols === 1
          ? ""
          : cols === 3
            ? "sm:grid-cols-2 lg:grid-cols-3"
            : "sm:grid-cols-2";
      return (
        <section className={`${band} py-12 lg:py-16`}>
          <Container>
            <Heading
              eyebrow={section.eyebrow}
              heading={section.heading}
              subtitle={section.subtitle}
            />
            <ul className={`mt-8 grid grid-cols-1 gap-x-8 gap-y-3 ${gridCols}`}>
              {section.items.map((item, i) => (
                <li key={i} className="flex gap-3 text-ink-soft">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      );
    }

    case "steps":
      return (
        <section className={`${band} py-12 lg:py-16`}>
          <Container>
            <Heading
              eyebrow={section.eyebrow}
              heading={section.heading}
              subtitle={section.subtitle}
            />
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-stone-200 bg-white p-6"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-bold text-ink">{item.title}</h3>
                  {item.desc && (
                    <p className="mt-2 text-sm text-ink-soft">{item.desc}</p>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      );

    case "stats":
      return (
        <section className={`${band} py-12 lg:py-16`}>
          <Container>
            <Heading eyebrow={section.eyebrow} heading={section.heading} />
            <div className="mt-10 grid grid-cols-2 gap-8 lg:grid-cols-4">
              {section.items.map((item, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl font-bold text-brand-600 lg:text-4xl">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">{item.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      );

    case "imageText": {
      const right = section.imageSide !== "left";
      return (
        <section className={`${band} py-12 lg:py-16`}>
          <Container>
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <div className={right ? "" : "lg:order-2"}>
                <Heading
                  eyebrow={section.eyebrow}
                  heading={section.heading}
                  center={false}
                />
                <div className="mt-5 space-y-4 text-ink-soft">
                  {section.body.map((p, i) => (
                    <p key={i} className="leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
              <div className={right ? "" : "lg:order-1"}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={section.image}
                  alt={section.heading ?? ""}
                  className="w-full rounded-lg object-cover shadow-sm"
                  loading="lazy"
                />
              </div>
            </div>
          </Container>
        </section>
      );
    }

    case "faq":
      return (
        <section className={`${band} py-12 lg:py-16`}>
          <Container className="max-w-3xl">
            <Heading eyebrow={section.eyebrow} heading={section.heading} />
            <div className="mt-8 divide-y divide-stone-200 border-y border-stone-200">
              {section.items.map((item, i) => (
                <details key={i} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-ink">
                    {item.q}
                    <span className="ml-4 text-brand-600 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </Container>
        </section>
      );

    case "events":
      return (
        <section className={`${band} py-12 lg:py-16`}>
          <Container>
            <Heading
              eyebrow={section.eyebrow}
              heading={section.heading}
              subtitle={section.subtitle}
            />
            <div className="mt-12 flex flex-col gap-12 lg:gap-16">
              {section.items.map((ev, i) => (
                <article
                  key={i}
                  className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12"
                >
                  <div className="flex-1 lg:order-1">
                    {(ev.format || ev.date) && (
                      <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">
                        {ev.format && (
                          <span className="text-brand-600">{ev.format}</span>
                        )}
                        {ev.format && ev.date && (
                          <span className="text-stone-400"> | </span>
                        )}
                        {ev.date}
                      </p>
                    )}
                    <h3 className="mt-3 text-xl font-bold text-ink lg:text-2xl">
                      <Link href={ev.href} className="hover:text-brand-600">
                        {ev.title}
                      </Link>
                    </h3>
                    {ev.desc && (
                      <p className="mt-3 line-clamp-2 text-ink-soft">
                        {ev.desc}
                      </p>
                    )}
                    <Link
                      href={ev.href}
                      className="mt-5 inline-flex w-fit items-center justify-center rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                    >
                      {ev.cta ?? "Register Now"}
                    </Link>
                  </div>
                  {ev.image && (
                    <Link
                      href={ev.href}
                      className="group block shrink-0 overflow-hidden rounded-xl shadow-sm lg:order-2 lg:w-[46%]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={ev.image}
                        alt={ev.title}
                        className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </Container>
        </section>
      );

    case "team": {
      const avatar = section.variant === "avatar";
      const cols = section.columns ?? (avatar ? 4 : 3);
      const gridCols =
        cols === 4
          ? "sm:grid-cols-2 lg:grid-cols-4"
          : cols === 2
            ? "sm:grid-cols-2"
            : "sm:grid-cols-2 lg:grid-cols-3";
      return (
        <section className={`${band} py-12 lg:py-16`}>
          <Container>
            <Heading
              eyebrow={section.eyebrow}
              heading={section.heading}
              subtitle={section.subtitle}
            />
            <div
              className={`mt-12 grid grid-cols-1 ${
                avatar ? "gap-6" : "gap-x-8 gap-y-12"
              } ${gridCols}`}
            >
              {section.items.map((m, i) =>
                avatar ? (
                  <div
                    key={i}
                    className="flex flex-col rounded-lg bg-surface-2 p-5 transition-shadow hover:shadow-md"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.image ?? "/incorp/people/placeholder.svg"}
                      alt={m.name}
                      className="mx-auto h-28 w-28 rounded-full object-cover"
                      loading="lazy"
                    />
                    <h3 className="mt-4 font-bold text-brand-600">{m.name}</h3>
                    {m.role && (
                      <p className="mt-1 text-sm text-ink-soft">{m.role}</p>
                    )}
                    <MemberSocials
                      member={m}
                      className="mt-4 justify-start"
                      iconClass="h-4 w-4"
                    />
                  </div>
                ) : (
                  <div key={i} className="text-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.image ?? "/incorp/people/placeholder.svg"}
                      alt={m.name}
                      className="mx-auto aspect-square w-full max-w-[300px] rounded-sm object-cover"
                      loading="lazy"
                    />
                    <h3 className="mt-5 text-lg font-bold text-brand-600">
                      {m.name}
                    </h3>
                    {m.role && (
                      <p className="mt-2 font-semibold text-ink">{m.role}</p>
                    )}
                    {m.profileHref && (
                      <Link
                        href={m.profileHref}
                        className="mt-3 inline-block text-sm font-medium text-brand-600 hover:underline"
                      >
                        View profile
                      </Link>
                    )}
                    <MemberSocials
                      member={m}
                      className="mt-3 justify-center"
                      iconClass="h-5 w-5"
                    />
                  </div>
                ),
              )}
            </div>
          </Container>
        </section>
      );
    }

    case "jobSearch": {
      const locations = section.locations ?? [
        "All Locations",
        "Ho Chi Minh City",
        "Hanoi",
        "Danang",
      ];
      return (
        <section className="h-40 flex justify-center items-center bg-white py-4">
          <Container>
            <div className="flex flex-col gap-3 bg-[#2c3e50] p-6 shadow-xl sm:flex-row sm:items-center sm:p-8">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  aria-label="Job title or keyword"
                  placeholder={
                    section.keywordPlaceholder ?? "Job Title, Keyword"
                  }
                  className="h-12 w-full rounded-lg border border-stone-300 bg-white pl-10 pr-3 text-sm text-ink focus:border-brand-600 focus:outline-none"
                />
              </div>
              <select
                aria-label="Location"
                defaultValue=""
                className="h-12 rounded-lg border border-stone-300 bg-white px-3 text-sm text-ink focus:border-brand-600 focus:outline-none sm:w-56"
              >
                <option value="" disabled>
                  Select Location
                </option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="h-12 shrink-0 rounded-lg bg-brand-600 px-7 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                {section.buttonLabel ?? "Find Job"}
              </button>
            </div>
          </Container>
        </section>
      );
    }

    case "jobs": {
      const cols = section.columns ?? 3;
      const gridCols =
        cols === 2
          ? "sm:grid-cols-2"
          : cols === 4
            ? "sm:grid-cols-2 lg:grid-cols-4"
            : "sm:grid-cols-2 lg:grid-cols-3";
      return (
        <section className={`${band} py-12 lg:py-16`}>
          <Container>
            <Heading
              eyebrow={section.eyebrow}
              heading={section.heading}
              subtitle={section.subtitle}
            />
            <div className={`mt-10 grid grid-cols-1 gap-5 ${gridCols}`}>
              {section.items.map((job, i) => {
                const inner = (
                  <>
                    <h3 className="font-bold text-brand-600 group-hover/job:underline">
                      {job.title}
                    </h3>
                    {job.desc && (
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                        {job.desc}
                      </p>
                    )}
                    {job.location && (
                      <p className="mt-3 text-xs font-medium uppercase tracking-wide text-ink-soft">
                        {job.location}
                      </p>
                    )}
                  </>
                );
                return job.href ? (
                  <Link
                    key={i}
                    href={job.href}
                    className="group/job rounded-lg border border-stone-200 bg-surface-2 p-5 transition-shadow hover:shadow-md"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div
                    key={i}
                    className="rounded-lg border border-stone-200 bg-surface-2 p-5"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      );
    }

    case "jobBoard":
      return (
        <JobBoard
          eyebrow={section.eyebrow}
          heading={section.heading}
          subtitle={section.subtitle}
          items={section.items}
          keywordPlaceholder={section.keywordPlaceholder}
          buttonLabel={section.buttonLabel}
          columns={section.columns}
        />
      );

    case "logos": {
      const cols = section.columns ?? 4;
      const gridCols =
        cols === 3
          ? "sm:grid-cols-3"
          : cols === 5
            ? "sm:grid-cols-3 lg:grid-cols-5"
            : "sm:grid-cols-3 lg:grid-cols-4";
      return (
        <section className={`${band} py-12 lg:py-16`}>
          <Container>
            <Heading
              eyebrow={section.eyebrow}
              heading={section.heading}
              subtitle={section.subtitle}
            />
            <div className={`mt-10 grid grid-cols-2 gap-5 ${gridCols}`}>
              {section.items.map((logo, i) => (
                <div
                  key={i}
                  className="rounded-lg bg-surface-2 p-4 transition-shadow hover:shadow-md"
                >
                  <div className="flex aspect-[4/3] w-full items-center justify-center rounded-md bg-white p-6">
                    {logo.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={logo.image}
                        alt={logo.name}
                        className="max-h-16 w-auto max-w-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-center text-lg font-bold uppercase tracking-wide text-ink-soft">
                        {logo.name}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      );
    }

    case "solutions":
      return (
        <section className={`${band} py-12 lg:py-16`}>
          <Container>
            <Heading
              eyebrow={section.eyebrow}
              heading={section.heading}
              subtitle={section.subtitle}
            />
            <div className="mt-12 lg:mt-16">
              <ServiceCards items={section.items} />
            </div>
          </Container>
        </section>
      );

    case "cta": {
      const bg = section.variant === "red" ? "bg-brand-600" : "bg-blue-cta";
      return (
        <section className={`${bg} py-12`}>
          <Container className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div className="text-white">
              <h2 className="text-2xl font-bold lg:text-3xl">
                {section.title}
              </h2>
              {section.subtitle && (
                <p className="mt-2 text-white/90">{section.subtitle}</p>
              )}
            </div>
            <Link
              href={section.button.href}
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-brand-600 transition-colors hover:bg-stone-100"
            >
              {section.button.label}
            </Link>
          </Container>
        </section>
      );
    }

    default:
      return null;
  }
}
