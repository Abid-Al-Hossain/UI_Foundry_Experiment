"use client";

import { useEffect, useState } from "react";
import { contrastRatio, ensureReadable } from "./wcag";

type Rgba = { r: number; g: number; b: number; a: number };

type ContrastViolation = {
  text: string;
  ratio: number;
  required: number;
  suggestedColor: string;
};

function parseRgba(value: string): Rgba | null {
  const match = value.match(/rgba?\(([^)]+)\)/i);
  if (!match) return null;
  const parts = match[1].split(/[,\s/]+/).filter(Boolean).map(Number);
  if (parts.length < 3 || parts.slice(0, 3).some((part) => !Number.isFinite(part))) return null;
  return {
    r: parts[0],
    g: parts[1],
    b: parts[2],
    a: Number.isFinite(parts[3]) ? Math.min(1, Math.max(0, parts[3])) : 1,
  };
}

function composite(foreground: Rgba, background: Rgba): Rgba {
  const alpha = foreground.a + background.a * (1 - foreground.a);
  if (alpha <= 0) return { r: 0, g: 0, b: 0, a: 0 };
  return {
    r: (foreground.r * foreground.a + background.r * background.a * (1 - foreground.a)) / alpha,
    g: (foreground.g * foreground.a + background.g * background.a * (1 - foreground.a)) / alpha,
    b: (foreground.b * foreground.a + background.b * background.a * (1 - foreground.a)) / alpha,
    a: alpha,
  };
}

function toRgb(color: Rgba) {
  return `rgb(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)})`;
}

function renderedBackground(element: Element, root: Element): string | null {
  const chain: Element[] = [];
  let current: Element | null = element;
  while (current) {
    chain.push(current);
    if (current === root) break;
    current = current.parentElement;
  }

  let result: Rgba = { r: 11, g: 18, b: 32, a: 1 };
  for (const node of chain.reverse()) {
    const style = getComputedStyle(node);
    if (style.backgroundImage !== "none" || style.mixBlendMode !== "normal") return null;
    const layer = parseRgba(style.backgroundColor);
    if (layer && layer.a > 0) result = composite(layer, result);
  }
  return toRgb(result);
}

function hasOwnText(element: Element) {
  return Array.from(element.childNodes).some(
    (node) => node.nodeType === Node.TEXT_NODE && Boolean(node.textContent?.trim()),
  );
}

function sameViolations(a: ContrastViolation[], b: ContrastViolation[]) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export default function ContrastGuard({ min = 4.5 }: { min?: number }) {
  const [violations, setViolations] = useState<ContrastViolation[]>([]);

  useEffect(() => {
    const root =
      document.querySelector('[data-testid="preview-node-container"]') ??
      document.querySelector('[data-testid="preview-stage-preview"]');
    if (!root) return;

    let frame = 0;
    const scan = () => {
      frame = 0;
      const next: ContrastViolation[] = [];
      for (const element of Array.from(root.querySelectorAll<HTMLElement>("*"))) {
        if (next.length >= 8) break;
        if (element.closest('[aria-hidden="true"]') || !hasOwnText(element)) continue;

        const style = getComputedStyle(element);
        const foreground = parseRgba(style.color);
        const background = renderedBackground(element, root);
        if (!foreground || !background) continue;

        const compositedForeground = foreground.a < 1
          ? toRgb(composite(foreground, parseRgba(background) ?? { r: 11, g: 18, b: 32, a: 1 }))
          : style.color;
        const fontSize = Number.parseFloat(style.fontSize) || 16;
        const bold = (Number.parseInt(style.fontWeight, 10) || 400) >= 700;
        const required = fontSize >= 24 || (fontSize >= 18.66 && bold) ? 3 : min;
        const ratio = contrastRatio(compositedForeground, background);
        if (ratio >= required) continue;

        next.push({
          text: element.textContent?.trim().slice(0, 48) || "Text",
          ratio: Number(ratio.toFixed(2)),
          required,
          suggestedColor: ensureReadable(compositedForeground, background, required),
        });
      }
      setViolations((current) => (sameViolations(current, next) ? current : next));
    };
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(scan);
    };

    const observer = new MutationObserver(schedule);
    observer.observe(root, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["style", "class"],
      characterData: true,
    });
    root.addEventListener("transitionend", schedule, true);
    root.addEventListener("animationend", schedule, true);
    frame = requestAnimationFrame(scan);

    return () => {
      observer.disconnect();
      root.removeEventListener("transitionend", schedule, true);
      root.removeEventListener("animationend", schedule, true);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [min]);

  if (!violations.length) return null;

  const first = violations[0];
  return (
    <aside
      data-testid="contrast-diagnostics"
      role="status"
      className="fixed bottom-4 right-4 z-[100] max-w-sm rounded-xl border border-amber-400/50 bg-slate-950/95 px-4 py-3 text-xs text-amber-100 shadow-2xl"
    >
      <strong className="block text-sm">Contrast warning</strong>
      <span>
        {violations.length} preview text {violations.length === 1 ? "item" : "items"} may fail WCAG.
        {` “${first.text}” measures ${first.ratio}:1 (requires ${first.required}:1). Suggested ${first.suggestedColor}.`}
      </span>
    </aside>
  );
}
