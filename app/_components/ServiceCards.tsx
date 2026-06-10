import Link from "next/link";
import {
  Building2,
  Scale,
  Calculator,
  Receipt,
  Users,
  Plane,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  incorporation: Building2,
  legal: Scale,
  accounting: Calculator,
  tax: Receipt,
  hr: Users,
  recruitment: Users,
  immigration: Plane,
  other: Briefcase,
};

export type ServiceLink = { label: string; href: string };

export type ServiceItem = {
  title: string;
  href: string;
  image: string;
  alt?: string;
  icon?: string;
  desc?: string;
  links?: ServiceLink[];
};

export function ServiceCards({ items }: { items: ServiceItem[] }) {
  return (
    <div className="space-y-12 lg:space-y-16">
      {items.map((item) => {
        const Icon = (item.icon && ICONS[item.icon]) || Building2;
        return (
          <div
            key={item.href}
            className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr] lg:items-start lg:gap-12"
          >
            <Link
              href={item.href}
              className="group relative block overflow-hidden shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.alt ?? item.title}
                className="aspect-[4/3] rounded-none w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <span className="absolute inset-x-0 bottom-0 bg-brand-600 px-5 py-3 text-base font-semibold text-white">
                {item.title}
              </span>
            </Link>

            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-xl font-bold text-brand-600 lg:text-2xl">
                  <Link href={item.href} className="hover:underline">
                    {item.title}
                  </Link>
                </h3>
              </div>

              {item.desc && (
                <p className="mt-3 max-w-2xl text-ink-soft">{item.desc}</p>
              )}

              {item.links && item.links.length > 0 && (
                <ul className="mt-5 sm:columns-2 sm:gap-x-10">
                  {item.links.map((link) => (
                    <li key={link.href} className="mb-2.5 break-inside-avoid">
                      <Link
                        href={link.href}
                        className="flex items-start gap-2.5 text-sm text-ink-soft transition-colors hover:text-brand-600"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
