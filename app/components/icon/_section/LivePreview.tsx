"use client";

import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { type IconState } from "../types";
import {
  getIconAnimateVariant,
  getIconEntranceAnimate,
  getIconEntranceInitial,
  getIconHoverVariant,
  resolveIconContainerStyle,
  resolveIconFocusOutline,
  resolveIconOuterTransform,
  resolveIconRole,
  resolveIconThreeDTransform,
} from "../_utils/iconVisuals";

const IconRenderer = ({
  name,
  custom,
  customSvg,
  size,
  strokeWidth,
  color,
  fill,
  fillOpacity,
  absoluteStrokeWidth,
  style,
  opacity,
}: {
  name: string;
  custom?: boolean;
  customSvg?: string;
  size: number;
  strokeWidth: number;
  color: string;
  fill: string;
  fillOpacity: number;
  absoluteStrokeWidth?: boolean;
  style?: React.CSSProperties;
  opacity: number;
}) => {
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

  const iconMap = LucideIcons as unknown as Record<
    string,
    React.ComponentType<Record<string, unknown>>
  >;
  const LucideIcon = iconMap[name];
  if (!LucideIcon) {
    return (
      <LucideIcons.HelpCircle
        size={size}
        strokeWidth={strokeWidth}
        color={color}
        fill={fill}
        fillOpacity={fillOpacity}
        absoluteStrokeWidth={absoluteStrokeWidth}
        style={style}
      />
    );
  }
  return (
    <LucideIcon
      size={size}
      strokeWidth={strokeWidth}
      color={color}
      fill={fill}
      fillOpacity={fillOpacity}
      absoluteStrokeWidth={absoluteStrokeWidth}
      style={style}
    />
  );
};

export default function LivePreview({ state }: { state: IconState }) {
  const uniqueId = React.useId();
  const gradId = `icon-grad-${uniqueId}`;
  const isGlass = state.glassBlur > 0;
  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const interactive = state.clickable && !state.disabled;
  const containerStyle = resolveIconContainerStyle(state);
  const focusOutline = isFocused ? resolveIconFocusOutline(state) : {};
  const hoverVariant = getIconHoverVariant(state.hoverEffect, state.color);
  const mergedHoverVariant = interactive ? { ...hoverVariant, scale: state.hoverScale } : hoverVariant;
  const animateVariant = getIconAnimateVariant(state);
  const entranceInitial = getIconEntranceInitial(state.entranceAnimation);
  const entranceAnimate = getIconEntranceAnimate(state.entranceAnimation);
  const transform2D = resolveIconOuterTransform(state);
  const role = resolveIconRole(state);
  const displayColor = state.disabled
    ? state.disabledColor
    : interactive && isPressed
      ? state.activeColor
      : interactive && isHovered
        ? state.hoverColor
        : state.color;
  const displayFill = interactive && isHovered ? state.hoverFillColor : state.fillColor;

  return (
    <div className="flex min-h-[300px] items-center justify-center p-10">
      <motion.div
        initial={entranceInitial}
        animate={entranceAnimate}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{
          perspective: state.use3D ? `${state.perspective}px` : undefined,
          transform: transform2D,
          transition: "transform 0.3s ease",
        }}
        aria-label={state.ariaHidden ? undefined : state.ariaLabel || undefined}
        aria-hidden={state.ariaHidden || undefined}
        role={role}
      >
        <motion.div
          tabIndex={interactive ? state.tabIndex : undefined}
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
            ...containerStyle,
            ...focusOutline,
            transform: resolveIconThreeDTransform(state),
          }}
          initial={false}
          animate={animateVariant}
          whileHover={interactive ? mergedHoverVariant : hoverVariant}
          whileTap={interactive ? { scale: state.activeScale } : undefined}
          transition={{
            duration: state.animationDuration,
            repeat: state.animationType !== "none" ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          {state.gradientEnabled && (
            <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
              <defs>
                {state.gradientType === "radial" ? (
                  <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={state.gradientStart} />
                    <stop offset="100%" stopColor={state.gradientEnd} />
                  </radialGradient>
                ) : (
                  <linearGradient
                    id={gradId}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                    gradientTransform={`rotate(${state.gradientAngle})`}
                  >
                    <stop offset="0%" stopColor={state.gradientStart} />
                    <stop offset="100%" stopColor={state.gradientEnd} />
                  </linearGradient>
                )}
              </defs>
            </svg>
          )}

          <IconRenderer
            name={state.iconName}
            custom={state.library === "custom"}
            customSvg={state.customSvg}
            size={state.size}
            color={state.gradientEnabled ? `url(#${gradId})` : displayColor}
            strokeWidth={state.strokeWidth}
            absoluteStrokeWidth
            fill={displayFill}
            fillOpacity={state.fillOpacity}
            opacity={state.opacity}
            style={{ opacity: state.opacity, transition: state.transitionDuration > 0 ? `color ${state.transitionDuration}ms ${state.transitionEasing}` : undefined }}
          />

          {isGlass && (
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/40 to-transparent opacity-50" />
          )}

          {state.reflectionEnabled && (
            <div
              className="pointer-events-none absolute inset-x-[12%] top-0 h-[38%] rounded-b-[45%]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.65), rgba(255,255,255,0))",
                opacity: 0.7,
              }}
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
