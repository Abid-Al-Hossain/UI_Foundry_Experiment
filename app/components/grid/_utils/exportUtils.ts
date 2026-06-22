import type { GridState } from "../types";

export type ExportPayload = { fileName: string; mimeType: "text/plain;charset=utf-8"; content: string };

function sanitizeFilenameBase(value: string) {
  return (value || "grid").trim().replace(/[^a-z0-9-_]+/gi, "-").replace(/^-+|-+$/g, "") || "grid";
}

function normalizeState(state: GridState): GridState {
  return {
    ...state,
    layoutVariant: state.layoutVariant ?? "balanced",
    justifyItems: state.justifyItems ?? "stretch",
    alignItems: state.alignItems ?? "stretch",
  };
}

export function buildExportPayload(state: GridState, fileName = "grid"): ExportPayload {
  return {
    fileName: `${sanitizeFilenameBase(fileName)}.jsx`,
    mimeType: "text/plain;charset=utf-8",
    content: buildReactCode(state),
  };
}

export function buildReactCode(state: GridState) {
  const config = JSON.stringify(normalizeState(state), null, 2);

  return `import * as React from "react";

const config = ${config};

const impliedRoles = {
  main: "main",
  header: "banner",
  footer: "contentinfo",
  nav: "navigation",
};

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, Math.round(Number(value) || min)));
}

function getLayoutVariant(grid) {
  return grid.layoutVariant || "balanced";
}

function buildItems(count) {
  return Array.from({ length: clampNumber(count, 1, 24) }, (_, index) => index + 1);
}

function getTemplateColumns(grid) {
  const columns = clampNumber(grid.columns, 1, 8);
  const min = clampNumber(grid.itemMin, 80, 320);

  if (grid.autoMode === "fixed") return \`repeat(\${columns}, minmax(0, 1fr))\`;

  return \`repeat(auto-\${grid.autoMode}, minmax(\${min}px, 1fr))\`;
}

function getTemplateRows(grid) {
  const rows = clampNumber(grid.rows, 1, 8);
  const min = Math.max(72, Math.round(clampNumber(grid.itemMin, 80, 320) * 0.58));

  return \`repeat(\${rows}, minmax(\${min}px, auto))\`;
}

function getGridRole(grid) {
  return impliedRoles[grid.element] === grid.role ? undefined : grid.role;
}

function getGridAriaLabel(grid) {
  return grid.landmarkLabel || undefined;
}

function getShellStyle(grid, hovered) {
  return {
    width: grid.width,
    maxWidth: "100%",
    minHeight: grid.height,
    margin: grid.margin,
    padding: grid.padding,
    borderRadius: grid.radius,
    border: \`\${grid.borderWidth}px solid \${hovered && grid.hoverEnabled ? grid.hoverBorder : grid.border}\`,
    boxShadow: hovered && grid.hoverEnabled ? grid.hoverShadow : \`0 \${Math.round(grid.shadow / 3)}px \${grid.shadow}px rgba(0,0,0,.28)\`,
    background: hovered && grid.hoverEnabled ? grid.hoverBg : grid.background,
    color: grid.foreground,
    fontFamily: grid.fontFamily,
    display: "grid",
    gridTemplateColumns: getTemplateColumns(grid),
    gridTemplateRows: getTemplateRows(grid),
    gridAutoFlow: grid.dense ? "row dense" : "row",
    gap: grid.gap,
    justifyItems: grid.justifyItems || "stretch",
    alignItems: grid.alignItems || "stretch",
    alignContent: "start",
    transition: grid.motion ? "gap 0.2s ease, background 0.2s ease" : "none",
  };
}

function getItemStyle(grid, item) {
  const columns = clampNumber(grid.columns, 1, 8);
  const variant = getLayoutVariant(grid);
  const canSpan = columns > 1;
  const spanTwo = canSpan ? "span 2" : "span 1";
  const style = {
    minHeight: Math.max(64, Math.round(grid.itemMin * 0.54)),
    borderRadius: Math.max(10, Math.round(grid.radius * 0.5)),
    border: \`\${Math.max(1, grid.borderWidth)}px solid \${grid.border}\`,
    background: "rgba(255,255,255,.075)",
    padding: Math.max(12, Math.round(grid.padding * 0.45)),
    display: "grid",
    alignContent: "space-between",
    gap: Math.max(8, Math.round(grid.gap * 0.45)),
  };

  if (variant === "feature" && item === 1) {
    style.gridColumn = spanTwo;
    style.gridRow = "span 2";
  } else if (variant === "mosaic" && item % 5 === 1) {
    style.gridColumn = spanTwo;
  } else if (variant === "dashboard" && item % 3 === 0) {
    style.gridRow = "span 2";
  }

  return style;
}

export default function GridComponent() {
  const Element = config.element;
  const role = getGridRole(config);
  const items = buildItems(config.itemCount);
  const variant = getLayoutVariant(config);
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Element
      id={config.id || undefined}
      role={role}
      aria-label={getGridAriaLabel(config)}
      tabIndex={config.tabIndex}
      style={getShellStyle(config, isHovered)}
      data-layout-variant={variant}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ gridColumn: "1 / -1" }}>
        <h3 style={{ fontSize: config.titleSize, fontWeight: config.fontWeight, lineHeight: 1.1 }}>{config.title}</h3>
        <p style={{ marginTop: 8, color: config.muted, fontSize: config.bodySize, lineHeight: 1.55 }}>
          {config.description}
        </p>
      </div>
      {items.map((item) => (
        <article key={item} style={getItemStyle(config, item)} aria-label={\`Grid item \${item}\`} data-grid-cell="">
          <span style={{ color: config.accent, fontSize: 12, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase" }}>
            Item {item}
          </span>
          <span style={{ color: config.foreground, fontSize: config.bodySize, fontWeight: config.fontWeight }}>
            {variant} cell
          </span>
          <span style={{ color: config.muted, fontSize: 12 }}>
            {config.autoMode} / min {config.itemMin}px
          </span>
        </article>
      ))}
    </Element>
  );
}
`;
}
