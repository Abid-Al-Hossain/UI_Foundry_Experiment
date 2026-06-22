import {
  getClickEffectProfile,
  getSafeBurstColors,
  type ClickEffectProfile,
} from "./interactionEffects";

export type DownloadFormat = "react";

type TransitionEasing =
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "spring";

type ButtonStyleSnapshot = {
  background: string;
  color: string;
  borderColor: string;
  borderWidth: string;
  boxShadow: string;
  textShadow: string;
  transform: string;
  filter: string;
};

type NormalizedConfig = {
  componentName: string;
  label: string;
  loadingLabel: string;
  disabled: boolean;
  loading: boolean;
  width: string;
  height: string;
  paddingX: string;
  paddingY: string;
  gap: string;
  borderRadius: string;
  alignItems: string;
  justifyContent: string;
  fontFamily: string;
  fontImport: string;
  fontSize: string;
  fontWeight: number | string;
  fontStyle: string;
  textTransform: string;
  textDecoration: string;
  letterSpacing: string;
  lineHeight: number | string;
  disabledOpacity: number;
  disabledCursor: string;
  transitionMs: number;
  transformTransitionMs: number;
  transitionEasing: Exclude<TransitionEasing, "spring">;
  transformTransitionEasing: Exclude<TransitionEasing, "spring">;
  animation: string;
  textAnimation: string;
  depthAnimation: string;
  motionDurationMs: number;
  motionSpeed: number;
  motionIntensity: number;
  motionEasing: Exclude<TransitionEasing, "spring">;
  textStaggerMs: number;
  hoverEnabled: boolean;
  activeEnabled: boolean;
  focusRingEnabled: boolean;
  focusRingColor: string;
  focusRingWidth: number;
  focusRingOffset: number;
  hoverEffect: string;
  clickEffect: string;
  particleCount: number;
  shellTransitionMs: number;
  shellTransitionEase: string;
  groupEnabled: boolean;
  groupAlign: string;
  groupJustify: string;
  groupGap: string;
  backdropBlur: string;
  topGradient: string;
  parallaxEnabled: boolean;
  parallaxOpacity: number;
  iconEmbossFilter: string;
  previewSurface: string;
  baseStyle: ButtonStyleSnapshot;
  hoverStyle: ButtonStyleSnapshot;
  activeStyle: ButtonStyleSnapshot;
  disabledStyle: ButtonStyleSnapshot;
  icons: {
    base: string;
    hover: string;
    active: string;
    loading: string;
    position: "left" | "right";
    size: string;
    color: string;
  };
  loadingVisual: {
    showSpinner: boolean;
    spinnerPosition: "left" | "right";
    spinnerSvg: string;
  };
  accessibility: {
    ariaLabel: string;
    ariaPressed: string;
    ariaBusy: string;
  };
  clickEffectProfile: ClickEffectProfile;
  burstColors: string[];
};

export type ExportPayloadInput = {
  downloadFormat?: DownloadFormat;
  downloadName?: string;
  componentName?: string;
  label?: string;
  loadingLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  width?: string | number;
  widthPx?: string | number;
  height?: string | number;
  heightPx?: string | number;
  paddingX?: string | number;
  paddingY?: string | number;
  gap?: string | number;
  gapPx?: string | number;
  borderRadius?: string;
  radiusCss?: string;
  radiusTopLeft?: string | number;
  radiusTopRight?: string | number;
  radiusBottomRight?: string | number;
  radiusBottomLeft?: string | number;
  fontFamily?: string;
  fontImportUrl?: string;
  fontSize?: string | number;
  fontSizePx?: string | number;
  fontWeight?: string | number;
  fontStyle?: string;
  textTransform?: string;
  textDecoration?: string;
  letterSpacing?: string | number;
  letterSpacingPx?: string | number;
  lineHeight?: string | number;
  transitionDurationMs?: string | number;
  transitionEasing?: TransitionEasing | string;
  animation?: string;
  textAnimation?: string;
  depthAnimation?: string;
  animationDurationText?: string | number;
  animationSpeedText?: string | number;
  animationIntensityText?: string | number;
  animationEasing?: TransitionEasing | string;
  textAnimationStaggerText?: string | number;
  hoverEnabled?: boolean;
  activeEnabled?: boolean;
  focusRingEnabled?: boolean;
  focusRingColor?: string;
  focusRingWidth?: string | number;
  focusRingOffset?: string | number;
  background?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: string | number;
  boxShadow?: string;
  textShadow?: string;
  textShadowEnabled?: boolean;
  textShadowX?: string | number;
  textShadowY?: string | number;
  textShadowBlur?: string | number;
  textShadowColor?: string;
  hoverBackground?: string;
  hoverTextColor?: string;
  hoverBorderColor?: string;
  hoverBorderWidth?: string | number;
  hoverBoxShadow?: string;
  hoverTextShadow?: string;
  hoverTransform?: string;
  activeBackground?: string;
  activeTextColor?: string;
  activeBorderColor?: string;
  activeBorderWidth?: string | number;
  activeBoxShadow?: string;
  activeTextShadow?: string;
  activeTransform?: string;
  disabledBackground?: string;
  disabledTextColor?: string;
  disabledBorderColor?: string;
  disabledBorderWidth?: string | number;
  disabledBoxShadow?: string;
  disabledTextShadow?: string;
  disabledTransform?: string;
  iconSvg?: string;
  baseIconSvg?: string;
  hoverIconSvg?: string;
  activeIconSvg?: string;
  loadingIconSvg?: string;
  iconPosition?: "left" | "right" | string;
  iconSize?: string | number;
  iconSizePx?: string | number;
  spinnerSvg?: string;
  loadingShowSpinner?: boolean;
  spinnerPosition?: "left" | "right" | string;
  ariaLabel?: string;
  ariaPressed?: string;
  ariaBusy?: string;
  hoverEffect?: string;
  clickEffect?: string;
  clickParticleCount?: string | number;
  hoverSpringStiffness?: string | number;
  hoverSpringDamping?: string | number;
  groupEnabled?: boolean;
  groupAlign?: string;
  groupGap?: string | number;
  glassEffect?: boolean;
  [key: string]: unknown;
};

const DEFAULT_SPINNER_SVG =
  '<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>';

const SPARKLE_DOTS = [
  { top: "14%", left: "18%", delay: "0ms", size: 5 },
  { top: "20%", left: "78%", delay: "80ms", size: 4 },
  { top: "42%", left: "10%", delay: "140ms", size: 6 },
  { top: "62%", left: "84%", delay: "40ms", size: 5 },
  { top: "76%", left: "26%", delay: "180ms", size: 4 },
  { top: "34%", left: "60%", delay: "220ms", size: 5 },
];

const firstDefined = (...values: unknown[]) =>
  values.find((value) => value !== undefined && value !== null);

const toStringValue = (value: unknown, fallback = ""): string => {
  if (typeof value === "string") return value;
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return fallback;
};

const toNumberValue = (value: unknown, fallback: number): number => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
};

const toBooleanValue = (value: unknown, fallback = false): boolean => {
  if (typeof value === "boolean") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  return fallback;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const toCssLength = (value: unknown, fallback: string, unit = "px"): string => {
  if (typeof value === "number" && Number.isFinite(value)) return `${value}${unit}`;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return fallback;
    if (/^-?\d+(\.\d+)?$/.test(trimmed)) return `${trimmed}${unit}`;
    return trimmed;
  }
  return fallback;
};

