import { INITIAL_STATE, type ToggleState, type ThumbIcon } from "../types";

export type TogglePreset = {
  id: string;
  name: string;
  summary: string;
  family: string;
  archetype: string;
  variant: string;
  size: string;
  tags: string[];
  state: ToggleState;
};

type Theme = {
  id: string;
  name: string;
  canvas: string;
  off: string;
  on: string;
  border: string;
  label: string;
  focus: string;
  shadow: string;
};

type Archetype = {
  id: string;
  name: string;
  summary: string;
  checked: boolean;
  labelPosition: ToggleState["labelPosition"];
  thumbIcon: ThumbIcon;
  labelFontWeight: number;
  shadowEnabled: boolean;
  trackBorderWidth: number;
  thumbBorderWidth: number;
  thumbScaleOnPress: number;
  labelUnderline: boolean;
  gap: number;
};

type Variant = {
  id: string;
  name: string;
  trackWidthOffset: number;
  trackHeightOffset: number;
  thumbSizeOffset: number;
  trackBorderRadiusOffset: number;
  shadowBlur: number;
  transitionDuration: number;
};

type SizeProfile = {
  id: string;
  name: string;
  trackWidth: number;
  trackHeight: number;
  labelFontSize: number;
  labelGap: number;
  focusRingWidth: number;
  shadowY: number;
  shadowSpread: number;
};

const THEMES: Theme[] = [
  { id: "slate", name: "Slate", canvas: "#f8fafc", off: "#cbd5e1", on: "#334155", border: "#94a3b8", label: "#0f172a", focus: "#334155", shadow: "rgba(15, 23, 42, 0.18)" },
  { id: "cobalt", name: "Cobalt", canvas: "#eff6ff", off: "#bfdbfe", on: "#2563eb", border: "#93c5fd", label: "#1e3a8a", focus: "#2563eb", shadow: "rgba(37, 99, 235, 0.22)" },
  { id: "emerald", name: "Emerald", canvas: "#ecfdf5", off: "#bbf7d0", on: "#16a34a", border: "#86efac", label: "#14532d", focus: "#16a34a", shadow: "rgba(22, 163, 74, 0.22)" },
  { id: "sunset", name: "Sunset", canvas: "#fff7ed", off: "#fed7aa", on: "#f97316", border: "#fdba74", label: "#9a3412", focus: "#f97316", shadow: "rgba(249, 115, 22, 0.22)" },
  { id: "rose", name: "Rose", canvas: "#fff1f2", off: "#fda4af", on: "#e11d48", border: "#fda4af", label: "#881337", focus: "#e11d48", shadow: "rgba(225, 29, 72, 0.22)" },
  { id: "violet", name: "Violet", canvas: "#f5f3ff", off: "#c4b5fd", on: "#7c3aed", border: "#c4b5fd", label: "#4c1d95", focus: "#7c3aed", shadow: "rgba(124, 58, 237, 0.22)" },
  { id: "amber", name: "Amber", canvas: "#fffbeb", off: "#fcd34d", on: "#d97706", border: "#fcd34d", label: "#78350f", focus: "#d97706", shadow: "rgba(217, 119, 6, 0.22)" },
  { id: "mint", name: "Mint", canvas: "#ecfeff", off: "#67e8f9", on: "#0f766e", border: "#67e8f9", label: "#134e4a", focus: "#0f766e", shadow: "rgba(15, 118, 110, 0.22)" },
  { id: "arctic", name: "Arctic", canvas: "#f8fafc", off: "#bae6fd", on: "#0284c7", border: "#bae6fd", label: "#0c4a6e", focus: "#0284c7", shadow: "rgba(2, 132, 199, 0.22)" },
  { id: "cherry", name: "Cherry", canvas: "#fff1f2", off: "#fbcfe8", on: "#be123c", border: "#fbcfe8", label: "#4c0519", focus: "#be123c", shadow: "rgba(190, 18, 60, 0.22)" },
  { id: "indigo", name: "Indigo", canvas: "#eef2ff", off: "#c7d2fe", on: "#4f46e5", border: "#c7d2fe", label: "#312e81", focus: "#4f46e5", shadow: "rgba(79, 70, 229, 0.22)" },
  { id: "obsidian", name: "Obsidian", canvas: "#0f172a", off: "#334155", on: "#38bdf8", border: "#334155", label: "#e2e8f0", focus: "#38bdf8", shadow: "rgba(56, 189, 248, 0.24)" },
];

