import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import { getComponentBySlug } from "@/components/registry/componentRegistry";

function titleFromSlug(slug?: string) {
  const safe = slug ?? "";
  if (!safe) return "Component";
  return safe
    .split("-")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug?: string }>;
}) {
  const { slug } = await params;
  const item = slug ? getComponentBySlug(slug) : undefined;

  const title = item?.name ?? titleFromSlug(slug);
  const description = item?.description ?? "This component is not in the registry yet.";
  const statusTitle = item ? "Coming soon" : "Not listed";
  const statusText = item
    ? "Customization, live preview, and export for this component are not ready yet."
    : "This component is not available in the registry right now.";

  return (
    <AppShell>
      <div className="space-y-6">
        <div
          className="rounded-2xl border p-6"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in oklab, var(--card) 70%, transparent)",
          }}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                {description}
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex w-fit items-center justify-center rounded-md border px-3 py-2 text-sm font-medium transition hover:opacity-90 active:scale-[0.98]"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--card) 60%, transparent)",
                color: "var(--text)",
              }}
            >
              Back
            </Link>
          </div>
        </div>

        <section
          className="rounded-2xl border p-6"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in oklab, var(--surface) 80%, transparent)",
          }}
        >
          <h2 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
            {statusTitle}
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            {statusText}
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/components/buttons"
              className="rounded-xl px-4 py-2 text-sm font-semibold transition"
              style={{ background: "var(--primary)", color: "white" }}
            >
              Try Action Button
            </Link>
            <Link
              href="/components/buttons/action"
              className="rounded-xl border px-4 py-2 text-sm font-semibold transition"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--card) 70%, transparent)",
                color: "var(--text)",
              }}
            >
              Open Editor
            </Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
