"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-dvh flex-col" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <Header />

      <main className="mx-auto w-full max-w-screen-2xl px-4 py-6 flex-1 min-h-0">
        <div className="grid gap-5 md:grid-cols-12 h-full min-h-0 items-stretch">
          <section className="md:col-span-4 lg:col-span-3 min-h-0">
            <div
              className="overflow-hidden rounded-xl border shadow-sm hover:shadow-md"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
              }}
            >
              <div className="h-full overflow-auto">
                <Sidebar />
              </div>
            </div>
          </section>

          <section className="md:col-span-8 lg:col-span-9 min-h-0">
            <div
              className="rounded-2xl border p-6 shadow-sm"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--card) 70%, transparent)",
              }}
            >
              <h1 className="text-xl font-semibold" style={{ color: "var(--text)" }}>
                Something went wrong
              </h1>
              <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                {error?.message || "Unknown error"}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => reset()}
                  className="rounded-md px-4 py-2 text-sm font-medium transition active:scale-[0.98]"
                  style={{ background: "var(--primary)", color: "white" }}
                >
                  Try again
                </button>

                <Link
                  href="/"
                  className="rounded-md border px-4 py-2 text-sm font-medium transition active:scale-[0.98]"
                  style={{
                    borderColor: "var(--border)",
                    background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                    color: "var(--text)",
                  }}
                >
                  Go home
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p style={{ color: "var(--muted)" }}>© {new Date().getFullYear()} UI Foundry</p>
          <p style={{ color: "var(--muted)" }}>Ads + subscription coming later.</p>
        </div>
      </footer>
    </div>
  );
}
