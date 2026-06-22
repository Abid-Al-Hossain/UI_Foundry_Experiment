// ── Types ──
export type TransitionEasing =
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "linear";
export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type LabelPosition = "right" | "left";
export type ThumbIcon = "none" | "check" | "cross" | "both" | "custom";

// ── State ──
export type ToggleState = {
  // ── Basics ──
  checked: boolean;
  disabled: boolean;
  labelText: string;
  labelPosition: LabelPosition;
  id: string;
  name: string;
  value: string;

  // ── Track (numeric) ──
  trackWidth: number;
  trackHeight: number;
  trackBorderRadius: number;
  trackOffBg: string;
  trackOnBg: string;
  trackOffBorder: string;
  trackOnBorder: string;
  trackBorderWidth: number;

  // ── Thumb (numeric) ──
  thumbSize: number;
  thumbBorderRadius: number;
  thumbOffBg: string;
  thumbOnBg: string;
  thumbOffBorder: string;
  thumbOnBorder: string;
  thumbBorderWidth: number;
  thumbIcon: ThumbIcon;
  thumbIconColor: string;
  thumbIconSize: number;
  thumbScaleOnPress: number;

  // ── Animation ──
  transitionDuration: number;
  transitionEasing: TransitionEasing;

  // ── Focus ──
  focusRingEnabled: boolean;
  focusRingColor: string;
  focusRingWidth: number;
  focusRingOffset: number;

  // ── Hover ──
  hoverTrackOffBg: string;
  hoverTrackOnBg: string;
  hoverThumbScale: number;

  // ── Disabled ──
  disabledOpacity: number;
  disabledCursor: "not-allowed" | "default";
  disabledUseCustomColors: boolean;
  disabledTrackBg: string;
  disabledThumbBg: string;
  disabledTextColor: string;

  // ── Loading ──
  loadingEnabled: boolean;
  loadingAnimation: "spin" | "pulse" | "none";

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

  // ── Thumb Shadow ──
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
  errorTrackBg: string;
  errorThumbBg: string;
  successText: string;
  successColor: string;

  // ── Download ──
  downloadName: string;
};

export type ToggleKeyUpdater = <K extends keyof ToggleState>(
  key: K,
) => (
  val: ToggleState[K] | ((prev: ToggleState[K]) => ToggleState[K]),
) => void;

// ── Initial State ──
export const INITIAL_STATE: ToggleState = {
  checked: false,
  disabled: false,
  labelText: "Enable notifications",
  labelPosition: "right",
  id: "toggle-switch",
  name: "toggle",
  value: "on",

  trackWidth: 48,
  trackHeight: 26,
  trackBorderRadius: 999,
  trackOffBg: "#cbd5e1",
  trackOnBg: "#3b82f6",
  trackOffBorder: "#cbd5e1",
  trackOnBorder: "#3b82f6",
  trackBorderWidth: 0,

  thumbSize: 22,
  thumbBorderRadius: 50,
  thumbOffBg: "#ffffff",
  thumbOnBg: "#ffffff",
  thumbOffBorder: "#ffffff",
  thumbOnBorder: "#ffffff",
  thumbBorderWidth: 0,

  thumbIcon: "none",
  thumbIconColor: "#94a3b8",
  thumbIconSize: 12,
  thumbScaleOnPress: 0.9,

  transitionDuration: 200,
  transitionEasing: "ease",

  focusRingEnabled: true,
  focusRingColor: "#3b82f6",
  focusRingWidth: 3,
  focusRingOffset: 2,

  hoverTrackOffBg: "#b0bec5",
  hoverTrackOnBg: "#2563eb",
  hoverThumbScale: 1.05,

  disabledOpacity: 0.5,
  disabledCursor: "not-allowed",
  disabledUseCustomColors: false,
  disabledTrackBg: "#e2e8f0",
  disabledThumbBg: "#f8fafc",
  disabledTextColor: "#94a3b8",

  loadingEnabled: false,
  loadingAnimation: "spin",

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
  labelGap: 12,

  // ── Thumb Shadow ──
  shadowEnabled: true,
  shadowX: 0,
  shadowY: 1,
  shadowBlur: 3,
  shadowSpread: 0,
  shadowOpacity: 0.2,
  shadowColor: "#000000",

  ariaLabel: "",
  ariaDescribedBy: "",
  ariaRequired: false,
  tabIndex: 0,
  dir: "ltr",
  lang: "en",
  title: "",
  role: "switch",
  descriptionText: "",
  descriptionColor: "#475569",
  helperText: "",
  helperColor: "#64748b",
  errorText: "",
  errorColor: "#ef4444",
  errorTrackBg: "#fecaca",
  errorThumbBg: "#ffffff",
  successText: "",
  successColor: "#10b981",

  downloadName: "toggle-switch",
};
