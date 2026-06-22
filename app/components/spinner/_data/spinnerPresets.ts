import { type SpinnerLabelConfig, type SpinnerState } from "../types";

export type SpinnerPreset = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  family: string;
  archetype: string;
  size: string;
  state: Partial<SpinnerState>;
};

const signalLabel = (
  text: string,
  position: SpinnerLabelConfig["position"],
): SpinnerLabelConfig => ({
  id: `${text.toLowerCase().replace(/\s+/g, "-")}-${position}`,
  position,
  type: "text",
  text,
  color: "#e2e8f0",
  size: 14,
});

type SpinnerTheme = {
  id: string;
  name: string;
  color1: string;
  color2: string;
  trackColor: string;
};

type SpinnerArchetype = {
  id: string;
  name: string;
  description: string;
  variant: SpinnerState["variant"];
  colorMode: SpinnerState["colorMode"];
  linecap: SpinnerState["linecap"];
  label: string;
  labels: SpinnerLabelConfig[];
  glowIntensity: number;
  glitchFrequency: number;
  gooeyIntensity: number;
  particleCount: number;
  tags: string[];
};

type SpinnerSizeProfile = {
  id: string;
  name: string;
  sizePreset: SpinnerState["sizePreset"];
  size: number;
  thickness: number;
  speed: number;
  gap: number;
  depth: number;
  perspective: number;
};

const SPINNER_THEMES: SpinnerTheme[] = [
  { id: "slate", name: "Slate", color1: "#3b82f6", color2: "#8b5cf6", trackColor: "#1e293b" },
  { id: "cobalt", name: "Cobalt", color1: "#2563eb", color2: "#22d3ee", trackColor: "#0f172a" },
  { id: "emerald", name: "Emerald", color1: "#10b981", color2: "#34d399", trackColor: "#064e3b" },
  { id: "sunset", name: "Sunset", color1: "#f97316", color2: "#f43f5e", trackColor: "#7c2d12" },
  { id: "rose", name: "Rose", color1: "#ec4899", color2: "#fb7185", trackColor: "#831843" },
  { id: "violet", name: "Violet", color1: "#8b5cf6", color2: "#a855f7", trackColor: "#4c1d95" },
  { id: "amber", name: "Amber", color1: "#f59e0b", color2: "#f97316", trackColor: "#78350f" },
  { id: "mint", name: "Mint", color1: "#14b8a6", color2: "#5eead4", trackColor: "#134e4a" },
  { id: "arctic", name: "Arctic", color1: "#0ea5e9", color2: "#38bdf8", trackColor: "#0c4a6e" },
  { id: "cherry", name: "Cherry", color1: "#be123c", color2: "#fb7185", trackColor: "#4c0519" },
  { id: "obsidian", name: "Obsidian", color1: "#38bdf8", color2: "#a5b4fc", trackColor: "#020617" },
  { id: "indigo", name: "Indigo", color1: "#4338ca", color2: "#818cf8", trackColor: "#312e81" },
];

