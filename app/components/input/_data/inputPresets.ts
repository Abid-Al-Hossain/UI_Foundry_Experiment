import { INITIAL_STATE, type TextInputState } from "../types";

export type TextInputPreset = {
  id: string;
  name: string;
  summary: string;
  family: string;
  archetype: string;
  variant: string;
  size: string;
  tags: string[];
  state: TextInputState;
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
  inputType: TextInputState["inputType"];
  labelPosition: TextInputState["labelPosition"];
  iconEnabled: boolean;
  iconPosition: "left" | "right";
  required: boolean;
  readOnly: boolean;
  disabled: boolean;
  ariaInvalid: boolean;
  autocomplete: TextInputState["autocomplete"];
  inputmode: TextInputState["inputmode"];
  showRequired: boolean;
  helperText: string;
  errorText: string;
  shadowEnabled: boolean;
  transitionProperty: string;
};

type Variant = {
  id: string;
  name: string;
  borderStyle: TextInputState["borderStyle"];
  labelPosition: TextInputState["labelPosition"];
  boxShadowSpread: number;
  borderWidth: number;
  borderRadius: number;
  useGradient: boolean;
  fontStyle: TextInputState["fontStyle"];
  textTransform: TextInputState["textTransform"];
};

type SizeProfile = {
  id: string;
  name: string;
  height: number;
  paddingX: number;
  paddingY: number;
  labelFontSize: number;
  fontSize: number;
  iconSize: number;
  borderRadius: number;
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
  { id: "calm", name: "Calm", summary: "quiet top-label input", inputType: "text", labelPosition: "top", iconEnabled: false, iconPosition: "left", required: true, readOnly: false, disabled: false, ariaInvalid: false, autocomplete: "name", inputmode: "text", showRequired: true, helperText: "Use the full name used on the account.", errorText: "", shadowEnabled: false, transitionProperty: "all" },
  { id: "floating-search", name: "Floating Search", summary: "floating label search input", inputType: "search", labelPosition: "floating", iconEnabled: true, iconPosition: "left", required: false, readOnly: false, disabled: false, ariaInvalid: false, autocomplete: "off", inputmode: "search", showRequired: false, helperText: "Press Enter to run the search.", errorText: "", shadowEnabled: true, transitionProperty: "all" },
  { id: "password-lock", name: "Password Lock", summary: "secure password field", inputType: "password", labelPosition: "top", iconEnabled: false, iconPosition: "left", required: true, readOnly: false, disabled: false, ariaInvalid: false, autocomplete: "current-password", inputmode: "text", showRequired: true, helperText: "Use 12+ characters with symbols.", errorText: "", shadowEnabled: true, transitionProperty: "all" },
  { id: "validation-error", name: "Validation Error", summary: "error-forward email field", inputType: "email", labelPosition: "top", iconEnabled: false, iconPosition: "left", required: true, readOnly: false, disabled: false, ariaInvalid: true, autocomplete: "email", inputmode: "email", showRequired: true, helperText: "", errorText: "Please enter a valid email address.", shadowEnabled: true, transitionProperty: "all" },
  { id: "icon-pill", name: "Icon Pill", summary: "pill-shaped username field", inputType: "text", labelPosition: "left", iconEnabled: true, iconPosition: "right", required: false, readOnly: false, disabled: false, ariaInvalid: false, autocomplete: "off", inputmode: "text", showRequired: false, helperText: "Choose a short public handle.", errorText: "", shadowEnabled: true, transitionProperty: "all" },
  { id: "readonly-note", name: "Read Only Note", summary: "locked reference field", inputType: "text", labelPosition: "top", iconEnabled: false, iconPosition: "left", required: false, readOnly: true, disabled: false, ariaInvalid: false, autocomplete: "off", inputmode: "text", showRequired: false, helperText: "This field is read-only in the current preset.", errorText: "", shadowEnabled: false, transitionProperty: "all" },
  { id: "disabled-calm", name: "Disabled Calm", summary: "locked disabled preview", inputType: "text", labelPosition: "top", iconEnabled: false, iconPosition: "left", required: false, readOnly: false, disabled: true, ariaInvalid: false, autocomplete: "off", inputmode: "text", showRequired: false, helperText: "This field is disabled in the current preset.", errorText: "", shadowEnabled: false, transitionProperty: "all" },
  { id: "text-align", name: "Text Align", summary: "presentation-aligned field", inputType: "text", labelPosition: "floating", iconEnabled: false, iconPosition: "left", required: false, readOnly: false, disabled: false, ariaInvalid: false, autocomplete: "off", inputmode: "text", showRequired: false, helperText: "Aligned text for structured data entry.", errorText: "", shadowEnabled: true, transitionProperty: "all" },
  { id: "url-hero", name: "URL Hero", summary: "hero style URL input", inputType: "url", labelPosition: "top", iconEnabled: true, iconPosition: "left", required: true, readOnly: false, disabled: false, ariaInvalid: false, autocomplete: "url", inputmode: "url", showRequired: true, helperText: "Use the canonical web address.", errorText: "", shadowEnabled: true, transitionProperty: "all" },
  { id: "tel-card", name: "Telephone Card", summary: "telephone contact input", inputType: "tel", labelPosition: "left", iconEnabled: false, iconPosition: "left", required: true, readOnly: false, disabled: false, ariaInvalid: false, autocomplete: "tel", inputmode: "tel", showRequired: true, helperText: "Include country code if available.", errorText: "", shadowEnabled: true, transitionProperty: "all" },
  { id: "number-stepper", name: "Number Stepper", summary: "numeric data field", inputType: "number", labelPosition: "top", iconEnabled: false, iconPosition: "left", required: false, readOnly: false, disabled: false, ariaInvalid: false, autocomplete: "off", inputmode: "numeric", showRequired: false, helperText: "Use numeric values only.", errorText: "", shadowEnabled: true, transitionProperty: "all" },
  { id: "studio-focus", name: "Studio Focus", summary: "balanced production field", inputType: "text", labelPosition: "floating", iconEnabled: true, iconPosition: "right", required: false, readOnly: false, disabled: false, ariaInvalid: false, autocomplete: "name", inputmode: "text", showRequired: false, helperText: "A polished default editing state.", errorText: "", shadowEnabled: true, transitionProperty: "all" },
];

