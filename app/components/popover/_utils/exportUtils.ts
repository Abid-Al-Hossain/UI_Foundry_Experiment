import type { PopoverStudioState } from "../types";
import { ensureReadable, solidBg } from "@/app/components/controls/color/wcag";

export type ExportPayload = {
  fileName: string;
  mimeType: "text/plain;charset=utf-8";
  content: string;
};

export function buildExportPayload(state: PopoverStudioState, fileName = "popover"): ExportPayload {
  return {
    fileName: `${fileName || "popover"}.jsx`,
    mimeType: "text/plain;charset=utf-8",
    content: buildReactCode(state),
  };
}

// Keep exported text WCAG-readable, matching the live preview's enforcement.
function enforceContrast(s: PopoverStudioState): PopoverStudioState {
  return {
    ...s,
    headerText: ensureReadable(s.headerText, solidBg(s.headerBg, s.background)),
    actionText: ensureReadable(s.actionText, solidBg(s.accent, s.background)),
    foreground: ensureReadable(s.foreground, solidBg(s.footerBg, s.background)),
    closeColor: ensureReadable(s.closeColor, solidBg(s.closeBg, s.background)),
  };
}

export function buildReactCode(stateInput: PopoverStudioState) {
  const state = enforceContrast(stateInput);
  const serializedState = JSON.stringify(state, null, 2);
  return `import * as React from "react";

const config = ${serializedState};

const systemFonts = ${JSON.stringify(["Arial, system-ui","Consolas, \"Liberation Mono\", \"Courier New\", ui-monospace, monospace","\"Courier New\", ui-monospace, monospace","Georgia, ui-serif, serif","Helvetica, Arial, system-ui","Menlo, Monaco, Consolas, \"Liberation Mono\", ui-monospace, monospace","Monaco, Menlo, Consolas, \"Liberation Mono\", ui-monospace, monospace","Roboto, system-ui, -apple-system, Arial","\"Segoe UI\", system-ui, -apple-system, Arial","system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial","\"Times New Roman\", Times, ui-serif, serif","ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace","ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial","ui-serif, Georgia, Cambria, \"Times New Roman\", Times, serif"])};
function resolveFont(s) { return s.fontBucket === "google" ? '"' + s.googleFontFamily + '", sans-serif' : (systemFonts[s.systemFontIdx] || "system-ui"); }
function buildShadow(s) { if (!s.shadowEnabled) return "none"; var hex = Math.round(s.shadowOpacity * 255).toString(16).padStart(2, "0"); return s.shadowX + "px " + s.shadowY + "px " + s.shadowBlur + "px " + s.shadowSpread + "px " + s.shadowColor + hex; }

// Non-modal popover export: no dialog role, no focus trap, and no inert background.
// collisionPadding and sticky are design metadata here; no collision engine is bundled.
function getInitialOpen(settings) {
  if (settings.previewState === "closed" || settings.previewState === "disabled") return false;
  if (settings.previewState === "open" || settings.previewState === "hover" || settings.previewState === "focus" || settings.previewState === "collision") return true;
  return settings.defaultOpen;
}

function getPlacementStyle(settings, open) {
  const axisOffset = \`calc(100% + \${settings.offset}px)\`;
  const alignStyle =
    settings.align === "start"
      ? { left: 0 }
      : settings.align === "end"
        ? { right: 0 }
        : { left: "50%" };
  const crossAlignStyle =
    settings.align === "start"
      ? { top: 0 }
      : settings.align === "end"
        ? { bottom: 0 }
        : { top: "50%" };
  const translate =
    settings.side === "top" || settings.side === "bottom"
      ? settings.align === "center"
        ? "translateX(-50%)"
        : "translateX(0)"
      : settings.align === "center"
        ? "translateY(-50%)"
        : "translateY(0)";
  const closedShift =
    settings.side === "top"
      ? " translateY(6px)"
      : settings.side === "bottom"
        ? " translateY(-6px)"
        : settings.side === "left"
          ? " translateX(6px)"
          : " translateX(-6px)";
  const transform = \`\${translate}\${open ? "" : closedShift} scale(\${open ? 1 : 0.96})\`;

  if (settings.side === "top") {
    return { bottom: axisOffset, ...alignStyle, transform, transformOrigin: "bottom center" };
  }

  if (settings.side === "right") {
    return { left: axisOffset, ...crossAlignStyle, transform, transformOrigin: "left center" };
  }

  if (settings.side === "left") {
    return { right: axisOffset, ...crossAlignStyle, transform, transformOrigin: "right center" };
  }

  return { top: axisOffset, ...alignStyle, transform, transformOrigin: "top center" };
}

function getPanelStyle(settings, open) {
  return {
    position: "absolute",
    width: settings.sameWidth ? 260 : settings.width,
    maxHeight: settings.maxHeight,
    padding: settings.padding,
    display: "grid",
    gap: settings.gap,
    borderRadius: settings.radius,
    border: \`\${settings.borderWidth}px \${settings.borderStyle} \${settings.disabled && settings.disabledUseCustomColors ? settings.disabledBorder : settings.border}\`,
    boxShadow: \`0 \${Math.round(settings.shadow / 3)}px \${settings.shadow}px rgba(0,0,0,.34)\`,
    background: settings.background,
    color: settings.foreground,
    fontFamily: settings.fontFamily,
    opacity: open ? 1 : 0,
    pointerEvents: open ? "auto" : "none",
    transition: settings.reducedMotion ? "none" : \`all \${settings.duration}ms ease\`,
    overflow: "auto",
    zIndex: 2,
    ...getPlacementStyle(settings, open),
  };
}

function getArrowStyle(settings) {
  const size = settings.arrowSize;
  const shared = {
    position: "absolute",
    width: size,
    height: size,
    background: settings.background,
    borderColor: settings.border,
    borderStyle: settings.borderStyle,
    borderWidth: settings.borderWidth,
    borderRadius: settings.arrowShape === "rounded" ? Math.max(2, size / 4) : 1,
    clipPath: settings.arrowShape === "notch" ? "polygon(50% 0, 100% 100%, 0 100%)" : undefined,
    transform: "rotate(45deg)",
  };

  if (settings.side === "top") return { ...shared, bottom: -size / 2, left: "50%", marginLeft: -size / 2 };
  if (settings.side === "right") return { ...shared, left: -size / 2, top: "50%", marginTop: -size / 2 };
  if (settings.side === "left") return { ...shared, right: -size / 2, top: "50%", marginTop: -size / 2 };
  return { ...shared, top: -size / 2, left: "50%", marginLeft: -size / 2 };
}

export default function PopoverComponent() {
  const triggerRef = React.useRef(null);
  const rootRef = React.useRef(null);
  const [open, setOpen] = React.useState(() => getInitialOpen(config));
  const [triggerHovered, setTriggerHovered] = React.useState(false);
  const [closeHovered, setCloseHovered] = React.useState(false);
  const disabled = config.previewState === "disabled";

  React.useEffect(() => {
    setOpen(getInitialOpen(config));
  }, []);

  React.useEffect(() => {
    if (!open || !config.closeOnEscape) return;

    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  React.useEffect(() => {
    if (!open || !config.closeOnInteractOutside) return;

    const onPointerDown = (event) => {
      if (rootRef.current?.contains(event.target)) return;
      setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  React.useEffect(() => {
    if (!open || !config.closeOnScroll) return;

    const onScroll = () => setOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <div ref={rootRef} style={{ position: "relative", display: "inline-flex" }}>
      {config.showOverlay && open ? (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            background: \`rgba(2,6,23,\${config.overlayOpacity / 100})\`,
            pointerEvents: "none",
          }}
        />
      ) : null}

      <button
        ref={triggerRef}
        id={config.triggerId}
        type="button"
        aria-expanded={open}
        aria-controls={config.contentId}
        disabled={disabled}
        onClick={() => !disabled && setOpen((value) => !value)}
        onMouseEnter={() => !disabled && setTriggerHovered(true)}
        onMouseLeave={() => setTriggerHovered(false)}
        style={{
          border: 0,
          borderRadius: 12,
          padding: "12px 16px",
          fontWeight: 700,
          background: triggerHovered && !disabled ? config.triggerHoverBg : config.accent,
          color: triggerHovered && !disabled ? config.triggerHoverText : config.actionText,
          cursor: disabled ? config.disabledCursor : "pointer",
          opacity: disabled ? 0.55 : 1,
        }}
      >
        {config.triggerLabel}
      </button>

      <section
        id={config.contentId}
        aria-labelledby={config.labelledBy}
        aria-describedby={config.describedBy}
        aria-label={config.ariaLabel || undefined}
        role={config.role === "none" ? undefined : config.role}
        hidden={!open}
        data-side={config.side}
        data-align={config.align}
        style={getPanelStyle(config, open)}
      >
        {config.showArrow ? <span aria-hidden="true" style={getArrowStyle(config)} /> : null}

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, background: config.headerBg, padding: config.headerBg !== "transparent" ? 8 : 0, borderRadius: 12 }}>
          <div style={{ display: "grid", gap: 8 }}>
            <h3 id={config.labelledBy} style={{ margin: 0, fontSize: config.titleSize, fontWeight: config.fontWeight, color: config.headerText }}>
              {config.title}
            </h3>
            <p id={config.describedBy} style={{ margin: 0, color: config.muted }}>
              {config.description}
            </p>
            <p style={{ margin: 0, fontSize: config.bodySize }}>{config.body}</p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            onMouseEnter={() => setCloseHovered(true)}
            onMouseLeave={() => setCloseHovered(false)}
            style={{ border: 0, borderRadius: 999, padding: "4px 8px", lineHeight: 1, fontSize: 14, flexShrink: 0, background: closeHovered ? config.closeHoverBg : config.closeBg, color: config.closeColor }}
          >
            {"\\u00D7"}
          </button>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", background: config.footerBg, borderTop: config.footerBg !== "transparent" || config.footerBorder !== "transparent" ? \`1px solid \${config.footerBorder}\` : undefined, paddingTop: 8 }}>
          <button type="button" style={{ border: 0, borderRadius: 12, padding: "8px 16px", fontWeight: 700, background: config.accent, color: config.actionText }}>
            {config.primaryAction}
          </button>
          <button type="button" style={{ border: \`1px solid \${config.border}\`, borderRadius: 12, padding: "8px 16px", fontWeight: 700, background: "transparent", color: config.foreground }}>
            {config.secondaryAction}
          </button>
        </div>
      </section>
    </div>
  );
}
`;
}
