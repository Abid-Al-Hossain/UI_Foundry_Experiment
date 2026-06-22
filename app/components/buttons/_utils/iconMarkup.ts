import React from "react";
import ReactDOMServer from "react-dom/server";
import * as LucideIcons from "lucide-react";

import { ICONS_SVG, type IconName, type IconSource } from "../_data/buttonConstants";

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
  if (source === "custom") return custom;
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
