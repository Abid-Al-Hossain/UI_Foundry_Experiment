import { INITIAL_STATE, type CheckboxState } from "../types";

export type CheckboxPreset = {
  id: string;
  name: string;
  summary: string;
  family: string;
  archetype: string;
  variant: string;
  size: string;
  tags: string[];
  state: CheckboxState;
};

type Theme = {
  id: string;
  name: string;
  canvas: string;
  border: string;
  checked: string;
  hover: string;
  label: string;
  focus: string;
  shadow: string;
};

type Archetype = {
  id: string;
  name: string;
  summary: string;
  checked: boolean;
  indeterminate: boolean;
  labelPosition: CheckboxState["labelPosition"];
  animationType: CheckboxState["animationType"];
  boxBorderStyle: CheckboxState["boxBorderStyle"];
  checkmarkStyle: CheckboxState["checkmarkStyle"];
  labelFontWeight: number;
  labelUnderline: boolean;
  shadowEnabled: boolean;
  labelGap: number;
};

type Variant = {
  id: string;
  name: string;
  boxSizeOffset: number;
  boxBorderRadius: number;
  boxBorderWidth: number;
  checkmarkSizeOffset: number;
  checkmarkStrokeWidth: number;
  shadowBlur: number;
};

type SizeProfile = {
  id: string;
  name: string;
  boxSize: number;
  labelFontSize: number;
  labelGap: number;
  focusRingWidth: number;
  focusRingOffset: number;
  shadowY: number;
  shadowSpread: number;
};

const THEMES: Theme[] = [
  { id: "slate", name: "Slate", canvas: "#f8fafc", border: "#94a3b8", checked: "#334155", hover: "#e2e8f0", label: "#0f172a", focus: "#334155", shadow: "rgba(15, 23, 42, 0.18)" },
  { id: "cobalt", name: "Cobalt", canvas: "#eff6ff", border: "#93c5fd", checked: "#2563eb", hover: "#dbeafe", label: "#1e3a8a", focus: "#2563eb", shadow: "rgba(37, 99, 235, 0.22)" },
  { id: "emerald", name: "Emerald", canvas: "#ecfdf5", border: "#86efac", checked: "#16a34a", hover: "#dcfce7", label: "#14532d", focus: "#16a34a", shadow: "rgba(22, 163, 74, 0.22)" },
  { id: "sunset", name: "Sunset", canvas: "#fff7ed", border: "#fdba74", checked: "#f97316", hover: "#ffedd5", label: "#9a3412", focus: "#f97316", shadow: "rgba(249, 115, 22, 0.22)" },
  { id: "rose", name: "Rose", canvas: "#fff1f2", border: "#fda4af", checked: "#e11d48", hover: "#ffe4e6", label: "#881337", focus: "#e11d48", shadow: "rgba(225, 29, 72, 0.22)" },
  { id: "violet", name: "Violet", canvas: "#f5f3ff", border: "#c4b5fd", checked: "#7c3aed", hover: "#ede9fe", label: "#4c1d95", focus: "#7c3aed", shadow: "rgba(124, 58, 237, 0.22)" },
  { id: "amber", name: "Amber", canvas: "#fffbeb", border: "#fcd34d", checked: "#d97706", hover: "#fef3c7", label: "#78350f", focus: "#d97706", shadow: "rgba(217, 119, 6, 0.22)" },
  { id: "mint", name: "Mint", canvas: "#ecfeff", border: "#67e8f9", checked: "#0f766e", hover: "#cffafe", label: "#134e4a", focus: "#0f766e", shadow: "rgba(15, 118, 110, 0.22)" },
  { id: "arctic", name: "Arctic", canvas: "#f8fafc", border: "#bae6fd", checked: "#0284c7", hover: "#e0f2fe", label: "#0c4a6e", focus: "#0284c7", shadow: "rgba(2, 132, 199, 0.22)" },
  { id: "cherry", name: "Cherry", canvas: "#fff1f2", border: "#fbcfe8", checked: "#be123c", hover: "#ffe4e6", label: "#4c0519", focus: "#be123c", shadow: "rgba(190, 18, 60, 0.22)" },
  { id: "indigo", name: "Indigo", canvas: "#eef2ff", border: "#c7d2fe", checked: "#4f46e5", hover: "#e0e7ff", label: "#312e81", focus: "#4f46e5", shadow: "rgba(79, 70, 229, 0.22)" },
  { id: "obsidian", name: "Obsidian", canvas: "#0f172a", border: "#334155", checked: "#38bdf8", hover: "#1e293b", label: "#e2e8f0", focus: "#38bdf8", shadow: "rgba(56, 189, 248, 0.24)" },
];

