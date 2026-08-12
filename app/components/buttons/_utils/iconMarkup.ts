import React from "react";
import ReactDOMServer from "react-dom/server";
import * as LucideIcons from "lucide-react";

import { ICONS_SVG, type IconName, type IconSource } from "../_data/buttonConstants";

const SAFE_SVG_TAGS = new Set([
  "svg",
  "g",
  "path",
  "circle",
  "rect",
  "line",
  "polyline",
  "polygon",
  "ellipse",
  "defs",
  "lineargradient",
  "radialgradient",
  "stop",
  "clippath",
  "mask",
  "title",
  "desc",
  "text",
  "tspan",
]);

/**
 * Validate custom SVG using a deliberately small, presentation-only allowlist.
 * Invalid input is rejected completely instead of trying to repair hostile XML.
 * The returned markup is safe to use in both the preview and generated export.
 */
export function sanitizeSvgMarkup(value: string): string {
  const source = value.trim();
  if (!source || source.length > 100_000) return "";
  if (!/^<svg\b[\s\S]*<\/svg>$/i.test(source)) return "";
  if (/<!|<\?|\]\]>|javascript:|data:|vbscript:|@import|expression\s*\(/i.test(source)) {
    return "";
  }
  if (/\b(?:on[a-z]+|href|xlink:href|src|style|action|formaction)\s*=/i.test(source)) {
    return "";
  }

  const urlReferences = source.match(/url\([^)]*\)/gi) ?? [];
  if (urlReferences.some((reference) => !/^url\(\s*#[a-zA-Z_][\w:.-]*\s*\)$/i.test(reference))) {
    return "";
  }

  const tagPattern = /<\/?\s*([a-zA-Z][\w:-]*)\b[^>]*>/g;
  let match: RegExpExecArray | null;
  let tagCount = 0;
  while ((match = tagPattern.exec(source))) {
    tagCount += 1;
    if (!SAFE_SVG_TAGS.has(match[1].toLowerCase())) return "";
  }
  if (tagCount < 2) return "";

  // Any remaining angle bracket indicates malformed or unparsed markup.
  if (source.replace(tagPattern, "").replace(/&(?:#\d+|#x[\da-f]+|[a-z]+);/gi, "").match(/[<>]/)) {
    return "";
  }

  return source;
}

function toPascalCase(name: string) {
  return name
    .replace(/[-_\s]+(.)?/g, (_, char: string | undefined) =>
      char ? char.toUpperCase() : "",
    )
    .replace(/^(.)/, (char) => char.toUpperCase());
}

function getLucideComponent(name: string) {
  const registry = LucideIcons as unknown as Record<
    string,
    React.ElementType<{ strokeWidth?: number }>
  >;
  return registry[name] ?? registry[toPascalCase(name)] ?? null;
}

export function resolveIconSvg(source: IconSource, name: string, custom: string) {
  if (source === "custom") return sanitizeSvgMarkup(custom);
  if (!name || name === "none") return "";

  const legacySvg = ICONS_SVG[name as IconName];
  if (legacySvg) return legacySvg;

  const IconComp = getLucideComponent(name);
  if (!IconComp) return "";

  try {
    return ReactDOMServer.renderToStaticMarkup(
      React.createElement(IconComp, { strokeWidth: 2 }),
    );
  } catch (error) {
    console.warn("Failed to render icon:", name, error);
    return "";
  }
}
