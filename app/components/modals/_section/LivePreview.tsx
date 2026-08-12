"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { ModalState } from "../types";
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

function isInitiallyOpen(state: ModalState) {
  return state.defaultOpen ?? state.previewState === "open";
}

const VARIANT_WIDTH: Record<string, number | string> = { sm: 420, md: 560, lg: 720, xl: 920, full: "calc(100vw - 48px)" };

function overlayColor(state: ModalState): string {
  const hex = Math.round(Math.max(0, Math.min(1, state.overlayOpacity)) * 255).toString(16).padStart(2, "0");
  return `${state.overlayBg}${hex}`;
}

const ANIMATION_NAME: Record<string, string> = { fade: "modalFade", scale: "modalScale", "slide-up": "modalSlideUp", "slide-down": "modalSlideDown" };

function panelStyle(state: ModalState): CSSProperties {
  return {
    width: state.width,
    maxWidth: VARIANT_WIDTH[state.widthVariant] ?? "calc(100vw - 48px)",
    maxHeight: state.maxHeight,
    overflowY: state.scrollable ? "auto" : "visible",
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    gap: 0,
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
    overflow: "hidden",
    opacity: state.disabled ? state.disabledOpacity : 1,
    cursor: state.disabled ? state.disabledCursor : undefined,
    animation: state.transitionDuration > 0 ? `${ANIMATION_NAME[state.animationType] ?? "modalScale"} ${state.transitionDuration}ms ease` : undefined,
  };
}

export default function LivePreview({ state }: { state: ModalState }) {
  const initialOpen = isInitiallyOpen(state);
  const openConfiguration = `${state.previewState}:${state.defaultOpen ?? "auto"}:${state.disabled}`;
  const [openState, setOpenState] = useState({ configuration: openConfiguration, open: initialOpen });
  const open = openState.configuration === openConfiguration ? openState.open : initialOpen;
  const [closeHover, setCloseHover] = useState(false);
  const [primaryHover, setPrimaryHover] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const titleId = `${state.id}-title`;
  const descriptionId = `${state.id}-description`;
  const placement = state.placement ?? "center";

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusableSelector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusFirst = () => {
      const focusable = dialog.querySelectorAll<HTMLElement>(focusableSelector);
      (focusable[0] ?? dialog).focus();
    };
    requestAnimationFrame(focusFirst);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && state.closeOnEscape) {
        event.preventDefault();
        setOpenState({ configuration: openConfiguration, open: false });
        if (state.focusReturn) requestAnimationFrame(() => triggerRef.current?.focus());
        return;
      }
      if (event.key !== "Tab" || !state.modal) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector));
      if (!focusable.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, openConfiguration, state.closeOnEscape, state.focusReturn, state.modal]);

  const setModalOpen = (nextOpen: boolean) => {
    setOpenState({ configuration: openConfiguration, open: nextOpen });
  };

  const closeModal = () => {
    setModalOpen(false);
    if (state.focusReturn) requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <div className="relative min-h-[460px] overflow-hidden rounded-[2rem] border p-6" style={{ borderColor: state.border, background: "linear-gradient(135deg, rgba(2,6,23,.94), rgba(30,41,59,.72))" }}>
      <button ref={triggerRef} type="button" disabled={state.disabled} onClick={() => setModalOpen(true)} className="rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg" style={{ background: state.accent, color: state.actionText }}>
        {state.triggerLabel || "Open modal"}
      </button>
      <p className="mt-4 max-w-md text-sm" style={{ color: state.muted }}>Preview state: {open ? "open" : "closed"}. Escape close is {state.closeOnEscape ? "enabled" : "disabled"}; outside close is {state.closeOnOutside ? "enabled" : "disabled"}.</p>
      <p aria-live="polite" className="mt-2 text-xs" style={{ color: state.muted }}>{actionMessage}</p>
      {open && (
        <div
          onMouseDown={(event) => {
            if (state.closeOnOutside && event.target === event.currentTarget) closeModal();
          }}
          className="absolute inset-0 grid p-6"
          style={{
            placeItems: placement === "center" ? "center" : placement === "top" ? "start center" : "end center",
            background: state.showOverlay ? overlayColor(state) : "transparent",
            transition: state.transitionDuration > 0 ? "background 0.2s ease" : "none",
          }}
        >
          <style>{`
@keyframes modalFade { from { opacity: 0 } to { opacity: 1 } }
@keyframes modalScale { from { opacity: 0; transform: scale(0.94) } to { opacity: 1; transform: scale(1) } }
@keyframes modalSlideUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
@keyframes modalSlideDown { from { opacity: 0; transform: translateY(-16px) } to { opacity: 1; transform: translateY(0) } }
`}</style>
          <section ref={dialogRef} role="dialog" aria-modal={state.modal ? true : undefined} aria-label={state.ariaLabel} aria-labelledby={titleId} aria-describedby={descriptionId} tabIndex={state.tabIndex} style={panelStyle(state)}>
            <header className="flex items-center justify-between" style={{ padding: state.padding, background: state.headerBg, color: state.headerText, borderBottom: `1px solid ${state.headerBorder}` }}>
              <h3 id={titleId} style={{ margin: 0, fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
              <button
                type="button"
                aria-label="Close modal"
                onClick={closeModal}
                onMouseEnter={() => setCloseHover(true)}
                onMouseLeave={() => setCloseHover(false)}
                className="grid place-items-center rounded-full"
                style={{ width: state.closeIconSize + 16, height: state.closeIconSize + 16, background: closeHover ? state.closeIconHoverBg : "transparent", color: state.closeIconColor }}
              >
                <svg aria-hidden="true" width={state.closeIconSize} height={state.closeIconSize} viewBox="0 0 16 16" fill="none">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </header>
            <div style={{ padding: state.padding, display: "grid", gap: state.gap }}>
              <p id={descriptionId} style={{ margin: 0, color: state.muted, fontSize: state.bodySize }}>{state.description}</p>
              <div style={{ height: 1, background: state.dividerColor }} />
              <p className="text-xs" style={{ color: state.muted }}>{state.helper} Keyboard focus enters the dialog and {state.modal ? "is contained until dismissal" : "may leave this non-modal dialog"}.</p>
            </div>
            <footer className={state.actionLayout === "column" ? "grid gap-2" : "flex flex-wrap justify-end gap-2"} style={{ padding: state.padding, background: state.footerBg, borderTop: `1px solid ${state.footerBorder}` }}>
              <button
                type="button"
                onClick={() => {
                  setActionMessage("Primary action activated.");
                  closeModal();
                }}
                onMouseEnter={() => setPrimaryHover(true)}
                onMouseLeave={() => setPrimaryHover(false)}
                className="rounded-xl px-4 py-2"
                style={{ background: primaryHover ? state.primaryHoverBg : state.primaryBg, color: state.primaryText }}
              >
                {state.label}
              </button>
              <button type="button" onClick={closeModal} className="rounded-xl border px-4 py-2" style={{ background: state.secondaryBg, color: state.secondaryText, borderColor: state.secondaryBorder }}>Cancel</button>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
}
