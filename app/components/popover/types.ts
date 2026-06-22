export type SectionId = "presets" | "basics" | "trigger" | "content" | "placement" | "arrow" | "behavior" | "overlay" | "sizing" | "colors" | "border" | "radius" | "shadow" | "typography" | "transitions" | "focus-ring" | "states" | "disabled" | "accessibility";

export type PopoverStudioState = {
  triggerLabel: string;
  title: string;
  description: string;
  body: string;
  primaryAction: string;
  secondaryAction: string;
  id: string;
  triggerId: string;
  contentId: string;
  labelledBy: string;
  describedBy: string;
  openMode: "uncontrolled" | "controlled" | "manual";
  defaultOpen: boolean;
  modal: boolean;
  closeOnEscape: boolean;
  closeOnInteractOutside: boolean;
  closeOnScroll: boolean;
  side: "top" | "right" | "bottom" | "left";
  align: "start" | "center" | "end";
  offset: number;
  collisionPadding: number;
  sameWidth: boolean;
  sticky: "partial" | "always" | "none";
  showArrow: boolean;
  arrowSize: number;
  arrowShape: "triangle" | "rounded" | "notch";
  showOverlay: boolean;
  overlayOpacity: number;
  width: number;
  maxHeight: number;
  padding: number;
  gap: number;
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
  actionText: string;
  titleSize: number;
  bodySize: number;
  fontWeight: number;
  animation: "none" | "fade" | "scale-fade" | "slide" | "flip";
  duration: number;
  reducedMotion: boolean;
  disabled: boolean;
  disabledOpacity: number;
  disabledCursor: "not-allowed" | "default" | "pointer";
  disabledUseCustomColors: boolean;
  disabledBg: string;
  disabledText: string;
  disabledBorder: string;
  previewState: "open" | "closed" | "hover" | "focus" | "collision" | "disabled";
  ariaLabel: string;
  role: "dialog" | "alertdialog" | "tooltip" | "none";
  triggerHoverBg: string;
  triggerHoverText: string;
  closeBg: string;
  closeColor: string;
  closeHoverBg: string;
  headerBg: string;
  headerText: string;
  footerBg: string;
  footerBorder: string;
};

export type StudioPreset = {
  id: string;
  family: string;
  archetype: string;
  variant: string;
  size: string;
  tags: string[];
  state: Partial<PopoverStudioState> & Record<string, unknown>;
};

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
    "id": "trigger",
    "label": "Trigger"
  },
  {
    "id": "content",
    "label": "Content"
  },
  {
    "id": "placement",
    "label": "Placement"
  },
  {
    "id": "arrow",
    "label": "Arrow"
  },
  {
    "id": "behavior",
    "label": "Behavior"
  },
  {
    "id": "overlay",
    "label": "Overlay"
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
