export type ProgressMode =
  | "determinate"
  | "indeterminate"
  | "buffer"
  | "steps"
  | "timer";
export type ProgressOrientation = "horizontal" | "vertical";
export type ProgressShape = "square" | "round" | "pill";
export type ProgressEffect =
  | "none"
  | "stripes"
  | "glow"
  | "liquid"
  | "glitch"
  | "retro"
  | "pulse"
  | "neon"
  | "glass";

// NEW TYPES
export type ProgressStatus =
  | "normal"
  | "active"
  | "success"
  | "error"
  | "warning";
export type ProgressSize = "xs" | "sm" | "md" | "lg" | "xl" | "custom";
export type ProgressLinecap = "round" | "butt" | "square";
export type ProgressDirection = "ltr" | "rtl";
export type ProgressLabelType = "text" | "icon" | "animated";
export type ProgressAnimatedIndicator =
  | "none"
  | "walking-person"
  | "running-dog"
  | "flying-bird"
  | "swimming-fish"
  | "crawling-snail"
  | "bouncing-ball"
  | "spinning-star"
  | "rocket"
  | "car"
  | "bicycle";

export type ProgressState = {
  // Basics
  value: number;
  min: number;
  max: number;
  bufferValue: number;
  mode: ProgressMode;
  orientation: ProgressOrientation;
  stepCount: number; // For 'steps' mode
  timerDuration: number; // For 'timer' mode
  direction: ProgressDirection; // RTL support

  // Styling
  width: number; // Length in px (or height if vertical)
  thickness: number; // Breadth in px
  radius: number; // Specific radius in px (if not shape=pill)
  shape: ProgressShape;
  sizePreset: ProgressSize; // Size presets (xs, sm, md, lg, xl, custom)
  strokeLinecap: ProgressLinecap; // End cap style

  // Colors
  colorMode: "solid" | "gradient" | "duotone";
  color1: string;
  color2: string; // End color for gradient
  color3: string; // Middle color for duotone
  trackColor: string;
  trackOpacity: number;

  // Status
  status: ProgressStatus;
  showStatusIcon: boolean; // Show checkmark/X/warning icon

  // Effects
  effect: ProgressEffect;
  stripeColor: string;
  stripeSpeed: number;
  stripesAnimated: boolean; // Toggle stripe animation
  glowBlur: number;
  glitchIntensity: number;
  liquidViscosity: number;
  hasParticles: boolean;
  particleType: "confetti" | "sparks" | "fire";

  // 3D Options
  enable3D: boolean;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  depth: number; // Z-depth/thickness

  // Animation
  animationDuration: number; // Speed of animations in seconds
  disableAnimation: boolean; // Accessibility - disable all motion

  // Content
  showLabel: boolean;
  labelPosition:
    | "top-left"
    | "top-center"
    | "top-right"
    | "center-left"
    | "center"
    | "center-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right"
    | "inside"; // follows progress
  labelFormat: "percent" | "fraction" | "value" | "custom";
  customLabel: string;
  labelType: ProgressLabelType; // text, icon, or animated
  animatedIndicator: ProgressAnimatedIndicator; // For animated labels
  indicatorSize: number; // Size of animated indicator in px
  // Icon support (for labelType === "icon")
  iconSource: "library" | "custom";
  iconName: string; // Lucide icon name
  customSvg: string; // Custom SVG code

  // Success Marker
  successPercent: number; // Secondary success fill (0 = disabled)

  // Accessibility
  ariaLabel: string;
  ariaDescribedBy: string;

  // Meta
  downloadFormat?: "react" | "html" | "tailwind";
  downloadName?: string;
};

// Size preset thickness mappings
export const SIZE_PRESET_MAP: Record<ProgressSize, number> = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  custom: 24, // Default for custom, uses thickness slider
};

// Status color mappings
export const STATUS_COLOR_MAP: Record<ProgressStatus, string> = {
  normal: "#3b82f6", // Blue
  active: "#3b82f6", // Blue (same, but with pulse)
  success: "#22c55e", // Green
  error: "#ef4444", // Red
  warning: "#f59e0b", // Amber
};

export const INITIAL_PROGRESS_STATE: ProgressState = {
  value: 45,
  min: 0,
  max: 100,
  bufferValue: 70,
  mode: "determinate",
  orientation: "horizontal",
  stepCount: 5,
  timerDuration: 10,
  direction: "ltr",

  width: 300,
  thickness: 24,
  radius: 12,
  shape: "pill",
  sizePreset: "lg",
  strokeLinecap: "round",

  colorMode: "solid",
  color1: "#3b82f6",
  color2: "#8b5cf6",
  color3: "#93c5fd",
  trackColor: "#e2e8f0",
  trackOpacity: 0.2,

  status: "normal",
  showStatusIcon: false,

  effect: "none",
  stripeColor: "rgba(255,255,255,0.2)",
  stripeSpeed: 2,
  stripesAnimated: true,
  glowBlur: 10,
  glitchIntensity: 50,
  liquidViscosity: 10,
  hasParticles: false,
  particleType: "sparks",

  enable3D: false,
  rotateX: 15,
  rotateY: 30,
  rotateZ: 0,
  depth: 20,

  animationDuration: 0.3,
  disableAnimation: false,

  showLabel: true,
  labelPosition: "top-center",
  labelFormat: "percent",
  customLabel: "",
  labelType: "text",
  animatedIndicator: "none",
  indicatorSize: 24,
  iconSource: "library",
  iconName: "none",
  customSvg: "",

  successPercent: 0,

  ariaLabel: "Progress",
  ariaDescribedBy: "",

  downloadFormat: "react",
  downloadName: "progress-bar",
};
