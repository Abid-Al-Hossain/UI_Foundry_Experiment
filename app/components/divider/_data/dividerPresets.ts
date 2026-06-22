import { INITIAL_DIVIDER_STATE, type DividerState } from "../types";

export type DividerPreset = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  family: string;
  archetype: string;
  size: string;
  state: Partial<DividerState>;
};

type DividerTheme = {
  id: string;
  name: string;
  color: string;
  labelColor: string;
  labelBackground: string;
  gradientStart: string;
  gradientEnd: string;
  beamColor: string;
  glowColor: string;
};

type DividerArchetype = {
  id: string;
  name: string;
  description: string;
  orientation: DividerState["orientation"];
  width: string;
  variant: DividerState["variant"];
  labelText: string;
  labelPosition: DividerState["labelPosition"];
  showLabel: boolean;
  contentType: DividerState["contentType"];
  iconName: DividerState["iconName"];
  fontWeight: DividerState["fontWeight"];
  labelTransform: DividerState["labelTransform"];
  gradientEnabled: boolean;
  animateBeam: boolean;
  shimmerEnabled: boolean;
  neonGlow: boolean;
  interactiveResize: boolean;
  tags: string[];
};

type DividerSizeProfile = {
  id: string;
  name: string;
  thickness: number;
  gap: number;
  labelPadding: number;
  fontSize: number;
  borderRadius: number;
  opacity: number;
  beamSpeed: number;
  shimmerSpeed: number;
};

const DIVIDER_THEMES: DividerTheme[] = [
  { id: "slate", name: "Slate", color: "#cbd5e1", labelColor: "#64748b", labelBackground: "transparent", gradientStart: "#94a3b8", gradientEnd: "#334155", beamColor: "#60a5fa", glowColor: "#94a3b8" },
  { id: "cobalt", name: "Cobalt", color: "#3b82f6", labelColor: "#dbeafe", labelBackground: "rgba(15, 23, 42, 0.9)", gradientStart: "#38bdf8", gradientEnd: "#1d4ed8", beamColor: "#60a5fa", glowColor: "#60a5fa" },
  { id: "emerald", name: "Emerald", color: "#10b981", labelColor: "#ecfdf5", labelBackground: "rgba(6, 95, 70, 0.92)", gradientStart: "#34d399", gradientEnd: "#047857", beamColor: "#6ee7b7", glowColor: "#34d399" },
  { id: "sunset", name: "Sunset", color: "#f97316", labelColor: "#fff7ed", labelBackground: "rgba(124, 45, 18, 0.92)", gradientStart: "#fb923c", gradientEnd: "#c2410c", beamColor: "#fdba74", glowColor: "#fb923c" },
  { id: "rose", name: "Rose", color: "#f43f5e", labelColor: "#fff1f2", labelBackground: "rgba(136, 19, 55, 0.92)", gradientStart: "#fb7185", gradientEnd: "#be123c", beamColor: "#fda4af", glowColor: "#fb7185" },
  { id: "violet", name: "Violet", color: "#8b5cf6", labelColor: "#f5f3ff", labelBackground: "rgba(76, 29, 149, 0.92)", gradientStart: "#a78bfa", gradientEnd: "#5b21b6", beamColor: "#c4b5fd", glowColor: "#a78bfa" },
  { id: "amber", name: "Amber", color: "#d97706", labelColor: "#fffbeb", labelBackground: "rgba(120, 53, 15, 0.92)", gradientStart: "#fbbf24", gradientEnd: "#b45309", beamColor: "#fcd34d", glowColor: "#fbbf24" },
  { id: "mint", name: "Mint", color: "#14b8a6", labelColor: "#f0fdfa", labelBackground: "rgba(19, 78, 74, 0.92)", gradientStart: "#5eead4", gradientEnd: "#0f766e", beamColor: "#5eead4", glowColor: "#2dd4bf" },
  { id: "arctic", name: "Arctic", color: "#0ea5e9", labelColor: "#f8fafc", labelBackground: "rgba(2, 132, 199, 0.92)", gradientStart: "#7dd3fc", gradientEnd: "#0284c7", beamColor: "#7dd3fc", glowColor: "#38bdf8" },
  { id: "cherry", name: "Cherry", color: "#be123c", labelColor: "#fff1f2", labelBackground: "rgba(76, 5, 25, 0.92)", gradientStart: "#fb7185", gradientEnd: "#7f1d1d", beamColor: "#fda4af", glowColor: "#fb7185" },
  { id: "obsidian", name: "Obsidian", color: "#0f172a", labelColor: "#e2e8f0", labelBackground: "rgba(15, 23, 42, 0.92)", gradientStart: "#475569", gradientEnd: "#020617", beamColor: "#38bdf8", glowColor: "#38bdf8" },
  { id: "indigo", name: "Indigo", color: "#4338ca", labelColor: "#eef2ff", labelBackground: "rgba(49, 46, 129, 0.92)", gradientStart: "#818cf8", gradientEnd: "#312e81", beamColor: "#a5b4fc", glowColor: "#818cf8" },
];

