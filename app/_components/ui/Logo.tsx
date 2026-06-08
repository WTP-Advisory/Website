import Image from "next/image";

/**
 * WTP Advisory wordmark: official "WTP" logo image paired with an
 * "Advisory" label and the brand tagline.
 */
export function Logo({ invert = false }: { invert?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src="/wtp-logo.png"
        alt="WTP Advisory"
        width={375}
        height={166}
        priority
        className="h-8 w-auto"
      />
      <span
        className={`flex flex-col border-l pl-2.5 leading-none ${
          invert ? "border-white/25" : "border-brand-200"
        }`}
      >
        <span
          className={`text-base font-bold tracking-tight ${
            invert ? "text-white" : "text-ink"
          }`}
        >
          Advisory
        </span>
        <span
          className={`mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] ${
            invert ? "text-brand-200" : "text-muted"
          }`}
        >
          Khai phóng lãnh đạo
        </span>
      </span>
    </span>
  );
}
