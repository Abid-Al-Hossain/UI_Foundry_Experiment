export type SectionId = "presets" | "basics" | "metadata" | "content" | "items" | "behavior" | "layout" | "placement" | "sizing" | "colors" | "border" | "radius" | "shadow" | "typography" | "transitions" | "focus-ring" | "states" | "disabled" | "accessibility";

export type ToastState = {
  title: string;
  description: string;
  label: string;
  helper: string;
  id: string;
  ariaLabel: string;
  tabIndex: number;
  width: number;
  height: number;
  gap: number;
  padding: number;
  radius: number;
  borderWidth: number;
  borderStyle: "solid" | "dashed" | "dotted" | "double" | "none";
  // Typography (full button-parity)
  fontBucket: "system" | "google";
  fontSearch: string;
  systemFontIdx: number;
  googleFontFamily: string;
  fontSizeUnit: "px" | "rem";
  fontStyle: "normal" | "italic";
  textTransform: "none" | "uppercase" | "lowercase" | "capitalize";
  textDecoration: "none" | "underline";
  letterSpacing: number;
  letterSpacingUnit: "px" | "em";
  lineHeight: number;
  // Radius (full corner control)
  radiusLinked: boolean;
  radiusTL: number;
  radiusTR: number;
  radiusBR: number;
  radiusBL: number;
  // Shadow (full control)
  shadowEnabled: boolean;
  shadowX: number;
  shadowY: number;
  shadowBlur: number;
  shadowSpread: number;
  shadowOpacity: number;
  shadowColor: string;
  // Focus Ring
  focusRingEnabled: boolean;
  focusRingWidth: number;
  focusRingOffset: number;
  focusRingColor: string;
  // Transitions
  transitionDuration: number;
  transitionEasing: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear";
  background: string;
  foreground: string;
  muted: string;
  accent: string;
  border: string;
  infoColor: string;
  successColor: string;
  warningColor: string;
  errorColor: string;
  actionText: string;
  dismissBorder: string;
  dismissColor: string;
  titleSize: number;
  bodySize: number;
  fontWeight: number;
  previewState: "default" | "hover" | "focus" | "active" | "open" | "closed" | "selected" | "loading" | "empty" | "error" | "success";
  disabled: boolean;
  disabledOpacity: number;
  disabledCursor: "not-allowed" | "default" | "pointer";
  disabledUseCustomColors: boolean;
  disabledBg: string;
  disabledText: string;
  disabledBorder: string;
  role: "status" | "alert" | "region";
  severity: string;
  placement: "inline" | "top" | "right" | "bottom" | "left" | "bottom-right";
  duration: number;
  dismissible: boolean;
  showAction: boolean;
  stackCount: number;
  swipeDirection: "left" | "right" | "up" | "down";
  // Base surface
  toastBg: string;
  toastBorder: string;
  toastRadius: number;
  toastShadow: string;
  toastVariant: "filled" | "outlined" | "standard" | "left-accent";
  // Severity surfaces
  infoBg: string;
  infoBorderColor: string;
  successBg: string;
  successBorderColor: string;
  warningBg: string;
  warningBorderColor: string;
  errorBg: string;
  errorBorderColor: string;
  // Icon
  iconColor: string;
  iconSize: number;
  // Action button
  actionBg: string;
  actionBorder: string;
  actionHoverBg: string;
  // Dismiss button
  dismissHoverBg: string;
  dismissHoverColor: string;
  // Progress bar
  progressBarEnabled: boolean;
  progressBarColor: string;
  progressBarBg: string;
  progressBarHeight: number;
  // Stacking & behavior
  stackGap: number;
  stackOffset: number;
  stackScaleRatio: number;
  pauseOnHover: boolean;
  pauseOnWindowBlur: boolean;
  maxToasts: number;
};

export type StudioPreset = { id: string; family: string; archetype: string; variant: string; size: string; tags: string[]; state: Partial<ToastState> & Record<string, unknown> };

export const SECTIONS: Array<{ id: SectionId; label: string }> = [
  {
    "id": "presets",
    "label": "Presets"
  },
  {
    "id": "basics",
    "label": "Basics"
  },
  {
    "id": "metadata",
    "label": "Metadata"
  },
  {
    "id": "content",
    "label": "Content"
  },
  {
    "id": "items",
    "label": "Items"
  },
  {
    "id": "behavior",
    "label": "Behavior"
  },
  {
    "id": "layout",
    "label": "Layout"
  },
  {
    "id": "placement",
    "label": "Placement"
  },
  {
    "id": "sizing",
    "label": "Sizing"
  },
  {
    "id": "colors",
    "label": "Colors"
  },
  {
    "id": "border",
    "label": "Border"
  },
  {
    "id": "radius",
    "label": "Radius"
  },
  {
    "id": "shadow",
    "label": "Shadow"
  },
  {
    "id": "typography",
    "label": "Typography"
  },
  {
    "id": "transitions",
    "label": "Transitions"
  },
  {
    "id": "focus-ring",
    "label": "Focus Ring"
  },
  {
    "id": "states",
    "label": "State Preview"
  },
  {
    "id": "disabled",
    "label": "Disabled"
  },
  {
    "id": "accessibility",
    "label": "Accessibility"
  }
];
