// ── Basic Types ──────────────────────────────────────────
export type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "time"
  | "datetime-local"
  | "month"
  | "week"
  | "color"
  | "range";

export type LabelPosition = "top" | "left" | "floating" | "hidden";

export type BorderStyle = "solid" | "dashed" | "dotted" | "double" | "none";

export type TransitionEasing =
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "linear";

export type TextAlign = "left" | "center" | "right";

export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type TextTransform = "none" | "uppercase" | "lowercase" | "capitalize";

export type AutocompleteMode =
  | "off"
  | "on"
  | "name"
  | "email"
  | "tel"
  | "url"
  | "current-password"
  | "new-password"
  | "one-time-code";

export type InputMode =
  | "none"
  | "text"
  | "decimal"
  | "numeric"
  | "tel"
  | "search"
  | "email"
  | "url";

export type EnterKeyHint =
  | "enter"
  | "done"
  | "go"
  | "next"
  | "previous"
  | "search"
  | "send";

export type AutoCapitalizeMode =
  | "none"
  | "off"
  | "sentences"
  | "words"
  | "characters";

export type AutoCorrectMode = "on" | "off";

// ── State ────────────────────────────────────────────────
export type TextInputState = {
  // ── Basics ──
  inputType: InputType;
  placeholder: string;
  defaultValue: string;
  id: string;
  name: string;
  required: boolean;
  disabled: boolean;
  readOnly: boolean;
  maxLength: number;
  minLength: number;
  pattern: string;
  minValue: string;
  maxValue: string;
  stepValue: string;

  // ── Sizing (numeric) ──
  height: number;
  paddingX: number;
  paddingY: number;

  // ── Typography ──
  fontBucket: "system" | "google";
  fontSearch: string;
  systemFontIdx: number;
  googleFontFamily: string;
  fontSize: number;
  fontSizeUnit: "px" | "rem";
  fontWeight: number;
  fontStyle: "normal" | "italic";
  textColor: string;
  letterSpacing: number;
  letterSpacingUnit: "px" | "em";
  textAlign: TextAlign;
  textTransform: TextTransform;
  lineHeight: number;

  // ── Placeholder Styling ──
  placeholderColor: string;
  placeholderOpacity: number;
  placeholderFontStyle: "normal" | "italic";

  // ── Border (numeric) ──
  borderWidth: number;
  borderStyle: BorderStyle;
  borderColor: string;
  linkRadius: boolean;
  borderRadius: number;
  borderRadiusTL: number;
  borderRadiusTR: number;
  borderRadiusBR: number;
  borderRadiusBL: number;

  // ── Colors ──
  backgroundColor: string;
  useGradient: boolean;
  gradientAngle: number;
  gradientStart: string;
  gradientEnd: string;
  caretColor: string;
  selectionBg: string;
  selectionColor: string;

  // ── Focus State (numeric) ──
  focusBorderColor: string;
  focusBorderWidth: number;
  focusBoxShadowSpread: number;
  focusBoxShadowColor: string;
  focusOutlineStyle: "none" | "solid" | "dashed" | "dotted";
  focusOutlineWidth: number;
  focusOutlineColor: string;
  focusOutlineOffset: number;
  focusBackgroundColor: string;

  // ── Hover State ──
  hoverBorderColor: string;
  hoverBackgroundColor: string;
  hoverBorderWidth: number;

  // ── Disabled State ──
  disabledOpacity: number;
  disabledCursor: "not-allowed" | "default" | "pointer";
  disabledBackgroundColor: string;
  disabledTextColor: string;
  disabledBorderColor: string;
  disabledUseCustomColors: boolean;

  // ── Shadow ──
  shadowEnabled: boolean;
  shadowX: number;
  shadowY: number;
  shadowBlur: number;
  shadowSpread: number;
  shadowColor: string;
  shadowOpacity: number;

  // ── Transition ──
  transitionDuration: number;
  transitionEasing: TransitionEasing;
  transitionProperty: string;

  // ── Label (numeric) ──
  labelText: string;
  labelPosition: LabelPosition;
  labelColor: string;
  labelFontSize: number;
  labelFontWeight: FontWeight;
  labelGap: number;
  showRequired: boolean;
  requiredColor: string;
  helperText: string;
  helperColor: string;
  descriptionText: string;
  descriptionColor: string;
  errorText: string;
  errorColor: string;

  // ── Icon / Adornment ──
  iconEnabled: boolean;
  iconPosition: "left" | "right";
  iconSvg: string;
  iconColor: string;
  iconSize: number;
  prefixText: string;
  prefixColor: string;
  suffixText: string;
  suffixColor: string;
  successText: string;
  successColor: string;
  showClearButton: boolean;
  showPasswordToggle: boolean;

  // ── Accessibility ──
  ariaLabel: string;
  ariaDescribedBy: string;
  ariaInvalid: boolean;
  ariaRequired: boolean;
  autocomplete: AutocompleteMode;
  inputmode: InputMode;
  enterKeyHint: EnterKeyHint;
  autoCapitalize: AutoCapitalizeMode;
  autoCorrect: AutoCorrectMode;
  dir: "ltr" | "rtl" | "auto";
  lang: string;
  title: string;
  tabIndex: number;
  spellCheck: boolean;
  role: string;

  // ── Download ──
  downloadName: string;
};