const DIVIDER_ARCHETYPES: DividerArchetype[] = [
  { id: "section-break", name: "Section Break", description: "Classic centered divider for page sections.", orientation: "horizontal", width: "100%", variant: "solid", labelText: "Section Break", labelPosition: "center", showLabel: true, contentType: "text", iconName: "star", fontWeight: "600", labelTransform: "none", gradientEnabled: false, animateBeam: false, shimmerEnabled: false, neonGlow: false, interactiveResize: false, tags: ["section", "editorial", "classic"] },
  { id: "editorial-rule", name: "Editorial Rule", description: "Lean, low-contrast line for editorial layouts.", orientation: "horizontal", width: "100%", variant: "dashed", labelText: "", labelPosition: "center", showLabel: false, contentType: "text", iconName: "star", fontWeight: "400", labelTransform: "none", gradientEnabled: false, animateBeam: false, shimmerEnabled: false, neonGlow: false, interactiveResize: false, tags: ["editorial", "rule", "subtle"] },
  { id: "neon-beam", name: "Neon Beam", description: "High-energy divider with beam and glow.", orientation: "horizontal", width: "100%", variant: "solid", labelText: "Live Feed", labelPosition: "center", showLabel: true, contentType: "text", iconName: "zap", fontWeight: "600", labelTransform: "uppercase", gradientEnabled: true, animateBeam: true, shimmerEnabled: true, neonGlow: true, interactiveResize: false, tags: ["neon", "beam", "glow", "live"] },
  { id: "icon-divider", name: "Icon Divider", description: "Icon label divider for dense UI chrome.", orientation: "horizontal", width: "100%", variant: "double", labelText: "", labelPosition: "center", showLabel: true, contentType: "icon", iconName: "star", fontWeight: "600", labelTransform: "none", gradientEnabled: true, animateBeam: false, shimmerEnabled: true, neonGlow: false, interactiveResize: false, tags: ["icon", "chrome", "dense"] },
  { id: "double-rail", name: "Double Rail", description: "Stronger separator with a bold label lockup.", orientation: "horizontal", width: "100%", variant: "double", labelText: "System Boundary", labelPosition: "right", showLabel: true, contentType: "text", iconName: "star", fontWeight: "700", labelTransform: "uppercase", gradientEnabled: false, animateBeam: false, shimmerEnabled: false, neonGlow: false, interactiveResize: false, tags: ["double", "boundary", "system"] },
  { id: "sidebar-split", name: "Sidebar Split", description: "Vertical divider with resize affordance.", orientation: "vertical", width: "240px", variant: "solid", labelText: "Navigation", labelPosition: "center", showLabel: true, contentType: "text", iconName: "star", fontWeight: "600", labelTransform: "capitalize", gradientEnabled: false, animateBeam: false, shimmerEnabled: false, neonGlow: false, interactiveResize: true, tags: ["vertical", "sidebar", "resize"] },
  { id: "whisper-line", name: "Whisper Line", description: "Thin divider with a soft understated voice.", orientation: "horizontal", width: "100%", variant: "dotted", labelText: "Quiet Space", labelPosition: "left", showLabel: true, contentType: "text", iconName: "star", fontWeight: "400", labelTransform: "none", gradientEnabled: false, animateBeam: false, shimmerEnabled: false, neonGlow: false, interactiveResize: false, tags: ["quiet", "thin", "soft"] },
  { id: "status-bar", name: "Status Bar", description: "Label-heavy divider tuned for dashboards.", orientation: "horizontal", width: "100%", variant: "solid", labelText: "Status", labelPosition: "left", showLabel: true, contentType: "text", iconName: "bell", fontWeight: "600", labelTransform: "uppercase", gradientEnabled: true, animateBeam: false, shimmerEnabled: true, neonGlow: false, interactiveResize: false, tags: ["status", "dashboard", "bar"] },
  { id: "timeline-marker", name: "Timeline Marker", description: "Vertical separator for story timelines.", orientation: "vertical", width: "280px", variant: "dotted", labelText: "Milestone", labelPosition: "center", showLabel: true, contentType: "icon", iconName: "check", fontWeight: "600", labelTransform: "capitalize", gradientEnabled: false, animateBeam: false, shimmerEnabled: false, neonGlow: false, interactiveResize: true, tags: ["timeline", "marker", "vertical"] },
  { id: "glass-split", name: "Glass Split", description: "Glassmorphic separator with a premium card feel.", orientation: "horizontal", width: "100%", variant: "solid", labelText: "Split", labelPosition: "center", showLabel: true, contentType: "text", iconName: "star", fontWeight: "500", labelTransform: "none", gradientEnabled: true, animateBeam: false, shimmerEnabled: false, neonGlow: false, interactiveResize: false, tags: ["glass", "premium", "split"] },
  { id: "bold-anchor", name: "Bold Anchor", description: "Heavy editorial divider with a strong label.", orientation: "horizontal", width: "100%", variant: "double", labelText: "Anchor Point", labelPosition: "right", showLabel: true, contentType: "text", iconName: "star", fontWeight: "700", labelTransform: "uppercase", gradientEnabled: false, animateBeam: true, shimmerEnabled: false, neonGlow: true, interactiveResize: false, tags: ["bold", "anchor", "editorial"] },
  { id: "signal-lane", name: "Signal Lane", description: "Vertical lane with icon-forward emphasis.", orientation: "vertical", width: "240px", variant: "double", labelText: "Signal", labelPosition: "center", showLabel: true, contentType: "icon", iconName: "zap", fontWeight: "600", labelTransform: "none", gradientEnabled: true, animateBeam: true, shimmerEnabled: true, neonGlow: true, interactiveResize: true, tags: ["signal", "lane", "vertical"] },
];

