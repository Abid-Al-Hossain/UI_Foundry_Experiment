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
  const contentOverflowClass =
    contentOverflow === "hidden" ? "overflow-hidden" : "overflow-auto";
  const shellModeClass = "flex min-h-dvh flex-col";
  const mainModeClass = "flex-1 min-h-0";
  const gridModeClass = "h-full min-h-0 items-stretch";
  const sidebarViewportClass =
    contentOverflow === "hidden"
      ? "h-full overflow-auto"
      : "h-full overflow-auto";
  const contentViewportClass =
    contentOverflow === "hidden"
      ? "h-full overflow-hidden p-5"
      : `h-full p-5 ${contentOverflowClass}`;

  return (
    <div
      className="flex h-dvh flex-col overflow-hidden"
      style={{ background: "var(--bg)", color: "var(--text)" }}
      suppressHydrationWarning
    >
      <Header />

      <main className="flex min-h-0 flex-1 justify-center overflow-hidden">
        <div className="h-full w-full max-w-screen-2xl grid gap-5 md:grid-cols-12 px-4 py-6">
          {/* Left panel: Scrollable Sidebar */}
          <section className="md:col-span-4 lg:col-span-3 flex min-h-0 flex-col">
            <div
              className="flex-1 overflow-hidden rounded-xl border shadow-sm hover:shadow-md"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
              }}
            >
              <div className="h-full overflow-y-auto scrollbar-thin">
                <Sidebar />
              </div>
            </div>
          </section>

          {/* Right panel: Scrollable Content */}
          <section className="md:col-span-8 lg:col-span-9 flex min-h-0 flex-col">
            <div
              className="flex-1 overflow-hidden rounded-xl border shadow-sm hover:shadow-md"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
              }}
            >
              <div
                className={
                  contentOverflow === "hidden"
                    ? "h-full w-full overflow-hidden"
                    : "h-full w-full overflow-y-auto scrollbar-thin p-5"
                }
              >
                <div
                  className={
                    contentOverflow === "hidden" ? "h-full" : "fade-in"
                  }
                >
                  {children}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
