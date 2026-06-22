import { INITIAL_STATE, type RadioState, type RadioOption } from "../types";

export type RadioPreset = {
  id: string;
  name: string;
  summary: string;
  family: string;
  archetype: string;
  variant: string;
  size: string;
  tags: string[];
  state: RadioState;
};

type Theme = {
  id: string;
  name: string;
  canvas: string;
  border: string;
  selected: string;
  hover: string;
  label: string;
  focus: string;
  shadow: string;
};

type Archetype = {
  id: string;
  name: string;
  summary: string;
  orientation: RadioState["orientation"];
  selectedValue: string;
  animationType: RadioState["animationType"];
  outerBorderStyle: RadioState["outerBorderStyle"];
  labelPosition: RadioState["labelPosition"];
  labelFontWeight: number;
  shadowEnabled: boolean;
  labelUnderline: boolean;
  gap: number;
};

type Variant = {
  id: string;
  name: string;
  outerSizeOffset: number;
  outerBorderRadius: number;
  outerBorderWidth: number;
  dotSizeOffset: number;
  shadowBlur: number;
  transitionDuration: number;
};

type SizeProfile = {
  id: string;
  name: string;
  outerSize: number;
  labelFontSize: number;
  labelGap: number;
  focusRingWidth: number;
  shadowY: number;
  shadowSpread: number;
};

const THEMES: Theme[] = [
  { id: "slate", name: "Slate", canvas: "#f8fafc", border: "#94a3b8", selected: "#334155", hover: "#e2e8f0", label: "#0f172a", focus: "#334155", shadow: "rgba(15, 23, 42, 0.18)" },
  { id: "cobalt", name: "Cobalt", canvas: "#eff6ff", border: "#93c5fd", selected: "#2563eb", hover: "#dbeafe", label: "#1e3a8a", focus: "#2563eb", shadow: "rgba(37, 99, 235, 0.22)" },
  { id: "emerald", name: "Emerald", canvas: "#ecfdf5", border: "#86efac", selected: "#16a34a", hover: "#dcfce7", label: "#14532d", focus: "#16a34a", shadow: "rgba(22, 163, 74, 0.22)" },
  { id: "sunset", name: "Sunset", canvas: "#fff7ed", border: "#fdba74", selected: "#f97316", hover: "#ffedd5", label: "#9a3412", focus: "#f97316", shadow: "rgba(249, 115, 22, 0.22)" },
  { id: "rose", name: "Rose", canvas: "#fff1f2", border: "#fda4af", selected: "#e11d48", hover: "#ffe4e6", label: "#881337", focus: "#e11d48", shadow: "rgba(225, 29, 72, 0.22)" },
  { id: "violet", name: "Violet", canvas: "#f5f3ff", border: "#c4b5fd", selected: "#7c3aed", hover: "#ede9fe", label: "#4c1d95", focus: "#7c3aed", shadow: "rgba(124, 58, 237, 0.22)" },
  { id: "amber", name: "Amber", canvas: "#fffbeb", border: "#fcd34d", selected: "#d97706", hover: "#fef3c7", label: "#78350f", focus: "#d97706", shadow: "rgba(217, 119, 6, 0.22)" },
  { id: "mint", name: "Mint", canvas: "#ecfeff", border: "#67e8f9", selected: "#0f766e", hover: "#cffafe", label: "#134e4a", focus: "#0f766e", shadow: "rgba(15, 118, 110, 0.22)" },
  { id: "arctic", name: "Arctic", canvas: "#f8fafc", border: "#bae6fd", selected: "#0284c7", hover: "#e0f2fe", label: "#0c4a6e", focus: "#0284c7", shadow: "rgba(2, 132, 199, 0.22)" },
  { id: "cherry", name: "Cherry", canvas: "#fff1f2", border: "#fbcfe8", selected: "#be123c", hover: "#ffe4e6", label: "#4c0519", focus: "#be123c", shadow: "rgba(190, 18, 60, 0.22)" },
  { id: "indigo", name: "Indigo", canvas: "#eef2ff", border: "#c7d2fe", selected: "#4f46e5", hover: "#e0e7ff", label: "#312e81", focus: "#4f46e5", shadow: "rgba(79, 70, 229, 0.22)" },
  { id: "obsidian", name: "Obsidian", canvas: "#0f172a", border: "#334155", selected: "#38bdf8", hover: "#1e293b", label: "#e2e8f0", focus: "#38bdf8", shadow: "rgba(56, 189, 248, 0.24)" },
];

