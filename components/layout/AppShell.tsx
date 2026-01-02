import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function AppShell({
  children,
  contentOverflow = "auto",
}: {
  children: React.ReactNode;
  contentOverflow?: "auto" | "hidden";
}) {
  const contentOverflowClass = contentOverflow === "hidden" ? "overflow-hidden" : "overflow-auto";
  const shellModeClass = "flex min-h-dvh flex-col";
  const mainModeClass = "flex-1 min-h-0";
  const gridModeClass = "h-full min-h-0 items-stretch";
  const sidebarViewportClass = contentOverflow === "hidden" ? "h-full overflow-auto" : "h-full overflow-auto";
  const contentViewportClass = contentOverflow === "hidden" ? "h-full overflow-hidden p-5" : `h-full p-5 ${contentOverflowClass}`;

  return (
    <div className={shellModeClass} style={{ background: "var(--bg)", color: "var(--text)" }}>
      <Header />

      {/* dY"ť WIDTH FIX IS HERE */}
      <main className={`mx-auto w-full max-w-screen-2xl px-4 py-6 ${mainModeClass}`}>
        {/* Mobile: stacked. Desktop: 2 columns */}
        <div className={`grid gap-5 md:grid-cols-12 ${gridModeClass}`}>
          {/* Left panel */}
          <section className="md:col-span-4 lg:col-span-3 min-h-0">
            <div
              className="overflow-hidden rounded-xl border shadow-sm hover:shadow-md"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
              }}
            >
              <div className={sidebarViewportClass}>
                <Sidebar />
              </div>
            </div>
          </section>

          {/* Right big panel */}
          <section className="md:col-span-8 lg:col-span-9 min-h-0">
            <div
              className="overflow-hidden rounded-xl border shadow-sm hover:shadow-md"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
              }}
            >
              <div className={contentViewportClass}>
                <div className="fade-in h-full min-h-0">{children}</div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
