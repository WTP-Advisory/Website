"use client";

import { useState } from "react";

const sources = [
  "Website",
  "LinkedIn Page",
  "Email Newsletter",
  "Through your network",
  "Others",
];

export function EventRegistrationForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
        <h3 className="text-xl font-bold text-ink">You&apos;re registered!</h3>
        <p className="mt-2 text-ink-soft">
          Thank you for registering. A confirmation with the joining details will be sent
          to your email shortly.
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
      <Field label="Company Email" name="email" type="email" required />
      <Field label="Company" name="company" />
      <Field label="Phone" name="phone" type="tel" />

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor="source" className="text-sm font-medium text-ink">
          How did you hear about our event?
        </label>
        <select
          id="source"
          name="source"
          defaultValue=""
          className="rounded border border-stone-300 bg-white px-3 py-2.5 text-sm text-ink focus:border-brand-600 focus:outline-none"
        >
          <option value="" disabled>
            Select an option
          </option>
          {sources.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-start gap-2 text-xs text-ink-soft sm:col-span-2">
        <input type="checkbox" required className="mt-0.5 accent-brand-600" />
        <span>
          I have read and agree to the Terms &amp; Conditions and Privacy Policy.
        </span>
      </label>

      <button
        type="submit"
        className="rounded-lg bg-brand-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 sm:col-span-2 sm:w-fit"
      >
        Register Now
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
