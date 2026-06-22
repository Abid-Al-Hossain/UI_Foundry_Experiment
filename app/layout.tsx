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
      <body className="flex h-dvh flex-col overflow-hidden bg-[var(--bg)] text-[var(--text)]">
        {/* Set theme ASAP before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  try {
    var t = localStorage.getItem("ui-foundry-theme") || "navy";
    document.documentElement.setAttribute("data-theme", t);
  } catch (e) {}
})();
            `.trim(),
          }}
        />
        <ThemeProvider>
          <TransitionProvider>
            {/* Global Header */}
            <Header />

            <main className="flex min-h-0 flex-1 justify-center overflow-hidden">
              <div className="h-full w-full max-w-screen-2xl grid gap-5 md:grid-cols-12 px-4 py-6">
                {/* Left Panel: Persistent Sidebar */}
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
            </main>

            <Footer />
          </TransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
