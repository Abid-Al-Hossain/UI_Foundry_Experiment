"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { PopoverStudioState } from "../types";
import { SYSTEM_FONTS } from "@/app/components/controls/typography/fontConstants";
import { ensureReadable, solidBg } from "@/app/components/controls/color/wcag";

function resolveFont(state: { fontBucket: "system" | "google"; googleFontFamily: string; systemFontIdx: number }): string {
  return state.fontBucket === "google"
    ? `"${state.googleFontFamily}", sans-serif`
    : (SYSTEM_FONTS[state.systemFontIdx]?.css ?? "inherit");
}

function buildShadow(state: { shadowEnabled: boolean; shadowX: number; shadowY: number; shadowBlur: number; shadowSpread: number; shadowColor: string; shadowOpacity: number }): string {
  if (!state.shadowEnabled) return "none";
  const hex = Math.round(state.shadowOpacity * 255).toString(16).padStart(2, "0");
  return `${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${state.shadowSpread}px ${state.shadowColor}${hex}`;
}

function buildRadius(state: { radiusLinked: boolean; radius: number; radiusTL: number; radiusTR: number; radiusBR: number; radiusBL: number }): string {
  return state.radiusLinked
    ? `${state.radius}px`
    : `${state.radiusTL}px ${state.radiusTR}px ${state.radiusBR}px ${state.radiusBL}px`;
}

function getInitialOpen(state: PopoverStudioState) {
  if (state.previewState === "closed" || state.previewState === "disabled") return false;
  if (state.previewState === "open" || state.previewState === "hover" || state.previewState === "focus" || state.previewState === "collision") return true;
  return state.defaultOpen;
}

function getPlacementStyle(state: PopoverStudioState, open: boolean): CSSProperties {
  const axisOffset = `calc(100% + ${state.offset}px)`;
  const alignStyle =
    state.align === "start"
      ? { left: 0 }
      : state.align === "end"
        ? { right: 0 }
        : { left: "50%" };
  const crossAlignStyle =
    state.align === "start"
      ? { top: 0 }
      : state.align === "end"
        ? { bottom: 0 }
        : { top: "50%" };
  const translate =
    state.side === "top" || state.side === "bottom"
      ? state.align === "center"
        ? "translateX(-50%)"
        : "translateX(0)"
      : state.align === "center"
        ? "translateY(-50%)"
        : "translateY(0)";
  const closedShift =
    state.side === "top"
      ? " translateY(6px)"
      : state.side === "bottom"
        ? " translateY(-6px)"
        : state.side === "left"
          ? " translateX(6px)"
          : " translateX(-6px)";
  const scale = open ? " scale(1)" : " scale(.96)";
  const transform = `${translate}${open ? "" : closedShift}${scale}`;

  if (state.side === "top") {
    return { bottom: axisOffset, ...alignStyle, transform, transformOrigin: "bottom center" };
  }

  if (state.side === "right") {
    return { left: axisOffset, ...crossAlignStyle, transform, transformOrigin: "left center" };
  }

  if (state.side === "left") {
    return { right: axisOffset, ...crossAlignStyle, transform, transformOrigin: "right center" };
  }

  return { top: axisOffset, ...alignStyle, transform, transformOrigin: "top center" };
}

function panelStyle(state: PopoverStudioState, open: boolean): CSSProperties {
  return {
    width: state.sameWidth ? 260 : state.width,
    maxHeight: state.maxHeight,
    padding: state.padding,
    gap: state.gap,
    borderRadius: buildRadius(state),
    border: `${state.borderWidth}px ${state.borderStyle} ${state.disabled && state.disabledUseCustomColors ? state.disabledBorder : state.border}`,
    boxShadow: `${buildShadow(state)}`,
    background: state.disabled && state.disabledUseCustomColors ? state.disabledBg : state.background,
    color: state.foreground,
    fontFamily: resolveFont(state),
    fontStyle: state.fontStyle,
    textTransform: state.textTransform,
    textDecoration: state.textDecoration,
    letterSpacing: `${state.letterSpacing}${state.letterSpacingUnit}`,
    lineHeight: state.lineHeight,
    opacity: open ? 1 : 0,
    pointerEvents: open ? "auto" : "none",
    transition: state.reducedMotion ? "none" : `all ${state.duration}ms ease`,
    overflow: "auto",
    zIndex: 2,
    ...getPlacementStyle(state, open),
  };
}

function arrowStyle(state: PopoverStudioState): CSSProperties {
  const size = state.arrowSize;
  const shared: CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    background: state.disabled && state.disabledUseCustomColors ? state.disabledBg : state.background,
    borderColor: state.border,
    borderStyle: "solid",
    borderWidth: state.borderWidth,
    borderRadius: state.arrowShape === "rounded" ? Math.max(2, size / 4) : 1,
    clipPath: state.arrowShape === "notch" ? "polygon(50% 0, 100% 100%, 0 100%)" : undefined,
    transform: "rotate(45deg)",
  };

  if (state.side === "top") return { ...shared, bottom: -size / 2, left: "50%", marginLeft: -size / 2 };
  if (state.side === "right") return { ...shared, left: -size / 2, top: "50%", marginTop: -size / 2 };
  if (state.side === "left") return { ...shared, right: -size / 2, top: "50%", marginTop: -size / 2 };
  return { ...shared, top: -size / 2, left: "50%", marginLeft: -size / 2 };
}

