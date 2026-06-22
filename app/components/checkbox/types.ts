// ── Types ─────────────────────────────────────────────
export type CheckmarkStyle = "check" | "cross" | "dash" | "custom";
export type LabelPosition = "right" | "left";
export type TransitionEasing =
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "linear";
export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

// ── State ─────────────────────────────────────────────
export type CheckboxState = {
  // ── Basics ──
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  id: string;
  value: string;
  name: string;
  labelText: string;
  labelPosition: LabelPosition;

  // ── Box Sizing (numeric) ──
  boxSize: number;
  boxBorderWidth: number;
  boxBorderStyle: "solid" | "dashed" | "dotted" | "double" | "none";
  boxBorderColor: string;
  boxBorderRadius: number;
  boxBgColor: string;

  // ── Checked Appearance ──
  checkedBgColor: string;
  checkedBorderColor: string;
  checkmarkColor: string;
  checkmarkStyle: CheckmarkStyle;
  checkmarkSize: number;
  checkmarkStrokeWidth: number;
  customCheckmarkSvg: string;

  // ── Indeterminate Appearance ──
  indeterminateBgColor: string;
  indeterminateBorderColor: string;
  indeterminateIndicatorColor: string;

  // ── Animation ──
  animationType: "scale" | "fade" | "none";
  transitionDuration: number;
  transitionEasing: TransitionEasing;

  // ── Focus State (numeric) ──
  focusRingEnabled: boolean;
  focusRingColor: string;
  focusRingWidth: number;
  focusRingOffset: number;

  // ── Hover State ──
  hoverBorderColor: string;
  hoverBgColor: string;
  hoverCheckedBgColor: string;
  hoverCheckedBorderColor: string;

  // ── Disabled State ──
  disabledOpacity: number;
  disabledCursor: "not-allowed" | "default";
  disabledUseCustomColors: boolean;
  disabledBgColor: string;
  disabledTextColor: string;
  disabledBorderColor: string;

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
  ariaChecked: string;
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
  ariaInvalid: boolean;
  successText: string;
  successColor: string;

  // ── Download ──
  downloadName: string;
};

export type CheckboxSetter = <K extends keyof CheckboxState>(
  key: K,
) => (val: CheckboxState[K]) => void;

// ── Initial State ─────────────────────────────────────
export const INITIAL_STATE: CheckboxState = {
  // ── Basics ──
  checked: false,
  indeterminate: false,
  disabled: false,
  id: "checkbox",
  value: "option-1",
  name: "checkbox",
  labelText: "Accept terms and conditions",
  labelPosition: "right",

  // ── Box Sizing ──
  boxSize: 20,
  boxBorderWidth: 2,
  boxBorderStyle: "solid",
  boxBorderColor: "#94a3b8",
  boxBorderRadius: 4,
  boxBgColor: "#ffffff",

  // ── Checked ──
  checkedBgColor: "#3b82f6",
  checkedBorderColor: "#3b82f6",
  checkmarkColor: "#ffffff",
  checkmarkStyle: "check",
  checkmarkSize: 14,
  checkmarkStrokeWidth: 2,
  customCheckmarkSvg: "",

  // ── Indeterminate ──
  indeterminateBgColor: "#3b82f6",
  indeterminateBorderColor: "#3b82f6",
  indeterminateIndicatorColor: "#ffffff",

  // ── Animation ──
  animationType: "scale",
  transitionDuration: 200,
  transitionEasing: "ease",

  // ── Focus ──
  focusRingEnabled: true,
  focusRingColor: "#3b82f6",
  focusRingWidth: 3,
  focusRingOffset: 2,

  // ── Hover ──
  hoverBorderColor: "#3b82f6",
  hoverBgColor: "#eff6ff",
  hoverCheckedBgColor: "#2563eb",
  hoverCheckedBorderColor: "#1d4ed8",

  // ── Disabled ──
  disabledOpacity: 0.5,
  disabledCursor: "not-allowed",
  disabledUseCustomColors: false,
  disabledBgColor: "#e2e8f0",
  disabledTextColor: "#94a3b8",
  disabledBorderColor: "#cbd5e1",

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

  // ── Shadow ──
  shadowEnabled: false,
  shadowX: 0,
  shadowY: 2,
  shadowBlur: 4,
  shadowSpread: 0,
  shadowOpacity: 0.1,
  shadowColor: "#000000",

  // ── Accessibility ──
  ariaLabel: "",
  ariaChecked: "",
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
  ariaInvalid: false,
  successText: "",
  successColor: "#10b981",

  // ── Download ──
  downloadName: "checkbox",
};
