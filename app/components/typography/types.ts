// Typography System Builder - Type Definitions

export type ScaleRatio =
  | "minor-second" // 1.067
  | "major-second" // 1.125
  | "minor-third" // 1.200
  | "major-third" // 1.250
  | "perfect-fourth" // 1.333
  | "augmented-fourth" // 1.414
  | "perfect-fifth" // 1.500
  | "golden-ratio" // 1.618
  | "custom";

export const SCALE_RATIO_VALUES: Record<ScaleRatio, number> = {
  "minor-second": 1.067,
  "major-second": 1.125,
  "minor-third": 1.2,
  "major-third": 1.25,
  "perfect-fourth": 1.333,
  "augmented-fourth": 1.414,
  "perfect-fifth": 1.5,
  "golden-ratio": 1.618,
  custom: 1.25,
};

export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type FontStyle = "normal" | "italic" | "oblique";
export type TextAlign = "left" | "center" | "right" | "justify";
export type TextTransform = "none" | "uppercase" | "lowercase" | "capitalize";
export type TextDecoration = "none" | "underline" | "overline" | "line-through";
export type SystemFontItem = {
  label: string;
  css: string;
};
export type TextDecorationStyle =
  | "solid"
  | "double"
  | "dotted"
  | "dashed"
  | "wavy";
export type TextOverflow = "clip" | "ellipsis";
export type WhiteSpace = "normal" | "nowrap" | "pre" | "pre-wrap" | "pre-line";
export type Direction = "ltr" | "rtl";

export interface HeadingConfig {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  fontSize: number;
  fontSizeUnit: "px" | "rem";
  fontWeight: FontWeight;
  lineHeight: number;
  letterSpacing: number;
  letterSpacingUnit: "px" | "em";
  textTransform: TextTransform;
  color: string;
  // Fluid typography
  fluidMin?: number;
  fluidMax?: number;
}

export interface BodyConfig {
  fontSize: number;
  fontSizeUnit: "px" | "rem";
  fontWeight: FontWeight;
  lineHeight: number;
  letterSpacing: number;
  letterSpacingUnit: "px" | "em";
  color: string;
}

export interface TypographyState {
  // Scale System
  baseSize: number;
  baseSizeUnit: "px" | "rem";
  scaleRatio: ScaleRatio;
  customRatio: number;
  fluidMode: boolean;
  minViewport: number;
  maxViewport: number;

  // Font Family
  fontBucket: "system" | "google";
  systemFontIdx: number;
  googleFontFamily: string;
  fontSearch: string;

  // Headings (H1-H6)
  headings: HeadingConfig[];

  // Body Styles
  body: BodyConfig;
  lead: BodyConfig;
  small: BodyConfig;
  caption: BodyConfig;

  // Global Defaults
  defaultFontWeight: FontWeight;
  defaultLineHeight: number;
  defaultLetterSpacing: number;
  defaultLetterSpacingUnit: "px" | "em";
  defaultWordSpacing: number;
  defaultWordSpacingUnit: "px" | "em";
  defaultTextColor: string;

  // Text Properties
  textAlign: TextAlign;
  textTransform: TextTransform;
  textDecoration: TextDecoration;
  textDecorationColor: string;
  textDecorationStyle: TextDecorationStyle;
  textDecorationThickness: number;

  // Text Shadow
  textShadowEnabled: boolean;
  textShadowX: number;
  textShadowY: number;
  textShadowBlur: number;
  textShadowColor: string;

  // Text Overflow
  textOverflow: TextOverflow;
  whiteSpace: WhiteSpace;
  direction: Direction;

  // Text Wrapping
  hyphens: "none" | "manual" | "auto";
  wordBreak: "normal" | "break-all" | "break-word" | "keep-all";
  overflowWrap: "normal" | "break-word" | "anywhere";
  textIndent: number;

  // Multi-column Layout
  columnCount: number;
  columnGap: number;
  columnRule: string;

  // Typographic Widow/Orphan Control
  orphans: number;
  widows: number;

  // OpenType Features
  fontFeatureSettings: string;

  // ARIA / A11y
  ariaLabel: string;

  // Preview Container
  previewPadding: number;
  previewRadius: number;

  // Preview Colors (user-controlled)
  previewBgColor: string;
  previewTextColor: string;

  // Export
  downloadName: string;
}

export type TypographyUpdater = <K extends keyof TypographyState>(
  key: K,
  value: TypographyState[K],
) => void;

