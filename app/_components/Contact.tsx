"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { Button } from "./ui/Button";
import { contact } from "../_data/content";

function InfoRow({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-sm text-ink-soft">{children}</span>
    </li>
  );
}

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  // Presentational only: composes a mailto: with the entered values.
  // TODO: replace with a Server Action / route handler to persist & email leads.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const company = String(data.get("company") ?? "");
    const phone = String(data.get("phone") ?? "");
    const message = String(data.get("message") ?? "");
    const body = `Họ tên: ${name}%0D%0ACông ty: ${company}%0D%0AĐiện thoại: ${phone}%0D%0A%0D%0A${message}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      "Yêu cầu tư vấn từ website"
    )}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <section id="lien-he" className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={contact.eyebrow}
          title={contact.title}
          align="left"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {/* Company info */}
          <div>
            <p className="max-w-md text-base leading-7 text-muted">
              {contact.about}
            </p>
            <ul className="mt-8 space-y-4">
              <InfoRow icon={MapPin}>{contact.address}</InfoRow>
              <InfoRow icon={Phone}>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>
                  {contact.phone}
                </a>
              </InfoRow>
              <InfoRow icon={Mail}>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </InfoRow>
            </ul>
            <p className="mt-8 text-sm text-muted">
              Mã số thuế:{" "}
              <span className="font-semibold text-ink-soft">
                {contact.taxCode}
              </span>
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-stone-200 bg-surface p-7 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Họ và tên" name="name" required />
              <Field label="Công ty" name="company" />
              <Field label="Điện thoại" name="phone" type="tel" required />
              <Field label="Email" name="email" type="email" required />
            </div>
            <div className="mt-4">
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium text-ink-soft"
              >
                Nội dung cần tư vấn
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <Button type="submit" size="lg" className="mt-6 w-full">
              Gửi yêu cầu tư vấn
            </Button>
            <p className="mt-3 text-center text-xs text-muted">
              {submitted ? "Cảm ơn bạn! Đang mở trình gửi email…" : contact.formNote}
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-ink-soft"
      >
        {label}
        {required && <span className="text-brand-600"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
    </div>
  );
}
