"use client";

import React, {
  type SetStateAction,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import AppShell from "@/components/layout/AppShell";
import ContrastGuard from "@/app/components/controls/color/ContrastGuard";
import useHydrated from "@/components/hooks/useHydrated";
import UndoRedoButtons from "@/app/components/controls/layout/UndoRedoButtons";
import SectionSelector from "@/app/components/controls/layout/SectionSelector";

// --- Section Imports ---
import BasicsSection from "../_section/BasicsSection";
import PresetsSection from "../_section/PresetsSection";
import MotionSection from "../_section/MotionSection";
import SizingSection from "../_section/SizingSection";
import ColorsSection from "../_section/ColorsSection";
import BorderSection from "../_section/BorderSection";
import RadiusSection from "../_section/RadiusSection";
import ShadowSection from "../_section/ShadowSection";
import TypographySection from "../_section/TypographySection";
import TextPositionSection from "../_section/TextPositionSection";
import TextShadowSection from "../_section/TextShadowSection";
import IconSection from "../_section/IconSection";
import OutlineGhostPresetsSection from "../_section/OutlineGhostPresetsSection";
import GroupPreviewSection from "../_section/GroupPreviewSection";
import HoverSection from "../_section/HoverSection";
import ActiveStateSection from "../_section/ActiveStateSection";
import FocusRingSection from "../_section/FocusRingSection";
import PreviewDownloadPanel, {
  type DownloadFormat,
} from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import { PlaygroundLayout } from "@/app/components/controls/layout/PlaygroundLayout";
import LoadingSection from "../_section/LoadingSection";
import DisabledSection from "../_section/DisabledSection";
import AccessibilitySection from "../_section/AccessibilitySection";
import StatePreviewSection from "../_section/StatePreviewSection";
const ThreeJSSection = dynamic(() => import("../_section/ThreeJSSection"), {
  ssr: false,
  loading: () => (
    <div className="h-96 w-full animate-pulse rounded-xl bg-slate-900/50" />
  ),
});

import {
  PALETTE,
  SYSTEM_FONTS,
} from "../_data/buttonConstants";
import { BUTTON_PRESETS, type ButtonPreset } from "../_data/buttonPresets";
import LivePreview from "../_section/LivePreview";
import { resolveIconSvg } from "../_utils/iconMarkup";
import {
  buildGradient,
  clamp,
  contrastHex,
  contrastRatio,
  hexWithAlpha,
  norm,
} from "../_utils/colorUtils";
import { buildExportPayload } from "../_utils/exportUtils";
import { PREVIEW_SRC_DOC } from "../_utils/previewDoc";
import { useHistoryState } from "@/app/hooks/useHistoryState";

import {
  type ActionButtonState,
  INITIAL_STATE,
} from "../types";

export default function ActionButtonPage() {
  const sectionVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 72 : direction < 0 ? -72 : 0,
      opacity: direction === 0 ? 0 : 0,
      position: "relative" as const,
    }),
    center: {
      opacity: 1,
      x: 0,
      position: "relative" as const,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -72 : direction < 0 ? 72 : 0,
      opacity: direction === 0 ? 0 : 0,
      position: "relative" as const,
    }),
  };

  const mounted = useHydrated();
  const [activeSection, setActiveSection] = useState("basics");
  const [sectionTransitionDir, setSectionTransitionDir] = useState(0);
  const [previewResetKey, setPreviewResetKey] = useState(0);
  // Initialize unified history state
  const {
    state,
    set: updateState,
    undo,
    redo,
    reset,
    canUndo,
    canRedo,
  } = useHistoryState<ActionButtonState>(INITIAL_STATE);

  // Destructure for easy access (read-only)
  const setKey = <Key extends keyof ActionButtonState>(key: Key) =>
    (value: SetStateAction<ActionButtonState[Key]>) => {
      updateState((previous) => {
        const nextValue =
          typeof value === "function"
            ? (
                value as (
                  current: ActionButtonState[Key],
                ) => ActionButtonState[Key]
              )(previous[key])
            : value;

        return { ...previous, [key]: nextValue };
      });
    };

  const {
    label,
    variant,
    disabled,
    loading,
    animation,
    textAnimation,
    depthAnimation,
    animationDurationText,
    animationSpeedText,
    animationIntensityText,
    animationEasing,
    textAnimationStaggerText,
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
    icon3DText,
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
  const setLoadingLabel = setKey("loadingLabel");
  const setLoadingSpinnerMode = setKey("loadingSpinnerMode");
  const setLoadingSpinnerPosition = setKey("loadingSpinnerPosition");
  const setLoadingSpinnerSvg = setKey("loadingSpinnerSvg");

  const setWidthText = setKey("widthText");
  const setHeightText = setKey("heightText");
  const setPaddingXText = setKey("paddingXText");
  const setPaddingYText = setKey("paddingYText");

  const setUseGradient = setKey("useGradient");
  const setTextInput = setKey("textInput");

  const setBorderWidthText = setKey("borderWidthText");
  const setBorderInput = setKey("borderInput");

  const setDisabledOpacityText = setKey("disabledOpacityText");
  const setDisabledCursor = setKey("disabledCursor");
  const setDisabledUseCustomColors = setKey("disabledUseCustomColors");
  const setDisabledBgInput = setKey("disabledBgInput");
  const setDisabledTextInput = setKey("disabledTextInput");
  const setDisabledBorderInput = setKey("disabledBorderInput");
  const setDisabledBorderWidthText = setKey("disabledBorderWidthText");
  const setDisabledHoverSuppressed = setKey("disabledHoverSuppressed");
  const setDisabledTextShadowEnabled = setKey("disabledTextShadowEnabled");

  const setUse3DIcon = setKey("use3DIcon");
  const setIcon3DAnimation = setKey("icon3DAnimation");
  const setClickEffect = setKey("clickEffect");
  const setIcon3DGeometry = setKey("icon3DGeometry");
  const setIcon3DMaterial = setKey("icon3DMaterial");
  const setIconRoughness = setKey("iconRoughness");
  const setIconMetalness = setKey("iconMetalness");
  const setIconTransmission = setKey("iconTransmission");
  const setIconEmissive = setKey("iconEmissive");
  const setIcon3DColorMode = setKey("icon3DColorMode");
  const setIcon3DColorInput = setKey("icon3DColorInput");
  const setIcon3DText = setKey("icon3DText");
  const setIconDistortion = setKey("iconDistortion");
  const setIconThickness = setKey("iconThickness");
  const setIconChromaticAberration = setKey("iconChromaticAberration");
  const setClickParticleCount = setKey("clickParticleCount");
  const setHoverEffect = setKey("hoverEffect");
  const setHoverSpringStiffness = setKey("hoverSpringStiffness");
  const setHoverSpringDamping = setKey("hoverSpringDamping");
  const setAlign = setKey("align");

  const setTextShadowEnabled = setKey("textShadowEnabled");
  const setTsColorMode = setKey("tsColorMode");
  const setTsXText = setKey("tsXText");
  const setTsYText = setKey("tsYText");
  const setTsBlurText = setKey("tsBlurText");
  const setTsOpacityText = setKey("tsOpacityText");
  const setTsColorInput = setKey("tsColorInput");

  const setIconName = setKey("iconName");
  const setIconSource = setKey("iconSource");
  const setIconCustomSvg = setKey("iconCustomSvg");
  const setIconPosition = setKey("iconPosition");
  const setIconSizeText = setKey("iconSizeText");
  const setIconGapText = setKey("iconGapText");
  const setIconColorMode = setKey("iconColorMode");
  const setIconColorInput = setKey("iconColorInput");

  const setHoverIconEnabled = setKey("hoverIconEnabled");
  const setHoverIconSource = setKey("hoverIconSource");
  const setHoverIconName = setKey("hoverIconName");
  const setHoverIconCustomSvg = setKey("hoverIconCustomSvg");

  const setActiveIconEnabled = setKey("activeIconEnabled");
  const setActiveIconSource = setKey("activeIconSource");
  const setActiveIconName = setKey("activeIconName");
  const setActiveIconCustomSvg = setKey("activeIconCustomSvg");

  const setLoadingIconEnabled = setKey("loadingIconEnabled");
  const setLoadingIconSource = setKey("loadingIconSource");
  const setLoadingIconName = setKey("loadingIconName");
  const setLoadingIconCustomSvg = setKey("loadingIconCustomSvg");

  const setGroupEnabled = setKey("groupEnabled");
  const setGroupAlign = setKey("groupAlign");
  const setGroupGapText = setKey("groupGapText");

  const setHoverEnabled = setKey("hoverEnabled");
  const setHoverBgMode = setKey("hoverBgMode");
  const setHoverBgInput = setKey("hoverBgInput");
  const setHoverGradAngleText = setKey("hoverGradAngleText");
  const setHoverGradStartInput = setKey("hoverGradStartInput");
  const setHoverGradMidEnabled = setKey("hoverGradMidEnabled");
  const setHoverGradMidInput = setKey("hoverGradMidInput");
  const setHoverGradEndInput = setKey("hoverGradEndInput");
  const setHoverTextMode = setKey("hoverTextMode");
  const setHoverTextInput = setKey("hoverTextInput");
  const setHoverBorderMode = setKey("hoverBorderMode");
  const setHoverBorderInput = setKey("hoverBorderInput");

  const setActiveEnabled = setKey("activeEnabled");
  const setActiveTranslateYText = setKey("activeTranslateYText");
  const setActiveScaleText = setKey("activeScaleText");
  const setActiveBgMode = setKey("activeBgMode");
  const setActiveBgInput = setKey("activeBgInput");
  const setActiveGradAngleText = setKey("activeGradAngleText");
  const setActiveGradStartInput = setKey("activeGradStartInput");
  const setActiveGradMidEnabled = setKey("activeGradMidEnabled");
  const setActiveGradMidInput = setKey("activeGradMidInput");
  const setActiveGradEndInput = setKey("activeGradEndInput");
  const setActiveTextMode = setKey("activeTextMode");
  const setActiveTextInput = setKey("activeTextInput");
  const setActiveBorderMode = setKey("activeBorderMode");
  const setActiveBorderInput = setKey("activeBorderInput");

  const setFocusRingEnabled = setKey("focusRingEnabled");
  const setFocusRingWidthText = setKey("focusRingWidthText");
  const setFocusRingOffsetText = setKey("focusRingOffsetText");
  const setFocusRingInput = setKey("focusRingInput");

  const setTransitionColorDurationText = setKey("transitionColorDurationText");
  const setTransitionColorEasing = setKey("transitionColorEasing");
  const setTransitionTransformDurationText = setKey("transitionTransformDurationText");
  const setTransitionTransformEasing = setKey("transitionTransformEasing");

  const setAriaLabel = setKey("ariaLabel");
  const setAriaPressedMode = setKey("ariaPressedMode");
  const setAriaBusyMode = setKey("ariaBusyMode");
  const setMinTouchMode = setKey("minTouchMode");
  const setMinTouchSizeText = setKey("minTouchSizeText");

  const setForceHover = setKey("forceHover");
  const setForceActive = setKey("forceActive");
  const setForceFocus = setKey("forceFocus");

  const setPreviewBgMode = setKey("previewBgMode");
  const setPreviewBgInput = setKey("previewBgInput");
  const setDownloadFormat = (v: SetStateAction<DownloadFormat>) =>
    updateState((s) => ({
      ...s,
      downloadFormat: v instanceof Function ? v(s.downloadFormat) : v,
    }));
  const setDownloadName = (v: SetStateAction<string>) =>
    updateState((s) => ({
      ...s,
      downloadName: v instanceof Function ? v(s.downloadName) : v,
    }));

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

  // --- Computed Values ---
  const wPx = clamp(Number(widthText) || 220, 40, 720);
  const hPx = clamp(Number(heightText) || 44, 24, 240);
  const padX = clamp(Number(paddingXText) || 14, 0, 80);
  const padY = clamp(Number(paddingYText) || 0, 0, 40);

  const fontSizeMin = fontSizeUnit === "rem" ? 0.5 : 8;
  const fontSizeMax = fontSizeUnit === "rem" ? 6 : 96;
  const fontSizeValue = clamp(
    Number(fontSizeText) || 14,
    fontSizeMin,
    fontSizeMax,
  );
  const letterSpacingMin = letterSpacingUnit === "em" ? -0.1 : -2;
  const letterSpacingMax = letterSpacingUnit === "em" ? 0.6 : 10;
  const letterSpacingValue = clamp(
    Number(letterSpacingText) || 0,
    letterSpacingMin,
    letterSpacingMax,
  );
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
    setPreviewResetKey((current) => current + 1);
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
    setPreviewResetKey((current) => current + 1);
  };

  const applyButtonPreset = (preset: ButtonPreset) => {
    updateState((current) => ({
      ...preset.state,
      downloadFormat: current.downloadFormat,
      downloadName: current.downloadName,
    }));
    setPreviewResetKey((current) => current + 1);
  };

  // --- Dynamic Icon Generation ---
  const baseIconSvg = resolveIconSvg(iconSource, iconName, iconCustomSvg);

  const hoverIconSvg = hoverIconEnabled
    ? resolveIconSvg(hoverIconSource, hoverIconName, hoverIconCustomSvg)
    : "";

  const activeIconSvg = activeIconEnabled
    ? resolveIconSvg(activeIconSource, activeIconName, activeIconCustomSvg)
    : "";

  const loadingIconSvg = loadingIconEnabled
    ? resolveIconSvg(
        loadingIconSource,
        loadingIconName,
        loadingIconCustomSvg,
      )
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
  const exportPayload = useMemo(
    () => ({
      downloadFormat,
      downloadName,
      confetti: clickEffect === "confetti",
      ripple: clickEffect === "ripple" || clickEffect === "shockwave",
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
      clickParticleCount,
      animation,
      textAnimation,
      depthAnimation,
      animationDurationText,
      animationSpeedText,
      animationIntensityText,
      animationEasing,
      textAnimationStaggerText,
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
      groupEnabled,
      groupAlign,
      groupGap: groupGapPx,
      hoverEffect,
      hoverSpringStiffness,
      hoverSpringDamping,
      use3DIcon,
      icon3DAnimation,
      clickEffect,
    }),
    [
      downloadFormat,
      downloadName,
      clickEffect,
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
      clickParticleCount,
      animation,
      textAnimation,
      depthAnimation,
      animationDurationText,
      animationSpeedText,
      animationIntensityText,
      animationEasing,
      textAnimationStaggerText,
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
      groupEnabled,
      groupAlign,
      groupGapPx,
      hoverEffect,
      hoverSpringStiffness,
      hoverSpringDamping,
      use3DIcon,
      icon3DAnimation,
    ],
  );

  const exportCode = useMemo(
    () => buildExportPayload(exportPayload),
    [exportPayload],
  );

  const handleDownload = () => {
    const { filename, content } = exportCode;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
      textAnimation,
      depthAnimation,
      animationDurationText,
      animationSpeedText,
      animationIntensityText,
      animationEasing,
      textAnimationStaggerText,
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
      previewResetKey,
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
      textAnimation,
      depthAnimation,
      animationDurationText,
      animationSpeedText,
      animationIntensityText,
      animationEasing,
      loadingLabel,
      loadingSpinnerMode,
      loadingSpinnerPosition,
      loadingSpinnerSvg,
      textAnimationStaggerText,
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
      backdropBlurEnabled,
      backdropBlurText,
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
      previewResetKey,
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
    icon3DText,
    setIcon3DText,
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
      id: "presets",
      label: "Presets",
      content: (
        <PresetsSection
          presets={BUTTON_PRESETS}
          onApplyPreset={applyButtonPreset}
        />
      ),
    },
    {
      id: "basics",
      label: "Basics",
      content: <BasicsSection state={state} setKey={setKey} />,
    },
    {
      id: "motion",
      label: "Motion",
      content: <MotionSection state={state} setKey={setKey} />,
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
      content: <ColorsSection state={state} setKey={setKey} />,
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
        <BorderSection state={state} setKey={setKey} PALETTE={PALETTE} />
      ),
    },
    {
      id: "radius",
      label: "Radius",
      content: <RadiusSection state={state} setKey={setKey} />,
    },
    {
      id: "shadow",
      label: "Shadow",
      content: (
        <ShadowSection
          state={state}
          setKey={setKey}
          updateState={updateState}
        />
      ),
    },
    {
      id: "typography",
      label: "Typography",
      content: (
        <TypographySection
          state={state}
          setKey={setKey}
          fontSizeMin={fontSizeMin}
          fontSizeMax={fontSizeMax}
        />
      ),
    },
    {
      id: "effects",
      label: "Effects (New)",
      content: <ThreeJSSection {...threeJSSectionProps} />,
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
  const sectionOrder = sectionItems.map((item) => item.id);

  const handleSectionChange = (nextSection: string) => {
    if (nextSection === activeSection) return;
    const currentIndex = sectionOrder.indexOf(activeSection);
    const nextIndex = sectionOrder.indexOf(nextSection);
    setSectionTransitionDir(
      currentIndex === -1 || nextIndex === -1
        ? 0
        : nextIndex > currentIndex
          ? 1
          : -1,
    );
    setActiveSection(nextSection);
  };

  // --- Live Preview Node construction ---
  const livePreviewNode = (
    <LivePreview
      key={previewResetKey}
      {...previewPayload}
      clickEffect={clickEffect}
      clickParticleCount={clickParticleCount}
      hoverEffect={hoverEffect}
      hoverSpringStiffness={hoverSpringStiffness}
      hoverSpringDamping={hoverSpringDamping}
    />
  );

  // --- Render ---
  const headerActions = (
    <UndoRedoButtons
      undo={undo}
      redo={redo}
      reset={() => {
        reset();
        setPreviewResetKey((current) => current + 1);
      }}
      canUndo={canUndo}
      canRedo={canRedo}
    />
  );

  // --- Controls ---
  const controls = (
    <>
      <SectionSelector
        sections={sectionItems}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false} custom={sectionTransitionDir}>
          <motion.div
            key={activePanel?.id ?? activeSection}
            custom={sectionTransitionDir}
            variants={sectionVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: {
                type: "spring",
                stiffness: 360,
                damping: 34,
                mass: 0.9,
              },
              opacity: {
                duration: 0.12,
                ease: "linear",
              },
            }}
            style={{ willChange: "transform, opacity" }}
          >
            {activePanel?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );

  // --- Preview ---
  const preview = (
    <PreviewDownloadPanel
      mounted={mounted}
      iframeSrcDoc={initialSrcDoc}
      iframeRef={iframeRef}
      handleIframeLoad={() => {
        if (iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.postMessage(previewPayload, "*");
        }
      }}
      downloadFormat={downloadFormat}
      setDownloadFormat={setDownloadFormat}
      downloadName={downloadName}
      setDownloadName={setDownloadName}
      handleDownload={handleDownload}
      previewNode={livePreviewNode}
      code={exportCode.content}
      previewBgMode={previewBgMode}
      setPreviewBgMode={setPreviewBgMode}
      previewBgInput={previewBgInput}
      setPreviewBgInput={setPreviewBgInput}
    />
  );

  // --- Render ---
  return (
    <AppShell contentOverflow="hidden">
      <PlaygroundLayout
        title="Action Button"
        headerActions={headerActions}
        controls={controls}
        preview={preview}
      />
      <ContrastGuard />
    </AppShell>
  );
}
