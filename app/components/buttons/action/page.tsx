"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import AppShell from "@/components/layout/AppShell";
import useHydrated from "@/components/hooks/useHydrated";

// --- Section Imports ---
import BasicsSection, {
  type ButtonVariant,
  type AnimationPreset,
} from "./_section/BasicsSection";
import SizingSection from "./_section/SizingSection";
import ColorsSection from "./_section/ColorsSection";
import BorderSection from "./_section/BorderSection";
import RadiusSection from "./_section/RadiusSection";
import ShadowSection from "./_section/ShadowSection";
import TypographySection, {
  type FontStyleKey,
  type FontWeightKey,
  type TextTransformKey,
} from "./_section/TypographySection";
import TextPositionSection, {
  type AlignKey,
} from "./_section/TextPositionSection";
import TextShadowSection from "./_section/TextShadowSection";
import IconSection, {
  type IconName,
  type IconSource,
} from "./_section/IconSection";
import OutlineGhostPresetsSection from "./_section/OutlineGhostPresetsSection";
import GroupPreviewSection, {
  type GroupAlign,
} from "./_section/GroupPreviewSection";
import HoverSection from "./_section/HoverSection";
import ActiveStateSection from "./_section/ActiveStateSection";
import FocusRingSection from "./_section/FocusRingSection";
import PreviewBackgroundSection, {
  type PreviewBgMode,
} from "./_section/PreviewBackgroundSection";
import PreviewDownloadPanel, {
  type DownloadFormat,
} from "./_section/PreviewDownloadPanel";
import LoadingSection, {
  type LoadingSpinnerMode,
  type LoadingSpinnerPosition,
} from "./_section/LoadingSection";
import DisabledSection from "./_section/DisabledSection";
import AccessibilitySection, {
  type MinTouchMode,
} from "./_section/AccessibilitySection";
import StatePreviewSection from "./_section/StatePreviewSection";
import ThreeJSSection, {
  type ThreeDIconMode,
  type ThreeDAnimation,
  type ClickEffect,
} from "./_section/ThreeJSSection";

import {
  PALETTE,
  SYSTEM_FONTS,
  GOOGLE_FONTS,
  ICONS_SVG,
} from "./_data/buttonConstants";
import LivePreview from "./_section/LivePreview";
import {
  buildGradient,
  clamp,
  contrastHex,
  contrastRatio,
  hexWithAlpha,
  norm,
} from "./_utils/colorUtils";
import { buildExportPayload } from "./_utils/exportUtils";
import { PREVIEW_SRC_DOC } from "./_utils/previewDoc";
import { useHistoryState } from "../../../hooks/useHistoryState";

