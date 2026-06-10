import type { Metadata } from "next";
import { promises as fs } from "fs";
import path from "path";
import { TopBar } from "../_components/TopBar";
import { Header } from "../_components/Header";
import { Footer } from "../_components/Footer";
import { WhatsAppButton } from "../_components/WhatsAppButton";
import { Container } from "../_components/ui/Container";
import { PageRenderer, type PageData } from "../_components/page/PageRenderer";
import { EventRenderer, type EventData } from "../_components/page/EventRenderer";
import { JobRenderer, type JobData } from "../_components/page/JobRenderer";

type Params = { slug: string[] };

// A page JSON is rendered with a dedicated layout when it declares a `"layout"`
// discriminator — `"event"` for /events/<slug>, `"job"` for /careers/<slug>.
type LoadedPage = PageData | EventData | JobData;

const PAGES_DIR = path.join(process.cwd(), "app", "_data", "pages");

function isEvent(data: LoadedPage): data is EventData {
  return (data as EventData).layout === "event";
}

function isJob(data: LoadedPage): data is JobData {
  return (data as JobData).layout === "job";
}

function keyFromSlug(slug: string[]): string {
  return slug.join("__");
}

function titleFromSlug(slug: string[]): string {
  const last = slug[slug.length - 1] ?? "";
  return last
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

async function loadPage(slug: string[]): Promise<LoadedPage | null> {
  try {
    const file = path.join(PAGES_DIR, `${keyFromSlug(slug)}.json`);
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as LoadedPage;
  } catch {
    return null;
  }
}

// Prerender every authored page at build time (slug derived from filename,
// "__" splits nested segments). Unknown slugs still render on demand via the
// placeholder fallback (dynamicParams defaults to true).
export async function generateStaticParams(): Promise<Params[]> {
  try {
    const files = await fs.readdir(PAGES_DIR);
    return files
      .filter((f) => f.endsWith(".json"))
      .map((f) => ({ slug: f.replace(/\.json$/, "").split("__") }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await loadPage(slug);
  if (data) {
    return { title: data.title, description: data.metaDescription };
  }
  return { title: titleFromSlug(slug) || "Page" };
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const data = await loadPage(slug);

  if (data) {
    if (isEvent(data)) return <EventRenderer data={data} />;
    if (isJob(data)) return <JobRenderer data={data} />;
    return <PageRenderer data={data} />;
  }

  // Fallback placeholder for routes without authored content yet.
  const title = titleFromSlug(slug) || "Page";
  return (
    <>
      <TopBar />
      <Header />
      <main className="flex-1">
        <section className="bg-surface-2 py-16 lg:py-24">
          <Container>
            <p className="text-sm font-medium uppercase tracking-wide text-brand-600">
              InCorp Vietnam
            </p>
            <h1 className="mt-3 text-3xl font-bold text-ink lg:text-5xl">{title}</h1>
            <p className="mt-5 max-w-2xl text-ink-soft">
              This page is part of the InCorp Vietnam clone. Detailed content for{" "}
              <strong className="text-ink">{title}</strong> has not been authored yet.
            </p>
          </Container>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