const DIVIDER_SIZES: DividerSizeProfile[] = [
  { id: "compact", name: "Compact", thickness: 1, gap: 18, labelPadding: 8, fontSize: 12, borderRadius: 8, opacity: 0.88, beamSpeed: 2.2, shimmerSpeed: 1.6 },
  { id: "balanced", name: "Balanced", thickness: 2, gap: 24, labelPadding: 12, fontSize: 14, borderRadius: 16, opacity: 0.95, beamSpeed: 2.8, shimmerSpeed: 2.1 },
  { id: "hero", name: "Hero", thickness: 3, gap: 32, labelPadding: 16, fontSize: 15, borderRadius: 99, opacity: 1, beamSpeed: 3.2, shimmerSpeed: 2.6 },
];

function buildDividerPreset(
  theme: DividerTheme,
  archetype: DividerArchetype,
  size: DividerSizeProfile,
): DividerPreset {
  const state: Partial<DividerState> = {
    ...INITIAL_DIVIDER_STATE,
    orientation: archetype.orientation,
    width: archetype.width,
    thickness: size.thickness,
    gap: size.gap,
    color: theme.color,
    variant: archetype.variant,
    borderRadius: size.borderRadius,
    showLabel: archetype.showLabel,
    labelText: archetype.labelText,
    labelPosition: archetype.labelPosition,
    labelBackground: theme.labelBackground,
    labelColor: theme.labelColor,
    labelPadding: size.labelPadding,
    contentType: archetype.contentType,
    iconName: archetype.iconName,
    iconSize: 20 + size.thickness * 2,
    fontSize: size.fontSize,
    fontWeight: archetype.fontWeight,
    labelTransform: archetype.labelTransform,
    letterSpacing: archetype.labelTransform === "uppercase" ? 1.2 : 0,
    gradientEnabled: archetype.gradientEnabled,
    gradientStart: theme.gradientStart,
    gradientEnd: theme.gradientEnd,
    opacity: size.opacity,
    animateBeam: archetype.animateBeam,
    beamColor: theme.beamColor,
    beamSpeed: size.beamSpeed,
    shimmerEnabled: archetype.shimmerEnabled,
    shimmerSpeed: size.shimmerSpeed,
    neonGlow: archetype.neonGlow,
    glowColor: theme.glowColor,
    glowBlur: size.thickness * 5 + 6,
    interactiveResize: archetype.interactiveResize,
    ariaRole: "separator",
    ariaLabel: `${theme.name} ${archetype.name} divider`,
  };

  return {
    id: `${theme.id}-${archetype.id}-${size.id}`,
    name: `${theme.name} ${archetype.name} ${size.name}`,
    description: `${archetype.description} using the ${theme.name} palette.`,
    tags: [...new Set([theme.id, theme.name, archetype.id, archetype.name, size.id, size.name, ...archetype.tags])],
    family: theme.name,
    archetype: archetype.name,
    size: size.name,
    state,
  };
}

export const DIVIDER_PRESETS: DividerPreset[] = DIVIDER_THEMES.flatMap((theme) =>
  DIVIDER_ARCHETYPES.flatMap((archetype) =>
    DIVIDER_SIZES.map((size) => buildDividerPreset(theme, archetype, size)),
  ),
);

export const DIVIDER_PRESET_COUNT = DIVIDER_PRESETS.length;
