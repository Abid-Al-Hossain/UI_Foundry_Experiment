import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/theme/ThemeProvider";

export const metadata: Metadata = {
  title: "UI Foundry",
  description: "Customize UI components visually and export code.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="navy" suppressHydrationWarning>
      <body>
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