const ARCHETYPES: Archetype[] = [
  { id: "calm", name: "Calm", summary: "quiet product checkbox", checked: false, indeterminate: false, labelPosition: "right", animationType: "scale", boxBorderStyle: "solid", checkmarkStyle: "check", labelFontWeight: 400, labelUnderline: false, shadowEnabled: false, labelGap: 10 },
  { id: "editorial", name: "Editorial", summary: "refined and high-contrast", checked: true, indeterminate: false, labelPosition: "left", animationType: "fade", boxBorderStyle: "double", checkmarkStyle: "check", labelFontWeight: 500, labelUnderline: false, shadowEnabled: false, labelGap: 12 },
  { id: "signal", name: "Signal", summary: "status-forward bulk action", checked: false, indeterminate: true, labelPosition: "right", animationType: "scale", boxBorderStyle: "solid", checkmarkStyle: "dash", labelFontWeight: 500, labelUnderline: false, shadowEnabled: true, labelGap: 10 },
  { id: "glass", name: "Glass", summary: "translucent premium surface", checked: true, indeterminate: false, labelPosition: "right", animationType: "fade", boxBorderStyle: "solid", checkmarkStyle: "custom", labelFontWeight: 500, labelUnderline: false, shadowEnabled: true, labelGap: 10 },
  { id: "luxe", name: "Luxe", summary: "editorial premium checkbox", checked: true, indeterminate: false, labelPosition: "left", animationType: "scale", boxBorderStyle: "double", checkmarkStyle: "check", labelFontWeight: 600, labelUnderline: false, shadowEnabled: true, labelGap: 14 },
  { id: "playful", name: "Playful", summary: "friendly and expressive", checked: false, indeterminate: false, labelPosition: "right", animationType: "scale", boxBorderStyle: "dashed", checkmarkStyle: "cross", labelFontWeight: 500, labelUnderline: true, shadowEnabled: true, labelGap: 10 },
  { id: "industrial", name: "Industrial", summary: "utility-heavy control", checked: false, indeterminate: false, labelPosition: "left", animationType: "none", boxBorderStyle: "solid", checkmarkStyle: "dash", labelFontWeight: 600, labelUnderline: false, shadowEnabled: false, labelGap: 12 },
  { id: "neon", name: "Neon", summary: "high-energy glow checkbox", checked: true, indeterminate: false, labelPosition: "right", animationType: "scale", boxBorderStyle: "solid", checkmarkStyle: "check", labelFontWeight: 600, labelUnderline: false, shadowEnabled: true, labelGap: 10 },
  { id: "paper", name: "Paper", summary: "light documentation style", checked: false, indeterminate: false, labelPosition: "left", animationType: "fade", boxBorderStyle: "dotted", checkmarkStyle: "check", labelFontWeight: 400, labelUnderline: false, shadowEnabled: false, labelGap: 12 },
  { id: "cyber", name: "Cyber", summary: "tech-forward precise control", checked: false, indeterminate: true, labelPosition: "right", animationType: "scale", boxBorderStyle: "solid", checkmarkStyle: "custom", labelFontWeight: 600, labelUnderline: false, shadowEnabled: true, labelGap: 10 },
  { id: "trust", name: "Trust", summary: "compliance and clarity", checked: true, indeterminate: false, labelPosition: "left", animationType: "none", boxBorderStyle: "solid", checkmarkStyle: "check", labelFontWeight: 500, labelUnderline: false, shadowEnabled: false, labelGap: 12 },
  { id: "studio", name: "Studio", summary: "balanced production-ready checkbox", checked: false, indeterminate: false, labelPosition: "right", animationType: "scale", boxBorderStyle: "solid", checkmarkStyle: "check", labelFontWeight: 500, labelUnderline: false, shadowEnabled: true, labelGap: 10 },
];

const VARIANTS: Variant[] = [
  { id: "classic", name: "Classic", boxSizeOffset: 0, boxBorderRadius: 4, boxBorderWidth: 2, checkmarkSizeOffset: 0, checkmarkStrokeWidth: 2, shadowBlur: 8 },
  { id: "soft", name: "Soft", boxSizeOffset: 1, boxBorderRadius: 8, boxBorderWidth: 1, checkmarkSizeOffset: -1, checkmarkStrokeWidth: 2, shadowBlur: 12 },
  { id: "glass", name: "Glass", boxSizeOffset: 2, boxBorderRadius: 10, boxBorderWidth: 1, checkmarkSizeOffset: 1, checkmarkStrokeWidth: 2.25, shadowBlur: 18 },
];