const sanitizeFilenameBase = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "action-button";

const toPascalComponentName = (value: string) => {
  const safe = value
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join("");

  return safe || "ActionButton";
};

const serializeForScript = (value: unknown) =>
  JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

const normalizeBorderRadius = (payload: ExportPayloadInput) => {
  const direct = toStringValue(
    firstDefined(payload.borderRadius, payload.radiusCss),
    "",
  );
  if (direct) return direct;
  const tl = toCssLength(
    firstDefined(payload.radiusTopLeft, payload["rTL"]),
    "14px",
  );
  const tr = toCssLength(firstDefined(payload.radiusTopRight, payload["rTR"]), tl);
  const br = toCssLength(
    firstDefined(payload.radiusBottomRight, payload["rBR"]),
    tl,
  );
  const bl = toCssLength(
    firstDefined(payload.radiusBottomLeft, payload["rBL"]),
    tr,
  );
  return `${tl} ${tr} ${br} ${bl}`;
};

const normalizeTextShadow = (
  direct: unknown,
  enabled: unknown,
  x: unknown,
  y: unknown,
  blur: unknown,
  color: unknown,
) => {
  const directValue = toStringValue(direct, "");
  if (directValue) return directValue;
  if (!toBooleanValue(enabled, false)) return "none";

  return [
    toCssLength(x, "0px"),
    toCssLength(y, "0px"),
    toCssLength(blur, "0px"),
    toStringValue(color, "rgba(0, 0, 0, 0.24)"),
  ].join(" ");
};

const normalizeTransitionEasing = (
  value: unknown,
): Exclude<TransitionEasing, "spring"> => {
  const raw = toStringValue(value, "ease");
  if (raw === "linear") return "linear";
  if (raw === "ease-in") return "ease-in";
  if (raw === "ease-out") return "ease-out";
  if (raw === "ease-in-out") return "ease-in-out";
  return "ease";
};

const normalizeJustify = (align: string) => {
  if (align.includes("left") || align === "start") return "flex-start";
  if (align.includes("right") || align === "end") return "flex-end";
  return "center";
};

const normalizeAlignItems = (align: string) => {
  if (align.startsWith("top")) return "flex-start";
  if (align.startsWith("bottom")) return "flex-end";
  return "center";
};

const normalizeFontImport = (payload: ExportPayloadInput) => {
  const explicit = toStringValue(payload.fontImportUrl, "");
  if (explicit) return explicit;

  const fontBucket = toStringValue(payload["fontBucket"], "");
  const googleFontFamily = toStringValue(payload["googleFontFamily"], "");
  if (fontBucket === "google" && googleFontFamily) {
    return `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      googleFontFamily,
    )}:wght@100..900&display=swap`;
  }

  return "";
};

const normalizeAnimationPreset = (value: unknown) => {
  const raw = toStringValue(value, "none");
  if (raw === "subtle-pop") return "none";
  if (raw === "pulse") return "breathe";
  if (raw === "float") return "soft-drift";
  if (
    raw === "breathe" ||
    raw === "soft-drift" ||
    raw === "soft-glow" ||
    raw === "sheen" ||
    raw === "aurora" ||
    raw === "neon-pulse" ||
    raw === "cyber-glitch"
  ) {
    return raw;
  }
  return "none";
};

const normalizeTextAnimationPreset = (value: unknown) => {
  const raw = toStringValue(value, "none");
  if (
    raw === "wave" ||
    raw === "bounce" ||
    raw === "flicker" ||
    raw === "shimmer" ||
    raw === "glitch"
  ) {
    return raw;
  }
  return "none";
};

const normalizeDepthAnimationPreset = (value: unknown) => {
  const raw = toStringValue(value, "none");
  if (
    raw === "rock" ||
    raw === "orbit" ||
    raw === "gyro" ||
    raw === "tilt-cycle"
  ) {
    return raw;
  }
  return "none";
};

