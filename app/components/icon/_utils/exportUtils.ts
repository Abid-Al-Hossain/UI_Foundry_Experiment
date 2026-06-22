import type { IconState } from "../types";
import {
  getIconAnimateVariant,
  getIconEntranceAnimate,
  getIconEntranceInitial,
  getIconHoverVariant,
  resolveIconContainerBackground,
  resolveIconContainerRadius,
  resolveIconBoxShadow,
  resolveIconOuterTransform,
  resolveIconRole,
  resolveIconThreeDTransform,
} from "./iconVisuals";

type IconExportInput = IconState & {
  downloadName: string;
};

export const buildIconExportPayload = ({
  downloadName,
  ...state
}: IconExportInput) => {
  const filename = `${downloadName || "icon-component"}.tsx`;
  const serializedState = JSON.stringify(state, null, 2);
  const containerBackground = resolveIconContainerBackground(state);
  const containerRadius = resolveIconContainerRadius(state);
  const containerBoxShadow = resolveIconBoxShadow(state);
  const outerTransform = resolveIconOuterTransform(state);
  const threeDTransform = resolveIconThreeDTransform(state);
  const hoverVariant = JSON.stringify(getIconHoverVariant(state.hoverEffect, state.color));
  const animateVariant = JSON.stringify(getIconAnimateVariant(state));
  const entranceInitial = getIconEntranceInitial(state.entranceAnimation);
  const entranceAnimate = getIconEntranceAnimate(state.entranceAnimation);
  const resolvedRole = resolveIconRole(state);

  const content = `import React from "react";
import * as LucideIcons from "lucide-react";
import { motion } from "framer-motion";

const STATE = ${serializedState};

function IconRenderer({
  name,
  customSvg,
  custom,
  size,
  strokeWidth,
  color,
  fillColor,
  fillOpacity,
  opacity,
}) {
  if (custom && customSvg) {
    return (
      <span
        style={{
          width: size,
          height: size,
          color,
          opacity,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        dangerouslySetInnerHTML={{ __html: customSvg }}
      />
    );
  }

  const LucideIcon = LucideIcons[name] || LucideIcons.HelpCircle;
  return (
    <LucideIcon
      size={size}
      strokeWidth={strokeWidth}
      absoluteStrokeWidth
      color={color}
      fill={fillColor}
      fillOpacity={fillOpacity}
      style={{ opacity }}
    />
  );
}

export default function CustomIcon() {
  const s = STATE;
  const gradId = "icon-grad";
  const hasAnimation = s.animationType !== "none";
  const entranceInitial = ${entranceInitial ? JSON.stringify(entranceInitial) : "undefined"};
  const entranceAnimate = ${JSON.stringify(entranceAnimate)};
  const hoverVariant = s.hoverEffect !== "none" ? ${hoverVariant} : {};
  const animateVariant = hasAnimation ? ${animateVariant} : {};
  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const interactive = s.clickable && !s.disabled;
  const mergedHoverVariant = interactive ? { ...hoverVariant, scale: s.hoverScale } : hoverVariant;
  const displayColor = s.disabled
    ? s.disabledColor
    : interactive && isPressed
      ? s.activeColor
      : interactive && isHovered
        ? s.hoverColor
        : s.color;
  const displayFill = interactive && isHovered ? s.hoverFillColor : s.fillColor;
  const focusOutline = isFocused && s.focusRingEnabled && interactive
    ? { outline: \`\${s.focusRingWidth}px solid \${s.focusRingColor}\`, outlineOffset: s.focusRingOffset }
    : {};

  return (
    <div
      style={{
        minHeight: 280,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        initial={entranceInitial}
        animate={entranceAnimate}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{
          perspective: s.use3D ? \`\${s.perspective}px\` : undefined,
          transform: ${JSON.stringify(outerTransform)},
          transition: "transform 240ms ease",
        }}
        aria-label={${state.ariaHidden ? "undefined" : JSON.stringify(state.ariaLabel || undefined)}}
        aria-hidden={${state.ariaHidden ? "true" : "undefined"}}
        role={${resolvedRole ? JSON.stringify(resolvedRole) : "undefined"}}
      >
        <motion.div
          tabIndex={interactive ? s.tabIndex : undefined}
          onMouseEnter={() => interactive && setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsPressed(false);
          }}
          onPointerDown={() => interactive && setIsPressed(true)}
          onPointerUp={() => setIsPressed(false)}
          onFocus={() => interactive && setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: s.shape === "none" ? "auto" : \`\${s.containerSize}px\`,
            height: s.shape === "none" ? "auto" : \`\${s.containerSize}px\`,
            padding: s.shape === "none" ? 0 : \`\${s.containerPadding}px\`,
            background: ${JSON.stringify(containerBackground)},
            border: s.shape === "none" ? "none" : \`\${s.borderWidth}px \${s.borderStyle} \${s.borderColor}\`,
            borderRadius: ${JSON.stringify(containerRadius)},
            boxShadow: ${JSON.stringify(containerBoxShadow)},
            backdropFilter: s.glassBlur > 0 ? \`blur(\${s.glassBlur}px)\` : undefined,
            WebkitBackdropFilter: s.glassBlur > 0 ? \`blur(\${s.glassBlur}px)\` : undefined,
            overflow: "hidden",
            transform: ${threeDTransform ? JSON.stringify(threeDTransform) : "undefined"},
            transformStyle: "preserve-3d",
            opacity: s.disabled ? s.disabledOpacity : 1,
            cursor: s.disabled ? s.disabledCursor : s.clickable ? s.cursorType : undefined,
            pointerEvents: s.disabled ? "none" : undefined,
            transition: s.transitionDuration > 0 ? \`transform \${s.transitionDuration}ms \${s.transitionEasing}, box-shadow \${s.transitionDuration}ms \${s.transitionEasing}\` : undefined,
            ...focusOutline,
          }}
          initial={false}
          animate={animateVariant}
          whileHover={interactive ? mergedHoverVariant : hoverVariant}
          whileTap={interactive ? { scale: s.activeScale } : undefined}
          transition={{
            duration: s.animationDuration,
            repeat: hasAnimation && s.animationRepeat ? Infinity : 0,
            delay: s.animationDelay,
            ease: "easeInOut",
          }}
        >
          {s.gradientEnabled ? (
            <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
              <defs>
                {s.gradientType === "radial" ? (
                  <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={s.gradientStart} />
                    <stop offset="100%" stopColor={s.gradientEnd} />
                  </radialGradient>
                ) : (
                  <linearGradient id={gradId} gradientTransform={\`rotate(\${s.gradientAngle})\`}>
                    <stop offset="0%" stopColor={s.gradientStart} />
                    <stop offset="100%" stopColor={s.gradientEnd} />
                  </linearGradient>
                )}
              </defs>
            </svg>
          ) : null}

          <IconRenderer
            name={s.iconName}
            custom={s.library === "custom"}
            customSvg={s.customSvg}
            size={s.size}
            strokeWidth={s.strokeWidth}
            color={s.gradientEnabled ? \`url(#\${gradId})\` : displayColor}
            fillColor={displayFill}
            fillOpacity={s.fillOpacity}
            opacity={s.opacity}
          />

          {s.glassBlur > 0 ? (
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "inherit",
                pointerEvents: "none",
                background: "linear-gradient(to bottom right, rgba(255,255,255,0.4), transparent)",
                opacity: 0.5,
              }}
            />
          ) : null}

          {s.reflectionEnabled ? (
            <div
              style={{
                position: "absolute",
                inset: "0 12% auto 12%",
                height: "38%",
                borderBottomLeftRadius: "45%",
                borderBottomRightRadius: "45%",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.65), rgba(255,255,255,0))",
                opacity: 0.7,
                pointerEvents: "none",
              }}
            />
          ) : null}
        </motion.div>
      </motion.div>
    </div>
  );
}
`;

  return { filename, content };
};
