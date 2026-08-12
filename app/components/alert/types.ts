export type SectionId = "presets" | "basics" | "metadata" | "behavior" | "placement" | "sizing" | "colors" | "border" | "radius" | "shadow" | "typography" | "transitions" | "focus-ring" | "states" | "disabled" | "accessibility";

export type AlertState = {
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
  role: "alert" | "status" | "region";
  severity: string;
  iconMode: string;
  showActions: boolean;
  dismissible: boolean;
  livePoliteness: "off" | "polite" | "assertive";
  placement: "inline" | "top" | "right" | "bottom" | "left" | "bottom-right";
  // Variant
  alertVariant: "filled" | "outlined" | "standard" | "left-accent";
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
  iconSize: number;
  iconPosition: "left" | "right";
  // Action button
  actionBg: string;
  actionBorder: string;
  actionHoverBg: string;
  // Dismiss button
  dismissHoverBg: string;
  dismissHoverColor: string;
  // Auto-dismiss behavior
  autoDismiss: boolean;
  autoDismissDuration: number;
};

export type StudioPreset = { id: string; family: string; archetype: string; variant: string; size: string; tags: string[]; state: Partial<AlertState> & Record<string, unknown> };

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
    "id": "behavior",
    "label": "Behavior"
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
