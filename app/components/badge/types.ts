export type BadgeVariant =
  | "solid"
  | "outline"
  | "soft"
  | "ghost"
  | "neumorphic"
  | "glass";

export type BadgeShape = "pill" | "rounded" | "square" | "circle";
export type BadgeSize = "sm" | "md" | "lg";
export type BadgeIconPosition = "left" | "right" | "only";

export type BadgeState = {
  // Content
  label: string;
  count: string;
  showIcon: boolean;
  iconName: string;
  iconPosition: BadgeIconPosition;
  iconGap: number;
  iconSize: number;

  // Appearance
  variant: BadgeVariant;
  shape: BadgeShape;
  size: BadgeSize;
  color: string;
  textColor: string;

  // Dimensions & Typography
  paddingX: number;
  paddingY: number;
  fontSize: number;
  borderRadius: number;
  borderWidth: number;

  // Status Indicator
  showDot: boolean;
  dotColor: string;
  dotPulse: boolean;

  // Advanced Visuals
  gradientEnabled: boolean;
  gradientStart: string;
  gradientEnd: string;
  gradientAngle: number;
  dropShadow: boolean;
  shadowColor: string;
  shadowBlur: number;

  // 3D & Motion "Hyper" Engine
  use3D: boolean;
  depth: number;
  tiltEnabled: boolean;
  tiltMax: number;
  glareOpacity: number;

  // Icon 3D
  icon3DEnabled: boolean;
  icon3DGeometry: "sphere" | "cube" | "pyramid" | "torus";
  icon3DSpinSpeed: number;

  // Interactive
  dismissible: boolean;
  interactive: boolean; // Hover effects
  hoverScale: number;
  clickRipple: boolean;

  // Accessibility
  ariaLabel: string;
  ariaRole: "status" | "alert" | "none";
  ariaLive: "off" | "polite" | "assertive";
};

export const INITIAL_BADGE_STATE: BadgeState = {
  label: "New Feature",
  count: "",
  showIcon: false,
  iconName: "star",
  iconPosition: "left",
  iconGap: 4,
  iconSize: 100,

  variant: "solid",
  shape: "pill",
  size: "md",
  color: "#3b82f6", // Blue-500
  textColor: "#ffffff",

  paddingX: 12,
  paddingY: 4,
  fontSize: 14,
  borderRadius: 9999,
  borderWidth: 1,

  showDot: false,
  dotColor: "#ef4444",
  dotPulse: false,

  gradientEnabled: false,
  gradientStart: "#3b82f6",
  gradientEnd: "#9333ea",
  gradientAngle: 135,
  dropShadow: false,
  shadowColor: "rgba(0,0,0,0.2)",
  shadowBlur: 10,

  use3D: false,
  depth: 0,
  tiltEnabled: false,
  tiltMax: 15,
  glareOpacity: 0.4,

  icon3DEnabled: false,
  icon3DGeometry: "sphere",
  icon3DSpinSpeed: 1,

  dismissible: false,
  interactive: false,
  hoverScale: 1.05,
  clickRipple: false,

  ariaLabel: "",
  ariaRole: "status",
  ariaLive: "polite",
};
