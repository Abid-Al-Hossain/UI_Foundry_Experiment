"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import AppShell from "@/components/layout/AppShell";

// --- Section Imports ---
import BasicsSection, { type ButtonVariant, type AnimationPreset } from "./_section/BasicsSection";
import SizingSection from "./_section/SizingSection";
import ColorsSection from "./_section/ColorsSection";
import BorderSection from "./_section/BorderSection";
import RadiusSection from "./_section/RadiusSection";
import ShadowSection from "./_section/ShadowSection";
import TypographySection, { type FontStyleKey, type FontWeightKey, type TextTransformKey, type SystemFontItem } from "./_section/TypographySection";
import TextPositionSection, { type AlignKey } from "./_section/TextPositionSection";
import TextShadowSection from "./_section/TextShadowSection";
import IconSection from "./_section/IconSection";
import OutlineGhostPresetsSection from "./_section/OutlineGhostPresetsSection";
import HoverSection from "./_section/HoverSection";
import ActiveStateSection from "./_section/ActiveStateSection";
import FocusRingSection from "./_section/FocusRingSection";
import PreviewBackgroundSection, { type PreviewBgMode } from "./_section/PreviewBackgroundSection";
import PreviewDownloadPanel, { type DownloadFormat } from "./_section/PreviewDownloadPanel";
import LoadingSection, { type LoadingSpinnerMode, type LoadingSpinnerPosition } from "./_section/LoadingSection";
import DisabledSection from "./_section/DisabledSection";

// --- Constants & Helpers ---

const PALETTE = [
  "#111827", "#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#8b5cf6", "#0ea5e9", "#ffffff"
] as const;

