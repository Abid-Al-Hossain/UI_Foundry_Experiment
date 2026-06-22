import React, { useEffect, useRef, useState } from "react";
import {
  getClickEffectProfile,
  getSafeBurstColors,
} from "../_utils/interactionEffects";

type LivePreviewProps = {
  label?: string;
  loadingLabel?: string;
  loading?: boolean;
  disabled?: boolean;
  animation?: string;
  textAnimation?: string;
  depthAnimation?: string;
  animationDurationText?: string | number;
  animationSpeedText?: string | number;
  animationIntensityText?: string | number;
  animationEasing?: string;
  textAnimationStaggerText?: string | number;
  width?: string | number;
  height?: string | number;
  padX?: string | number;
  padY?: string | number;
  gap?: string | number;
  gapPx?: string | number;
  cssBg?: string;
  cssText?: string;
  cssBorder?: string;
  cssHoverBg?: string;
  cssHoverText?: string;
  cssHoverBorder?: string;
  cssHoverFilter?: string;
  cssActiveBg?: string;
  cssActiveText?: string;
  cssActiveBorder?: string;
  cssActiveFilter?: string;
  cssDisabledBg?: string;
  cssDisabledText?: string;
  cssDisabledBorder?: string;
  disabledOpacity?: string | number;
  disabledCursor?: string;
  disabledBorderWidth?: string | number;
  disabledTextShadow?: string;
  borderWidth?: string | number;
  borderHoverWidth?: string | number;
  borderActiveWidth?: string | number;
  borderStyle?: string;
  radiusTL?: string | number;
  radiusTR?: string | number;
  radiusBR?: string | number;
  radiusBL?: string | number;
  boxShadow?: string;
  boxShadowHover?: string;
  boxShadowActive?: string;
  topGradient?: string;
  parallaxHighlightEnabled?: boolean;
  parallaxStrength?: string | number;
  iconEmbossFilter?: string;
  hoverTiltX?: string | number;
  hoverTiltY?: string | number;
  hoverPerspective?: string | number;
  fontFamily?: string;
  fontSizeValue?: string | number;
  fontSizeUnit?: string;
  fontWeight?: string | number;
  letterSpacingValue?: string | number;
  letterSpacingUnit?: string;
  lineHeight?: string | number;
  fontStyle?: string;
  textTransform?: string;
  underline?: boolean;
  align?: string;
  textShadowEnabled?: boolean;
  tsX?: string | number;
  tsY?: string | number;
  tsBlur?: string | number;
  tsColor?: string;
  iconPosition?: string;
  iconSize?: string | number;
  iconGap?: string | number;
  iconColor?: string;
  baseIconSvg?: string;
  hoverIconSvg?: string;
  activeIconSvg?: string;
  loadingIconSvg?: string;
  loadingSpinnerMode?: string;
  loadingSpinnerPosition?: string;
  loadingSpinnerSvg?: string;
  activeEnabled?: boolean;
  activeTy?: string | number;
  activeScale?: string | number;
  focusRingEnabled?: boolean;
  focusRingWidth?: string | number;
  focusRingOffset?: string | number;
  focusRingColor?: string;
  previewBg?: string;
  ariaLabel?: string;
  ariaPressedMode?: string;
  ariaBusyMode?: string;
  groupEnabled?: boolean;
  groupAlign?: string;
  groupGap?: string | number;
  hoverEnabled?: boolean;
  forceHover?: boolean;
  forceActive?: boolean;
  forceFocus?: boolean;
  transitionColorMs?: string | number;
  transitionColorEasing?: string;
  transitionTransformMs?: string | number;
  transitionTransformEasing?: string;
  backdropBlurEnabled?: boolean;
  backdropBlurText?: string | number;
  hoverEffect?: string;
  clickEffect?: string;
  clickParticleCount?: string | number;
  hoverSpringStiffness?: string | number;
  hoverSpringDamping?: string | number;
  previewResetKey?: string | number;
  [key: string]: unknown;
};

type PreviewPointerEvent = React.PointerEvent<HTMLButtonElement>;
type PreviewClickEvent =
  | React.MouseEvent<HTMLButtonElement>
  | React.PointerEvent<HTMLButtonElement>;

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

const toCssLength = (value: unknown, fallback: string, unit = "px") => {
  if (typeof value === "number" && Number.isFinite(value)) return `${value}${unit}`;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return fallback;
    if (/^-?\d+(\.\d+)?$/.test(trimmed)) return `${trimmed}${unit}`;
    return trimmed;
  }
  return fallback;
};

const resolveAriaPressed = (value: string) => {
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "mixed") return "mixed";
  return undefined;
};

const resolveAriaBusy = (value: string, loading: boolean) => {
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "auto") return loading ? true : undefined;
  return undefined;
};

const resolveAlignItems = (align: string) => {
  if (align.startsWith("top")) return "flex-start";
  if (align.startsWith("bottom")) return "flex-end";
  return "center";
};

const resolveJustify = (align: string) => {
  if (align.includes("left")) return "flex-start";
  if (align.includes("right")) return "flex-end";
  return "center";
};

const resolveGroupJustify = (align: string) => {
  if (align === "left" || align === "start") return "flex-start";
  if (align === "right" || align === "end") return "flex-end";
  return "center";
};

const normalizeAnimationPreset = (value: string) => {
  if (value === "subtle-pop") return "none";
  if (value === "pulse") return "breathe";
  if (value === "float") return "soft-drift";
  if (
    value === "breathe" ||
    value === "soft-drift" ||
    value === "soft-glow" ||
    value === "sheen" ||
    value === "aurora" ||
    value === "neon-pulse" ||
    value === "cyber-glitch"
  ) {
    return value;
  }
  return "none";
};

