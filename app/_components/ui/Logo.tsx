import Image from "next/image";

type LogoVariant = "horizontal" | "vertical";

const configs: Record<LogoVariant, { src: string; width: number; height: number; className: string }> = {
  horizontal: {
    src: "/wtp-advisory-horizontal.png",
    width: 495,
    height: 56,
    className: "h-6 w-auto object-contain sm:h-9",
  },
  vertical: {
    src: "/wtp-advisory-vertical.png",
    width: 358,
    height: 160,
    className: "h-20 w-auto object-contain",
  },
};

export function Logo({
  className = "",
  variant = "horizontal",
}: {
  className?: string;
  variant?: LogoVariant;
}) {
  const cfg = configs[variant];
  return (
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src={cfg.src}
        alt="WTP Advisory"
        width={cfg.width}
        height={cfg.height}
        className={cfg.className}
      />
    </span>
  );
}
