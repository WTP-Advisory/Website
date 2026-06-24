import Image from "next/image";
import Link from "next/link";
import { CalendarClock, Mail, MapPin, Phone } from "lucide-react";
import { TopBar } from "../TopBar";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Container } from "../ui/Container";
import { SectionRenderer, type Section, type CtaData } from "./Sections";
import { ContactForm } from "./ContactForm";
import footer from "../../_data/footer.json";
import site from "../../_data/site.json";

export type PageHero = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
  variant?: "brand";
  cta?: CtaData;
};

export type PageData = {
  title: string;
  metaDescription?: string;
  hero: PageHero;
  sections?: Section[];
  showContactForm?: boolean;
};

function Hero({ hero, breadcrumb }: { hero: PageHero; breadcrumb: string }) {
  const brand = hero.variant === "brand";
  return (
    <section
      className={`relative overflow-hidden ${brand ? "bg-brand-700" : "bg-footer-dark"}`}
    >
      {hero.image && (
        <>
          <Image
            src={hero.image}
            alt=""
            fill
            className={brand ? "object-cover object-right" : "object-cover opacity-30"}
            priority
            sizes="100vw"
          />
          <div
            className={
              brand
                ? "absolute inset-0 bg-gradient-to-r from-brand-700 from-25% via-brand-700/80 to-indigo-950/50"
                : "absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"
            }
          />
        </>
      )}
      <Container className="relative py-16 lg:py-24">
        <p className="text-sm font-medium text-white/70">
          <Link href="/" className="hover:text-white">
            Home
          </Link>{" "}
          / <span className="text-white/90">{breadcrumb}</span>
        </p>
        {hero.eyebrow && (
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-brand-400">
            {hero.eyebrow}
          </p>
        )}
        <h1 className="mt-2 max-w-3xl text-3xl font-bold text-white lg:text-5xl">
          {hero.title}
        </h1>
        {brand && <div className="mt-6 h-[3px] w-16 bg-white" />}
        {hero.subtitle && (
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            {hero.subtitle}
          </p>
        )}
        {hero.cta && (
          <Link
            href={hero.cta.href}
            className={
              brand
                ? "mt-7 inline-flex h-12 items-center justify-center rounded-md bg-neutral-900 px-9 text-base font-medium text-white transition-colors hover:bg-neutral-800"
                : "mt-7 inline-flex h-12 items-center justify-center rounded-lg bg-brand-600 px-7 text-base font-medium text-white transition-colors hover:bg-brand-700"
            }
          >
            {hero.cta.label}
          </Link>
        )}
      </Container>
    </section>
  );
}

function ContactBlock() {
  const c = footer.contact;
  return (
    <section className="bg-white py-12 lg:py-16">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
            Liên hệ
          </p>
          <h2 className="mt-1.5 text-xl font-bold text-ink lg:text-2xl">
            Trao đổi với chuyên gia của chúng tôi
          </h2>
          <p className="mt-2 text-sm text-ink-soft">
            Cho chúng tôi biết về doanh nghiệp của bạn và mục tiêu tại Việt Nam.
            Bạn có thể chủ động đặt lịch gọi, hoặc gửi yêu cầu để chúng tôi liên
            hệ lại với bạn.
          </p>
          <div className="mt-4 space-y-3 text-sm text-ink-soft">
            {c.offices.map((office) => (
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
              <a href={c.phoneHref} className="hover:text-brand-600">
                {c.phone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-brand-600" />
              <a href={c.emailHref} className="hover:text-brand-600">
                {c.email}
              </a>
            </div>
          </div>
          {/* Two ways to reach us, worded so the distinction is explicit:
              booking = customer-initiated / talk now; form = we call you back. */}
          <div className="mt-6 space-y-5">
            <div>
              <p className="text-sm font-semibold text-ink">Chủ động đặt lịch</p>
              <p className="mt-1 text-sm text-ink-soft">
                Tự chọn khung giờ phù hợp và trao đổi trực tiếp 30 phút với
                chuyên gia — không cần chờ phản hồi.
              </p>
              {/* Outline (secondary) so it doesn't compete with the form's
                  primary submit. CalendlyButton watches this id to hide the
                  duplicate floating button while it's on screen. */}
              <a
                id="calendly-inline-cta"
                href={site.calendly.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex h-12 items-center justify-center gap-2 rounded-lg border-2 border-brand-600 bg-white px-6 text-sm font-medium text-brand-600 transition-colors hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                <CalendarClock className="h-5 w-5" />
                {site.calendly.label}
              </a>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">
                Hoặc gửi yêu cầu tư vấn
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                Điền biểu mẫu, đội ngũ của chúng tôi sẽ liên hệ lại với bạn
                trong vòng một ngày làm việc.
              </p>
            </div>
          </div>
        </div>
        <div id="contact-form-region" className="lg:col-span-2">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}

export function PageRenderer({ data }: { data: PageData }) {
  return (
    <>
      <TopBar />
      <Header />
      <main className="flex-1">
        <Hero hero={data.hero} breadcrumb={data.title} />
        {data.sections?.map((section, i) => (
          <SectionRenderer key={i} section={section} index={i} />
        ))}
        {data.showContactForm && <ContactBlock />}
      </main>
      <Footer />
    </>
  );
}
