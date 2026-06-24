"use client";

import { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";
import site from "../_data/site.json";

// In-page elements that already surface the booking CTA / contact form. While
// any of them is on screen we hide this floating button, so:
//   - the two identical "Đặt lịch tư vấn" CTAs never appear together, and
//   - on mobile (where the form sits below the inline CTA) the floating button
//     never overlaps the form's "Gửi yêu cầu tư vấn" submit.
// The floating button fades back in once the user has scrolled past all of
// them. Pages without a contact block (no ids present) show it immediately.
const WATCH_IDS = ["calendly-inline-cta", "contact-form-region"];

export function CalendlyButton() {
  // Start hidden so we never flash a duplicate before the observer settles.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = WATCH_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    if (targets.length === 0) {
      setVisible(true);
      return;
    }

    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      // Reveal only once every watched element has left the viewport.
      setVisible(onScreen.size === 0);
    });
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={site.calendly.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={site.calendly.label}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-3.5 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 ${
        visible
          ? "opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <CalendarClock className="h-6 w-6 shrink-0" />
      <span className="hidden sm:inline">{site.calendly.label}</span>
    </a>
  );
}