const normalizeConfig = (payload: ExportPayloadInput): NormalizedConfig => {
  const componentName = toStringValue(
    firstDefined(payload.componentName, payload.downloadName),
    "action-button",
  );
  const label = toStringValue(payload.label, "Confirm");
  const loadingLabel = toStringValue(payload.loadingLabel, "Loading...");
  const hoverEffect = toStringValue(payload.hoverEffect, "none");
  const clickEffect = toStringValue(payload.clickEffect, "none");
  const stiffness = clamp(toNumberValue(payload.hoverSpringStiffness, 240), 80, 600);
  const damping = clamp(toNumberValue(payload.hoverSpringDamping, 18), 6, 60);
  const align = toStringValue(payload["align"], "middle-center");
  const baseTextShadow = normalizeTextShadow(
    firstDefined(payload.textShadow, payload["disabledTextShadowCss"]),
    firstDefined(payload.textShadowEnabled, payload["textShadowEnabled"]),
    firstDefined(payload.textShadowX, payload["tsXText"], payload["tsX"]),
    firstDefined(payload.textShadowY, payload["tsYText"], payload["tsY"]),
    firstDefined(payload.textShadowBlur, payload["tsBlurText"], payload["tsBlur"]),
    firstDefined(payload.textShadowColor, payload["tsColor"]),
  );
  const hoverTransform =
    toStringValue(payload.hoverTransform, "") ||
    (() => {
      const tiltX = toNumberValue(payload["hoverTiltX"], 0);
      const tiltY = toNumberValue(payload["hoverTiltY"], 0);
      if (!tiltX && !tiltY) return "none";
      return `perspective(${toNumberValue(payload["hoverPerspective"], 800)}px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
    })();
  const activeTransform =
    toStringValue(payload.activeTransform, "") ||
    `translateY(${toNumberValue(payload["activeTranslateYText"], 1)}px) scale(${toNumberValue(payload["activeScaleText"], 0.99)})`;

  const baseStyle: ButtonStyleSnapshot = {
    background: toStringValue(firstDefined(payload.background, payload["cssBg"]), "#111827"),
    color: toStringValue(firstDefined(payload.textColor, payload["textInput"], payload["cssText"]), "#ffffff"),
    borderColor: toStringValue(firstDefined(payload.borderColor, payload["borderInput"], payload["cssBorder"]), "rgba(0, 0, 0, 0.06)"),
    borderWidth: toCssLength(firstDefined(payload.borderWidth, payload["borderWidthPx"]), "1px"),
    boxShadow: toStringValue(firstDefined(payload.boxShadow, payload["boxShadowCss"]), "0px 10px 24px rgba(0, 0, 0, 0.16)"),
    textShadow: baseTextShadow,
    transform: "none",
    filter: "none",
  };

  const hoverStyle: ButtonStyleSnapshot = {
    background: toStringValue(firstDefined(payload.hoverBackground, payload["cssHoverBg"]), baseStyle.background),
    color: toStringValue(firstDefined(payload.hoverTextColor, payload["hoverTextInput"], payload["cssHoverText"]), baseStyle.color),
    borderColor: toStringValue(firstDefined(payload.hoverBorderColor, payload["hoverBorderInput"], payload["cssHoverBorder"]), baseStyle.borderColor),
    borderWidth: toCssLength(firstDefined(payload.hoverBorderWidth, payload["hoverBorderWidthPx"]), baseStyle.borderWidth),
    boxShadow: toStringValue(firstDefined(payload.hoverBoxShadow, payload["boxShadowHoverCss"], payload["boxShadowHover"]), baseStyle.boxShadow),
    textShadow: toStringValue(payload.hoverTextShadow, baseStyle.textShadow),
    transform: hoverTransform,
    filter: toStringValue(payload["cssHoverFilter"], "none"),
  };

  const activeStyle: ButtonStyleSnapshot = {
    background: toStringValue(firstDefined(payload.activeBackground, payload["cssActiveBg"]), baseStyle.background),
    color: toStringValue(firstDefined(payload.activeTextColor, payload["cssActiveText"]), baseStyle.color),
    borderColor: toStringValue(firstDefined(payload.activeBorderColor, payload["cssActiveBorder"]), baseStyle.borderColor),
    borderWidth: toCssLength(firstDefined(payload.activeBorderWidth, payload["activeBorderWidthPx"]), baseStyle.borderWidth),
    boxShadow: toStringValue(firstDefined(payload.activeBoxShadow, payload["boxShadowActiveCss"], payload["boxShadowActive"]), baseStyle.boxShadow),
    textShadow: toStringValue(payload.activeTextShadow, baseStyle.textShadow),
    transform: activeTransform,
    filter: toStringValue(payload["cssActiveFilter"], "none"),
  };

  const disabledStyle: ButtonStyleSnapshot = {
    background: toStringValue(firstDefined(payload.disabledBackground, payload["cssDisabledBg"]), baseStyle.background),
    color: toStringValue(firstDefined(payload.disabledTextColor, payload["cssDisabledText"]), baseStyle.color),
    borderColor: toStringValue(firstDefined(payload.disabledBorderColor, payload["cssDisabledBorder"]), baseStyle.borderColor),
    borderWidth: toCssLength(firstDefined(payload.disabledBorderWidth, payload["disabledBorderWidthPx"]), baseStyle.borderWidth),
    boxShadow: toStringValue(firstDefined(payload.disabledBoxShadow, payload["boxShadowCss"]), baseStyle.boxShadow),
    textShadow: toStringValue(firstDefined(payload.disabledTextShadow, payload["disabledTextShadowCss"]), baseStyle.textShadow),
    transform: toStringValue(payload.disabledTransform, "none"),
    filter: "none",
  };

  const clickEffectProfile = getClickEffectProfile(
    clickEffect,
    toNumberValue(payload.clickParticleCount, 24),
  );
  const burstColors = getSafeBurstColors(clickEffect, [
    baseStyle.background,
    baseStyle.color,
    hoverStyle.background,
    hoverStyle.color,
    activeStyle.background,
    activeStyle.color,
    toStringValue(payload.focusRingColor, "#60a5fa"),
  ]);

  const groupAlign = toStringValue(payload.groupAlign, "center");

  return {
    componentName,
    label,
    loadingLabel,
    disabled: toBooleanValue(payload.disabled, false),
    loading: toBooleanValue(payload.loading, false),
    width: toCssLength(firstDefined(payload.widthPx, payload.width, payload["touchWidth"]), "220px"),
    height: toCssLength(firstDefined(payload.heightPx, payload.height, payload["touchHeight"]), "44px"),
    paddingX: toCssLength(firstDefined(payload.paddingX, payload["padX"]), "14px"),
    paddingY: toCssLength(firstDefined(payload.paddingY, payload["padY"]), "0px"),
    gap: toCssLength(firstDefined(payload.gapPx, payload.gap, payload["iconGapText"]), "10px"),
    borderRadius: normalizeBorderRadius(payload),
    alignItems: normalizeAlignItems(align),
    justifyContent: normalizeJustify(align),
    fontFamily: toStringValue(payload.fontFamily, "Arial, system-ui"),
    fontImport: normalizeFontImport(payload),
    fontSize:
      payload["fontSizeValue"] != null
        ? `${toNumberValue(payload["fontSizeValue"], 14)}${toStringValue(payload["fontSizeUnit"], "px")}`
        : toCssLength(firstDefined(payload.fontSizePx, payload.fontSize), "14px"),
    fontWeight: firstDefined(payload.fontWeight, 700) as number | string,
    fontStyle: toStringValue(payload.fontStyle, "normal"),
    textTransform: toStringValue(payload.textTransform, "none"),
    textDecoration: toBooleanValue(payload["underline"], false)
      ? "underline"
      : toStringValue(payload.textDecoration, "none"),
    letterSpacing:
      payload["letterSpacingValue"] != null
        ? `${toNumberValue(payload["letterSpacingValue"], 0.2)}${toStringValue(payload["letterSpacingUnit"], "px")}`
        : toCssLength(firstDefined(payload.letterSpacingPx, payload.letterSpacing), "0.2px"),
    lineHeight: firstDefined(payload.lineHeight, payload["lHeight"], 1) as number | string,
    disabledOpacity: toNumberValue(payload["disabledOpacity"], 0.6),
    disabledCursor: toStringValue(payload["disabledCursor"], "not-allowed"),
    transitionMs: clamp(toNumberValue(firstDefined(payload.transitionDurationMs, payload["transitionColorMs"]), 160), 60, 600),
    transformTransitionMs: clamp(toNumberValue(payload["transitionTransformMs"], 120), 60, 600),
    transitionEasing: normalizeTransitionEasing(firstDefined(payload.transitionEasing, payload["transitionColorEasing"])),
    transformTransitionEasing: normalizeTransitionEasing(payload["transitionTransformEasing"]),
    animation: normalizeAnimationPreset(payload.animation),
    textAnimation: normalizeTextAnimationPreset(firstDefined(payload.textAnimation, payload["textAnimation"])),
    depthAnimation: normalizeDepthAnimationPreset(firstDefined(payload.depthAnimation, payload["depthAnimation"])),
    motionDurationMs: clamp(toNumberValue(payload["animationDurationText"], 4200), 800, 12000),
    motionSpeed: clamp(toNumberValue(payload["animationSpeedText"], 100), 25, 200),
    motionIntensity: clamp(toNumberValue(payload["animationIntensityText"], 18), 0, 100),
    motionEasing: normalizeTransitionEasing(firstDefined(payload["animationEasing"], payload.transitionEasing)),
    textStaggerMs: clamp(toNumberValue(payload["textAnimationStaggerText"], 90), 0, 320),
    hoverEnabled: toBooleanValue(payload.hoverEnabled, true),
    activeEnabled: toBooleanValue(payload.activeEnabled, true),
    focusRingEnabled: toBooleanValue(payload.focusRingEnabled, true),
    focusRingColor: toStringValue(payload.focusRingColor, "#60a5fa"),
    focusRingWidth: clamp(toNumberValue(payload.focusRingWidth, 4), 1, 12),
    focusRingOffset: clamp(toNumberValue(payload.focusRingOffset, 2), 0, 12),
    hoverEffect,
    clickEffect,
    particleCount: clamp(toNumberValue(payload.clickParticleCount, 24), 8, 80),
    shellTransitionMs: clamp(Math.round(6400 / stiffness + damping * 4), 120, 320),
    shellTransitionEase:
      hoverEffect === "magnetic" || hoverEffect === "tilt"
        ? "cubic-bezier(0.22, 1, 0.36, 1)"
        : "ease",
    groupEnabled: toBooleanValue(payload.groupEnabled, false),
    groupAlign,
    groupJustify: normalizeJustify(groupAlign),
    groupGap: toCssLength(payload.groupGap, "12px"),
    backdropBlur:
      toBooleanValue(firstDefined(payload.glassEffect, payload["backdropBlurEnabled"]), false)
        ? `${toNumberValue(payload["backdropBlurText"], 10)}px`
        : "0px",
    topGradient: toStringValue(firstDefined(payload["topGradientCss"], payload["topGradient"]), "none"),
    parallaxEnabled: toBooleanValue(payload["parallaxHighlightEnabled"], false),
    parallaxOpacity: Math.max(0, Math.min(1, toNumberValue(payload["parallaxStrength"], 0))),
    iconEmbossFilter: toStringValue(payload["iconEmbossFilter"], "none"),
    previewSurface: toStringValue(firstDefined(payload["previewBgHex"], payload["previewBg"]), "#ffffff"),
    baseStyle,
    hoverStyle,
    activeStyle,
    disabledStyle,
    icons: {
      base: toStringValue(firstDefined(payload.baseIconSvg, payload.iconSvg), ""),
      hover: toStringValue(payload.hoverIconSvg, ""),
      active: toStringValue(payload.activeIconSvg, ""),
      loading: toStringValue(payload.loadingIconSvg, ""),
      position:
        toStringValue(payload.iconPosition, "left") === "right" ? "right" : "left",
      size: toCssLength(firstDefined(payload.iconSizePx, payload.iconSize, payload["iconSizeText"]), "18px"),
      color:
        toStringValue(payload["iconColorMode"], "text") === "text"
          ? "currentColor"
          : toStringValue(payload["iconColorInput"], "currentColor"),
    },
    loadingVisual: {
      showSpinner:
        payload["loadingSpinnerMode"] != null
          ? toStringValue(payload["loadingSpinnerMode"], "default") !== "none"
          : toBooleanValue(payload.loadingShowSpinner, true),
      spinnerPosition:
        toStringValue(firstDefined(payload.spinnerPosition, payload["loadingSpinnerPosition"]), "left") === "right"
          ? "right"
          : "left",
      spinnerSvg: toStringValue(firstDefined(payload.spinnerSvg, payload["loadingSpinnerSvg"]), DEFAULT_SPINNER_SVG),
    },
    accessibility: {
      ariaLabel: toStringValue(firstDefined(payload.ariaLabel, payload["ariaLabel"]), label),
      ariaPressed: toStringValue(firstDefined(payload.ariaPressed, payload["ariaPressedMode"]), "off"),
      ariaBusy: toStringValue(firstDefined(payload.ariaBusy, payload["ariaBusyMode"]), "auto"),
    },
    clickEffectProfile,
    burstColors,
  };
};

const buildSharedCss = (config: NormalizedConfig) => {
  const motionDurationEffectiveMs = Math.round(
    config.motionDurationMs / Math.max(0.25, config.motionSpeed / 100),
  );
  const breatheScale = (1 + config.motionIntensity * 0.0008).toFixed(4);
  const driftDistancePx = (1 + config.motionIntensity * 0.06).toFixed(2);
  const glowOpacity = (0.06 + config.motionIntensity * 0.0021).toFixed(3);
  const sheenOpacity = (0.12 + config.motionIntensity * 0.0018).toFixed(3);
  const auroraOpacity = (0.18 + config.motionIntensity * 0.002).toFixed(3);
  const glitchShiftPx = (0.8 + config.motionIntensity * 0.045).toFixed(2);
  const depthTiltDeg = (1.5 + config.motionIntensity * 0.04).toFixed(2);
  const depthLiftPx = (1 + config.motionIntensity * 0.08).toFixed(2);
  const textWaveLiftPx = (1 + config.motionIntensity * 0.05).toFixed(2);
  const textGlitchPx = (0.6 + config.motionIntensity * 0.035).toFixed(2);
  const tiltCycleDeg = Math.max(2.4, Number((Number(depthTiltDeg) * 1.15).toFixed(2)));

  return [
    config.fontImport ? `@import url(${JSON.stringify(config.fontImport)});` : "",
    "@keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}",
    "@keyframes ripple{0%{transform:translate(-50%,-50%) scale(0);opacity:.45;}100%{transform:translate(-50%,-50%) scale(18);opacity:0;}}",
    `@keyframes uif-breathe{0%,100%{transform:scale(1);}50%{transform:scale(${breatheScale});}}`,
    `@keyframes uif-soft-drift{0%,100%{transform:translateY(0);}50%{transform:translateY(-${driftDistancePx}px);}}`,
    `@keyframes uif-soft-glow{0%,100%{opacity:.06;}50%{opacity:${glowOpacity};}}`,
    `@keyframes uif-neon-pulse{0%,100%{opacity:${(Number(glowOpacity) * 0.55).toFixed(3)};transform:scale(.985);}50%{opacity:${(Number(glowOpacity) * 1.65).toFixed(3)};transform:scale(1.018);}}`,
    `@keyframes uif-sheen{0%,72%,100%{transform:translateX(-160%);opacity:0;}82%{opacity:${(Number(sheenOpacity) * 0.45).toFixed(3)};}90%{transform:translateX(0%);opacity:${sheenOpacity};}100%{transform:translateX(160%);opacity:0;}}`,
    `@keyframes uif-aurora{0%,100%{background-position:0% 50%;opacity:${(Number(auroraOpacity) * 0.7).toFixed(3)};}50%{background-position:100% 50%;opacity:${auroraOpacity};}}`,
    `@keyframes uif-cyber-glitch{0%,100%{transform:translate3d(0,0,0);filter:none;}12%{transform:translate3d(-${glitchShiftPx}px,0,0);filter:hue-rotate(12deg);}14%{transform:translate3d(${glitchShiftPx}px,0,0);filter:hue-rotate(-10deg);}16%{transform:translate3d(0,0,0);filter:none;}54%{transform:translate3d(${(Number(glitchShiftPx) * 0.65).toFixed(2)}px,0,0);filter:contrast(1.08) saturate(1.12);}56%{transform:translate3d(-${(Number(glitchShiftPx) * 0.65).toFixed(2)}px,0,0);filter:none;}58%{transform:translate3d(0,0,0);filter:none;}}`,
    `@keyframes uif-depth-rock{0%,100%{transform:perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0);}50%{transform:perspective(900px) rotateX(${depthTiltDeg}deg) rotateY(-${depthTiltDeg}deg) translateY(-${depthLiftPx}px);}}`,
    `@keyframes uif-depth-orbit{0%,100%{transform:perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0);}25%{transform:perspective(900px) rotateX(${(Number(depthTiltDeg) * 0.8).toFixed(2)}deg) rotateY(${depthTiltDeg}deg) translateZ(${(Number(depthLiftPx) * 0.65).toFixed(2)}px);}75%{transform:perspective(900px) rotateX(-${(Number(depthTiltDeg) * 0.8).toFixed(2)}deg) rotateY(-${depthTiltDeg}deg) translateZ(${(Number(depthLiftPx) * 0.65).toFixed(2)}px);}}`,
    `@keyframes uif-depth-gyro{0%,100%{transform:perspective(1000px) rotateX(-${(Number(depthTiltDeg) * 0.5).toFixed(2)}deg) rotateY(-${(Number(depthTiltDeg) * 0.72).toFixed(2)}deg) translateY(0);}25%{transform:perspective(1000px) rotateX(${(Number(depthTiltDeg) * 0.8).toFixed(2)}deg) rotateY(${(Number(depthTiltDeg) * 0.4).toFixed(2)}deg) translateY(-${(Number(depthLiftPx) * 0.6).toFixed(2)}px);}50%{transform:perspective(1000px) rotateX(${(Number(depthTiltDeg) * 0.24).toFixed(2)}deg) rotateY(${depthTiltDeg}deg) translateY(-${depthLiftPx}px);}75%{transform:perspective(1000px) rotateX(-${depthTiltDeg}deg) rotateY(${(Number(depthTiltDeg) * 0.2).toFixed(2)}deg) translateY(-${(Number(depthLiftPx) * 0.45).toFixed(2)}px);}}`,
    `@keyframes uif-depth-tilt-cycle{0%,100%{transform:perspective(900px) rotateX(0deg) rotateY(-${tiltCycleDeg.toFixed(2)}deg);}50%{transform:perspective(900px) rotateX(0deg) rotateY(${tiltCycleDeg.toFixed(2)}deg);}}`,
    `@keyframes uif-text-wave{0%,100%{transform:translateY(0);}50%{transform:translateY(-${textWaveLiftPx}px);}}`,
    `@keyframes uif-text-bounce{0%,100%{transform:translateY(0) scale(1);}30%{transform:translateY(-${textWaveLiftPx}px) scale(1.04);}65%{transform:translateY(0) scale(.985);}}`,
    `@keyframes uif-text-flicker{0%,100%{opacity:1;text-shadow:inherit;}35%{opacity:.88;text-shadow:0 0 ${textWaveLiftPx}px currentColor;}50%{opacity:.96;}65%{opacity:.82;text-shadow:0 0 ${textWaveLiftPx}px currentColor;}}`,
    `@keyframes uif-text-glitch{0%,100%{transform:translateX(0);text-shadow:none;}14%{transform:translateX(-${textGlitchPx}px);text-shadow:${textGlitchPx}px 0 0 rgba(34,211,238,.75),-${textGlitchPx}px 0 0 rgba(244,114,182,.55);}18%{transform:translateX(${textGlitchPx}px);text-shadow:-${textGlitchPx}px 0 0 rgba(34,211,238,.55),${textGlitchPx}px 0 0 rgba(244,114,182,.75);}22%{transform:translateX(0);text-shadow:none;}72%{transform:translateX(-${(Number(textGlitchPx) * 0.6).toFixed(2)}px);text-shadow:${(Number(textGlitchPx) * 0.6).toFixed(2)}px 0 0 rgba(34,211,238,.55);}75%{transform:translateX(0);text-shadow:none;}}`,
    "@keyframes uif-text-shimmer{0%,100%{background-position:200% 50%;}50%{background-position:0% 50%;}}",
    "@keyframes sparkle{0%{transform:translate3d(0,0,0) scale(.4);opacity:0;}20%{opacity:1;}100%{transform:translate3d(0,-12px,0) scale(1.15);opacity:0;}}",
    "@keyframes burst{0%{transform:translate(-50%,-50%) scale(.3) rotate(0deg);opacity:1;}100%{transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) scale(var(--scale)) rotate(var(--rot));opacity:0;}}",
    ".uif-root{display:flex;width:100%;justify-content:center;align-items:center;box-sizing:border-box;padding:24px;}",
    `.uif-group{display:flex;align-items:center;justify-content:${config.groupJustify};gap:${config.groupGap};flex-wrap:wrap;}`,
    ".uif-motion{display:inline-flex;}",
    `.uif-motion[data-animation='breathe']{animation:uif-breathe ${motionDurationEffectiveMs}ms ${config.motionEasing} infinite;}`,
    `.uif-motion[data-animation='soft-drift']{animation:uif-soft-drift ${motionDurationEffectiveMs}ms ${config.motionEasing} infinite;}`,
    ".uif-depth-shell{position:relative;display:inline-flex;transform-style:preserve-3d;}",
    `.uif-depth-shell[data-depth-animation='rock']{animation:uif-depth-rock ${motionDurationEffectiveMs}ms ${config.motionEasing} infinite;}`,
    `.uif-depth-shell[data-depth-animation='orbit']{animation:uif-depth-orbit ${Math.round(motionDurationEffectiveMs * 1.18)}ms ${config.motionEasing} infinite;}`,
    `.uif-depth-shell[data-depth-animation='gyro']{animation:uif-depth-gyro ${Math.round(motionDurationEffectiveMs * 1.06)}ms ${config.motionEasing} infinite;}`,
    `.uif-depth-shell[data-depth-animation='tilt-cycle']{animation:uif-depth-tilt-cycle ${Math.round(motionDurationEffectiveMs * 0.92)}ms ${config.motionEasing} infinite;}`,
    `.uif-shell{position:relative;display:inline-flex;transition:transform ${config.shellTransitionMs}ms ${config.shellTransitionEase};transform-style:preserve-3d;}`,
    ".uif-click-host{position:absolute;inset:-96px;pointer-events:none;overflow:visible;z-index:4;}",
    ".uif-btn{position:relative;display:flex;outline:none;overflow:hidden;user-select:none;box-sizing:border-box;-webkit-font-smoothing:antialiased;z-index:1;background-clip:padding-box;-webkit-background-clip:padding-box;touch-action:manipulation;}",
    `.uif-btn[data-animation='cyber-glitch']{animation:uif-cyber-glitch ${Math.max(900, Math.round(motionDurationEffectiveMs * 0.7))}ms steps(1) infinite;}`,
    ".uif-content{position:relative;z-index:1;display:flex;align-items:center;gap:inherit;}",
    ".uif-icon{display:flex;align-items:center;justify-content:center;flex-shrink:0;}",
    ".uif-icon span,.uif-icon svg{display:block;width:100%;height:100%;}",
    ".uif-label{white-space:nowrap;display:inline-flex;align-items:center;position:relative;}",
    ".uif-label-char{display:inline-block;min-width:0.12em;}",
    `.uif-label[data-text-animation='wave'] .uif-label-char{animation:uif-text-wave ${motionDurationEffectiveMs}ms ${config.motionEasing} infinite;}`,
    `.uif-label[data-text-animation='bounce'] .uif-label-char{animation:uif-text-bounce ${Math.max(1000, Math.round(motionDurationEffectiveMs * 0.78))}ms ${config.motionEasing} infinite;}`,
    `.uif-label[data-text-animation='flicker'] .uif-label-char{animation:uif-text-flicker ${Math.max(1100, Math.round(motionDurationEffectiveMs * 0.72))}ms ${config.motionEasing} infinite;}`,
    `.uif-label[data-text-animation='glitch'] .uif-label-char{animation:uif-text-glitch ${Math.max(950, Math.round(motionDurationEffectiveMs * 0.62))}ms steps(1) infinite;}`,
    `.uif-label[data-text-animation='shimmer']{background:linear-gradient(110deg,currentColor 8%,rgba(255,255,255,.92) 24%,currentColor 42%);background-size:220% 100%;background-position:200% 50%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:uif-text-shimmer ${Math.max(1500, Math.round(motionDurationEffectiveMs * 0.85))}ms linear infinite;}`,
    ".uif-ambient-layer{position:absolute;pointer-events:none;border-radius:inherit;z-index:0;opacity:0;}",
    ".uif-ambient-glow{inset:-16%;background:radial-gradient(circle at 50% 50%,rgba(255,255,255,.26),transparent 62%);filter:blur(18px);mix-blend-mode:screen;}",
    ".uif-ambient-sheen{inset:-28%;background:linear-gradient(115deg,transparent 36%,rgba(255,255,255,.18) 50%,transparent 64%);transform:translateX(-160%);mix-blend-mode:screen;}",
    ".uif-ambient-aurora{inset:-22%;background:linear-gradient(120deg,rgba(255,255,255,.04),rgba(96,165,250,.14),rgba(255,255,255,.03),rgba(255,255,255,.08));background-size:200% 200%;filter:blur(16px);mix-blend-mode:soft-light;}",
    `.uif-btn[data-animation='soft-glow'] .uif-ambient-glow{animation:uif-soft-glow ${motionDurationEffectiveMs}ms ${config.motionEasing} infinite;}`,
    `.uif-btn[data-animation='neon-pulse'] .uif-ambient-glow{animation:uif-neon-pulse ${Math.max(1400, Math.round(motionDurationEffectiveMs * 0.74))}ms ${config.motionEasing} infinite;}`,
    `.uif-btn[data-animation='sheen'] .uif-ambient-sheen{animation:uif-sheen ${Math.max(1800, Math.round(motionDurationEffectiveMs * 1.05))}ms ${config.motionEasing} infinite;}`,
    `.uif-btn[data-animation='aurora'] .uif-ambient-aurora{animation:uif-aurora ${Math.max(2200, Math.round(motionDurationEffectiveMs * 1.4))}ms ${config.motionEasing} infinite;}`,
    ".uif-top-gradient{position:absolute;inset:0;pointer-events:none;mix-blend-mode:overlay;}",
    ".uif-parallax-glow{position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at var(--x,50%) var(--y,50%),rgba(255,255,255,var(--parallax-opacity,0)),transparent 42%);opacity:0;transition:opacity 180ms ease;}",
    ".uif-btn[data-hovered='true'] .uif-parallax-glow{opacity:1;}",
    ".uif-spotlight{position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at var(--x,50%) var(--y,50%),rgba(255,255,255,.38),transparent 42%);opacity:0;transition:opacity 180ms ease;}",
    ".uif-btn[data-hovered='true'] .uif-spotlight{opacity:1;}",
    ".uif-sparkle-layer{position:absolute;inset:0;pointer-events:none;overflow:hidden;}",
    ".uif-sparkle-dot{position:absolute;border-radius:999px;background:rgba(255,255,255,.95);box-shadow:0 0 12px rgba(255,255,255,.9);animation:sparkle 900ms ease-out forwards;}",
    ".uif-ripple{position:absolute;width:18px;height:18px;border-radius:999px;background:currentColor;opacity:.3;pointer-events:none;transform:translate(-50%,-50%);animation:ripple .65s ease-out forwards;}",
    ".uif-burst-particle{position:absolute;left:var(--origin-x,50%);top:var(--origin-y,50%);width:6px;height:12px;border-radius:999px;pointer-events:none;animation:burst .72s ease-out forwards;}",
    ".uif-btn:disabled{cursor:not-allowed;}",
    "@media (prefers-reduced-motion: reduce){.uif-motion,.uif-depth-shell,.uif-shell,.uif-btn,.uif-label,.uif-label-char,.uif-ambient-glow,.uif-ambient-sheen,.uif-ambient-aurora,.uif-ripple,.uif-burst-particle,.uif-icon{animation:none!important;transition-duration:0.01ms!important;}}",
  ]
    .filter(Boolean)
    .join("");
};

const buildReactContent = (config: NormalizedConfig) => {
  const componentName = toPascalComponentName(config.componentName);
  const cssText = buildSharedCss(config);
  const configJson = serializeForScript(config);
  const dotsJson = serializeForScript(SPARKLE_DOTS);
  const cssJson = serializeForScript(cssText);

  return `"use client";

import React, { useRef, useState } from "react";

const CONFIG = ${configJson};
const SPARKLE_DOTS = ${dotsJson};
const CSS_TEXT = ${cssJson};

function resolveAriaPressed(value) {
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "mixed") return "mixed";
  return undefined;
}