const SIZES: SizeProfile[] = [
  { id: "compact", name: "Compact", boxSize: 18, labelFontSize: 13, labelGap: 8, focusRingWidth: 2, focusRingOffset: 2, shadowY: 1, shadowSpread: 0 },
  { id: "balanced", name: "Balanced", boxSize: 22, labelFontSize: 14, labelGap: 10, focusRingWidth: 3, focusRingOffset: 2, shadowY: 2, shadowSpread: 0 },
];

function buildCheckmarkSvg(theme: Theme) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${theme.checked}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`;
}

function buildPreset(
  theme: Theme,
  archetype: Archetype,
  variant: Variant,
  size: SizeProfile,
): CheckboxPreset {
  const label = `${archetype.name} ${theme.name}`;
  const checked = archetype.checked || variant.id === "glass";
  const indeterminate = archetype.indeterminate && variant.id !== "glass";
  const downloadName = `checkbox-${theme.id}-${archetype.id}-${variant.id}-${size.id}`;

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
      checked ? "checked" : "unchecked",
      indeterminate ? "mixed" : "binary",
    ],
    state: {
      ...INITIAL_STATE,
      downloadName,
      checked,
      indeterminate,
      disabled: archetype.id === "industrial" && variant.id === "classic" && size.id === "compact",
      value: downloadName,
      name: "checkbox",
      labelText: `${label} control`,
      labelPosition: archetype.labelPosition,
      boxSize: size.boxSize + variant.boxSizeOffset,
      boxBorderWidth: variant.boxBorderWidth,
      boxBorderStyle: archetype.boxBorderStyle,
      boxBorderColor: theme.border,
      boxBorderRadius: variant.boxBorderRadius,
      boxBgColor: theme.canvas,
      checkedBgColor: theme.checked,
      checkedBorderColor: theme.checked,
      checkmarkColor: theme.canvas,
      checkmarkStyle: variant.id === "glass" ? "custom" : archetype.checkmarkStyle,
      checkmarkSize: 14 + variant.checkmarkSizeOffset,
      checkmarkStrokeWidth: variant.checkmarkStrokeWidth,
      customCheckmarkSvg: variant.id === "glass" ? buildCheckmarkSvg(theme) : "",
      indeterminateBgColor: theme.checked,
      indeterminateBorderColor: theme.checked,
      indeterminateIndicatorColor: theme.canvas,
      animationType: archetype.animationType,
      transitionDuration: variant.id === "glass" ? 240 : 200,
      transitionEasing: "ease-out",
      focusRingColor: theme.focus,
      focusRingWidth: size.focusRingWidth,
      focusRingOffset: size.focusRingOffset,
      hoverBorderColor: theme.focus,
      hoverBgColor: theme.hover,
      hoverCheckedBgColor: theme.checked,
      disabledOpacity: 0.56,
      disabledCursor: "not-allowed",
      fontBucket: "google",
      fontSearch: "",
      systemFontIdx: 7,
      googleFontFamily: archetype.id === "luxe" ? "Playfair Display" : archetype.id === "playful" ? "Nunito" : "Inter",
      labelFontSize: size.labelFontSize,
      fontSizeUnit: "px",
      labelFontWeight: archetype.labelFontWeight,
      labelColor: theme.label,
      labelLetterSpacing: archetype.id === "cyber" ? 0.2 : 0,
      letterSpacingUnit: "px",
      labelLineHeight: 1.5,
      labelFontStyle: archetype.id === "luxe" ? "italic" : "normal",
      labelTextTransform: archetype.id === "paper" ? "uppercase" : "none",
      labelUnderline: archetype.labelUnderline,
      labelGap: size.labelGap + archetype.labelGap - 10,
      shadowEnabled: archetype.shadowEnabled || variant.id === "glass",
      shadowX: 0,
      shadowY: size.shadowY,
      shadowBlur: variant.shadowBlur,
      shadowSpread: size.shadowSpread,
      shadowOpacity: variant.id === "glass" ? 0.16 : 0.1,
      shadowColor: theme.shadow,
      ariaLabel: `${label} checkbox`,
      ariaChecked: indeterminate ? "mixed" : checked ? "true" : "false",
      role: "checkbox",
    },
  };
}

export const CHECKBOX_PRESETS: CheckboxPreset[] = THEMES.flatMap((theme) =>
  ARCHETYPES.flatMap((archetype) =>
    VARIANTS.flatMap((variant) =>
      SIZES.map((size) => buildPreset(theme, archetype, variant, size)),
    ),
  ),
);
