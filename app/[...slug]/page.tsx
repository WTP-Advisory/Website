import type { Metadata } from "next";
import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
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


async function loadPage(slug: string[]): Promise<LoadedPage | null> {
  try {
    const file = path.join(PAGES_DIR, `${keyFromSlug(slug)}.json`);
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw.replace(/^﻿/, "")) as LoadedPage;
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
  return {};
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const data = await loadPage(slug);

  if (!data) notFound();

  if (isEvent(data)) return <EventRenderer data={data} />;
  if (isJob(data)) return <JobRenderer data={data} />;
  return <PageRenderer data={data} />;
}
