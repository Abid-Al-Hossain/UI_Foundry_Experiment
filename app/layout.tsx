import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import { TransitionProvider } from "../components/theme/TransitionProvider";
import PageTransition from "../components/theme/PageTransition";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "UI Foundry",
  description: "Customize UI components visually and export code.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="navy" suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col overflow-x-hidden bg-[var(--bg)] text-[var(--text)] md:h-dvh md:overflow-hidden">
        {/* Set theme ASAP before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  try {
    var validThemes = ["navy", "forest", "lavender", "sunset", "ocean", "citrus", "ink", "sand", "custom"];
    var t = localStorage.getItem("ui-foundry-theme") || "navy";
    if (!validThemes.includes(t)) t = "navy";
    document.documentElement.setAttribute("data-theme", t);
    if (t === "custom") {
      var raw = localStorage.getItem("ui-foundry-custom-theme");
      var custom = raw ? JSON.parse(raw) : null;
      var keys = ["bg", "surface", "card", "text", "muted", "border", "primary", "primaryHover", "onPrimary", "ring"];
      if (custom && typeof custom === "object") {
        keys.forEach(function (key) {
          var value = custom[key];
          if (typeof value !== "string" || !CSS.supports("color", value)) return;
          var cssKey = "--" + key.replace(/[A-Z]/g, function (match) { return "-" + match.toLowerCase(); });
          document.documentElement.style.setProperty(cssKey, value);
        });
      }
    }
  } catch (e) {}
})();
            `.trim(),
          }}
        />
        <ThemeProvider>
          <TransitionProvider>
            {/* Global Header */}
            <Header />

            <main className="flex min-h-0 flex-1 justify-center overflow-y-auto md:overflow-hidden">
              <div className="flex min-h-full w-full max-w-screen-2xl flex-col gap-4 px-4 py-4 md:h-full md:min-h-0 md:py-6">
                <details className="rounded-xl border md:hidden" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                  <summary className="cursor-pointer px-4 py-3 text-sm font-semibold">Browse components</summary>
                  <div className="max-h-[55vh] overflow-y-auto border-t" style={{ borderColor: "var(--border)" }}>
                    <Sidebar />
                  </div>
                </details>
                <div className="grid min-h-0 flex-1 gap-5 md:grid-cols-12">
                {/* Left Panel: Persistent Sidebar */}
                <section className="hidden min-h-0 flex-col md:col-span-4 md:flex lg:col-span-3">
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

                {/* Right Panel: Animated Content */}
                <section className="md:col-span-8 lg:col-span-9 flex min-h-0 min-w-0 flex-col">
                  <div
                    className="flex-1 min-w-0 overflow-hidden rounded-xl border shadow-sm hover:shadow-md relative" // Relative for absolute positioning of transitions
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--surface)",
                    }}
                  >
                    <PageTransition>{children}</PageTransition>
                  </div>
                </section>
                </div>
              </div>
            </main>

            <Footer />
          </TransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
