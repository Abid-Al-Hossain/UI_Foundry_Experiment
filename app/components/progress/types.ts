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
  | "magnetic";

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

  // Styling
  width: number; // Length in px (or height if vertical)
  thickness: number; // Breadth in px
  radius: number; // Specific radius in px (if not shape=pill)
  shape: ProgressShape;

  // Colors
  colorMode: "solid" | "gradient" | "duotone";
  color1: string;
  color2: string; // End color for gradient
  color3: string; // Middle/Buffer color
  trackColor: string;
  trackOpacity: number;

  // Effects
  effect: ProgressEffect;
  stripeColor: string;
  stripeSpeed: number;
  glowBlur: number;
  glitchIntensity: number;
  liquidViscosity: number; // Control 'gooeyness'
  hasParticles: boolean;
  particleType: "confetti" | "sparks" | "fire";

  // Content
  showLabel: boolean;
  labelPosition: "center" | "top" | "bottom" | "floating";
  labelFormat: "percent" | "fraction" | "value" | "custom";
  customLabel: string;
  showStripeLabel: boolean; // Text inside the bar

  // Interaction
  interactive: boolean;
  scrubMode: "simple" | "magnetic";

  // Meta
  downloadFormat?: "react" | "html" | "tailwind";
  downloadName?: string;
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

  width: 300,
  thickness: 24,
  radius: 12,
  shape: "pill",

  colorMode: "solid",
  color1: "#3b82f6",
  color2: "#8b5cf6",
  color3: "#93c5fd",
  trackColor: "#e2e8f0",
  trackOpacity: 0.2,

  effect: "none",
  stripeColor: "rgba(255,255,255,0.2)",
  stripeSpeed: 2,
  glowBlur: 10,
  glitchIntensity: 50,
  liquidViscosity: 10,
  hasParticles: false,
  particleType: "sparks",

  showLabel: true,
  labelPosition: "top",
  labelFormat: "percent",
  customLabel: "",
  showStripeLabel: false,

  interactive: true,
  scrubMode: "simple",

  downloadFormat: "react",
  downloadName: "progress-bar",
};