const ARCHETYPES: Archetype[] = [
  { id: "calm", name: "Calm", summary: "quiet product switch", checked: false, labelPosition: "right", thumbIcon: "none", labelFontWeight: 400, shadowEnabled: true, trackBorderWidth: 0, thumbBorderWidth: 0, thumbScaleOnPress: 0.92, labelUnderline: false, gap: 12 },
  { id: "editorial", name: "Editorial", summary: "refined premium switch", checked: true, labelPosition: "left", thumbIcon: "check", labelFontWeight: 500, shadowEnabled: true, trackBorderWidth: 1, thumbBorderWidth: 0, thumbScaleOnPress: 0.9, labelUnderline: false, gap: 14 },
  { id: "signal", name: "Signal", summary: "status-forward toggle", checked: true, labelPosition: "right", thumbIcon: "both", labelFontWeight: 500, shadowEnabled: true, trackBorderWidth: 1, thumbBorderWidth: 0, thumbScaleOnPress: 0.9, labelUnderline: false, gap: 12 },
  { id: "glass", name: "Glass", summary: "translucent premium switch", checked: false, labelPosition: "right", thumbIcon: "custom", labelFontWeight: 500, shadowEnabled: true, trackBorderWidth: 1, thumbBorderWidth: 1, thumbScaleOnPress: 0.9, labelUnderline: false, gap: 12 },
  { id: "luxe", name: "Luxe", summary: "editorial premium switch", checked: true, labelPosition: "left", thumbIcon: "check", labelFontWeight: 600, shadowEnabled: true, trackBorderWidth: 1, thumbBorderWidth: 0, thumbScaleOnPress: 0.88, labelUnderline: false, gap: 14 },
  { id: "playful", name: "Playful", summary: "friendly expressive switch", checked: false, labelPosition: "right", thumbIcon: "cross", labelFontWeight: 500, shadowEnabled: true, trackBorderWidth: 0, thumbBorderWidth: 0, thumbScaleOnPress: 0.94, labelUnderline: true, gap: 12 },
  { id: "industrial", name: "Industrial", summary: "utility-heavy switch", checked: false, labelPosition: "left", thumbIcon: "none", labelFontWeight: 600, shadowEnabled: false, trackBorderWidth: 1, thumbBorderWidth: 0, thumbScaleOnPress: 0.96, labelUnderline: false, gap: 12 },
  { id: "neon", name: "Neon", summary: "high-energy glow switch", checked: true, labelPosition: "right", thumbIcon: "check", labelFontWeight: 600, shadowEnabled: true, trackBorderWidth: 1, thumbBorderWidth: 0, thumbScaleOnPress: 0.88, labelUnderline: false, gap: 12 },
  { id: "paper", name: "Paper", summary: "light documentation style", checked: false, labelPosition: "left", thumbIcon: "none", labelFontWeight: 400, shadowEnabled: false, trackBorderWidth: 1, thumbBorderWidth: 0, thumbScaleOnPress: 0.96, labelUnderline: false, gap: 14 },
  { id: "cyber", name: "Cyber", summary: "tech-forward precise switch", checked: true, labelPosition: "right", thumbIcon: "custom", labelFontWeight: 600, shadowEnabled: true, trackBorderWidth: 1, thumbBorderWidth: 1, thumbScaleOnPress: 0.88, labelUnderline: false, gap: 12 },
  { id: "trust", name: "Trust", summary: "compliance and clarity", checked: false, labelPosition: "left", thumbIcon: "check", labelFontWeight: 500, shadowEnabled: false, trackBorderWidth: 1, thumbBorderWidth: 0, thumbScaleOnPress: 0.92, labelUnderline: false, gap: 14 },
  { id: "studio", name: "Studio", summary: "balanced production-ready switch", checked: true, labelPosition: "right", thumbIcon: "check", labelFontWeight: 500, shadowEnabled: true, trackBorderWidth: 1, thumbBorderWidth: 0, thumbScaleOnPress: 0.9, labelUnderline: false, gap: 12 },
];