// Default heading configurations based on modular scale
function generateDefaultHeadings(
  baseSize: number,
  ratio: number,
): HeadingConfig[] {
  const levels: (1 | 2 | 3 | 4 | 5 | 6)[] = [1, 2, 3, 4, 5, 6];
  return levels.map((level) => {
    const scale = Math.pow(ratio, 7 - level); // H1 is largest
    return {
      level,
      fontSize: Math.round(baseSize * scale * 100) / 100,
      fontSizeUnit: "rem" as const,
      fontWeight: level <= 2 ? 700 : level <= 4 ? 600 : 500,
      lineHeight: level === 1 ? 1.1 : level === 2 ? 1.2 : 1.3,
      letterSpacing: level === 1 ? -0.02 : 0,
      letterSpacingUnit: "em" as const,
      textTransform: "none" as const,
      color: "var(--text)",
    };
  });
}

const DEFAULT_RATIO = SCALE_RATIO_VALUES["major-third"];

export const DEFAULT_TYPOGRAPHY_STATE: TypographyState = {
  // Scale System
  baseSize: 1,
  baseSizeUnit: "rem",
  scaleRatio: "major-third",
  customRatio: 1.25,
  fluidMode: false,
  minViewport: 320,
  maxViewport: 1440,

  // Font Family
  fontBucket: "system",
  systemFontIdx: 0,
  googleFontFamily: "Inter",
  fontSearch: "",

  // Headings
  headings: generateDefaultHeadings(1, DEFAULT_RATIO),

  // Body Styles
  body: {
    fontSize: 1,
    fontSizeUnit: "rem",
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: 0,
    letterSpacingUnit: "em",
    color: "var(--text)",
  },
  lead: {
    fontSize: 1.25,
    fontSizeUnit: "rem",
    fontWeight: 400,
    lineHeight: 1.7,
    letterSpacing: 0,
    letterSpacingUnit: "em",
    color: "var(--text)",
  },
  small: {
    fontSize: 0.875,
    fontSizeUnit: "rem",
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: 0,
    letterSpacingUnit: "em",
    color: "var(--muted)",
  },
  caption: {
    fontSize: 0.75,
    fontSizeUnit: "rem",
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: 0.02,
    letterSpacingUnit: "em",
    color: "var(--muted)",
  },

  // Global Defaults
  defaultFontWeight: 400,
  defaultLineHeight: 1.5,
  defaultLetterSpacing: 0,
  defaultLetterSpacingUnit: "em",
  defaultWordSpacing: 0,
  defaultWordSpacingUnit: "em",
  defaultTextColor: "var(--text)",

  // Text Properties
  textAlign: "left",
  textTransform: "none",
  textDecoration: "none",
  textDecorationColor: "currentColor",
  textDecorationStyle: "solid",
  textDecorationThickness: 1,

  // Text Shadow
  textShadowEnabled: false,
  textShadowX: 1,
  textShadowY: 1,
  textShadowBlur: 2,
  textShadowColor: "rgba(0,0,0,0.3)",

  // Text Overflow
  textOverflow: "clip",
  whiteSpace: "normal",
  direction: "ltr",

  // Text Wrapping
  hyphens: "none",
  wordBreak: "normal",
  overflowWrap: "normal",
  textIndent: 0,

  // Multi-column Layout
  columnCount: 1,
  columnGap: 32,
  columnRule: "none",

  // Widow/Orphan Control
  orphans: 2,
  widows: 2,

  // OpenType Features
  fontFeatureSettings: "normal",

  // ARIA
  ariaLabel: "",

  // Preview Container
  previewPadding: 24,
  previewRadius: 12,

  // Preview Colors
  previewBgColor: "#ffffff",
  previewTextColor: "#0f172a",

  downloadName: "typography",
};

// System fonts list
export const SYSTEM_FONTS = [
  {
    label: "System UI",
    css: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
  },
  { label: "Serif", css: "Georgia, 'Times New Roman', Times, serif" },
  {
    label: "Monospace",
    css: "'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace",
  },
  {
    label: "Sans Serif",
    css: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
  { label: "Helvetica", css: "'Helvetica Neue', Helvetica, Arial, sans-serif" },
  { label: "Georgia", css: "Georgia, Cambria, 'Times New Roman', serif" },
  { label: "Courier", css: "'Courier New', Courier, monospace" },
];

// Popular Google Fonts
export const GOOGLE_FONTS = [
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Source Sans Pro",
  "Raleway",
  "Playfair Display",
  "Merriweather",
  "Nunito",
  "Ubuntu",
  "Outfit",
  "DM Sans",
  "Work Sans",
  "Fira Sans",
  "Josefin Sans",
  "PT Sans",
  "Quicksand",
  "Barlow",
];
