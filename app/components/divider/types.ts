export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "solid" | "dashed" | "dotted" | "double";
export type DividerContentPosition = "left" | "center" | "right";

export type DividerState = {
  // Basics
  orientation: DividerOrientation;
  width: string; // "100%", "50%", etc.
  thickness: number;
  gap: number; // Spacing around divider
  color: string;
  variant: DividerVariant;
  borderRadius: number;

  // Content
  showLabel: boolean;
  labelText: string;
  labelPosition: DividerContentPosition;
  labelBackground: string;
  labelColor: string;
  labelPadding: number;

  // Advanced Visuals
  gradientEnabled: boolean;
  gradientStart: string;
  gradientEnd: string;
  opacity: number;

  // Hyper FX
  animateBeam: boolean;
  beamColor: string;
  beamSpeed: number; // seconds duration

  shimmerEnabled: boolean;
  shimmerSpeed: number;

  neonGlow: boolean;
  glowColor: string;
  glowBlur: number;

  interactiveResize: boolean;
};

export const INITIAL_DIVIDER_STATE: DividerState = {
  orientation: "horizontal",
  width: "100%",
  thickness: 2,
  gap: 24,
  color: "#cbd5e1",
  variant: "solid",
  borderRadius: 99,

  showLabel: true,
  labelText: "Section Break",
  labelPosition: "center",
  labelBackground: "transparent",
  labelColor: "#64748b",
  labelPadding: 12,

  gradientEnabled: false,
  gradientStart: "#3b82f6",
  gradientEnd: "#9333ea",
  opacity: 1,

  animateBeam: false,
  beamColor: "#3b82f6",
  beamSpeed: 3,

  shimmerEnabled: false,
  shimmerSpeed: 2,

  neonGlow: false,
  glowColor: "#3b82f6",
  glowBlur: 8,

  interactiveResize: false, // For now false defaults
};