export type TextInputSetterValue<K extends keyof TextInputState> =
  | TextInputState[K]
  | ((prev: TextInputState[K]) => TextInputState[K]);

export type TextInputSetter = <K extends keyof TextInputState>(
  key: K,
) => (val: TextInputSetterValue<K>) => void;

// ── Initial State ────────────────────────────────────────
export const INITIAL_STATE: TextInputState = {
  // ── Basics ──
  inputType: "text",
  placeholder: "Enter text...",
  defaultValue: "",
  id: "text-input",
  name: "text-input",
  required: false,
  disabled: false,
  readOnly: false,
  maxLength: 0,
  minLength: 0,
  pattern: "",
  minValue: "",
  maxValue: "",
  stepValue: "",

  // ── Sizing ──
  height: 44,
  paddingX: 14,
  paddingY: 10,

  // ── Typography ──
  fontBucket: "system",
  fontSearch: "",
  systemFontIdx: 7,
  googleFontFamily: "Inter",
  fontSize: 14,
  fontSizeUnit: "px",
  fontWeight: 400,
  fontStyle: "normal",
  textColor: "#1e293b",
  letterSpacing: 0,
  letterSpacingUnit: "px",
  textAlign: "left",
  textTransform: "none",
  lineHeight: 1.5,

  // ── Placeholder ──
  placeholderColor: "#94a3b8",
  placeholderOpacity: 1,
  placeholderFontStyle: "normal",

  // ── Border ──
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "#cbd5e1",
  linkRadius: true,
  borderRadius: 10,
  borderRadiusTL: 10,
  borderRadiusTR: 10,
  borderRadiusBR: 10,
  borderRadiusBL: 10,

  // ── Colors ──
  backgroundColor: "#ffffff",
  useGradient: false,
  gradientAngle: 135,
  gradientStart: "#e2e8f0",
  gradientEnd: "#f8fafc",
  caretColor: "#3b82f6",
  selectionBg: "#3b82f6",
  selectionColor: "#ffffff",

  // ── Focus ──
  focusBorderColor: "#3b82f6",
  focusBorderWidth: 2,
  focusBoxShadowSpread: 3,
  focusBoxShadowColor: "rgba(59, 130, 246, 0.15)",
  focusOutlineStyle: "none",
  focusOutlineWidth: 2,
  focusOutlineColor: "#3b82f6",
  focusOutlineOffset: 2,
  focusBackgroundColor: "#ffffff",

  // ── Hover ──
  hoverBorderColor: "#94a3b8",
  hoverBackgroundColor: "#ffffff",
  hoverBorderWidth: 1,

  // ── Disabled ──
  disabledOpacity: 0.5,
  disabledCursor: "not-allowed",
  disabledBackgroundColor: "#f1f5f9",
  disabledTextColor: "#94a3b8",
  disabledBorderColor: "#e2e8f0",
  disabledUseCustomColors: false,

  // ── Shadow ──
  shadowEnabled: false,
  shadowX: 0,
  shadowY: 1,
  shadowBlur: 3,
  shadowSpread: 0,
  shadowColor: "#000000",
  shadowOpacity: 0.1,

  // ── Transition ──
  transitionDuration: 200,
  transitionEasing: "ease",
  transitionProperty: "border-color, box-shadow, background-color",

  // ── Label ──
  labelText: "Label",
  labelPosition: "top",
  labelColor: "#334155",
  labelFontSize: 14,
  labelFontWeight: 500,
  labelGap: 6,
  showRequired: false,
  requiredColor: "#ef4444",
  helperText: "",
  helperColor: "#64748b",
  descriptionText: "",
  descriptionColor: "#94a3b8",
  errorText: "",
  errorColor: "#ef4444",

  // ── Icon ──
  iconEnabled: false,
  iconPosition: "left",
  iconSvg:
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  iconColor: "#94a3b8",
  iconSize: 16,
  prefixText: "",
  prefixColor: "#64748b",
  suffixText: "",
  suffixColor: "#64748b",
  successText: "",
  successColor: "#10b981",
  showClearButton: false,
  showPasswordToggle: false,

  // ── Accessibility ──
  ariaLabel: "",
  ariaDescribedBy: "",
  ariaInvalid: false,
  ariaRequired: false,
  autocomplete: "off",
  inputmode: "text",
  enterKeyHint: "enter",
  autoCapitalize: "sentences",
  autoCorrect: "off",
  dir: "auto",
  lang: "",
  title: "",
  tabIndex: 0,
  spellCheck: true,
  role: "",

  // ── Download ──
  downloadName: "text-input",
};
