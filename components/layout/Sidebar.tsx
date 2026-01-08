"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SECTION_LIST } from "../registry/componentRegistry";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full" style={{ background: "transparent" }}>
      <div className="p-4 pb-12">
        <h2
          className="mb-4 text-sm font-semibold"
          style={{ color: "var(--text)" }}
        >
          Component Registry
        </h2>

        <div className="flex flex-col gap-6">
          {SECTION_LIST.map((section) => (
            <div key={section.title}>
              <h3
                className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider"
                style={{ color: "var(--muted)" }}
              >
                {section.title}
              </h3>
              <div className="flex flex-col gap-0.5">
                {section.items.map((item) => {
                  const href = `/components/${item.slug}`;
                  const isActive =
                    pathname === href || pathname.startsWith(`${href}/`);

                  return (
                    <Link
                      key={item.slug}
                      href={href}
                      className="group relative rounded-md px-3 py-1.5 text-sm transition-all duration-200"
                      style={{
                        color: isActive
                          ? "var(--text)"
                          : "color-mix(in oklab, var(--text) 70%, transparent)",
                        background: isActive
                          ? "color-mix(in oklab, var(--primary) 15%, transparent)"
                          : "transparent",
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      <span className="flex items-center justify-between">
                        {item.name}
                        {isActive && (
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: "var(--primary)" }}
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
