import { INITIAL_STATE, type TextareaState } from "../types";

export type TextareaPreset = {
  id: string;
  name: string;
  summary: string;
  family: string;
  archetype: string;
  variant: string;
  size: string;
  tags: string[];
  state: TextareaState;
};

type Theme = {
  id: string;
  name: string;
  canvas: string;
  surface: string;
  border: string;
  hover: string;
  focus: string;
  text: string;
  muted: string;
  shadow: string;
};

type Archetype = {
  id: string;
  name: string;
  summary: string;
  labelPosition: TextareaState["labelPosition"];
  rows: number;
  cols: number;
  wrap: TextareaState["wrap"];
  spellcheck: boolean;
  required: boolean;
  readOnly: boolean;
  disabled: boolean;
  ariaInvalid: boolean;
  helperText: string;
  errorText: string;
  whiteSpace: TextareaState["whiteSpace"];
  overflowWrap: TextareaState["overflowWrap"];
  wordBreak: TextareaState["wordBreak"];
  resize: TextareaState["resize"];
  charCount: boolean;
};

type Variant = {
  id: string;
  name: string;
  borderStyle: TextareaState["borderStyle"];
  boxShadowSpread: number;
  borderWidth: number;
  borderRadius: number;
  useGradient: boolean;
  fontStyle: TextareaState["fontStyle"];
  textTransform: TextareaState["textTransform"];
};

type SizeProfile = {
  id: string;
  name: string;
  minHeight: number;
  maxHeight: number;
  paddingX: number;
  paddingY: number;
  labelFontSize: number;
  fontSize: number;
  labelGap: number;
  focusOutlineOffset: number;
};

const THEMES: Theme[] = [
  { id: "slate", name: "Slate", canvas: "#f8fafc", surface: "#ffffff", border: "#cbd5e1", hover: "#f1f5f9", focus: "#334155", text: "#0f172a", muted: "#64748b", shadow: "rgba(15, 23, 42, 0.12)" },
  { id: "cobalt", name: "Cobalt", canvas: "#eff6ff", surface: "#ffffff", border: "#bfdbfe", hover: "#dbeafe", focus: "#2563eb", text: "#1e3a8a", muted: "#64748b", shadow: "rgba(37, 99, 235, 0.14)" },
  { id: "emerald", name: "Emerald", canvas: "#ecfdf5", surface: "#ffffff", border: "#bbf7d0", hover: "#dcfce7", focus: "#16a34a", text: "#14532d", muted: "#6b7280", shadow: "rgba(22, 163, 74, 0.14)" },
  { id: "sunset", name: "Sunset", canvas: "#fff7ed", surface: "#ffffff", border: "#fed7aa", hover: "#ffedd5", focus: "#f97316", text: "#9a3412", muted: "#78716c", shadow: "rgba(249, 115, 22, 0.14)" },
  { id: "rose", name: "Rose", canvas: "#fff1f2", surface: "#ffffff", border: "#fda4af", hover: "#ffe4e6", focus: "#e11d48", text: "#881337", muted: "#78716c", shadow: "rgba(225, 29, 72, 0.14)" },
  { id: "violet", name: "Violet", canvas: "#f5f3ff", surface: "#ffffff", border: "#c4b5fd", hover: "#ede9fe", focus: "#7c3aed", text: "#4c1d95", muted: "#6b7280", shadow: "rgba(124, 58, 237, 0.14)" },
  { id: "amber", name: "Amber", canvas: "#fffbeb", surface: "#ffffff", border: "#fcd34d", hover: "#fef3c7", focus: "#d97706", text: "#78350f", muted: "#78716c", shadow: "rgba(217, 119, 6, 0.14)" },
  { id: "mint", name: "Mint", canvas: "#ecfeff", surface: "#ffffff", border: "#67e8f9", hover: "#cffafe", focus: "#0f766e", text: "#134e4a", muted: "#6b7280", shadow: "rgba(15, 118, 110, 0.14)" },
  { id: "arctic", name: "Arctic", canvas: "#f8fafc", surface: "#ffffff", border: "#bae6fd", hover: "#e0f2fe", focus: "#0284c7", text: "#0c4a6e", muted: "#64748b", shadow: "rgba(2, 132, 199, 0.14)" },
  { id: "cherry", name: "Cherry", canvas: "#fff1f2", surface: "#ffffff", border: "#fbcfe8", hover: "#ffe4e6", focus: "#be123c", text: "#4c0519", muted: "#78716c", shadow: "rgba(190, 18, 60, 0.14)" },
  { id: "indigo", name: "Indigo", canvas: "#eef2ff", surface: "#ffffff", border: "#c7d2fe", hover: "#e0e7ff", focus: "#4f46e5", text: "#312e81", muted: "#64748b", shadow: "rgba(79, 70, 229, 0.14)" },
  { id: "obsidian", name: "Obsidian", canvas: "#020617", surface: "#0f172a", border: "#334155", hover: "#1e293b", focus: "#38bdf8", text: "#e2e8f0", muted: "#94a3b8", shadow: "rgba(56, 189, 248, 0.18)" },
];

