import { DEFAULT_TYPOGRAPHY_STATE, SYSTEM_FONTS, GOOGLE_FONTS, type TypographyState } from "../types";

export type TypographyPreset = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  family: string;
  archetype: string;
  variant: string;
  size: string;
  state: Partial<TypographyState>;
  selectedHeading?: 1 | 2 | 3 | 4 | 5 | 6;
  selectedBody?: "body" | "lead" | "small" | "caption";
};

type TypographyTheme = {
  id: string;
  name: string;
  previewBgColor: string;
  previewTextColor: string;
  defaultTextColor: string;
  mutedColor: string;
  accentColor: string;
  shadowColor: string;
};

type TypographyArchetype = {
  id: string;
  name: string;
  description: string;
  fontBucket: TypographyState["fontBucket"];
  systemFontIdx: number;
  googleFontFamily: string;
  fontSearch: string;
  scaleRatio: TypographyState["scaleRatio"];
  customRatio: number;
  fluidMode: boolean;
  defaultFontWeight: TypographyState["defaultFontWeight"];
  defaultLineHeight: number;
  defaultLetterSpacing: number;
  defaultWordSpacing: number;
  textAlign: TypographyState["textAlign"];
  textTransform: TypographyState["textTransform"];
  textDecoration: TypographyState["textDecoration"];
  textDecorationStyle: TypographyState["textDecorationStyle"];
  textDecorationThickness: number;
  textShadowEnabled: boolean;
  textShadowX: number;
  textShadowY: number;
  textShadowBlur: number;
  textShadowColor?: string;
  direction: TypographyState["direction"];
  textOverflow: TypographyState["textOverflow"];
  whiteSpace: TypographyState["whiteSpace"];
  selectedHeading: 1 | 2 | 3 | 4 | 5 | 6;
  selectedBody: "body" | "lead" | "small" | "caption";
  tags: string[];
};

type TypographySizeProfile = {
  id: string;
  name: string;
  baseSize: number;
  minViewport: number;
  maxViewport: number;
  lineHeightBoost: number;
  letterSpacingBoost: number;
  wordSpacingBoost: number;
};

const TYPOGRAPHY_THEMES: TypographyTheme[] = [
  { id: "paper", name: "Paper", previewBgColor: "#fffaf2", previewTextColor: "#18181b", defaultTextColor: "#18181b", mutedColor: "#57534e", accentColor: "#a16207", shadowColor: "rgba(0,0,0,0.08)" },
  { id: "product", name: "Product", previewBgColor: "#ffffff", previewTextColor: "#0f172a", defaultTextColor: "#0f172a", mutedColor: "#475569", accentColor: "#2563eb", shadowColor: "rgba(15,23,42,0.08)" },
  { id: "reading", name: "Reading", previewBgColor: "#f8fafc", previewTextColor: "#1f2937", defaultTextColor: "#1f2937", mutedColor: "#64748b", accentColor: "#0f766e", shadowColor: "rgba(15,23,42,0.06)" },
  { id: "compact", name: "Compact", previewBgColor: "#0f172a", previewTextColor: "#e2e8f0", defaultTextColor: "#e2e8f0", mutedColor: "#94a3b8", accentColor: "#38bdf8", shadowColor: "rgba(0,0,0,0.22)" },
  { id: "editorial", name: "Editorial", previewBgColor: "#fff7ed", previewTextColor: "#111827", defaultTextColor: "#111827", mutedColor: "#6b7280", accentColor: "#ea580c", shadowColor: "rgba(0,0,0,0.08)" },
  { id: "magazine", name: "Magazine", previewBgColor: "#111827", previewTextColor: "#f8fafc", defaultTextColor: "#f8fafc", mutedColor: "#cbd5e1", accentColor: "#f43f5e", shadowColor: "rgba(0,0,0,0.24)" },
  { id: "mono", name: "Mono", previewBgColor: "#020617", previewTextColor: "#e2e8f0", defaultTextColor: "#e2e8f0", mutedColor: "#94a3b8", accentColor: "#22d3ee", shadowColor: "rgba(0,0,0,0.3)" },
  { id: "brand", name: "Brand", previewBgColor: "#eef2ff", previewTextColor: "#1e1b4b", defaultTextColor: "#1e1b4b", mutedColor: "#4338ca", accentColor: "#8b5cf6", shadowColor: "rgba(67,56,202,0.1)" },
  { id: "playful", name: "Playful", previewBgColor: "#fff1f2", previewTextColor: "#881337", defaultTextColor: "#881337", mutedColor: "#be123c", accentColor: "#fb7185", shadowColor: "rgba(190,18,60,0.08)" },
  { id: "night", name: "Night", previewBgColor: "#0a0f1d", previewTextColor: "#f8fafc", defaultTextColor: "#f8fafc", mutedColor: "#94a3b8", accentColor: "#60a5fa", shadowColor: "rgba(0,0,0,0.26)" },
  { id: "calm", name: "Calm", previewBgColor: "#ecfeff", previewTextColor: "#0f172a", defaultTextColor: "#0f172a", mutedColor: "#334155", accentColor: "#14b8a6", shadowColor: "rgba(15,23,42,0.07)" },
  { id: "high-contrast", name: "High Contrast", previewBgColor: "#ffffff", previewTextColor: "#000000", defaultTextColor: "#000000", mutedColor: "#374151", accentColor: "#000000", shadowColor: "rgba(0,0,0,0.12)" },
];

