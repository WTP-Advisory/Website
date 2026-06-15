import type { MetadataRoute } from "next";
import { promises as fs } from "fs";
import path from "path";
import { BASE_URL } from "./_lib/site";

const PAGES_DIR = path.join(process.cwd(), "app", "_data", "pages");

// Filenames encode nested segments with "__" (see app/[...slug]/page.tsx).
function slugFromFile(file: string): string[] {
  return file.replace(/\.json$/, "").split("__");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const home: MetadataRoute.Sitemap[number] = {
    url: BASE_URL,
    changeFrequency: "weekly",
    priority: 1,
  };

  let files: string[] = [];
  try {
    files = (await fs.readdir(PAGES_DIR)).filter((f) => f.endsWith(".json"));
  } catch {
    return [home];
  }

  const pages = await Promise.all(
    files.map(async (file) => {
      const slug = slugFromFile(file);
      let lastModified: Date | undefined;
      try {
        lastModified = (await fs.stat(path.join(PAGES_DIR, file))).mtime;
      } catch {
        lastModified = undefined;
      }
      return {
        url: `${BASE_URL}/${slug.join("/")}`,
        lastModified,
        changeFrequency: "monthly" as const,
        // Top-level pages outrank their nested children.
        priority: slug.length > 1 ? 0.6 : 0.8,
      };
    }),
  );

  return [home, ...pages];
}
