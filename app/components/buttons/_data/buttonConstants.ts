"use client";

import type { SystemFontItem } from "../types";

export type IconName = string;
export type IconSource = "library" | "custom";

export const PALETTE = [
  "#111827",
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#dc2626",
  "#8b5cf6",
  "#0ea5e9",
  "#ffffff",
] as const;

export const SYSTEM_FONTS: SystemFontItem[] = [
  { label: "Arial", css: "Arial, system-ui" },
  {
    label: "Consolas",
    css: 'Consolas, "Liberation Mono", "Courier New", ui-monospace, monospace',
  },
  { label: "Courier New", css: '"Courier New", ui-monospace, monospace' },
  { label: "Georgia", css: "Georgia, ui-serif, serif" },
  { label: "Helvetica", css: "Helvetica, Arial, system-ui" },
  {
    label: "Menlo",
    css: 'Menlo, Monaco, Consolas, "Liberation Mono", ui-monospace, monospace',
  },
  {
    label: "Monaco",
    css: 'Monaco, Menlo, Consolas, "Liberation Mono", ui-monospace, monospace',
  },
  {
    label: "Roboto (system if installed)",
    css: "Roboto, system-ui, -apple-system, Arial",
  },
  { label: "Segoe UI", css: '"Segoe UI", system-ui, -apple-system, Arial' },
  {
    label: "System UI",
    css: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
  },
  {
    label: "Times New Roman",
    css: '"Times New Roman", Times, ui-serif, serif',
  },
  {
    label: "ui-monospace",
    css: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  {
    label: "ui-sans-serif",
    css: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
  },
  {
    label: "ui-serif",
    css: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  },
].sort((a, b) => a.label.localeCompare(b.label));

export const GOOGLE_FONTS = [
  "Abril Fatface",
  "Alegreya",
  "Alegreya Sans",
  "Archivo",
  "Archivo Narrow",
  "Arimo",
  "Assistant",
  "Bebas Neue",
  "Bitter",
  "Cabin",
  "Catamaran",
  "Cormorant Garamond",
  "Crimson Text",
  "DM Sans",
  "DM Serif Display",
  "Dosis",
  "EB Garamond",
  "Figtree",
  "Fira Sans",
  "IBM Plex Mono",
  "IBM Plex Sans",
  "Inconsolata",
  "Inter",
  "Josefin Sans",
  "Karla",
  "Lato",
  "Libre Baskerville",
  "Libre Franklin",
  "Lora",
  "Manrope",
  "Merriweather",
  "Montserrat",
  "Mukta",
  "Mulish",
  "Noto Sans",
  "Noto Serif",
  "Nunito",
  "Nunito Sans",
  "Open Sans",
  "Oswald",
  "Overpass",
  "Playfair Display",
  "Plus Jakarta Sans",
  "Poppins",
  "PT Sans",
  "PT Serif",
  "Quicksand",
  "Raleway",
  "Recursive",
  "Red Hat Display",
  "Roboto",
  "Roboto Condensed",
  "Roboto Mono",
  "Rubik",
  "Source Code Pro",
  "Source Sans 3",
  "Space Grotesk",
  "Space Mono",
  "Spectral",
  "Syne",
  "Titillium Web",
  "Urbanist",
  "Work Sans",
].sort((a, b) => a.localeCompare(b));

export const ICONS_SVG: Record<IconName, string> = {
  none: "",
  arrowRight: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  check: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  x: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  info: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" stroke="currentColor" stroke-width="2"/><path d="M12 10v6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 7h.01" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
  star: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.3l-5.7 3 1.1-6.3L2.8 9.7l6.3-.9L12 3l2.9 5.8 6.3.9-4.6 4.3 1.1 6.3-5.7-3Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
};
