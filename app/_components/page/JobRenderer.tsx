import Link from "next/link";
import { TopBar } from "../TopBar";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { WhatsAppButton } from "../WhatsAppButton";
import { Container } from "../ui/Container";
import careers from "../../_data/pages/careers.json";

export type JobData = {
  layout: "job";
  title: string;
  metaDescription?: string;
  location?: string;
  notice?: string;
  description: string[];
  duties: string[];
  requirements: string[];
  remuneration?: string;
  applyHref?: string;
};

const DEFAULT_NOTICE =
  "Urgent Notice | InCorp Vietnam has detected ongoing fraudulent activities that are using our brand name to solicit money from job seekers. Please note that we do not engage in monetary transactions or reimbursements as part of our recruitment process.";

type OtherJob = { title: string; desc?: string; href?: string };

function getOtherPositions(currentTitle: string): OtherJob[] {
  const board = (careers.sections as Array<Record<string, unknown>>).find(
    (s) => s.type === "jobBoard",
  );
  const items = (board?.items as OtherJob[] | undefined) ?? [];
  return items.filter((j) => j.title !== currentTitle && j.href).slice(0, 3);
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-ink-soft">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand-600" />
          <span className="leading-relaxed">{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function JobRenderer({ data }: { data: JobData }) {
  const others = getOtherPositions(data.title);
  return (
    <>
      <TopBar />
      <Header />
      <main className="flex-1 bg-white">
        <Container className="py-10 lg:py-12">
          {/* Fraud notice */}
          <div className="rounded-md border border-brand-600 bg-brand-50 px-5 py-3 text-center text-sm text-brand-700">
            {data.notice ?? DEFAULT_NOTICE}
          </div>

          {/* Title */}
          <h1 className="mt-10 text-center text-3xl font-bold text-ink lg:text-4xl">
            {data.title}
          </h1>
          {data.location && (
            <p className="mt-2 text-center text-sm font-semibold uppercase tracking-wide text-brand-600">
              {data.location}
            </p>
          )}

          <div className="mx-auto mt-10 max-w-3xl">
            <section>
              <h2 className="text-xl font-bold text-ink">Job Description</h2>
              <div className="mt-3 space-y-3 text-ink-soft">
                {data.description.map((p, i) => (
                  <p key={i} className="leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-bold text-ink">Duties and Responsibilities</h2>
              <Bullets items={data.duties} />
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-bold text-ink">Requirements</h2>
              <Bullets items={data.requirements} />
            </section>

            {data.remuneration && (
              <p className="mt-8 text-ink-soft">{data.remuneration}</p>
            )}
          </div>
        </Container>

        {/* CTA band */}
        <section className="bg-[#2c3e50] py-10">
          <Container className="flex flex-col items-center justify-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
            <h2 className="text-xl font-bold text-white lg:text-2xl">
              Embark on a life-changing career with InCorp
            </h2>
            <Link
              href={data.applyHref ?? "/make-an-inquiry"}
              className="inline-flex shrink-0 items-center justify-center rounded-md bg-brand-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Apply Now
            </Link>
          </Container>
        </section>

        {/* Vacant positions */}
        {others.length > 0 && (
          <section className="bg-white py-12 lg:py-16">
            <Container>
              <h2 className="text-2xl font-bold text-ink lg:text-3xl">Vacant Position</h2>
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((job, i) => (
                  <Link
                    key={i}
                    href={job.href as string}
                    className="group/job rounded-lg border border-stone-200 bg-surface-2 p-5 transition-shadow hover:shadow-md"
                  >
                    <h3 className="font-bold text-brand-600 group-hover/job:underline">
                      {job.title}
                    </h3>
                    {job.desc && (
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                        {job.desc}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