const normalizeTextAnimationPreset = (value: string) => {
  if (
    value === "wave" ||
    value === "bounce" ||
    value === "flicker" ||
    value === "shimmer" ||
    value === "glitch"
  ) {
    return value;
  }
  return "none";
};

const normalizeDepthAnimationPreset = (value: string) => {
  if (
    value === "rock" ||
    value === "orbit" ||
    value === "gyro" ||
    value === "tilt-cycle"
  ) {
    return value;
  }
  return "none";
};

const spawnBurst = (
  node: HTMLDivElement | null,
  event: React.MouseEvent<HTMLButtonElement>,
  profile: ReturnType<typeof getClickEffectProfile>,
  colors: string[],
) => {
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
    setTimeout(() => particle.remove(), profile.durationMs);
  }
};

export default function LivePreview(props: LivePreviewProps) {
  const interactionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const effectHostRefs = useRef<Array<HTMLDivElement | null>>([]);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const lastPressEffectAtRef = useRef<number[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    setHoveredIndex(-1);
    setActiveIndex(-1);
    setFocusedIndex(-1);

    interactionRefs.current.forEach((shell) => {
      if (shell) shell.style.transform = "";
    });

    effectHostRefs.current.forEach((host) => {
      if (host) host.innerHTML = "";
    });
    lastPressEffectAtRef.current = [];

    buttonRefs.current.forEach((button) => {
      if (!button) return;
      button.style.removeProperty("--x");
      button.style.removeProperty("--y");
      button.style.setProperty("--parallax-opacity", "0");
      button.blur();
    });
  }, [props.previewResetKey]);

  const align = toStringValue(props.align, "middle-center");
  const width = toCssLength(props.width, "220px");
  const height = toCssLength(props.height, "44px");
  const padX = toCssLength(props.padX, "14px");
  const padY = toCssLength(props.padY, "0px");
  const gap = toCssLength(props.iconGap ?? props.gapPx ?? props.gap, "10px");
  const iconSize = toCssLength(props.iconSize, "18px");
  const label = toStringValue(props.label, "Confirm");
  const loadingLabel = toStringValue(props.loadingLabel, "Loading...");
  const loading = toBooleanValue(props.loading, false);
  const disabled = toBooleanValue(props.disabled, false);
  const previewIsDisabled = disabled || loading;
  const hoverEnabled = toBooleanValue(props.hoverEnabled, true);
  const activeEnabled = toBooleanValue(props.activeEnabled, true);
  const forceHover = toBooleanValue(props.forceHover, false);
  const forceActive = toBooleanValue(props.forceActive, false);
  const forceFocus = toBooleanValue(props.forceFocus, false);
  const hoverEffect = toStringValue(props.hoverEffect, "none");
  const clickEffect = toStringValue(props.clickEffect, "none");
  const particleCount = Math.max(8, Math.min(80, toNumberValue(props.clickParticleCount, 24)));
  const parallaxEnabled = toBooleanValue(props.parallaxHighlightEnabled, false);
  const parallaxStrength = Math.max(0, Math.min(1, toNumberValue(props.parallaxStrength, 0)));
  const iconEmbossFilter = toStringValue(props.iconEmbossFilter, "none");
  const loadingSpinnerMode = toStringValue(props.loadingSpinnerMode, "default");
  const loadingSpinnerSvg = toStringValue(props.loadingSpinnerSvg, DEFAULT_SPINNER_SVG);
  const spinnerPosition =
    toStringValue(props.loadingSpinnerPosition, "left") === "right" ? "right" : "left";
  const iconPosition =
    toStringValue(props.iconPosition, "left") === "right" ? "right" : "left";
  const baseIconSvg = toStringValue(props.baseIconSvg, "");
  const hoverIconSvg = toStringValue(props.hoverIconSvg, "");
  const activeIconSvg = toStringValue(props.activeIconSvg, "");
  const loadingIconSvg = toStringValue(props.loadingIconSvg, "");
  const activeTy = toNumberValue(props.activeTy, 1);
  const activeScale = toNumberValue(props.activeScale, 0.99);
  const hoverTiltX = toNumberValue(props.hoverTiltX, 0);
  const hoverTiltY = toNumberValue(props.hoverTiltY, 0);
  const hoverPerspective = toNumberValue(props.hoverPerspective, 800);
  const disabledOpacity = toNumberValue(props.disabledOpacity, 0.6);
  const disabledCursor = toStringValue(props.disabledCursor, "not-allowed");
  const transitionColorMs = toNumberValue(props.transitionColorMs, 160);
  const transitionColorEasing = toStringValue(props.transitionColorEasing, "ease");
  const transitionTransformMs = toNumberValue(props.transitionTransformMs, 120);
  const transitionTransformEasing = toStringValue(props.transitionTransformEasing, "ease");
  const backdropBlur =
    toBooleanValue(props.backdropBlurEnabled, false) && props.backdropBlurText != null
      ? `${toNumberValue(props.backdropBlurText, 0)}px`
      : "0px";
  const animation = normalizeAnimationPreset(toStringValue(props.animation, "none"));
  const textAnimation = normalizeTextAnimationPreset(
    toStringValue(props.textAnimation, "none"),
  );
  const depthAnimation = normalizeDepthAnimationPreset(
    toStringValue(props.depthAnimation, "none"),
  );
  const motionDurationMs = Math.max(800, Math.min(12000, toNumberValue(props.animationDurationText, 4200)));
  const motionSpeed = Math.max(25, Math.min(200, toNumberValue(props.animationSpeedText, 100)));
  const motionDurationEffectiveMs = Math.round(
    motionDurationMs / Math.max(0.25, motionSpeed / 100),
  );
  const motionIntensity = Math.max(0, Math.min(100, toNumberValue(props.animationIntensityText, 18)));
  const motionEasing = toStringValue(props.animationEasing, "ease-in-out");
  const textStaggerMs = Math.max(
    0,
    Math.min(320, toNumberValue(props.textAnimationStaggerText, 90)),
  );
  const breatheScale = (1 + motionIntensity * 0.0008).toFixed(4);
  const driftDistancePx = (1 + motionIntensity * 0.06).toFixed(2);
  const glowOpacity = (0.06 + motionIntensity * 0.0021).toFixed(3);
  const sheenOpacity = (0.12 + motionIntensity * 0.0018).toFixed(3);
  const auroraOpacity = (0.18 + motionIntensity * 0.002).toFixed(3);
  const glitchShiftPx = (0.8 + motionIntensity * 0.045).toFixed(2);
  const depthTiltDeg = (1.5 + motionIntensity * 0.04).toFixed(2);
  const depthLiftPx = (1 + motionIntensity * 0.08).toFixed(2);
  const textWaveLiftPx = (1 + motionIntensity * 0.05).toFixed(2);
  const textGlitchPx = (0.6 + motionIntensity * 0.035).toFixed(2);
  const tiltCycleDeg = Math.max(2.4, Number((Number(depthTiltDeg) * 1.15).toFixed(2)));
  const shellTransitionMs = Math.max(
    120,
    Math.min(
      320,
      Math.round(
        6400 / Math.max(80, toNumberValue(props.hoverSpringStiffness, 240)) +
          Math.max(6, toNumberValue(props.hoverSpringDamping, 18)) * 4,
      ),
    ),
  );
  const shellTransitionEase =
    hoverEffect === "magnetic" || hoverEffect === "tilt"
      ? "cubic-bezier(0.22, 1, 0.36, 1)"
      : "ease";
  const groupEnabled = toBooleanValue(props.groupEnabled, false);
  const groupIndexes = groupEnabled ? [0, 1, 2] : [0];
  const groupGap = toCssLength(props.groupGap, "12px");
  const groupJustify = resolveGroupJustify(toStringValue(props.groupAlign, "center"));
  const resolvedAnimation = previewIsDisabled ? "none" : animation;
  const resolvedTextAnimation = previewIsDisabled ? "none" : textAnimation;
  const resolvedDepthAnimation = previewIsDisabled ? "none" : depthAnimation;

  const textShadow = toBooleanValue(props.textShadowEnabled, false)
    ? `${toNumberValue(props.tsX, 0)}px ${toNumberValue(props.tsY, 0)}px ${toNumberValue(
        props.tsBlur,
        0,
      )}px ${toStringValue(props.tsColor, "rgba(0,0,0,0.24)")}`
    : "none";
  const hoverTransform =
    hoverEffect === "tilt" || (!hoverTiltX && !hoverTiltY)
      ? "none"
      : `perspective(${hoverPerspective}px) rotateX(${hoverTiltY}deg) rotateY(${hoverTiltX}deg)`;
  const topGradient = toStringValue(props.topGradient, "none");
  const baseRadius = `${toCssLength(props.radiusTL, "14px")} ${toCssLength(
    props.radiusTR,
    "14px",
  )} ${toCssLength(props.radiusBR, "14px")} ${toCssLength(props.radiusBL, "14px")}`;
  const morphRadius = "999px";

  const baseStyle = {
    background: toStringValue(props.cssBg, "#111827"),
    color: toStringValue(props.cssText, "#ffffff"),
    borderColor: toStringValue(props.cssBorder, "rgba(0,0,0,0.06)"),
    borderWidth: toCssLength(props.borderWidth, "1px"),
    boxShadow: toStringValue(props.boxShadow, "0px 10px 24px rgba(0,0,0,0.16)"),
    textShadow,
    transform: "none",
    filter: "none",
  };

  const hoverStyle = {
    background: toStringValue(props.cssHoverBg, baseStyle.background),
    color: toStringValue(props.cssHoverText, baseStyle.color),
    borderColor: toStringValue(props.cssHoverBorder, baseStyle.borderColor),
    borderWidth: toCssLength(props.borderHoverWidth, baseStyle.borderWidth),
    boxShadow: toStringValue(props.boxShadowHover, baseStyle.boxShadow),
    textShadow,
    transform: hoverTransform,
    filter: toStringValue(props.cssHoverFilter, "none"),
  };

  const activeStyle = {
    background: toStringValue(props.cssActiveBg, baseStyle.background),
    color: toStringValue(props.cssActiveText, baseStyle.color),
    borderColor: toStringValue(props.cssActiveBorder, baseStyle.borderColor),
    borderWidth: toCssLength(props.borderActiveWidth, baseStyle.borderWidth),
    boxShadow: toStringValue(props.boxShadowActive, baseStyle.boxShadow),
    textShadow,
    transform: `translateY(${activeTy}px) scale(${activeScale})`,
    filter: toStringValue(props.cssActiveFilter, "none"),
  };

  const disabledStyle = {
    background: toStringValue(props.cssDisabledBg, baseStyle.background),
    color: toStringValue(props.cssDisabledText, baseStyle.color),
    borderColor: toStringValue(props.cssDisabledBorder, baseStyle.borderColor),
    borderWidth: toCssLength(props.disabledBorderWidth, baseStyle.borderWidth),
    boxShadow: baseStyle.boxShadow,
    textShadow: toStringValue(props.disabledTextShadow, "none"),
    transform: "none",
    filter: "none",
  };

  const focusShadow = (baseShadow: string) =>
    !toBooleanValue(props.focusRingEnabled, true)
      ? baseShadow || "none"
      : [
          baseShadow ? `${baseShadow}, ` : "",
          `0 0 0 ${toNumberValue(props.focusRingOffset, 2)}px ${toStringValue(props.previewBg, "#ffffff")}`,
          `0 0 0 ${
            toNumberValue(props.focusRingOffset, 2) + toNumberValue(props.focusRingWidth, 4)
          }px ${toStringValue(props.focusRingColor, "#60a5fa")}`,
        ].join("");

  const clickEffectProfile = getClickEffectProfile(clickEffect, particleCount);
  const burstColors = getSafeBurstColors(clickEffect, [
    baseStyle.background,
    baseStyle.color,
    hoverStyle.background,
    hoverStyle.color,
    activeStyle.background,
    activeStyle.color,
    toStringValue(props.focusRingColor, "#60a5fa"),
  ]);

  const isHoveredFor = (index: number) => forceHover || hoveredIndex === index;
  const isActiveFor = (index: number) => forceActive || activeIndex === index;
  const isFocusedFor = (index: number) => forceFocus || focusedIndex === index;

  const getSnapshot = (index: number) => {
    if (previewIsDisabled) return disabledStyle;
    if (isActiveFor(index) && activeEnabled) return activeStyle;
    if (isHoveredFor(index) && hoverEnabled) return hoverStyle;
    return baseStyle;
  };

  const getCurrentIconSvg = (index: number) => {
    if (loading) {
      if (loadingIconSvg) return { markup: loadingIconSvg, animated: false };
      if (loadingSpinnerMode !== "none") {
        return { markup: loadingSpinnerSvg || DEFAULT_SPINNER_SVG, animated: true };
      }
      return { markup: "", animated: false };
    }

    if (isActiveFor(index) && activeEnabled && activeIconSvg) {
      return { markup: activeIconSvg, animated: false };
    }

    if (isHoveredFor(index) && hoverEnabled && hoverIconSvg) {
      return { markup: hoverIconSvg, animated: false };
    }

    return { markup: baseIconSvg, animated: false };
  };

  const renderLabelContent = (text: string) => {
    if (resolvedTextAnimation === "none" || resolvedTextAnimation === "shimmer") {
      return text;
    }

    return Array.from(text).map((char, index) => (
      <span
        key={`${char}-${index}`}
        className="uif-label-char"
        style={{ animationDelay: `${index * textStaggerMs}ms` }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  const resetShell = (index: number) => {
    const shell = interactionRefs.current[index];
    if (shell) shell.style.transform = "";
  };

  const supportsHoverPointer = (event: PreviewPointerEvent) =>
    event.pointerType !== "touch";

  const isPrimaryPressPointer = (event: PreviewPointerEvent) =>
    event.button === 0 || event.pointerType === "touch" || event.pointerType === "pen";

  const updatePointer = (event: PreviewPointerEvent, index: number) => {
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
      parallaxEnabled ? String(parallaxStrength) : "0",
    );

    if (!shell || previewIsDisabled) return;

    const xRatio = x / rect.width - 0.5;
    const yRatio = y / rect.height - 0.5;

    if (hoverEffect === "magnetic") {
      shell.style.transform =
        "translate(" +
        (xRatio * 18).toFixed(2) +
        "px, " +
        (yRatio * 18).toFixed(2) +
        "px)";
      return;
    }

    if (hoverEffect === "tilt") {
      shell.style.transform =
        "perspective(900px) rotateX(" +
        (-yRatio * 14).toFixed(2) +
        "deg) rotateY(" +
        (xRatio * 14).toFixed(2) +
        "deg)";
    }
  };

  const triggerVisualClickEffect = (event: PreviewClickEvent, index: number) => {
    if (previewIsDisabled || clickEffectProfile.kind === "none") return;

    const button = buttonRefs.current[index];
    const effectHost = effectHostRefs.current[index];
    if (!button) return;

    if (clickEffectProfile.kind === "ripple") {
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "uif-ripple";
      ripple.style.left = event.clientX - rect.left + "px";
      ripple.style.top = event.clientY - rect.top + "px";
      button.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
      return;
    }

    spawnBurst(effectHost, event, clickEffectProfile, burstColors);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    if (previewIsDisabled) return;

    const lastPressEffectAt = lastPressEffectAtRef.current[index] ?? 0;
    if (event.timeStamp - lastPressEffectAt > 450) {
      triggerVisualClickEffect(event, index);
    }
    lastPressEffectAtRef.current[index] = 0;
  };

  return (
    <>
      <style>{`
        @keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
        @keyframes ripple{0%{transform:translate(-50%,-50%) scale(0);opacity:.45;}100%{transform:translate(-50%,-50%) scale(18);opacity:0;}}
        @keyframes uif-breathe{0%,100%{transform:scale(1);}50%{transform:scale(${breatheScale});}}
        @keyframes uif-soft-drift{0%,100%{transform:translateY(0);}50%{transform:translateY(-${driftDistancePx}px);}}
        @keyframes uif-soft-glow{0%,100%{opacity:.06;}50%{opacity:${glowOpacity};}}
        @keyframes uif-neon-pulse{0%,100%{opacity:${(Number(glowOpacity) * 0.55).toFixed(3)};transform:scale(.985);}50%{opacity:${(Number(glowOpacity) * 1.65).toFixed(3)};transform:scale(1.018);}}
        @keyframes uif-sheen{0%,72%,100%{transform:translateX(-160%);opacity:0;}82%{opacity:${(Number(sheenOpacity) * 0.45).toFixed(3)};}90%{transform:translateX(0%);opacity:${sheenOpacity};}100%{transform:translateX(160%);opacity:0;}}
        @keyframes uif-aurora{0%,100%{background-position:0% 50%;opacity:${(Number(auroraOpacity) * 0.7).toFixed(3)};}50%{background-position:100% 50%;opacity:${auroraOpacity};}}
        @keyframes uif-cyber-glitch{
          0%,100%{transform:translate3d(0,0,0);filter:none;}
          12%{transform:translate3d(-${glitchShiftPx}px,0,0);filter:hue-rotate(12deg);}
          14%{transform:translate3d(${glitchShiftPx}px,0,0);filter:hue-rotate(-10deg);}
          16%{transform:translate3d(0,0,0);filter:none;}
          54%{transform:translate3d(${(Number(glitchShiftPx) * 0.65).toFixed(2)}px,0,0);filter:contrast(1.08) saturate(1.12);}
          56%{transform:translate3d(-${(Number(glitchShiftPx) * 0.65).toFixed(2)}px,0,0);filter:none;}
          58%{transform:translate3d(0,0,0);filter:none;}
        }
        @keyframes uif-depth-rock{0%,100%{transform:perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0);}50%{transform:perspective(900px) rotateX(${depthTiltDeg}deg) rotateY(-${depthTiltDeg}deg) translateY(-${depthLiftPx}px);}}
        @keyframes uif-depth-orbit{0%,100%{transform:perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0);}25%{transform:perspective(900px) rotateX(${(Number(depthTiltDeg) * 0.8).toFixed(2)}deg) rotateY(${depthTiltDeg}deg) translateZ(${(Number(depthLiftPx) * 0.65).toFixed(2)}px);}75%{transform:perspective(900px) rotateX(-${(Number(depthTiltDeg) * 0.8).toFixed(2)}deg) rotateY(-${depthTiltDeg}deg) translateZ(${(Number(depthLiftPx) * 0.65).toFixed(2)}px);}}
        @keyframes uif-depth-gyro{0%,100%{transform:perspective(1000px) rotateX(-${(Number(depthTiltDeg) * 0.5).toFixed(2)}deg) rotateY(-${(Number(depthTiltDeg) * 0.72).toFixed(2)}deg) translateY(0);}25%{transform:perspective(1000px) rotateX(${(Number(depthTiltDeg) * 0.8).toFixed(2)}deg) rotateY(${(Number(depthTiltDeg) * 0.4).toFixed(2)}deg) translateY(-${(Number(depthLiftPx) * 0.6).toFixed(2)}px);}50%{transform:perspective(1000px) rotateX(${(Number(depthTiltDeg) * 0.24).toFixed(2)}deg) rotateY(${depthTiltDeg}deg) translateY(-${depthLiftPx}px);}75%{transform:perspective(1000px) rotateX(-${depthTiltDeg}deg) rotateY(${(Number(depthTiltDeg) * 0.2).toFixed(2)}deg) translateY(-${(Number(depthLiftPx) * 0.45).toFixed(2)}px);}}
        @keyframes uif-depth-tilt-cycle{0%,100%{transform:perspective(900px) rotateX(0deg) rotateY(-${tiltCycleDeg.toFixed(2)}deg);}50%{transform:perspective(900px) rotateX(0deg) rotateY(${tiltCycleDeg.toFixed(2)}deg);}}
        @keyframes uif-text-wave{0%,100%{transform:translateY(0);}50%{transform:translateY(-${textWaveLiftPx}px);}}
        @keyframes uif-text-bounce{0%,100%{transform:translateY(0) scale(1);}30%{transform:translateY(-${textWaveLiftPx}px) scale(1.04);}65%{transform:translateY(0) scale(.985);}}
        @keyframes uif-text-flicker{0%,100%{opacity:1;text-shadow:inherit;}35%{opacity:.88;text-shadow:0 0 ${textWaveLiftPx}px currentColor;}50%{opacity:.96;}65%{opacity:.82;text-shadow:0 0 ${textWaveLiftPx}px currentColor;}}
        @keyframes uif-text-glitch{0%,100%{transform:translateX(0);text-shadow:none;}14%{transform:translateX(-${textGlitchPx}px);text-shadow:${textGlitchPx}px 0 0 rgba(34,211,238,.75),-${textGlitchPx}px 0 0 rgba(244,114,182,.55);}18%{transform:translateX(${textGlitchPx}px);text-shadow:-${textGlitchPx}px 0 0 rgba(34,211,238,.55),${textGlitchPx}px 0 0 rgba(244,114,182,.75);}22%{transform:translateX(0);text-shadow:none;}72%{transform:translateX(-${(Number(textGlitchPx) * 0.6).toFixed(2)}px);text-shadow:${(Number(textGlitchPx) * 0.6).toFixed(2)}px 0 0 rgba(34,211,238,.55);}75%{transform:translateX(0);text-shadow:none;}}
        @keyframes uif-text-shimmer{0%,100%{background-position:200% 50%;}50%{background-position:0% 50%;}}
        @keyframes sparkle{0%{transform:translate3d(0,0,0) scale(.4);opacity:0;}20%{opacity:1;}100%{transform:translate3d(0,-12px,0) scale(1.15);opacity:0;}}
        @keyframes burst{0%{transform:translate(-50%,-50%) scale(.3) rotate(0deg);opacity:1;}100%{transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) scale(var(--scale)) rotate(var(--rot));opacity:0;}}
        .uif-group{display:flex;align-items:center;justify-content:${groupJustify};gap:${groupGap};flex-wrap:wrap;}
        .uif-motion{display:inline-flex;}
        .uif-motion[data-animation='breathe']{animation:uif-breathe ${motionDurationEffectiveMs}ms ${motionEasing} infinite;}
        .uif-motion[data-animation='soft-drift']{animation:uif-soft-drift ${motionDurationEffectiveMs}ms ${motionEasing} infinite;}
        .uif-depth-shell{position:relative;display:inline-flex;transform-style:preserve-3d;}
        .uif-depth-shell[data-depth-animation='rock']{animation:uif-depth-rock ${motionDurationEffectiveMs}ms ${motionEasing} infinite;}
        .uif-depth-shell[data-depth-animation='orbit']{animation:uif-depth-orbit ${Math.round(motionDurationEffectiveMs * 1.18)}ms ${motionEasing} infinite;}
        .uif-depth-shell[data-depth-animation='gyro']{animation:uif-depth-gyro ${Math.round(motionDurationEffectiveMs * 1.06)}ms ${motionEasing} infinite;}
        .uif-depth-shell[data-depth-animation='tilt-cycle']{animation:uif-depth-tilt-cycle ${Math.round(motionDurationEffectiveMs * 0.92)}ms ${motionEasing} infinite;}
        .uif-shell{position:relative;display:inline-flex;transition:transform ${shellTransitionMs}ms ${shellTransitionEase};transform-style:preserve-3d;}
        .uif-click-host{position:absolute;inset:-96px;pointer-events:none;overflow:visible;z-index:4;}
        .uif-btn{position:relative;display:flex;outline:none;overflow:hidden;user-select:none;box-sizing:border-box;-webkit-font-smoothing:antialiased;z-index:1;background-clip:padding-box;-webkit-background-clip:padding-box;touch-action:manipulation;}
        .uif-btn[data-animation='cyber-glitch']{animation:uif-cyber-glitch ${Math.max(900, Math.round(motionDurationEffectiveMs * 0.7))}ms steps(1) infinite;}
        .uif-content{position:relative;z-index:1;display:flex;align-items:center;gap:inherit;}
        .uif-icon{display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .uif-icon span,.uif-icon svg{display:block;width:100%;height:100%;}
        .uif-label{white-space:nowrap;display:inline-flex;align-items:center;position:relative;}
        .uif-label-char{display:inline-block;min-width:0.12em;}
        .uif-label[data-text-animation='wave'] .uif-label-char{animation:uif-text-wave ${motionDurationEffectiveMs}ms ${motionEasing} infinite;}
        .uif-label[data-text-animation='bounce'] .uif-label-char{animation:uif-text-bounce ${Math.max(1000, Math.round(motionDurationEffectiveMs * 0.78))}ms ${motionEasing} infinite;}
        .uif-label[data-text-animation='flicker'] .uif-label-char{animation:uif-text-flicker ${Math.max(1100, Math.round(motionDurationEffectiveMs * 0.72))}ms ${motionEasing} infinite;}
        .uif-label[data-text-animation='glitch'] .uif-label-char{animation:uif-text-glitch ${Math.max(950, Math.round(motionDurationEffectiveMs * 0.62))}ms steps(1) infinite;}
        .uif-label[data-text-animation='shimmer']{background:linear-gradient(110deg,currentColor 8%,rgba(255,255,255,.92) 24%,currentColor 42%);background-size:220% 100%;background-position:200% 50%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:uif-text-shimmer ${Math.max(1500, Math.round(motionDurationEffectiveMs * 0.85))}ms linear infinite;}
        .uif-ambient-layer{position:absolute;pointer-events:none;border-radius:inherit;z-index:0;opacity:0;}
        .uif-ambient-glow{inset:-16%;background:radial-gradient(circle at 50% 50%,rgba(255,255,255,.26),transparent 62%);filter:blur(18px);mix-blend-mode:screen;}
        .uif-ambient-sheen{inset:-28%;background:linear-gradient(115deg,transparent 36%,rgba(255,255,255,.18) 50%,transparent 64%);transform:translateX(-160%);mix-blend-mode:screen;}
        .uif-ambient-aurora{inset:-22%;background:linear-gradient(120deg,rgba(255,255,255,.04),rgba(96,165,250,.14),rgba(255,255,255,.03),rgba(255,255,255,.08));background-size:200% 200%;filter:blur(16px);mix-blend-mode:soft-light;}
        .uif-btn[data-animation='soft-glow'] .uif-ambient-glow{animation:uif-soft-glow ${motionDurationEffectiveMs}ms ${motionEasing} infinite;}
        .uif-btn[data-animation='neon-pulse'] .uif-ambient-glow{animation:uif-neon-pulse ${Math.max(1400, Math.round(motionDurationEffectiveMs * 0.74))}ms ${motionEasing} infinite;}
        .uif-btn[data-animation='sheen'] .uif-ambient-sheen{animation:uif-sheen ${Math.max(1800, Math.round(motionDurationEffectiveMs * 1.05))}ms ${motionEasing} infinite;}
        .uif-btn[data-animation='aurora'] .uif-ambient-aurora{animation:uif-aurora ${Math.max(2200, Math.round(motionDurationEffectiveMs * 1.4))}ms ${motionEasing} infinite;}
        .uif-spotlight{position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at var(--x,50%) var(--y,50%),rgba(255,255,255,.38),transparent 42%);opacity:0;transition:opacity 180ms ease;}
        .uif-btn[data-hovered='true'] .uif-spotlight{opacity:1;}
        .uif-parallax-glow{position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at var(--x,50%) var(--y,50%),rgba(255,255,255,var(--parallax-opacity,0)),transparent 42%);opacity:0;transition:opacity 180ms ease;}
        .uif-btn[data-hovered='true'] .uif-parallax-glow{opacity:1;}
        .uif-top-gradient{position:absolute;inset:0;pointer-events:none;mix-blend-mode:overlay;}
        .uif-sparkle-layer{position:absolute;inset:0;pointer-events:none;overflow:hidden;}
        .uif-sparkle-dot{position:absolute;border-radius:999px;background:rgba(255,255,255,.95);box-shadow:0 0 12px rgba(255,255,255,.9);animation:sparkle 900ms ease-out forwards;}
        .uif-ripple{position:absolute;width:18px;height:18px;border-radius:999px;background:currentColor;opacity:.3;pointer-events:none;transform:translate(-50%,-50%);animation:ripple .65s ease-out forwards;}
        .uif-burst-particle{position:absolute;left:var(--origin-x,50%);top:var(--origin-y,50%);width:6px;height:12px;border-radius:999px;pointer-events:none;animation:burst .72s ease-out forwards;}
        @media (prefers-reduced-motion: reduce){.uif-motion,.uif-depth-shell,.uif-shell,.uif-btn,.uif-label,.uif-label-char,.uif-ambient-glow,.uif-ambient-sheen,.uif-ambient-aurora,.uif-ripple,.uif-burst-particle,.uif-icon{animation:none!important;transition-duration:.01ms!important;}}
      `}</style>

      <div
        className="uif-group"
        data-audit="live-preview-root"
        data-testid="live-preview-root"
      >
        {groupIndexes.map((index) => {
          const hovered = isHoveredFor(index);
          const focused = isFocusedFor(index);
          const snapshot = getSnapshot(index);
          const currentIcon = getCurrentIconSvg(index);
          const iconFirst =
            loading && loadingSpinnerMode !== "none"
              ? spinnerPosition !== "right"
              : iconPosition !== "right";
          const borderRadius =
            hoverEffect === "morph" && hovered && !previewIsDisabled
              ? morphRadius
              : baseRadius;

            return (
              <div
                key={index}
                className="uif-motion"
                data-animation={resolvedAnimation}
                data-audit="live-preview-motion-shell"
                data-index={index}
                data-testid={`live-preview-motion-${index}`}
              >
                <div
                  className="uif-depth-shell"
                  data-depth-animation={resolvedDepthAnimation}
                  data-audit="live-preview-depth-shell"
                  data-index={index}
                  data-testid={`live-preview-depth-shell-${index}`}
                >
                  <div
                    className="uif-shell"
                    data-audit="live-preview-shell"
                    data-index={index}
                    data-testid={`live-preview-shell-${index}`}
                    ref={(node) => {
                      interactionRefs.current[index] = node;
                    }}
                  >
                    <div
                      className="uif-click-host"
                      aria-hidden="true"
                      data-audit="live-preview-click-host"
                      data-index={index}
                      ref={(node) => {
                        effectHostRefs.current[index] = node;
                      }}
                    />
                    <button
                      ref={(node) => {
                        buttonRefs.current[index] = node;
                      }}
                      type="button"
                      className="uif-btn"
                      data-animation={resolvedAnimation}
                      data-hovered={hovered ? "true" : "false"}
                      data-audit="live-preview-button"
                      data-index={index}
                      data-testid={`live-preview-button-${index}`}
                      style={{
                        width,
                        height,
                        padding: `${padY} ${padX}`,
                        gap,
                        borderStyle: toStringValue(props.borderStyle, "solid"),
                        borderRadius,
                        fontFamily: toStringValue(props.fontFamily, "Arial, system-ui"),
                        fontSize: `${toNumberValue(props.fontSizeValue, 14)}${toStringValue(props.fontSizeUnit, "px")}`,
                        fontWeight: props.fontWeight ?? 700,
                        letterSpacing: `${toNumberValue(props.letterSpacingValue, 0.2)}${toStringValue(props.letterSpacingUnit, "px")}`,
                        lineHeight: props.lineHeight ?? 1,
                        fontStyle: toStringValue(props.fontStyle, "normal"),
                        textTransform: toStringValue(props.textTransform, "none"),
                        textDecoration: toBooleanValue(props.underline, false) ? "underline" : "none",
                        alignItems: resolveAlignItems(align),
                        justifyContent: resolveJustify(align),
                        cursor: loading ? "wait" : previewIsDisabled ? disabledCursor : "pointer",
                        opacity: previewIsDisabled ? disabledOpacity : 1,
                        transition:
                          `background ${transitionColorMs}ms ${transitionColorEasing}, ` +
                          `color ${transitionColorMs}ms ${transitionColorEasing}, ` +
                          `border-color ${transitionColorMs}ms ${transitionColorEasing}, ` +
                          `box-shadow ${transitionColorMs}ms ${transitionColorEasing}, ` +
                          `filter ${transitionColorMs}ms ${transitionColorEasing}, ` +
                          `transform ${transitionTransformMs}ms ${transitionTransformEasing}, ` +
                          `border-radius ${transitionTransformMs}ms ${transitionTransformEasing}`,
                        background: snapshot.background,
                        color: snapshot.color,
                        borderColor: snapshot.borderColor,
                        borderWidth: snapshot.borderWidth,
                        boxShadow: focused ? focusShadow(snapshot.boxShadow) : snapshot.boxShadow,
                        textShadow: snapshot.textShadow,
                        transform:
                          hoverEffect === "morph" && hovered && !previewIsDisabled
                            ? `${snapshot.transform === "none" ? "" : snapshot.transform} scale(1.03)`.trim()
                            : snapshot.transform,
                        filter: snapshot.filter,
                        backdropFilter: `blur(${backdropBlur})`,
                        WebkitBackdropFilter: `blur(${backdropBlur})`,
                      }}
                      disabled={previewIsDisabled}
                      onPointerEnter={(event) => {
                        if (
                          supportsHoverPointer(event) &&
                          !previewIsDisabled &&
                          hoverEnabled &&
                          !forceHover
                        ) {
                          setHoveredIndex(index);
                        }
                      }}
                      onPointerLeave={(event) => {
                        if (supportsHoverPointer(event) && !forceHover) setHoveredIndex(-1);
                        if (!forceActive) setActiveIndex(-1);
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
                        if (!previewIsDisabled && activeEnabled && !forceActive) {
                          setActiveIndex(index);
                        }
                        if (!previewIsDisabled) {
                          const pressAt = event.timeStamp;
                          lastPressEffectAtRef.current[index] = pressAt;
                          triggerVisualClickEffect(event, index);
                          setTimeout(() => {
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
                        if (supportsHoverPointer(event) && hoverEnabled && !forceHover) {
                          setHoveredIndex(index);
                        }
                        if (!forceActive) setActiveIndex(-1);
                      }}
                      onPointerCancel={(event) => {
                        if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
                          event.currentTarget.releasePointerCapture?.(event.pointerId);
                        }
                        if (!forceHover) setHoveredIndex(-1);
                        if (!forceActive) setActiveIndex(-1);
                        lastPressEffectAtRef.current[index] = 0;
                        resetShell(index);
                      }}
                      onFocus={() => {
                        if (!forceFocus) setFocusedIndex(index);
                      }}
                      onBlur={() => {
                        if (!forceFocus) setFocusedIndex(-1);
                        if (!forceActive) setActiveIndex(-1);
                      }}
                      onClick={(event) => handleClick(event, index)}
                      aria-label={toStringValue(props.ariaLabel, label)}
                      aria-pressed={resolveAriaPressed(toStringValue(props.ariaPressedMode, "off"))}
                      aria-busy={resolveAriaBusy(toStringValue(props.ariaBusyMode, "auto"), loading)}
                    >
                    <div
                      className="uif-ambient-layer uif-ambient-glow"
                      aria-hidden="true"
                      data-audit="live-preview-ambient-glow"
                      data-index={index}
                    />
                    <div
                      className="uif-ambient-layer uif-ambient-sheen"
                      aria-hidden="true"
                      data-audit="live-preview-ambient-sheen"
                      data-index={index}
                    />
                    <div
                      className="uif-ambient-layer uif-ambient-aurora"
                      aria-hidden="true"
                      data-audit="live-preview-ambient-aurora"
                      data-index={index}
                    />
                    {topGradient !== "none" ? (
                      <div
                        className="uif-top-gradient"
                        aria-hidden="true"
                        data-audit="live-preview-top-gradient"
                        data-index={index}
                        style={{ background: topGradient }}
                      />
                    ) : null}
                    {parallaxEnabled ? (
                      <div
                        className="uif-parallax-glow"
                        aria-hidden="true"
                        data-audit="live-preview-parallax-glow"
                        data-index={index}
                      />
                    ) : null}
                    {hoverEffect === "spotlight" ? (
                      <div
                        className="uif-spotlight"
                        aria-hidden="true"
                        data-audit="live-preview-spotlight"
                        data-index={index}
                      />
                    ) : null}
                    {hovered && hoverEffect === "sparkles" ? (
                      <div
                        className="uif-sparkle-layer"
                        aria-hidden="true"
                        data-audit="live-preview-sparkles"
                        data-index={index}
                      >
                        {SPARKLE_DOTS.map((dot, dotIndex) => (
                          <span
                            key={dotIndex}
                            className="uif-sparkle-dot"
                            data-audit="live-preview-sparkle-dot"
                            data-dot-index={dotIndex}
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
                    ) : null}
                    <span
                      className="uif-content"
                      data-audit="live-preview-content"
                      data-index={index}
                      data-testid={`live-preview-content-${index}`}
                      style={{ flexDirection: iconFirst ? "row" : "row-reverse" }}
                    >
                      {currentIcon.markup ? (
                        <span
                          className="uif-icon"
                          data-audit="live-preview-icon"
                          data-index={index}
                          data-testid={`live-preview-icon-${index}`}
                          style={{
                            width: iconSize,
                            height: iconSize,
                            fontSize: iconSize,
                            filter: iconEmbossFilter,
                            color: toStringValue(props.iconColor, "currentColor"),
                            animation: currentIcon.animated ? "spin 1s linear infinite" : "none",
                          }}
                        >
                          <span dangerouslySetInnerHTML={{ __html: currentIcon.markup }} />
                        </span>
                      ) : null}
                      <span
                        className="uif-label"
                        data-text-animation={resolvedTextAnimation}
                        data-audit="live-preview-label"
                        data-index={index}
                        data-testid={`live-preview-label-${index}`}
                      >
                        {renderLabelContent(loading ? loadingLabel : label)}
                      </span>
                    </span>
                    </button>
                  </div>
                </div>
              </div>
          );
        })}
      </div>
    </>
  );
}
