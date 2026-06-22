"use client";

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function toHex2(n: number) {
  const s = clamp(Math.round(n), 0, 255).toString(16);
  return s.length === 1 ? `0${s}` : s;
}

export function hexWithAlpha(hex: string, alpha: number) {
  const h = (hex || "").trim().toLowerCase();
  if (!/^#[0-9a-f]{6}$/.test(h)) return `rgba(0,0,0,${clamp(alpha, 0, 1)})`;
  const r = parseInt(h.slice(1, 3), 16);
  const g = parseInt(h.slice(3, 5), 16);
  const b = parseInt(h.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${clamp(alpha, 0, 1)})`;
}

export function sanitizeFilenameBase(input: string) {
  const trimmed = (input || "").trim();
  if (!trimmed) return "";
  const noWhitespace = trimmed.replace(/\s+/g, "-");
  const safe = noWhitespace.replace(/[^a-zA-Z0-9._-]/g, "");
  return safe.replace(/^\.+/, "");
}

export function norm(input: string): { ok: boolean; hex: string; rgb: string } {
  const raw = (input || "").trim();

  if (/^#([0-9a-fA-F]{3})$/.test(raw)) {
    const m = raw.slice(1);
    const r = m[0] + m[0];
    const g = m[1] + m[1];
    const b = m[2] + m[2];
    const hex = `#${r}${g}${b}`.toLowerCase();
    const rr = parseInt(r, 16);
    const gg = parseInt(g, 16);
    const bb = parseInt(b, 16);
    return { ok: true, hex, rgb: `rgb(${rr}, ${gg}, ${bb})` };
  }

  if (/^#([0-9a-fA-F]{6})$/.test(raw)) {
    const hex = raw.toLowerCase();
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { ok: true, hex, rgb: `rgb(${r}, ${g}, ${b})` };
  }

  const rgbFn = raw.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);
  if (rgbFn) {
    const r = clamp(Number(rgbFn[1]), 0, 255);
    const g = clamp(Number(rgbFn[2]), 0, 255);
    const b = clamp(Number(rgbFn[3]), 0, 255);
    const hex = `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`;
    return { ok: true, hex, rgb: `rgb(${r}, ${g}, ${b})` };
  }

  const csv = raw.match(/^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/);
  if (csv) {
    const r = clamp(Number(csv[1]), 0, 255);
    const g = clamp(Number(csv[2]), 0, 255);
    const b = clamp(Number(csv[3]), 0, 255);
    const hex = `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`;
    return { ok: true, hex, rgb: `rgb(${r}, ${g}, ${b})` };
  }

  return { ok: false, hex: "#2563eb", rgb: "rgb(37, 99, 235)" };
}

export function contrastHex(bgHex: string) {
  const h = (bgHex || "").trim().toLowerCase();
  if (!/^#[0-9a-f]{6}$/.test(h)) return "#111827";
  const r = parseInt(h.slice(1, 3), 16) / 255;
  const g = parseInt(h.slice(3, 5), 16) / 255;
  const b = parseInt(h.slice(5, 7), 16) / 255;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.6 ? "#111827" : "#ffffff";
}

function hexToRgb(hex: string) {
  const h = (hex || "").trim().toLowerCase();
  if (!/^#[0-9a-f]{6}$/.test(h)) return null;
  return {
    r: parseInt(h.slice(1, 3), 16) / 255,
    g: parseInt(h.slice(3, 5), 16) / 255,
    b: parseInt(h.slice(5, 7), 16) / 255,
  };
}

function relativeLuminance(rgb: { r: number; g: number; b: number }) {
  const transform = (v: number) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  const r = transform(rgb.r);
  const g = transform(rgb.g);
  const b = transform(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string) {
  const rgbA = hexToRgb(a);
  const rgbB = hexToRgb(b);
  if (!rgbA || !rgbB) return null;
  const l1 = relativeLuminance(rgbA);
  const l2 = relativeLuminance(rgbB);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function buildGradient(
  angleText: string,
  startInput: string,
  midEnabled: boolean,
  midInput: string,
  endInput: string
) {
  const angle = Number(angleText);
  const safeAngle = Number.isFinite(angle) ? angle : 90;
  const safeStart = norm(startInput).ok ? norm(startInput).hex : startInput;
  const safeMid = norm(midInput).ok ? norm(midInput).hex : midInput;
  const safeEnd = norm(endInput).ok ? norm(endInput).hex : endInput;
  return midEnabled
    ? `linear-gradient(${safeAngle}deg, ${safeStart}, ${safeMid}, ${safeEnd})`
    : `linear-gradient(${safeAngle}deg, ${safeStart}, ${safeEnd})`;
}
