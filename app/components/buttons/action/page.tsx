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

import {
  PALETTE,
  SYSTEM_FONTS,
  GOOGLE_FONTS,
  ICONS_SVG,
} from "./_data/buttonConstants";
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

type TransitionEasing =
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "linear";

export default function ActionButtonPage() {
  const mounted = useHydrated();
  const [activeSection, setActiveSection] = useState("basics");
  const [isDesktop, setIsDesktop] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(520);
  const splitRef = useRef<HTMLDivElement>(null);

  // --- Basics ---
  const [label, setLabel] = useState("Confirm");
  const [variant, setVariant] = useState<ButtonVariant>("solid");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [animation, setAnimation] = useState<AnimationPreset>("none");
  const [loadingLabel, setLoadingLabel] = useState("Loading...");
  const [loadingSpinnerMode, setLoadingSpinnerMode] =
    useState<LoadingSpinnerMode>("default");
  const [loadingSpinnerPosition, setLoadingSpinnerPosition] =
    useState<LoadingSpinnerPosition>("left");
  const [loadingSpinnerSvg, setLoadingSpinnerSvg] = useState("");

  // --- Sizing ---
  const [widthText, setWidthText] = useState("220");
  const [heightText, setHeightText] = useState("44");
  const [paddingXText, setPaddingXText] = useState("14");
  const [paddingYText, setPaddingYText] = useState("0");

  // --- Colors ---
  const [useGradient, setUseGradient] = useState(false);
  const [gradAngleText, setGradAngleText] = useState("90");
  const [gradStartInput, setGradStartInput] = useState("#2563eb");
  const [gradEndInput, setGradEndInput] = useState("#8b5cf6");
  const [gradMidEnabled, setGradMidEnabled] = useState(false);
  const [gradMidInput, setGradMidInput] = useState("#6366f1");

  const [bgInput, setBgInput] = useState("#111827");
  const [textInput, setTextInput] = useState("#ffffff");

  // --- Border ---
  const [borderWidthText, setBorderWidthText] = useState("1");
  const [borderStyle, setBorderStyle] = useState<
    "solid" | "dashed" | "dotted" | "double" | "none"
  >("solid");
  const [borderInput, setBorderInput] = useState("rgba(0,0,0,0.06)");
  const [borderHoverWidthText, setBorderHoverWidthText] = useState("1");
  const [borderActiveWidthText, setBorderActiveWidthText] = useState("1");

  // --- Disabled Styling ---
  const [disabledOpacityText, setDisabledOpacityText] = useState("0.6");
  const [disabledCursor, setDisabledCursor] = useState<
    "not-allowed" | "default" | "pointer"
  >("not-allowed");
  const [disabledUseCustomColors, setDisabledUseCustomColors] = useState(false);
  const [disabledBgInput, setDisabledBgInput] = useState("#e5e7eb");
  const [disabledTextInput, setDisabledTextInput] = useState("#9ca3af");
  const [disabledBorderInput, setDisabledBorderInput] =
    useState("rgba(0,0,0,0.08)");
  const [disabledBorderWidthText, setDisabledBorderWidthText] = useState("1");
  const [disabledHoverSuppressed, setDisabledHoverSuppressed] = useState(true);
  const [disabledTextShadowEnabled, setDisabledTextShadowEnabled] =
    useState(false);

  // --- Radius ---
  const [linkRadius, setLinkRadius] = useState(true);
  const [radiusText, setRadiusText] = useState("14");
  const [radiusTLText, setRadiusTLText] = useState("14");
  const [radiusTRText, setRadiusTRText] = useState("14");
  const [radiusBRText, setRadiusBRText] = useState("14");
  const [radiusBLText, setRadiusBLText] = useState("14");

  // --- Shadow ---
  const [shadowEnabled, setShadowEnabled] = useState(true);
  const [shXText, setShXText] = useState("0");
  const [shYText, setShYText] = useState("10");
  const [shBlurText, setShBlurText] = useState("24");
  const [shSpreadText, setShSpreadText] = useState("0");
  const [shOpacityText, setShOpacityText] = useState("0.10");
  const [shColorInput, setShColorInput] = useState("#000000");
  const [shadowTemp, setShadowTemp] = useState<"neutral" | "warm" | "cool">(
    "neutral"
  );

  // --- 3D Shadow & Depth ---
  const [elevationPreset, setElevationPreset] = useState<
    "flat" | "raised" | "lifted" | "inset"
  >("raised");

  // 3D Press Link: Update active translate when depth changes via preset
  const handleApplyElevationPreset = (
    mode: "flat" | "raised" | "lifted" | "inset"
  ) => {
    setElevationPreset(mode);
    setShadowEnabled(true);
    setShadowStackEnabled(false);
    setBaseShadowEnabled(false);

    if (mode === "flat") {
      setShadowEnabled(false);
      setDepthText("0");
      if (activeEnabled) setActiveTranslateYText("0");
    } else if (mode === "raised") {
      setShXText("0");
      setShYText("4");
      setShBlurText("6");
      setShSpreadText("-1");
      setShOpacityText("0.1");
      setDepthText("4");
      setBaseShadowEnabled(true);
      setBaseShadowSizeText("10");
      if (activeEnabled) setActiveTranslateYText("4");
    } else if (mode === "lifted") {
      setShXText("0");
      setShYText("10");
      setShBlurText("15");
      setShSpreadText("-3");
      setShOpacityText("0.15");
      setDepthText("8");
      setBaseShadowEnabled(true);
      setBaseShadowSizeText("20");
      if (activeEnabled) setActiveTranslateYText("8");
    } else if (mode === "inset") {
      setDepthText("0");
      setInnerShadowEnabled(true);
      setShOpacityText("0");
      if (activeEnabled) setActiveTranslateYText("0");
    }
  };
  const [depthText, setDepthText] = useState("8");
  const [lightDirection, setLightDirection] = useState<
    "top-left" | "top-right" | "bottom-left" | "bottom-right" | "custom"
  >("top-left");
  const [lightAngleText, setLightAngleText] = useState("315");
  const [shadowStackEnabled, setShadowStackEnabled] = useState(false);
  const [stack1Enabled, setStack1Enabled] = useState(true);
  const [stack1XText, setStack1XText] = useState("0");
  const [stack1YText, setStack1YText] = useState("8");
  const [stack1BlurText, setStack1BlurText] = useState("16");
  const [stack1SpreadText, setStack1SpreadText] = useState("0");
  const [stack1OpacityText, setStack1OpacityText] = useState("0.18");
  const [stack2Enabled, setStack2Enabled] = useState(true);
  const [stack2XText, setStack2XText] = useState("0");
  const [stack2YText, setStack2YText] = useState("3");
  const [stack2BlurText, setStack2BlurText] = useState("8");
  const [stack2SpreadText, setStack2SpreadText] = useState("0");
  const [stack2OpacityText, setStack2OpacityText] = useState("0.12");
  const [stack3Enabled, setStack3Enabled] = useState(false);
  const [stack3XText, setStack3XText] = useState("0");
  const [stack3YText, setStack3YText] = useState("1");
  const [stack3BlurText, setStack3BlurText] = useState("4");
  const [stack3SpreadText, setStack3SpreadText] = useState("0");
  const [stack3OpacityText, setStack3OpacityText] = useState("0.08");
  const [innerShadowEnabled, setInnerShadowEnabled] = useState(false);
  const [glossEnabled, setGlossEnabled] = useState(false);
  const [glossSizeText, setGlossSizeText] = useState("8");
  const [glossOpacityText, setGlossOpacityText] = useState("0.22");
  const [bevelEnabled, setBevelEnabled] = useState(false);
  const [bevelSizeText, setBevelSizeText] = useState("3");
  const [bevelSoftnessText, setBevelSoftnessText] = useState("3");
  const [materialPreset, setMaterialPreset] = useState<
    "custom" | "plastic" | "matte" | "metal" | "glass"
  >("custom");

  const handleApplyMaterialPreset = (
    mode: "custom" | "plastic" | "matte" | "metal" | "glass"
  ) => {
    setMaterialPreset(mode);
    if (mode === "custom") return;

    if (mode === "plastic") {
      setGlossEnabled(true);
      setGlossOpacityText("0.4");
      setSpecularStrengthText("0.5");
      setRoughnessText("0.1");
      setBevelEnabled(true);
      setBevelSizeText("3");
      setBevelSoftnessText("2");
      setInnerShadowEnabled(true);
      setBackdropBlurEnabled(false);
      setBgInput("#2563eb");
      setTextInput("#ffffff");
    } else if (mode === "matte") {
      setGlossEnabled(false);
      setSpecularStrengthText("0");
      setRoughnessText("1");
      setBevelEnabled(false);
      setInnerShadowEnabled(false);
      setBackdropBlurEnabled(false);
      setBgInput("#2563eb");
      setTextInput("#ffffff");
    } else if (mode === "metal") {
      setGlossEnabled(true);
      setGlossOpacityText("0.6");
      setSpecularStrengthText("0.8");
      setRoughnessText("0.3");
      setBevelEnabled(true);
      setBevelSizeText("2");
      setBevelSoftnessText("1");
      setInnerShadowEnabled(true);
      setEdgeGradientEnabled(true);
      setBackdropBlurEnabled(false);
      setBgInput("#2563eb");
      setTextInput("#ffffff");
    } else if (mode === "glass") {
      setGlossEnabled(true);
      setGlossOpacityText("0.3");
      setSpecularStrengthText("0.4");
      setRoughnessText("0.1");
      setBevelEnabled(true);
      setBevelSizeText("1");
      setInnerShadowEnabled(true);
      // Glass specific
      setBackdropBlurEnabled(true);
      setBackdropBlurText("10");
      setShOpacityText("0.1");
      // For glass, we often want a semi-transparent white/black
      // effectively overriding current bg to ensure transparency
      setBgInput("#ffffff55");
      setTextInput("#000000");
    }
  };
  const [edgeThicknessText, setEdgeThicknessText] = useState("0");
  const [edgeGradientEnabled, setEdgeGradientEnabled] = useState(false);
  const [edgeGradientSizeText, setEdgeGradientSizeText] = useState("2");
  const [edgeGradientStrengthText, setEdgeGradientStrengthText] =
    useState("0.25");

  // Glassmorphism States
  const [backdropBlurEnabled, setBackdropBlurEnabled] = useState(false);
  const [backdropBlurText, setBackdropBlurText] = useState("10");
  const [topGradientEnabled, setTopGradientEnabled] = useState(false);
  const [topGradAngleText, setTopGradAngleText] = useState("180");
  const [topGradStartInput, setTopGradStartInput] = useState("#ffffff");
  const [topGradMidEnabled, setTopGradMidEnabled] = useState(false);
  const [topGradMidInput, setTopGradMidInput] = useState("#e5e7eb");
  const [topGradEndInput, setTopGradEndInput] = useState("#000000");
  const [topGradOpacityText, setTopGradOpacityText] = useState("0.15");
  const [parallaxHighlightEnabled, setParallaxHighlightEnabled] =
    useState(false);
  const [parallaxStrengthText, setParallaxStrengthText] = useState("0.35");
  const [rimLightEnabled, setRimLightEnabled] = useState(false);
  const [rimLightColorInput, setRimLightColorInput] = useState("#93c5fd");
  const [rimLightSizeText, setRimLightSizeText] = useState("10");
  const [rimLightOpacityText, setRimLightOpacityText] = useState("0.35");
  const [iconEmbossMode, setIconEmbossMode] = useState<
    "off" | "raised" | "inset"
  >("off");
  const [iconEmbossDepthText, setIconEmbossDepthText] = useState("2");
  const [iconEmbossStrengthText, setIconEmbossStrengthText] = useState("0.6");
  const [borderDepthMode, setBorderDepthMode] = useState<
    "none" | "raised" | "inset"
  >("none");
  const [borderDepthSizeText, setBorderDepthSizeText] = useState("2");
  const [baseShadowEnabled, setBaseShadowEnabled] = useState(false);
  const [baseShadowSizeText, setBaseShadowSizeText] = useState("10");
  const [baseShadowOpacityText, setBaseShadowOpacityText] = useState("0.22");
  const [pressedDepthText, setPressedDepthText] = useState("0");
  const [pressedInsetEnabled, setPressedInsetEnabled] = useState(false);
  const [hoverLiftText, setHoverLiftText] = useState("0");
  const [specularStrengthText, setSpecularStrengthText] = useState("1");
  const [roughnessText, setRoughnessText] = useState("0");
  const [aoStrengthText, setAoStrengthText] = useState("0");
  const [hoverTiltXText, setHoverTiltXText] = useState("0");
  const [hoverTiltYText, setHoverTiltYText] = useState("0");
  const [hoverPerspectiveText, setHoverPerspectiveText] = useState("800");

  // --- Typography ---
  const [fontBucket, setFontBucket] = useState<"system" | "google">("system");
  const [fontSearch, setFontSearch] = useState("");
  const [systemFontIdx, setSystemFontIdx] = useState(0);
  const [googleFontFamily, setGoogleFontFamily] = useState("Inter");

  const [fontSizeText, setFontSizeText] = useState("14");
  const [fontSizeUnit, setFontSizeUnit] = useState<"px" | "rem">("px");
  const [fontWeight, setFontWeight] = useState<FontWeightKey>(700);
  const [letterSpacingText, setLetterSpacingText] = useState("0.2");
  const [letterSpacingUnit, setLetterSpacingUnit] = useState<"px" | "em">("px");
  const [lineHeightText, setLineHeightText] = useState("1");
  const [fontStyle, setFontStyle] = useState<FontStyleKey>("normal");
  const [textTransform, setTextTransform] = useState<TextTransformKey>("none");
  const [underline, setUnderline] = useState(false);

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
  const [align, setAlign] = useState<AlignKey>("middle-center");

  // --- Text Shadow ---
  const [textShadowEnabled, setTextShadowEnabled] = useState(false);
  const [tsColorMode, setTsColorMode] = useState<
    "custom" | "auto" | "contrast"
  >("custom");
  const [tsXText, setTsXText] = useState("0");
  const [tsYText, setTsYText] = useState("1");
  const [tsBlurText, setTsBlurText] = useState("2");
  const [tsOpacityText, setTsOpacityText] = useState("0.25");
  const [tsColorInput, setTsColorInput] = useState("#000000");

  // --- Icon ---
  const [iconName, setIconName] = useState<IconName>("none");
  const [iconSource, setIconSource] = useState<IconSource>("library");
  const [iconCustomSvg, setIconCustomSvg] = useState("");
  const [iconPosition, setIconPosition] = useState<"left" | "right">("left");
  const [iconSizeText, setIconSizeText] = useState("18");
  const [iconGapText, setIconGapText] = useState("10");
  const [iconColorMode, setIconColorMode] = useState<"text" | "custom">("text");
  const [iconColorInput, setIconColorInput] = useState("#ffffff");
  const [hoverIconEnabled, setHoverIconEnabled] = useState(false);
  const [hoverIconSource, setHoverIconSource] = useState<IconSource>("library");
  const [hoverIconName, setHoverIconName] = useState<IconName>("none");
  const [hoverIconCustomSvg, setHoverIconCustomSvg] = useState("");
  const [activeIconEnabled, setActiveIconEnabled] = useState(false);
  const [activeIconSource, setActiveIconSource] =
    useState<IconSource>("library");
  const [activeIconName, setActiveIconName] = useState<IconName>("none");
  const [activeIconCustomSvg, setActiveIconCustomSvg] = useState("");
  const [loadingIconEnabled, setLoadingIconEnabled] = useState(false);
  const [loadingIconSource, setLoadingIconSource] =
    useState<IconSource>("library");
  const [loadingIconName, setLoadingIconName] = useState<IconName>("none");
  const [loadingIconCustomSvg, setLoadingIconCustomSvg] = useState("");

  // --- Group Preview ---
  const [groupEnabled, setGroupEnabled] = useState(false);
  const [groupAlign, setGroupAlign] = useState<GroupAlign>("center");
  const [groupGapText, setGroupGapText] = useState("12");

  // --- Hover ---
  const [hoverEnabled, setHoverEnabled] = useState(true);
  const [hoverBgMode, setHoverBgMode] = useState<
    "auto" | "custom" | "gradient"
  >("auto");
  const [hoverBgInput, setHoverBgInput] = useState("#0f172a");
  const [hoverGradAngleText, setHoverGradAngleText] = useState("90");
  const [hoverGradStartInput, setHoverGradStartInput] = useState("#2563eb");
  const [hoverGradMidEnabled, setHoverGradMidEnabled] = useState(false);
  const [hoverGradMidInput, setHoverGradMidInput] = useState("#6366f1");
  const [hoverGradEndInput, setHoverGradEndInput] = useState("#8b5cf6");
  const [hoverTextMode, setHoverTextMode] = useState<"same" | "custom">("same");
  const [hoverTextInput, setHoverTextInput] = useState("#ffffff");
  const [hoverBorderMode, setHoverBorderMode] = useState<"same" | "custom">(
    "same"
  );
  const [hoverBorderInput, setHoverBorderInput] = useState("#2563eb");

  // --- Active ---
  const [activeEnabled, setActiveEnabled] = useState(true);
  const [activeTranslateYText, setActiveTranslateYText] = useState("1");
  const [activeScaleText, setActiveScaleText] = useState("0.99");
  const [activeBgMode, setActiveBgMode] = useState<
    "same" | "custom" | "gradient"
  >("same");
  const [activeBgInput, setActiveBgInput] = useState("#0b1220");
  const [activeGradAngleText, setActiveGradAngleText] = useState("90");
  const [activeGradStartInput, setActiveGradStartInput] = useState("#1d4ed8");
  const [activeGradMidEnabled, setActiveGradMidEnabled] = useState(false);
  const [activeGradMidInput, setActiveGradMidInput] = useState("#3b82f6");
  const [activeGradEndInput, setActiveGradEndInput] = useState("#0ea5e9");
  const [activeTextMode, setActiveTextMode] = useState<"same" | "custom">(
    "same"
  );
  const [activeTextInput, setActiveTextInput] = useState("#ffffff");
  const [activeBorderMode, setActiveBorderMode] = useState<"same" | "custom">(
    "same"
  );
  const [activeBorderInput, setActiveBorderInput] = useState("#2563eb");

  // --- Focus Ring ---
  const [focusRingEnabled, setFocusRingEnabled] = useState(true);
  const [focusRingWidthText, setFocusRingWidthText] = useState("4");
  const [focusRingOffsetText, setFocusRingOffsetText] = useState("2");
  const [focusRingInput, setFocusRingInput] = useState("#60a5fa");

  // --- Transitions ---
  const [transitionColorDurationText, setTransitionColorDurationText] =
    useState("160");
  const [transitionColorEasing, setTransitionColorEasing] =
    useState<TransitionEasing>("ease");
  const [transitionTransformDurationText, setTransitionTransformDurationText] =
    useState("120");
  const [transitionTransformEasing, setTransitionTransformEasing] =
    useState<TransitionEasing>("ease");

  // --- Accessibility ---
  const [ariaLabel, setAriaLabel] = useState("");
  const [ariaPressedMode, setAriaPressedMode] = useState<
    "off" | "true" | "false"
  >("off");
  const [ariaBusyMode, setAriaBusyMode] = useState<
    "off" | "auto" | "true" | "false"
  >("off");
  const [minTouchMode, setMinTouchMode] = useState<MinTouchMode>("off");
  const [minTouchSizeText, setMinTouchSizeText] = useState("44");

  // --- State Preview ---
  const [forceHover, setForceHover] = useState(false);
  const [forceActive, setForceActive] = useState(false);
  const [forceFocus, setForceFocus] = useState(false);

  // --- Preview & Export ---
  const [previewBgMode, setPreviewBgMode] = useState<PreviewBgMode>("white");
  const [previewBgInput, setPreviewBgInput] = useState("#0b1220");
  const [downloadFormat, setDownloadFormat] = useState<DownloadFormat>("html");
  const [downloadName, setDownloadName] = useState("action-button");

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
      prev ? clamp(prev, minLeft, maxLeft) : initial
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
    fontSizeMax
  );
  const fontSizeDisplay = `${fontSizeValue}${fontSizeUnit}`;

  const letterSpacingMin = letterSpacingUnit === "em" ? -0.1 : -2;
  const letterSpacingMax = letterSpacingUnit === "em" ? 0.6 : 10;
  const letterSpacingStep = letterSpacingUnit === "em" ? 0.01 : 0.1;
  const letterSpacingValue = clamp(
    Number(letterSpacingText) || 0,
    letterSpacingMin,
    letterSpacingMax
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
    1
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
    2000
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
    12
  );
  const borderActiveWidthPx = clamp(
    Number(borderActiveWidthText) || borderHoverWidthPx,
    0,
    12
  );
  const hoverBorderWidthPx = hoverEnabled ? borderHoverWidthPx : borderWidthPx;
  const activeBorderWidthPx = activeEnabled
    ? borderActiveWidthPx
    : borderWidthPx;
  const disabledBorderWidthPx = clamp(
    Number(disabledBorderWidthText) || borderWidthPx,
    0,
    12
  );

  const groupGapPx = clamp(Number(groupGapText) || 12, 0, 32);
  const minTouchSizePx = clamp(Number(minTouchSizeText) || 44, 24, 80);
  const transitionColorMs = clamp(
    Number(transitionColorDurationText) || 160,
    0,
    2000
  );
  const transitionTransformMs = clamp(
    Number(transitionTransformDurationText) || 120,
    0,
    2000
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
    hoverGradEndInput
  );
  const activeGradient = buildGradient(
    activeGradAngleText,
    activeGradStartInput,
    activeGradMidEnabled,
    activeGradMidInput,
    activeGradEndInput
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
      : lightAngleMap[lightDirection] ?? 315;
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
    Number(shOpacityText) || 0.1
  );

  const buildStackLayer = (
    enabled: boolean,
    xText: string,
    yText: string,
    blurText: string,
    spreadText: string,
    opacityText: string
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
    options: { depthOverride?: number; pressedInset?: boolean } = {}
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
        }px ${Number(shSpreadText) || 0}px ${baseShadowColor}`
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
          stack1OpacityText
        ),
        buildStackLayer(
          stack2Enabled,
          stack2XText,
          stack2YText,
          stack2BlurText,
          stack2SpreadText,
          stack2OpacityText
        ),
        buildStackLayer(
          stack3Enabled,
          stack3XText,
          stack3YText,
          stack3BlurText,
          stack3SpreadText,
          stack3OpacityText
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
          shadowDirY * insetOffset
        )}px ${insetBlur}px 0px ${insetColor}`
      );
    }

    if (innerShadowEnabled) {
      const insetOpacity = clamp(0.18 + depth / 80, 0.15, 0.45);
      const insetColor = hexWithAlpha(shadowBaseHex, insetOpacity);
      const insetOffset = Math.max(2, Math.round(depth * 0.4));
      const insetBlur = Math.max(4, Math.round(depth * 1.2));
      innerShadows.push(
        `inset ${Math.round(shadowDirX * insetOffset)}px ${Math.round(
          shadowDirY * insetOffset
        )}px ${insetBlur}px 0px ${insetColor}`
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
        }px ${borderDepthPx}px 0px ${borderLight}`
      );
      innerShadows.push(
        `inset ${sign * bx}px ${
          sign * by
        }px ${borderDepthPx}px 0px ${borderDark}`
      );
    }

    if (aoStrength > 0) {
      const aoBlur = Math.max(4, Math.round((depth + bevelSizePx) * 1.2));
      const aoOpacity = clamp(aoStrength * 0.35, 0, 0.6);
      innerShadows.push(
        `inset 0 0 ${aoBlur}px 0px rgba(0, 0, 0, ${aoOpacity})`
      );
    }

    if (
      edgeGradientEnabled &&
      edgeGradientSizePx > 0 &&
      edgeGradientStrength > 0
    ) {
      const edgeInset = Math.max(1, Math.round(edgeGradientSizePx / 2));
      innerShadows.push(
        `inset 0 ${edgeGradientSizePx}px ${edgeGradientSizePx}px -${edgeInset}px rgba(255, 255, 255, ${edgeGradientStrength})`
      );
      innerShadows.push(
        `inset 0 -${edgeGradientSizePx}px ${edgeGradientSizePx}px -${edgeInset}px rgba(0, 0, 0, ${
          edgeGradientStrength * 0.9
        })`
      );
    }

    if (glossEnabled && glossSizePx > 0 && glossOpacity > 0) {
      const glossBlur = Math.round(glossSizePx * (1.5 + roughness * 1.5));
      const glossStrength = clamp(
        glossOpacity * specularStrength * (1 - roughness * 0.3),
        0,
        1
      );
      if (glossStrength > 0) {
        innerShadows.push(
          `inset ${Math.round(-shadowDirX * glossSizePx)}px ${Math.round(
            -shadowDirY * glossSizePx
          )}px ${glossBlur}px 0px rgba(255, 255, 255, ${glossStrength})`
        );
      }
    }

    if (bevelEnabled && bevelSizePx > 0) {
      const bevelBlur = Math.round(bevelSoftnessPx);
      const bevelX = Math.round(shadowDirX * bevelSizePx);
      const bevelY = Math.round(shadowDirY * bevelSizePx);
      innerShadows.push(
        `inset ${-bevelX}px ${-bevelY}px ${bevelBlur}px 0px rgba(255, 255, 255, 0.35)`
      );
      innerShadows.push(
        `inset ${bevelX}px ${bevelY}px ${bevelBlur}px 0px rgba(0, 0, 0, 0.25)`
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
    preset: "flat" | "raised" | "lifted" | "inset"
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
    preset: "custom" | "plastic" | "matte" | "metal" | "glass"
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
    iconSource === "custom" ? iconCustomSvg : ICONS_SVG[iconName] || "";
  const hoverIconSvg = hoverIconEnabled
    ? hoverIconSource === "custom"
      ? hoverIconCustomSvg
      : ICONS_SVG[hoverIconName] || ""
    : "";
  const activeIconSvg = activeIconEnabled
    ? activeIconSource === "custom"
      ? activeIconCustomSvg
      : ICONS_SVG[activeIconName] || ""
    : "";
  const loadingIconSvg = loadingIconEnabled
    ? loadingIconSource === "custom"
      ? loadingIconCustomSvg
      : ICONS_SVG[loadingIconName] || ""
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
    1
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
    ]
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
    {
      id: "preview-bg",
      label: "Preview BG",
      content: (
        <PreviewBackgroundSection
          PALETTE={PALETTE}
          bgMode={previewBgMode}
          setBgMode={setPreviewBgMode}
          previewBgInput={previewBgInput}
          setPreviewBgInput={setPreviewBgInput}
          previewBgNorm={norm(previewBgInput)}
        />
      ),
    },
  ];

  const activePanel =
    sectionItems.find((item) => item.id === activeSection) ?? sectionItems[0];

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
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ color: "var(--text)" }}
          >
            Action Button
          </h1>
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
                    "*"
                  );
                }
              }}
              downloadFormat={downloadFormat}
              setDownloadFormat={setDownloadFormat}
              downloadName={downloadName}
              setDownloadName={setDownloadName}
              handleDownload={handleDownload}
            />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
