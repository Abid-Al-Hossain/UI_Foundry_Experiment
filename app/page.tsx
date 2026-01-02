import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

export default function HomePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Hero */}
        <div
          className="rounded-xl border p-6 shadow-sm"
          style={{
            borderColor: "var(--border)",
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--card) 88%, transparent), var(--surface))",
          }}
        >
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Customize UI components visually. Export code instantly.
          </h1>

          <p className="mt-2 max-w-2xl" style={{ color: "var(--muted)" }}>
            Choose a component from the left panel, customize it (coming soon),
            and export production-ready code. Later you can paste the exported code
            into ChatGPT/Gemini to integrate fast.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {/* Primary button (no JS handlers; pure CSS hover) */}
            <Link
              href="/components/buttons"
              className="rounded-md px-4 py-2 text-sm font-medium transition active:scale-[0.98]"
              style={{ background: "var(--primary)", color: "var(--text)" }}
            >
              Start with Buttons
            </Link>

            {/* Secondary button */}
            <Link
              href="/components/loading-animations"
              className="rounded-md border px-4 py-2 text-sm font-medium transition active:scale-[0.98]"
              style={{
                borderColor: "var(--border)",
                background: "transparent",
                color: "var(--text)",
              }}
            >
              Explore Loaders
            </Link>
          </div>

          {/* Hover effects using a tiny inline style trick: */}
          <style>{`
            a[href="/components/buttons"]:hover { filter: brightness(1.07); }
            a[href="/components/loading-animations"]:hover { background: color-mix(in oklab, var(--card) 60%, transparent); }
          `}</style>
        </div>

        {/* Feature cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Design-first", desc: "Human-designed starting points with safe controls." },
            { title: "Parametric control", desc: "Sliders, toggles, presets — deterministic output." },
            { title: "Export-ready", desc: "HTML/CSS + React first. More formats later." },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ borderColor: "var(--border)", background: "var(--card)" }}
            >
              <h2 className="font-semibold">{c.title}</h2>
              <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Next steps */}
        <div
          className="rounded-xl border p-5 shadow-sm"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <h2 className="font-semibold">Next steps</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm" style={{ color: "var(--muted)" }}>
            <li>
              Click <b style={{ color: "var(--text)" }}>Buttons</b> in the left panel.
            </li>
            <li>You’ll land on the component page scaffold.</li>
            <li>Next we’ll implement customization + preview + export for Buttons.</li>
          </ol>
        </div>
      </div>
    </AppShell>
  );
}