const TYPOGRAPHY_ARCHETYPES: TypographyArchetype[] = [
  { id: "editorial-serif", name: "Editorial Serif", description: "Magazine-style scale with a serif voice.", fontBucket: "google", systemFontIdx: 0, googleFontFamily: "Playfair Display", fontSearch: "Playfair", scaleRatio: "perfect-fifth", customRatio: 1.5, fluidMode: false, defaultFontWeight: 400, defaultLineHeight: 1.6, defaultLetterSpacing: 0, defaultWordSpacing: 0, textAlign: "left", textTransform: "none", textDecoration: "none", textDecorationStyle: "solid", textDecorationThickness: 1, textShadowEnabled: false, textShadowX: 0, textShadowY: 0, textShadowBlur: 0, direction: "ltr", textOverflow: "clip", whiteSpace: "normal", selectedHeading: 1, selectedBody: "lead", tags: ["editorial", "serif", "display"] },
  { id: "product-ui", name: "Product UI", description: "Balanced system text for interfaces and dashboards.", fontBucket: "system", systemFontIdx: 0, googleFontFamily: "Inter", fontSearch: "Inter", scaleRatio: "major-third", customRatio: 1.25, fluidMode: false, defaultFontWeight: 400, defaultLineHeight: 1.5, defaultLetterSpacing: 0, defaultWordSpacing: 0, textAlign: "left", textTransform: "none", textDecoration: "none", textDecorationStyle: "solid", textDecorationThickness: 1, textShadowEnabled: false, textShadowX: 0, textShadowY: 0, textShadowBlur: 0, direction: "ltr", textOverflow: "clip", whiteSpace: "normal", selectedHeading: 2, selectedBody: "body", tags: ["product", "ui", "balanced"] },
  { id: "reading-mode", name: "Reading Mode", description: "Comfort-first text scale for long-form content.", fontBucket: "system", systemFontIdx: 1, googleFontFamily: "Merriweather", fontSearch: "read", scaleRatio: "major-third", customRatio: 1.25, fluidMode: true, defaultFontWeight: 400, defaultLineHeight: 1.75, defaultLetterSpacing: 0, defaultWordSpacing: 0.02, textAlign: "left", textTransform: "none", textDecoration: "none", textDecorationStyle: "solid", textDecorationThickness: 1, textShadowEnabled: false, textShadowX: 0, textShadowY: 0, textShadowBlur: 0, direction: "ltr", textOverflow: "clip", whiteSpace: "normal", selectedHeading: 3, selectedBody: "lead", tags: ["reading", "longform", "comfortable"] },
  { id: "compact-mono", name: "Compact Mono", description: "Dense technical stack with monospace personality.", fontBucket: "system", systemFontIdx: 2, googleFontFamily: "Fira Code", fontSearch: "mono", scaleRatio: "minor-third", customRatio: 1.2, fluidMode: false, defaultFontWeight: 400, defaultLineHeight: 1.45, defaultLetterSpacing: 0.02, defaultWordSpacing: 0, textAlign: "left", textTransform: "none", textDecoration: "none", textDecorationStyle: "solid", textDecorationThickness: 1, textShadowEnabled: false, textShadowX: 0, textShadowY: 0, textShadowBlur: 0, direction: "ltr", textOverflow: "ellipsis", whiteSpace: "nowrap", selectedHeading: 4, selectedBody: "small", tags: ["mono", "technical", "dense"] },
  { id: "bold-contrast", name: "Bold Contrast", description: "Sharper hierarchy for attention-heavy layouts.", fontBucket: "google", systemFontIdx: 0, googleFontFamily: "Inter", fontSearch: "bold", scaleRatio: "perfect-fourth", customRatio: 1.333, fluidMode: false, defaultFontWeight: 600, defaultLineHeight: 1.45, defaultLetterSpacing: 0, defaultWordSpacing: 0, textAlign: "left", textTransform: "none", textDecoration: "underline", textDecorationStyle: "solid", textDecorationThickness: 2, textShadowEnabled: true, textShadowX: 1, textShadowY: 1, textShadowBlur: 2, textShadowColor: "rgba(0,0,0,0.15)", direction: "ltr", textOverflow: "clip", whiteSpace: "normal", selectedHeading: 2, selectedBody: "body", tags: ["bold", "contrast", "attention"] },
  { id: "display-magazine", name: "Display Magazine", description: "Large expressive type with premium editorial rhythm.", fontBucket: "google", systemFontIdx: 0, googleFontFamily: "Montserrat", fontSearch: "display", scaleRatio: "golden-ratio", customRatio: 1.618, fluidMode: true, defaultFontWeight: 500, defaultLineHeight: 1.4, defaultLetterSpacing: 0.01, defaultWordSpacing: 0, textAlign: "left", textTransform: "none", textDecoration: "none", textDecorationStyle: "solid", textDecorationThickness: 1, textShadowEnabled: false, textShadowX: 0, textShadowY: 0, textShadowBlur: 0, direction: "ltr", textOverflow: "clip", whiteSpace: "normal", selectedHeading: 1, selectedBody: "lead", tags: ["display", "magazine", "premium"] },
  { id: "brand-corporate", name: "Brand Corporate", description: "Clean branded typography for product marketing.", fontBucket: "google", systemFontIdx: 0, googleFontFamily: "Poppins", fontSearch: "brand", scaleRatio: "major-third", customRatio: 1.25, fluidMode: true, defaultFontWeight: 500, defaultLineHeight: 1.5, defaultLetterSpacing: 0.01, defaultWordSpacing: 0, textAlign: "left", textTransform: "none", textDecoration: "none", textDecorationStyle: "solid", textDecorationThickness: 1, textShadowEnabled: false, textShadowX: 0, textShadowY: 0, textShadowBlur: 0, direction: "ltr", textOverflow: "clip", whiteSpace: "normal", selectedHeading: 2, selectedBody: "body", tags: ["brand", "marketing", "corporate"] },
  { id: "rtl-editorial", name: "RTL Editorial", description: "Right-to-left presentation with a polished editorial voice.", fontBucket: "system", systemFontIdx: 5, googleFontFamily: "Noto Serif", fontSearch: "rtl", scaleRatio: "major-third", customRatio: 1.25, fluidMode: false, defaultFontWeight: 400, defaultLineHeight: 1.7, defaultLetterSpacing: 0, defaultWordSpacing: 0, textAlign: "right", textTransform: "none", textDecoration: "none", textDecorationStyle: "solid", textDecorationThickness: 1, textShadowEnabled: false, textShadowX: 0, textShadowY: 0, textShadowBlur: 0, direction: "rtl", textOverflow: "clip", whiteSpace: "normal", selectedHeading: 3, selectedBody: "lead", tags: ["rtl", "editorial", "international"] },
  { id: "caps-utility", name: "Caps Utility", description: "Compact uppercase utility stack for labels and controls.", fontBucket: "google", systemFontIdx: 0, googleFontFamily: "Space Grotesk", fontSearch: "caps", scaleRatio: "major-second", customRatio: 1.125, fluidMode: false, defaultFontWeight: 600, defaultLineHeight: 1.35, defaultLetterSpacing: 0.08, defaultWordSpacing: 0, textAlign: "center", textTransform: "uppercase", textDecoration: "none", textDecorationStyle: "solid", textDecorationThickness: 1, textShadowEnabled: false, textShadowX: 0, textShadowY: 0, textShadowBlur: 0, direction: "ltr", textOverflow: "ellipsis", whiteSpace: "nowrap", selectedHeading: 5, selectedBody: "caption", tags: ["caps", "utility", "labels"] },
  { id: "note-soft", name: "Note Soft", description: "Gentle reading rhythm with soft hierarchy.", fontBucket: "system", systemFontIdx: 3, googleFontFamily: "Nunito", fontSearch: "note", scaleRatio: "major-third", customRatio: 1.25, fluidMode: true, defaultFontWeight: 400, defaultLineHeight: 1.65, defaultLetterSpacing: 0, defaultWordSpacing: 0.01, textAlign: "left", textTransform: "none", textDecoration: "none", textDecorationStyle: "solid", textDecorationThickness: 1, textShadowEnabled: false, textShadowX: 0, textShadowY: 0, textShadowBlur: 0, direction: "ltr", textOverflow: "clip", whiteSpace: "normal", selectedHeading: 4, selectedBody: "body", tags: ["soft", "note", "gentle"] },
  { id: "code-dense", name: "Code Dense", description: "Tight monospace layout for technical docs.", fontBucket: "system", systemFontIdx: 2, googleFontFamily: "Roboto Mono", fontSearch: "code", scaleRatio: "minor-third", customRatio: 1.2, fluidMode: false, defaultFontWeight: 500, defaultLineHeight: 1.4, defaultLetterSpacing: 0.03, defaultWordSpacing: 0, textAlign: "left", textTransform: "none", textDecoration: "none", textDecorationStyle: "solid", textDecorationThickness: 1, textShadowEnabled: false, textShadowX: 0, textShadowY: 0, textShadowBlur: 0, direction: "ltr", textOverflow: "ellipsis", whiteSpace: "nowrap", selectedHeading: 6, selectedBody: "small", tags: ["code", "mono", "docs"] },
  { id: "luxury-display", name: "Luxury Display", description: "Sharp high-end typography with dramatic contrast.", fontBucket: "google", systemFontIdx: 0, googleFontFamily: "Playfair Display", fontSearch: "luxury", scaleRatio: "golden-ratio", customRatio: 1.618, fluidMode: true, defaultFontWeight: 500, defaultLineHeight: 1.28, defaultLetterSpacing: 0.01, defaultWordSpacing: 0, textAlign: "left", textTransform: "none", textDecoration: "none", textDecorationStyle: "solid", textDecorationThickness: 1, textShadowEnabled: true, textShadowX: 0, textShadowY: 2, textShadowBlur: 6, textShadowColor: "rgba(0,0,0,0.18)", direction: "ltr", textOverflow: "clip", whiteSpace: "normal", selectedHeading: 1, selectedBody: "lead", tags: ["luxury", "display", "dramatic"] },
  { id: "accessible-default", name: "Accessible Default", description: "High-clarity defaults with balanced rhythm.", fontBucket: "system", systemFontIdx: 0, googleFontFamily: "Inter", fontSearch: "access", scaleRatio: "major-third", customRatio: 1.25, fluidMode: false, defaultFontWeight: 400, defaultLineHeight: 1.6, defaultLetterSpacing: 0, defaultWordSpacing: 0, textAlign: "left", textTransform: "none", textDecoration: "none", textDecorationStyle: "solid", textDecorationThickness: 1, textShadowEnabled: false, textShadowX: 0, textShadowY: 0, textShadowBlur: 0, direction: "ltr", textOverflow: "clip", whiteSpace: "normal", selectedHeading: 2, selectedBody: "body", tags: ["accessible", "default", "balanced"] },
  { id: "headline-tight", name: "Headline Tight", description: "Compressed heading system with strong rhythm.", fontBucket: "google", systemFontIdx: 0, googleFontFamily: "Barlow", fontSearch: "headline", scaleRatio: "perfect-fourth", customRatio: 1.333, fluidMode: false, defaultFontWeight: 700, defaultLineHeight: 1.12, defaultLetterSpacing: -0.01, defaultWordSpacing: 0, textAlign: "left", textTransform: "none", textDecoration: "none", textDecorationStyle: "solid", textDecorationThickness: 1, textShadowEnabled: false, textShadowX: 0, textShadowY: 0, textShadowBlur: 0, direction: "ltr", textOverflow: "clip", whiteSpace: "normal", selectedHeading: 1, selectedBody: "caption", tags: ["headline", "tight", "impact"] },
];

