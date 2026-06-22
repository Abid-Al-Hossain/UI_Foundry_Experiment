import { type ActionButtonState, INITIAL_STATE } from "../types";
import { contrastRatio, hexWithAlpha } from "../_utils/colorUtils";

type PresetTheme = {
  id: string;
  name: string;
  canvas: string;
  accent: string;
  base: string;
  mid: string;
  end: string;
  shadow: string;
  ring: string;
};

type PresetMood = {
  id: string;
  name: string;
  label: string;
  summaryTone: string;
  styleTags: string[];
  buttonAnimation: ActionButtonState["animation"];
  textAnimation: ActionButtonState["textAnimation"];
  depthAnimation: ActionButtonState["depthAnimation"];
  hoverEffect: ActionButtonState["hoverEffect"];
  clickEffect: ActionButtonState["clickEffect"];
  iconName: ActionButtonState["iconName"];
  hoverIconName: ActionButtonState["hoverIconName"];
  activeIconName: ActionButtonState["activeIconName"];
  googleFontFamily: string;
  animationDurationText: string;
  animationSpeedText: string;
  animationIntensityText: string;
  animationEasing: ActionButtonState["animationEasing"];
  textAnimationStaggerText: string;
  transitionColorDurationText: string;
  transitionTransformDurationText: string;
  hoverSpringStiffness: string;
  hoverSpringDamping: string;
  hoverBgModeSolid: ActionButtonState["hoverBgMode"];
  activeBgModeSolid: ActionButtonState["activeBgMode"];
  topGradientEnabled: boolean;
  parallaxHighlightEnabled: boolean;
  glossEnabled: boolean;
  bevelEnabled: boolean;
  iconEmbossMode: ActionButtonState["iconEmbossMode"];
};

type PresetSize = {
  id: string;
  name: string;
  width: string;
  height: string;
  padX: string;
  padY: string;
  radius: string;
  fontSize: string;
  iconSize: string;
  gap: string;
  shadowY: string;
  shadowBlur: string;
  depth: string;
};

function pickReadableTextColor(background: string) {
  const dark = "#111827";
  const light = "#ffffff";
  const darkContrast = contrastRatio(dark, background) ?? 0;
  const lightContrast = contrastRatio(light, background) ?? 0;
  return darkContrast >= lightContrast ? dark : light;
}

function pickReadableThemeTone(primary: string, fallback: string, background: string) {
  const primaryContrast = contrastRatio(primary, background) ?? 0;
  const fallbackContrast = contrastRatio(fallback, background) ?? 0;
  return primaryContrast >= fallbackContrast ? primary : fallback;
}

