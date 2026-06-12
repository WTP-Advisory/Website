"use client";

import { useEffect, useRef } from "react";

export function EventRegistrationForm({ formId }: { formId: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const formSrc = `https://helpdesk.jarvis.cx/embed/form/${formId}`;

  useEffect(() => {
    function sendHostStyle() {
      const f = iframeRef.current;
      if (!f || !f.contentWindow) return;
      const links = Array.from(
        document.querySelectorAll<HTMLLinkElement>(
          'link[rel="stylesheet"][href*="fonts.googleapis.com"]',
        ),
      ).map((l) => l.href);
      f.contentWindow.postMessage(
        {
          type: "jarvis-form-host-style",
          fontFamily: getComputedStyle(document.body).fontFamily,
          fontLinks: links,
        },
        "*",
      );
    }

    let timerId = 0;
    let appliedHeight = 0;
    function onMessage(e: MessageEvent) {
      if (!e.data) return;
      if (e.data.type === "jarvis-form-resize") {
        const incoming = e.data.height;
        clearTimeout(timerId);
        timerId = window.setTimeout(() => {
          const f = iframeRef.current;
          if (!f) return;
          const h = Math.max(Math.ceil(incoming), 480);
          // Only grow — never shrink. Prevents oscillation loop.
          if (h > appliedHeight) {
            appliedHeight = h;
            f.style.height = `${h}px`;
          }
        }, 150);
      }
      if (e.data.type === "jarvis-form-request-style") sendHostStyle();
    }

    window.addEventListener("message", onMessage);
    window.addEventListener("load", sendHostStyle);
    // The iframe may already be loaded by the time this effect runs.
    sendHostStyle();

    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("load", sendHostStyle);
      clearTimeout(timerId);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={formSrc}
      style={{ width: "100%", border: 0, minHeight: 480, resize: "none", overflow: "hidden" }}
      title="Jarvis Form"
      loading="lazy"
    />
  );
}
