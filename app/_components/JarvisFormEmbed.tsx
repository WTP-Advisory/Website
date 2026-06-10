"use client";

import { useEffect, useRef } from "react";

/**
 * Embeds a Jarvis helpdesk form via iframe and bridges host <-> iframe
 * messaging for auto-resize and font inheritance.
 */
export function JarvisFormEmbed({
  formId,
  title = "Jarvis Form",
  className,
}: {
  formId: string;
  title?: string;
  className?: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function sendHostStyle() {
      const f = iframeRef.current;
      if (!f || !f.contentWindow) return;
      const fontLinks = Array.from(
        document.querySelectorAll<HTMLLinkElement>(
          'link[rel="stylesheet"][href*="fonts.googleapis.com"]',
        ),
      ).map((l) => l.href);
      f.contentWindow.postMessage(
        {
          type: "jarvis-form-host-style",
          fontFamily: getComputedStyle(document.body).fontFamily,
          fontLinks,
        },
        "*",
      );
    }

    function onMessage(e: MessageEvent) {
      if (!e.data) return;
      if (e.data.type === "jarvis-form-resize") {
        const f = iframeRef.current;
        if (f) f.style.height = `${e.data.height}px`;
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
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={`https://helpdesk.jarvis.cx/embed/form/${formId}`}
      title={title}
      loading="lazy"
      className={className}
      style={{ width: "100%", border: 0, minHeight: 480 }}
    />
  );
}
