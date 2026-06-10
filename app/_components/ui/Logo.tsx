export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline whitespace-nowrap text-2xl font-extrabold tracking-tight text-ink lg:text-[26px] ${className}`}
    >
      WTP
      <span className="px-0.5 text-brand-600">.</span>
      <span className="font-semibold text-ink-soft">Advisory</span>
    </span>
  );
}
