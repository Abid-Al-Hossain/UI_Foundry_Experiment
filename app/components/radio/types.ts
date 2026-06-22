// ── Types ──
export type TransitionEasing =
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "linear";
export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type Orientation = "vertical" | "horizontal";
export type LabelPosition = "right" | "left";

export type RadioOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

// ── State ──
export type RadioState = {
  // ── Group ──
  id: string;
  name: string;
  selectedValue: string;
  orientation: Orientation;
  gap: number;
  options: RadioOption[];

  // ── Outer Circle (numeric) ──
  outerSize: number;
  outerBorderWidth: number;
  outerBorderStyle: "solid" | "dashed" | "dotted" | "double" | "none";
  outerBorderColor: string;
  outerBgColor: string;

  // ── Selected Appearance ──
  selectedOuterBorderColor: string;
  selectedOuterBgColor: string;
  dotSize: number;
  dotColor: string;

  // ── Animation ──
  animationType: "scale" | "fade" | "none";
  transitionDuration: number;
  transitionEasing: TransitionEasing;

  // ── Focus ──
  focusRingEnabled: boolean;
  focusRingColor: string;
  focusRingWidth: number;
  focusRingOffset: number;

  // ── Hover ──
  hoverBorderColor: string;
  hoverBgColor: string;
  hoverDotColor: string;

  // ── Disabled ──
  disabledOpacity: number;
  disabledCursor: "not-allowed" | "default";
  disabledUseCustomColors: boolean;
  disabledBgColor: string;
  disabledTextColor: string;
  disabledBorderColor: string;
  disabledDotColor: string;

  // ── Label Typography ──
  fontBucket: "system" | "google";
  fontSearch: string;
  systemFontIdx: number;
  googleFontFamily: string;
  labelFontSize: number;
  fontSizeUnit: "px" | "rem";
  labelFontWeight: number;
  labelColor: string;
  labelLetterSpacing: number;
  letterSpacingUnit: "px" | "em";
  labelLineHeight: number;
  labelFontStyle: "normal" | "italic";
  labelTextTransform: "none" | "uppercase" | "lowercase" | "capitalize";
  labelUnderline: boolean;
  labelGap: number;
  labelPosition: LabelPosition;

  // ── Shadow ──
  shadowEnabled: boolean;
  shadowX: number;
  shadowY: number;
  shadowBlur: number;
  shadowSpread: number;
  shadowOpacity: number;
  shadowColor: string;

  // ── Accessibility ──
  ariaLabel: string;
  ariaDescribedBy: string;
  ariaRequired: boolean;
  tabIndex: number;
  dir: "ltr" | "rtl";
  lang: string;
  title: string;
  role: string;
  descriptionText: string;
  descriptionColor: string;
  helperText: string;
  helperColor: string;
  errorText: string;
  errorColor: string;
  errorBorderColor: string;
  errorBgColor: string;
  successText: string;
  successColor: string;

  // ── Download ──
  downloadName: string;
};

export type RadioSetter = <K extends keyof RadioState>(
  key: K,
) => (
  val: RadioState[K] | ((prev: RadioState[K]) => RadioState[K]),
) => void;

// ── Initial State ──
export const INITIAL_STATE: RadioState = {
  id: "radio-group",
  name: "radio-group",
  selectedValue: "option-1",
  orientation: "vertical",
  gap: 12,
  options: [
    { value: "option-1", label: "Option One" },
    { value: "option-2", label: "Option Two" },
    { value: "option-3", label: "Option Three" },
    { value: "option-4", label: "Disabled Option", disabled: true },
  ],

  outerSize: 20,
  outerBorderWidth: 2,
  outerBorderStyle: "solid",
  outerBorderColor: "#94a3b8",
  outerBgColor: "#ffffff",

  selectedOuterBorderColor: "#3b82f6",
  selectedOuterBgColor: "#ffffff",
  dotSize: 10,
  dotColor: "#3b82f6",

  animationType: "scale",
  transitionDuration: 200,
  transitionEasing: "ease",

  focusRingEnabled: true,
  focusRingColor: "#3b82f6",
  focusRingWidth: 3,
  focusRingOffset: 2,

  hoverBorderColor: "#3b82f6",
  hoverBgColor: "#eff6ff",
  hoverDotColor: "#60a5fa",

  disabledOpacity: 0.5,
  disabledCursor: "not-allowed",
  disabledUseCustomColors: false,
  disabledBgColor: "#e2e8f0",
  disabledTextColor: "#94a3b8",
  disabledBorderColor: "#cbd5e1",
  disabledDotColor: "#cbd5e1",

  // ── Label Typography ──
  fontBucket: "system",
  fontSearch: "",
  systemFontIdx: 7, // Segoe UI / San Francisco usually
  googleFontFamily: "Inter",
  labelFontSize: 14,
  fontSizeUnit: "px",
  labelFontWeight: 400,
  labelColor: "#1e293b",
  labelLetterSpacing: 0,
  letterSpacingUnit: "px",
  labelLineHeight: 1.5,
  labelFontStyle: "normal",
  labelTextTransform: "none",
  labelUnderline: false,
  labelGap: 10,
  labelPosition: "right",

  // ── Shadow ──
  shadowEnabled: false,
  shadowX: 0,
  shadowY: 2,
  shadowBlur: 4,
  shadowSpread: 0,
  shadowOpacity: 0.1,
  shadowColor: "#000000",

  ariaLabel: "",
  ariaDescribedBy: "",
  ariaRequired: false,
  tabIndex: 0,
  dir: "ltr",
  lang: "en",
  title: "",
  role: "",
  descriptionText: "",
  descriptionColor: "#475569",
  helperText: "",
  helperColor: "#64748b",
  errorText: "",
  errorColor: "#ef4444",
  errorBorderColor: "#ef4444",
  errorBgColor: "#fef2f2",
  successText: "",
  successColor: "#10b981",

  downloadName: "radio-group",
};
