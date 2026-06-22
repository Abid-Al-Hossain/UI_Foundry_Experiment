export type IconLibrary = "lucide" | "custom"; // Future-proof

// --- 1. Basics ---
export type IconSize = number; // px
export type IconStrokeWidth = number; // px
export type IconColorMode = "solid" | "gradient";
export type IconGradientType = "linear" | "radial";
export type IconGradientDirection =
  | "to-r"
  | "to-b"
  | "to-br"
  | "to-tr"
  | number; // Angle

// --- 2. Container ---
export type IconShape = "none" | "square" | "circle" | "rounded" | "squircle";
export type IconContainerStyle = "solid" | "outline" | "glass" | "neumorphic";

// --- 4. Animation ---
// Using Framer Motion presets
export type IconAnimationType =
  | "none"
  | "spin"
  | "pulse"
  | "bounce"
  | "wiggle"
  | "float"
  | "tada"
  | "flash"
  | "jello"
  | "rubberBand";

export type IconHoverEffect =
  | "none"
  | "scale"
  | "rotate"
  | "fill"
  | "glow"
  | "shake"
  | "3d-tilt";

export type IconEntranceAnimation =
  | "none"
  | "fade"
  | "zoom"
  | "slide-up"
  | "slide-down"
  | "rotate-in";

// --- STATE INTERFACE ---
export interface IconState {
  // --- Global ---
  iconName: string; // Lucide icon name
  library: IconLibrary;
  customSvg: string; // New field for custom SVG content

  // --- Basics ---
  size: number;
  strokeWidth: number;
  color: string;
  fillColor: string; // For fillable icons
  fillOpacity: number; // 0-1
  opacity: number; // 0-1

  // Transforms
  rotation: number;
  flipHorizontal: boolean;
  flipVertical: boolean;

  // Gradient (Stroke)
  gradientEnabled: boolean;
  gradientStart: string;
  gradientEnd: string;
  gradientType: IconGradientType;
  gradientAngle: number;

  // --- Background / Container ---
  shape: IconShape;
  containerSize: number; // Padding/Size logic
  containerPadding: number;
  containerColor: string;
  containerOpacity: number; // For glass

  // Border
  borderWidth: number;
  borderColor: string;
  borderStyle: "solid" | "dashed" | "dotted" | "double" | "none";
  borderRadius: number; // For "rounded" shape

  // Glass/Neumorphism
  glassBlur: number;
  glassOpacity: number;
  neumorphic: boolean; // Toggle for shadow styles
  neumorphicElevation: "flat" | "pressed" | "convex" | "concave";

  // --- Effects ---
  // Shadow
  shadowEnabled: boolean;
  shadowColor: string;
  shadowX: number;
  shadowY: number;
  shadowBlur: number;
  shadowSpread: number;

  // Glow (Neon)
  glowEnabled: boolean;
  glowColor: string;
  glowBlur: number;

  // Reflection/Gloss
  reflectionEnabled: boolean;
  reflectionOpacity: number;

  // --- 3D Transforms ---
  use3D: boolean;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  depth: number; // Perspective depth
  perspective: number;

  // --- Animation ---
  animationType: IconAnimationType;
  animationDuration: number;
  animationRepeat: boolean; // Loop?
  animationDelay: number;

  hoverEffect: IconHoverEffect;
  entranceAnimation: IconEntranceAnimation;

  // --- Accessibility ---
  ariaLabel: string;
  ariaRole: "img" | "presentation" | "none";
  ariaHidden: boolean;
  tabIndex: number;
  clickable: boolean;
  cursorType: "default" | "pointer" | "not-allowed";

  // --- Focus Ring ---
  focusRingEnabled: boolean;
  focusRingWidth: number;
  focusRingOffset: number;
  focusRingColor: string;

  // --- Transitions ---
  transitionDuration: number;
  transitionEasing: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear";

  // --- Disabled state ---
  disabled: boolean;
  disabledOpacity: number;
  disabledCursor: "not-allowed" | "default" | "pointer";
  disabledColor: string;

  // --- Explicit hover/active colors ---
  hoverColor: string;
  hoverScale: number;
  hoverFillColor: string;
  activeColor: string;
  activeScale: number;
}

export type IconSetter = <K extends keyof IconState>(
  key: K,
) => (
  val:
    | IconState[K]
    | ((prev: IconState[K]) => IconState[K]),
) => void;

export type IconNumericKey = {
  [K in keyof IconState]: IconState[K] extends number ? K : never;
}[keyof IconState];

export type IconFloatSetter = <K extends IconNumericKey>(
  key: K,
) => (val: number | string) => void;

export const INITIAL_ICON_STATE: IconState = {
  iconName: "Activity",
  library: "lucide",
  customSvg: "",

  size: 48,
  strokeWidth: 2,
  color: "#3b82f6",
  fillColor: "#3b82f6",
  fillOpacity: 0,
  opacity: 1,

  rotation: 0,
  flipHorizontal: false,
  flipVertical: false,

  gradientEnabled: false,
  gradientStart: "#3b82f6",
  gradientEnd: "#ec4899",
  gradientType: "linear",
  gradientAngle: 90,

  shape: "none",
  containerSize: 64, // Not used if shape is none, or calculates padding
  containerPadding: 16,
  containerColor: "#ffffff",
  containerOpacity: 1,

  borderWidth: 0,
  borderColor: "#e2e8f0",
  borderStyle: "solid",
  borderRadius: 12,

  glassBlur: 0,
  glassOpacity: 0.2,
  neumorphic: false,
  neumorphicElevation: "flat",

  shadowEnabled: false,
  shadowColor: "rgba(0,0,0,0.1)",
  shadowX: 0,
  shadowY: 4,
  shadowBlur: 6,
  shadowSpread: -1,

  glowEnabled: false,
  glowColor: "#3b82f6",
  glowBlur: 10,

  reflectionEnabled: false,
  reflectionOpacity: 0.5,

  use3D: false,
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
  depth: 10,
  perspective: 1000,

  animationType: "none",
  animationDuration: 1,
  animationRepeat: true,
  animationDelay: 0,

  hoverEffect: "none",
  entranceAnimation: "none",

  ariaLabel: "",
  ariaRole: "img",
  ariaHidden: false,
  tabIndex: 0,
  clickable: false,
  cursorType: "default",

  focusRingEnabled: true,
  focusRingWidth: 2,
  focusRingOffset: 2,
  focusRingColor: "#38bdf8",

  transitionDuration: 200,
  transitionEasing: "ease",

  disabled: false,
  disabledOpacity: 0.5,
  disabledCursor: "not-allowed",
  disabledColor: "#94a3b8",

  hoverColor: "#3b82f6",
  hoverScale: 1.08,
  hoverFillColor: "#3b82f6",
  activeColor: "#2563eb",
  activeScale: 0.95,
};