function resolveAriaBusy(value, loading) {
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "auto") return loading ? true : undefined;
  return undefined;
}

function spawnBurst(node, event, profile, colors) {
  if (!node || profile.kind !== "burst") return;

  const rect = node.getBoundingClientRect();
  const originX = event.clientX - rect.left;
  const originY = event.clientY - rect.top;
  const total = profile.particleCount;

  for (let index = 0; index < total; index += 1) {
    const particle = document.createElement("span");
    const angle =
      (Math.PI * 2 * index) / total +
      (Math.random() - 0.5) * profile.angleJitter;
    const distance =
      profile.distanceMin +
      Math.random() * (profile.distanceMax - profile.distanceMin);
    const width =
      profile.widthMin + Math.random() * (profile.widthMax - profile.widthMin);
    const height =
      profile.heightMin + Math.random() * (profile.heightMax - profile.heightMin);

    particle.className = "uif-burst-particle";
    particle.style.setProperty("--origin-x", originX + "px");
    particle.style.setProperty("--origin-y", originY + "px");
    particle.style.setProperty("--dx", Math.cos(angle) * distance + "px");
    particle.style.setProperty("--dy", Math.sin(angle) * distance + "px");
    particle.style.setProperty(
      "--rot",
      (Math.random() - 0.5) * profile.rotationJitter + "deg",
    );
    particle.style.setProperty(
      "--scale",
      String(
        profile.scaleMin +
          Math.random() * (profile.scaleMax - profile.scaleMin),
      ),
    );
    particle.style.background = colors[index % colors.length];
    particle.style.width = width + "px";
    particle.style.height = height + "px";
    particle.style.borderRadius = profile.borderRadius;
    node.appendChild(particle);
    window.setTimeout(() => particle.remove(), profile.durationMs);
  }
}

