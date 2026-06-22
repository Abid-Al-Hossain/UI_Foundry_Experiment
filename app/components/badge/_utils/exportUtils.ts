"use client";

import {
  type BadgeState,
  type BadgeVariant,
  type BadgeShape,
  type BadgeSize,
  type BadgeIconPosition,
} from "../types";

const BADGE_SIZE_SCALE: Record<BadgeSize, number> = {
  sm: 0.92,
  md: 1,
  lg: 1.1,
};

function getBadgeSizeScale(size: BadgeSize) {
  return BADGE_SIZE_SCALE[size] ?? 1;
}

function getBadgeRadius(shape: BadgeShape, borderRadius: number) {
  if (shape === "pill") return "9999px";
  if (shape === "circle") return "50%";
  if (shape === "square") return "0px";
  return `${borderRadius}px`;
}

function getBadgeVariantStyles(params: {
  variant: BadgeVariant;
  color: string;
  textColor: string;
  borderWidth: number;
  borderStyle: string;
  dropShadow: boolean;
  shadowColor: string;
  shadowBlur: number;
  gradientEnabled: boolean;
  gradientStart: string;
  gradientEnd: string;
  gradientAngle: number;
}) {
  const {
    variant,
    color,
    textColor,
    borderWidth,
    borderStyle,
    dropShadow,
    shadowColor,
    shadowBlur,
    gradientEnabled,
    gradientStart,
    gradientEnd,
    gradientAngle,
  } = params;

  const styles = {
    background: color,
    color: textColor,
    border: `${borderWidth}px ${borderStyle} ${color}`,
    boxShadow: "none",
    backdropFilter: undefined as string | undefined,
    WebkitBackdropFilter: undefined as string | undefined,
  };

  if (variant === "outline") {
    styles.background = "transparent";
    styles.color = color;
  } else if (variant === "soft") {
    styles.background = `${color}20`;
    styles.color = color;
    styles.border = "none";
  } else if (variant === "ghost") {
    styles.background = "transparent";
    styles.color = color;
    styles.border = "none";
  } else if (variant === "neumorphic") {
    styles.background = "#e0e5ec";
    styles.color = "#4a5568";
    styles.border = "none";
    if (dropShadow) {
      styles.boxShadow = "5px 5px 10px #bebebe, -5px -5px 10px #ffffff";
    }
  } else if (variant === "glass") {
    styles.background = `${color}40`;
    styles.color = textColor;
    styles.border = "1px solid rgba(255,255,255,0.3)";
    styles.backdropFilter = "blur(12px)";
    styles.WebkitBackdropFilter = "blur(12px)";
  } else if (gradientEnabled) {
    styles.background = `linear-gradient(${gradientAngle}deg, ${gradientStart}, ${gradientEnd})`;
    styles.border = "none";
  }

  if (dropShadow && variant !== "neumorphic") {
    styles.boxShadow = `0 4px ${shadowBlur}px ${shadowColor}`;
  }

  return styles;
}

function getGeometryJsx(geometry: BadgeState["icon3DGeometry"]) {
  if (geometry === "cube") {
    return "<boxGeometry args={[0.8, 0.8, 0.8]} />";
  }
  if (geometry === "pyramid") {
    return "<coneGeometry args={[0.5, 0.9, 4]} />";
  }
  if (geometry === "torus") {
    return "<torusGeometry args={[0.4, 0.15, 16, 32]} />";
  }
  return "<sphereGeometry args={[0.5, 32, 32]} />";
}

