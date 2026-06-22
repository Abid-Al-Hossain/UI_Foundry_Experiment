export type SectionId = "presets" | "basics" | "metadata" | "field" | "validation" | "behavior" | "layout" | "sizing" | "colors" | "border" | "radius" | "shadow" | "typography" | "focus" | "states" | "disabled" | "accessibility";

export type FileUploadState = {
  showHelper: boolean;
  showSuccess: boolean;
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
  titleSize: number;
  bodySize: number;
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
  errorColor: string;
  successColor: string;
  actionText: string;
  labelSize: number;
  inputSize: number;
  fontWeight: number;
  focusRing: number;
  previewState: "default" | "hover" | "focus" | "active" | "disabled" | "invalid" | "loading" | "empty" | "filled";
  label: string;
  description: string;
  helper: string;
  errorText: string;
  successText: string;
  value: string;
  accept: string;
  maxSizeLabel: string;
  maxFileCount: number;
  id: string;
  name: string;
  title: string;
  tabIndex: number;
  dir: "ltr" | "rtl" | "auto";
  lang: string;
  capture: "" | "user" | "environment";
  dropMode: "dropzone" | "button" | "compact";
  listMode: "cards" | "rows" | "chips";
  showBrowseAction: boolean;
  showRemoveAction: boolean;
  multiple: boolean;
  required: boolean;
  disabled: boolean;
  disabledOpacity: number;
  disabledCursor: "not-allowed" | "default" | "pointer";
  disabledUseCustomColors: boolean;
  disabledBg: string;
  disabledText: string;
  disabledBorder: string;
  readOnly: boolean;
  invalid: boolean;
  ariaLabel: string;
  dropzoneBg: string;
  dropzoneText: string;
  dropzoneHoverBg: string;
  dropzoneHoverBorder: string;
  dropzoneActiveBg: string;
  dropzoneActiveBorder: string;
  progressBg: string;
  progressFill: string;
  fileListBg: string;
  fileListItemBorder: string;
  removeIconColor: string;
};

export type StudioPreset = {
  id: string;
  family: string;
  archetype: string;
  variant: string;
  size: string;
  tags: string[];
  state: Partial<FileUploadState> & Record<string, unknown>;
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
    "id": "metadata",
    "label": "Metadata"
  },
  {
    "id": "field",
    "label": "Field"
  },
  {
    "id": "validation",
    "label": "Validation"
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
    "id": "focus",
    "label": "Focus"
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
