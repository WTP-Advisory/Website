import site from "../../_data/site.json";

export function Logo({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={site.logo}
      alt={site.name}
      className={`h-10 w-auto lg:h-12 ${className}`}
    />
  );
}