export type BadgeExportInput = {
  downloadName: string;
  label: string;
  count: string;
  showIcon: boolean;
  iconName: string;
  iconPosition: BadgeIconPosition;
  iconGap: number;
  iconSize: number;
  variant: BadgeVariant;
  shape: BadgeShape;
  size: BadgeSize;
  color: string;
  textColor: string;
  paddingX: number;
  paddingY: number;
  fontSize: number;
  borderRadius: number;
  borderWidth: number;
  showDot: boolean;
  dotColor: string;
  dotPulse: boolean;
  gradientEnabled: boolean;
  gradientStart: string;
  gradientEnd: string;
  gradientAngle: number;
  dropShadow: boolean;
  shadowColor: string;
  shadowBlur: number;
  use3D: boolean;
  depth: number;
  tiltEnabled: boolean;
  tiltMax: number;
  glareOpacity: number;
  icon3DEnabled: boolean;
  icon3DGeometry: BadgeState["icon3DGeometry"];
  icon3DSpinSpeed: number;
  dismissible: boolean;
  interactive: boolean;
  hoverScale: number;
  clickRipple: boolean;
  borderStyle: BadgeState["borderStyle"];
  disabled: boolean;
  disabledOpacity: number;
  disabledCursor: BadgeState["disabledCursor"];
  transitionDuration: number;
  transitionEasing: BadgeState["transitionEasing"];
  focusRingEnabled: boolean;
  focusRingWidth: number;
  focusRingColor: string;
  hoverBgColor: string;
  hoverTextColor: string;
  letterSpacing: number;
  textTransform: BadgeState["textTransform"];
  ariaLabel?: string;
  ariaRole?: BadgeState["ariaRole"];
  ariaLive?: BadgeState["ariaLive"];
};

