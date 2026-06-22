// ── Types ────────────────────────────────────────────────
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
export type LabelPosition = "top" | "left" | "floating" | "hidden";
export type ResizeMode = "none" | "both" | "horizontal" | "vertical";
export type AutocompleteMode = "off" | "on";
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
export type WhiteSpaceMode =
  | "normal"
  | "pre"
  | "pre-wrap"
  | "pre-line"
  | "nowrap";
export type OverflowWrapMode = "normal" | "break-word" | "anywhere";
export type TextareaVariantMode =
  | "default"
  | "comment-reply"
  | "message-composer"
  | "editorial-note"
  | "code-editor";

// ── State ────────────────────────────────────────────────
export type TextareaState = {
  // ── Basics ──
  placeholder: string;
  defaultValue: string;
  id: string;
  name: string;
  required: boolean;
  disabled: boolean;
  readOnly: boolean;
  maxLength: number;
  minLength: number;
  rows: number;
  minRows: number;
  maxRows: number;
  cols: number;
  wrap: "soft" | "hard" | "off";
  spellcheck: boolean;

  // ── Sizing (numeric) ──
  minHeight: number;
  maxHeight: number;
  paddingX: number;
  paddingY: number;
  resize: ResizeMode;

  // ── Typography (numeric) ──
  fontBucket: "system" | "google";
  fontSearch: string;
  systemFontIdx: number;
  googleFontFamily: string;
  fontSize: number;
  fontSizeUnit: "px" | "rem";
  fontWeight: FontWeight;
  fontStyle: "normal" | "italic";
  textColor: string;
  letterSpacing: number;
  letterSpacingUnit: "px" | "em";
  textAlign: TextAlign;
  textTransform: TextTransform;
  lineHeight: number;
  whiteSpace: WhiteSpaceMode;
  overflowWrap: OverflowWrapMode;
  wordBreak: "normal" | "break-all" | "keep-all" | "break-word";
  tabSize: number;

  // ── Placeholder ──
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

  // ── Focus (numeric) ──
  focusBorderColor: string;
  focusBorderWidth: number;
  focusBoxShadowSpread: number;
  focusBoxShadowColor: string;
  focusOutlineStyle: "none" | "solid" | "dashed" | "dotted";
  focusOutlineWidth: number;
  focusOutlineColor: string;
  focusOutlineOffset: number;
  focusBackgroundColor: string;

  // ── Hover ──
  hoverBorderColor: string;
  hoverBackgroundColor: string;
  hoverBorderWidth: number;

  // ── Disabled ──
  disabledOpacity: number;
  disabledCursor: "not-allowed" | "default" | "pointer";
  disabledBackgroundColor: string;
  disabledTextColor: string;
  disabledBorderColor: string;
  disabledUseCustomColors: boolean;

  // ── Shadow (numeric) ──
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

  // ── Scrollbar ──
  scrollbarWidth: "auto" | "thin" | "none";
  scrollbarColor: string;
  scrollbarTrackColor: string;

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
  successText: string;
  successColor: string;
  charCount: boolean;
  characterCountPosition: "below" | "above" | "inside" | "floating";
  variantMode: TextareaVariantMode;

  // ── Accessibility ──
  ariaLabel: string;
  ariaDescribedBy: string;
  ariaInvalid: boolean;
  ariaRequired: boolean;
  autocomplete: AutocompleteMode;
  inputMode: InputMode;
  enterKeyHint: EnterKeyHint;
  autoCapitalize: AutoCapitalizeMode;
  autoCorrect: AutoCorrectMode;
  dir: "ltr" | "rtl" | "auto";
  lang: string;
  title: string;
  tabIndex: number;
  role: string;

  // ── Download ──
  downloadName: string;
};

export type TextareaSetter = <K extends keyof TextareaState>(
  key: K,
) => (
  val:
    | TextareaState[K]
    | ((prev: TextareaState[K]) => TextareaState[K]),
) => void;

// ── Initial State ────────────────────────────────────────
export const INITIAL_STATE: TextareaState = {
  placeholder: "Type your message here...",
  defaultValue: "",
  id: "textarea",
  name: "textarea",
  required: false,
  disabled: false,
  readOnly: false,
  maxLength: 0,
  minLength: 0,
  rows: 4,
  minRows: 2,
  maxRows: 12,
  cols: 40,
  wrap: "soft",
  spellcheck: true,

  minHeight: 100,
  maxHeight: 400,
  paddingX: 14,
  paddingY: 10,
  resize: "vertical",

  fontBucket: "system",
  fontSearch: "",
  systemFontIdx: 0,
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
  lineHeight: 1.6,
  whiteSpace: "pre-wrap",
  overflowWrap: "break-word",
  wordBreak: "normal",
  tabSize: 4,

  placeholderColor: "#94a3b8",
  placeholderOpacity: 1,
  placeholderFontStyle: "normal",

  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "#cbd5e1",
  linkRadius: true,
  borderRadius: 10,
  borderRadiusTL: 10,
  borderRadiusTR: 10,
  borderRadiusBR: 10,
  borderRadiusBL: 10,

  backgroundColor: "#ffffff",
  useGradient: false,
  gradientAngle: 135,
  gradientStart: "#e2e8f0",
  gradientEnd: "#f8fafc",
  caretColor: "#3b82f6",
  selectionBg: "#3b82f6",
  selectionColor: "#ffffff",

  focusBorderColor: "#3b82f6",
  focusBorderWidth: 2,
  focusBoxShadowSpread: 3,
  focusBoxShadowColor: "rgba(59, 130, 246, 0.15)",
  focusOutlineStyle: "none",
  focusOutlineWidth: 2,
  focusOutlineColor: "#3b82f6",
  focusOutlineOffset: 2,
  focusBackgroundColor: "#ffffff",

  hoverBorderColor: "#94a3b8",
  hoverBackgroundColor: "#ffffff",
  hoverBorderWidth: 1,

  disabledOpacity: 0.5,
  disabledCursor: "not-allowed",
  disabledBackgroundColor: "#f1f5f9",
  disabledTextColor: "#94a3b8",
  disabledBorderColor: "#e2e8f0",
  disabledUseCustomColors: false,

  shadowEnabled: false,
  shadowX: 0,
  shadowY: 1,
  shadowBlur: 3,
  shadowSpread: 0,
  shadowColor: "#000000",
  shadowOpacity: 0.1,

  transitionDuration: 200,
  transitionEasing: "ease",
  transitionProperty: "border-color, box-shadow, background-color",

  scrollbarWidth: "thin",
  scrollbarColor: "#94a3b8",
  scrollbarTrackColor: "transparent",

  labelText: "Message",
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
  successText: "",
  successColor: "#10b981",
  charCount: false,
  characterCountPosition: "below",
  variantMode: "default",

  ariaLabel: "",
  ariaDescribedBy: "",
  ariaInvalid: false,
  ariaRequired: false,
  autocomplete: "off",
  inputMode: "text",
  enterKeyHint: "enter",
  autoCapitalize: "sentences",
  autoCorrect: "off",
  dir: "auto",
  lang: "",
  title: "",
  tabIndex: 0,
  role: "",

  downloadName: "textarea",
};
