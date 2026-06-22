export type SectionId = "presets" | "basics" | "metadata" | "structure" | "layout" | "sizing" | "spacing" | "surface" | "colors" | "border" | "radius" | "shadow" | "typography" | "states" | "disabled" | "accessibility";

export type NavbarState = {
  description: string;
  id: string;
  tabIndex: number;
  width: number;
  height: number;
  gap: number;
  padding: number;
  margin: number;
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
  titleSize: number;
  bodySize: number;
  fontWeight: number;
  disabled: boolean;
  disabledOpacity: number;
  disabledCursor: "not-allowed" | "default" | "pointer";
  disabledUseCustomColors: boolean;
  disabledBg: string;
  disabledText: string;
  disabledBorder: string;
  previewState: "default" | "hover" | "focus" | "active" | "collapsed" | "mobile" | "overflow";
  title: string;
  element: "div" | "section" | "main" | "header" | "footer" | "aside" | "nav" | "hr";
  role: "presentation" | "group" | "region" | "main" | "banner" | "contentinfo" | "navigation" | "separator";
  landmarkLabel: string;
  navCount: number;
  activeIndex: number;
  hasDropdowns: boolean;
  sticky: boolean;
  mobileMode: "collapse" | "drawer" | "stack";
  activeItemBg: string;
  activeItemText: string;
  activeItemBorder: string;
  hoverItemBg: string;
  hoverItemText: string;
  hoverItemBorder: string;
  mobileMenuBg: string;
  mobileMenuBorder: string;
  logoSize: number;
  logoRadius: number;
  indicatorColor: string;
  indicatorHeight: number;
  dropdownBg: string;
  dropdownBorder: string;
  dropdownShadow: string;
};

export type StudioPreset = { id: string; family: string; archetype: string; variant: string; size: string; tags: string[]; state: Partial<NavbarState> & Record<string, unknown> };

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
    "id": "structure",
    "label": "Structure"
  },
  {
    "id": "layout",
    "label": "Layout"
  },
  {
    "id": "sizing",
    "label": "Sizing"
  },
  {
    "id": "spacing",
    "label": "Spacing"
  },
  {
    "id": "surface",
    "label": "Surface"
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