const TYPOGRAPHY_SIZES: TypographySizeProfile[] = [
  { id: "compact", name: "Compact", baseSize: 0.9375, minViewport: 320, maxViewport: 1280, lineHeightBoost: -0.05, letterSpacingBoost: 0.01, wordSpacingBoost: 0 },
  { id: "balanced", name: "Balanced", baseSize: 1, minViewport: 360, maxViewport: 1440, lineHeightBoost: 0, letterSpacingBoost: 0, wordSpacingBoost: 0 },
  { id: "hero", name: "Hero", baseSize: 1.125, minViewport: 360, maxViewport: 1600, lineHeightBoost: 0.05, letterSpacingBoost: -0.005, wordSpacingBoost: 0.01 },
];

function buildTypographyPreset(
  theme: TypographyTheme,
  archetype: TypographyArchetype,
  size: TypographySizeProfile,
): TypographyPreset {
  const googleFont = archetype.googleFontFamily || GOOGLE_FONTS[0] || "Inter";
  const systemFontIdx = archetype.systemFontIdx % SYSTEM_FONTS.length;
  const state: Partial<TypographyState> = {
    ...DEFAULT_TYPOGRAPHY_STATE,
    baseSize: size.baseSize,
    minViewport: size.minViewport,
    maxViewport: size.maxViewport,
    scaleRatio: archetype.scaleRatio,
    customRatio: archetype.customRatio,
    fluidMode: archetype.fluidMode,
    fontBucket: archetype.fontBucket,
    systemFontIdx,
    googleFontFamily: googleFont,
    fontSearch: archetype.fontSearch,
    defaultFontWeight: archetype.defaultFontWeight,
    defaultLineHeight: Number((archetype.defaultLineHeight + size.lineHeightBoost).toFixed(2)),
    defaultLetterSpacing: Number((archetype.defaultLetterSpacing + size.letterSpacingBoost).toFixed(3)),
    defaultWordSpacing: Number((archetype.defaultWordSpacing + size.wordSpacingBoost).toFixed(3)),
    defaultTextColor: theme.defaultTextColor,
    textAlign: archetype.textAlign,
    textTransform: archetype.textTransform,
    textDecoration: archetype.textDecoration,
    textDecorationStyle: archetype.textDecorationStyle,
    textDecorationThickness: archetype.textDecorationThickness,
    textShadowEnabled: archetype.textShadowEnabled,
    textShadowX: archetype.textShadowX,
    textShadowY: archetype.textShadowY,
    textShadowBlur: archetype.textShadowBlur,
    textShadowColor: archetype.textShadowColor ?? theme.shadowColor,
    textOverflow: archetype.textOverflow,
    whiteSpace: archetype.whiteSpace,
    direction: archetype.direction,
    previewBgColor: theme.previewBgColor,
    previewTextColor: theme.previewTextColor,
  };

  return {
    id: `${theme.id}-${archetype.id}-${size.id}`,
    name: `${theme.name} ${archetype.name} ${size.name}`,
    description: `${archetype.description} using the ${theme.name} theme.`,
    tags: [...new Set([theme.id, theme.name, archetype.id, archetype.name, size.id, size.name, ...archetype.tags])],
    family: theme.name,
    archetype: archetype.name,
    variant: archetype.name,
    size: size.name,
    state,
    selectedHeading: archetype.selectedHeading,
    selectedBody: archetype.selectedBody,
  };
}

export const TYPOGRAPHY_PRESETS: TypographyPreset[] = TYPOGRAPHY_THEMES.flatMap((theme) =>
  TYPOGRAPHY_ARCHETYPES.flatMap((archetype) =>
    TYPOGRAPHY_SIZES.map((size) => buildTypographyPreset(theme, archetype, size)),
  ),
);

export const TYPOGRAPHY_PRESET_COUNT = TYPOGRAPHY_PRESETS.length;