const SPINNER_ARCHETYPES: SpinnerArchetype[] = [
  { id: "classic-loader", name: "Classic Loader", description: "Balanced circular loader for standard loading states.", variant: "circular", colorMode: "solid", linecap: "round", label: "Loading", labels: [], glowIntensity: 0, glitchFrequency: 0, gooeyIntensity: 0, particleCount: 3, tags: ["classic", "loader", "balanced"] },
  { id: "dock-dots", name: "Dock Dots", description: "Compact dot cluster with soft movement.", variant: "dots", colorMode: "gradient", linecap: "round", label: "Loading", labels: [signalLabel("Syncing", "top-center")], glowIntensity: 8, glitchFrequency: 0, gooeyIntensity: 6, particleCount: 4, tags: ["dots", "dock", "soft"] },
  { id: "neon-infinity", name: "Neon Infinity", description: "Infinity loop with a bright neon finish.", variant: "infinity", colorMode: "neon", linecap: "round", label: "Processing", labels: [signalLabel("Live", "bottom-right")], glowIntensity: 18, glitchFrequency: 0, gooeyIntensity: 0, particleCount: 3, tags: ["neon", "infinity", "loop"] },
  { id: "liquid-merge", name: "Liquid Merge", description: "Gooey liquid spinner with soft organic motion.", variant: "liquid", colorMode: "gradient", linecap: "round", label: "Merging", labels: [signalLabel("Live", "center")], glowIntensity: 10, glitchFrequency: 0, gooeyIntensity: 12, particleCount: 3, tags: ["liquid", "gooey", "organic"] },
  { id: "glitch-signal", name: "Glitch Signal", description: "Hard-edged signal with active glitch motion.", variant: "glitch", colorMode: "solid", linecap: "butt", label: "Sync error", labels: [], glowIntensity: 12, glitchFrequency: 75, gooeyIntensity: 0, particleCount: 3, tags: ["glitch", "signal", "error"] },
  { id: "quantum-field", name: "Quantum Field", description: "3D spinner with dense particle presence.", variant: "quantum", colorMode: "rainbow", linecap: "round", label: "Quantum load", labels: [signalLabel("3D", "top-left"), signalLabel("Ready", "bottom-center")], glowIntensity: 14, glitchFrequency: 0, gooeyIntensity: 0, particleCount: 8, tags: ["quantum", "3d", "particle"] },
  { id: "orbital-ring", name: "Orbital Ring", description: "Orbiting ring with polished motion.", variant: "circular", colorMode: "gradient", linecap: "round", label: "Orbiting", labels: [signalLabel("Spin", "top-right")], glowIntensity: 12, glitchFrequency: 0, gooeyIntensity: 0, particleCount: 3, tags: ["orbital", "ring", "motion"] },
  { id: "soft-pulse", name: "Soft Pulse", description: "Gentle pulse for calm waiting states.", variant: "dots", colorMode: "solid", linecap: "round", label: "Waiting", labels: [signalLabel("Calm", "center")], glowIntensity: 4, glitchFrequency: 0, gooeyIntensity: 2, particleCount: 3, tags: ["soft", "pulse", "calm"] },
  { id: "data-stream", name: "Data Stream", description: "Bar-based stream for pipeline or upload flows.", variant: "bars", colorMode: "gradient", linecap: "square", label: "Uploading", labels: [signalLabel("Flow", "bottom-left")], glowIntensity: 9, glitchFrequency: 0, gooeyIntensity: 0, particleCount: 5, tags: ["bars", "stream", "data"] },
  { id: "radar-sweep", name: "Radar Sweep", description: "Circular sweep tuned for scanning states.", variant: "circular", colorMode: "neon", linecap: "round", label: "Scanning", labels: [signalLabel("Scan", "top-center")], glowIntensity: 16, glitchFrequency: 0, gooeyIntensity: 0, particleCount: 4, tags: ["radar", "scan", "sweep"] },
  { id: "mesh-bloom", name: "Mesh Bloom", description: "Liquid bloom with mesh-like depth.", variant: "liquid", colorMode: "rainbow", linecap: "round", label: "Blending", labels: [signalLabel("Mesh", "center-right")], glowIntensity: 12, glitchFrequency: 0, gooeyIntensity: 14, particleCount: 4, tags: ["mesh", "bloom", "depth"] },
  { id: "prism-core", name: "Prism Core", description: "Prismatic loader with a premium core glow.", variant: "quantum", colorMode: "rainbow", linecap: "round", label: "Prism", labels: [signalLabel("Core", "bottom-right")], glowIntensity: 20, glitchFrequency: 0, gooeyIntensity: 0, particleCount: 6, tags: ["prism", "core", "glow"] },
];

const SPINNER_SIZES: SpinnerSizeProfile[] = [
  { id: "xs", name: "XS", sizePreset: "xs", size: 16, thickness: 2, speed: 780, gap: 3, depth: 32, perspective: 720 },
  { id: "sm", name: "SM", sizePreset: "sm", size: 24, thickness: 3, speed: 900, gap: 4, depth: 40, perspective: 780 },
  { id: "md", name: "MD", sizePreset: "md", size: 40, thickness: 4, speed: 1100, gap: 6, depth: 60, perspective: 900 },
  { id: "lg", name: "LG", sizePreset: "lg", size: 64, thickness: 5, speed: 1300, gap: 8, depth: 80, perspective: 1100 },
];

function buildSpinnerPreset(
  theme: SpinnerTheme,
  archetype: SpinnerArchetype,
  size: SpinnerSizeProfile,
): SpinnerPreset {
  const state: Partial<SpinnerState> = {
    variant: archetype.variant,
    sizePreset: size.sizePreset,
    size: size.size,
    thickness: size.thickness,
    speed: size.speed,
    gap: size.gap,
    colorMode: archetype.colorMode,
    color1: theme.color1,
    color2: theme.color2,
    trackColor: theme.trackColor,
    trackOpacity: archetype.variant === "glitch" ? 0.18 : 0.14,
    linecap: archetype.linecap,
    easing: archetype.variant === "glitch" ? "linear" : "ease-in-out",
    glowIntensity: archetype.glowIntensity,
    glitchFrequency: archetype.glitchFrequency,
    gooeyIntensity: archetype.gooeyIntensity,
    depth: size.depth,
    perspective: size.perspective,
    particleCount: archetype.particleCount,
    label: archetype.label,
    labels: archetype.labels,
    downloadName: `spinner-${theme.id}-${archetype.id}-${size.id}`,
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

export const SPINNER_PRESETS: SpinnerPreset[] = SPINNER_THEMES.flatMap((theme) =>
  SPINNER_ARCHETYPES.flatMap((archetype) =>
    SPINNER_SIZES.map((size) => buildSpinnerPreset(theme, archetype, size)),
  ),
);

export const SPINNER_PRESET_COUNT = SPINNER_PRESETS.length;