const ARCHETYPES: Archetype[] = [
  { id: "composer", name: "Composer", summary: "top-level writing field", labelPosition: "top", rows: 4, cols: 40, wrap: "soft", spellcheck: true, required: false, readOnly: false, disabled: false, ariaInvalid: false, helperText: "Draft the initial message.", errorText: "", whiteSpace: "pre-wrap", overflowWrap: "break-word", wordBreak: "normal", resize: "vertical", charCount: true },
  { id: "floating-note", name: "Floating Note", summary: "floating label note field", labelPosition: "floating", rows: 5, cols: 42, wrap: "soft", spellcheck: true, required: false, readOnly: false, disabled: false, ariaInvalid: false, helperText: "Useful for short notes and snippets.", errorText: "", whiteSpace: "pre-wrap", overflowWrap: "break-word", wordBreak: "normal", resize: "vertical", charCount: false },
  { id: "code-editor", name: "Code Editor", summary: "editorial monospace textarea", labelPosition: "top", rows: 12, cols: 60, wrap: "off", spellcheck: false, required: false, readOnly: false, disabled: false, ariaInvalid: false, helperText: "Great for code, markdown, or logs.", errorText: "", whiteSpace: "pre", overflowWrap: "normal", wordBreak: "normal", resize: "both", charCount: true },
  { id: "validation-error", name: "Validation Error", summary: "error-forward content field", labelPosition: "top", rows: 4, cols: 40, wrap: "soft", spellcheck: true, required: true, readOnly: false, disabled: false, ariaInvalid: true, helperText: "", errorText: "This field needs a longer answer.", whiteSpace: "pre-wrap", overflowWrap: "break-word", wordBreak: "break-word", resize: "vertical", charCount: true },
  { id: "read-only-memo", name: "Read Only Memo", summary: "locked reference textarea", labelPosition: "top", rows: 4, cols: 42, wrap: "soft", spellcheck: false, required: false, readOnly: true, disabled: false, ariaInvalid: false, helperText: "This textarea is locked in the current preset.", errorText: "", whiteSpace: "pre-wrap", overflowWrap: "break-word", wordBreak: "normal", resize: "none", charCount: false },
  { id: "minimal-draft", name: "Minimal Draft", summary: "compact transparent drafting", labelPosition: "hidden", rows: 3, cols: 34, wrap: "soft", spellcheck: true, required: false, readOnly: false, disabled: false, ariaInvalid: false, helperText: "A quiet drafting surface.", errorText: "", whiteSpace: "pre-wrap", overflowWrap: "anywhere", wordBreak: "break-word", resize: "horizontal", charCount: false },
  { id: "article-form", name: "Article Form", summary: "long-form editorial field", labelPosition: "left", rows: 8, cols: 56, wrap: "soft", spellcheck: true, required: false, readOnly: false, disabled: false, ariaInvalid: false, helperText: "Use this for long-form copy editing.", errorText: "", whiteSpace: "pre-wrap", overflowWrap: "break-word", wordBreak: "normal", resize: "vertical", charCount: true },
  { id: "comment-reply", name: "Comment Reply", summary: "compact reply composer", labelPosition: "top", rows: 3, cols: 48, wrap: "soft", spellcheck: true, required: false, readOnly: false, disabled: false, ariaInvalid: false, helperText: "Keep replies concise and friendly.", errorText: "", whiteSpace: "pre-wrap", overflowWrap: "break-word", wordBreak: "normal", resize: "vertical", charCount: true },
  { id: "monospace-console", name: "Monospace Console", summary: "developer-oriented textarea", labelPosition: "top", rows: 8, cols: 60, wrap: "off", spellcheck: false, required: false, readOnly: false, disabled: false, ariaInvalid: false, helperText: "Best for logs or structured output.", errorText: "", whiteSpace: "pre", overflowWrap: "normal", wordBreak: "normal", resize: "both", charCount: true },
  { id: "whisper", name: "Whisper", summary: "soft whisper textarea", labelPosition: "floating", rows: 5, cols: 38, wrap: "soft", spellcheck: true, required: false, readOnly: false, disabled: false, ariaInvalid: false, helperText: "Subtle and low-contrast.", errorText: "", whiteSpace: "pre-wrap", overflowWrap: "break-word", wordBreak: "normal", resize: "vertical", charCount: false },
  { id: "review-board", name: "Review Board", summary: "feedback-heavy textarea", labelPosition: "top", rows: 6, cols: 50, wrap: "hard", spellcheck: true, required: true, readOnly: false, disabled: false, ariaInvalid: false, helperText: "Use clear language and examples.", errorText: "", whiteSpace: "pre-wrap", overflowWrap: "break-word", wordBreak: "break-word", resize: "vertical", charCount: true },
  { id: "studio-hub", name: "Studio Hub", summary: "balanced production-ready textarea", labelPosition: "top", rows: 4, cols: 44, wrap: "soft", spellcheck: true, required: false, readOnly: false, disabled: false, ariaInvalid: false, helperText: "A polished default editing surface.", errorText: "", whiteSpace: "pre-wrap", overflowWrap: "break-word", wordBreak: "normal", resize: "vertical", charCount: true },
];