export default function LivePreview({ state }: { state: PopoverStudioState }) {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(() => getInitialOpen(state));
  const [triggerHovered, setTriggerHovered] = useState(false);
  const [closeHovered, setCloseHovered] = useState(false);
  const disabled = state.previewState === "disabled";

  useEffect(() => {
    setOpen(getInitialOpen(state));
  }, [state]);

  useEffect(() => {
    if (!open || !state.closeOnEscape) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, state.closeOnEscape]);

  useEffect(() => {
    if (!open || !state.closeOnInteractOutside) return;

    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return;
      setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, state.closeOnInteractOutside]);

  useEffect(() => {
    if (!open || !state.closeOnScroll) return;

    const onScroll = () => setOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open, state.closeOnScroll]);

  return (
    <div className="relative grid min-h-[420px] place-items-center" data-testid="live-preview-root">
      {state.showOverlay && open && <div aria-hidden="true" className="absolute inset-0 rounded-3xl" style={{ background: `rgba(2,6,23,${state.overlayOpacity / 100})` }} />}
      <div ref={rootRef} className="relative inline-flex">
        <button
          ref={triggerRef}
          id={state.triggerId}
          type="button"
          aria-expanded={open}
          aria-controls={state.contentId}
          disabled={disabled}
          onClick={() => !disabled && setOpen((value) => !value)}
          onMouseEnter={() => !disabled && setTriggerHovered(true)}
          onMouseLeave={() => setTriggerHovered(false)}
          className="rounded-xl px-4 py-3 font-bold transition disabled:cursor-not-allowed disabled:opacity-55"
          data-testid="live-preview-trigger"
          style={(() => { const tBg = triggerHovered && !disabled ? state.triggerHoverBg : state.accent; const tFg = triggerHovered && !disabled ? state.triggerHoverText : state.actionText; return { background: tBg, color: ensureReadable(tFg, solidBg(tBg, state.accent)) }; })()}
        >
          {state.triggerLabel}
        </button>
      <section
        id={state.contentId}
        aria-labelledby={state.labelledBy}
        aria-describedby={state.describedBy}
        aria-label={state.ariaLabel || undefined}
        role={state.role === "none" ? undefined : state.role}
        hidden={!open}
        style={panelStyle(state, open)}
        className="absolute grid"
        data-side={state.side}
        data-align={state.align}
        data-testid="live-preview-panel"
      >
        {state.showArrow && <span aria-hidden="true" style={arrowStyle(state)} />}
        <div className="flex items-start justify-between gap-2 rounded-xl" style={{ background: state.headerBg, padding: state.headerBg !== "transparent" ? 8 : 0 }}>
          <div className="grid gap-2">
            <h3 id={state.labelledBy} style={{ fontSize: state.titleSize, fontWeight: state.fontWeight, color: ensureReadable(state.headerText, solidBg(state.headerBg, state.background)) }}>{state.title}</h3>
            <p id={state.describedBy} style={{ color: state.muted }}>{state.description}</p>
            <p style={{ fontSize: state.bodySize }}>{state.body}</p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            onMouseEnter={() => setCloseHovered(true)}
            onMouseLeave={() => setCloseHovered(false)}
            className="rounded-full px-2 py-1 text-sm leading-none"
            style={{ background: closeHovered ? state.closeHoverBg : state.closeBg, color: ensureReadable(state.closeColor, solidBg(closeHovered ? state.closeHoverBg : state.closeBg, state.background)), flexShrink: 0 }}
          >
            ×
          </button>
        </div>
        <div className="flex gap-2 rounded-xl" style={{ background: state.footerBg, borderTop: state.footerBg !== "transparent" || state.footerBorder !== "transparent" ? `1px solid ${state.footerBorder}` : undefined, paddingTop: 8 }}>
          <button type="button" className="rounded-xl px-4 py-2 text-sm font-bold" style={{ background: state.accent, color: ensureReadable(state.actionText, solidBg(state.accent, state.background)) }}>{state.primaryAction}</button>
          <button type="button" className="rounded-xl border px-4 py-2 text-sm font-bold" style={{ borderColor: state.border, color: ensureReadable(state.foreground, solidBg(state.footerBg, state.background)) }}>{state.secondaryAction}</button>
        </div>
        <p className="text-xs" style={{ color: state.muted }}>side={state.side}, align={state.align}, offset={state.offset}px, escape={String(state.closeOnEscape)}, outside={String(state.closeOnInteractOutside)}, scroll={String(state.closeOnScroll)}</p>
      </section>
      </div>
    </div>
  );
}
