export type SpinnerVariant =
  | "circular"
  | "dots"
  | "bars"
  | "infinity"
  | "cube"
  | "pyramid"
  | "sphere"
  | "liquid"
  | "glitch"
  | "quantum";

export type SpinnerSizePreset = "xs" | "sm" | "md" | "lg" | "xl" | "custom";
export type SpinnerColorMode = "solid" | "gradient" | "rainbow" | "neon";
export type SpinnerLinecap = "round" | "square" | "butt";
export type SpinnerEasing =
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out";

export interface SpinnerState {
  // Basics
  variant: SpinnerVariant;
  sizePreset: SpinnerSizePreset;
  size: number; // px
  thickness: number; // px
  speed: number; // ms (duration)
  gap: number; // px (spread for dots/bars)

  // Styling
  colorMode: SpinnerColorMode;
  color1: string;
  color2: string;
  trackColor: string;
  trackOpacity: number;
  linecap: SpinnerLinecap;
  easing: SpinnerEasing;

  // Effects
  glowIntensity: number; // 0-100 (blur px)
  glitchFrequency: number; // 0-100
  gooeyIntensity: number; // 0-100
  depth: number; // 3D depth/perspective
  perspective: number; // CSS perspective value
  particleCount: number; // For quantum/dots

  // Accessibility
  label: string;
  labels?: SpinnerLabelConfig[];
  ariaLive: "polite" | "assertive" | "off";
  ariaHidden: boolean;
  role: "status" | "progressbar" | "presentation";
  ariaValueText: string;

  // Focus Ring
  focusRingEnabled: boolean;
  focusRingWidth: number;
  focusRingOffset: number;
  focusRingColor: string;

  // Transitions
  transitionDuration: number;
  transitionEasing: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear";

  // Disabled state
  disabled: boolean;
  disabledOpacity: number;

  // Export
  downloadName: string;
}

export type SpinnerUpdate = <K extends keyof SpinnerState>(
  key: K,
  value: SpinnerState[K],
) => void;

export type SpinnerLabelConfig = {
  id: string;
  position:
    | "top-left"
    | "top-center"
    | "top-right"
    | "center-left"
    | "center"
    | "center-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  type: "text" | "icon" | "animated";
  text?: string;
  iconSource?: "library" | "custom";
  iconName?: string;
  customSvg?: string;
  animatedIndicator?: string;
  size?: number;
  color?: string;
};

export const SIZE_PRESET_MAP: Record<string, number> = {
  xs: 16,
  sm: 24,
  md: 40,
  lg: 64,
  xl: 96,
};

export const DEFAULT_SPINNER_STATE: SpinnerState = {
  variant: "circular",
  sizePreset: "md",
  size: 40,
  thickness: 4,
  speed: 1000,
  gap: 4,

  colorMode: "solid",
  color1: "#3b82f6", // blue-500
  color2: "#8b5cf6", // violet-500
  trackColor: "#1e293b", // slate-800
  trackOpacity: 0.2,
  linecap: "round",

  glowIntensity: 0,
  glitchFrequency: 0,
  gooeyIntensity: 0,
  depth: 60,
  perspective: 800,
  particleCount: 3,

  easing: "linear",

  label: "Loading...",
  downloadName: "spinner",
  labels: [],
  ariaLive: "polite",
  ariaHidden: false,
  role: "status",
  ariaValueText: "",

  focusRingEnabled: false,
  focusRingWidth: 2,
  focusRingOffset: 2,
  focusRingColor: "#38bdf8",

  transitionDuration: 200,
  transitionEasing: "ease",

  disabled: false,
  disabledOpacity: 0.5,
};
