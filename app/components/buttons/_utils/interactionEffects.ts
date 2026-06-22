"use client";

import { clamp, norm } from "./colorUtils";

export type ClickEffectProfile = {
  kind: "none" | "ripple" | "burst";
  particleCount: number;
  distanceMin: number;
  distanceMax: number;
  angleJitter: number;
  widthMin: number;
  widthMax: number;
  heightMin: number;
  heightMax: number;
  scaleMin: number;
  scaleMax: number;
  rotationJitter: number;
  borderRadius: string;
  durationMs: number;
};

function parseRgbaAlpha(value: string) {
  const match = value.match(
    /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\)$/i,
  );
  if (!match) return null;
  return clamp(Number(match[1]), 0, 1);
}

function normalizeBurstColor(value: string) {
  const raw = (value || "").trim();
  if (!raw) return null;
  if (raw.toLowerCase() === "transparent") return null;
  if (/gradient\(/i.test(raw)) return null;

  const rgbaAlpha = parseRgbaAlpha(raw);
  if (rgbaAlpha != null) {
    return rgbaAlpha >= 0.18 ? raw : null;
  }

  if (/^rgb\(/i.test(raw)) return raw;

  const normalized = norm(raw);
  return normalized.ok ? normalized.hex : null;
}

function getFallbackBurstColors(effect: string) {
  if (effect === "confetti") {
    return ["#60a5fa", "#10b981", "#f97316", "#f43f5e", "#facc15", "#ffffff"];
  }

  if (effect === "explosion") {
    return ["#111827", "#334155", "#f97316", "#fb7185", "#60a5fa", "#ffffff"];
  }

  return ["#111827", "#60a5fa", "#ffffff"];
}

export function getSafeBurstColors(effect: string, colors: string[]) {
  const unique = Array.from(
    new Set(colors.map(normalizeBurstColor).filter(Boolean) as string[]),
  );

  return unique.length >= 3 ? unique : getFallbackBurstColors(effect);
}

export function getClickEffectProfile(effect: string, requestedCount: number): ClickEffectProfile {
  if (effect === "none") {
    return {
      kind: "none",
      particleCount: 0,
      distanceMin: 0,
      distanceMax: 0,
      angleJitter: 0,
      widthMin: 0,
      widthMax: 0,
      heightMin: 0,
      heightMax: 0,
      scaleMin: 0,
      scaleMax: 0,
      rotationJitter: 0,
      borderRadius: "999px",
      durationMs: 0,
    };
  }

  if (effect === "ripple") {
    return {
      kind: "ripple",
      particleCount: 0,
      distanceMin: 0,
      distanceMax: 0,
      angleJitter: 0,
      widthMin: 0,
      widthMax: 0,
      heightMin: 0,
      heightMax: 0,
      scaleMin: 0,
      scaleMax: 0,
      rotationJitter: 0,
      borderRadius: "999px",
      durationMs: 650,
    };
  }

  if (effect === "confetti") {
    return {
      kind: "burst",
      particleCount: clamp(Math.max(requestedCount, 34), 20, 120),
      distanceMin: 72,
      distanceMax: 132,
      angleJitter: 0.7,
      widthMin: 4,
      widthMax: 10,
      heightMin: 6,
      heightMax: 18,
      scaleMin: 0.7,
      scaleMax: 1.35,
      rotationJitter: 780,
      borderRadius: "3px",
      durationMs: 920,
    };
  }

  return {
    kind: "burst",
    particleCount: clamp(Math.max(requestedCount, 46), 24, 140),
    distanceMin: 96,
    distanceMax: 180,
    angleJitter: 0.35,
    widthMin: 5,
    widthMax: 9,
    heightMin: 12,
    heightMax: 20,
    scaleMin: 0.85,
    scaleMax: 1.45,
    rotationJitter: 540,
    borderRadius: "999px",
    durationMs: 820,
  };
}
