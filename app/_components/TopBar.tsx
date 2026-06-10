import { Phone } from "lucide-react";
import { Container } from "./ui/Container";
import site from "../_data/site.json";

const { topbar } = site;

export function TopBar() {
  return (
    <div className="hidden bg-surface text-sm text-ink-soft md:block">
      <Container className="flex h-10 items-center justify-end gap-6">
        <span className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-brand-600" />
          <span className="text-muted">{topbar.callLabel}</span>
          <a
            href={topbar.phoneHref}
            className="font-medium text-ink hover:text-brand-600"
          >
            {topbar.phone}
          </a>
        </span>

        <span className="flex items-center gap-2">
          <span className="font-medium text-ink">{topbar.currentLocation}</span>
          <span className="text-muted">·</span>
          <label className="sr-only" htmlFor="location-select">
            Choose Location
          </label>
          <select
            id="location-select"
            defaultValue="Vietnam"
            className="cursor-pointer rounded border border-stone-300 bg-white px-2 py-1 text-xs text-ink-soft focus:border-brand-600 focus:outline-none"
          >
            {topbar.locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </span>
      </Container>
    </div>
  );
}