const VARIANTS: Variant[] = [
  { id: "classic", name: "Classic", trackWidthOffset: 0, trackHeightOffset: 0, thumbSizeOffset: 0, trackBorderRadiusOffset: 0, shadowBlur: 8, transitionDuration: 200 },
  { id: "soft", name: "Soft", trackWidthOffset: 4, trackHeightOffset: 2, thumbSizeOffset: -1, trackBorderRadiusOffset: 0, shadowBlur: 12, transitionDuration: 220 },
  { id: "glass", name: "Glass", trackWidthOffset: 8, trackHeightOffset: 4, thumbSizeOffset: 1, trackBorderRadiusOffset: 0, shadowBlur: 18, transitionDuration: 240 },
];

const SIZES: SizeProfile[] = [
  { id: "compact", name: "Compact", trackWidth: 44, trackHeight: 24, labelFontSize: 13, labelGap: 8, focusRingWidth: 2, shadowY: 1, shadowSpread: 0 },
  { id: "balanced", name: "Balanced", trackWidth: 52, trackHeight: 28, labelFontSize: 14, labelGap: 10, focusRingWidth: 3, shadowY: 2, shadowSpread: 0 },
];

function buildPreset(theme: Theme, archetype: Archetype, variant: Variant, size: SizeProfile): TogglePreset {
  const label = `${archetype.name} ${theme.name}`;
  const downloadName = `toggle-${theme.id}-${archetype.id}-${variant.id}-${size.id}`;
  const checked = archetype.checked || variant.id === "glass";

  return {
    id: downloadName,
    name: label,
    summary: `${theme.name} palette with a ${variant.name.toLowerCase()} ${archetype.summary}.`,
    family: theme.name,
    archetype: archetype.name,
    variant: variant.name,
    size: size.name,
    tags: [theme.id, archetype.id, variant.id, size.id, checked ? "on" : "off", archetype.thumbIcon],
    state: {
      ...INITIAL_STATE,
      downloadName,
      checked,
      disabled: archetype.id === "industrial" && variant.id === "classic" && size.id === "compact",
      labelText: `${label} switch`,
      labelPosition: archetype.labelPosition,
      name: "toggle-switch",
      value: downloadName,
      trackWidth: size.trackWidth + variant.trackWidthOffset,
      trackHeight: size.trackHeight + variant.trackHeightOffset,
      trackBorderRadius: 999,
      trackOffBg: theme.off,
      trackOnBg: theme.on,
      trackOffBorder: theme.border,
      trackOnBorder: theme.on,
      trackBorderWidth: archetype.trackBorderWidth,
      thumbSize: 20 + variant.thumbSizeOffset,
      thumbBorderRadius: 999,
      thumbOffBg: theme.canvas,
      thumbOnBg: theme.canvas,
      thumbOffBorder: theme.canvas,
      thumbOnBorder: theme.canvas,
      thumbBorderWidth: archetype.thumbBorderWidth,
      thumbIcon: archetype.thumbIcon,
      thumbIconColor: theme.focus,
      thumbIconSize: 12,
      thumbScaleOnPress: archetype.thumbScaleOnPress,
      transitionDuration: variant.transitionDuration,
      transitionEasing: "ease-out",
      focusRingColor: theme.focus,
      focusRingWidth: size.focusRingWidth,
      hoverTrackOffBg: theme.off,
      hoverTrackOnBg: theme.on,
      hoverThumbScale: 1.04,
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
      shadowEnabled: archetype.shadowEnabled || variant.id === "glass",
      shadowX: 0,
      shadowY: size.shadowY,
      shadowBlur: variant.shadowBlur,
      shadowSpread: size.shadowSpread,
      shadowOpacity: variant.id === "glass" ? 0.18 : 0.12,
      shadowColor: theme.shadow,
      ariaLabel: `${label} switch`,
      role: "switch",
    },
  };
}

export const TOGGLE_PRESETS: TogglePreset[] = THEMES.flatMap((theme) =>
  ARCHETYPES.flatMap((archetype) =>
    VARIANTS.flatMap((variant) =>
      SIZES.map((size) => buildPreset(theme, archetype, variant, size)),
    ),
  ),
);