const ARCHETYPES: Archetype[] = [
  { id: "calm", name: "Calm", summary: "quiet radio group", orientation: "vertical", selectedValue: "option-1", animationType: "scale", outerBorderStyle: "solid", labelPosition: "right", labelFontWeight: 400, shadowEnabled: false, labelUnderline: false, gap: 12 },
  { id: "editorial", name: "Editorial", summary: "refined selection group", orientation: "horizontal", selectedValue: "option-2", animationType: "fade", outerBorderStyle: "double", labelPosition: "left", labelFontWeight: 500, shadowEnabled: false, labelUnderline: false, gap: 14 },
  { id: "signal", name: "Signal", summary: "status-forward selector", orientation: "vertical", selectedValue: "option-3", animationType: "scale", outerBorderStyle: "solid", labelPosition: "right", labelFontWeight: 500, shadowEnabled: true, labelUnderline: false, gap: 12 },
  { id: "glass", name: "Glass", summary: "translucent premium group", orientation: "horizontal", selectedValue: "option-1", animationType: "fade", outerBorderStyle: "solid", labelPosition: "right", labelFontWeight: 500, shadowEnabled: true, labelUnderline: false, gap: 12 },
  { id: "luxe", name: "Luxe", summary: "editorial premium radio", orientation: "vertical", selectedValue: "option-2", animationType: "scale", outerBorderStyle: "double", labelPosition: "left", labelFontWeight: 600, shadowEnabled: true, labelUnderline: false, gap: 14 },
  { id: "playful", name: "Playful", summary: "friendly expressive radio", orientation: "horizontal", selectedValue: "option-1", animationType: "scale", outerBorderStyle: "dashed", labelPosition: "right", labelFontWeight: 500, shadowEnabled: true, labelUnderline: true, gap: 12 },
  { id: "industrial", name: "Industrial", summary: "utility-heavy selector", orientation: "vertical", selectedValue: "option-3", animationType: "none", outerBorderStyle: "solid", labelPosition: "left", labelFontWeight: 600, shadowEnabled: false, labelUnderline: false, gap: 12 },
  { id: "neon", name: "Neon", summary: "high-energy glow radio", orientation: "horizontal", selectedValue: "option-2", animationType: "scale", outerBorderStyle: "solid", labelPosition: "right", labelFontWeight: 600, shadowEnabled: true, labelUnderline: false, gap: 12 },
  { id: "paper", name: "Paper", summary: "light documentation style", orientation: "vertical", selectedValue: "option-1", animationType: "fade", outerBorderStyle: "dotted", labelPosition: "left", labelFontWeight: 400, shadowEnabled: false, labelUnderline: false, gap: 14 },
  { id: "cyber", name: "Cyber", summary: "tech-forward precise selector", orientation: "horizontal", selectedValue: "option-2", animationType: "scale", outerBorderStyle: "solid", labelPosition: "right", labelFontWeight: 600, shadowEnabled: true, labelUnderline: false, gap: 12 },
  { id: "trust", name: "Trust", summary: "compliance and clarity", orientation: "vertical", selectedValue: "option-1", animationType: "none", outerBorderStyle: "solid", labelPosition: "left", labelFontWeight: 500, shadowEnabled: false, labelUnderline: false, gap: 14 },
  { id: "studio", name: "Studio", summary: "balanced production-ready radio", orientation: "horizontal", selectedValue: "option-3", animationType: "scale", outerBorderStyle: "solid", labelPosition: "right", labelFontWeight: 500, shadowEnabled: true, labelUnderline: false, gap: 12 },
];

