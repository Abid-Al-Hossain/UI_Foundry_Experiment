"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { DrawerState } from "../types";
import { SYSTEM_FONTS } from "@/app/components/controls/typography/fontConstants";

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

function isInitiallyOpen(state: DrawerState) {
  return state.defaultOpen ?? state.previewState === "open";
}

function getClosedTransform(state: DrawerState): string {
  if (state.animationType === "fade") return "translate(0,0)";
  if (state.animationType === "scale") return "scale(0.96)";
  if (state.side === "left") return "translateX(-100%)";
  if (state.side === "right") return "translateX(100%)";
  if (state.side === "top") return "translateY(-100%)";
  return "translateY(100%)";
}

function overlayColor(state: DrawerState): string {
  if (!/^#[0-9a-fA-F]{6}$/.test(state.overlayBg)) return state.overlayBg;
  return state.overlayBg + Math.round(Math.max(0, Math.min(1, state.overlayOpacity)) * 255).toString(16).padStart(2, "0");
}

function panelStyle(state: DrawerState, open: boolean): CSSProperties {
  const horizontal = state.side === "left" || state.side === "right";
  return {
    position: "fixed",
    top: state.side === "bottom" ? "auto" : 16,
    right: state.side === "left" ? "auto" : 16,
    bottom: state.side === "top" ? "auto" : 16,
    left: state.side === "right" ? "auto" : 16,
    width: horizontal ? state.width : "calc(100% - 32px)",
    maxWidth: "calc(100vw - 32px)",
    height: horizontal ? "calc(100% - 32px)" : state.height,
    minHeight: horizontal ? "calc(100% - 32px)" : state.height,
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    overflow: "hidden",
    borderRadius: buildRadius(state),
    border: `${state.borderWidth}px ${state.borderStyle} ${state.disabled && state.disabledUseCustomColors ? state.disabledBorder : state.border}`,
    boxShadow: buildShadow(state),
    background: state.disabled && state.disabledUseCustomColors ? state.disabledBg : state.background,
    color: state.foreground,
    fontFamily: resolveFont(state),
    fontStyle: state.fontStyle,
    textTransform: state.textTransform,
    textDecoration: state.textDecoration,
    letterSpacing: `${state.letterSpacing}${state.letterSpacingUnit}`,
    lineHeight: state.lineHeight,
    opacity: state.disabled ? state.disabledOpacity : open ? 1 : state.animationType === "fade" ? 0 : 1,
    cursor: state.disabled ? state.disabledCursor : undefined,
    transform: open ? "translate(0,0)" : getClosedTransform(state),
    transition: state.transitionDuration > 0 ? "transform 320ms cubic-bezier(.32,.72,0,1), opacity 320ms ease" : "none",
  };
}

export default function LivePreview({ state }: { state: DrawerState }) {
  const initialOpen = isInitiallyOpen(state);
  const [open, setOpen] = useState(initialOpen);
  const [closeHover, setCloseHover] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = `${state.id}-title`;
  const descriptionId = `${state.id}-description`;
  const horizontal = state.side === "left" || state.side === "right";

  useEffect(() => setOpen(initialOpen), [initialOpen]);

  useEffect(() => {
    if (!open || !state.closeOnEscape) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, state.closeOnEscape]);

  const closeDrawer = () => {
    setOpen(false);
    if (state.focusReturn) requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <div className="relative min-h-[460px] overflow-hidden rounded-[2rem] border p-6" style={{ borderColor: state.border, background: "linear-gradient(135deg, rgba(15,23,42,.92), rgba(30,41,59,.74))" }}>
      <button ref={triggerRef} type="button" disabled={state.disabled} onClick={() => setOpen(true)} className="rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg" style={{ background: state.accent, color: state.actionText }}>
        {state.triggerLabel || "Open drawer"}
      </button>
      <p className="mt-4 max-w-md text-sm" style={{ color: state.muted }}>Preview state: {open ? "open" : "closed"}. Escape close is {state.closeOnEscape ? "enabled" : "disabled"}; outside close is {state.closeOnOutside ? "enabled" : "disabled"}.</p>
      <div
        onMouseDown={(event) => {
          if (open && state.closeOnOutside && event.target === event.currentTarget) closeDrawer();
        }}
        className="absolute inset-0"
        style={{
          pointerEvents: open ? "auto" : "none",
          background: open && state.showOverlay ? overlayColor(state) : "transparent",
          transition: state.transitionDuration > 0 ? "background 320ms ease" : "none",
        }}
      >
        <section
          role="dialog"
          aria-modal={state.modal}
          aria-label={state.ariaLabel}
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          tabIndex={state.tabIndex}
          style={panelStyle(state, open)}
        >
          <header className="flex items-center justify-between" style={{ padding: state.padding, background: state.headerBg, color: state.headerText, borderBottom: `1px solid ${state.headerBorder}` }}>
            <h3 id={titleId} style={{ margin: 0, fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
            <button
              type="button"
              aria-label="Close drawer"
              onClick={closeDrawer}
              onMouseEnter={() => setCloseHover(true)}
              onMouseLeave={() => setCloseHover(false)}
              className="grid place-items-center rounded-full"
              style={{ width: state.closeIconSize + 16, height: state.closeIconSize + 16, background: closeHover ? state.closeIconHoverBg : "transparent", color: state.closeIconColor }}
            >
              <svg aria-hidden="true" width={state.closeIconSize} height={state.closeIconSize} viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </button>
          </header>
          <div style={{ padding: state.padding, display: "grid", gap: state.gap, position: "relative" }}>
            {state.handleVisible && !horizontal ? <span aria-hidden="true" style={{ position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)", width: state.handleWidth, height: 4, borderRadius: 999, background: state.handleColor }} /> : null}
            {state.handleVisible && horizontal ? <span aria-hidden="true" style={{ position: "absolute", top: "50%", [state.side === "left" ? "right" : "left"]: 6, transform: "translateY(-50%)", width: 4, height: state.handleWidth, borderRadius: 999, background: state.handleColor } as CSSProperties} /> : null}
            <p id={descriptionId} style={{ margin: 0, color: state.muted, fontSize: state.bodySize }}>{state.description}</p>
            <div style={{ height: 1, background: state.dividerColor }} />
            <p className="text-xs" style={{ color: state.muted }}>{state.helper} Focus trap is not implemented; focus return is {state.focusReturn ? "enabled" : "disabled"}.</p>
          </div>
          <footer className="flex flex-wrap justify-end gap-2" style={{ padding: state.padding, background: state.footerBg, borderTop: `1px solid ${state.footerBorder}` }}>
            <button type="button" className="rounded-xl px-4 py-2" style={{ background: state.primaryBg, color: state.primaryText }}>{state.label}</button>
            <button type="button" className="rounded-xl border px-4 py-2" style={{ background: state.secondaryBg, color: state.secondaryText, borderColor: state.secondaryBorder }}>Cancel</button>
          </footer>
        </section>
      </div>
    </div>
  );
}