export default function ${componentName}({
  onClick = () => {},
  disabled = CONFIG.disabled,
  loading = CONFIG.loading,
  className = "",
}) {
  const depthShellRefs = useRef([]);
  const interactionRefs = useRef([]);
  const effectHostRefs = useRef([]);
  const buttonRefs = useRef([]);
  const lastPressEffectAtRef = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const buttonIndexes = CONFIG.groupEnabled ? [0, 1, 2] : [0];
  const isDisabled = Boolean(disabled || loading);
  const resolvedAnimation = isDisabled ? "none" : CONFIG.animation;
  const resolvedTextAnimation = isDisabled ? "none" : CONFIG.textAnimation;
  const resolvedDepthAnimation = isDisabled ? "none" : CONFIG.depthAnimation;

  const supportsHoverPointer = (event) => event.pointerType !== "touch";

  const isPrimaryPressPointer = (event) =>
    event.button === 0 || event.pointerType === "touch" || event.pointerType === "pen";

  const resetShell = (index) => {
    const shell = interactionRefs.current[index];
    if (shell) {
      shell.style.transform = "";
    }
  };

  const updatePointer = (event, index) => {
    const button = buttonRefs.current[index];
    const shell = interactionRefs.current[index];
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    button.style.setProperty("--x", x + "px");
    button.style.setProperty("--y", y + "px");
    button.style.setProperty(
      "--parallax-opacity",
      CONFIG.parallaxEnabled ? String(CONFIG.parallaxOpacity) : "0",
    );

    if (!shell || isDisabled) return;

    const xRatio = x / rect.width - 0.5;
    const yRatio = y / rect.height - 0.5;

    if (CONFIG.hoverEffect === "magnetic") {
      shell.style.transform =
        "translate(" +
        (xRatio * 18).toFixed(2) +
        "px, " +
        (yRatio * 18).toFixed(2) +
        "px)";
      return;
    }

    if (CONFIG.hoverEffect === "tilt") {
      shell.style.transform =
        "perspective(900px) rotateX(" +
        (-yRatio * 14).toFixed(2) +
        "deg) rotateY(" +
        (xRatio * 14).toFixed(2) +
        "deg)";
    }
  };

  const triggerVisualClickEffect = (event, index) => {
    if (isDisabled || CONFIG.clickEffectProfile.kind === "none") return;

    const button = buttonRefs.current[index];
    const effectHost = effectHostRefs.current[index];
    if (!button) return;

    if (CONFIG.clickEffectProfile.kind === "ripple") {
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "uif-ripple";
      ripple.style.left = event.clientX - rect.left + "px";
      ripple.style.top = event.clientY - rect.top + "px";
      button.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 700);
      return;
    }

    spawnBurst(effectHost, event, CONFIG.clickEffectProfile, CONFIG.burstColors);
  };

  const triggerClickEffect = (event, index) => {
    if (isDisabled) return;

    const lastPressEffectAt = lastPressEffectAtRef.current[index] || 0;
    if (Date.now() - lastPressEffectAt > 450) {
      triggerVisualClickEffect(event, index);
    }
    lastPressEffectAtRef.current[index] = 0;
  };

  const getStyleSnapshot = (hovered, active) => {
    if (isDisabled) return CONFIG.disabledStyle;
    if (active && CONFIG.activeEnabled) return CONFIG.activeStyle;
    if (hovered && CONFIG.hoverEnabled) return CONFIG.hoverStyle;
    return CONFIG.baseStyle;
  };

  const getFocusShadow = (snapshot) => {
    if (!CONFIG.focusRingEnabled) {
      return snapshot.boxShadow || "none";
    }

    const baseShadow = snapshot.boxShadow ? snapshot.boxShadow + ", " : "";
    return (
      baseShadow +
      "0 0 0 " +
      CONFIG.focusRingOffset +
      "px " +
      CONFIG.previewSurface +
      ", 0 0 0 " +
      (CONFIG.focusRingOffset + CONFIG.focusRingWidth) +
      "px " +
      CONFIG.focusRingColor
    );
  };

  const getDynamicStyle = (index) => {
    const hovered = hoveredIndex === index;
    const active = activeIndex === index;
    const focused = focusedIndex === index;
    const snapshot = getStyleSnapshot(hovered, active);

    return {
      background: snapshot.background,
      color: snapshot.color,
      borderColor: snapshot.borderColor,
      borderWidth: snapshot.borderWidth,
      boxShadow: focused ? getFocusShadow(snapshot) : snapshot.boxShadow || "none",
      textShadow: snapshot.textShadow,
      transform: isDisabled ? "none" : snapshot.transform || "none",
      filter: snapshot.filter || "none",
    };
  };

  const getIconMarkup = (index) => {
    const hovered = hoveredIndex === index;
    const active = activeIndex === index;

    if (loading) {
      if (CONFIG.icons.loading) {
        return { markup: CONFIG.icons.loading, animated: false };
      }

      if (CONFIG.loadingVisual.showSpinner) {
        return { markup: CONFIG.loadingVisual.spinnerSvg, animated: true };
      }

      return { markup: "", animated: false };
    }

    if (active && CONFIG.activeEnabled && CONFIG.icons.active) {
      return { markup: CONFIG.icons.active, animated: false };
    }

    if (hovered && CONFIG.hoverEnabled && CONFIG.icons.hover) {
      return { markup: CONFIG.icons.hover, animated: false };
    }

    return { markup: CONFIG.icons.base, animated: false };
  };

  const renderIcon = (index) => {
    const icon = getIconMarkup(index);
    if (!icon.markup) return null;

    return (
      <span
        className="uif-icon"
        style={{
          width: CONFIG.icons.size,
          height: CONFIG.icons.size,
          fontSize: CONFIG.icons.size,
          color: CONFIG.icons.color,
          filter: CONFIG.iconEmbossFilter,
          animation: icon.animated ? "spin 1s linear infinite" : "none",
        }}
      >
        <span dangerouslySetInnerHTML={{ __html: icon.markup }} />
      </span>
    );
  };

  const renderSparkles = () => {
    if (CONFIG.hoverEffect !== "sparkles") return null;

    return (
      <div className="uif-sparkle-layer" aria-hidden="true">
        {SPARKLE_DOTS.map((dot, index) => (
          <span
            key={index}
            className="uif-sparkle-dot"
            style={{
              top: dot.top,
              left: dot.left,
              width: dot.size + "px",
              height: dot.size + "px",
              animationDelay: dot.delay,
            }}
          />
        ))}
      </div>
    );
  };

  const renderLabelContent = (text) => {
    if (resolvedTextAnimation === "none" || resolvedTextAnimation === "shimmer") return text;

    return Array.from(text).map((char, index) => (
      <span
        key={\`\${char}-\${index}\`}
        className="uif-label-char"
        style={{ animationDelay: \`\${index * CONFIG.textStaggerMs}ms\` }}
      >
        {char === " " ? "\\u00A0" : char}
      </span>
    ));
  };

  const buttonClassName = ["uif-btn", className].filter(Boolean).join(" ");

  return (
    <>
      <style>{CSS_TEXT}</style>
      <div className="uif-root">
        <div className="uif-group">
          {buttonIndexes.map((index) => {
            const hovered = hoveredIndex === index;
            const dynamicStyle = getDynamicStyle(index);
            const iconNode = renderIcon(index);
            const iconFirst = loading
              ? CONFIG.loadingVisual.spinnerPosition !== "right"
              : CONFIG.icons.position !== "right";
            const borderRadius =
              CONFIG.hoverEffect === "morph" && hovered && !isDisabled
                ? "999px"
                : CONFIG.borderRadius;
            const dynamicTransform =
              CONFIG.hoverEffect === "morph" && hovered && !isDisabled
                ? ((dynamicStyle.transform === "none" ? "" : dynamicStyle.transform + " ") + "scale(1.03)").trim()
                : dynamicStyle.transform;

            return (
              <div key={index} className="uif-motion" data-animation={resolvedAnimation}>
                <div
                  className="uif-depth-shell"
                  data-depth-animation={resolvedDepthAnimation}
                  ref={(node) => {
                    depthShellRefs.current[index] = node;
                  }}
                >
                  <div
                    className="uif-shell"
                    ref={(node) => {
                      interactionRefs.current[index] = node;
                    }}
                  >
                    <div
                      className="uif-click-host"
                      aria-hidden="true"
                      ref={(node) => {
                        effectHostRefs.current[index] = node;
                      }}
                    />
                    <button
                      ref={(node) => {
                        buttonRefs.current[index] = node;
                      }}
                      type="button"
                      className={buttonClassName}
                      data-animation={resolvedAnimation}
                      data-hovered={hovered ? "true" : "false"}
                      style={{
                        width: CONFIG.width,
                        height: CONFIG.height,
                        padding: CONFIG.paddingY + " " + CONFIG.paddingX,
                        gap: CONFIG.gap,
                        borderStyle: "solid",
                        borderRadius,
                        fontFamily: CONFIG.fontFamily,
                        fontSize: CONFIG.fontSize,
                        fontWeight: CONFIG.fontWeight,
                        fontStyle: CONFIG.fontStyle,
                        textTransform: CONFIG.textTransform,
                        textDecoration: CONFIG.textDecoration,
                        letterSpacing: CONFIG.letterSpacing,
                        lineHeight: CONFIG.lineHeight,
                        alignItems: CONFIG.alignItems,
                        justifyContent: CONFIG.justifyContent,
                        cursor: loading ? "wait" : isDisabled ? CONFIG.disabledCursor : "pointer",
                        opacity: isDisabled ? CONFIG.disabledOpacity : 1,
                        transition:
                          "background " +
                          CONFIG.transitionMs +
                          "ms " +
                          CONFIG.transitionEasing +
                          ", color " +
                          CONFIG.transitionMs +
                          "ms " +
                          CONFIG.transitionEasing +
                          ", border-color " +
                          CONFIG.transitionMs +
                          "ms " +
                          CONFIG.transitionEasing +
                          ", box-shadow " +
                          CONFIG.transitionMs +
                          "ms " +
                          CONFIG.transitionEasing +
                          ", filter " +
                          CONFIG.transitionMs +
                          "ms " +
                          CONFIG.transitionEasing +
                          ", transform " +
                          CONFIG.transformTransitionMs +
                          "ms " +
                          CONFIG.transformTransitionEasing +
                          ", border-radius " +
                          CONFIG.transformTransitionMs +
                          "ms " +
                          CONFIG.transformTransitionEasing,
                        backdropFilter: "blur(" + CONFIG.backdropBlur + ")",
                        WebkitBackdropFilter: "blur(" + CONFIG.backdropBlur + ")",
                        ...dynamicStyle,
                        transform: dynamicTransform,
                      }}
                      disabled={isDisabled}
                      onPointerEnter={(event) => {
                        if (supportsHoverPointer(event) && !isDisabled && CONFIG.hoverEnabled) {
                          setHoveredIndex(index);
                        }
                      }}
                      onPointerLeave={(event) => {
                        if (supportsHoverPointer(event)) {
                          setHoveredIndex(-1);
                        }
                        setActiveIndex(-1);
                        lastPressEffectAtRef.current[index] = 0;
                        resetShell(index);
                      }}
                      onPointerMove={(event) => {
                        if (!supportsHoverPointer(event)) return;
                        updatePointer(event, index);
                      }}
                      onPointerDown={(event) => {
                        if (!isPrimaryPressPointer(event)) return;
                        event.currentTarget.setPointerCapture?.(event.pointerId);
                        if (!isDisabled && CONFIG.activeEnabled) {
                          setActiveIndex(index);
                        }
                        if (!isDisabled) {
                          const pressAt = Date.now();
                          lastPressEffectAtRef.current[index] = pressAt;
                          triggerVisualClickEffect(event, index);
                          window.setTimeout(() => {
                            if (lastPressEffectAtRef.current[index] === pressAt) {
                              lastPressEffectAtRef.current[index] = 0;
                            }
                          }, 500);
                        }
                      }}
                      onPointerUp={(event) => {
                        if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
                          event.currentTarget.releasePointerCapture?.(event.pointerId);
                        }
                        if (supportsHoverPointer(event) && !isDisabled && CONFIG.hoverEnabled) {
                          setHoveredIndex(index);
                        }
                        setActiveIndex(-1);
                      }}
                      onPointerCancel={(event) => {
                        if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
                          event.currentTarget.releasePointerCapture?.(event.pointerId);
                        }
                        setHoveredIndex(-1);
                        setActiveIndex(-1);
                        lastPressEffectAtRef.current[index] = 0;
                        resetShell(index);
                      }}
                      onFocus={() => setFocusedIndex(index)}
                      onBlur={() => {
                        setFocusedIndex(-1);
                        setActiveIndex(-1);
                      }}
                      onClick={(event) => {
                        if (isDisabled) return;
                        onClick(event, index);
                        triggerClickEffect(event, index);
                      }}
                      aria-label={CONFIG.accessibility.ariaLabel}
                      aria-pressed={resolveAriaPressed(CONFIG.accessibility.ariaPressed)}
                      aria-busy={resolveAriaBusy(CONFIG.accessibility.ariaBusy, loading)}
                    >
                      <div className="uif-ambient-layer uif-ambient-glow" aria-hidden="true" />
                      <div className="uif-ambient-layer uif-ambient-sheen" aria-hidden="true" />
                      <div className="uif-ambient-layer uif-ambient-aurora" aria-hidden="true" />
                      {CONFIG.topGradient !== "none" ? (
                        <div
                          className="uif-top-gradient"
                          aria-hidden="true"
                          style={{ background: CONFIG.topGradient }}
                        />
                      ) : null}
                      {CONFIG.parallaxEnabled ? (
                        <div className="uif-parallax-glow" aria-hidden="true" />
                      ) : null}
                      {CONFIG.hoverEffect === "spotlight" ? (
                        <div className="uif-spotlight" aria-hidden="true" />
                      ) : null}
                      {hovered ? renderSparkles() : null}
                      <span
                        className="uif-content"
                        style={{ flexDirection: iconFirst ? "row" : "row-reverse" }}
                      >
                        {iconNode}
                        <span
                          className="uif-label"
                          data-text-animation={resolvedTextAnimation}
                        >
                          {renderLabelContent(loading ? CONFIG.loadingLabel : CONFIG.label)}
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
`;
};

export function buildExportPayload(payload: ExportPayloadInput) {
  const config = normalizeConfig(payload);
  const base = sanitizeFilenameBase(config.componentName);

  return {
    content: buildReactContent(config),
    filename: `${base}.jsx`,
  };
}

export function downloadExportPayload(payload: ExportPayloadInput) {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const { content, filename } = buildExportPayload(payload);
  const blob = new Blob([content], {
    type: "text/plain;charset=utf-8",
  });
  const href = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(href), 1000);
}
