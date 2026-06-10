"use client";

import { useState } from "react";

const industries = [
  "Manufacturing",
  "Trading / Distribution",
  "IT / Software",
  "Services / Consulting",
  "Retail / E-commerce",
  "F&B",
  "Logistics",
  "Other",
];

const services = [
  "Incorporation",
  "Legal Advisory",
  "Accounting & Finance",
  "Tax Services",
  "HR & Payroll",
  "Immigration",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
        <h3 className="text-xl font-bold text-ink">Thank you!</h3>
        <p className="mt-2 text-ink-soft">
          Your inquiry has been received. Our team will get back to you within one
          business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <Field label="Name" name="name" required />
      <Field label="Phone" name="phone" type="tel" required />
      <Field label="Company" name="company" />
      <Field label="Company Email" name="email" type="email" required />
      <Field label="Title" name="title" />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="industry" className="text-sm font-medium text-ink">
          Industry
        </label>
        <select
          id="industry"
          name="industry"
          defaultValue=""
          className="rounded border border-stone-300 bg-white px-3 py-2.5 text-sm text-ink focus:border-brand-600 focus:outline-none"
        >
          <option value="" disabled>
            Select an industry
          </option>
          {industries.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="sm:col-span-2">
        <legend className="text-sm font-medium text-ink">How can we help you?</legend>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {services.map((s) => (
            <label key={s} className="flex items-center gap-2 text-sm text-ink-soft">
              <input type="checkbox" name="services" value={s} className="accent-brand-600" />
              {s}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="rounded border border-stone-300 bg-white px-3 py-2.5 text-sm text-ink focus:border-brand-600 focus:outline-none"
        />
      </div>

      <label className="flex items-start gap-2 text-xs text-ink-soft sm:col-span-2">
        <input type="checkbox" required className="mt-0.5 accent-brand-600" />
        <span>
          I agree to the Terms &amp; Conditions and Privacy Policy and consent to InCorp
          Vietnam processing my data.
        </span>
      </label>

      <button
        type="submit"
        className="rounded-lg bg-brand-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 sm:col-span-2 sm:w-fit"
      >
        Submit Inquiry
      </button>
    </form>
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
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-ink">
        {label}
        {required && <span className="text-brand-600"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="rounded border border-stone-300 bg-white px-3 py-2.5 text-sm text-ink focus:border-brand-600 focus:outline-none"
      />
    </div>
  );
}