type ActionButtonState = {
  // Basics
  label: string;
  variant: ButtonVariant;
  disabled: boolean;
  loading: boolean;
  animation: AnimationPreset;
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

type TransitionEasing =
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "linear";

const INITIAL_STATE: ActionButtonState = {
  // Basics
  label: "Confirm",
  variant: "solid",
  disabled: false,
  loading: false,
  animation: "none",
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
  downloadFormat: "html",
  downloadName: "action-button",
  // 3D & Effects (Missing in INITIAL_STATE)
  // 3D Engine "Hyper"
  use3DIcon: "none",
  icon3DGeometry: "cube",
  icon3DMaterial: "glass",
  icon3DAnimation: "spin",
  iconRoughness: "0.2",
  iconMetalness: "0.8",
  iconTransmission: "0.9",
  iconEmissive: "0.5",
  icon3DColorMode: "text",
  icon3DColorInput: "#FFD700",
  iconDistortion: "0.5",
  iconThickness: "1",
  iconChromaticAberration: "0.1",

  // Motion "Hyper"
  clickEffect: "none",
  clickParticleCount: "50",
  hoverEffect: "none",
  hoverSpringStiffness: "300",
  hoverSpringDamping: "20",
};

export default function ActionButtonPage() {
  const mounted = useHydrated();
  const [activeSection, setActiveSection] = useState("basics");
  const [isDesktop, setIsDesktop] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(520);
  const splitRef = useRef<HTMLDivElement>(null);

  // Initialize unified history state
  const {
    state,
    set: updateState,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistoryState<ActionButtonState>(INITIAL_STATE);

  // Destructure for easy access (read-only)
  const {
    label,
    variant,
    disabled,
    loading,
    animation,
    loadingLabel,
    loadingSpinnerMode,
    loadingSpinnerPosition,
    loadingSpinnerSvg,
    widthText,
    heightText,
    paddingXText,
    paddingYText,
    useGradient,
    gradAngleText,
    gradStartInput,
    gradEndInput,
    gradMidEnabled,
    gradMidInput,
    bgInput,
    textInput,
    borderWidthText,
    borderStyle,
    borderInput,
    borderHoverWidthText,
    borderActiveWidthText,
    disabledOpacityText,
    disabledCursor,
    disabledUseCustomColors,
    disabledBgInput,
    disabledTextInput,
    disabledBorderInput,
    disabledBorderWidthText,
    disabledHoverSuppressed,
    disabledTextShadowEnabled,
    linkRadius,
    radiusText,
    radiusTLText,
    radiusTRText,
    radiusBRText,
    radiusBLText,
    shadowEnabled,
    shXText,
    shYText,
    shBlurText,
    shSpreadText,
    shOpacityText,
    shColorInput,
    shadowTemp,
    elevationPreset,
    depthText,
    lightDirection,
    lightAngleText,
    shadowStackEnabled,
    stack1Enabled,
    stack1XText,
    stack1YText,
    stack1BlurText,
    stack1SpreadText,
    stack1OpacityText,
    stack2Enabled,
    stack2XText,
    stack2YText,
    stack2BlurText,
    stack2SpreadText,
    stack2OpacityText,
    stack3Enabled,
    stack3XText,
    stack3YText,
    stack3BlurText,
    stack3SpreadText,
    stack3OpacityText,
    innerShadowEnabled,
    glossEnabled,
    glossSizeText,
    glossOpacityText,
    bevelEnabled,
    bevelSizeText,
    bevelSoftnessText,
    materialPreset,
    edgeThicknessText,
    edgeGradientEnabled,
    edgeGradientSizeText,
    edgeGradientStrengthText,
    backdropBlurEnabled,
    backdropBlurText,
    topGradientEnabled,
    topGradAngleText,
    topGradStartInput,
    topGradMidEnabled,
    topGradMidInput,
    topGradEndInput,
    topGradOpacityText,
    parallaxHighlightEnabled,
    parallaxStrengthText,
    rimLightEnabled,
    rimLightColorInput,
    rimLightSizeText,
    rimLightOpacityText,
    iconEmbossMode,
    iconEmbossDepthText,
    iconEmbossStrengthText,
    borderDepthMode,
    borderDepthSizeText,
    baseShadowEnabled,
    baseShadowSizeText,
    baseShadowOpacityText,
    pressedDepthText,
    pressedInsetEnabled,
    hoverLiftText,
    specularStrengthText,
    roughnessText,
    aoStrengthText,
    hoverTiltXText,
    hoverTiltYText,
    hoverPerspectiveText,
    fontBucket,
    fontSearch,
    systemFontIdx,
    googleFontFamily,
    fontSizeText,
    fontSizeUnit,
    fontWeight,
    letterSpacingText,
    letterSpacingUnit,
    lineHeightText,
    fontStyle,
    textTransform,
    underline,
    align,
    textShadowEnabled,
    tsColorMode,
    tsXText,
    tsYText,
    tsBlurText,
    tsOpacityText,
    tsColorInput,
    iconName,
    iconSource,
    iconCustomSvg,
    iconPosition,
    iconSizeText,
    iconGapText,
    iconColorMode,
    iconColorInput,
    hoverIconEnabled,
    hoverIconSource,
    hoverIconName,
    hoverIconCustomSvg,
    activeIconEnabled,
    activeIconSource,
    activeIconName,
    activeIconCustomSvg,
    loadingIconEnabled,
    loadingIconSource,
    loadingIconName,
    loadingIconCustomSvg,
    use3DIcon,
    icon3DGeometry,
    icon3DMaterial,
    icon3DAnimation,
    icon3DColorMode,
    icon3DColorInput,
    iconRoughness,

    iconMetalness,
    iconTransmission,
    iconEmissive,
    iconDistortion,
    iconThickness,
    iconChromaticAberration,
    clickEffect,
    clickParticleCount,
    hoverEffect,
    hoverSpringStiffness,
    hoverSpringDamping,
    groupEnabled,
    groupAlign,
    groupGapText,
    hoverEnabled,
    hoverBgMode,
    hoverBgInput,
    hoverGradAngleText,
    hoverGradStartInput,
    hoverGradMidEnabled,
    hoverGradMidInput,
    hoverGradEndInput,
    hoverTextMode,
    hoverTextInput,
    hoverBorderMode,
    hoverBorderInput,
    activeEnabled,
    activeTranslateYText,
    activeScaleText,
    activeBgMode,
    activeBgInput,
    activeGradAngleText,
    activeGradStartInput,
    activeGradMidEnabled,
    activeGradMidInput,
    activeGradEndInput,
    activeTextMode,
    activeTextInput,
    activeBorderMode,
    activeBorderInput,
    focusRingEnabled,
    focusRingWidthText,
    focusRingOffsetText,
    focusRingInput,
    transitionColorDurationText,
    transitionColorEasing,
    transitionTransformDurationText,
    transitionTransformEasing,
    ariaLabel,
    ariaPressedMode,
    ariaBusyMode,
    minTouchMode,
    minTouchSizeText,
    forceHover,
    forceActive,
    forceFocus,
    previewBgMode,
    previewBgInput,
    downloadFormat,
    downloadName,
  } = state;

  // --- Proxy Setters ---
  const setLabel = (v: any) =>
    updateState((s) => ({
      ...s,
      label: v instanceof Function ? v(s.label) : v,
    }));
  const setVariant = (v: any) =>
    updateState((s) => ({
      ...s,
      variant: v instanceof Function ? v(s.variant) : v,
    }));
  const setDisabled = (v: any) =>
    updateState((s) => ({
      ...s,
      disabled: v instanceof Function ? v(s.disabled) : v,
    }));
  const setLoading = (v: any) =>
    updateState((s) => ({
      ...s,
      loading: v instanceof Function ? v(s.loading) : v,
    }));
  const setAnimation = (v: any) =>
    updateState((s) => ({
      ...s,
      animation: v instanceof Function ? v(s.animation) : v,
    }));
  const setLoadingLabel = (v: any) =>
    updateState((s) => ({
      ...s,
      loadingLabel: v instanceof Function ? v(s.loadingLabel) : v,
    }));
  const setLoadingSpinnerMode = (v: any) =>
    updateState((s) => ({
      ...s,
      loadingSpinnerMode: v instanceof Function ? v(s.loadingSpinnerMode) : v,
    }));
  const setLoadingSpinnerPosition = (v: any) =>
    updateState((s) => ({
      ...s,
      loadingSpinnerPosition:
        v instanceof Function ? v(s.loadingSpinnerPosition) : v,
    }));
  const setLoadingSpinnerSvg = (v: any) =>
    updateState((s) => ({
      ...s,
      loadingSpinnerSvg: v instanceof Function ? v(s.loadingSpinnerSvg) : v,
    }));

  const setWidthText = (v: any) =>
    updateState((s) => ({
      ...s,
      widthText: v instanceof Function ? v(s.widthText) : v,
    }));
  const setHeightText = (v: any) =>
    updateState((s) => ({
      ...s,
      heightText: v instanceof Function ? v(s.heightText) : v,
    }));
  const setPaddingXText = (v: any) =>
    updateState((s) => ({
      ...s,
      paddingXText: v instanceof Function ? v(s.paddingXText) : v,
    }));
  const setPaddingYText = (v: any) =>
    updateState((s) => ({
      ...s,
      paddingYText: v instanceof Function ? v(s.paddingYText) : v,
    }));

  const setUseGradient = (v: any) =>
    updateState((s) => ({
      ...s,
      useGradient: v instanceof Function ? v(s.useGradient) : v,
    }));
  const setGradAngleText = (v: any) =>
    updateState((s) => ({
      ...s,
      gradAngleText: v instanceof Function ? v(s.gradAngleText) : v,
    }));
  const setGradStartInput = (v: any) =>
    updateState((s) => ({
      ...s,
      gradStartInput: v instanceof Function ? v(s.gradStartInput) : v,
    }));
  const setGradEndInput = (v: any) =>
    updateState((s) => ({
      ...s,
      gradEndInput: v instanceof Function ? v(s.gradEndInput) : v,
    }));
  const setGradMidEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      gradMidEnabled: v instanceof Function ? v(s.gradMidEnabled) : v,
    }));
  const setGradMidInput = (v: any) =>
    updateState((s) => ({
      ...s,
      gradMidInput: v instanceof Function ? v(s.gradMidInput) : v,
    }));
  const setBgInput = (v: any) =>
    updateState((s) => ({
      ...s,
      bgInput: v instanceof Function ? v(s.bgInput) : v,
    }));
  const setTextInput = (v: any) =>
    updateState((s) => ({
      ...s,
      textInput: v instanceof Function ? v(s.textInput) : v,
    }));

  const setBorderWidthText = (v: any) =>
    updateState((s) => ({
      ...s,
      borderWidthText: v instanceof Function ? v(s.borderWidthText) : v,
    }));
  const setBorderStyle = (v: any) =>
    updateState((s) => ({
      ...s,
      borderStyle: v instanceof Function ? v(s.borderStyle) : v,
    }));
  const setBorderInput = (v: any) =>
    updateState((s) => ({
      ...s,
      borderInput: v instanceof Function ? v(s.borderInput) : v,
    }));
  const setBorderHoverWidthText = (v: any) =>
    updateState((s) => ({
      ...s,
      borderHoverWidthText:
        v instanceof Function ? v(s.borderHoverWidthText) : v,
    }));
  const setBorderActiveWidthText = (v: any) =>
    updateState((s) => ({
      ...s,
      borderActiveWidthText:
        v instanceof Function ? v(s.borderActiveWidthText) : v,
    }));

  const setDisabledOpacityText = (v: any) =>
    updateState((s) => ({
      ...s,
      disabledOpacityText: v instanceof Function ? v(s.disabledOpacityText) : v,
    }));
  const setDisabledCursor = (v: any) =>
    updateState((s) => ({
      ...s,
      disabledCursor: v instanceof Function ? v(s.disabledCursor) : v,
    }));
  const setDisabledUseCustomColors = (v: any) =>
    updateState((s) => ({
      ...s,
      disabledUseCustomColors:
        v instanceof Function ? v(s.disabledUseCustomColors) : v,
    }));
  const setDisabledBgInput = (v: any) =>
    updateState((s) => ({
      ...s,
      disabledBgInput: v instanceof Function ? v(s.disabledBgInput) : v,
    }));
  const setDisabledTextInput = (v: any) =>
    updateState((s) => ({
      ...s,
      disabledTextInput: v instanceof Function ? v(s.disabledTextInput) : v,
    }));
  const setDisabledBorderInput = (v: any) =>
    updateState((s) => ({
      ...s,
      disabledBorderInput: v instanceof Function ? v(s.disabledBorderInput) : v,
    }));
  const setDisabledBorderWidthText = (v: any) =>
    updateState((s) => ({
      ...s,
      disabledBorderWidthText:
        v instanceof Function ? v(s.disabledBorderWidthText) : v,
    }));
  const setDisabledHoverSuppressed = (v: any) =>
    updateState((s) => ({
      ...s,
      disabledHoverSuppressed:
        v instanceof Function ? v(s.disabledHoverSuppressed) : v,
    }));
  const setDisabledTextShadowEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      disabledTextShadowEnabled:
        v instanceof Function ? v(s.disabledTextShadowEnabled) : v,
    }));

  const setLinkRadius = (v: any) =>
    updateState((s) => ({
      ...s,
      linkRadius: v instanceof Function ? v(s.linkRadius) : v,
    }));
  const setRadiusText = (v: any) =>
    updateState((s) => ({
      ...s,
      radiusText: v instanceof Function ? v(s.radiusText) : v,
    }));
  const setRadiusTLText = (v: any) =>
    updateState((s) => ({
      ...s,
      radiusTLText: v instanceof Function ? v(s.radiusTLText) : v,
    }));
  const setRadiusTRText = (v: any) =>
    updateState((s) => ({
      ...s,
      radiusTRText: v instanceof Function ? v(s.radiusTRText) : v,
    }));
  const setRadiusBRText = (v: any) =>
    updateState((s) => ({
      ...s,
      radiusBRText: v instanceof Function ? v(s.radiusBRText) : v,
    }));
  const setRadiusBLText = (v: any) =>
    updateState((s) => ({
      ...s,
      radiusBLText: v instanceof Function ? v(s.radiusBLText) : v,
    }));

  const setShadowEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      shadowEnabled: v instanceof Function ? v(s.shadowEnabled) : v,
    }));
  const setShXText = (v: any) =>
    updateState((s) => ({
      ...s,
      shXText: v instanceof Function ? v(s.shXText) : v,
    }));
  const setShYText = (v: any) =>
    updateState((s) => ({
      ...s,
      shYText: v instanceof Function ? v(s.shYText) : v,
    }));
  const setShBlurText = (v: any) =>
    updateState((s) => ({
      ...s,
      shBlurText: v instanceof Function ? v(s.shBlurText) : v,
    }));
  const setShSpreadText = (v: any) =>
    updateState((s) => ({
      ...s,
      shSpreadText: v instanceof Function ? v(s.shSpreadText) : v,
    }));
  const setShOpacityText = (v: any) =>
    updateState((s) => ({
      ...s,
      shOpacityText: v instanceof Function ? v(s.shOpacityText) : v,
    }));
  const setShColorInput = (v: any) =>
    updateState((s) => ({
      ...s,
      shColorInput: v instanceof Function ? v(s.shColorInput) : v,
    }));
  const setShadowTemp = (v: any) =>
    updateState((s) => ({
      ...s,
      shadowTemp: v instanceof Function ? v(s.shadowTemp) : v,
    }));

  const setElevationPreset = (v: any) =>
    updateState((s) => ({
      ...s,
      elevationPreset: v instanceof Function ? v(s.elevationPreset) : v,
    }));
  const setDepthText = (v: any) =>
    updateState((s) => ({
      ...s,
      depthText: v instanceof Function ? v(s.depthText) : v,
    }));
  const setLightDirection = (v: any) =>
    updateState((s) => ({
      ...s,
      lightDirection: v instanceof Function ? v(s.lightDirection) : v,
    }));
  const setLightAngleText = (v: any) =>
    updateState((s) => ({
      ...s,
      lightAngleText: v instanceof Function ? v(s.lightAngleText) : v,
    }));
  const setShadowStackEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      shadowStackEnabled: v instanceof Function ? v(s.shadowStackEnabled) : v,
    }));
  const setStack1Enabled = (v: any) =>
    updateState((s) => ({
      ...s,
      stack1Enabled: v instanceof Function ? v(s.stack1Enabled) : v,
    }));
  const setStack1XText = (v: any) =>
    updateState((s) => ({
      ...s,
      stack1XText: v instanceof Function ? v(s.stack1XText) : v,
    }));
  const setStack1YText = (v: any) =>
    updateState((s) => ({
      ...s,
      stack1YText: v instanceof Function ? v(s.stack1YText) : v,
    }));
  const setStack1BlurText = (v: any) =>
    updateState((s) => ({
      ...s,
      stack1BlurText: v instanceof Function ? v(s.stack1BlurText) : v,
    }));
  const setStack1SpreadText = (v: any) =>
    updateState((s) => ({
      ...s,
      stack1SpreadText: v instanceof Function ? v(s.stack1SpreadText) : v,
    }));
  const setStack1OpacityText = (v: any) =>
    updateState((s) => ({
      ...s,
      stack1OpacityText: v instanceof Function ? v(s.stack1OpacityText) : v,
    }));
  const setStack2Enabled = (v: any) =>
    updateState((s) => ({
      ...s,
      stack2Enabled: v instanceof Function ? v(s.stack2Enabled) : v,
    }));
  const setStack2XText = (v: any) =>
    updateState((s) => ({
      ...s,
      stack2XText: v instanceof Function ? v(s.stack2XText) : v,
    }));
  const setStack2YText = (v: any) =>
    updateState((s) => ({
      ...s,
      stack2YText: v instanceof Function ? v(s.stack2YText) : v,
    }));
  const setStack2BlurText = (v: any) =>
    updateState((s) => ({
      ...s,
      stack2BlurText: v instanceof Function ? v(s.stack2BlurText) : v,
    }));
  const setStack2SpreadText = (v: any) =>
    updateState((s) => ({
      ...s,
      stack2SpreadText: v instanceof Function ? v(s.stack2SpreadText) : v,
    }));
  const setStack2OpacityText = (v: any) =>
    updateState((s) => ({
      ...s,
      stack2OpacityText: v instanceof Function ? v(s.stack2OpacityText) : v,
    }));
  const setStack3Enabled = (v: any) =>
    updateState((s) => ({
      ...s,
      stack3Enabled: v instanceof Function ? v(s.stack3Enabled) : v,
    }));
  const setStack3XText = (v: any) =>
    updateState((s) => ({
      ...s,
      stack3XText: v instanceof Function ? v(s.stack3XText) : v,
    }));
  const setStack3YText = (v: any) =>
    updateState((s) => ({
      ...s,
      stack3YText: v instanceof Function ? v(s.stack3YText) : v,
    }));
  const setStack3BlurText = (v: any) =>
    updateState((s) => ({
      ...s,
      stack3BlurText: v instanceof Function ? v(s.stack3BlurText) : v,
    }));
  const setStack3SpreadText = (v: any) =>
    updateState((s) => ({
      ...s,
      stack3SpreadText: v instanceof Function ? v(s.stack3SpreadText) : v,
    }));
  const setStack3OpacityText = (v: any) =>
    updateState((s) => ({
      ...s,
      stack3OpacityText: v instanceof Function ? v(s.stack3OpacityText) : v,
    }));
  const setInnerShadowEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      innerShadowEnabled: v instanceof Function ? v(s.innerShadowEnabled) : v,
    }));
  const setGlossEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      glossEnabled: v instanceof Function ? v(s.glossEnabled) : v,
    }));
  const setGlossSizeText = (v: any) =>
    updateState((s) => ({
      ...s,
      glossSizeText: v instanceof Function ? v(s.glossSizeText) : v,
    }));
  const setGlossOpacityText = (v: any) =>
    updateState((s) => ({
      ...s,
      glossOpacityText: v instanceof Function ? v(s.glossOpacityText) : v,
    }));
  const setBevelEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      bevelEnabled: v instanceof Function ? v(s.bevelEnabled) : v,
    }));
  const setBevelSizeText = (v: any) =>
    updateState((s) => ({
      ...s,
      bevelSizeText: v instanceof Function ? v(s.bevelSizeText) : v,
    }));
  const setBevelSoftnessText = (v: any) =>
    updateState((s) => ({
      ...s,
      bevelSoftnessText: v instanceof Function ? v(s.bevelSoftnessText) : v,
    }));
  const setMaterialPreset = (v: any) =>
    updateState((s) => ({
      ...s,
      materialPreset: v instanceof Function ? v(s.materialPreset) : v,
    }));

  const setEdgeThicknessText = (v: any) =>
    updateState((s) => ({
      ...s,
      edgeThicknessText: v instanceof Function ? v(s.edgeThicknessText) : v,
    }));
  const setEdgeGradientEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      edgeGradientEnabled: v instanceof Function ? v(s.edgeGradientEnabled) : v,
    }));
  const setEdgeGradientSizeText = (v: any) =>
    updateState((s) => ({
      ...s,
      edgeGradientSizeText:
        v instanceof Function ? v(s.edgeGradientSizeText) : v,
    }));
  const setEdgeGradientStrengthText = (v: any) =>
    updateState((s) => ({
      ...s,
      edgeGradientStrengthText:
        v instanceof Function ? v(s.edgeGradientStrengthText) : v,
    }));
  const setBackdropBlurEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      backdropBlurEnabled: v instanceof Function ? v(s.backdropBlurEnabled) : v,
    }));
  const setBackdropBlurText = (v: any) =>
    updateState((s) => ({
      ...s,
      backdropBlurText: v instanceof Function ? v(s.backdropBlurText) : v,
    }));
  const setTopGradientEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      topGradientEnabled: v instanceof Function ? v(s.topGradientEnabled) : v,
    }));
  const setTopGradAngleText = (v: any) =>
    updateState((s) => ({
      ...s,
      topGradAngleText: v instanceof Function ? v(s.topGradAngleText) : v,
    }));
  const setTopGradStartInput = (v: any) =>
    updateState((s) => ({
      ...s,
      topGradStartInput: v instanceof Function ? v(s.topGradStartInput) : v,
    }));
  const setTopGradMidEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      topGradMidEnabled: v instanceof Function ? v(s.topGradMidEnabled) : v,
    }));
  const setTopGradMidInput = (v: any) =>
    updateState((s) => ({
      ...s,
      topGradMidInput: v instanceof Function ? v(s.topGradMidInput) : v,
    }));
  const setTopGradEndInput = (v: any) =>
    updateState((s) => ({
      ...s,
      topGradEndInput: v instanceof Function ? v(s.topGradEndInput) : v,
    }));
  const setTopGradOpacityText = (v: any) =>
    updateState((s) => ({
      ...s,
      topGradOpacityText: v instanceof Function ? v(s.topGradOpacityText) : v,
    }));
  const setParallaxHighlightEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      parallaxHighlightEnabled:
        v instanceof Function ? v(s.parallaxHighlightEnabled) : v,
    }));
  const setParallaxStrengthText = (v: any) =>
    updateState((s) => ({
      ...s,
      parallaxStrengthText:
        v instanceof Function ? v(s.parallaxStrengthText) : v,
    }));
  const setRimLightEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      rimLightEnabled: v instanceof Function ? v(s.rimLightEnabled) : v,
    }));
  const setRimLightColorInput = (v: any) =>
    updateState((s) => ({
      ...s,
      rimLightColorInput: v instanceof Function ? v(s.rimLightColorInput) : v,
    }));
  const setRimLightSizeText = (v: any) =>
    updateState((s) => ({
      ...s,
      rimLightSizeText: v instanceof Function ? v(s.rimLightSizeText) : v,
    }));
  const setRimLightOpacityText = (v: any) =>
    updateState((s) => ({
      ...s,
      rimLightOpacityText: v instanceof Function ? v(s.rimLightOpacityText) : v,
    }));
  const setIconEmbossMode = (v: any) =>
    updateState((s) => ({
      ...s,
      iconEmbossMode: v instanceof Function ? v(s.iconEmbossMode) : v,
    }));
  const setIconEmbossDepthText = (v: any) =>
    updateState((s) => ({
      ...s,
      iconEmbossDepthText: v instanceof Function ? v(s.iconEmbossDepthText) : v,
    }));
  const setIconEmbossStrengthText = (v: any) =>
    updateState((s) => ({
      ...s,
      iconEmbossStrengthText:
        v instanceof Function ? v(s.iconEmbossStrengthText) : v,
    }));
  const setBorderDepthMode = (v: any) =>
    updateState((s) => ({
      ...s,
      borderDepthMode: v instanceof Function ? v(s.borderDepthMode) : v,
    }));
  const setBorderDepthSizeText = (v: any) =>
    updateState((s) => ({
      ...s,
      borderDepthSizeText: v instanceof Function ? v(s.borderDepthSizeText) : v,
    }));
  const setBaseShadowEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      baseShadowEnabled: v instanceof Function ? v(s.baseShadowEnabled) : v,
    }));
  const setBaseShadowSizeText = (v: any) =>
    updateState((s) => ({
      ...s,
      baseShadowSizeText: v instanceof Function ? v(s.baseShadowSizeText) : v,
    }));
  const setBaseShadowOpacityText = (v: any) =>
    updateState((s) => ({
      ...s,
      baseShadowOpacityText:
        v instanceof Function ? v(s.baseShadowOpacityText) : v,
    }));
  const setPressedDepthText = (v: any) =>
    updateState((s) => ({
      ...s,
      pressedDepthText: v instanceof Function ? v(s.pressedDepthText) : v,
    }));
  const setPressedInsetEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      pressedInsetEnabled: v instanceof Function ? v(s.pressedInsetEnabled) : v,
    }));
  const setHoverLiftText = (v: any) =>
    updateState((s) => ({
      ...s,
      hoverLiftText: v instanceof Function ? v(s.hoverLiftText) : v,
    }));
  const setSpecularStrengthText = (v: any) =>
    updateState((s) => ({
      ...s,
      specularStrengthText:
        v instanceof Function ? v(s.specularStrengthText) : v,
    }));
  const setRoughnessText = (v: any) =>
    updateState((s) => ({
      ...s,
      roughnessText: v instanceof Function ? v(s.roughnessText) : v,
    }));
  const setUse3DIcon = (v: any) =>
    updateState((s) => ({
      ...s,
      use3DIcon: v instanceof Function ? v(s.use3DIcon) : v,
    }));
  const setIcon3DAnimation = (v: any) =>
    updateState((s) => ({
      ...s,
      icon3DAnimation: v instanceof Function ? v(s.icon3DAnimation) : v,
    }));
  const setClickEffect = (v: any) =>
    updateState((s) => ({
      ...s,
      clickEffect: v instanceof Function ? v(s.clickEffect) : v,
    }));
  const setIcon3DGeometry = (v: any) =>
    updateState((s) => ({
      ...s,
      icon3DGeometry: v instanceof Function ? v(s.icon3DGeometry) : v,
    }));
  const setIcon3DMaterial = (v: any) =>
    updateState((s) => ({
      ...s,
      icon3DMaterial: v instanceof Function ? v(s.icon3DMaterial) : v,
    }));
  const setIconRoughness = (v: any) =>
    updateState((s) => ({
      ...s,
      iconRoughness: v instanceof Function ? v(s.iconRoughness) : v,
    }));
  const setIconMetalness = (v: any) =>
    updateState((s) => ({
      ...s,
      iconMetalness: v instanceof Function ? v(s.iconMetalness) : v,
    }));
  const setIconTransmission = (v: any) =>
    updateState((s) => ({
      ...s,
      iconTransmission: v instanceof Function ? v(s.iconTransmission) : v,
    }));
  const setIconEmissive = (v: any) =>
    updateState((s) => ({
      ...s,
      iconEmissive: v instanceof Function ? v(s.iconEmissive) : v,
    }));
  const setIcon3DColorMode = (v: any) =>
    updateState((s) => ({
      ...s,
      icon3DColorMode: v instanceof Function ? v(s.icon3DColorMode) : v,
    }));
  const setIcon3DColorInput = (v: any) =>
    updateState((s) => ({
      ...s,
      icon3DColorInput: v instanceof Function ? v(s.icon3DColorInput) : v,
    }));
  const setIconDistortion = (v: any) =>
    updateState((s) => ({
      ...s,
      iconDistortion: v instanceof Function ? v(s.iconDistortion) : v,
    }));
  const setIconThickness = (v: any) =>
    updateState((s) => ({
      ...s,
      iconThickness: v instanceof Function ? v(s.iconThickness) : v,
    }));
  const setIconChromaticAberration = (v: any) =>
    updateState((s) => ({
      ...s,
      iconChromaticAberration:
        v instanceof Function ? v(s.iconChromaticAberration) : v,
    }));
  const setClickParticleCount = (v: any) =>
    updateState((s) => ({
      ...s,
      clickParticleCount: v instanceof Function ? v(s.clickParticleCount) : v,
    }));
  const setHoverEffect = (v: any) =>
    updateState((s) => ({
      ...s,
      hoverEffect: v instanceof Function ? v(s.hoverEffect) : v,
    }));
  const setHoverSpringStiffness = (v: any) =>
    updateState((s) => ({
      ...s,
      hoverSpringStiffness:
        v instanceof Function ? v(s.hoverSpringStiffness) : v,
    }));
  const setHoverSpringDamping = (v: any) =>
    updateState((s) => ({
      ...s,
      hoverSpringDamping: v instanceof Function ? v(s.hoverSpringDamping) : v,
    }));
  const setAoStrengthText = (v: any) =>
    updateState((s) => ({
      ...s,
      aoStrengthText: v instanceof Function ? v(s.aoStrengthText) : v,
    }));
  const setHoverTiltXText = (v: any) =>
    updateState((s) => ({
      ...s,
      hoverTiltXText: v instanceof Function ? v(s.hoverTiltXText) : v,
    }));
  const setHoverTiltYText = (v: any) =>
    updateState((s) => ({
      ...s,
      hoverTiltYText: v instanceof Function ? v(s.hoverTiltYText) : v,
    }));
  const setHoverPerspectiveText = (v: any) =>
    updateState((s) => ({
      ...s,
      hoverPerspectiveText:
        v instanceof Function ? v(s.hoverPerspectiveText) : v,
    }));

  const setFontBucket = (v: any) =>
    updateState((s) => ({
      ...s,
      fontBucket: v instanceof Function ? v(s.fontBucket) : v,
    }));
  const setFontSearch = (v: any) =>
    updateState((s) => ({
      ...s,
      fontSearch: v instanceof Function ? v(s.fontSearch) : v,
    }));
  const setSystemFontIdx = (v: any) =>
    updateState((s) => ({
      ...s,
      systemFontIdx: v instanceof Function ? v(s.systemFontIdx) : v,
    }));
  const setGoogleFontFamily = (v: any) =>
    updateState((s) => ({
      ...s,
      googleFontFamily: v instanceof Function ? v(s.googleFontFamily) : v,
    }));
  const setFontSizeText = (v: any) =>
    updateState((s) => ({
      ...s,
      fontSizeText: v instanceof Function ? v(s.fontSizeText) : v,
    }));
  const setFontSizeUnit = (v: any) =>
    updateState((s) => ({
      ...s,
      fontSizeUnit: v instanceof Function ? v(s.fontSizeUnit) : v,
    }));
  const setFontWeight = (v: any) =>
    updateState((s) => ({
      ...s,
      fontWeight: v instanceof Function ? v(s.fontWeight) : v,
    }));
  const setLetterSpacingText = (v: any) =>
    updateState((s) => ({
      ...s,
      letterSpacingText: v instanceof Function ? v(s.letterSpacingText) : v,
    }));
  const setLetterSpacingUnit = (v: any) =>
    updateState((s) => ({
      ...s,
      letterSpacingUnit: v instanceof Function ? v(s.letterSpacingUnit) : v,
    }));
  const setLineHeightText = (v: any) =>
    updateState((s) => ({
      ...s,
      lineHeightText: v instanceof Function ? v(s.lineHeightText) : v,
    }));
  const setFontStyle = (v: any) =>
    updateState((s) => ({
      ...s,
      fontStyle: v instanceof Function ? v(s.fontStyle) : v,
    }));
  const setTextTransform = (v: any) =>
    updateState((s) => ({
      ...s,
      textTransform: v instanceof Function ? v(s.textTransform) : v,
    }));
  const setUnderline = (v: any) =>
    updateState((s) => ({
      ...s,
      underline: v instanceof Function ? v(s.underline) : v,
    }));
  const setAlign = (v: any) =>
    updateState((s) => ({
      ...s,
      align: v instanceof Function ? v(s.align) : v,
    }));

  const setTextShadowEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      textShadowEnabled: v instanceof Function ? v(s.textShadowEnabled) : v,
    }));
  const setTsColorMode = (v: any) =>
    updateState((s) => ({
      ...s,
      tsColorMode: v instanceof Function ? v(s.tsColorMode) : v,
    }));
  const setTsXText = (v: any) =>
    updateState((s) => ({
      ...s,
      tsXText: v instanceof Function ? v(s.tsXText) : v,
    }));
  const setTsYText = (v: any) =>
    updateState((s) => ({
      ...s,
      tsYText: v instanceof Function ? v(s.tsYText) : v,
    }));
  const setTsBlurText = (v: any) =>
    updateState((s) => ({
      ...s,
      tsBlurText: v instanceof Function ? v(s.tsBlurText) : v,
    }));
  const setTsOpacityText = (v: any) =>
    updateState((s) => ({
      ...s,
      tsOpacityText: v instanceof Function ? v(s.tsOpacityText) : v,
    }));
  const setTsColorInput = (v: any) =>
    updateState((s) => ({
      ...s,
      tsColorInput: v instanceof Function ? v(s.tsColorInput) : v,
    }));

  const setIconName = (v: any) =>
    updateState((s) => ({
      ...s,
      iconName: v instanceof Function ? v(s.iconName) : v,
    }));
  const setIconSource = (v: any) =>
    updateState((s) => ({
      ...s,
      iconSource: v instanceof Function ? v(s.iconSource) : v,
    }));
  const setIconCustomSvg = (v: any) =>
    updateState((s) => ({
      ...s,
      iconCustomSvg: v instanceof Function ? v(s.iconCustomSvg) : v,
    }));
  const setIconPosition = (v: any) =>
    updateState((s) => ({
      ...s,
      iconPosition: v instanceof Function ? v(s.iconPosition) : v,
    }));
  const setIconSizeText = (v: any) =>
    updateState((s) => ({
      ...s,
      iconSizeText: v instanceof Function ? v(s.iconSizeText) : v,
    }));
  const setIconGapText = (v: any) =>
    updateState((s) => ({
      ...s,
      iconGapText: v instanceof Function ? v(s.iconGapText) : v,
    }));
  const setIconColorMode = (v: any) =>
    updateState((s) => ({
      ...s,
      iconColorMode: v instanceof Function ? v(s.iconColorMode) : v,
    }));
  const setIconColorInput = (v: any) =>
    updateState((s) => ({
      ...s,
      iconColorInput: v instanceof Function ? v(s.iconColorInput) : v,
    }));

  const setHoverIconEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      hoverIconEnabled: v instanceof Function ? v(s.hoverIconEnabled) : v,
    }));
  const setHoverIconSource = (v: any) =>
    updateState((s) => ({
      ...s,
      hoverIconSource: v instanceof Function ? v(s.hoverIconSource) : v,
    }));
  const setHoverIconName = (v: any) =>
    updateState((s) => ({
      ...s,
      hoverIconName: v instanceof Function ? v(s.hoverIconName) : v,
    }));
  const setHoverIconCustomSvg = (v: any) =>
    updateState((s) => ({
      ...s,
      hoverIconCustomSvg: v instanceof Function ? v(s.hoverIconCustomSvg) : v,
    }));

  const setActiveIconEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      activeIconEnabled: v instanceof Function ? v(s.activeIconEnabled) : v,
    }));
  const setActiveIconSource = (v: any) =>
    updateState((s) => ({
      ...s,
      activeIconSource: v instanceof Function ? v(s.activeIconSource) : v,
    }));
  const setActiveIconName = (v: any) =>
    updateState((s) => ({
      ...s,
      activeIconName: v instanceof Function ? v(s.activeIconName) : v,
    }));
  const setActiveIconCustomSvg = (v: any) =>
    updateState((s) => ({
      ...s,
      activeIconCustomSvg: v instanceof Function ? v(s.activeIconCustomSvg) : v,
    }));

  const setLoadingIconEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      loadingIconEnabled: v instanceof Function ? v(s.loadingIconEnabled) : v,
    }));
  const setLoadingIconSource = (v: any) =>
    updateState((s) => ({
      ...s,
      loadingIconSource: v instanceof Function ? v(s.loadingIconSource) : v,
    }));
  const setLoadingIconName = (v: any) =>
    updateState((s) => ({
      ...s,
      loadingIconName: v instanceof Function ? v(s.loadingIconName) : v,
    }));
  const setLoadingIconCustomSvg = (v: any) =>
    updateState((s) => ({
      ...s,
      loadingIconCustomSvg:
        v instanceof Function ? v(s.loadingIconCustomSvg) : v,
    }));

  const setGroupEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      groupEnabled: v instanceof Function ? v(s.groupEnabled) : v,
    }));
  const setGroupAlign = (v: any) =>
    updateState((s) => ({
      ...s,
      groupAlign: v instanceof Function ? v(s.groupAlign) : v,
    }));
  const setGroupGapText = (v: any) =>
    updateState((s) => ({
      ...s,
      groupGapText: v instanceof Function ? v(s.groupGapText) : v,
    }));

  const setHoverEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      hoverEnabled: v instanceof Function ? v(s.hoverEnabled) : v,
    }));
  const setHoverBgMode = (v: any) =>
    updateState((s) => ({
      ...s,
      hoverBgMode: v instanceof Function ? v(s.hoverBgMode) : v,
    }));
  const setHoverBgInput = (v: any) =>
    updateState((s) => ({
      ...s,
      hoverBgInput: v instanceof Function ? v(s.hoverBgInput) : v,
    }));
  const setHoverGradAngleText = (v: any) =>
    updateState((s) => ({
      ...s,
      hoverGradAngleText: v instanceof Function ? v(s.hoverGradAngleText) : v,
    }));
  const setHoverGradStartInput = (v: any) =>
    updateState((s) => ({
      ...s,
      hoverGradStartInput: v instanceof Function ? v(s.hoverGradStartInput) : v,
    }));
  const setHoverGradMidEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      hoverGradMidEnabled: v instanceof Function ? v(s.hoverGradMidEnabled) : v,
    }));
  const setHoverGradMidInput = (v: any) =>
    updateState((s) => ({
      ...s,
      hoverGradMidInput: v instanceof Function ? v(s.hoverGradMidInput) : v,
    }));
  const setHoverGradEndInput = (v: any) =>
    updateState((s) => ({
      ...s,
      hoverGradEndInput: v instanceof Function ? v(s.hoverGradEndInput) : v,
    }));
  const setHoverTextMode = (v: any) =>
    updateState((s) => ({
      ...s,
      hoverTextMode: v instanceof Function ? v(s.hoverTextMode) : v,
    }));
  const setHoverTextInput = (v: any) =>
    updateState((s) => ({
      ...s,
      hoverTextInput: v instanceof Function ? v(s.hoverTextInput) : v,
    }));
  const setHoverBorderMode = (v: any) =>
    updateState((s) => ({
      ...s,
      hoverBorderMode: v instanceof Function ? v(s.hoverBorderMode) : v,
    }));
  const setHoverBorderInput = (v: any) =>
    updateState((s) => ({
      ...s,
      hoverBorderInput: v instanceof Function ? v(s.hoverBorderInput) : v,
    }));

  const setActiveEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      activeEnabled: v instanceof Function ? v(s.activeEnabled) : v,
    }));
  const setActiveTranslateYText = (v: any) =>
    updateState((s) => ({
      ...s,
      activeTranslateYText:
        v instanceof Function ? v(s.activeTranslateYText) : v,
    }));
  const setActiveScaleText = (v: any) =>
    updateState((s) => ({
      ...s,
      activeScaleText: v instanceof Function ? v(s.activeScaleText) : v,
    }));
  const setActiveBgMode = (v: any) =>
    updateState((s) => ({
      ...s,
      activeBgMode: v instanceof Function ? v(s.activeBgMode) : v,
    }));
  const setActiveBgInput = (v: any) =>
    updateState((s) => ({
      ...s,
      activeBgInput: v instanceof Function ? v(s.activeBgInput) : v,
    }));
  const setActiveGradAngleText = (v: any) =>
    updateState((s) => ({
      ...s,
      activeGradAngleText: v instanceof Function ? v(s.activeGradAngleText) : v,
    }));
  const setActiveGradStartInput = (v: any) =>
    updateState((s) => ({
      ...s,
      activeGradStartInput:
        v instanceof Function ? v(s.activeGradStartInput) : v,
    }));
  const setActiveGradMidEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      activeGradMidEnabled:
        v instanceof Function ? v(s.activeGradMidEnabled) : v,
    }));
  const setActiveGradMidInput = (v: any) =>
    updateState((s) => ({
      ...s,
      activeGradMidInput: v instanceof Function ? v(s.activeGradMidInput) : v,
    }));
  const setActiveGradEndInput = (v: any) =>
    updateState((s) => ({
      ...s,
      activeGradEndInput: v instanceof Function ? v(s.activeGradEndInput) : v,
    }));
  const setActiveTextMode = (v: any) =>
    updateState((s) => ({
      ...s,
      activeTextMode: v instanceof Function ? v(s.activeTextMode) : v,
    }));
  const setActiveTextInput = (v: any) =>
    updateState((s) => ({
      ...s,
      activeTextInput: v instanceof Function ? v(s.activeTextInput) : v,
    }));
  const setActiveBorderMode = (v: any) =>
    updateState((s) => ({
      ...s,
      activeBorderMode: v instanceof Function ? v(s.activeBorderMode) : v,
    }));
  const setActiveBorderInput = (v: any) =>
    updateState((s) => ({
      ...s,
      activeBorderInput: v instanceof Function ? v(s.activeBorderInput) : v,
    }));

  const setFocusRingEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      focusRingEnabled: v instanceof Function ? v(s.focusRingEnabled) : v,
    }));
  const setFocusRingWidthText = (v: any) =>
    updateState((s) => ({
      ...s,
      focusRingWidthText: v instanceof Function ? v(s.focusRingWidthText) : v,
    }));
  const setFocusRingOffsetText = (v: any) =>
    updateState((s) => ({
      ...s,
      focusRingOffsetText: v instanceof Function ? v(s.focusRingOffsetText) : v,
    }));
  const setFocusRingInput = (v: any) =>
    updateState((s) => ({
      ...s,
      focusRingInput: v instanceof Function ? v(s.focusRingInput) : v,
    }));

  const setTransitionColorDurationText = (v: any) =>
    updateState((s) => ({
      ...s,
      transitionColorDurationText:
        v instanceof Function ? v(s.transitionColorDurationText) : v,
    }));
  const setTransitionColorEasing = (v: any) =>
    updateState((s) => ({
      ...s,
      transitionColorEasing:
        v instanceof Function ? v(s.transitionColorEasing) : v,
    }));
  const setTransitionTransformDurationText = (v: any) =>
    updateState((s) => ({
      ...s,
      transitionTransformDurationText:
        v instanceof Function ? v(s.transitionTransformDurationText) : v,
    }));
  const setTransitionTransformEasing = (v: any) =>
    updateState((s) => ({
      ...s,
      transitionTransformEasing:
        v instanceof Function ? v(s.transitionTransformEasing) : v,
    }));

  const setAriaLabel = (v: any) =>
    updateState((s) => ({
      ...s,
      ariaLabel: v instanceof Function ? v(s.ariaLabel) : v,
    }));
  const setAriaPressedMode = (v: any) =>
    updateState((s) => ({
      ...s,
      ariaPressedMode: v instanceof Function ? v(s.ariaPressedMode) : v,
    }));
  const setAriaBusyMode = (v: any) =>
    updateState((s) => ({
      ...s,
      ariaBusyMode: v instanceof Function ? v(s.ariaBusyMode) : v,
    }));
  const setMinTouchMode = (v: any) =>
    updateState((s) => ({
      ...s,
      minTouchMode: v instanceof Function ? v(s.minTouchMode) : v,
    }));
  const setMinTouchSizeText = (v: any) =>
    updateState((s) => ({
      ...s,
      minTouchSizeText: v instanceof Function ? v(s.minTouchSizeText) : v,
    }));

  const setForceHover = (v: any) =>
    updateState((s) => ({
      ...s,
      forceHover: v instanceof Function ? v(s.forceHover) : v,
    }));
  const setForceActive = (v: any) =>
    updateState((s) => ({
      ...s,
      forceActive: v instanceof Function ? v(s.forceActive) : v,
    }));
  const setForceFocus = (v: any) =>
    updateState((s) => ({
      ...s,
      forceFocus: v instanceof Function ? v(s.forceFocus) : v,
    }));

  const setPreviewBgMode = (v: any) =>
    updateState((s) => ({
      ...s,
      previewBgMode: v instanceof Function ? v(s.previewBgMode) : v,
    }));
  const setPreviewBgInput = (v: any) =>
    updateState((s) => ({
      ...s,
      previewBgInput: v instanceof Function ? v(s.previewBgInput) : v,
    }));
  const setDownloadFormat = (v: any) =>
    updateState((s) => ({
      ...s,
      downloadFormat: v instanceof Function ? v(s.downloadFormat) : v,
    }));
  const setDownloadName = (v: any) =>
    updateState((s) => ({
      ...s,
      downloadName: v instanceof Function ? v(s.downloadName) : v,
    }));

  const handleApplyElevationPreset = (
    mode: "flat" | "raised" | "lifted" | "inset",
  ) => {
    // For bulk updates, we can update multiple fields in one go to keep history clean
    updateState((s) => {
      const next = {
        ...s,
        elevationPreset: mode,
        shadowEnabled: true,
        shadowStackEnabled: false,
        baseShadowEnabled: false,
      };

      if (mode === "flat") {
        Object.assign(next, { shadowEnabled: false, depthText: "0" });
        if (s.activeEnabled) next.activeTranslateYText = "0";
      } else if (mode === "raised") {
        Object.assign(next, {
          shXText: "0",
          shYText: "4",
          shBlurText: "6",
          shSpreadText: "-1",
          shOpacityText: "0.1",
          depthText: "4",
          baseShadowEnabled: true,
          baseShadowSizeText: "10",
        });
        if (s.activeEnabled) next.activeTranslateYText = "4";
      } else if (mode === "lifted") {
        Object.assign(next, {
          shXText: "0",
          shYText: "10",
          shBlurText: "15",
          shSpreadText: "-3",
          shOpacityText: "0.15",
          depthText: "8",
          baseShadowEnabled: true,
          baseShadowSizeText: "20",
        });
        if (s.activeEnabled) next.activeTranslateYText = "8";
      } else if (mode === "inset") {
        Object.assign(next, {
          depthText: "0",
          innerShadowEnabled: true,
          shOpacityText: "0",
        });
        if (s.activeEnabled) next.activeTranslateYText = "0";
      }
      return next;
    });
  };

  const handleApplyMaterialPreset = (
    mode: "custom" | "plastic" | "matte" | "metal" | "glass",
  ) => {
    updateState((s) => {
      const next = { ...s, materialPreset: mode };
      if (mode === "custom") return next;

      if (mode === "plastic") {
        Object.assign(next, {
          glossEnabled: true,
          glossOpacityText: "0.4",
          specularStrengthText: "0.5",
          roughnessText: "0.1",
          bevelEnabled: true,
          bevelSizeText: "3",
          bevelSoftnessText: "2",
          innerShadowEnabled: true,
          backdropBlurEnabled: false,
          bgInput: "#2563eb",
          textInput: "#ffffff",
        });
      } else if (mode === "matte") {
        Object.assign(next, {
          glossEnabled: false,
          specularStrengthText: "0",
          roughnessText: "1",
          bevelEnabled: false,
          innerShadowEnabled: false,
          backdropBlurEnabled: false,
          bgInput: "#2563eb",
          textInput: "#ffffff",
        });
      } else if (mode === "metal") {
        Object.assign(next, {
          glossEnabled: true,
          glossOpacityText: "0.6",
          specularStrengthText: "0.8",
          roughnessText: "0.3",
          bevelEnabled: true,
          bevelSizeText: "2",
          bevelSoftnessText: "1",
          innerShadowEnabled: true,
          edgeGradientEnabled: true,
          backdropBlurEnabled: false,
          bgInput: "#2563eb",
          textInput: "#ffffff",
        });
      } else if (mode === "glass") {
        Object.assign(next, {
          glossEnabled: true,
          glossOpacityText: "0.3",
          specularStrengthText: "0.4",
          roughnessText: "0.1",
          bevelEnabled: true,
          bevelSizeText: "1",
          innerShadowEnabled: true,
          backdropBlurEnabled: true,
          backdropBlurText: "10",
          shOpacityText: "0.1",
          bgInput: "#ffffff55",
          textInput: "#000000",
        });
      }
      return next;
    });
  };

  const filteredSystemFonts = useMemo(() => {
    const q = fontSearch.trim().toLowerCase();
    return q
      ? SYSTEM_FONTS.filter((f) => f.label.toLowerCase().includes(q))
      : SYSTEM_FONTS;
  }, [fontSearch]);

  const filteredGoogleFonts = useMemo(() => {
    const q = fontSearch.trim().toLowerCase();
    return q
      ? GOOGLE_FONTS.filter((f) => f.toLowerCase().includes(q))
      : GOOGLE_FONTS;
  }, [fontSearch]);

  // --- Text Position ---

  // --- Text Shadow ---

  // --- Icon ---

  // --- Group Preview ---

  // --- Hover ---

  // --- Active ---

  // --- Focus Ring ---

  // --- Transitions ---

  // --- Accessibility ---

  // --- State Preview ---

  // --- Preview & Export ---

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }
    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  useEffect(() => {
    if (!isDesktop || !splitRef.current) return;
    const rect = splitRef.current.getBoundingClientRect();
    if (!rect.width) return;
    const minLeft = 320;
    const minRight = 360;
    const maxLeft = Math.max(minLeft, rect.width - minRight);
    const initial = clamp(Math.round(rect.width * 0.52), minLeft, maxLeft);
    setLeftPanelWidth((prev) =>
      prev ? clamp(prev, minLeft, maxLeft) : initial,
    );
  }, [isDesktop]);

  useEffect(() => {
    if (!isResizing) return;
    const onMove = (e: MouseEvent) => {
      if (!splitRef.current) return;
      const rect = splitRef.current.getBoundingClientRect();
      const minLeft = 320;
      const minRight = 360;
      const maxLeft = Math.max(minLeft, rect.width - minRight);
      const next = clamp(Math.round(e.clientX - rect.left), minLeft, maxLeft);
      setLeftPanelWidth(next);
    };
    const onUp = () => setIsResizing(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isResizing]);

  // --- Computed Values ---
  const wPx = clamp(Number(widthText) || 220, 40, 720);
  const hPx = clamp(Number(heightText) || 44, 24, 240);
  const padX = clamp(Number(paddingXText) || 14, 0, 80);
  const padY = clamp(Number(paddingYText) || 0, 0, 40);

  const fontSizeMin = fontSizeUnit === "rem" ? 0.5 : 8;
  const fontSizeMax = fontSizeUnit === "rem" ? 6 : 96;
  const fontSizeStep = fontSizeUnit === "rem" ? 0.05 : 1;
  const fontSizeValue = clamp(
    Number(fontSizeText) || 14,
    fontSizeMin,
    fontSizeMax,
  );
  const fontSizeDisplay = `${fontSizeValue}${fontSizeUnit}`;

  const letterSpacingMin = letterSpacingUnit === "em" ? -0.1 : -2;
  const letterSpacingMax = letterSpacingUnit === "em" ? 0.6 : 10;
  const letterSpacingStep = letterSpacingUnit === "em" ? 0.01 : 0.1;
  const letterSpacingValue = clamp(
    Number(letterSpacingText) || 0,
    letterSpacingMin,
    letterSpacingMax,
  );
  const letterSpacingDisplay = `${letterSpacingValue}${letterSpacingUnit}`;

  const lHeight = Number(lineHeightText) || 1;
  const fontFamily =
    fontBucket === "system"
      ? SYSTEM_FONTS[Math.min(systemFontIdx, SYSTEM_FONTS.length - 1)]?.css ||
        "sans-serif"
      : googleFontFamily;

  const toHex2 = (n: number) => {
    const clamped = Math.max(0, Math.min(255, Math.round(n)));
    const s = clamped.toString(16);
    return s.length === 1 ? `0${s}` : s;
  };
  const mixHex = (baseHex: string, mixHexValue: string, amount: number) => {
    const base = norm(baseHex);
    const mix = norm(mixHexValue);
    if (!base.ok || !mix.ok) return baseHex;
    const a = clamp(amount, 0, 1);
    const br = parseInt(base.hex.slice(1, 3), 16);
    const bg = parseInt(base.hex.slice(3, 5), 16);
    const bb = parseInt(base.hex.slice(5, 7), 16);
    const mr = parseInt(mix.hex.slice(1, 3), 16);
    const mg = parseInt(mix.hex.slice(3, 5), 16);
    const mb = parseInt(mix.hex.slice(5, 7), 16);
    const r = br + (mr - br) * a;
    const g = bg + (mg - bg) * a;
    const b = bb + (mb - bb) * a;
    return `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`;
  };

  const depthPx = clamp(Number(depthText) || 0, 0, 40);
  const glossSizePx = clamp(Number(glossSizeText) || 0, 0, 40);
  const glossOpacity = clamp(Number(glossOpacityText) || 0, 0, 1);
  const bevelSizePx = clamp(Number(bevelSizeText) || 0, 0, 24);
  const bevelSoftnessPx = clamp(Number(bevelSoftnessText) || 0, 0, 24);
  const edgeThicknessPx = clamp(Number(edgeThicknessText) || 0, 0, 20);
  const edgeGradientSizePx = clamp(Number(edgeGradientSizeText) || 0, 0, 12);
  const edgeGradientStrength = clamp(
    Number(edgeGradientStrengthText) || 0,
    0,
    1,
  );
  const topGradOpacity = clamp(Number(topGradOpacityText) || 0, 0, 1);
  const parallaxStrength = clamp(Number(parallaxStrengthText) || 0, 0, 1);
  const rimLightSizePx = clamp(Number(rimLightSizeText) || 0, 0, 30);
  const rimLightOpacity = clamp(Number(rimLightOpacityText) || 0, 0, 1);
  const iconEmbossDepthPx = clamp(Number(iconEmbossDepthText) || 0, 0, 8);
  const iconEmbossStrength = clamp(Number(iconEmbossStrengthText) || 0, 0, 1);
  const borderDepthPx = clamp(Number(borderDepthSizeText) || 0, 0, 8);
  const baseShadowSizePx = clamp(Number(baseShadowSizeText) || 0, 0, 30);
  const baseShadowOpacity = clamp(Number(baseShadowOpacityText) || 0, 0, 1);
  const pressedDepthPx = clamp(Number(pressedDepthText) || 0, 0, 30);
  const hoverLiftPx = clamp(Number(hoverLiftText) || 0, 0, 24);
  const specularStrength = clamp(Number(specularStrengthText) || 0, 0, 1);
  const roughness = clamp(Number(roughnessText) || 0, 0, 1);
  const aoStrength = clamp(Number(aoStrengthText) || 0, 0, 1);
  const hoverTiltX = clamp(Number(hoverTiltXText) || 0, -20, 20);
  const hoverTiltY = clamp(Number(hoverTiltYText) || 0, -20, 20);
  const hoverPerspective = clamp(
    Number(hoverPerspectiveText) || 800,
    200,
    2000,
  );
  const radiusVal = clamp(Number(radiusText) || 0, 0, 60);
  const rTL = linkRadius ? radiusVal : clamp(Number(radiusTLText) || 0, 0, 60);
  const rTR = linkRadius ? radiusVal : clamp(Number(radiusTRText) || 0, 0, 60);
  const rBR = linkRadius ? radiusVal : clamp(Number(radiusBRText) || 0, 0, 60);
  const rBL = linkRadius ? radiusVal : clamp(Number(radiusBLText) || 0, 0, 60);

  const borderWidthPx = clamp(Number(borderWidthText) || 0, 0, 12);
  const borderHoverWidthPx = clamp(
    Number(borderHoverWidthText) || borderWidthPx,
    0,
    12,
  );
  const borderActiveWidthPx = clamp(
    Number(borderActiveWidthText) || borderHoverWidthPx,
    0,
    12,
  );
  const hoverBorderWidthPx = hoverEnabled ? borderHoverWidthPx : borderWidthPx;
  const activeBorderWidthPx = activeEnabled
    ? borderActiveWidthPx
    : borderWidthPx;
  const disabledBorderWidthPx = clamp(
    Number(disabledBorderWidthText) || borderWidthPx,
    0,
    12,
  );

  const groupGapPx = clamp(Number(groupGapText) || 12, 0, 32);
  const minTouchSizePx = clamp(Number(minTouchSizeText) || 44, 24, 80);
  const transitionColorMs = clamp(
    Number(transitionColorDurationText) || 160,
    0,
    2000,
  );
  const transitionTransformMs = clamp(
    Number(transitionTransformDurationText) || 120,
    0,
    2000,
  );

  // --- IDs ---
  const idItalic = "ab-italic";
  const idUnderline = "ab-underline";

  // --- CSS Variable Helper Logic ---
  // Determine Base CSS values

  // 🔥 FIX: Allow 0 degrees to work (was failing due to || operator)
  const angle = Number(gradAngleText);
  const safeAngle = Number.isFinite(angle) ? angle : 90;

  // 🔥 FIX: Use SAFE Hex values for gradient to prevent breakage while typing
  const safeGradStart = norm(gradStartInput).ok
    ? norm(gradStartInput).hex
    : gradStartInput;
  const safeGradMid = norm(gradMidInput).ok
    ? norm(gradMidInput).hex
    : gradMidInput;
  const safeGradEnd = norm(gradEndInput).ok
    ? norm(gradEndInput).hex
    : gradEndInput;
  const safeBg = norm(bgInput).ok ? norm(bgInput).hex : bgInput;
  const hoverGradient = buildGradient(
    hoverGradAngleText,
    hoverGradStartInput,
    hoverGradMidEnabled,
    hoverGradMidInput,
    hoverGradEndInput,
  );
  const activeGradient = buildGradient(
    activeGradAngleText,
    activeGradStartInput,
    activeGradMidEnabled,
    activeGradMidInput,
    activeGradEndInput,
  );

  let cssBg = "transparent";
  const cssText = textInput;
  const cssBorder = borderInput;

  if (variant === "solid") {
    if (useGradient) {
      cssBg = gradMidEnabled
        ? `linear-gradient(${safeAngle}deg, ${safeGradStart}, ${safeGradMid}, ${safeGradEnd})`
        : `linear-gradient(${safeAngle}deg, ${safeGradStart}, ${safeGradEnd})`;
    } else {
      cssBg = safeBg;
    }
  }

  // Determine Hover CSS values
  let cssHoverBg = cssBg;
  let cssHoverText = cssText;
  let cssHoverBorder = cssBorder;
  let cssHoverFilter = "none";
  const safeHoverBg = norm(hoverBgInput).ok
    ? norm(hoverBgInput).hex
    : hoverBgInput;

  if (hoverEnabled) {
    if (hoverBgMode === "auto") {
      cssHoverFilter = "brightness(0.92)";
    } else if (hoverBgMode === "gradient") {
      cssHoverBg = hoverGradient;
      cssHoverFilter = "none";
    } else {
      cssHoverBg = safeHoverBg;
      cssHoverFilter = "none";
    }

    if (hoverTextMode === "custom") {
      cssHoverText = hoverTextInput;
    }

    if (hoverBorderMode === "custom") {
      cssHoverBorder = hoverBorderInput;
    }
  } else {
    cssHoverFilter = "none";
  }

  // Determine Active CSS values
  const safeActiveBg = norm(activeBgInput).ok
    ? norm(activeBgInput).hex
    : activeBgInput;
  const safeActiveText = norm(activeTextInput).ok
    ? norm(activeTextInput).hex
    : activeTextInput;
  const safeActiveBorder = norm(activeBorderInput).ok
    ? norm(activeBorderInput).hex
    : activeBorderInput;
  let cssActiveBg = cssBg;
  let cssActiveText = cssText;
  let cssActiveBorder = cssBorder;
  const cssActiveFilter = "none";

  if (activeEnabled) {
    if (activeBgMode === "custom") {
      cssActiveBg = safeActiveBg;
    } else if (activeBgMode === "gradient") {
      cssActiveBg = activeGradient;
    }
    if (activeTextMode === "custom") {
      cssActiveText = safeActiveText;
    }
    if (activeBorderMode === "custom") {
      cssActiveBorder = safeActiveBorder;
    }
  }

  // Determine Disabled CSS values
  const disabledOpacity = clamp(Number(disabledOpacityText) || 0.6, 0, 1);
  const safeDisabledBg = norm(disabledBgInput).ok
    ? norm(disabledBgInput).hex
    : disabledBgInput;
  const safeDisabledText = norm(disabledTextInput).ok
    ? norm(disabledTextInput).hex
    : disabledTextInput;
  const safeDisabledBorder = norm(disabledBorderInput).ok
    ? norm(disabledBorderInput).hex
    : disabledBorderInput;
  let cssDisabledBg = cssBg;
  let cssDisabledText = cssText;
  let cssDisabledBorder = cssBorder;
  if (disabledUseCustomColors) {
    cssDisabledBg = safeDisabledBg;
    cssDisabledText = safeDisabledText;
    cssDisabledBorder = safeDisabledBorder;
  }

  // --- Jitter Fix: PostMessage Logic ---
  const previewBgHex =
    previewBgMode === "white"
      ? "#ffffff"
      : previewBgMode === "black"
        ? "#000000"
        : norm(previewBgInput).ok
          ? norm(previewBgInput).hex
          : "#0b1220";

  const minTouchWarning =
    minTouchMode !== "off" && (wPx < minTouchSizePx || hPx < minTouchSizePx);
  const touchWidth =
    minTouchMode === "enforce" ? Math.max(wPx, minTouchSizePx) : wPx;
  const touchHeight =
    minTouchMode === "enforce" ? Math.max(hPx, minTouchSizePx) : hPx;

  const contrastTextHex = norm(textInput).ok ? norm(textInput).hex : "#ffffff";
  const contrastBgHex =
    variant === "solid"
      ? useGradient
        ? gradMidEnabled
          ? safeGradMid
          : safeGradStart
        : safeBg
      : previewBgHex;
  const contrastRatioValue = contrastRatio(contrastTextHex, contrastBgHex);
  const contrastRatioText = contrastRatioValue
    ? `${contrastRatioValue.toFixed(2)}:1`
    : "n/a";
  const contrastOk = contrastRatioValue ? contrastRatioValue >= 4.5 : true;
  const contrastNote =
    variant === "solid"
      ? useGradient
        ? "Estimated using gradient start/middle."
        : "Estimated using background color."
      : "Estimated using preview background.";

  let tsBaseColor = tsColorInput;
  if (tsColorMode === "auto") tsBaseColor = contrastTextHex;
  if (tsColorMode === "contrast") tsBaseColor = contrastHex(previewBgHex);
  const tsX = Number(tsXText) || 0;
  const tsY = Number(tsYText) || 0;
  const tsBlur = Number(tsBlurText) || 0;
  const tsColor = hexWithAlpha(tsBaseColor, Number(tsOpacityText) || 0.25);
  const disabledTextShadowCss = disabledTextShadowEnabled
    ? `${tsX}px ${tsY}px ${tsBlur}px ${tsColor}`
    : "none";

  const lightAngleMap: Record<string, number> = {
    "top-left": 225,
    "top-right": 315,
    "bottom-left": 135,
    "bottom-right": 45,
  };
  const rawLightAngle =
    lightDirection === "custom"
      ? Number(lightAngleText)
      : (lightAngleMap[lightDirection] ?? 315);
  const safeLightAngle = Number.isFinite(rawLightAngle) ? rawLightAngle : 315;
  const shadowAngle = (safeLightAngle + 180) % 360;
  const shadowRad = (shadowAngle * Math.PI) / 180;
  const shadowDirX = Math.cos(shadowRad);
  const shadowDirY = Math.sin(shadowRad);

  const shColorNorm = norm(shColorInput);
  const shadowBaseHex =
    shadowTemp === "warm"
      ? mixHex(shColorNorm.ok ? shColorNorm.hex : "#000000", "#f59e0b", 0.25)
      : shadowTemp === "cool"
        ? mixHex(shColorNorm.ok ? shColorNorm.hex : "#000000", "#38bdf8", 0.25)
        : shColorNorm.ok
          ? shColorNorm.hex
          : "#000000";
  const rimLightNorm = norm(rimLightColorInput);

  const baseShadowColor = hexWithAlpha(
    shadowBaseHex,
    Number(shOpacityText) || 0.1,
  );

  const buildStackLayer = (
    enabled: boolean,
    xText: string,
    yText: string,
    blurText: string,
    spreadText: string,
    opacityText: string,
  ) => {
    if (!enabled) return null;
    const opacity = clamp(Number(opacityText) || 0, 0, 1);
    const color = hexWithAlpha(shadowBaseHex, opacity);
    const x = clamp(Number(xText) || 0, -60, 60);
    const y = clamp(Number(yText) || 0, -60, 60);
    const blur = clamp(Number(blurText) || 0, 0, 160);
    const spread = clamp(Number(spreadText) || 0, -40, 40);
    return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
  };

  const buildBoxShadow = (
    options: { depthOverride?: number; pressedInset?: boolean } = {},
  ) => {
    const depth =
      typeof options.depthOverride === "number"
        ? options.depthOverride
        : depthPx;
    const pressedInset = Boolean(options.pressedInset);
    const allowOuter = variant !== "ghost" && !pressedInset;
    const outerShadows: string[] = [];
    const innerShadows: string[] = [];

    if (shadowEnabled && allowOuter) {
      outerShadows.push(
        `${Number(shXText) || 0}px ${Number(shYText) || 0}px ${
          Number(shBlurText) || 0
        }px ${Number(shSpreadText) || 0}px ${baseShadowColor}`,
      );
    }

    if (shadowStackEnabled && allowOuter) {
      const layers = [
        buildStackLayer(
          stack1Enabled,
          stack1XText,
          stack1YText,
          stack1BlurText,
          stack1SpreadText,
          stack1OpacityText,
        ),
        buildStackLayer(
          stack2Enabled,
          stack2XText,
          stack2YText,
          stack2BlurText,
          stack2SpreadText,
          stack2OpacityText,
        ),
        buildStackLayer(
          stack3Enabled,
          stack3XText,
          stack3YText,
          stack3BlurText,
          stack3SpreadText,
          stack3OpacityText,
        ),
      ].filter(Boolean) as string[];
      outerShadows.push(...layers);
    }

    if (edgeThicknessPx > 0 && allowOuter) {
      const edgeOpacity = clamp(0.15 + depth / 80, 0.15, 0.5);
      const edgeColor = hexWithAlpha(shadowBaseHex, edgeOpacity);
      const edgeX = Math.round(shadowDirX * edgeThicknessPx);
      const edgeY = Math.round(shadowDirY * edgeThicknessPx);
      outerShadows.push(`${edgeX}px ${edgeY}px 0px 0px ${edgeColor}`);
    }

    if (depth > 0 && allowOuter) {
      const depthOpacity = clamp(0.12 + depth / 60, 0.12, 0.4);
      const depthColor = hexWithAlpha(shadowBaseHex, depthOpacity);
      const dx = Math.round(shadowDirX * depth);
      const dy = Math.round(shadowDirY * depth);
      const blur = Math.round(depth * 2);
      outerShadows.push(`${dx}px ${dy}px ${blur}px 0px ${depthColor}`);
    }

    if (
      rimLightEnabled &&
      rimLightSizePx > 0 &&
      rimLightOpacity > 0 &&
      allowOuter
    ) {
      const rimHex = rimLightNorm.ok ? rimLightNorm.hex : rimLightColorInput;
      const rimColor = hexWithAlpha(rimHex, rimLightOpacity);
      outerShadows.push(`0 0 ${rimLightSizePx}px 0px ${rimColor}`);
    }

    if (
      baseShadowEnabled &&
      baseShadowSizePx > 0 &&
      baseShadowOpacity > 0 &&
      allowOuter
    ) {
      const baseColor = hexWithAlpha(shadowBaseHex, baseShadowOpacity);
      const baseOffset = Math.round(baseShadowSizePx * 0.6);
      const baseBlur = Math.round(baseShadowSizePx * 1.8);
      outerShadows.push(`0 ${baseOffset}px ${baseBlur}px 0px ${baseColor}`);
    }

    if (pressedInset && depth > 0) {
      const insetOpacity = clamp(0.2 + depth / 70, 0.18, 0.5);
      const insetColor = hexWithAlpha(shadowBaseHex, insetOpacity);
      const insetOffset = Math.max(2, Math.round(depth * 0.5));
      const insetBlur = Math.max(4, Math.round(depth * 1.2));
      innerShadows.push(
        `inset ${Math.round(shadowDirX * insetOffset)}px ${Math.round(
          shadowDirY * insetOffset,
        )}px ${insetBlur}px 0px ${insetColor}`,
      );
    }

    if (innerShadowEnabled) {
      const insetOpacity = clamp(0.18 + depth / 80, 0.15, 0.45);
      const insetColor = hexWithAlpha(shadowBaseHex, insetOpacity);
      const insetOffset = Math.max(2, Math.round(depth * 0.4));
      const insetBlur = Math.max(4, Math.round(depth * 1.2));
      innerShadows.push(
        `inset ${Math.round(shadowDirX * insetOffset)}px ${Math.round(
          shadowDirY * insetOffset,
        )}px ${insetBlur}px 0px ${insetColor}`,
      );
    }

    if (borderDepthMode !== "none" && borderDepthPx > 0) {
      const borderLight = "rgba(255, 255, 255, 0.35)";
      const borderDark = "rgba(0, 0, 0, 0.35)";
      const sign = borderDepthMode === "raised" ? 1 : -1;
      const bx = Math.round(shadowDirX * borderDepthPx);
      const by = Math.round(shadowDirY * borderDepthPx);
      innerShadows.push(
        `inset ${-sign * bx}px ${
          -sign * by
        }px ${borderDepthPx}px 0px ${borderLight}`,
      );
      innerShadows.push(
        `inset ${sign * bx}px ${
          sign * by
        }px ${borderDepthPx}px 0px ${borderDark}`,
      );
    }

    if (aoStrength > 0) {
      const aoBlur = Math.max(4, Math.round((depth + bevelSizePx) * 1.2));
      const aoOpacity = clamp(aoStrength * 0.35, 0, 0.6);
      innerShadows.push(
        `inset 0 0 ${aoBlur}px 0px rgba(0, 0, 0, ${aoOpacity})`,
      );
    }

    if (
      edgeGradientEnabled &&
      edgeGradientSizePx > 0 &&
      edgeGradientStrength > 0
    ) {
      const edgeInset = Math.max(1, Math.round(edgeGradientSizePx / 2));
      innerShadows.push(
        `inset 0 ${edgeGradientSizePx}px ${edgeGradientSizePx}px -${edgeInset}px rgba(255, 255, 255, ${edgeGradientStrength})`,
      );
      innerShadows.push(
        `inset 0 -${edgeGradientSizePx}px ${edgeGradientSizePx}px -${edgeInset}px rgba(0, 0, 0, ${
          edgeGradientStrength * 0.9
        })`,
      );
    }

    if (glossEnabled && glossSizePx > 0 && glossOpacity > 0) {
      const glossBlur = Math.round(glossSizePx * (1.5 + roughness * 1.5));
      const glossStrength = clamp(
        glossOpacity * specularStrength * (1 - roughness * 0.3),
        0,
        1,
      );
      if (glossStrength > 0) {
        innerShadows.push(
          `inset ${Math.round(-shadowDirX * glossSizePx)}px ${Math.round(
            -shadowDirY * glossSizePx,
          )}px ${glossBlur}px 0px rgba(255, 255, 255, ${glossStrength})`,
        );
      }
    }

    if (bevelEnabled && bevelSizePx > 0) {
      const bevelBlur = Math.round(bevelSoftnessPx);
      const bevelX = Math.round(shadowDirX * bevelSizePx);
      const bevelY = Math.round(shadowDirY * bevelSizePx);
      innerShadows.push(
        `inset ${-bevelX}px ${-bevelY}px ${bevelBlur}px 0px rgba(255, 255, 255, 0.35)`,
      );
      innerShadows.push(
        `inset ${bevelX}px ${bevelY}px ${bevelBlur}px 0px rgba(0, 0, 0, 0.25)`,
      );
    }

    return (
      [...outerShadows, ...innerShadows].filter(Boolean).join(", ") || "none"
    );
  };

  const boxShadowCss = buildBoxShadow();
  const boxShadowHoverCss =
    hoverLiftPx > 0
      ? buildBoxShadow({ depthOverride: depthPx + hoverLiftPx })
      : boxShadowCss;
  const activeDepthOverride = Math.max(depthPx - pressedDepthPx, 0);
  const boxShadowActiveCss = pressedInsetEnabled
    ? buildBoxShadow({ depthOverride: pressedDepthPx, pressedInset: true })
    : buildBoxShadow({ depthOverride: activeDepthOverride });

  const applyOutlinePreset = () => {
    const contrast = contrastHex(previewBgHex);
    setUseGradient(false);
    setTextInput(contrast);
    setBorderInput(contrast);
    setHoverBgMode("custom");
    setHoverBgInput(hexWithAlpha(contrast, 0.12));
    setHoverTextMode("same");
    setHoverBorderMode("same");
  };

  const applyGhostPreset = () => {
    const contrast = contrastHex(previewBgHex);
    setUseGradient(false);
    setTextInput(contrast);
    setBorderInput(hexWithAlpha(contrast, 0.25));
    setBorderWidthText("0");
    setHoverBgMode("custom");
    setHoverBgInput(hexWithAlpha(contrast, 0.12));
    setHoverTextMode("same");
    setHoverBorderMode("custom");
    setHoverBorderInput(hexWithAlpha(contrast, 0.35));
  };

  const applyElevationPreset = (
    preset: "flat" | "raised" | "lifted" | "inset",
  ) => {
    setElevationPreset(preset);
    if (preset === "flat") {
      setShadowEnabled(false);
      setDepthText("0");
      setShadowStackEnabled(false);
      setInnerShadowEnabled(false);
      setGlossEnabled(false);
      setBevelEnabled(false);
    } else if (preset === "raised") {
      setShadowEnabled(true);
      setDepthText("6");
      setShadowStackEnabled(false);
      setInnerShadowEnabled(false);
      setGlossEnabled(true);
      setGlossSizeText("6");
      setGlossOpacityText("0.2");
      setBevelEnabled(true);
      setBevelSizeText("2");
      setBevelSoftnessText("2");
    } else if (preset === "lifted") {
      setShadowEnabled(true);
      setDepthText("12");
      setShadowStackEnabled(false);
      setInnerShadowEnabled(false);
      setGlossEnabled(true);
      setGlossSizeText("8");
      setGlossOpacityText("0.25");
      setBevelEnabled(true);
      setBevelSizeText("3");
      setBevelSoftnessText("3");
    } else {
      setShadowEnabled(false);
      setDepthText("0");
      setShadowStackEnabled(false);
      setInnerShadowEnabled(true);
      setGlossEnabled(false);
      setBevelEnabled(false);
    }
  };

  const applyMaterialPreset = (
    preset: "custom" | "plastic" | "matte" | "metal" | "glass",
  ) => {
    setMaterialPreset(preset);
    if (preset === "custom") return;
    if (preset === "plastic") {
      setGlossEnabled(true);
      setGlossSizeText("10");
      setGlossOpacityText("0.35");
      setSpecularStrengthText("0.9");
      setRoughnessText("0.25");
      setBevelEnabled(true);
      setBevelSizeText("3");
      setBevelSoftnessText("3");
      setEdgeGradientEnabled(true);
      setEdgeGradientSizeText("2");
      setEdgeGradientStrengthText("0.3");
      setAoStrengthText("0.2");
    } else if (preset === "matte") {
      setGlossEnabled(false);
      setSpecularStrengthText("0.2");
      setRoughnessText("0.8");
      setBevelEnabled(false);
      setEdgeGradientEnabled(false);
      setAoStrengthText("0.3");
    } else if (preset === "metal") {
      setGlossEnabled(true);
      setGlossSizeText("6");
      setGlossOpacityText("0.28");
      setSpecularStrengthText("1");
      setRoughnessText("0.15");
      setBevelEnabled(true);
      setBevelSizeText("2");
      setBevelSoftnessText("2");
      setEdgeGradientEnabled(true);
      setEdgeGradientSizeText("2");
      setEdgeGradientStrengthText("0.4");
      setAoStrengthText("0.35");
    } else if (preset === "glass") {
      setGlossEnabled(true);
      setGlossSizeText("14");
      setGlossOpacityText("0.45");
      setSpecularStrengthText("1");
      setRoughnessText("0.1");
      setBevelEnabled(true);
      setBevelSizeText("2");
      setBevelSoftnessText("4");
      setEdgeGradientEnabled(true);
      setEdgeGradientSizeText("1");
      setEdgeGradientStrengthText("0.2");
      setAoStrengthText("0.1");
    }
  };

  const baseIconSvg =
    iconSource === "custom"
      ? iconCustomSvg
      : ICONS_SVG[iconName as IconName] || "";
  const hoverIconSvg = hoverIconEnabled
    ? hoverIconSource === "custom"
      ? hoverIconCustomSvg
      : ICONS_SVG[hoverIconName as IconName] || ""
    : "";
  const activeIconSvg = activeIconEnabled
    ? activeIconSource === "custom"
      ? activeIconCustomSvg
      : ICONS_SVG[activeIconName as IconName] || ""
    : "";
  const loadingIconSvg = loadingIconEnabled
    ? loadingIconSource === "custom"
      ? loadingIconCustomSvg
      : ICONS_SVG[loadingIconName as IconName] || ""
    : "";

  const topGradStartNorm = norm(topGradStartInput);
  const topGradMidNorm = norm(topGradMidInput);
  const topGradEndNorm = norm(topGradEndInput);
  const topAngleRaw = Number(topGradAngleText);
  const topAngle = Number.isFinite(topAngleRaw) ? topAngleRaw : 180;
  const topStart = topGradStartNorm.ok
    ? topGradStartNorm.hex
    : topGradStartInput;
  const topMid = topGradMidNorm.ok ? topGradMidNorm.hex : topGradMidInput;
  const topEnd = topGradEndNorm.ok ? topGradEndNorm.hex : topGradEndInput;
  const topStartColor = hexWithAlpha(topStart, topGradOpacity);
  const topMidColor = hexWithAlpha(topMid, topGradOpacity);
  const topEndColor = hexWithAlpha(topEnd, topGradOpacity);
  const topGradientCss = topGradientEnabled
    ? topGradMidEnabled
      ? `linear-gradient(${topAngle}deg, ${topStartColor}, ${topMidColor}, ${topEndColor})`
      : `linear-gradient(${topAngle}deg, ${topStartColor}, ${topEndColor})`
    : "none";
  const embossBlur = Math.max(1, Math.round(iconEmbossDepthPx * 0.8));
  const embossLight = `rgba(255, 255, 255, ${clamp(
    iconEmbossStrength * 0.6,
    0,
    1,
  )})`;
  const embossDark = `rgba(0, 0, 0, ${clamp(iconEmbossStrength * 0.45, 0, 1)})`;
  const iconEmbossFilter =
    iconEmbossMode === "off" || iconEmbossDepthPx <= 0
      ? "none"
      : iconEmbossMode === "raised"
        ? `drop-shadow(${iconEmbossDepthPx}px ${iconEmbossDepthPx}px ${embossBlur}px ${embossDark}) drop-shadow(${-iconEmbossDepthPx}px ${-iconEmbossDepthPx}px ${embossBlur}px ${embossLight})`
        : `drop-shadow(${iconEmbossDepthPx}px ${iconEmbossDepthPx}px ${embossBlur}px ${embossLight}) drop-shadow(${-iconEmbossDepthPx}px ${-iconEmbossDepthPx}px ${embossBlur}px ${embossDark})`;
  // --- Export Logic ---
  const handleDownload = () => {
    const { filename, content } = buildExportPayload({
      downloadFormat,
      downloadName,
      touchWidth,
      touchHeight,
      fontSizeValue,
      fontSizeUnit,
      letterSpacingValue,
      letterSpacingUnit,
      ariaLabel,
      ariaPressedMode,
      ariaBusyMode,
      loading,
      tsXText,
      tsYText,
      tsBlurText,
      textShadowEnabled,
      tsColor,
      transitionColorMs,
      transitionColorEasing,
      transitionTransformMs,
      transitionTransformEasing,
      boxShadowCss,
      boxShadowHoverCss,
      boxShadowActiveCss,
      topGradientCss,
      parallaxHighlightEnabled,
      parallaxStrength,
      iconEmbossFilter,
      hoverTiltX,
      hoverTiltY,
      hoverPerspective,
      loadingLabel,
      animation,
      iconSizeText,
      iconGapText,
      loadingSpinnerMode,
      loadingSpinnerSvg,
      loadingSpinnerPosition,
      label,
      baseIconSvg,
      hoverIconSvg,
      activeIconSvg,
      loadingIconSvg,
      iconSource,
      iconName,
      iconColorMode,
      iconColorInput,
      iconPosition,
      disabled,
      hoverEnabled,
      hoverBgMode,
      hoverTextMode,
      hoverTextInput,
      hoverBorderMode,
      hoverBorderInput,
      hoverBorderWidthPx,
      activeEnabled,
      cssActiveBg,
      cssActiveText,
      cssActiveBorder,
      activeBorderWidthPx,
      cssActiveFilter,
      activeTranslateYText,
      activeScaleText,
      disabledHoverSuppressed,
      cssDisabledBg,
      cssDisabledText,
      cssDisabledBorder,
      disabledBorderWidthPx,
      disabledTextShadowCss,
      disabledOpacity,
      disabledCursor,
      align,
      cssBg,
      textInput,
      borderInput,
      cssHoverBg,
      cssHoverText,
      cssHoverBorder,
      cssHoverFilter,
      borderStyle,
      borderWidthPx,
      padX,
      padY,
      rTL,
      rTR,
      rBR,
      rBL,
      fontBucket,
      googleFontFamily,
      fontFamily,
      fontWeight,
      lHeight,
      underline,
      focusRingEnabled,
      focusRingWidthText,
      focusRingOffsetText,
      focusRingInput,
      previewBgHex,
      fontStyle,
      textTransform,
      backdropBlurEnabled,
      backdropBlurText,
      use3DIcon,
      icon3DAnimation,
      clickEffect,
    });
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const iconColorNorm = norm(iconColorInput);
  const hoverBgNorm = norm(hoverBgInput);
  const hoverGradStartNorm = norm(hoverGradStartInput);
  const hoverGradMidNorm = norm(hoverGradMidInput);
  const hoverGradEndNorm = norm(hoverGradEndInput);
  const hoverTextNorm = norm(hoverTextInput);
  const hoverBorderNorm = norm(hoverBorderInput);
  const activeBgNorm = norm(activeBgInput);
  const activeGradStartNorm = norm(activeGradStartInput);
  const activeGradMidNorm = norm(activeGradMidInput);
  const activeGradEndNorm = norm(activeGradEndInput);
  const activeTextNorm = norm(activeTextInput);
  const activeBorderNorm = norm(activeBorderInput);
  const disabledBgNorm = norm(disabledBgInput);
  const disabledTextNorm = norm(disabledTextInput);
  const disabledBorderNorm = norm(disabledBorderInput);

  const previewPayload = useMemo(
    () => ({
      label,
      variant,
      disabled,
      loading,
      loadingLabel,
      loadingSpinnerMode,
      loadingSpinnerPosition,
      loadingSpinnerSvg,
      animation,
      width: touchWidth,
      height: touchHeight,
      padX,
      padY,

      // Pass PRE-CALCULATED CSS variables
      cssBg,
      cssText,
      cssBorder,
      cssHoverBg,
      cssHoverText,
      cssHoverBorder,
      cssHoverFilter,
      cssActiveBg,
      cssActiveText,
      cssActiveBorder,
      cssActiveFilter,

      cssDisabledBg,
      cssDisabledText,
      cssDisabledBorder,
      disabledOpacity,
      disabledCursor,
      disabledBorderWidth: disabledBorderWidthPx,
      disabledHoverSuppressed,
      disabledTextShadow: disabledTextShadowCss,

      borderWidth: borderWidthPx,
      borderHoverWidth: hoverBorderWidthPx,
      borderActiveWidth: activeBorderWidthPx,
      borderStyle,

      // radius
      radiusTL: rTL,
      radiusTR: rTR,
      radiusBR: rBR,
      radiusBL: rBL,

      // shadow
      shadowEnabled,
      shX: Number(shXText) || 0,
      shY: Number(shYText) || 0,
      shBlur: Number(shBlurText) || 0,
      shSpread: Number(shSpreadText) || 0,
      shColor: hexWithAlpha(shadowBaseHex, Number(shOpacityText) || 0.1),
      boxShadow: boxShadowCss,
      boxShadowHover: boxShadowHoverCss,
      boxShadowActive: boxShadowActiveCss,
      topGradient: topGradientCss,
      parallaxHighlightEnabled,
      parallaxStrength,
      iconEmbossFilter,
      hoverTiltX,
      hoverTiltY,
      hoverPerspective,

      // typography
      fontFamily,
      fontSizeValue,
      fontSizeUnit,
      fontWeight,
      letterSpacingValue,
      letterSpacingUnit,
      lineHeight: lHeight,
      fontStyle,
      textTransform,
      underline,

      // alignment
      align,

      // text shadow
      textShadowEnabled,
      tsX: Number(tsXText) || 0,
      tsY: Number(tsYText) || 0,
      tsBlur: Number(tsBlurText) || 0,
      tsColor,

      // icon
      iconName,
      iconSource,
      iconCustomSvg,
      hoverIconEnabled,
      hoverIconSource,
      hoverIconName,
      hoverIconCustomSvg,
      activeIconEnabled,
      activeIconSource,
      activeIconName,
      activeIconCustomSvg,
      loadingIconEnabled,
      loadingIconSource,
      loadingIconName,
      loadingIconCustomSvg,
      iconPosition,
      iconSize: Number(iconSizeText) || 18,
      iconGap: Number(iconGapText) || 10,
      iconColor: iconColorMode === "text" ? "currentColor" : iconColorInput,
      baseIconSvg,
      hoverIconSvg,
      activeIconSvg,
      loadingIconSvg,

      // active
      activeEnabled,
      activeTy: activeEnabled ? Number(activeTranslateYText) || 0 : 0,
      activeScale: activeEnabled ? Number(activeScaleText) || 1 : 1,

      // focus
      focusRingEnabled,
      focusRingWidth: Number(focusRingWidthText) || 4,
      focusRingOffset: Number(focusRingOffsetText) || 2,
      focusRingColor: focusRingInput,

      // preview specific
      backdropBlurEnabled,
      backdropBlurText,
      previewBg: previewBgHex,
      ariaLabel,
      ariaPressedMode,
      ariaBusyMode,
      groupEnabled,
      groupAlign,
      groupGap: groupGapPx,
      hoverEnabled,
      forceHover,
      forceActive,
      forceFocus,
      transitionColorMs,
      transitionColorEasing,
      transitionTransformMs,
      transitionTransformEasing,
    }),
    [
      label,
      variant,
      disabled,
      loading,
      animation,
      loadingLabel,
      loadingSpinnerMode,
      loadingSpinnerPosition,
      loadingSpinnerSvg,
      touchWidth,
      touchHeight,
      padX,
      padY,
      cssBg,
      cssText,
      cssBorder,
      cssHoverBg,
      cssHoverText,
      cssHoverBorder,
      cssHoverFilter,
      cssActiveBg,
      cssActiveText,
      cssActiveBorder,
      cssActiveFilter,
      cssDisabledBg,
      cssDisabledText,
      cssDisabledBorder,
      disabledOpacity,
      disabledCursor,
      disabledBorderWidthPx,
      disabledHoverSuppressed,
      disabledTextShadowCss,
      borderWidthPx,
      hoverBorderWidthPx,
      activeBorderWidthPx,
      borderStyle,
      rTL,
      rTR,
      rBR,
      rBL,
      shadowEnabled,
      shXText,
      shYText,
      shBlurText,
      shSpreadText,
      shOpacityText,
      shadowBaseHex,
      boxShadowCss,
      boxShadowHoverCss,
      boxShadowActiveCss,
      topGradientCss,
      parallaxHighlightEnabled,
      parallaxStrength,
      iconEmbossFilter,
      hoverTiltX,
      hoverTiltY,
      hoverPerspective,
      fontFamily,
      fontSizeValue,
      fontSizeUnit,
      fontWeight,
      letterSpacingValue,
      letterSpacingUnit,
      lHeight,
      fontStyle,
      textTransform,
      underline,
      align,
      textShadowEnabled,
      tsXText,
      tsYText,
      tsBlurText,
      tsColor,
      iconName,
      iconSource,
      iconCustomSvg,
      hoverIconEnabled,
      hoverIconSource,
      hoverIconName,
      hoverIconCustomSvg,
      activeIconEnabled,
      activeIconSource,
      activeIconName,
      activeIconCustomSvg,
      loadingIconEnabled,
      loadingIconSource,
      loadingIconName,
      loadingIconCustomSvg,
      iconPosition,
      iconSizeText,
      iconGapText,
      iconColorMode,
      iconColorInput,
      baseIconSvg,
      hoverIconSvg,
      activeIconSvg,
      loadingIconSvg,
      activeEnabled,
      activeTranslateYText,
      activeScaleText,
      focusRingEnabled,
      focusRingWidthText,
      focusRingOffsetText,
      focusRingInput,
      previewBgHex,
      ariaLabel,
      ariaPressedMode,
      ariaBusyMode,
      groupEnabled,
      groupAlign,
      groupGapPx,
      hoverEnabled,
      forceHover,
      forceActive,
      forceFocus,
      transitionColorMs,
      transitionColorEasing,
      transitionTransformMs,
      transitionTransformEasing,
    ],
  );

  useEffect(() => {
    if (!iframeRef.current?.contentWindow) return;
    iframeRef.current.contentWindow.postMessage(previewPayload, "*");
  }, [previewPayload]);

  const initialSrcDoc = PREVIEW_SRC_DOC;

  const shadowSectionProps = {
    PALETTE,
    shadowEnabled,
    setShadowEnabled,
    shXText,
    setShXText,
    shYText,
    setShYText,
    shBlurText,
    setShBlurText,
    shSpreadText,
    setShSpreadText,
    shOpacityText,
    setShOpacityText,
    shColorInput,
    setShColorInput,
    shColorOk: shColorNorm.ok,
    shColorHex: shColorNorm.hex,
    shColorRgb: shColorNorm.rgb,
    shadowTemp,
    setShadowTemp,
    elevationPreset,
    setElevationPreset,
    onApplyElevationPreset: handleApplyElevationPreset,
    depthText,
    setDepthText,
    depthPx,
    lightDirection,
    setLightDirection,
    lightAngleText,
    setLightAngleText,
    shadowStackEnabled,
    setShadowStackEnabled,
    stack1Enabled,
    setStack1Enabled,
    stack1XText,
    setStack1XText,
    stack1YText,
    setStack1YText,
    stack1BlurText,
    setStack1BlurText,
    stack1SpreadText,
    setStack1SpreadText,
    stack1OpacityText,
    setStack1OpacityText,
    stack2Enabled,
    setStack2Enabled,
    stack2XText,
    setStack2XText,
    stack2YText,
    setStack2YText,
    stack2BlurText,
    setStack2BlurText,
    stack2SpreadText,
    setStack2SpreadText,
    stack2OpacityText,
    setStack2OpacityText,
    stack3Enabled,
    setStack3Enabled,
    stack3XText,
    setStack3XText,
    stack3YText,
    setStack3YText,
    stack3BlurText,
    setStack3BlurText,
    stack3SpreadText,
    setStack3SpreadText,
    stack3OpacityText,
    setStack3OpacityText,
    innerShadowEnabled,
    setInnerShadowEnabled,
    glossEnabled,
    setGlossEnabled,
    glossSizeText,
    setGlossSizeText,
    glossOpacityText,
    setGlossOpacityText,
    bevelEnabled,
    setBevelEnabled,
    bevelSizeText,
    setBevelSizeText,
    bevelSoftnessText,
    setBevelSoftnessText,
    materialPreset,
    setMaterialPreset,
    onApplyMaterialPreset: handleApplyMaterialPreset,
    edgeThicknessText,
    setEdgeThicknessText,
    edgeGradientEnabled,
    setEdgeGradientEnabled,
    edgeGradientSizeText,
    setEdgeGradientSizeText,
    edgeGradientStrengthText,
    setEdgeGradientStrengthText,
    topGradientEnabled,
    setTopGradientEnabled,
    topGradAngleText,
    setTopGradAngleText,
    topGradStartInput,
    setTopGradStartInput,
    topGradStartNorm,
    topGradMidEnabled,
    setTopGradMidEnabled,
    topGradMidInput,
    setTopGradMidInput,
    topGradMidNorm,
    topGradEndInput,
    setTopGradEndInput,
    topGradEndNorm,
    topGradOpacityText,
    setTopGradOpacityText,
    parallaxHighlightEnabled,
    setParallaxHighlightEnabled,
    parallaxStrengthText,
    setParallaxStrengthText,
    rimLightEnabled,
    setRimLightEnabled,
    rimLightColorInput,
    setRimLightColorInput,
    rimLightOk: rimLightNorm.ok,
    rimLightHex: rimLightNorm.hex,
    rimLightRgb: rimLightNorm.rgb,
    rimLightSizeText,
    setRimLightSizeText,
    rimLightOpacityText,
    setRimLightOpacityText,
    iconEmbossMode,
    setIconEmbossMode,
    iconEmbossDepthText,
    setIconEmbossDepthText,
    iconEmbossStrengthText,
    setIconEmbossStrengthText,
    borderDepthMode,
    setBorderDepthMode,
    borderDepthSizeText,
    setBorderDepthSizeText,
    baseShadowEnabled,
    setBaseShadowEnabled,
    baseShadowSizeText,
    setBaseShadowSizeText,
    baseShadowOpacityText,
    setBaseShadowOpacityText,
    pressedDepthText,
    setPressedDepthText,
    pressedInsetEnabled,
    setPressedInsetEnabled,
    hoverLiftText,
    setHoverLiftText,
    specularStrengthText,
    setSpecularStrengthText,
    roughnessText,
    setRoughnessText,
    aoStrengthText,
    setAoStrengthText,
    hoverTiltXText,
    setHoverTiltXText,
    hoverTiltYText,
    setHoverTiltYText,
    hoverPerspectiveText,
    setHoverPerspectiveText,
  };

  const iconSectionProps = {
    PALETTE,
    iconName,
    setIconName,
    iconSource,
    setIconSource,
    iconCustomSvg,
    setIconCustomSvg,
    iconPosition,
    setIconPosition,
    iconSizeText,
    setIconSizeText,
    iconSize: Number(iconSizeText),
    iconGapText,
    setIconGapText,
    iconGap: Number(iconGapText),
    iconColorMode,
    setIconColorMode,
    iconColorInput,
    setIconColorInput,
    iconColorNorm,
    baseTextHex: textInput,
    hoverIconEnabled,
    setHoverIconEnabled,
    hoverIconSource,
    setHoverIconSource,
    hoverIconName,
    setHoverIconName,
    hoverIconCustomSvg,
    setHoverIconCustomSvg,
    activeIconEnabled,
    setActiveIconEnabled,
    activeIconSource,
    setActiveIconSource,
    activeIconName,
    setActiveIconName,
    activeIconCustomSvg,
    setActiveIconCustomSvg,
    loadingIconEnabled,
    setLoadingIconEnabled,
    loadingIconSource,
    setLoadingIconSource,
    loadingIconName,
    setLoadingIconName,
    loadingIconCustomSvg,
    setLoadingIconCustomSvg,
  };

  const threeJSSectionProps = {
    use3DIcon,
    setUse3DIcon,
    icon3DGeometry,
    setIcon3DGeometry,
    icon3DMaterial,
    setIcon3DMaterial,
    icon3DAnimation,
    setIcon3DAnimation,
    iconRoughness,
    setIconRoughness,
    iconMetalness,
    setIconMetalness,
    iconTransmission,
    setIconTransmission,
    iconEmissive,
    setIconEmissive,
    icon3DColorMode,
    setIcon3DColorMode,
    icon3DColorInput,
    setIcon3DColorInput,
    iconDistortion,
    setIconDistortion,
    iconThickness,
    setIconThickness,
    iconChromaticAberration,
    setIconChromaticAberration,
    clickEffect,
    setClickEffect,
    clickParticleCount,
    setClickParticleCount,
    hoverEffect,
    setHoverEffect,
    hoverSpringStiffness,
    setHoverSpringStiffness,
    hoverSpringDamping,
    setHoverSpringDamping,
  };

  const disabledSectionProps = {
    PALETTE,
    disabledOpacityText,
    setDisabledOpacityText,
    disabledCursor,
    setDisabledCursor,
    disabledUseCustomColors,
    setDisabledUseCustomColors,
    disabledBgInput,
    setDisabledBgInput,
    disabledBgNorm,
    disabledTextInput,
    setDisabledTextInput,
    disabledTextNorm,
    disabledBorderInput,
    setDisabledBorderInput,
    disabledBorderNorm,
    disabledBorderWidthText,
    setDisabledBorderWidthText,
    disabledBorderWidthPx,
    disabledHoverSuppressed,
    setDisabledHoverSuppressed,
    disabledTextShadowEnabled,
    setDisabledTextShadowEnabled,
  };

  const hoverSectionProps = {
    PALETTE,
    hoverEnabled,
    setHoverEnabled,
    hoverBgMode,
    setHoverBgMode,
    hoverBgInput,
    setHoverBgInput,
    hoverBgOk: hoverBgNorm.ok,
    hoverBgHex: hoverBgNorm.hex,
    hoverBgRgb: hoverBgNorm.rgb,
    hoverGradAngleText,
    setHoverGradAngleText,
    hoverGradStartInput,
    setHoverGradStartInput,
    hoverGradStartNorm,
    hoverGradMidEnabled,
    setHoverGradMidEnabled,
    hoverGradMidInput,
    setHoverGradMidInput,
    hoverGradMidNorm,
    hoverGradEndInput,
    setHoverGradEndInput,
    hoverGradEndNorm,
    hoverTextMode,
    setHoverTextMode,
    hoverTextInput,
    setHoverTextInput,
    hoverTextOk: hoverTextNorm.ok,
    hoverTextHex: hoverTextNorm.hex,
    hoverTextRgb: hoverTextNorm.rgb,
    hoverBorderMode,
    setHoverBorderMode,
    hoverBorderInput,
    setHoverBorderInput,
    hoverBorderOk: hoverBorderNorm.ok,
    hoverBorderHex: hoverBorderNorm.hex,
    hoverBorderRgb: hoverBorderNorm.rgb,
    transitionColorDurationText,
    setTransitionColorDurationText,
    transitionColorMs,
    transitionColorEasing,
    setTransitionColorEasing,
  };

  const activeSectionProps = {
    idActive: "active-check",
    activeEnabled,
    setActiveEnabled,
    activeTranslateYText,
    setActiveTranslateYText,
    activeTranslateY: Number(activeTranslateYText),
    activeScaleText,
    setActiveScaleText,
    activeScale: Number(activeScaleText),
    PALETTE,
    activeBgMode,
    setActiveBgMode,
    activeBgInput,
    setActiveBgInput,
    activeBgNorm,
    activeGradAngleText,
    setActiveGradAngleText,
    activeGradStartInput,
    setActiveGradStartInput,
    activeGradStartNorm,
    activeGradMidEnabled,
    setActiveGradMidEnabled,
    activeGradMidInput,
    setActiveGradMidInput,
    activeGradMidNorm,
    activeGradEndInput,
    setActiveGradEndInput,
    activeGradEndNorm,
    activeTextMode,
    setActiveTextMode,
    activeTextInput,
    setActiveTextInput,
    activeTextNorm,
    activeBorderMode,
    setActiveBorderMode,
    activeBorderInput,
    setActiveBorderInput,
    activeBorderNorm,
    transitionTransformDurationText,
    setTransitionTransformDurationText,
    transitionTransformMs,
    transitionTransformEasing,
    setTransitionTransformEasing,
  };

  const accessibilitySectionProps = {
    ariaLabel,
    setAriaLabel,
    ariaPressedMode,
    setAriaPressedMode,
    ariaBusyMode,
    setAriaBusyMode,
    minTouchMode,
    setMinTouchMode,
    minTouchSizeText,
    setMinTouchSizeText,
    minTouchSizePx,
    minTouchWarning,
    contrastRatioText,
    contrastOk,
    contrastNote,
  };

  const sectionItems = [
    {
      id: "basics",
      label: "Basics",
      content: (
        <BasicsSection
          label={label}
          setLabel={setLabel}
          variant={variant}
          setVariant={setVariant}
          disabled={disabled}
          setDisabled={setDisabled}
          loading={loading}
          setLoading={setLoading}
          animation={animation}
          setAnimation={setAnimation}
          idDisabled="disable-check"
          idLoading="loading-check"
        />
      ),
    },
    {
      id: "sizing",
      label: "Sizing",
      content: (
        <SizingSection
          subtitle="Dimensions & Spacing"
          widthText={widthText}
          setWidthText={setWidthText}
          effectiveWidthPx={wPx}
          heightText={heightText}
          setHeightText={setHeightText}
          effectiveHeightPx={hPx}
          paddingXText={paddingXText}
          setPaddingXText={setPaddingXText}
          paddingYText={paddingYText}
          setPaddingYText={setPaddingYText}
        />
      ),
    },
    {
      id: "colors",
      label: "Colors",
      content: (
        <ColorsSection
          PALETTE={PALETTE}
          variant={variant}
          // setVariant removed to prevent error
          useGradient={useGradient}
          setUseGradient={setUseGradient}
          gradAngleText={gradAngleText}
          setGradAngleText={setGradAngleText}
          gradStartInput={gradStartInput}
          setGradStartInput={setGradStartInput}
          gradStartNorm={norm(gradStartInput)}
          gradMidEnabled={gradMidEnabled}
          setGradMidEnabled={setGradMidEnabled}
          gradMidInput={gradMidInput}
          setGradMidInput={setGradMidInput}
          gradMidNorm={norm(gradMidInput)}
          gradEndInput={gradEndInput}
          setGradEndInput={setGradEndInput}
          gradEndNorm={norm(gradEndInput)}
          bgInput={bgInput}
          setBgInput={setBgInput}
          bgNorm={norm(bgInput)}
          textInput={textInput}
          setTextInput={setTextInput}
          textNorm={norm(textInput)}
        />
      ),
    },
    {
      id: "outline-ghost",
      label: "Outline/Ghost",
      content: (
        <OutlineGhostPresetsSection
          variant={variant}
          previewBg={previewBgHex}
          applyOutlinePreset={applyOutlinePreset}
          applyGhostPreset={applyGhostPreset}
        />
      ),
    },
    {
      id: "border",
      label: "Border",
      content: (
        <BorderSection
          PALETTE={PALETTE}
          variant={variant}
          borderWidthText={borderWidthText}
          setBorderWidthText={setBorderWidthText}
          borderHoverWidthText={borderHoverWidthText}
          setBorderHoverWidthText={setBorderHoverWidthText}
          borderActiveWidthText={borderActiveWidthText}
          setBorderActiveWidthText={setBorderActiveWidthText}
          borderStyle={borderStyle}
          setBorderStyle={setBorderStyle}
          borderInput={borderInput}
          setBorderInput={setBorderInput}
          borderNorm={norm(borderInput)}
          computedBorderWidth={Number(borderWidthText)}
          computedBorderStyle={borderStyle}
        />
      ),
    },
    {
      id: "radius",
      label: "Radius",
      content: (
        <RadiusSection
          linkRadius={linkRadius}
          setLinkRadius={setLinkRadius}
          radiusText={radiusText}
          setRadiusText={setRadiusText}
          radiusTLText={radiusTLText}
          setRadiusTLText={setRadiusTLText}
          radiusTRText={radiusTRText}
          setRadiusTRText={setRadiusTRText}
          radiusBRText={radiusBRText}
          setRadiusBRText={setRadiusBRText}
          radiusBLText={radiusBLText}
          setRadiusBLText={setRadiusBLText}
          radiusUnified={Number(radiusText)}
          radiusTL={rTL}
          radiusTR={rTR}
          radiusBR={rBR}
          radiusBL={rBL}
        />
      ),
    },
    {
      id: "shadow",
      label: "Shadow",
      content: <ShadowSection {...shadowSectionProps} />,
    },
    {
      id: "typography",
      label: "Typography",
      content: (
        <TypographySection
          fontBucket={fontBucket}
          setFontBucket={setFontBucket}
          fontSearch={fontSearch}
          setFontSearch={setFontSearch}
          systemFonts={SYSTEM_FONTS}
          filteredSystemFonts={filteredSystemFonts}
          systemFontIdx={systemFontIdx}
          setSystemFontIdx={setSystemFontIdx}
          googleFonts={GOOGLE_FONTS}
          filteredGoogleFonts={filteredGoogleFonts}
          googleFontFamily={googleFontFamily}
          setGoogleFontFamily={setGoogleFontFamily}
          fontSizeText={fontSizeText}
          setFontSizeText={setFontSizeText}
          fontSizeDisplay={fontSizeDisplay}
          fontSizeUnit={fontSizeUnit}
          setFontSizeUnit={setFontSizeUnit}
          fontSizeMin={fontSizeMin}
          fontSizeMax={fontSizeMax}
          fontSizeStep={fontSizeStep}
          fontWeight={fontWeight}
          setFontWeight={setFontWeight}
          letterSpacingDisplay={letterSpacingDisplay}
          letterSpacingUnit={letterSpacingUnit}
          setLetterSpacingUnit={setLetterSpacingUnit}
          letterSpacingMin={letterSpacingMin}
          letterSpacingMax={letterSpacingMax}
          letterSpacingStep={letterSpacingStep}
          letterSpacingText={letterSpacingText}
          setLetterSpacingText={setLetterSpacingText}
          lineHeight={lHeight}
          lineHeightText={lineHeightText}
          setLineHeightText={setLineHeightText}
          fontStyle={fontStyle}
          setFontStyle={setFontStyle}
          textTransform={textTransform}
          setTextTransform={setTextTransform}
          underline={underline}
          setUnderline={setUnderline}
          idItalic={idItalic}
          idUnderline={idUnderline}
        />
      ),
    },
    {
      id: "effects",
      label: "Effects (New)",
      content: <ThreeJSSection {...(threeJSSectionProps as any)} />,
    },
    {
      id: "text-position",
      label: "Text Position",
      content: <TextPositionSection align={align} setAlign={setAlign} />,
    },
    {
      id: "text-shadow",
      label: "Text Shadow",
      content: (
        <TextShadowSection
          PALETTE={PALETTE}
          textShadowEnabled={textShadowEnabled}
          setTextShadowEnabled={setTextShadowEnabled}
          tsColorMode={tsColorMode}
          setTsColorMode={setTsColorMode}
          tsXText={tsXText}
          setTsXText={setTsXText}
          tsYText={tsYText}
          setTsYText={setTsYText}
          tsBlurText={tsBlurText}
          setTsBlurText={setTsBlurText}
          tsOpacityText={tsOpacityText}
          setTsOpacityText={setTsOpacityText}
          tsColorInput={tsColorInput}
          setTsColorInput={setTsColorInput}
          tsColorOk={norm(tsColorInput).ok}
          tsColorHex={norm(tsColorInput).hex}
          tsColorRgb={norm(tsColorInput).rgb}
        />
      ),
    },
    {
      id: "icon",
      label: "Icon",
      content: <IconSection {...iconSectionProps} />,
    },
    {
      id: "group",
      label: "Group Preview",
      content: (
        <GroupPreviewSection
          groupEnabled={groupEnabled}
          setGroupEnabled={setGroupEnabled}
          groupAlign={groupAlign}
          setGroupAlign={setGroupAlign}
          groupGapText={groupGapText}
          setGroupGapText={setGroupGapText}
          groupGapPx={groupGapPx}
        />
      ),
    },
    {
      id: "loading",
      label: "Loading",
      content: (
        <LoadingSection
          loadingLabel={loadingLabel}
          setLoadingLabel={setLoadingLabel}
          loadingSpinnerMode={loadingSpinnerMode}
          setLoadingSpinnerMode={setLoadingSpinnerMode}
          loadingSpinnerPosition={loadingSpinnerPosition}
          setLoadingSpinnerPosition={setLoadingSpinnerPosition}
          loadingSpinnerSvg={loadingSpinnerSvg}
          setLoadingSpinnerSvg={setLoadingSpinnerSvg}
        />
      ),
    },
    {
      id: "disabled",
      label: "Disabled",
      content: <DisabledSection {...disabledSectionProps} />,
    },
    {
      id: "hover",
      label: "Hover",
      content: <HoverSection {...hoverSectionProps} />,
    },
    {
      id: "active",
      label: "Active",
      content: <ActiveStateSection {...activeSectionProps} />,
    },
    {
      id: "focus",
      label: "Focus Ring",
      content: (
        <FocusRingSection
          PALETTE={PALETTE}
          idRing="focus-check"
          focusRingEnabled={focusRingEnabled}
          setFocusRingEnabled={setFocusRingEnabled}
          focusRingWidthText={focusRingWidthText}
          setFocusRingWidthText={setFocusRingWidthText}
          ringWidth={Number(focusRingWidthText)}
          focusRingOffsetText={focusRingOffsetText}
          setFocusRingOffsetText={setFocusRingOffsetText}
          ringOffset={Number(focusRingOffsetText)}
          focusRingInput={focusRingInput}
          setFocusRingInput={setFocusRingInput}
          focusRingNorm={norm(focusRingInput)}
        />
      ),
    },
    {
      id: "state-preview",
      label: "State Preview",
      content: (
        <StatePreviewSection
          forceHover={forceHover}
          setForceHover={setForceHover}
          forceActive={forceActive}
          setForceActive={setForceActive}
          forceFocus={forceFocus}
          setForceFocus={setForceFocus}
        />
      ),
    },
    {
      id: "accessibility",
      label: "Accessibility",
      content: <AccessibilitySection {...accessibilitySectionProps} />,
    },
  ];

  const activePanel =
    sectionItems.find((item) => item.id === activeSection) ?? sectionItems[0];

  // --- Live Preview Node construction ---
  const showLivePreview = use3DIcon !== "none" || clickEffect !== "none";
  let livePreviewNode = null;

  if (showLivePreview) {
    const style: React.CSSProperties = {
      backgroundColor: cssBg,
      color: cssText,
      borderColor: cssBorder,
      borderWidth: `${borderWidthPx}px`,
      borderStyle: borderStyle as any,
      borderRadius: `${rTL}px ${rTR}px ${rBR}px ${rBL}px`,
      paddingTop: `${padY}px`,
      paddingBottom: `${padY}px`,
      paddingLeft: `${padX}px`,
      paddingRight: `${padX}px`,
      width: `${wPx}px`,
      height: `${hPx}px`,
      fontSize: fontSizeDisplay,
      fontFamily: fontFamily,
      fontWeight: fontWeight,
      letterSpacing: letterSpacingDisplay,
      lineHeight: lHeight,
      fontStyle: fontStyle,
      textTransform: textTransform,
      textDecoration: underline ? "underline" : "none",
      // Shadows
      boxShadow: boxShadowCss,
      // Transforms
      transform:
        activeEnabled && forceActive
          ? `scale(${parseFloat(activeScaleText) || 1}) translateY(${
              parseFloat(activeTranslateYText) || 0
            }px)`
          : "none",
      cursor: disabled ? disabledCursor : "pointer",
      opacity: disabled ? disabledOpacity : 1,
      // Transitions
      transition: `all ${transitionColorMs}ms ${transitionColorEasing}, transform ${transitionTransformMs}ms ${transitionTransformEasing}`,

      // Flex
      display: "flex",
      alignItems: align.startsWith("top")
        ? "flex-start"
        : align.startsWith("bottom")
          ? "flex-end"
          : "center",
      justifyContent: align.includes("left")
        ? "flex-start"
        : align.includes("right")
          ? "flex-end"
          : "center",
      gap: `${Number(iconGapText)}px`,
    };

    livePreviewNode = (
      <LivePreview
        use3DIcon={use3DIcon as any}
        icon3DGeometry={icon3DGeometry}
        icon3DMaterial={icon3DMaterial}
        icon3DAnimation={icon3DAnimation}
        iconRoughness={iconRoughness}
        iconMetalness={iconMetalness}
        iconTransmission={iconTransmission}
        iconEmissive={iconEmissive}
        iconDistortion={iconDistortion}
        iconThickness={iconThickness}
        iconChromaticAberration={iconChromaticAberration}
        clickEffect={clickEffect as any}
        clickParticleCount={clickParticleCount}
        hoverEffect={hoverEffect}
        hoverSpringStiffness={hoverSpringStiffness}
        hoverSpringDamping={hoverSpringDamping}
        buttonStyle={style}
        label={label}
        iconColor={icon3DColorMode === "text" ? cssText : icon3DColorInput}
      />
    );
  }

  // --- Render ---
  return (
    <AppShell contentOverflow="hidden">
      {/* Layout: Fixed height container with independent scrolling columns */}
      <div
        ref={splitRef}
        className="flex flex-col gap-6 h-full lg:min-h-0 lg:flex-row lg:overflow-hidden"
        style={{ userSelect: isResizing ? "none" : "auto" }}
      >
        {/* Left Column: Controls */}
        <div
          className="flex-1 space-y-6 px-4 lg:min-h-0 lg:overflow-y-auto lg:px-6 lg:pb-10 lg:overscroll-contain lg:h-full"
          style={{
            scrollbarGutter: "stable",
            ...(isDesktop ? { width: leftPanelWidth, flex: "0 0 auto" } : null),
          }}
        >
          <div className="flex items-center justify-between">
            <h1
              className="text-2xl font-bold tracking-tight"
              style={{ color: "var(--text)" }}
            >
              Action Button
            </h1>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={undo}
                disabled={!canUndo}
                className="flex items-center justify-center p-2 rounded-lg border transition-all"
                style={{
                  borderColor: "var(--border)",
                  color: canUndo ? "var(--text)" : "var(--muted)",
                  opacity: canUndo ? 1 : 0.5,
                  cursor: canUndo ? "pointer" : "not-allowed",
                  background: canUndo ? "var(--card)" : "transparent",
                }}
                title="Undo (Ctrl+Z)"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 7v6h6" />
                  <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
                </svg>
              </button>
              <button
                type="button"
                onClick={redo}
                disabled={!canRedo}
                className="flex items-center justify-center p-2 rounded-lg border transition-all"
                style={{
                  borderColor: "var(--border)",
                  color: canRedo ? "var(--text)" : "var(--muted)",
                  opacity: canRedo ? 1 : 0.5,
                  cursor: canRedo ? "pointer" : "not-allowed",
                  background: canRedo ? "var(--card)" : "transparent",
                }}
                title="Redo (Ctrl+Y)"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 7v6h-6" />
                  <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" />
                </svg>
              </button>
            </div>
          </div>
          <div
            className="rounded-2xl border p-3"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in oklab, var(--card) 70%, transparent)",
            }}
          >
            <div
              className="text-xs font-semibold"
              style={{ color: "var(--muted)" }}
            >
              Sections
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {sectionItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className="min-h-[52px] w-full rounded-xl border px-4 py-3 text-sm font-semibold leading-snug text-center whitespace-normal break-words uf-clickable"
                  style={{
                    borderColor: "var(--border)",
                    background:
                      activePanel?.id === item.id
                        ? "var(--primary)"
                        : "transparent",
                    color:
                      activePanel?.id === item.id ? "white" : "var(--text)",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {activePanel?.content}
        </div>

        <div className="hidden lg:flex lg:items-stretch" aria-hidden="true">
          <div
            onMouseDown={() => setIsResizing(true)}
            className="h-full w-2 cursor-col-resize rounded-full"
            style={{
              background: "color-mix(in oklab, var(--border) 80%, transparent)",
            }}
            title="Drag to resize panels"
          />
        </div>

        {/* Right Column: Preview */}
        <div
          className="flex-1 lg:min-h-0 lg:overflow-y-auto lg:pb-10 lg:h-full"
          style={{ minWidth: 360 }}
        >
          <div className="sticky top-20">
            <PreviewDownloadPanel
              mounted={mounted}
              iframeSrcDoc={initialSrcDoc}
              iframeRef={iframeRef}
              handleIframeLoad={() => {
                if (iframeRef.current?.contentWindow) {
                  iframeRef.current.contentWindow.postMessage(
                    previewPayload,
                    "*",
                  );
                }
              }}
              downloadFormat={downloadFormat}
              setDownloadFormat={setDownloadFormat}
              downloadName={downloadName}
              setDownloadName={setDownloadName}
              handleDownload={handleDownload}
              previewNode={livePreviewNode}
            />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
