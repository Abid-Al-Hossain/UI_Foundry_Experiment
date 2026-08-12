import { type IconName, type IconSource } from "./_section/IconSection";
import {
  type LoadingSpinnerMode,
  type LoadingSpinnerPosition,
} from "./_section/LoadingSection";
import { type MinTouchMode } from "./_section/AccessibilitySection";
import { type ButtonVariant } from "./_section/BasicsSection";
import {
  type AnimationPreset,
  type DepthMotionPreset,
  type TextMotionPreset,
} from "./_section/MotionSection";
export type FontStyleKey = "normal" | "italic";
export type FontWeightKey = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type TextTransformKey =
  | "none"
  | "uppercase"
  | "lowercase"
  | "capitalize";
import { type AlignKey } from "./_section/TextPositionSection";
import { type PreviewBgMode } from "./_section/PreviewBackgroundSection";
import { type DownloadFormat } from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import { type GroupAlign } from "./_section/GroupPreviewSection";

export type SystemFontItem = { label: string; css: string };

export type TransitionEasing =
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "linear";

export type ActionButtonState = {
  // Basics
  label: string;
  variant: ButtonVariant;
  disabled: boolean;
  loading: boolean;
  animation: AnimationPreset;
  textAnimation: TextMotionPreset;
  depthAnimation: DepthMotionPreset;
  animationDurationText: string;
  animationSpeedText: string;
  animationIntensityText: string;
  animationEasing: TransitionEasing;
  textAnimationStaggerText: string;
  loadingLabel: string;
  loadingSpinnerMode: LoadingSpinnerMode;
  loadingSpinnerPosition: LoadingSpinnerPosition;
  loadingSpinnerSvg: string;

  // Sizing
  widthText: string;
  heightText: string;
  paddingXText: string;
  paddingYText: string;

  // Colors
  useGradient: boolean;
  gradAngleText: string;
  gradStartInput: string;
  gradEndInput: string;
  gradMidEnabled: boolean;
  gradMidInput: string;
  bgInput: string;
  textInput: string;

  // Border
  borderWidthText: string;
  borderStyle: "solid" | "dashed" | "dotted" | "double" | "none";
  borderInput: string;
  borderHoverWidthText: string;
  borderActiveWidthText: string;

  // Disabled Styling
  disabledOpacityText: string;
  disabledCursor: "not-allowed" | "default" | "pointer";
  disabledUseCustomColors: boolean;
  disabledBgInput: string;
  disabledTextInput: string;
  disabledBorderInput: string;
  disabledBorderWidthText: string;
  disabledHoverSuppressed: boolean;
  disabledTextShadowEnabled: boolean;

  // Radius
  linkRadius: boolean;
  radiusText: string;
  radiusTLText: string;
  radiusTRText: string;
  radiusBRText: string;
  radiusBLText: string;

  // Shadow
  shadowEnabled: boolean;
  shXText: string;
  shYText: string;
  shBlurText: string;
  shSpreadText: string;
  shOpacityText: string;
  shColorInput: string;
  shadowTemp: "neutral" | "warm" | "cool";

  // 3D Shadow & Depth
  elevationPreset: "flat" | "raised" | "lifted" | "inset";
  depthText: string;
  lightDirection:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "custom";
  lightAngleText: string;
  shadowStackEnabled: boolean;
  stack1Enabled: boolean;
  stack1XText: string;
  stack1YText: string;
  stack1BlurText: string;
  stack1SpreadText: string;
  stack1OpacityText: string;
  stack2Enabled: boolean;
  stack2XText: string;
  stack2YText: string;
  stack2BlurText: string;
  stack2SpreadText: string;
  stack2OpacityText: string;
  stack3Enabled: boolean;
  stack3XText: string;
  stack3YText: string;
  stack3BlurText: string;
  stack3SpreadText: string;
  stack3OpacityText: string;
  innerShadowEnabled: boolean;
  glossEnabled: boolean;
  glossSizeText: string;
  glossOpacityText: string;
  bevelEnabled: boolean;
  bevelSizeText: string;
  bevelSoftnessText: string;
  materialPreset: "custom" | "plastic" | "matte" | "metal" | "glass";

  // Edge / Glass
  edgeThicknessText: string;
  edgeGradientEnabled: boolean;
  edgeGradientSizeText: string;
  edgeGradientStrengthText: string;
  backdropBlurEnabled: boolean;
  backdropBlurText: string;
  topGradientEnabled: boolean;
  topGradAngleText: string;
  topGradStartInput: string;
  topGradMidEnabled: boolean;
  topGradMidInput: string;
  topGradEndInput: string;
  topGradOpacityText: string;
  parallaxHighlightEnabled: boolean;
  parallaxStrengthText: string;
  rimLightEnabled: boolean;
  rimLightColorInput: string;
  rimLightSizeText: string;
  rimLightOpacityText: string;
  iconEmbossMode: "off" | "raised" | "inset";
  iconEmbossDepthText: string;
  iconEmbossStrengthText: string;
  borderDepthMode: "none" | "raised" | "inset";
  borderDepthSizeText: string;
  baseShadowEnabled: boolean;
  baseShadowSizeText: string;
  baseShadowOpacityText: string;
  pressedDepthText: string;
  pressedInsetEnabled: boolean;
  hoverLiftText: string;
  specularStrengthText: string;
  roughnessText: string;
  aoStrengthText: string;
  hoverTiltXText: string;
  hoverTiltYText: string;
  hoverPerspectiveText: string;

  // Typography
  fontBucket: "system" | "google";
  fontSearch: string;
  systemFontIdx: number;
  googleFontFamily: string;
  fontSizeText: string;
  fontSizeUnit: "px" | "rem";
  fontWeight: FontWeightKey;
  letterSpacingText: string;
  letterSpacingUnit: "px" | "em";
  lineHeightText: string;
  fontStyle: FontStyleKey;
  textTransform: TextTransformKey;
  underline: boolean;
  align: AlignKey;

  // Text Shadow
  textShadowEnabled: boolean;
  tsColorMode: "custom" | "auto" | "contrast";
  tsXText: string;
  tsYText: string;
  tsBlurText: string;
  tsOpacityText: string;
  tsColorInput: string;

  // Icon
  iconName: IconName;
  iconSource: IconSource;
  iconCustomSvg: string;
  iconPosition: "left" | "right";
  iconSizeText: string;
  iconGapText: string;
  iconColorMode: "text" | "custom";
  iconColorInput: string;
  // 3D & Effects
  hoverIconEnabled: boolean;
  hoverIconSource: IconSource;
  hoverIconName: IconName;
  hoverIconCustomSvg: string;
  activeIconEnabled: boolean;
  activeIconSource: IconSource;
  activeIconName: IconName;
  activeIconCustomSvg: string;
  loadingIconEnabled: boolean;
  loadingIconSource: IconSource;
  loadingIconCustomSvg: string;
  loadingIconName: IconName;

  // 3D Engine "Hyper"
  use3DIcon: string;
  icon3DGeometry: string;
  icon3DMaterial: string;
  icon3DAnimation: string;
  iconRoughness: string;
  iconMetalness: string;
  iconTransmission: string;
  iconEmissive: string;
  icon3DColorMode: "text" | "custom";
  icon3DColorInput: string;
  icon3DText: string;
  iconDistortion: string;
  iconThickness: string;
  iconChromaticAberration: string;

  // Motion "Hyper"
  clickEffect: string; // confetti, explosion, shockwave
  clickParticleCount: string;
  hoverEffect: string; // none, magnetic, spotlight, tilt, morph
  hoverSpringStiffness: string;
  hoverSpringDamping: string;

  // Group Preview
  groupEnabled: boolean;
  groupAlign: GroupAlign;
  groupGapText: string;

  // Hover
  hoverEnabled: boolean;
  hoverBgMode: "auto" | "custom" | "gradient";
  hoverBgInput: string;
  hoverGradAngleText: string;
  hoverGradStartInput: string;
  hoverGradMidEnabled: boolean;
  hoverGradMidInput: string;
  hoverGradEndInput: string;
  hoverTextMode: "same" | "custom";
  hoverTextInput: string;
  hoverBorderMode: "same" | "custom";
  hoverBorderInput: string;

  // Active
  activeEnabled: boolean;
  activeTranslateYText: string;
  activeScaleText: string;
  activeBgMode: "same" | "custom" | "gradient";
  activeBgInput: string;
  activeGradAngleText: string;
  activeGradStartInput: string;
  activeGradMidEnabled: boolean;
  activeGradMidInput: string;
  activeGradEndInput: string;
  activeTextMode: "same" | "custom";
  activeTextInput: string;
  activeBorderMode: "same" | "custom";
  activeBorderInput: string;

  // Focus Ring
  focusRingEnabled: boolean;
  focusRingWidthText: string;
  focusRingOffsetText: string;
  focusRingInput: string;

  // Transitions
  transitionColorDurationText: string;
  transitionColorEasing: TransitionEasing;
  transitionTransformDurationText: string;
  transitionTransformEasing: TransitionEasing;

  // Accessibility
  ariaLabel: string;
  ariaPressedMode: "off" | "true" | "false";
  ariaBusyMode: "off" | "auto" | "true" | "false";
  minTouchMode: MinTouchMode;
  minTouchSizeText: string;

  // State Preview
  forceHover: boolean;
  forceActive: boolean;
  forceFocus: boolean;

  // Preview & Export
  previewBgMode: PreviewBgMode;
  previewBgInput: string;
  downloadFormat: DownloadFormat;
  downloadName: string;
};

