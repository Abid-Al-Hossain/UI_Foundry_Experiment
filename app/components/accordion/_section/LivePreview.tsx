"use client";

import { createElement, useState, type CSSProperties, type ReactNode } from "react";
import type { AccordionState } from "../types";
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

function shell(state: AccordionState): CSSProperties {
  return {
    width: state.width,
    minHeight: state.height,
    padding: state.padding,
    display: "grid",
    gap: state.gap,
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
    opacity: state.disabled ? state.disabledOpacity : 1,
    cursor: state.disabled ? state.disabledCursor : undefined,
  };
}

function ChevronIcon({ isOpen, motion, color, size }: { isOpen: boolean; motion: boolean; color: string; size: number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-flex",
        alignItems: "center",
        color,
        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        transition: motion ? "transform 0.25s ease" : "none",
        flexShrink: 0,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6l4 4 4-4" />
      </svg>
    </span>
  );
}

function PlusMinusIcon({ isOpen, color, size }: { isOpen: boolean; color: string; size: number }) {
  return (
    <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", color, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        {isOpen ? (
          <path d="M3 8h10" />
        ) : (
          <>
            <path d="M8 3v10" />
            <path d="M3 8h10" />
          </>
        )}
      </svg>
    </span>
  );
}

export default function LivePreview({ state }: { state: AccordionState }) {
  const itemCount = Math.max(1, Math.round(state.itemCount));
  const isMultiple = state.openMode === "multiple";
  const initialOpen = state.previewState === "closed" ? [] : isMultiple ? [0, 1].filter((index) => index < itemCount) : [0];
  const openConfiguration = `${itemCount}:${state.openMode}:${state.previewState}`;
  const [openState, setOpenState] = useState<{ configuration: string; items: number[] }>({
    configuration: openConfiguration,
    items: initialOpen,
  });
  const openItems = openState.configuration === openConfiguration ? openState.items : initialOpen;
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [focusIndex, setFocusIndex] = useState(-1);
  const headingTag = /^h[1-6]$/.test(state.headingLevel) ? state.headingLevel : "h3";

  const toggleItem = (index: number, disabled: boolean) => {
    if (state.disabled || disabled) return;

    setOpenState((currentState) => {
      const current = currentState.configuration === openConfiguration ? currentState.items : initialOpen;
      const isOpen = current.includes(index);
      const items = isMultiple
        ? isOpen
          ? current.filter((item) => item !== index)
          : [...current, index]
        : isOpen
          ? state.collapsible
            ? []
            : current
          : [index];
      return { configuration: openConfiguration, items };
    });
  };

  const renderHeading = (children: ReactNode) => createElement(headingTag, { style: { margin: 0 } }, children);

  return (
    <section
      id={state.id}
      role={state.role}
      aria-label={state.ariaLabel}
      tabIndex={state.disabled ? -1 : state.tabIndex}
      data-open-mode={state.openMode}
      data-disabled-items={state.disabledItems}
      style={shell(state)}
    >
      <div style={{ display: "grid", gap: 6 }}>
        <p style={{ margin: 0, color: state.accent, fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>{state.label}</p>
        <h2 style={{ margin: 0, fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h2>
        <p style={{ margin: 0, color: state.muted, fontSize: state.bodySize }}>{state.description}</p>
      </div>
      <div style={{ display: "grid", gap: state.itemGap }}>
        {Array.from({ length: itemCount }, (_, index) => {
          const disabled = index < state.disabledItems;
          const isOpen = openItems.includes(index);
          const isHover = hoverIndex === index && !disabled && !state.disabled;
          const isFocus = focusIndex === index && !disabled && !state.disabled;
          const buttonId = `${state.id}-trigger-${index + 1}`;
          const panelId = `${state.id}-panel-${index + 1}`;
          const triggerBg = isOpen ? state.triggerOpenBg : isFocus ? state.focusedTriggerBg : isHover ? state.hoverTriggerBg : state.triggerBg;
          const triggerColor = isOpen ? state.triggerOpenText : isHover ? state.hoverTriggerText : state.triggerText;
          const icon = state.triggerIcon === "plus"
            ? <PlusMinusIcon isOpen={isOpen} color={state.triggerIconColor} size={state.triggerIconSize} />
            : <ChevronIcon isOpen={isOpen} motion={state.transitionDuration > 0} color={state.triggerIconColor} size={state.triggerIconSize} />;
          const button = (
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              aria-disabled={disabled || state.disabled}
              disabled={disabled || state.disabled}
              onClick={() => toggleItem(index, disabled)}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(-1)}
              onFocus={() => setFocusIndex(index)}
              onBlur={() => setFocusIndex(-1)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: state.chevronPosition === "left" ? "row-reverse" : "row",
                gap: 12,
                minHeight: state.triggerHeight,
                padding: `${state.triggerPaddingY}px ${state.triggerPaddingX}px`,
                borderRadius: state.itemRadius,
                border: `${state.borderWidth}px solid ${isOpen ? state.openTriggerBorder : state.itemBorder}`,
                background: triggerBg,
                color: triggerColor,
                cursor: disabled || state.disabled ? "not-allowed" : "pointer",
                font: "inherit",
                opacity: disabled ? 0.5 : 1,
                textAlign: "left",
                transition: state.transitionDuration > 0 ? "background 0.2s ease, border-color 0.2s ease" : "none",
              }}
            >
              <span>{state.label} {index + 1}</span>
              {icon}
            </button>
          );

          return (
            <div key={panelId} data-accordion-item={index + 1}>
              {renderHeading(button)}
              <div
                aria-hidden={!isOpen || undefined}
                style={{
                  display: "grid",
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  transition: state.transitionDuration > 0 ? "grid-template-rows 0.25s ease" : "none",
                  overflow: "hidden",
                }}
              >
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  style={{
                    overflow: "hidden",
                    padding: `${state.panelPaddingY}px ${state.panelPaddingX}px`,
                    borderRadius: state.itemRadius,
                    background: state.panelBg,
                    color: state.panelText,
                    fontSize: state.bodySize,
                  }}
                >
                  <p style={{ margin: 0 }}>{state.helper} Item {index + 1} follows the same native button and panel structure used in export.</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