const VARIANTS: Variant[] = [
  { id: "classic", name: "Classic", borderStyle: "solid", boxShadowSpread: 3, borderWidth: 1, borderRadius: 10, useGradient: false, fontStyle: "normal", textTransform: "none" },
  { id: "glass", name: "Glass", borderStyle: "solid", boxShadowSpread: 4, borderWidth: 1, borderRadius: 14, useGradient: true, fontStyle: "normal", textTransform: "none" },
  { id: "editorial", name: "Editorial", borderStyle: "double", boxShadowSpread: 2, borderWidth: 2, borderRadius: 12, useGradient: false, fontStyle: "italic", textTransform: "none" },
];

const SIZES: SizeProfile[] = [
  { id: "compact", name: "Compact", minHeight: 90, maxHeight: 320, paddingX: 12, paddingY: 8, labelFontSize: 12, fontSize: 13, labelGap: 8, focusOutlineOffset: 2 },
  { id: "balanced", name: "Balanced", minHeight: 120, maxHeight: 420, paddingX: 14, paddingY: 10, labelFontSize: 14, fontSize: 14, labelGap: 10, focusOutlineOffset: 2 },
];

function buildPreset(theme: Theme, archetype: Archetype, variant: Variant, size: SizeProfile): TextareaPreset {
  const label = `${archetype.name} ${theme.name}`;
  const downloadName = `textarea-${theme.id}-${archetype.id}-${variant.id}-${size.id}`;
  const defaultValue = archetype.readOnly
    ? "This textarea is locked in the current preset."
    : archetype.id === "code-editor"
      ? "function buildDraft() {\n  return 'ready';\n}"
      : archetype.id === "review-board"
        ? "Share the goal, blockers, and the next step."
        : "";

  return {
    id: downloadName,
    name: label,
    summary: `${theme.name} palette with a ${variant.name.toLowerCase()} ${archetype.summary}.`,
    family: theme.name,
    archetype: archetype.name,
    variant: variant.name,
    size: size.name,
    tags: [theme.id, archetype.id, variant.id, size.id, archetype.wrap, archetype.resize],
    state: {
      ...INITIAL_STATE,
      downloadName,
      name: "textarea",
      placeholder: archetype.id === "code-editor" ? "Write code..." : archetype.id === "review-board" ? "Write feedback..." : "Type your message here...",
      defaultValue,
      required: archetype.required,
      disabled: archetype.disabled,
      readOnly: archetype.readOnly,
      maxLength: archetype.charCount ? 2400 : 0,
      minLength: archetype.required ? 12 : 0,
      rows: archetype.rows,
      cols: archetype.cols,
      wrap: archetype.wrap,
      spellcheck: archetype.spellcheck,
      minHeight: size.minHeight,
      maxHeight: size.maxHeight,
      paddingX: size.paddingX,
      paddingY: size.paddingY,
      resize: archetype.resize,
      fontBucket: "google",
      fontSearch: "",
      systemFontIdx: 0,
      googleFontFamily: archetype.id === "code-editor" || archetype.id === "monospace-console" ? "IBM Plex Mono" : archetype.id === "review-board" ? "Inter" : "Inter",
      fontSize: size.fontSize,
      fontSizeUnit: "px",
      fontWeight: 400,
      fontStyle: variant.fontStyle,
      textColor: theme.text,
      letterSpacing: 0,
      letterSpacingUnit: "px",
      textAlign: "left",
      textTransform: variant.textTransform,
      lineHeight: archetype.id === "code-editor" || archetype.id === "monospace-console" ? 1.5 : 1.6,
      whiteSpace: archetype.whiteSpace,
      overflowWrap: archetype.overflowWrap,
      wordBreak: archetype.wordBreak,
      tabSize: archetype.id === "code-editor" || archetype.id === "monospace-console" ? 2 : 4,
      placeholderColor: theme.muted,
      placeholderOpacity: 1,
      placeholderFontStyle: "italic",
      borderWidth: variant.borderWidth,
      borderStyle: variant.borderStyle,
      borderColor: theme.border,
      linkRadius: true,
      borderRadius: size.minHeight > 100 ? 12 : 10,
      borderRadiusTL: size.minHeight > 100 ? 12 : 10,
      borderRadiusTR: size.minHeight > 100 ? 12 : 10,
      borderRadiusBR: size.minHeight > 100 ? 12 : 10,
      borderRadiusBL: size.minHeight > 100 ? 12 : 10,
      backgroundColor: theme.surface,
      useGradient: variant.useGradient,
      gradientAngle: 135,
      gradientStart: theme.canvas,
      gradientEnd: theme.surface,
      caretColor: theme.focus,
      selectionBg: theme.focus,
      selectionColor: "#ffffff",
      focusBorderColor: theme.focus,
      focusBorderWidth: 2,
      focusBoxShadowSpread: variant.boxShadowSpread,
      focusBoxShadowColor: "rgba(59, 130, 246, 0.15)",
      focusOutlineStyle: "none",
      focusOutlineWidth: 2,
      focusOutlineColor: theme.focus,
      focusOutlineOffset: size.focusOutlineOffset,
      focusBackgroundColor: theme.surface,
      hoverBorderColor: theme.focus,
      hoverBackgroundColor: theme.surface,
      hoverBorderWidth: variant.borderWidth,
      disabledOpacity: archetype.disabled ? 0.62 : 0.5,
      disabledCursor: "not-allowed",
      disabledBackgroundColor: theme.canvas,
      disabledTextColor: theme.muted,
      disabledBorderColor: theme.border,
      disabledUseCustomColors: true,
      shadowEnabled: archetype.id !== "minimal-draft",
      shadowX: 0,
      shadowY: 2,
      shadowBlur: variant.boxShadowSpread * 4,
      shadowSpread: 0,
      shadowColor: theme.shadow,
      shadowOpacity: variant.id === "glass" ? 0.16 : 0.1,
      transitionDuration: variant.id === "glass" ? 220 : 180,
      transitionEasing: "ease-out",
      transitionProperty: "all",
      scrollbarWidth: archetype.id === "minimal-draft" ? "thin" : "auto",
      scrollbarColor: theme.focus,
      scrollbarTrackColor: theme.canvas,
      labelText: `${label} area`,
      labelPosition: archetype.labelPosition,
      labelColor: theme.text,
      labelFontSize: size.labelFontSize,
      labelFontWeight: 500,
      labelGap: size.labelGap,
      showRequired: archetype.required,
      requiredColor: theme.focus,
      helperText: archetype.helperText,
      helperColor: theme.muted,
      errorText: archetype.errorText,
      errorColor: theme.focus,
      charCount: archetype.charCount,
      ariaLabel: `${label} textarea`,
      ariaDescribedBy: "",
      ariaInvalid: archetype.ariaInvalid,
      autocomplete: "on",
      role: "textbox",
    },
  };
}

export const TEXTAREA_PRESETS: TextareaPreset[] = THEMES.flatMap((theme) =>
  ARCHETYPES.flatMap((archetype) =>
    VARIANTS.flatMap((variant) =>
      SIZES.map((size) => buildPreset(theme, archetype, variant, size)),
    ),
  ),
);
