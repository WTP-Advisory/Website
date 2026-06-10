import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "./ui/Container";
import { JarvisFormEmbed } from "./JarvisFormEmbed";
import { Logo } from "./ui/Logo";
import footer from "../_data/footer.json";

function SocialIcon({ name, className }: { name: string; className?: string }) {
  if (name === "facebook") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden
      >
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.9h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
      </svg>
    );
  }
  if (name === "linkedin") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden
      >
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
      </svg>
    );
  }
  return <Mail className={className} />;
}

export function Footer() {
  return (
    <footer>
      {/* Tier 1 — About / Contact / Newsletter (light) */}
      <div className="bg-footer-light py-14">
        <Container className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-ink">
              {footer.about.heading}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              <strong className="text-ink">WTP Advisory</strong>{" "}
              {footer.about.body.replace(/^WTP Advisory\s*/, "")}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-ink">
              {footer.contact.heading}
            </h3>
            <div className="mt-4 space-y-4 text-sm text-ink-soft">
              {footer.contact.offices.map((office) => (
                <div key={office.name} className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                  <div>
                    <p className="font-semibold text-ink">{office.name}</p>
                    {office.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-brand-600" />
                <a
                  href={footer.contact.phoneHref}
                  className="hover:text-brand-600"
                >
                  {footer.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-brand-600" />
                <a
                  href={footer.contact.emailHref}
                  className="hover:text-brand-600"
                >
                  {footer.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-ink">
              {footer.newsletter.heading}
            </h3>
            <p className="mt-4 text-sm text-ink-soft">
              {footer.newsletter.body}
            </p>
            <div className="mt-5">
              <JarvisFormEmbed
                formId="form_OfLQZmv3dfyAjr"
                title="Newsletter Form (Footer)"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Tier 2 — Logos + link columns (dark) */}
      <div className="bg-footer-dark py-14 text-white">
        <Container className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-6 md:col-span-1">
            <Logo variant="vertical" />
          </div>

          {footer.columns.map((col) => (
            <div key={col.heading}>
              <h2 className="text-base font-bold text-white">{col.heading}</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-white/80">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Container>
      </div>

      {/* Tier 3 — bottom bar */}
      <div className="bg-footer-darker py-5 text-white/70">
        <Container className="flex flex-col items-center justify-between gap-4 text-xs sm:flex-row">
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center">
            <span>{footer.bottom.copyright}</span>
            {footer.bottom.legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </p>
          <ul className="flex items-center gap-3">
            {footer.bottom.social.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand-600"
                >
                  <SocialIcon name={s.icon} className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