export type ActionButtonFieldSetter = <Key extends keyof ActionButtonState>(
  key: Key,
) => (
  value:
    | ActionButtonState[Key]
    | ((current: ActionButtonState[Key]) => ActionButtonState[Key]),
) => void;

export const INITIAL_STATE: ActionButtonState = {
  // Basics
  label: "Confirm",
  variant: "solid",
  disabled: false,
  loading: false,
  animation: "none",
  textAnimation: "none",
  depthAnimation: "none",
  animationDurationText: "4200",
  animationSpeedText: "100",
  animationIntensityText: "18",
  animationEasing: "ease-in-out",
  textAnimationStaggerText: "90",
  loadingLabel: "Loading...",
  loadingSpinnerMode: "default",
  loadingSpinnerPosition: "left",
  loadingSpinnerSvg: "",

  // Sizing
  widthText: "220",
  heightText: "44",
  paddingXText: "14",
  paddingYText: "0",

  // Colors
  useGradient: false,
  gradAngleText: "90",
  gradStartInput: "#2563eb",
  gradEndInput: "#8b5cf6",
  gradMidEnabled: false,
  gradMidInput: "#6366f1",
  bgInput: "#111827",
  textInput: "#ffffff",

  // Border
  borderWidthText: "1",
  borderStyle: "solid",
  borderInput: "rgba(0,0,0,0.06)",
  borderHoverWidthText: "1",
  borderActiveWidthText: "1",

  // Disabled Styling
  disabledOpacityText: "0.6",
  disabledCursor: "not-allowed",
  disabledUseCustomColors: false,
  disabledBgInput: "#e5e7eb",
  disabledTextInput: "#9ca3af",
  disabledBorderInput: "rgba(0,0,0,0.08)",
  disabledBorderWidthText: "1",
  disabledHoverSuppressed: true,
  disabledTextShadowEnabled: false,

  // Radius
  linkRadius: true,
  radiusText: "14",
  radiusTLText: "14",
  radiusTRText: "14",
  radiusBRText: "14",
  radiusBLText: "14",

  // Shadow
  shadowEnabled: true,
  shXText: "0",
  shYText: "10",
  shBlurText: "24",
  shSpreadText: "0",
  shOpacityText: "0.10",
  shColorInput: "#000000",
  shadowTemp: "neutral",

  // 3D Shadow & Depth
  elevationPreset: "raised",
  depthText: "8",
  lightDirection: "top-left",
  lightAngleText: "315",
  shadowStackEnabled: false,
  stack1Enabled: true,
  stack1XText: "0",
  stack1YText: "8",
  stack1BlurText: "16",
  stack1SpreadText: "0",
  stack1OpacityText: "0.18",
  stack2Enabled: true,
  stack2XText: "0",
  stack2YText: "3",
  stack2BlurText: "8",
  stack2SpreadText: "0",
  stack2OpacityText: "0.12",
  stack3Enabled: false,
  stack3XText: "0",
  stack3YText: "1",
  stack3BlurText: "4",
  stack3SpreadText: "0",
  stack3OpacityText: "0.08",
  innerShadowEnabled: false,
  glossEnabled: false,
  glossSizeText: "8",
  glossOpacityText: "0.22",
  bevelEnabled: false,
  bevelSizeText: "3",
  bevelSoftnessText: "3",
  materialPreset: "custom",

  // Edge / Glass
  edgeThicknessText: "0",
  edgeGradientEnabled: false,
  edgeGradientSizeText: "2",
  edgeGradientStrengthText: "0.25",
  backdropBlurEnabled: false,
  backdropBlurText: "10",
  topGradientEnabled: false,
  topGradAngleText: "180",
  topGradStartInput: "#ffffff",
  topGradMidEnabled: false,
  topGradMidInput: "#e5e7eb",
  topGradEndInput: "#000000",
  topGradOpacityText: "0.15",
  parallaxHighlightEnabled: false,
  parallaxStrengthText: "0.35",
  rimLightEnabled: false,
  rimLightColorInput: "#93c5fd",
  rimLightSizeText: "10",
  rimLightOpacityText: "0.35",
  iconEmbossMode: "off",
  iconEmbossDepthText: "2",
  iconEmbossStrengthText: "0.6",
  borderDepthMode: "none",
  borderDepthSizeText: "2",
  baseShadowEnabled: false,
  baseShadowSizeText: "10",
  baseShadowOpacityText: "0.22",
  pressedDepthText: "0",
  pressedInsetEnabled: false,
  hoverLiftText: "0",
  specularStrengthText: "1",
  roughnessText: "0",
  aoStrengthText: "0",
  hoverTiltXText: "0",
  hoverTiltYText: "0",
  hoverPerspectiveText: "800",

  // Typography
  fontBucket: "system",
  fontSearch: "",
  systemFontIdx: 0,
  googleFontFamily: "Inter",
  fontSizeText: "14",
  fontSizeUnit: "px",
  fontWeight: 700,
  letterSpacingText: "0.2",
  letterSpacingUnit: "px",
  lineHeightText: "1",
  fontStyle: "normal",
  textTransform: "none",
  underline: false,
  align: "middle-center",

  // Text Shadow
  textShadowEnabled: false,
  tsColorMode: "custom",
  tsXText: "0",
  tsYText: "1",
  tsBlurText: "2",
  tsOpacityText: "0.25",
  tsColorInput: "#000000",

  // Icon
  iconName: "none",
  iconSource: "library",
  iconCustomSvg: "",
  iconPosition: "left",
  iconSizeText: "18",
  iconGapText: "10",
  iconColorMode: "text",
  iconColorInput: "#ffffff",
  hoverIconEnabled: false,
  hoverIconSource: "library",
  hoverIconName: "none",
  hoverIconCustomSvg: "",
  activeIconEnabled: false,
  activeIconSource: "library",
  activeIconName: "none",
  activeIconCustomSvg: "",
  loadingIconEnabled: false,
  loadingIconSource: "library",
  loadingIconName: "none",
  loadingIconCustomSvg: "",

  // Group Preview
  groupEnabled: false,
  groupAlign: "center",
  groupGapText: "12",

  // Hover
  hoverEnabled: true,
  hoverBgMode: "auto",
  hoverBgInput: "#0f172a",
  hoverGradAngleText: "90",
  hoverGradStartInput: "#2563eb",
  hoverGradMidEnabled: false,
  hoverGradMidInput: "#6366f1",
  hoverGradEndInput: "#8b5cf6",
  hoverTextMode: "same",
  hoverTextInput: "#ffffff",
  hoverBorderMode: "same",
  hoverBorderInput: "#2563eb",

  // Active
  activeEnabled: true,
  activeTranslateYText: "1",
  activeScaleText: "0.99",
  activeBgMode: "same",
  activeBgInput: "#0b1220",
  activeGradAngleText: "90",
  activeGradStartInput: "#1d4ed8",
  activeGradMidEnabled: false,
  activeGradMidInput: "#3b82f6",
  activeGradEndInput: "#0ea5e9",
  activeTextMode: "same",
  activeTextInput: "#ffffff",
  activeBorderMode: "same",
  activeBorderInput: "#2563eb",

  // Focus Ring
  focusRingEnabled: true,
  focusRingWidthText: "4",
  focusRingOffsetText: "2",
  focusRingInput: "#60a5fa",

  // Transitions
  transitionColorDurationText: "160",
  transitionColorEasing: "ease",
  transitionTransformDurationText: "120",
  transitionTransformEasing: "ease",

  // Accessibility
  ariaLabel: "",
  ariaPressedMode: "off",
  ariaBusyMode: "off",
  minTouchMode: "off",
  minTouchSizeText: "44",

  // State Preview
  forceHover: false,
  forceActive: false,
  forceFocus: false,

  // Preview & Export
  previewBgMode: "white",
  previewBgInput: "#0b1220",
  downloadFormat: "react",
  downloadName: "action-button",
  // 3D & Effects
  use3DIcon: "none",
  icon3DGeometry: "star",
  icon3DMaterial: "metal",
  icon3DAnimation: "spin",
  iconRoughness: "0.2",
  iconMetalness: "0.6",
  iconTransmission: "0.9",
  iconEmissive: "0",
  icon3DColorMode: "text",
  icon3DColorInput: "#ffffff",
  icon3DText: "⭐",
  iconDistortion: "0.5",
  iconThickness: "1",
  iconChromaticAberration: "0.1",

  clickEffect: "none",
  clickParticleCount: "50",
  hoverEffect: "none",
  hoverSpringStiffness: "300",
  hoverSpringDamping: "20",
};
