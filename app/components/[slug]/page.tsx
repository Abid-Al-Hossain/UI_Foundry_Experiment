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
  const description =
    item?.description ??
    "This component is not in the registry yet. Customization & export will be added soon.";

  return (
    <AppShell>
      <div className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-2" style={{ color: "var(--muted)" }}>
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

        <div className="grid gap-4 lg:grid-cols-2">
          <section
            className="rounded-xl border p-4 shadow-sm transition hover:shadow-md"
            style={{ borderColor: "var(--border)", background: "var(--card)" }}
          >
            <h2 className="font-semibold">Customization</h2>
            <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
              Sliders, toggles, presets will appear here.
            </p>

            <div
              className="mt-4 rounded-lg p-4 text-sm"
              style={{
                background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--muted)",
                border: "1px dashed var(--border)",
              }}
            >
              Placeholder: customization controls
            </div>
          </section>

          <section
            className="rounded-xl border p-4 shadow-sm transition hover:shadow-md"
            style={{ borderColor: "var(--border)", background: "var(--card)" }}
          >
            <h2 className="font-semibold">Live Preview</h2>
            <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
              Preview updates instantly as users change controls.
            </p>

            <div
              className="mt-4 flex min-h-[180px] items-center justify-center rounded-lg p-4"
              style={{
                background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="rounded-md border px-4 py-2 text-sm transition hover:opacity-95"
                style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}
              >
                Preview placeholder
              </div>
            </div>
          </section>
        </div>

        <section
          className="rounded-xl border p-4 shadow-sm transition hover:shadow-md"
          style={{ borderColor: "var(--border)", background: "var(--card)" }}
        >
          <h2 className="font-semibold">Export Code</h2>
          <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
            HTML / React / Next tabs + Copy/Download will go here.
          </p>

          <div
            className="mt-4 rounded-lg p-4 text-xs"
            style={{
              background: "#050814",
              color: "var(--text)",
              border: "1px solid var(--border)",
            }}
          >
            <pre className="whitespace-pre-wrap">{`// Export placeholder
// Later: generate deterministic code from settings`}</pre>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