// Parse #rrggbb, #rgb, or rgb()/rgba() into 0-255 channels + alpha.
function parsePresetColor(input: string): { r: number; g: number; b: number; a: number } | null {
  const s = (input || "").trim().toLowerCase();
  let m = s.match(/^#([0-9a-f]{6})$/);
  if (m) return { r: parseInt(m[1].slice(0, 2), 16), g: parseInt(m[1].slice(2, 4), 16), b: parseInt(m[1].slice(4, 6), 16), a: 1 };
  m = s.match(/^#([0-9a-f]{3})$/);
  if (m) return { r: parseInt(m[1][0] + m[1][0], 16), g: parseInt(m[1][1] + m[1][1], 16), b: parseInt(m[1][2] + m[1][2], 16), a: 1 };
  m = s.match(/^rgba?\(([^)]+)\)$/);
  if (m) { const p = m[1].split(",").map((x) => parseFloat(x)); return { r: p[0], g: p[1], b: p[2], a: p[3] === undefined ? 1 : p[3] }; }
  return null;
}

// Flatten a possibly-translucent color over an opaque base, returning #rrggbb.
// Mirrors how the renderer paints a translucent fill onto the canvas, so we can
// check the label against the surface the user actually sees.
function flattenOver(input: string, baseHex: string): string {
  const c = parsePresetColor(input);
  const base = parsePresetColor(baseHex) ?? { r: 255, g: 255, b: 255, a: 1 };
  if (!c) return /^#[0-9a-f]{6}$/i.test(baseHex) ? baseHex : "#ffffff";
  const a = c.a;
  const hx = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${hx(c.r * a + base.r * (1 - a))}${hx(c.g * a + base.g * (1 - a))}${hx(c.b * a + base.b * (1 - a))}`;
}

// Final WCAG-AA safety net: guarantee the label reads against the button's real
// surface (translucent fills resolve onto the canvas). Fixes presets that pair a
// light/translucent fill with light text (e.g. the slate/cobalt solid family).
function enforceReadableLabel(state: ActionButtonState, theme: PresetTheme) {
  const surface = flattenOver(state.bgInput, theme.canvas);
  if ((contrastRatio(state.textInput, surface) ?? 0) < 4.5) {
    state.textInput = pickReadableTextColor(surface);
  }
}

export type ButtonPreset = {
  id: string;
  name: string;
  family: string;
  mood: string;
  variant: ActionButtonState["variant"];
  size: string;
  summary: string;
  tags: string[];
  preview: {
    canvas: string;
    background: string;
    text: string;
    border: string;
    shadow: string;
  };
  state: ActionButtonState;
};

const THEMES: PresetTheme[] = [
  {
    id: "slate",
    name: "Slate",
    canvas: "#f3f4f6",
    accent: "#334155",
    base: "#0f172a",
    mid: "#1e293b",
    end: "#475569",
    shadow: "#0f172a",
    ring: "#64748b",
  },
  {
    id: "cobalt",
    name: "Cobalt",
    canvas: "#eff6ff",
    accent: "#2563eb",
    base: "#1d4ed8",
    mid: "#2563eb",
    end: "#60a5fa",
    shadow: "#1e3a8a",
    ring: "#60a5fa",
  },
  {
    id: "emerald",
    name: "Emerald",
    canvas: "#ecfdf5",
    accent: "#10b981",
    base: "#047857",
    mid: "#059669",
    end: "#34d399",
    shadow: "#064e3b",
    ring: "#34d399",
  },
  {
    id: "sunset",
    name: "Sunset",
    canvas: "#fff7ed",
    accent: "#f97316",
    base: "#ea580c",
    mid: "#fb923c",
    end: "#fdba74",
    shadow: "#9a3412",
    ring: "#fb923c",
  },
  {
    id: "rose",
    name: "Rose",
    canvas: "#fff1f2",
    accent: "#f43f5e",
    base: "#e11d48",
    mid: "#fb7185",
    end: "#fda4af",
    shadow: "#881337",
    ring: "#fb7185",
  },
  {
    id: "violet",
    name: "Violet",
    canvas: "#f5f3ff",
    accent: "#8b5cf6",
    base: "#7c3aed",
    mid: "#a78bfa",
    end: "#c4b5fd",
    shadow: "#4c1d95",
    ring: "#a78bfa",
  },
  {
    id: "amber",
    name: "Amber",
    canvas: "#fffbeb",
    accent: "#d97706",
    base: "#b45309",
    mid: "#f59e0b",
    end: "#fcd34d",
    shadow: "#78350f",
    ring: "#f59e0b",
  },
  {
    id: "mint",
    name: "Mint",
    canvas: "#ecfeff",
    accent: "#14b8a6",
    base: "#0f766e",
    mid: "#14b8a6",
    end: "#5eead4",
    shadow: "#134e4a",
    ring: "#2dd4bf",
  },
  {
    id: "arctic",
    name: "Arctic",
    canvas: "#f8fafc",
    accent: "#0ea5e9",
    base: "#0369a1",
    mid: "#38bdf8",
    end: "#7dd3fc",
    shadow: "#0c4a6e",
    ring: "#38bdf8",
  },
  {
    id: "cherry",
    name: "Cherry",
    canvas: "#fff1f2",
    accent: "#be123c",
    base: "#881337",
    mid: "#e11d48",
    end: "#fb7185",
    shadow: "#4c0519",
    ring: "#fb7185",
  },
  {
    id: "obsidian",
    name: "Obsidian",
    canvas: "#020617",
    accent: "#38bdf8",
    base: "#0f172a",
    mid: "#1e293b",
    end: "#334155",
    shadow: "#000000",
    ring: "#38bdf8",
  },
  {
    id: "indigo",
    name: "Indigo",
    canvas: "#eef2ff",
    accent: "#6366f1",
    base: "#4338ca",
    mid: "#6366f1",
    end: "#a5b4fc",
    shadow: "#312e81",
    ring: "#818cf8",
  },
];

const MOODS: PresetMood[] = [
  {
    id: "calm",
    name: "Calm",
    label: "Continue",
    summaryTone: "quiet product UI",
    styleTags: ["minimal", "calm", "product", "clean"],
    buttonAnimation: "breathe",
    textAnimation: "none",
    depthAnimation: "none",
    hoverEffect: "none",
    clickEffect: "ripple",
    iconName: "arrowRight",
    hoverIconName: "arrowRight",
    activeIconName: "check",
    googleFontFamily: "Inter",
    animationDurationText: "4200",
    animationSpeedText: "90",
    animationIntensityText: "16",
    animationEasing: "ease-in-out",
    textAnimationStaggerText: "90",
    transitionColorDurationText: "170",
    transitionTransformDurationText: "130",
    hoverSpringStiffness: "280",
    hoverSpringDamping: "24",
    hoverBgModeSolid: "auto",
    activeBgModeSolid: "same",
    topGradientEnabled: false,
    parallaxHighlightEnabled: false,
    glossEnabled: false,
    bevelEnabled: false,
    iconEmbossMode: "off",
  },
  {
    id: "luxe",
    name: "Luxe",
    label: "Reserve",
    summaryTone: "editorial luxe motion",
    styleTags: ["premium", "luxe", "editorial", "sheen"],
    buttonAnimation: "sheen",
    textAnimation: "shimmer",
    depthAnimation: "orbit",
    hoverEffect: "none",
    clickEffect: "ripple",
    iconName: "star",
    hoverIconName: "star",
    activeIconName: "check",
    googleFontFamily: "Playfair Display",
    animationDurationText: "5200",
    animationSpeedText: "100",
    animationIntensityText: "22",
    animationEasing: "ease-in-out",
    textAnimationStaggerText: "120",
    transitionColorDurationText: "190",
    transitionTransformDurationText: "150",
    hoverSpringStiffness: "260",
    hoverSpringDamping: "20",
    hoverBgModeSolid: "gradient",
    activeBgModeSolid: "gradient",
    topGradientEnabled: true,
    parallaxHighlightEnabled: false,
    glossEnabled: true,
    bevelEnabled: true,
    iconEmbossMode: "raised",
  },
  {
    id: "aurora",
    name: "Aurora",
    label: "Explore",
    summaryTone: "aurora-lit gradient",
    styleTags: ["aurora", "gradient", "ambient", "premium"],
    buttonAnimation: "aurora",
    textAnimation: "wave",
    depthAnimation: "tilt-cycle",
    hoverEffect: "spotlight",
    clickEffect: "confetti",
    iconName: "info",
    hoverIconName: "star",
    activeIconName: "check",
    googleFontFamily: "Space Grotesk",
    animationDurationText: "5600",
    animationSpeedText: "95",
    animationIntensityText: "28",
    animationEasing: "ease-in-out",
    textAnimationStaggerText: "80",
    transitionColorDurationText: "180",
    transitionTransformDurationText: "140",
    hoverSpringStiffness: "300",
    hoverSpringDamping: "18",
    hoverBgModeSolid: "gradient",
    activeBgModeSolid: "gradient",
    topGradientEnabled: true,
    parallaxHighlightEnabled: true,
    glossEnabled: false,
    bevelEnabled: false,
    iconEmbossMode: "raised",
  },
  {
    id: "playful",
    name: "Playful",
    label: "Try It",
    summaryTone: "friendly expressive",
    styleTags: ["playful", "friendly", "expressive", "bouncy"],
    buttonAnimation: "soft-drift",
    textAnimation: "bounce",
    depthAnimation: "rock",
    hoverEffect: "morph",
    clickEffect: "confetti",
    iconName: "plus",
    hoverIconName: "star",
    activeIconName: "check",
    googleFontFamily: "Nunito",
    animationDurationText: "3600",
    animationSpeedText: "110",
    animationIntensityText: "26",
    animationEasing: "ease-out",
    textAnimationStaggerText: "70",
    transitionColorDurationText: "160",
    transitionTransformDurationText: "130",
    hoverSpringStiffness: "320",
    hoverSpringDamping: "18",
    hoverBgModeSolid: "gradient",
    activeBgModeSolid: "custom",
    topGradientEnabled: false,
    parallaxHighlightEnabled: false,
    glossEnabled: false,
    bevelEnabled: false,
    iconEmbossMode: "off",
  },
  {
    id: "neon",
    name: "Neon",
    label: "Launch",
    summaryTone: "luminous glow-heavy",
    styleTags: ["neon", "glow", "cta", "vivid"],
    buttonAnimation: "neon-pulse",
    textAnimation: "flicker",
    depthAnimation: "orbit",
    hoverEffect: "spotlight",
    clickEffect: "confetti",
    iconName: "info",
    hoverIconName: "arrowRight",
    activeIconName: "check",
    googleFontFamily: "Space Grotesk",
    animationDurationText: "3200",
    animationSpeedText: "125",
    animationIntensityText: "34",
    animationEasing: "linear",
    textAnimationStaggerText: "60",
    transitionColorDurationText: "150",
    transitionTransformDurationText: "120",
    hoverSpringStiffness: "340",
    hoverSpringDamping: "16",
    hoverBgModeSolid: "gradient",
    activeBgModeSolid: "custom",
    topGradientEnabled: true,
    parallaxHighlightEnabled: true,
    glossEnabled: true,
    bevelEnabled: false,
    iconEmbossMode: "raised",
  },
  {
    id: "cyber",
    name: "Cyber",
    label: "Deploy",
    summaryTone: "cyberpunk glitch",
    styleTags: ["cyber", "glitch", "tech", "high-contrast"],
    buttonAnimation: "cyber-glitch",
    textAnimation: "glitch",
    depthAnimation: "gyro",
    hoverEffect: "tilt",
    clickEffect: "explosion",
    iconName: "x",
    hoverIconName: "info",
    activeIconName: "check",
    googleFontFamily: "Space Grotesk",
    animationDurationText: "2400",
    animationSpeedText: "135",
    animationIntensityText: "42",
    animationEasing: "linear",
    textAnimationStaggerText: "45",
    transitionColorDurationText: "140",
    transitionTransformDurationText: "120",
    hoverSpringStiffness: "360",
    hoverSpringDamping: "14",
    hoverBgModeSolid: "custom",
    activeBgModeSolid: "custom",
    topGradientEnabled: true,
    parallaxHighlightEnabled: false,
    glossEnabled: false,
    bevelEnabled: true,
    iconEmbossMode: "inset",
  },
  {
    id: "glass",
    name: "Glass",
    label: "Unlock",
    summaryTone: "glassmorphism-inspired translucent",
    styleTags: ["glass", "translucent", "liquid", "premium"],
    buttonAnimation: "soft-glow",
    textAnimation: "none",
    depthAnimation: "orbit",
    hoverEffect: "spotlight",
    clickEffect: "ripple",
    iconName: "arrowRight",
    hoverIconName: "star",
    activeIconName: "check",
    googleFontFamily: "Plus Jakarta Sans",
    animationDurationText: "4800",
    animationSpeedText: "92",
    animationIntensityText: "20",
    animationEasing: "ease-in-out",
    textAnimationStaggerText: "90",
    transitionColorDurationText: "180",
    transitionTransformDurationText: "140",
    hoverSpringStiffness: "290",
    hoverSpringDamping: "22",
    hoverBgModeSolid: "gradient",
    activeBgModeSolid: "gradient",
    topGradientEnabled: true,
    parallaxHighlightEnabled: true,
    glossEnabled: true,
    bevelEnabled: true,
    iconEmbossMode: "raised",
  },
  {
    id: "editorial",
    name: "Editorial",
    label: "Read More",
    summaryTone: "editorial minimal",
    styleTags: ["editorial", "minimal", "serif", "refined"],
    buttonAnimation: "none",
    textAnimation: "none",
    depthAnimation: "none",
    hoverEffect: "none",
    clickEffect: "ripple",
    iconName: "none",
    hoverIconName: "none",
    activeIconName: "none",
    googleFontFamily: "DM Serif Display",
    animationDurationText: "4200",
    animationSpeedText: "85",
    animationIntensityText: "10",
    animationEasing: "ease",
    textAnimationStaggerText: "0",
    transitionColorDurationText: "190",
    transitionTransformDurationText: "120",
    hoverSpringStiffness: "240",
    hoverSpringDamping: "26",
    hoverBgModeSolid: "auto",
    activeBgModeSolid: "same",
    topGradientEnabled: false,
    parallaxHighlightEnabled: false,
    glossEnabled: false,
    bevelEnabled: false,
    iconEmbossMode: "off",
  },
  {
    id: "tactile",
    name: "Tactile",
    label: "Tap In",
    summaryTone: "soft tactile depth",
    styleTags: ["tactile", "soft-ui", "pill", "depth"],
    buttonAnimation: "breathe",
    textAnimation: "none",
    depthAnimation: "rock",
    hoverEffect: "morph",
    clickEffect: "ripple",
    iconName: "plus",
    hoverIconName: "star",
    activeIconName: "check",
    googleFontFamily: "Manrope",
    animationDurationText: "3900",
    animationSpeedText: "100",
    animationIntensityText: "24",
    animationEasing: "ease-in-out",
    textAnimationStaggerText: "60",
    transitionColorDurationText: "170",
    transitionTransformDurationText: "130",
    hoverSpringStiffness: "300",
    hoverSpringDamping: "18",
    hoverBgModeSolid: "gradient",
    activeBgModeSolid: "gradient",
    topGradientEnabled: true,
    parallaxHighlightEnabled: false,
    glossEnabled: true,
    bevelEnabled: true,
    iconEmbossMode: "raised",
  },
  {
    id: "chrome",
    name: "Chrome",
    label: "Preview",
    summaryTone: "metallic chrome",
    styleTags: ["chrome", "metal", "reflective", "sleek"],
    buttonAnimation: "sheen",
    textAnimation: "shimmer",
    depthAnimation: "tilt-cycle",
    hoverEffect: "tilt",
    clickEffect: "ripple",
    iconName: "star",
    hoverIconName: "arrowRight",
    activeIconName: "check",
    googleFontFamily: "Syne",
    animationDurationText: "5000",
    animationSpeedText: "98",
    animationIntensityText: "24",
    animationEasing: "ease-in-out",
    textAnimationStaggerText: "110",
    transitionColorDurationText: "180",
    transitionTransformDurationText: "145",
    hoverSpringStiffness: "270",
    hoverSpringDamping: "18",
    hoverBgModeSolid: "gradient",
    activeBgModeSolid: "gradient",
    topGradientEnabled: true,
    parallaxHighlightEnabled: false,
    glossEnabled: true,
    bevelEnabled: true,
    iconEmbossMode: "raised",
  },
  {
    id: "brutalist",
    name: "Brutalist",
    label: "Buy Now",
    summaryTone: "bold poster-like",
    styleTags: ["brutalist", "poster", "bold", "graphic"],
    buttonAnimation: "none",
    textAnimation: "none",
    depthAnimation: "rock",
    hoverEffect: "none",
    clickEffect: "explosion",
    iconName: "plus",
    hoverIconName: "x",
    activeIconName: "check",
    googleFontFamily: "Bebas Neue",
    animationDurationText: "2600",
    animationSpeedText: "118",
    animationIntensityText: "30",
    animationEasing: "ease-out",
    textAnimationStaggerText: "0",
    transitionColorDurationText: "120",
    transitionTransformDurationText: "90",
    hoverSpringStiffness: "330",
    hoverSpringDamping: "14",
    hoverBgModeSolid: "custom",
    activeBgModeSolid: "custom",
    topGradientEnabled: false,
    parallaxHighlightEnabled: false,
    glossEnabled: false,
    bevelEnabled: false,
    iconEmbossMode: "off",
  },
  {
    id: "velvet",
    name: "Velvet",
    label: "Enter",
    summaryTone: "dark velvet glow",
    styleTags: ["velvet", "cinematic", "dark", "luxury"],
    buttonAnimation: "soft-glow",
    textAnimation: "shimmer",
    depthAnimation: "orbit",
    hoverEffect: "none",
    clickEffect: "ripple",
    iconName: "star",
    hoverIconName: "arrowRight",
    activeIconName: "check",
    googleFontFamily: "Cormorant Garamond",
    animationDurationText: "5400",
    animationSpeedText: "94",
    animationIntensityText: "24",
    animationEasing: "ease-in-out",
    textAnimationStaggerText: "120",
    transitionColorDurationText: "190",
    transitionTransformDurationText: "150",
    hoverSpringStiffness: "255",
    hoverSpringDamping: "20",
    hoverBgModeSolid: "gradient",
    activeBgModeSolid: "gradient",
    topGradientEnabled: true,
    parallaxHighlightEnabled: false,
    glossEnabled: true,
    bevelEnabled: true,
    iconEmbossMode: "raised",
  },
];

const SIZES: PresetSize[] = [
  {
    id: "compact",
    name: "Compact",
    width: "180",
    height: "40",
    padX: "16",
    padY: "0",
    radius: "12",
    fontSize: "13",
    iconSize: "16",
    gap: "8",
    shadowY: "8",
    shadowBlur: "18",
    depth: "6",
  },
  {
    id: "hero",
    name: "Hero",
    width: "260",
    height: "56",
    padX: "28",
    padY: "0",
    radius: "18",
    fontSize: "16",
    iconSize: "18",
    gap: "12",
    shadowY: "12",
    shadowBlur: "28",
    depth: "10",
  },
];

const VARIANT_LABELS: Record<ActionButtonState["variant"], string> = {
  solid: "Solid",
  outline: "Outline",
  ghost: "Ghost",
};

function makeHoverBackground(theme: PresetTheme, alpha: number) {
  return hexWithAlpha(theme.accent, alpha);
}

function setAllRadii(state: ActionButtonState, value: string) {
  state.radiusText = value;
  state.radiusTLText = value;
  state.radiusTRText = value;
  state.radiusBRText = value;
  state.radiusBLText = value;
}

function applyMoodArtDirection(
  theme: PresetTheme,
  mood: PresetMood,
  size: PresetSize,
  variant: ActionButtonState["variant"],
  state: ActionButtonState,
) {
  state.shadowTemp = "neutral";
  state.lightDirection = "top-left";
  state.materialPreset = "custom";
  state.rimLightEnabled = false;
  state.edgeGradientEnabled = false;
  state.backdropBlurEnabled = false;
  state.baseShadowEnabled = state.elevationPreset !== "flat";
  state.baseShadowSizeText = size.id === "hero" ? "20" : "12";
  state.baseShadowOpacityText = variant === "solid" ? "0.18" : "0.12";
  state.borderDepthMode = "none";
  state.borderDepthSizeText = "2";
  state.edgeThicknessText = "0";
  state.edgeGradientSizeText = "3";
  state.edgeGradientStrengthText = "0.24";
  state.rimLightColorInput = theme.end;
  state.rimLightSizeText = size.id === "hero" ? "14" : "10";
  state.rimLightOpacityText = "0.16";
  state.specularStrengthText = "0.45";
  state.roughnessText = "0.28";
  state.aoStrengthText = "0.12";
  state.baseShadowEnabled = variant !== "ghost";
  state.hoverLiftText = mood.id === "playful" || mood.id === "tactile" ? "4" : "2";
  state.pressedInsetEnabled = variant === "solid" && mood.id !== "calm";
  state.pressedDepthText = mood.id === "brutalist" ? "1" : "2";

  switch (mood.id) {
    case "calm":
      state.materialPreset = "matte";
      state.baseShadowEnabled = variant === "solid";
      state.baseShadowSizeText = size.id === "hero" ? "12" : "8";
      state.baseShadowOpacityText = "0.12";
      break;
    case "luxe":
      state.shadowTemp = "warm";
      state.baseShadowEnabled = true;
      state.baseShadowSizeText = size.id === "hero" ? "22" : "14";
      state.baseShadowOpacityText = "0.2";
      state.rimLightEnabled = variant === "solid";
      state.rimLightOpacityText = "0.18";
      state.borderDepthMode = variant === "outline" ? "raised" : "none";
      state.edgeGradientEnabled = variant === "solid";
      state.specularStrengthText = "0.62";
      state.roughnessText = "0.22";
      break;
    case "aurora":
      state.rimLightEnabled = true;
      state.rimLightColorInput = theme.ring;
      state.rimLightOpacityText = "0.22";
      state.rimLightSizeText = size.id === "hero" ? "18" : "12";
      state.edgeGradientEnabled = variant === "solid";
      state.edgeGradientStrengthText = "0.28";
      state.specularStrengthText = "0.55";
      state.roughnessText = "0.18";
      break;
    case "playful":
      state.materialPreset = "plastic";
      state.baseShadowEnabled = true;
      state.baseShadowSizeText = size.id === "hero" ? "18" : "12";
      state.baseShadowOpacityText = "0.18";
      setAllRadii(state, "999");
      state.borderDepthMode = variant === "outline" ? "raised" : "none";
      state.borderDepthSizeText = "3";
      break;
    case "neon":
      state.rimLightEnabled = true;
      state.rimLightColorInput = theme.ring;
      state.rimLightOpacityText = "0.3";
      state.rimLightSizeText = size.id === "hero" ? "22" : "16";
      state.edgeGradientEnabled = variant === "solid";
      state.edgeGradientStrengthText = "0.34";
      state.baseShadowEnabled = true;
      state.baseShadowSizeText = size.id === "hero" ? "24" : "16";
      state.baseShadowOpacityText = "0.24";
      state.specularStrengthText = "0.72";
      state.roughnessText = "0.12";
      break;
    case "cyber":
      state.shadowTemp = "cool";
      state.lightDirection = "top-right";
      state.materialPreset = "metal";
      state.edgeGradientEnabled = variant !== "ghost";
      state.edgeGradientStrengthText = "0.3";
      state.borderDepthMode = variant === "solid" ? "raised" : "inset";
      state.borderDepthSizeText = "2";
      state.specularStrengthText = "0.76";
      state.roughnessText = "0.22";
      state.aoStrengthText = "0.2";
      break;
    case "glass":
      state.shadowTemp = "cool";
      state.materialPreset = "glass";
      state.edgeGradientEnabled = true;
      state.backdropBlurEnabled = true;
      state.backdropBlurText = size.id === "hero" ? "16" : "12";
      state.rimLightEnabled = true;
      state.rimLightColorInput = "#ffffff";
      state.rimLightOpacityText = "0.22";
      state.rimLightSizeText = size.id === "hero" ? "18" : "12";
      state.baseShadowEnabled = true;
      state.baseShadowSizeText = size.id === "hero" ? "18" : "12";
      state.baseShadowOpacityText = "0.12";
      state.specularStrengthText = "0.5";
      state.roughnessText = "0.1";
      if (variant === "solid") {
        state.useGradient = true;
        state.gradAngleText = "135";
        state.gradStartInput = hexWithAlpha("#ffffff", 0.42);
        state.gradMidEnabled = true;
        state.gradMidInput = hexWithAlpha(theme.end, 0.26);
        state.gradEndInput = hexWithAlpha(theme.base, 0.18);
        state.bgInput = hexWithAlpha("#ffffff", 0.18);
        state.textInput = pickReadableThemeTone(theme.base, "#ffffff", theme.canvas);
        state.borderInput = hexWithAlpha("#ffffff", 0.34);
      } else if (variant === "outline") {
        state.bgInput = hexWithAlpha("#ffffff", 0.14);
        state.borderWidthText = "1.5";
        state.borderInput = hexWithAlpha("#ffffff", 0.5);
        state.textInput = pickReadableThemeTone(theme.base, theme.accent, theme.canvas);
        state.hoverBgInput = hexWithAlpha("#ffffff", 0.22);
        state.activeBgInput = hexWithAlpha(theme.end, 0.24);
      } else {
        state.bgInput = hexWithAlpha("#ffffff", 0.1);
        state.borderWidthText = "1";
        state.borderInput = hexWithAlpha("#ffffff", 0.22);
        state.textInput = pickReadableThemeTone(theme.base, theme.accent, theme.canvas);
        state.hoverBgInput = hexWithAlpha("#ffffff", 0.16);
        state.activeBgInput = hexWithAlpha(theme.end, 0.18);
      }
      break;
    case "editorial":
      state.materialPreset = "matte";
      state.fontWeight = 600;
      state.letterSpacingText = "0.4";
      state.textTransform = "none";
      state.iconName = "none";
      state.hoverIconEnabled = false;
      state.activeIconEnabled = false;
      state.shadowEnabled = variant === "solid";
      state.shYText = variant === "solid" ? "8" : "0";
      state.shBlurText = variant === "solid" ? "18" : "0";
      state.shOpacityText = variant === "solid" ? "0.12" : "0";
      state.baseShadowEnabled = false;
      setAllRadii(state, size.id === "hero" ? "10" : "8");
      if (variant === "solid") {
        state.useGradient = false;
        state.bgInput = theme.base;
        state.textInput = pickReadableTextColor(theme.base);
        state.borderInput = theme.base;
      } else if (variant === "outline") {
        state.borderWidthText = "1";
        state.borderInput = theme.base;
        state.textInput = theme.base;
        state.hoverBgInput = hexWithAlpha(theme.base, 0.06);
        state.activeBgInput = hexWithAlpha(theme.base, 0.12);
      } else {
        state.borderWidthText = "0";
        state.textInput = theme.base;
        state.hoverBgInput = hexWithAlpha(theme.base, 0.05);
        state.activeBgInput = hexWithAlpha(theme.base, 0.1);
      }
      break;
    case "tactile":
      state.materialPreset = "plastic";
      state.baseShadowEnabled = true;
      state.baseShadowSizeText = size.id === "hero" ? "18" : "12";
      state.baseShadowOpacityText = "0.18";
      state.shadowStackEnabled = true;
      state.stack1Enabled = true;
      state.stack1XText = "0";
      state.stack1YText = size.id === "hero" ? "6" : "4";
      state.stack1BlurText = size.id === "hero" ? "10" : "8";
      state.stack1SpreadText = "-2";
      state.stack1OpacityText = "0.16";
      state.stack2Enabled = true;
      state.stack2XText = "0";
      state.stack2YText = size.id === "hero" ? "12" : "8";
      state.stack2BlurText = size.id === "hero" ? "18" : "14";
      state.stack2SpreadText = "-4";
      state.stack2OpacityText = "0.14";
      setAllRadii(state, "999");
      state.borderDepthMode = variant === "solid" ? "inset" : "raised";
      state.borderDepthSizeText = "3";
      state.pressedInsetEnabled = true;
      break;
    case "chrome":
      state.shadowTemp = "cool";
      state.lightDirection = "top-right";
      state.materialPreset = "metal";
      state.rimLightEnabled = true;
      state.rimLightColorInput = "#ffffff";
      state.rimLightOpacityText = "0.24";
      state.edgeGradientEnabled = true;
      state.borderDepthMode = variant === "ghost" ? "none" : "raised";
      state.borderDepthSizeText = "2";
      state.specularStrengthText = "0.82";
      state.roughnessText = "0.22";
      state.baseShadowEnabled = true;
      state.baseShadowSizeText = size.id === "hero" ? "18" : "12";
      state.baseShadowOpacityText = "0.16";
      if (variant === "solid") {
        state.useGradient = true;
        state.gradAngleText = "125";
        state.gradStartInput = "#f8fafc";
        state.gradMidEnabled = true;
        state.gradMidInput = hexWithAlpha(theme.end, 0.75);
        state.gradEndInput = theme.base;
        state.bgInput = "#dbe4f0";
        state.textInput = "#0f172a";
        state.borderInput = hexWithAlpha("#ffffff", 0.45);
      }
      break;
    case "brutalist":
      state.materialPreset = "matte";
      state.fontWeight = 700;
      state.letterSpacingText = "0.8";
      state.textTransform = "uppercase";
      state.shadowEnabled = true;
      state.shXText = size.id === "hero" ? "4" : "3";
      state.shYText = size.id === "hero" ? "6" : "4";
      state.shBlurText = "0";
      state.shSpreadText = "0";
      state.shOpacityText = "0.26";
      state.baseShadowEnabled = false;
      state.glossEnabled = false;
      state.bevelEnabled = false;
      state.edgeGradientEnabled = false;
      state.rimLightEnabled = false;
      setAllRadii(state, size.id === "hero" ? "8" : "6");
      if (variant === "solid") {
        state.useGradient = false;
        state.bgInput = theme.base;
        state.textInput = pickReadableTextColor(theme.base);
        state.borderWidthText = "3";
        state.borderInput = theme.base;
      } else if (variant === "outline") {
        state.borderWidthText = "3";
        state.borderInput = theme.base;
        state.textInput = theme.base;
      } else {
        state.borderWidthText = "2";
        state.borderInput = theme.base;
        state.textInput = theme.base;
        state.hoverBgInput = hexWithAlpha(theme.base, 0.08);
        state.activeBgInput = hexWithAlpha(theme.base, 0.14);
      }
      break;
    case "velvet":
      state.shadowTemp = "warm";
      state.baseShadowEnabled = true;
      state.baseShadowSizeText = size.id === "hero" ? "24" : "16";
      state.baseShadowOpacityText = "0.22";
      state.rimLightEnabled = variant === "solid";
      state.rimLightColorInput = theme.end;
      state.rimLightOpacityText = "0.22";
      state.rimLightSizeText = size.id === "hero" ? "20" : "14";
      state.edgeGradientEnabled = variant !== "ghost";
      state.specularStrengthText = "0.58";
      state.roughnessText = "0.18";
      if (variant === "solid") {
        state.useGradient = true;
        state.gradAngleText = "120";
        state.gradStartInput = theme.base;
        state.gradMidEnabled = true;
        state.gradMidInput = hexWithAlpha(theme.mid, 0.95);
        state.gradEndInput = "#140b1f";
        state.textInput = "#f8fafc";
        state.borderInput = hexWithAlpha(theme.end, 0.32);
      }
      break;
    default:
      break;
  }
}

function makeVariantState(
  theme: PresetTheme,
  mood: PresetMood,
  size: PresetSize,
  variant: ActionButtonState["variant"],
): ActionButtonState {
  const state: ActionButtonState = {
    ...INITIAL_STATE,
    label: mood.label,
    variant,
    loadingLabel: "Please wait...",
    widthText: size.width,
    heightText: size.height,
    paddingXText: size.padX,
    paddingYText: size.padY,
    radiusText: size.radius,
    radiusTLText: size.radius,
    radiusTRText: size.radius,
    radiusBRText: size.radius,
    radiusBLText: size.radius,
    fontBucket: "google",
    googleFontFamily: mood.googleFontFamily,
    fontSearch: "",
    fontSizeText: size.fontSize,
    fontWeight: mood.id === "luxe" ? 600 : 700,
    letterSpacingText: mood.id === "cyber" ? "0.6" : "0.2",
    lineHeightText: "1",
    textTransform: mood.id === "cyber" ? "uppercase" : "none",
    underline: false,
    iconName: mood.iconName,
    iconSource: "library",
    hoverIconEnabled: mood.hoverIconName !== "none",
    hoverIconSource: "library",
    hoverIconName: mood.hoverIconName,
    activeIconEnabled: mood.activeIconName !== "none",
    activeIconSource: "library",
    activeIconName: mood.activeIconName,
    iconPosition: "left",
    iconSizeText: size.iconSize,
    iconGapText: size.gap,
    iconColorMode: "text",
    animation: mood.buttonAnimation,
    textAnimation: mood.textAnimation,
    depthAnimation: mood.depthAnimation,
    animationDurationText: mood.animationDurationText,
    animationSpeedText: mood.animationSpeedText,
    animationIntensityText: mood.animationIntensityText,
    animationEasing: mood.animationEasing,
    textAnimationStaggerText: mood.textAnimationStaggerText,
    hoverEffect: mood.hoverEffect,
    clickEffect: mood.clickEffect,
    clickParticleCount: mood.clickEffect === "explosion" ? "64" : "40",
    hoverSpringStiffness: mood.hoverSpringStiffness,
    hoverSpringDamping: mood.hoverSpringDamping,
    transitionColorDurationText: mood.transitionColorDurationText,
    transitionTransformDurationText: mood.transitionTransformDurationText,
    focusRingInput: theme.ring,
    previewBgMode: "custom",
    previewBgInput: theme.canvas,
    shadowEnabled: true,
    shadowStackEnabled: false,
    shXText: "0",
    shYText: size.shadowY,
    shBlurText: size.shadowBlur,
    shSpreadText: "0",
    shOpacityText: variant === "solid" ? "0.18" : "0.12",
    shColorInput: theme.shadow,
    shadowTemp: "neutral",
    elevationPreset:
      mood.id === "cyber"
        ? "lifted"
        : mood.id === "calm"
          ? "raised"
          : "lifted",
    depthText: size.depth,
    lightDirection: "top-left",
    topGradientEnabled: mood.topGradientEnabled && variant === "solid",
    topGradAngleText: "180",
    topGradStartInput: "#ffffff",
    topGradMidEnabled: false,
    topGradMidInput: "#ffffff",
    topGradEndInput: "#000000",
    topGradOpacityText: mood.id === "neon" ? "0.22" : "0.16",
    parallaxHighlightEnabled: mood.parallaxHighlightEnabled,
    parallaxStrengthText: mood.parallaxHighlightEnabled ? "0.45" : "0.35",
    glossEnabled: mood.glossEnabled,
    glossOpacityText: mood.glossEnabled ? "0.18" : "0.22",
    bevelEnabled: mood.bevelEnabled,
    materialPreset: "custom",
    iconEmbossMode: mood.iconEmbossMode,
    textShadowEnabled: mood.textAnimation === "flicker" || mood.textAnimation === "glitch",
    tsXText: "0",
    tsYText: "1",
    tsBlurText: mood.textAnimation === "glitch" ? "4" : "2",
    tsOpacityText: mood.textAnimation === "glitch" ? "0.35" : "0.2",
    tsColorInput: theme.accent,
    borderInput: theme.accent,
    hoverBorderInput: theme.accent,
    activeBorderInput: theme.accent,
    ariaLabel: mood.label,
  };

  const solidText = pickReadableTextColor(theme.mid);
  const outlineTone = pickReadableThemeTone(theme.accent, theme.base, theme.canvas);
  const solidBorderVisible = [
    "luxe",
    "aurora",
    "neon",
    "cyber",
    "glass",
    "chrome",
    "velvet",
  ].includes(mood.id);
  const solidBorderWidth = solidBorderVisible ? "1" : "0";
  const solidBorderColor = solidBorderVisible
    ? hexWithAlpha(solidText, mood.id === "glass" ? 0.18 : 0.12)
    : "transparent";

  if (variant === "solid") {
    state.useGradient = true;
    state.gradAngleText = mood.id === "cyber" ? "135" : "90";
    state.gradStartInput = theme.base;
    state.gradMidEnabled = true;
    state.gradMidInput = theme.mid;
    state.gradEndInput = theme.end;
    state.bgInput = theme.base;
    state.textInput = solidText;
    state.borderWidthText = solidBorderWidth;
    state.borderHoverWidthText = solidBorderWidth;
    state.borderActiveWidthText = solidBorderWidth;
    state.borderInput = solidBorderColor;
    state.hoverBgMode = mood.hoverBgModeSolid;
    state.hoverBgInput = mood.hoverBgModeSolid === "custom" ? theme.mid : theme.base;
    state.hoverGradAngleText = "90";
    state.hoverGradStartInput = theme.mid;
    state.hoverGradMidEnabled = true;
    state.hoverGradMidInput = theme.end;
    state.hoverGradEndInput = theme.accent;
    state.hoverTextMode = "same";
    state.hoverBorderMode = "same";
    state.activeBgMode = mood.activeBgModeSolid;
    state.activeBgInput = theme.base;
    state.activeGradAngleText = "90";
    state.activeGradStartInput = theme.base;
    state.activeGradMidEnabled = true;
    state.activeGradMidInput = theme.accent;
    state.activeGradEndInput = theme.end;
    state.activeTextMode = "same";
    state.activeBorderMode = "same";
    state.activeTranslateYText = mood.id === "calm" ? "1" : "2";
    state.activeScaleText = mood.id === "calm" ? "0.99" : "0.98";
  } else if (variant === "outline") {
    state.useGradient = false;
    state.bgInput = "transparent";
    state.textInput = outlineTone;
    state.borderWidthText = "2";
    state.borderInput = outlineTone;
    state.hoverBgMode = "custom";
    state.hoverBgInput = makeHoverBackground(theme, 0.14);
    state.hoverTextMode = "same";
    state.hoverBorderMode = "same";
    state.activeBgMode = "custom";
    state.activeBgInput = makeHoverBackground(theme, 0.24);
    state.activeTextMode = "same";
    state.activeBorderMode = "same";
    state.activeTranslateYText = "1";
    state.activeScaleText = "0.99";
    state.disabledUseCustomColors = true;
    state.disabledBgInput = "transparent";
    state.disabledTextInput = hexWithAlpha(outlineTone, 0.55);
    state.disabledBorderInput = hexWithAlpha(outlineTone, 0.35);
  } else {
    state.useGradient = false;
    state.bgInput = "transparent";
    state.textInput = outlineTone;
    state.borderWidthText = "0";
    state.borderInput = "transparent";
    state.hoverBgMode = "custom";
    state.hoverBgInput = makeHoverBackground(theme, 0.12);
    state.hoverTextMode = "same";
    state.hoverBorderMode = "custom";
    state.hoverBorderInput = hexWithAlpha(outlineTone, 0.3);
    state.activeBgMode = "custom";
    state.activeBgInput = makeHoverBackground(theme, 0.22);
    state.activeTextMode = "same";
    state.activeBorderMode = "custom";
    state.activeBorderInput = hexWithAlpha(outlineTone, 0.38);
    state.activeTranslateYText = "1";
    state.activeScaleText = "0.99";
    state.disabledUseCustomColors = true;
    state.disabledBgInput = "transparent";
    state.disabledTextInput = hexWithAlpha(outlineTone, 0.48);
    state.disabledBorderInput = "transparent";
  }

  applyMoodArtDirection(theme, mood, size, variant, state);

  return state;
}

function makePreview(
  theme: PresetTheme,
  state: ActionButtonState,
): ButtonPreset["preview"] {
  if (state.variant === "solid") {
    return {
      canvas: theme.canvas,
      background: `linear-gradient(${state.gradAngleText}deg, ${state.gradStartInput}, ${state.gradMidInput}, ${state.gradEndInput})`,
      text: state.textInput,
      border: state.borderInput,
      shadow: `0 10px 24px ${hexWithAlpha(theme.shadow, 0.18)}`,
    };
  }

  if (state.variant === "outline") {
    return {
      canvas: theme.canvas,
      background: "transparent",
      text: state.textInput,
      border: state.borderInput,
      shadow: `0 8px 18px ${hexWithAlpha(theme.shadow, 0.08)}`,
    };
  }

  return {
    canvas: theme.canvas,
    background: "transparent",
    text: state.textInput,
    border: "transparent",
    shadow: `0 8px 18px ${hexWithAlpha(theme.shadow, 0.06)}`,
  };
}

function buildPreset(
  theme: PresetTheme,
  mood: PresetMood,
  size: PresetSize,
  variant: ActionButtonState["variant"],
): ButtonPreset {
  const state = makeVariantState(theme, mood, size, variant);
  enforceReadableLabel(state, theme);
  const id = `${theme.id}-${mood.id}-${variant}-${size.id}`;
  const name = `${theme.name} ${mood.name} ${VARIANT_LABELS[variant]} ${size.name}`;
  return {
    id,
    name,
    family: theme.name,
    mood: mood.name,
    variant,
    size: size.name,
    summary: `${VARIANT_LABELS[variant]} ${mood.summaryTone} button on a ${theme.name.toLowerCase()} palette.`,
    tags: [
      theme.id,
      theme.name.toLowerCase(),
      mood.id,
      mood.name.toLowerCase(),
      ...mood.styleTags,
      variant,
      size.id,
      state.animation,
      state.textAnimation,
      state.depthAnimation,
      state.hoverEffect,
      state.clickEffect,
    ],
    preview: makePreview(theme, state),
    state,
  };
}

export const BUTTON_PRESETS: ButtonPreset[] = THEMES.flatMap((theme) =>
  MOODS.flatMap((mood) =>
    SIZES.flatMap((size) =>
      (["solid", "outline", "ghost"] as const).map((variant) =>
        buildPreset(theme, mood, size, variant),
      ),
    ),
  ),
);

export const BUTTON_PRESET_COUNT = BUTTON_PRESETS.length;
