"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPONENTS } from "../registry/componentRegistry";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full" style={{ background: "transparent" }}>
      <div className="p-4">
        <h2 className="text-sm font-semibold" style={{ color: "var(--text)" }}>
          Components
        </h2>
        <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
          Organized alphabetically. Click to customize.
        </p>

        <div className="mt-4 flex flex-col gap-1">
          {COMPONENTS.map((item) => {
            const href = `/components/${item.slug}`;
            const isActive = pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={item.slug}
                href={href}
                className="group relative rounded-md px-3 py-2 text-sm transition-all duration-200"
                style={{
                  color: isActive
                    ? "var(--text)"
                    : "color-mix(in oklab, var(--text) 80%, transparent)",
                  background: isActive
                    ? "color-mix(in oklab, var(--primary) 22%, transparent)"
                    : "transparent",
                  border: isActive ? "1px solid var(--ring)" : "1px solid transparent",
                }}
              >
                <span className="inline-flex w-full items-center justify-between">
                  {item.name}
                  <span
                    className="ml-3 h-1.5 w-1.5 rounded-full transition-opacity duration-200"
                    style={{
                      background: isActive ? "var(--primary)" : "var(--muted)",
                      opacity: isActive ? 1 : 0,
                    }}
                    aria-hidden="true"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
