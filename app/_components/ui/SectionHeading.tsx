export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  invert?: boolean;
}) {
  const alignClasses = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignClasses}`}>
      {eyebrow && (
        <p
          className={`text-sm font-semibold uppercase tracking-wider ${
            invert ? "text-brand-200" : "text-brand-600"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${
          invert ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base leading-7 sm:text-lg ${
            invert ? "text-brand-100" : "text-muted"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