export function buildBadgeExportPayload(params: BadgeExportInput) {
  const {
    downloadName,
    label,
    count,
    showIcon,
    iconName,
    iconPosition,
    iconGap,
    iconSize,
    variant,
    shape,
    size,
    color,
    textColor,
    paddingX,
    paddingY,
    fontSize,
    borderRadius,
    borderWidth,
    showDot,
    dotColor,
    dotPulse,
    gradientEnabled,
    gradientStart,
    gradientEnd,
    gradientAngle,
    dropShadow,
    shadowColor,
    shadowBlur,
    use3D,
    depth,
    tiltEnabled,
    tiltMax,
    glareOpacity,
    icon3DEnabled,
    icon3DGeometry,
    dismissible,
    interactive,
    hoverScale,
    clickRipple,
    icon3DSpinSpeed,
    borderStyle,
    disabled,
    disabledOpacity,
    disabledCursor,
    transitionDuration,
    transitionEasing,
    focusRingEnabled,
    focusRingWidth,
    focusRingColor,
    hoverBgColor,
    hoverTextColor,
    letterSpacing,
    textTransform,
    ariaLabel,
    ariaRole,
    ariaLive,
  } = params;

  const sizeScale = getBadgeSizeScale(size);
  const scaledFontSize = Math.max(10, Math.round(fontSize * sizeScale));
  const scaledPaddingX = Math.max(0, Math.round(paddingX * sizeScale));
  const scaledPaddingY = Math.max(0, Math.round(paddingY * sizeScale));
  const scaledIconGap = Math.max(0, Math.round(iconGap * sizeScale));
  const scaledIconSize = Math.max(
    12,
    Math.round((scaledFontSize * iconSize) / 100),
  );
  const scaledBorderRadius =
    shape === "pill" || shape === "circle" || shape === "square"
      ? getBadgeRadius(shape, borderRadius)
      : `${Math.max(0, Math.round(borderRadius * sizeScale))}px`;
  const scaledBorderWidth = Math.max(0.5, Number((borderWidth * sizeScale).toFixed(2)));
  const scaledShadowBlur = Math.max(0, Math.round(shadowBlur * sizeScale));
  const scaledDepth = Math.round(depth * sizeScale);
  const scaledTiltMax = Math.max(1, Math.round(tiltMax * sizeScale));

  const variantStyles = getBadgeVariantStyles({
    variant,
    color,
    textColor,
    borderWidth: scaledBorderWidth,
    borderStyle,
    dropShadow,
    shadowColor,
    shadowBlur: scaledShadowBlur,
    gradientEnabled,
    gradientStart,
    gradientEnd,
    gradientAngle,
  });

  const reactIconMap: Record<string, string> = {
    star: "Star",
    check: "Check",
    alert: "AlertTriangle",
    bell: "Bell",
    heart: "Heart",
    shield: "Shield",
    zap: "Zap",
  };
  const reactIconName = reactIconMap[iconName] ?? "Star";
  const dismissIconSize = Math.max(12, Math.round(scaledIconSize * 0.72));
  const icon3dGeometryJsx = getGeometryJsx(icon3DGeometry);
  const focusable = interactive || dismissible;
  const needsState = interactive || (focusRingEnabled && focusable);
  const needsHooks = tiltEnabled || clickRipple || needsState;
  const needsMotion = interactive || tiltEnabled || clickRipple;
  const wrapperTag = needsMotion ? "motion.div" : "div";
  const ariaProps =
    ariaRole && ariaRole !== "none"
      ? `role="${ariaRole}" aria-live="${ariaLive || "polite"}"`
      : "";
  const labelProp = ariaLabel ? `aria-label="${ariaLabel}"` : "";

  const reactIconImport = showIcon
    ? `import { ${reactIconName}${dismissible ? ", X" : ""} } from "lucide-react";`
    : dismissible
      ? `import { X } from "lucide-react";`
      : "";

  const content = `import React${needsHooks ? ", { useRef, useState }" : ""} from "react";
${needsMotion ? `import { motion } from "framer-motion";` : ""}
${reactIconImport}
${icon3DEnabled ? `import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";` : ""}

export default function Badge() {
${needsHooks ? `
  ${tiltEnabled || clickRipple ? "const ref = useRef<HTMLDivElement | null>(null);" : ""}
  ${interactive ? "const [hovered, setHovered] = useState(false);" : ""}
  ${focusRingEnabled && focusable ? "const [focused, setFocused] = useState(false);" : ""}
  ${clickRipple ? "const [ripples, setRipples] = useState<{ id: number; x: number; y: number; size: number }[]>([]);" : ""}
  ${clickRipple ? "const rippleId = useRef(0);" : ""}
  ${tiltEnabled ? `const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = \`perspective(1000px) rotateX(\${y * -${scaledTiltMax}}deg) rotateY(\${x * ${scaledTiltMax}}deg)${use3D ? ` translateZ(${scaledDepth}px)` : ""}\`;
  };
  const handleLeave = () => {
    if (ref.current) {
      ref.current.style.transform = ${use3D ? `\`perspective(1000px) translateZ(${scaledDepth}px)\`` : `"none"`};
    }
  };` : ""}
  ${clickRipple ? `const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rippleSize = Math.max(rect.width, rect.height) * 1.15;
    const id = rippleId.current + 1;
    rippleId.current = id;
    setRipples((current) => [
      ...current,
      {
        id,
        x: e.clientX - rect.left - rippleSize / 2,
        y: e.clientY - rect.top - rippleSize / 2,
        size: rippleSize,
      },
    ]);
    window.setTimeout(() => {
      setRipples((current) => current.filter((item) => item.id !== id));
    }, 520);
  };` : ""}
` : ""}

  return (
    <${wrapperTag}
      ${tiltEnabled || clickRipple ? "ref={ref}" : ""}
      ${tiltEnabled ? "onMouseMove={handleMove}" : ""}
      ${interactive ? "onMouseEnter={() => setHovered(true)}" : ""}
      onMouseLeave={() => {${tiltEnabled ? " handleLeave();" : ""}${interactive ? " setHovered(false);" : ""}}}
      ${focusRingEnabled && focusable ? "onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}" : ""}
      ${clickRipple ? "onPointerDown={handlePointerDown}" : ""}
      ${interactive ? `whileHover={${disabled ? "{}" : `{ scale: ${hoverScale} }`}} whileTap={${disabled ? "{}" : `{ scale: ${clickRipple ? 0.97 : 0.98} }`}}` : ""}
      ${focusable ? `tabIndex={${disabled ? -1 : 0}}` : ""}
      ${disabled ? "aria-disabled={true}" : ""}
      ${ariaProps}
      ${labelProp}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "${scaledIconGap}px",
        padding: "${scaledPaddingY}px ${scaledPaddingX}px",
        fontSize: "${scaledFontSize}px",
        fontWeight: 600,
        letterSpacing: "${letterSpacing}px",
        textTransform: "${textTransform}",
        borderRadius: "${scaledBorderRadius}",
        fontFamily: "Inter, sans-serif",
        cursor: "${disabled ? disabledCursor : interactive ? "pointer" : "default"}",
        position: "relative",
        overflow: "hidden",
        transition: ${transitionDuration > 0 ? `"all ${transitionDuration}ms ${transitionEasing}"` : `"none"`},
        background: ${interactive ? `hovered && !${disabled} ? "${hoverBgColor}" : "${variantStyles.background}"` : `"${variantStyles.background}"`},
        color: ${interactive ? `hovered && !${disabled} ? "${hoverTextColor}" : "${variantStyles.color}"` : `"${variantStyles.color}"`},
        border: "${variantStyles.border}",
        boxShadow: "${variantStyles.boxShadow}",
        opacity: ${disabled ? disabledOpacity : 1},
        ${focusRingEnabled && focusable ? `outline: focused ? "${focusRingWidth}px solid ${focusRingColor}" : "none", outlineOffset: 2,` : ""}
        ${variantStyles.backdropFilter ? `backdropFilter: "${variantStyles.backdropFilter}",` : ""}
        ${variantStyles.WebkitBackdropFilter ? `WebkitBackdropFilter: "${variantStyles.WebkitBackdropFilter}",` : ""}
        ${use3D || tiltEnabled ? `transform: "perspective(1000px)${tiltEnabled ? "" : ` translateZ(${scaledDepth}px)`}", transformStyle: "preserve-3d",` : ""}
      }}
    >
      ${showDot ? `<span style={{ width: ${Math.max(8, Math.round(10 * sizeScale))}, height: ${Math.max(8, Math.round(10 * sizeScale))}, borderRadius: "50%", background: "${dotColor}", ${dotPulse ? 'animation: "pulse 1.5s infinite"' : ""} }} />` : ""}
      ${showIcon && iconPosition === "left" ? `<${reactIconName} size={${scaledIconSize}} />` : ""}
      ${showIcon && iconPosition === "only" ? `<${reactIconName} size={${scaledIconSize}} />` : ""}
      ${iconPosition === "only" ? "" : `<span>${label}</span>`}
      ${count && iconPosition !== "only" ? `<span style={{ marginLeft: 4, padding: "2px 6px", fontSize: "0.8em", borderRadius: "99px", background: "rgba(255,255,255,0.2)" }}>${count}</span>` : ""}
      ${showIcon && iconPosition === "right" ? `<${reactIconName} size={${scaledIconSize}} />` : ""}
      ${dismissible ? `<button type="button" aria-label="Dismiss badge" style={{ marginLeft: 4, width: ${Math.max(22, dismissIconSize + 8)}, height: ${Math.max(22, dismissIconSize + 8)}, borderRadius: 9999, border: "none", background: "rgba(0,0,0,0.08)", color: "currentColor", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><X size={${dismissIconSize}} /></button>` : ""}
      ${clickRipple ? `{ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{
            position: "absolute",
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            borderRadius: "9999px",
            pointerEvents: "none",
            background: "${variant === "solid" ? "rgba(255,255,255,0.28)" : `${color}2E`}",
            animation: "badge-ripple 520ms ease-out forwards",
          }}
        />
      ))}` : ""}
      ${icon3DEnabled ? `<div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <Canvas gl={{ alpha: true }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Float speed={${icon3DSpinSpeed}} rotationIntensity={1} floatIntensity={1}>
            <mesh position={[0, 1.5, 0]}>
              ${icon3dGeometryJsx}
              <meshStandardMaterial color="${color}" roughness={0.3} metalness={0.8} />
            </mesh>
          </Float>
        </Canvas>
      </div>` : ""}
      ${tiltEnabled ? `<div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(45deg, transparent, rgba(255,255,255,${glareOpacity}), transparent)", opacity: ${glareOpacity}, mixBlendMode: "overlay" }} />` : ""}
      <style>{\`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        @keyframes badge-ripple {
          from {
            transform: scale(0.2);
            opacity: 0.45;
          }
          to {
            transform: scale(1);
            opacity: 0;
          }
        }
      \`}</style>
    </${wrapperTag}>
  );
}`;

  return {
    content,
    filename: `${downloadName}.tsx`,
  };
}