const VARIANTS: Variant[] = [
  { id: "classic", name: "Classic", outerSizeOffset: 0, outerBorderRadius: 999, outerBorderWidth: 2, dotSizeOffset: 0, shadowBlur: 8, transitionDuration: 200 },
  { id: "soft", name: "Soft", outerSizeOffset: 1, outerBorderRadius: 999, outerBorderWidth: 1, dotSizeOffset: -1, shadowBlur: 12, transitionDuration: 220 },
  { id: "glass", name: "Glass", outerSizeOffset: 2, outerBorderRadius: 999, outerBorderWidth: 1, dotSizeOffset: 1, shadowBlur: 18, transitionDuration: 240 },
];

const SIZES: SizeProfile[] = [
  { id: "compact", name: "Compact", outerSize: 18, labelFontSize: 13, labelGap: 8, focusRingWidth: 2, shadowY: 1, shadowSpread: 0 },
  { id: "balanced", name: "Balanced", outerSize: 22, labelFontSize: 14, labelGap: 10, focusRingWidth: 3, shadowY: 2, shadowSpread: 0 },
];

function buildOptions(theme: Theme, archetype: Archetype): RadioOption[] {
  return [
    { value: "option-1", label: `${theme.name} ${archetype.name} A` },
    { value: "option-2", label: `${theme.name} ${archetype.name} B` },
    { value: "option-3", label: `${theme.name} ${archetype.name} C` },
    { value: "option-4", label: "Disabled option", disabled: true },
  ];
}

function buildPreset(
  theme: Theme,
  archetype: Archetype,
  variant: Variant,
  size: SizeProfile,
): RadioPreset {
  const label = `${archetype.name} ${theme.name}`;
  const downloadName = `radio-${theme.id}-${archetype.id}-${variant.id}-${size.id}`;
  const selectedValue = archetype.selectedValue;
  const options = buildOptions(theme, archetype);

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
      archetype.orientation,
      selectedValue,
    ],
    state: {
      ...INITIAL_STATE,
      downloadName,
      name: "radio-group",
      selectedValue,
      orientation: archetype.orientation,
      options,
      gap: size.labelGap + archetype.gap - 10,
      outerSize: size.outerSize + variant.outerSizeOffset,
      outerBorderWidth: variant.outerBorderWidth,
      outerBorderStyle: archetype.outerBorderStyle,
      outerBorderColor: theme.border,
      outerBgColor: theme.canvas,
      selectedOuterBorderColor: theme.selected,
      selectedOuterBgColor: theme.canvas,
      dotSize: 8 + variant.dotSizeOffset,
      dotColor: theme.selected,
      animationType: archetype.animationType,
      transitionDuration: variant.transitionDuration,
      transitionEasing: "ease-out",
      focusRingColor: theme.focus,
      focusRingWidth: size.focusRingWidth,
      hoverBorderColor: theme.focus,
      hoverBgColor: theme.hover,
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
      labelGap: size.labelGap,
      labelPosition: archetype.labelPosition,
      shadowEnabled: archetype.shadowEnabled || variant.id === "glass",
      shadowX: 0,
      shadowY: size.shadowY,
      shadowBlur: variant.shadowBlur,
      shadowSpread: size.shadowSpread,
      shadowOpacity: variant.id === "glass" ? 0.16 : 0.1,
      shadowColor: theme.shadow,
      ariaLabel: `${label} radio group`,
      role: "radiogroup",
    },
  };
}

export const RADIO_PRESETS: RadioPreset[] = THEMES.flatMap((theme) =>
  ARCHETYPES.flatMap((archetype) =>
    VARIANTS.flatMap((variant) =>
      SIZES.map((size) => buildPreset(theme, archetype, variant, size)),
    ),
  ),
);