const VARIANTS: Variant[] = [
  { id: "classic", name: "Classic", borderStyle: "solid", labelPosition: "top", boxShadowSpread: 3, borderWidth: 1, borderRadius: 10, useGradient: false, fontStyle: "normal", textTransform: "none" },
  { id: "glass", name: "Glass", borderStyle: "solid", labelPosition: "floating", boxShadowSpread: 4, borderWidth: 1, borderRadius: 14, useGradient: true, fontStyle: "normal", textTransform: "none" },
  { id: "editorial", name: "Editorial", borderStyle: "double", labelPosition: "left", boxShadowSpread: 2, borderWidth: 2, borderRadius: 12, useGradient: false, fontStyle: "italic", textTransform: "none" },
];

const SIZES: SizeProfile[] = [
  { id: "compact", name: "Compact", height: 40, paddingX: 12, paddingY: 8, labelFontSize: 12, fontSize: 13, iconSize: 14, borderRadius: 10, focusOutlineOffset: 2 },
  { id: "balanced", name: "Balanced", height: 46, paddingX: 14, paddingY: 10, labelFontSize: 14, fontSize: 14, iconSize: 16, borderRadius: 12, focusOutlineOffset: 2 },
];

function buildPreset(theme: Theme, archetype: Archetype, variant: Variant, size: SizeProfile): TextInputPreset {
  const label = `${archetype.name} ${theme.name}`;
  const downloadName = `input-${theme.id}-${archetype.id}-${variant.id}-${size.id}`;
  const iconSvg =
    archetype.iconEnabled
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M16 3h5v5"/><path d="M8 3H3v5"/></svg>'
      : "";

  return {
    id: downloadName,
    name: label,
    summary: `${theme.name} palette with a ${variant.name.toLowerCase()} ${archetype.summary}.`,
    family: theme.name,
    archetype: archetype.name,
    variant: variant.name,
    size: size.name,
    tags: [
      theme.id,
      archetype.id,
      variant.id,
      size.id,
      archetype.inputType,
      archetype.labelPosition,
    ],
    state: {
      ...INITIAL_STATE,
      downloadName,
      name: "text-input",
      inputType: archetype.inputType,
      placeholder: archetype.inputType === "search" ? "Search" : archetype.inputType === "email" ? "name@company.com" : archetype.inputType === "password" ? "Enter a secure password" : "Enter text...",
      defaultValue: archetype.readOnly ? "Locked reference value" : "",
      required: archetype.required,
      disabled: archetype.disabled,
      readOnly: archetype.readOnly,
      maxLength: archetype.inputType === "search" ? 80 : 0,
      minLength: archetype.required ? 4 : 0,
      pattern: archetype.inputType === "email" ? "^.+@.+\\..+$" : "",
      height: size.height,
      paddingX: size.paddingX,
      paddingY: size.paddingY,
      fontBucket: "google",
      fontSearch: "",
      systemFontIdx: 7,
      googleFontFamily: archetype.id === "password-lock" ? "Inter" : archetype.id === "studio-focus" ? "Space Grotesk" : "Inter",
      fontSize: size.fontSize,
      fontSizeUnit: "px",
      fontWeight: 400,
      fontStyle: variant.fontStyle,
      textColor: theme.text,
      letterSpacing: 0,
      letterSpacingUnit: "px",
      textAlign: archetype.id === "text-align" ? "center" : "left",
      textTransform: variant.textTransform,
      lineHeight: 1.5,
      placeholderColor: theme.muted,
      placeholderOpacity: 1,
      placeholderFontStyle: "italic",
      borderWidth: variant.borderWidth,
      borderStyle: variant.borderStyle,
      borderColor: theme.border,
      linkRadius: true,
      borderRadius: size.borderRadius,
      borderRadiusTL: size.borderRadius,
      borderRadiusTR: size.borderRadius,
      borderRadiusBR: size.borderRadius,
      borderRadiusBL: size.borderRadius,
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
      focusBoxShadowSpread: size.focusOutlineOffset + variant.boxShadowSpread,
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
      shadowEnabled: archetype.shadowEnabled || variant.id !== "classic",
      shadowX: 0,
      shadowY: 2,
      shadowBlur: variant.boxShadowSpread * 4,
      shadowSpread: 0,
      shadowColor: theme.shadow,
      shadowOpacity: variant.id === "glass" ? 0.18 : 0.1,
      transitionDuration: variant.id === "glass" ? 220 : 180,
      transitionEasing: "ease-out",
      transitionProperty: archetype.transitionProperty,
      labelText: `${label} field`,
      labelPosition: variant.labelPosition,
      labelColor: theme.text,
      labelFontSize: size.labelFontSize,
      labelFontWeight: 500,
      labelGap: 10,
      showRequired: archetype.showRequired,
      requiredColor: theme.focus,
      helperText: archetype.helperText,
      helperColor: theme.muted,
      errorText: archetype.errorText,
      errorColor: theme.focus,
      iconEnabled: archetype.iconEnabled,
      iconPosition: archetype.iconPosition,
      iconSvg,
      iconColor: theme.focus,
      iconSize: size.iconSize,
      ariaLabel: `${label} input`,
      ariaDescribedBy: "",
      ariaInvalid: archetype.ariaInvalid,
      autocomplete: archetype.autocomplete,
      inputmode: archetype.inputmode,
      role: "textbox",
    },
  };
}

export const INPUT_PRESETS: TextInputPreset[] = THEMES.flatMap((theme) =>
  ARCHETYPES.flatMap((archetype) =>
    VARIANTS.flatMap((variant) =>
      SIZES.map((size) => buildPreset(theme, archetype, variant, size)),
    ),
  ),
);