// Full System Fonts List
const SYSTEM_FONTS: SystemFontItem[] = [
  { label: "Arial", css: "Arial, system-ui" },
  { label: "Consolas", css: 'Consolas, "Liberation Mono", "Courier New", ui-monospace, monospace' },
  { label: "Courier New", css: '"Courier New", ui-monospace, monospace' },
  { label: "Georgia", css: "Georgia, ui-serif, serif" },
  { label: "Helvetica", css: "Helvetica, Arial, system-ui" },
  { label: "Menlo", css: 'Menlo, Monaco, Consolas, "Liberation Mono", ui-monospace, monospace' },
  { label: "Monaco", css: 'Monaco, Menlo, Consolas, "Liberation Mono", ui-monospace, monospace' },
  { label: "Roboto (system if installed)", css: "Roboto, system-ui, -apple-system, Arial" },
  { label: "Segoe UI", css: '"Segoe UI", system-ui, -apple-system, Arial' },
  { label: "System UI", css: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" },
  { label: "Times New Roman", css: '"Times New Roman", Times, ui-serif, serif' },
  { label: "ui-monospace", css: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' },
  { label: "ui-sans-serif", css: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" },
  { label: "ui-serif", css: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' },
].sort((a, b) => a.label.localeCompare(b.label));

// Full Google Fonts List
const GOOGLE_FONTS = [
  "Abril Fatface", "Alegreya", "Alegreya Sans", "Archivo", "Archivo Narrow", "Arimo", "Assistant", "Bebas Neue", "Bitter", "Cabin", "Catamaran", 
  "Cormorant Garamond", "Crimson Text", "DM Sans", "DM Serif Display", "Dosis", "EB Garamond", "Figtree", "Fira Sans", "IBM Plex Mono", 
  "IBM Plex Sans", "Inconsolata", "Inter", "Josefin Sans", "Karla", "Lato", "Libre Baskerville", "Libre Franklin", "Lora", "Manrope", 
  "Merriweather", "Montserrat", "Mukta", "Mulish", "Noto Sans", "Noto Serif", "Nunito", "Nunito Sans", "Open Sans", "Oswald", "Overpass", 
  "Playfair Display", "Plus Jakarta Sans", "Poppins", "PT Sans", "PT Serif", "Quicksand", "Raleway", "Recursive", "Red Hat Display", 
  "Roboto", "Roboto Condensed", "Roboto Mono", "Rubik", "Source Code Pro", "Source Sans 3", "Space Grotesk", "Space Mono", "Spectral", 
  "Syne", "Titillium Web", "Urbanist", "Work Sans",
].sort((a, b) => a.localeCompare(b));

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function toHex2(n: number) {
  const s = clamp(Math.round(n), 0, 255).toString(16);
  return s.length === 1 ? `0${s}` : s;
}

function hexWithAlpha(hex: string, alpha: number) {
  const h = (hex || "").trim().toLowerCase();
  if (!/^#[0-9a-f]{6}$/.test(h)) return `rgba(0,0,0,${clamp(alpha, 0, 1)})`;
  const r = parseInt(h.slice(1, 3), 16);
  const g = parseInt(h.slice(3, 5), 16);
  const b = parseInt(h.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${clamp(alpha, 0, 1)})`;
}

function sanitizeFilenameBase(input: string) {
  const trimmed = (input || "").trim();
  if (!trimmed) return "";
  const noWhitespace = trimmed.replace(/\s+/g, "-");
  const safe = noWhitespace.replace(/[^a-zA-Z0-9._-]/g, "");
  return safe.replace(/^\.+/, "");
}

function norm(input: string): { ok: boolean; hex: string; rgb: string } {
  const raw = (input || "").trim();

  if (/^#([0-9a-fA-F]{3})$/.test(raw)) {
    const m = raw.slice(1);
    const r = m[0] + m[0];
    const g = m[1] + m[1];
    const b = m[2] + m[2];
    const hex = `#${r}${g}${b}`.toLowerCase();
    const rr = parseInt(r, 16);
    const gg = parseInt(g, 16);
    const bb = parseInt(b, 16);
    return { ok: true, hex, rgb: `rgb(${rr}, ${gg}, ${bb})` };
  }

  if (/^#([0-9a-fA-F]{6})$/.test(raw)) {
    const hex = raw.toLowerCase();
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { ok: true, hex, rgb: `rgb(${r}, ${g}, ${b})` };
  }

  const rgbFn = raw.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);
  if (rgbFn) {
    const r = clamp(Number(rgbFn[1]), 0, 255);
    const g = clamp(Number(rgbFn[2]), 0, 255);
    const b = clamp(Number(rgbFn[3]), 0, 255);
    const hex = `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`;
    return { ok: true, hex, rgb: `rgb(${r}, ${g}, ${b})` };
  }

  const csv = raw.match(/^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/);
  if (csv) {
    const r = clamp(Number(csv[1]), 0, 255);
    const g = clamp(Number(csv[2]), 0, 255);
    const b = clamp(Number(csv[3]), 0, 255);
    const hex = `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`;
    return { ok: true, hex, rgb: `rgb(${r}, ${g}, ${b})` };
  }

  return { ok: false, hex: "#2563eb", rgb: "rgb(37, 99, 235)" };
}

function contrastHex(bgHex: string) {
  const h = (bgHex || "").trim().toLowerCase();
  if (!/^#[0-9a-f]{6}$/.test(h)) return "#111827";
  const r = parseInt(h.slice(1, 3), 16) / 255;
  const g = parseInt(h.slice(3, 5), 16) / 255;
  const b = parseInt(h.slice(5, 7), 16) / 255;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.6 ? "#111827" : "#ffffff";
}

const ICONS_SVG: Record<string, string> = {
  none: "",
  arrowRight: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  check: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  x: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  info: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" stroke="currentColor" stroke-width="2"/><path d="M12 10v6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 7h.01" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
  star: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.3l-5.7 3 1.1-6.3L2.8 9.7l6.3-.9L12 3l2.9 5.8 6.3.9-4.6 4.3 1.1 6.3-5.7-3Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
};

export default function ActionButtonPage() {
  const [mounted, setMounted] = useState(false);
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
  const [loadingSpinnerMode, setLoadingSpinnerMode] = useState<LoadingSpinnerMode>("default");
  const [loadingSpinnerPosition, setLoadingSpinnerPosition] = useState<LoadingSpinnerPosition>("left");
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
  const [borderStyle, setBorderStyle] = useState<"solid"|"dashed"|"dotted"|"double"|"none">("solid");
  const [borderInput, setBorderInput] = useState("rgba(0,0,0,0.06)");
  const [borderHoverWidthText, setBorderHoverWidthText] = useState("1");
  const [borderActiveWidthText, setBorderActiveWidthText] = useState("1");

  // --- Disabled Styling ---
  const [disabledOpacityText, setDisabledOpacityText] = useState("0.6");
  const [disabledCursor, setDisabledCursor] = useState<"not-allowed"|"default"|"pointer">("not-allowed");
  const [disabledUseCustomColors, setDisabledUseCustomColors] = useState(false);
  const [disabledBgInput, setDisabledBgInput] = useState("#e5e7eb");
  const [disabledTextInput, setDisabledTextInput] = useState("#9ca3af");
  const [disabledBorderInput, setDisabledBorderInput] = useState("rgba(0,0,0,0.08)");

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

  // --- Typography ---
  const [fontBucket, setFontBucket] = useState<"system"|"google">("system");
  const [fontSearch, setFontSearch] = useState("");
  const [systemFontIdx, setSystemFontIdx] = useState(0);
  const [googleFontFamily, setGoogleFontFamily] = useState("Inter");
  
  const [fontSizeText, setFontSizeText] = useState("14");
  const [fontWeight, setFontWeight] = useState<FontWeightKey>(700);
  const [letterSpacingText, setLetterSpacingText] = useState("0.2");
  const [lineHeightText, setLineHeightText] = useState("1");
  const [fontStyle, setFontStyle] = useState<FontStyleKey>("normal");
  const [textTransform, setTextTransform] = useState<TextTransformKey>("none");
  const [underline, setUnderline] = useState(false);

  const filteredSystemFonts = useMemo(() => {
    const q = fontSearch.trim().toLowerCase();
    return q ? SYSTEM_FONTS.filter(f => f.label.toLowerCase().includes(q)) : SYSTEM_FONTS;
  }, [fontSearch]);

  const filteredGoogleFonts = useMemo(() => {
    const q = fontSearch.trim().toLowerCase();
    return q ? GOOGLE_FONTS.filter(f => f.toLowerCase().includes(q)) : GOOGLE_FONTS;
  }, [fontSearch]);

  // --- Text Position ---
  const [align, setAlign] = useState<AlignKey>("middle-center");

  // --- Text Shadow ---
  const [textShadowEnabled, setTextShadowEnabled] = useState(false);
  const [tsXText, setTsXText] = useState("0");
  const [tsYText, setTsYText] = useState("1");
  const [tsBlurText, setTsBlurText] = useState("2");
  const [tsOpacityText, setTsOpacityText] = useState("0.25");
  const [tsColorInput, setTsColorInput] = useState("#000000");

  // --- Icon ---
  const [iconName, setIconName] = useState<string>("none");
  const [iconSource, setIconSource] = useState<"library"|"custom">("library");
  const [iconCustomSvg, setIconCustomSvg] = useState("");
  const [iconPosition, setIconPosition] = useState<"left"|"right">("left");
  const [iconSizeText, setIconSizeText] = useState("18");
  const [iconGapText, setIconGapText] = useState("10");
  const [iconColorMode, setIconColorMode] = useState<"text"|"custom">("text");
  const [iconColorInput, setIconColorInput] = useState("#ffffff");

  // --- Hover ---
  const [hoverEnabled, setHoverEnabled] = useState(true);
  const [hoverBgMode, setHoverBgMode] = useState<"auto"|"custom">("auto");
  const [hoverBgInput, setHoverBgInput] = useState("#0f172a");
  const [hoverTextMode, setHoverTextMode] = useState<"same"|"custom">("same");
  const [hoverTextInput, setHoverTextInput] = useState("#ffffff");
  const [hoverBorderMode, setHoverBorderMode] = useState<"same"|"custom">("same");
  const [hoverBorderInput, setHoverBorderInput] = useState("#2563eb");

  // --- Active ---
  const [activeEnabled, setActiveEnabled] = useState(true);
  const [activeTranslateYText, setActiveTranslateYText] = useState("1");
  const [activeScaleText, setActiveScaleText] = useState("0.99");

  // --- Focus Ring ---
  const [focusRingEnabled, setFocusRingEnabled] = useState(true);
  const [focusRingWidthText, setFocusRingWidthText] = useState("4");
  const [focusRingOffsetText, setFocusRingOffsetText] = useState("2");
  const [focusRingInput, setFocusRingInput] = useState("#60a5fa");

  // --- Preview & Export ---
  const [previewBgMode, setPreviewBgMode] = useState<PreviewBgMode>("white");
  const [previewBgInput, setPreviewBgInput] = useState("#0b1220");
  const [downloadFormat, setDownloadFormat] = useState<DownloadFormat>("html");
  const [downloadName, setDownloadName] = useState("action-button");
  
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    setLeftPanelWidth((prev) => (prev ? clamp(prev, minLeft, maxLeft) : initial));
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
  const wPx = clamp(Number(widthText)||220, 40, 720);
  const hPx = clamp(Number(heightText)||44, 24, 240);
  const padX = clamp(Number(paddingXText)||14, 0, 80);
  const padY = clamp(Number(paddingYText)||0, 0, 40);
  
  const fSize = clamp(Number(fontSizeText)||14, 8, 96);
  const lSpacing = Number(letterSpacingText)||0;
  const lHeight = Number(lineHeightText)||1;
  
  const radiusVal = clamp(Number(radiusText)||0, 0, 60);
  const rTL = linkRadius ? radiusVal : clamp(Number(radiusTLText)||0, 0, 60);
  const rTR = linkRadius ? radiusVal : clamp(Number(radiusTRText)||0, 0, 60);
  const rBR = linkRadius ? radiusVal : clamp(Number(radiusBRText)||0, 0, 60);
  const rBL = linkRadius ? radiusVal : clamp(Number(radiusBLText)||0, 0, 60);
  
  const borderWidthPx = clamp(Number(borderWidthText)||0, 0, 12);
  const borderHoverWidthPx = clamp(Number(borderHoverWidthText)||borderWidthPx, 0, 12);
  const borderActiveWidthPx = clamp(Number(borderActiveWidthText)||borderHoverWidthPx, 0, 12);

  // --- IDs ---
  const idItalic = "ab-italic";
  const idUnderline = "ab-underline";

  // --- CSS Variable Helper Logic ---
  // Determine Base CSS values
  
  // 🔥 FIX: Allow 0 degrees to work (was failing due to || operator)
  const angle = Number(gradAngleText);
  const safeAngle = Number.isFinite(angle) ? angle : 90;

  // 🔥 FIX: Use SAFE Hex values for gradient to prevent breakage while typing
  const safeGradStart = norm(gradStartInput).ok ? norm(gradStartInput).hex : gradStartInput;
  const safeGradMid = norm(gradMidInput).ok ? norm(gradMidInput).hex : gradMidInput;
  const safeGradEnd = norm(gradEndInput).ok ? norm(gradEndInput).hex : gradEndInput;
  const safeBg = norm(bgInput).ok ? norm(bgInput).hex : bgInput;

  let cssBg = "transparent";
  let cssText = textInput;
  let cssBorder = borderInput;

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

  if (hoverEnabled) {
    if (hoverBgMode === "auto") {
      cssHoverFilter = "brightness(0.92)";
    } else {
      // Use safe hover hex if valid
      const safeHoverBg = norm(hoverBgInput).ok ? norm(hoverBgInput).hex : hoverBgInput;
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

  // Determine Disabled CSS values
  const disabledOpacity = clamp(Number(disabledOpacityText) || 0.6, 0, 1);
  const safeDisabledBg = norm(disabledBgInput).ok ? norm(disabledBgInput).hex : disabledBgInput;
  const safeDisabledText = norm(disabledTextInput).ok ? norm(disabledTextInput).hex : disabledTextInput;
  const safeDisabledBorder = norm(disabledBorderInput).ok ? norm(disabledBorderInput).hex : disabledBorderInput;
  let cssDisabledBg = cssBg;
  let cssDisabledText = cssText;
  let cssDisabledBorder = cssBorder;
  if (disabledUseCustomColors) {
    cssDisabledBg = safeDisabledBg;
    cssDisabledText = safeDisabledText;
    cssDisabledBorder = safeDisabledBorder;
  }

  // --- Jitter Fix: PostMessage Logic ---
  const previewBgHex = previewBgMode === "white"
    ? "#ffffff"
    : previewBgMode === "black"
      ? "#000000"
      : (norm(previewBgInput).ok ? norm(previewBgInput).hex : "#0b1220");

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

  const previewPayload = {
    label,
    variant,
    disabled,
    loading,
    loadingLabel,
    loadingSpinnerMode,
    loadingSpinnerPosition,
    loadingSpinnerSvg,
    animation,
    width: wPx,
    height: hPx,
    padX, padY,
    
    // Pass PRE-CALCULATED CSS variables
    cssBg,
    cssText,
    cssBorder,
    cssHoverBg,
    cssHoverText,
    cssHoverBorder,
    cssHoverFilter,

    cssDisabledBg,
    cssDisabledText,
    cssDisabledBorder,
    disabledOpacity,
    disabledCursor,
    
    borderWidth: borderWidthPx,
    borderHoverWidth: borderHoverWidthPx,
    borderActiveWidth: borderActiveWidthPx,
    borderStyle,
    
    // radius
    radiusTL: rTL, radiusTR: rTR, radiusBR: rBR, radiusBL: rBL,
    
    // shadow
    shadowEnabled,
    shX: Number(shXText)||0, shY: Number(shYText)||0,
    shBlur: Number(shBlurText)||0, shSpread: Number(shSpreadText)||0,
    shColor: hexWithAlpha(shColorInput, Number(shOpacityText)||0.1),

    // typography
    fontFamily: fontBucket === "system" 
      ? (SYSTEM_FONTS[Math.min(systemFontIdx, SYSTEM_FONTS.length -1)]?.css || "sans-serif")
      : googleFontFamily,
    fontSize: fSize,
    fontWeight,
    letterSpacing: lSpacing,
    lineHeight: lHeight,
    fontStyle,
    textTransform,
    underline,

    // alignment
    align,

    // text shadow
    textShadowEnabled,
    tsX: Number(tsXText)||0, tsY: Number(tsYText)||0, 
    tsBlur: Number(tsBlurText)||0, 
    tsColor: hexWithAlpha(tsColorInput, Number(tsOpacityText)||0.25),

    // icon
    iconName,
    iconSource,
    iconCustomSvg,
    iconPosition,
    iconSize: Number(iconSizeText)||18,
    iconGap: Number(iconGapText)||10,
    iconColor: iconColorMode === "text" ? "currentColor" : iconColorInput,
    svgContent: iconSource === "custom" ? iconCustomSvg : (ICONS_SVG[iconName] || ""),

    // active
    activeEnabled,
    activeTy: Number(activeTranslateYText)||1,
    activeScale: Number(activeScaleText)||0.99,

    // focus
    focusRingEnabled,
    focusRingWidth: Number(focusRingWidthText)||4,
    focusRingOffset: Number(focusRingOffsetText)||2,
    focusRingColor: focusRingInput,

    // preview specific
    previewBg: previewBgHex,
  };

  useEffect(() => {
    if (!iframeRef.current?.contentWindow) return;
    iframeRef.current.contentWindow.postMessage(previewPayload, "*");
  }, [
    label, variant, disabled, loading, animation, 
    loadingLabel, loadingSpinnerMode, loadingSpinnerPosition, loadingSpinnerSvg,
    wPx, hPx, padX, padY, 
    useGradient, gradAngleText, gradStartInput, gradMidEnabled, gradMidInput, gradEndInput, bgInput, textInput,
    borderWidthText, borderHoverWidthText, borderActiveWidthText, borderStyle, borderInput, rTL, rTR, rBR, rBL,
    disabledOpacityText, disabledCursor, disabledUseCustomColors, disabledBgInput, disabledTextInput, disabledBorderInput,
    shadowEnabled, shXText, shYText, shBlurText, shSpreadText, shOpacityText, shColorInput,
    fontBucket, systemFontIdx, googleFontFamily, fSize, fontWeight, lSpacing, lHeight, fontStyle, textTransform, underline,
    align, textShadowEnabled, tsXText, tsYText, tsBlurText, tsOpacityText, tsColorInput,
    iconName, iconSource, iconCustomSvg, iconPosition, iconSizeText, iconGapText, iconColorMode, iconColorInput,
    hoverEnabled, hoverBgMode, hoverBgInput, hoverTextMode, hoverTextInput, hoverBorderMode, hoverBorderInput,
    activeEnabled, activeTranslateYText, activeScaleText,
    focusRingEnabled, focusRingWidthText, focusRingOffsetText, focusRingInput,
    previewBgMode, previewBgInput
  ]);

  const initialSrcDoc = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  /* Base Reset */
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; font-family: sans-serif; transition: background 0.2s;
  }
  
  /* CSS Variables handled by JS */
  .btn {
    appearance: none; outline: none; 
    cursor: pointer; position: relative; display: inline-flex;
    transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    
    /* Dynamic Props */
    background: var(--btn-bg);
    color: var(--btn-text);
    border-color: var(--btn-border);
    border-width: var(--btn-border-width);
    filter: none;
    box-shadow: var(--btn-shadow);
  }
  
  /* Robust CSS Hover */
  .btn:hover:not(:disabled) {
    background: var(--btn-hover-bg);
    color: var(--btn-hover-text);
    border-color: var(--btn-hover-border);
    border-width: var(--btn-hover-border-width);
    filter: var(--btn-hover-filter);
  }

  .btn:disabled {
    cursor: var(--btn-disabled-cursor);
    opacity: var(--btn-disabled-opacity);
    background: var(--btn-disabled-bg);
    color: var(--btn-disabled-text);
    border-color: var(--btn-disabled-border);
  }

  .icon-svg { flex-shrink: 0; display: inline-flex; }
  .icon-svg svg { width: 100%; height: 100%; display: block; }
  
  @keyframes spin { to { transform: rotate(360deg); } }
  .anim-spin { animation: spin 0.8s linear infinite; }
  
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; transform: scale(0.98); } }
  .anim-pulse { animation: pulse 2s infinite; }
  
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
  .anim-float { animation: float 3s ease-in-out infinite; }
  
  @keyframes subtle-pop { 0% { transform: scale(0.95); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
  .anim-subtle-pop { animation: subtle-pop 0.3s ease-out backwards; }

  .btn:focus-visible {
    box-shadow: var(--btn-shadow), 0 0 0 var(--ring-offset) var(--preview-bg), 0 0 0 calc(var(--ring-offset) + var(--ring-width)) var(--ring-color);
  }
  .btn.force-focus-ring {
    box-shadow: var(--btn-shadow), 0 0 0 var(--ring-offset) var(--preview-bg), 0 0 0 calc(var(--ring-offset) + var(--ring-width)) var(--ring-color);
  }
</style>
</head>
<body>

<button id="btn" class="btn">
  <span id="icon-left" class="icon-svg"></span>
  <span id="label"></span>
  <span id="icon-right" class="icon-svg"></span>
</button>

<script>
  const btn = document.getElementById('btn');
  const labelSpan = document.getElementById('label');
  const iconL = document.getElementById('icon-left');
  const iconR = document.getElementById('icon-right');
  const body = document.body;
  const defaultSpinnerSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>';

  function renderSpinner(target, svg) {
    if (!target || !svg) return;
    target.innerHTML = svg;
    const svgEl = target.querySelector('svg');
    if (svgEl) svgEl.classList.add('anim-spin');
  }
  btn.addEventListener('blur', () => {
    btn.classList.remove('force-focus-ring');
  });

  function ensureFontLink(family){
      if(!family) return;
      const id = 'gf-preview';
      let link = document.getElementById(id);
      if(!link){
          link = document.createElement('link');
          link.id = id;
          link.rel = 'stylesheet';
          document.head.appendChild(link);
      }
      const href = 'https://fonts.googleapis.com/css2?family=' + family.replace(/ /g, '+') + ':wght@100..900&display=swap';
      if(link.getAttribute('href') !== href) link.setAttribute('href', href);
  }

  window.addEventListener('message', (e) => {
    const d = e.data;
    if(!d) return;
    if (d.type === 'focus-button') {
      btn.classList.add('force-focus-ring');
      btn.focus();
      return;
    }

    const loadingLabel = d.loadingLabel || "Loading...";
    labelSpan.textContent = d.loading ? loadingLabel : d.label;
    body.style.background = d.previewBg;
    
    // Update Fonts
    if(d.fontFamily && !d.fontFamily.includes('system-ui')){
        const fam = d.fontFamily.split(',')[0].replace(/['"]/g, '');
        ensureFontLink(fam);
    }

    // Set Dimensions & Radius
    btn.style.width = d.width + "px";
    btn.style.height = d.height + "px";
    btn.style.padding = d.padY + "px " + d.padX + "px";
    btn.style.borderRadius = d.radiusTL + "px " + d.radiusTR + "px " + d.radiusBR + "px " + d.radiusBL + "px";
    btn.disabled = d.disabled || d.loading;
    
    // Set Border Width/Style
    btn.style.setProperty('--btn-border-width', d.borderWidth + "px");
    btn.style.setProperty('--btn-hover-border-width', d.borderHoverWidth + "px");
    btn.style.setProperty('--btn-active-border-width', d.borderActiveWidth + "px");
    btn.style.borderStyle = d.borderStyle;

    // Set CSS Variables for Colors & Hover
    btn.style.setProperty('--btn-bg', d.cssBg);
    btn.style.setProperty('--btn-text', d.cssText);
    btn.style.setProperty('--btn-border', d.cssBorder);
    
    btn.style.setProperty('--btn-hover-bg', d.cssHoverBg);
    btn.style.setProperty('--btn-hover-text', d.cssHoverText);
    btn.style.setProperty('--btn-hover-border', d.cssHoverBorder);
    btn.style.setProperty('--btn-hover-filter', d.cssHoverFilter);
    
    btn.style.setProperty('--btn-disabled-bg', d.cssDisabledBg);
    btn.style.setProperty('--btn-disabled-text', d.cssDisabledText);
    btn.style.setProperty('--btn-disabled-border', d.cssDisabledBorder);
    btn.style.setProperty('--btn-disabled-opacity', d.disabledOpacity);
    btn.style.setProperty('--btn-disabled-cursor', d.disabledCursor);

    // Box Shadow
    if (d.shadowEnabled && d.variant !== 'ghost') {
      btn.style.setProperty('--btn-shadow', \`\${d.shX}px \${d.shY}px \${d.shBlur}px \${d.shSpread}px \${d.shColor}\`);
    } else {
      btn.style.setProperty('--btn-shadow', 'none');
    }

    // Typography & Alignment
    btn.style.fontFamily = d.fontFamily;
    btn.style.fontSize = d.fontSize + "px";
    btn.style.fontWeight = d.fontWeight;
    btn.style.letterSpacing = d.letterSpacing + "px";
    btn.style.lineHeight = d.lineHeight;
    btn.style.fontStyle = d.fontStyle;
    btn.style.textTransform = d.textTransform;
    btn.style.textDecoration = d.underline ? 'underline' : 'none';

    // Alignment Map
    const map = {
      'top-left':      ['flex-end',   'flex-start'],
      'top-center':    ['flex-end',   'center'],
      'top-right':     ['flex-end',   'flex-end'],
      'middle-left':   ['center',     'flex-start'],
      'middle-center': ['center',     'center'],
      'middle-right':  ['center',     'flex-end'],
      'bottom-left':   ['flex-start', 'flex-start'],
      'bottom-center': ['flex-start', 'center'],
      'bottom-right':  ['flex-start', 'flex-end'],
    };
    const [alignItems, justify] = map[d.align] || ['center','center'];
    btn.style.alignItems = alignItems;
    btn.style.justifyContent = justify;

    // Text Shadow
    if (d.textShadowEnabled) {
      btn.style.textShadow = \`\${d.tsX}px \${d.tsY}px \${d.tsBlur}px \${d.tsColor}\`;
    } else {
      btn.style.textShadow = 'none';
    }

    // Icons
    const iconGap = d.iconGap + "px";
    const iconSize = d.iconSize + "px";
    const iconColor = d.iconColor;
    const loadingMode = d.loadingSpinnerMode || "default";
    const loadingSpinnerSvg = loadingMode === "custom"
      ? (d.loadingSpinnerSvg || "")
      : (loadingMode === "none" ? "" : defaultSpinnerSvg);
    const spinnerPosition = d.loadingSpinnerPosition === "right" ? "right" : "left";
    
    iconL.innerHTML = ''; iconR.innerHTML = '';
    iconL.style.display = 'none'; iconR.style.display = 'none';
    iconL.style.marginRight = '0'; iconL.style.marginLeft = '0';
    iconR.style.marginRight = '0'; iconR.style.marginLeft = '0';
    
    if (d.loading) {
        if (loadingSpinnerSvg) {
          const target = spinnerPosition === 'right' ? iconR : iconL;
          renderSpinner(target, loadingSpinnerSvg);
          target.style.display = 'inline-flex';
          target.style.width = iconSize; target.style.height = iconSize;
          target.style.color = iconColor;
          if (spinnerPosition === 'left') target.style.marginRight = iconGap;
          else target.style.marginLeft = iconGap;
        }
    } else if ((d.iconSource === 'custom' && d.svgContent) || (d.iconSource !== 'custom' && d.iconName !== 'none' && d.svgContent)) {
        const target = d.iconPosition === 'left' ? iconL : iconR;
        target.innerHTML = d.svgContent;
        target.style.display = 'inline-flex';
        target.style.width = iconSize; target.style.height = iconSize;
        target.style.color = iconColor;
        
        if (d.iconPosition === 'left') target.style.marginRight = iconGap;
        else target.style.marginLeft = iconGap;
    }

    // Animation Class
    btn.className = 'btn';
    if (d.animation === 'pulse') btn.classList.add('anim-pulse');
    if (d.animation === 'float') btn.classList.add('anim-float');
    if (d.animation === 'subtle-pop') btn.classList.add('anim-subtle-pop');

    // JS Active State (Transform Only)
    btn.onmousedown = () => {
       if(!d.activeEnabled || d.disabled || d.loading) return;
       btn.style.transform = \`translateY(\${d.activeTy}px) scale(\${d.activeScale})\`;
       btn.style.borderWidth = d.borderActiveWidth + "px";
    };
    btn.onmouseup = () => {
       btn.style.transform = 'none';
       btn.style.borderWidth = '';
       if (d.animation === 'float') btn.classList.add('anim-float');
    };
    btn.onmouseleave = () => {
       btn.style.transform = 'none';
       btn.style.borderWidth = '';
    };
    
    // Focus vars
    document.documentElement.style.setProperty('--ring-width', d.focusRingWidth + "px");
    document.documentElement.style.setProperty('--ring-offset', d.focusRingOffset + "px");
    document.documentElement.style.setProperty('--ring-color', d.focusRingColor);
    document.documentElement.style.setProperty('--preview-bg', d.previewBg);
  });
</script>
</body>
</html>`;

  // --- Export Logic ---
  const handleDownload = () => {
    let content = "";
    const ext = downloadFormat === "react" ? "jsx" : downloadFormat;
    const rawBase = sanitizeFilenameBase(downloadName);
    const base = rawBase.replace(/\.(html|jsx|tailwind)$/i, "") || "button";
    const filename = `${base}.${ext}`;
    const loadingLabelText = loadingLabel || "Loading...";
    const spinnerSize = Number(iconSizeText) || 18;
    const spinnerGap = Number(iconGapText) || 10;
    const defaultSpinnerSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`;
    const exportSpinnerSvg = loadingSpinnerMode === "custom" && loadingSpinnerSvg
      ? loadingSpinnerSvg
      : (loadingSpinnerMode === "none" ? "" : defaultSpinnerSvg);
    const spinnerWrap = exportSpinnerSvg
      ? `<span class="uf-spinner-wrap" style="width:${spinnerSize}px;height:${spinnerSize}px;${loadingSpinnerPosition === "left" ? `margin-right:${spinnerGap}px;` : `margin-left:${spinnerGap}px;`}">${exportSpinnerSvg}</span>`
      : "";
    const labelHtml = `<span class="uf-label">${loading ? loadingLabelText : label}</span>`;
    const exportIconSvg = iconSource === "custom" ? iconCustomSvg : (ICONS_SVG[iconName] || "");
    const hasIcon = iconSource === "custom" ? Boolean(exportIconSvg.trim()) : iconName !== "none";
    const iconColor = iconColorMode === "custom" ? iconColorInput : "currentColor";
    const iconWrapLeft = hasIcon && iconPosition === "left"
      ? `<span class="uf-icon-wrap left" style="width:${spinnerSize}px;height:${spinnerSize}px;margin-right:${spinnerGap}px;color:${iconColor};">${exportIconSvg}</span>`
      : "";
    const iconWrapRight = hasIcon && iconPosition === "right"
      ? `<span class="uf-icon-wrap right" style="width:${spinnerSize}px;height:${spinnerSize}px;margin-left:${spinnerGap}px;color:${iconColor};">${exportIconSvg}</span>`
      : "";
    const buttonInnerHtml = loading
      ? (loadingSpinnerPosition === "right" ? `${labelHtml}${spinnerWrap}` : `${spinnerWrap}${labelHtml}`)
      : `${iconWrapLeft}${labelHtml}${iconWrapRight}`;
    const exportDisabled = disabled || loading;
    const exportSpinnerSvgLiteral = JSON.stringify(exportSpinnerSvg);
    const exportLoadingLabelLiteral = JSON.stringify(loadingLabelText);
    const exportIconSvgLiteral = JSON.stringify(exportIconSvg);
    const exportHasIconLiteral = JSON.stringify(hasIcon);
    const exportIconColorLiteral = JSON.stringify(iconColor);

    // Radius string for export
    const rCSS = `${rTL}px ${rTR}px ${rBR}px ${rBL}px`;

    // Map Alignment
    const exportMap: Record<string, [string, string]> = {
      'top-left':      ['flex-end',   'flex-start'],
      'top-center':    ['flex-end',   'center'],
      'top-right':     ['flex-end',   'flex-end'],
      'middle-left':   ['center',     'flex-start'],
      'middle-center': ['center',     'center'],
      'middle-right':  ['center',     'flex-end'],
      'bottom-left':   ['flex-start', 'flex-start'],
      'bottom-center': ['flex-start', 'center'],
      'bottom-right':  ['flex-start', 'flex-end'],
    };
    const [alignItems, justify] = exportMap[align] || ['center', 'center'];

    // Construct Hover CSS
    const hoverCSS = hoverEnabled ? `
.uf-btn:hover {
  ${hoverBgMode === 'auto' ? `filter: brightness(95%);` : `background: ${cssHoverBg}; filter: none;`}
  ${hoverTextMode === 'custom' ? `color: ${hoverTextInput};` : ''}
  ${hoverBorderMode === 'custom' ? `border-color: ${hoverBorderInput};` : ''}
  border-width: ${borderHoverWidthPx}px;
}`.trim() : "";

    if (downloadFormat === "html") {
      content = `
<button class="uf-btn"${exportDisabled ? " disabled" : ""}>
  ${buttonInnerHtml}
</button>

<style>
.uf-btn {
  width: ${wPx}px; height: ${hPx}px;
  padding: ${padY}px ${padX}px;
  border-radius: ${rCSS};
  display: inline-flex;
  align-items: ${alignItems}; justify-content: ${justify};
  background: ${cssBg};
  color: ${textInput};
  border: ${borderWidthPx}px ${borderStyle} ${borderInput};
  font-family: ${fontBucket === "system" ? "sans-serif" : googleFontFamily};
  font-size: ${fSize}px;
  font-weight: ${fontWeight};
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: ${underline ? "underline" : "none"};
}
.uf-btn:disabled {
  background: ${cssDisabledBg};
  color: ${cssDisabledText};
  border-color: ${cssDisabledBorder};
  opacity: ${disabledOpacity};
  cursor: ${disabledCursor};
}
.uf-spinner-wrap svg {
  display: block;
  width: 100%;
  height: 100%;
  animation: spin 0.8s linear infinite;
}
.uf-icon-wrap svg {
  display: block;
  width: 100%;
  height: 100%;
}
@keyframes spin { to { transform: rotate(360deg); } }
${hoverCSS}
${activeEnabled ? `.uf-btn:active { transform: translateY(${activeTranslateYText}px) scale(${activeScaleText}); border-width: ${borderActiveWidthPx}px; }` : ""}
</style>`;
    } else if (downloadFormat === "react") {
      content = `
import React, { useState } from 'react';

export const CustomButton = ({ onClick, disabled = false, loading = false }) => {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const isDisabled = disabled || loading;
  const defaultLabel = ${JSON.stringify(label)};
  const loadingLabel = ${exportLoadingLabelLiteral};
  const spinnerSvg = ${exportSpinnerSvgLiteral};
  const spinnerPosition = "${loadingSpinnerPosition}";
  const spinnerGap = ${spinnerGap};
  const spinnerSize = ${spinnerSize};
  const iconSvg = ${exportIconSvgLiteral};
  const iconPosition = "${iconPosition}";
  const iconColor = ${exportIconColorLiteral};
  const hasIcon = ${exportHasIconLiteral};

  const baseStyle = {
    width: '${wPx}px', height: '${hPx}px',
    padding: '${padY}px ${padX}px',
    borderRadius: '${rCSS}',
    background: '${cssBg}',
    color: '${textInput}',
    border: '${borderWidthPx}px ${borderStyle} ${borderInput}',
    fontSize: '${fSize}px',
    fontWeight: ${fontWeight},
    textDecoration: '${underline ? "underline" : "none"}',
    display: 'inline-flex',
    alignItems: '${alignItems}',
    justifyContent: '${justify}',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const disabledStyle = {
    background: '${cssDisabledBg}',
    color: '${cssDisabledText}',
    borderColor: '${cssDisabledBorder}',
    opacity: ${disabledOpacity},
    cursor: '${disabledCursor}',
  };

  const hoverStyle = {
    ${hoverBgMode === 'auto' ? `filter: 'brightness(95%)',` : `background: '${cssHoverBg}', filter: 'none',`}
    ${hoverTextMode === 'custom' ? `color: '${hoverTextInput}',` : ''}
    ${hoverBorderMode === 'custom' ? `borderColor: '${hoverBorderInput}',` : ''}
    borderWidth: '${borderHoverWidthPx}px',
  };

  const activeStyle = {
    transform: 'translateY(${activeTranslateYText}px) scale(${activeScaleText})',
    borderWidth: '${borderActiveWidthPx}px',
  };

  const spinnerWrapStyle = {
    width: spinnerSize,
    height: spinnerSize,
    display: 'inline-flex',
    ...(spinnerPosition === 'left' ? { marginRight: spinnerGap } : { marginLeft: spinnerGap }),
  };

  const spinnerNode = spinnerSvg ? (
    <span className="uf-spinner-wrap" style={spinnerWrapStyle} dangerouslySetInnerHTML={{ __html: spinnerSvg }} />
  ) : null;
  const labelNode = <span className="uf-label">{loading ? loadingLabel : defaultLabel}</span>;
  const iconWrapStyle = {
    width: spinnerSize,
    height: spinnerSize,
    display: 'inline-flex',
    color: iconColor,
    ...(iconPosition === 'left' ? { marginRight: spinnerGap } : { marginLeft: spinnerGap }),
  };
  const iconNode = hasIcon && iconSvg ? (
    <span className="uf-icon-wrap" style={iconWrapStyle} dangerouslySetInnerHTML={{ __html: iconSvg }} />
  ) : null;

  return (
    <>
      <style>{\`
        @keyframes spin { to { transform: rotate(360deg); } }
        .uf-spinner-wrap svg { display: block; width: 100%; height: 100%; animation: spin 0.8s linear infinite; }
        .uf-icon-wrap svg { display: block; width: 100%; height: 100%; }
      \`}</style>
      <button 
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      disabled={isDisabled}
      style={{
        ...baseStyle,
        ...(hover ? hoverStyle : {}),
        ...(active ? activeStyle : {}),
        ...(isDisabled ? disabledStyle : {}),
      }}
    >
      {loading ? (
        spinnerPosition === 'right' ? (
          <>
            {labelNode}
            {spinnerNode}
          </>
        ) : (
          <>
            {spinnerNode}
            {labelNode}
          </>
        )
      ) : (
        iconPosition === 'right' ? (
          <>
            {labelNode}
            {iconNode}
          </>
        ) : (
          <>
            {iconNode}
            {labelNode}
          </>
        )
      )}
    </button>
    </>
  );
};
`;
    } else {
      content = "// Tailwind export coming next iteration!";
    }

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sectionItems = [
    {
      id: "basics",
      label: "Basics",
      content: (
        <BasicsSection
          label={label} setLabel={setLabel}
          variant={variant} setVariant={setVariant}
          disabled={disabled} setDisabled={setDisabled}
          loading={loading} setLoading={setLoading}
          animation={animation} setAnimation={setAnimation}
          idDisabled="disable-check" idLoading="loading-check"
        />
      ),
    },
    {
      id: "sizing",
      label: "Sizing",
      content: (
        <SizingSection
          subtitle="Dimensions & Spacing"
          widthText={widthText} setWidthText={setWidthText} effectiveWidthPx={wPx}
          heightText={heightText} setHeightText={setHeightText} effectiveHeightPx={hPx}
          paddingXText={paddingXText} setPaddingXText={setPaddingXText}
          paddingYText={paddingYText} setPaddingYText={setPaddingYText}
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
          useGradient={useGradient} setUseGradient={setUseGradient}
          gradAngleText={gradAngleText} setGradAngleText={setGradAngleText}
          gradStartInput={gradStartInput} setGradStartInput={setGradStartInput}
          gradStartNorm={norm(gradStartInput)}
          gradMidEnabled={gradMidEnabled} setGradMidEnabled={setGradMidEnabled}
          gradMidInput={gradMidInput} setGradMidInput={setGradMidInput}
          gradMidNorm={norm(gradMidInput)}
          gradEndInput={gradEndInput} setGradEndInput={setGradEndInput}
          gradEndNorm={norm(gradEndInput)}
          bgInput={bgInput} setBgInput={setBgInput}
          bgNorm={norm(bgInput)}
          textInput={textInput} setTextInput={setTextInput}
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
          borderWidthText={borderWidthText} setBorderWidthText={setBorderWidthText}
          borderHoverWidthText={borderHoverWidthText} setBorderHoverWidthText={setBorderHoverWidthText}
          borderActiveWidthText={borderActiveWidthText} setBorderActiveWidthText={setBorderActiveWidthText}
          borderStyle={borderStyle} setBorderStyle={setBorderStyle}
          borderInput={borderInput} setBorderInput={setBorderInput}
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
          linkRadius={linkRadius} setLinkRadius={setLinkRadius}
          radiusText={radiusText} setRadiusText={setRadiusText}
          radiusTLText={radiusTLText} setRadiusTLText={setRadiusTLText}
          radiusTRText={radiusTRText} setRadiusTRText={setRadiusTRText}
          radiusBRText={radiusBRText} setRadiusBRText={setRadiusBRText}
          radiusBLText={radiusBLText} setRadiusBLText={setRadiusBLText}
          radiusUnified={Number(radiusText)}
          radiusTL={rTL} radiusTR={rTR} radiusBR={rBR} radiusBL={rBL}
        />
      ),
    },
    {
      id: "shadow",
      label: "Shadow",
      content: (
        <ShadowSection
          PALETTE={PALETTE}
          shadowEnabled={shadowEnabled} setShadowEnabled={setShadowEnabled}
          shXText={shXText} setShXText={setShXText}
          shYText={shYText} setShYText={setShYText}
          shBlurText={shBlurText} setShBlurText={setShBlurText}
          shSpreadText={shSpreadText} setShSpreadText={setShSpreadText}
          shOpacityText={shOpacityText} setShOpacityText={setShOpacityText}
          shColorInput={shColorInput} setShColorInput={setShColorInput}
          shColorOk={norm(shColorInput).ok} shColorHex={norm(shColorInput).hex} shColorRgb={norm(shColorInput).rgb}
        />
      ),
    },
    {
      id: "typography",
      label: "Typography",
      content: (
        <TypographySection
          fontBucket={fontBucket} setFontBucket={setFontBucket}
          fontSearch={fontSearch} setFontSearch={setFontSearch}
          systemFonts={SYSTEM_FONTS} filteredSystemFonts={filteredSystemFonts}
          systemFontIdx={systemFontIdx} setSystemFontIdx={setSystemFontIdx}
          googleFonts={GOOGLE_FONTS} filteredGoogleFonts={filteredGoogleFonts}
          googleFontFamily={googleFontFamily} setGoogleFontFamily={setGoogleFontFamily}
          
          fontSizeText={fontSizeText} setFontSizeText={setFontSizeText} fontSizePx={fSize}
          fontWeight={fontWeight} setFontWeight={setFontWeight}
          letterSpacing={lSpacing} letterSpacingText={letterSpacingText} setLetterSpacingText={setLetterSpacingText}
          lineHeight={lHeight} lineHeightText={lineHeightText} setLineHeightText={setLineHeightText}
          fontStyle={fontStyle} setFontStyle={setFontStyle}
          textTransform={textTransform} setTextTransform={setTextTransform}
          
          underline={underline} setUnderline={setUnderline}
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
          textShadowEnabled={textShadowEnabled} setTextShadowEnabled={setTextShadowEnabled}
          tsXText={tsXText} setTsXText={setTsXText}
          tsYText={tsYText} setTsYText={setTsYText}
          tsBlurText={tsBlurText} setTsBlurText={setTsBlurText}
          tsOpacityText={tsOpacityText} setTsOpacityText={setTsOpacityText}
          tsColorInput={tsColorInput} setTsColorInput={setTsColorInput}
          tsColorOk={norm(tsColorInput).ok} tsColorHex={norm(tsColorInput).hex} tsColorRgb={norm(tsColorInput).rgb}
        />
      ),
    },
    {
      id: "icon",
      label: "Icon",
      content: (
        <IconSection
          PALETTE={PALETTE}
          iconName={iconName as any} setIconName={setIconName}
          iconSource={iconSource} setIconSource={setIconSource}
          iconCustomSvg={iconCustomSvg} setIconCustomSvg={setIconCustomSvg}
          iconPosition={iconPosition} setIconPosition={setIconPosition}
          iconSizeText={iconSizeText} setIconSizeText={setIconSizeText} iconSize={Number(iconSizeText)}
          iconGapText={iconGapText} setIconGapText={setIconGapText} iconGap={Number(iconGapText)}
          iconColorMode={iconColorMode} setIconColorMode={setIconColorMode}
          iconColorInput={iconColorInput} setIconColorInput={setIconColorInput}
          iconColorNorm={norm(iconColorInput)} baseTextHex={textInput}
        />
      ),
    },
    {
      id: "loading",
      label: "Loading",
      content: (
        <LoadingSection
          loadingLabel={loadingLabel} setLoadingLabel={setLoadingLabel}
          loadingSpinnerMode={loadingSpinnerMode} setLoadingSpinnerMode={setLoadingSpinnerMode}
          loadingSpinnerPosition={loadingSpinnerPosition} setLoadingSpinnerPosition={setLoadingSpinnerPosition}
          loadingSpinnerSvg={loadingSpinnerSvg} setLoadingSpinnerSvg={setLoadingSpinnerSvg}
        />
      ),
    },
    {
      id: "disabled",
      label: "Disabled",
      content: (
        <DisabledSection
          PALETTE={PALETTE}
          disabledOpacityText={disabledOpacityText} setDisabledOpacityText={setDisabledOpacityText}
          disabledCursor={disabledCursor} setDisabledCursor={setDisabledCursor}
          disabledUseCustomColors={disabledUseCustomColors} setDisabledUseCustomColors={setDisabledUseCustomColors}
          disabledBgInput={disabledBgInput} setDisabledBgInput={setDisabledBgInput}
          disabledBgNorm={norm(disabledBgInput)}
          disabledTextInput={disabledTextInput} setDisabledTextInput={setDisabledTextInput}
          disabledTextNorm={norm(disabledTextInput)}
          disabledBorderInput={disabledBorderInput} setDisabledBorderInput={setDisabledBorderInput}
          disabledBorderNorm={norm(disabledBorderInput)}
        />
      ),
    },
    {
      id: "hover",
      label: "Hover",
      content: (
        <HoverSection
          PALETTE={PALETTE}
          hoverEnabled={hoverEnabled} setHoverEnabled={setHoverEnabled}
          hoverBgMode={hoverBgMode} setHoverBgMode={setHoverBgMode}
          hoverBgInput={hoverBgInput} setHoverBgInput={setHoverBgInput}
          hoverBgOk={norm(hoverBgInput).ok} hoverBgHex={norm(hoverBgInput).hex} hoverBgRgb={norm(hoverBgInput).rgb}
          
          hoverTextMode={hoverTextMode} setHoverTextMode={setHoverTextMode}
          hoverTextInput={hoverTextInput} setHoverTextInput={setHoverTextInput}
          hoverTextOk={norm(hoverTextInput).ok} hoverTextHex={norm(hoverTextInput).hex} hoverTextRgb={norm(hoverTextInput).rgb}
          
          hoverBorderMode={hoverBorderMode} setHoverBorderMode={setHoverBorderMode}
          hoverBorderInput={hoverBorderInput} setHoverBorderInput={setHoverBorderInput}
          hoverBorderOk={norm(hoverBorderInput).ok} hoverBorderHex={norm(hoverBorderInput).hex} hoverBorderRgb={norm(hoverBorderInput).rgb}
        />
      ),
    },
    {
      id: "active",
      label: "Active",
      content: (
        <ActiveStateSection
          idActive="active-check"
          activeEnabled={activeEnabled} setActiveEnabled={setActiveEnabled}
          activeTranslateYText={activeTranslateYText} setActiveTranslateYText={setActiveTranslateYText} activeTranslateY={Number(activeTranslateYText)}
          activeScaleText={activeScaleText} setActiveScaleText={setActiveScaleText} activeScale={Number(activeScaleText)}
        />
      ),
    },
    {
      id: "focus",
      label: "Focus Ring",
      content: (
        <FocusRingSection
          PALETTE={PALETTE}
          idRing="focus-check"
          focusRingEnabled={focusRingEnabled} setFocusRingEnabled={setFocusRingEnabled}
          focusRingWidthText={focusRingWidthText} setFocusRingWidthText={setFocusRingWidthText} ringWidth={Number(focusRingWidthText)}
          focusRingOffsetText={focusRingOffsetText} setFocusRingOffsetText={setFocusRingOffsetText} ringOffset={Number(focusRingOffsetText)}
          focusRingInput={focusRingInput} setFocusRingInput={setFocusRingInput}
          focusRingNorm={norm(focusRingInput)}
        />
      ),
    },
    {
      id: "preview-bg",
      label: "Preview BG",
      content: (
        <PreviewBackgroundSection
          PALETTE={PALETTE}
          bgMode={previewBgMode} setBgMode={setPreviewBgMode}
          previewBgInput={previewBgInput} setPreviewBgInput={setPreviewBgInput}
          previewBgNorm={norm(previewBgInput)}
        />
      ),
    },
  ];

  const activePanel = sectionItems.find((item) => item.id === activeSection) ?? sectionItems[0];


  // --- Render ---
  return (
    <AppShell>
      {/* Layout: Fixed height container with independent scrolling columns */}
      <div
        ref={splitRef}
        className="flex flex-col gap-6 lg:h-[calc(100vh-8rem)] lg:min-h-0 lg:flex-row lg:overflow-hidden"
        style={{ userSelect: isResizing ? "none" : "auto" }}
      >
        
        {/* Left Column: Controls */}
        <div
          className="flex-1 space-y-6 lg:min-h-0 lg:overflow-y-auto lg:pr-6 lg:pb-10 lg:overscroll-contain lg:h-full"
          style={{
            scrollbarGutter: "stable",
            ...(isDesktop ? { width: leftPanelWidth, flex: "0 0 auto" } : null),
          }}
        >
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text)" }}>
            Action Button
          </h1>
          <div
            className="rounded-2xl border p-3"
            style={{ borderColor: "var(--border)", background: "color-mix(in oklab, var(--card) 70%, transparent)" }}
          >
            <div className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
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
                    background: activePanel?.id === item.id ? "var(--primary)" : "transparent",
                    color: activePanel?.id === item.id ? "white" : "var(--text)",
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
        <div className="flex-1 lg:min-h-0 lg:overflow-y-auto lg:pb-10 lg:h-full" style={{ minWidth: 360 }}>
           <div className="sticky top-20">
              <PreviewDownloadPanel
                 mounted={mounted}
                 iframeSrcDoc={initialSrcDoc}
                 iframeRef={iframeRef}
                 handleIframeLoad={() => {
                   if(iframeRef.current?.contentWindow) {
                     iframeRef.current.contentWindow.postMessage(previewPayload, "*");
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
