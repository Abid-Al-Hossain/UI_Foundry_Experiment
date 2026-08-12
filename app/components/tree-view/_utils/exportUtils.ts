import type { TreeViewState } from "../types";

export type ExportPayload = { fileName: string; mimeType: "text/plain;charset=utf-8"; content: string };

export function buildExportPayload(state: TreeViewState, fileName = "tree-view"): ExportPayload {
  return { fileName: `${fileName || "tree-view"}.jsx`, mimeType: "text/plain;charset=utf-8", content: buildReactCode(state) };
}

export function buildReactCode(state: TreeViewState) {
  return `import * as React from "react";

const state = ${JSON.stringify(state, null, 2)};
const systemFonts = ${JSON.stringify(["Arial, system-ui","Consolas, \"Liberation Mono\", \"Courier New\", ui-monospace, monospace","\"Courier New\", ui-monospace, monospace","Georgia, ui-serif, serif","Helvetica, Arial, system-ui","Menlo, Monaco, Consolas, \"Liberation Mono\", ui-monospace, monospace","Monaco, Menlo, Consolas, \"Liberation Mono\", ui-monospace, monospace","Roboto, system-ui, -apple-system, Arial","\"Segoe UI\", system-ui, -apple-system, Arial","system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial","\"Times New Roman\", Times, ui-serif, serif","ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace","ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial","ui-serif, Georgia, Cambria, \"Times New Roman\", Times, serif"])};
function resolveFont(s) { return s.fontBucket === "google" ? '"' + s.googleFontFamily + '", sans-serif' : (systemFonts[s.systemFontIdx] || "system-ui"); }
function buildShadow(s) { if (!s.shadowEnabled) return "none"; var hex = Math.round(s.shadowOpacity * 255).toString(16).padStart(2, "0"); return s.shadowX + "px " + s.shadowY + "px " + s.shadowBlur + "px " + s.shadowSpread + "px " + s.shadowColor + hex; }


function buildNodes(config) {
  const count = Math.max(1, config.itemCount);
  const depth = Math.max(1, config.depth);
  const nodes = Array.from({ length: count }).map((_, index) => {
    const level = depth === 1 ? 1 : index === 0 ? 1 : 2 + ((index - 1) % (depth - 1));
    const parentIndex = [...Array(index).keys()].reverse().find((candidate) => {
      const candidateLevel = depth === 1 ? 1 : candidate === 0 ? 1 : 2 + ((candidate - 1) % (depth - 1));
      return candidateLevel === level - 1;
    }) ?? 0;
    return {
      id: \`\${config.id}-node-\${index + 1}\`,
      label: \`\${config.label} \${index + 1}\`,
      level,
      parentId: level === 1 ? null : \`\${config.id}-node-\${parentIndex + 1}\`,
      posinset: 1,
      setsize: 1,
      expandable: false,
      disabled: index >= Math.max(0, count - config.disabledItems),
    };
  });

  return nodes.map((node) => {
    const siblings = nodes.filter((candidate) => candidate.parentId === node.parentId);
    return { ...node, posinset: siblings.findIndex((candidate) => candidate.id === node.id) + 1, setsize: siblings.length, expandable: nodes.some((candidate) => candidate.parentId === node.id) };
  });
}

function panelStyle(config) {
  const radius = config.radiusLinked ? config.radius + "px" : config.radiusTL + "px " + config.radiusTR + "px " + config.radiusBR + "px " + config.radiusBL + "px";
  return {
    width: config.width,
    minHeight: config.height,
    padding: config.padding,
    borderRadius: radius,
    border: config.borderWidth + "px " + config.borderStyle + " " + (config.disabled && config.disabledUseCustomColors ? config.disabledBorder : config.border),
    boxShadow: buildShadow(config),
    background: config.disabled && config.disabledUseCustomColors ? config.disabledBg : config.background,
    color: config.disabled && config.disabledUseCustomColors ? config.disabledText : config.foreground,
    fontFamily: resolveFont(config),
    fontStyle: config.fontStyle,
    textTransform: config.textTransform,
    textDecoration: config.textDecoration,
    letterSpacing: config.letterSpacing + config.letterSpacingUnit,
    lineHeight: config.lineHeight,
    opacity: config.disabled ? config.disabledOpacity : 1,
    cursor: config.disabled ? config.disabledCursor : undefined,
    display: "grid",
    gap: 16,
  };
}

export default function TreeViewComponent() {
  const nodes = React.useMemo(() => buildNodes(state), []);
  const initialSelected = state.selectionMode === "none" ? [] : [nodes[Math.min(1, nodes.length - 1)].id];
  const [activeId, setActiveId] = React.useState(nodes[0].id);
  const [selectedIds, setSelectedIds] = React.useState(() => new Set(initialSelected));
  const [hoverId, setHoverId] = React.useState("");
  const [expanded, setExpanded] = React.useState(() => new Set(nodes.slice(0, state.expandedCount).filter((node) => node.expandable).map((node) => node.id)));
  const itemRefs = React.useRef(new Map());
  const isLoading = state.previewState === "loading";
  const isEmpty = state.previewState === "empty";
  const nodeById = React.useMemo(() => new Map(nodes.map((node) => [node.id, node])), [nodes]);
  const isVisible = (node) => {
    let parentId = node.parentId;
    while (parentId) {
      if (!expanded.has(parentId)) return false;
      parentId = nodeById.get(parentId)?.parentId ?? null;
    }
    return true;
  };
  const visibleNodes = nodes.filter(isVisible);
  const safeActiveId = visibleNodes.some((node) => node.id === activeId) ? activeId : visibleNodes[0]?.id ?? nodes[0].id;
  const activeNode = nodeById.get(safeActiveId) ?? nodes[0];

  function focusNode(id) {
    setActiveId(id);
    window.requestAnimationFrame(() => itemRefs.current.get(id)?.focus());
  }

  function toggleExpanded(node) {
    if (!node.expandable) return;
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(node.id)) next.delete(node.id);
      else next.add(node.id);
      return next;
    });
  }

  function toggleSelected(node) {
    if (state.selectionMode === "none" || node.disabled) return;
    setSelectedIds((current) => {
      if (state.selectionMode === "single") return new Set([node.id]);
      const next = new Set(current);
      if (next.has(node.id)) next.delete(node.id); else next.add(node.id);
      return next;
    });
  }

  function onTreeKeyDown(event) {
    if (state.disabled || isLoading || isEmpty) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const position = visibleNodes.findIndex((node) => node.id === activeNode.id);
      focusNode(visibleNodes[Math.min(visibleNodes.length - 1, position + 1)].id);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      const position = visibleNodes.findIndex((node) => node.id === activeNode.id);
      focusNode(visibleNodes[Math.max(0, position - 1)].id);
    }

    if (event.key === "Home") {
      event.preventDefault();
      focusNode(visibleNodes[0].id);
    }

    if (event.key === "End") {
      event.preventDefault();
      focusNode(visibleNodes[visibleNodes.length - 1].id);
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleSelected(activeNode);
    }

    if (event.key === "ArrowRight" && activeNode?.expandable) {
      event.preventDefault();
      if (!expanded.has(activeNode.id)) setExpanded((current) => new Set(current).add(activeNode.id));
      else {
        const firstChild = nodes.find((node) => node.parentId === activeNode.id);
        if (firstChild) focusNode(firstChild.id);
      }
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (activeNode.expandable && expanded.has(activeNode.id)) {
        setExpanded((current) => { const next = new Set(current); next.delete(activeNode.id); return next; });
      } else if (activeNode.parentId) focusNode(activeNode.parentId);
    }
  }

  return (
    <section id={state.id} aria-labelledby={state.id + "-title"} aria-describedby={state.id + "-help"} style={panelStyle(state)}>
      <div style={{ display: "grid", gap: 4 }}>
        <h3 id={state.id + "-title"} style={{ fontSize: state.titleSize, fontWeight: state.fontWeight, margin: 0 }}>{state.title}</h3>
        <p style={{ color: state.muted, fontSize: state.bodySize, margin: 0 }}>{state.description}</p>
      </div>
      <div
        role="tree"
        aria-label={state.ariaLabel}
        aria-busy={isLoading || undefined}
        aria-disabled={state.disabled || undefined}
        tabIndex={state.disabled ? -1 : state.tabIndex}
        onKeyDown={onTreeKeyDown}
        style={{ display: "grid", gap: Math.max(4, Math.round(state.gap / 2)), border: "1px solid " + state.border, borderRadius: 16, padding: 8, outline: "none" }}
        data-audit="tree-preview"
        data-testid="tree-preview"
      >
        {isLoading ? <div role="status" style={{ padding: "8px 12px", color: state.loadingSpinnerColor, fontSize: 14 }}>Loading tree nodes...</div> : null}
        {isEmpty ? <div role="treeitem" aria-selected={false} aria-level={1} aria-posinset={1} aria-setsize={1} style={{ padding: "8px 12px", color: state.muted, fontSize: 14 }}>No tree nodes available.</div> : null}
        {!isLoading && !isEmpty ? visibleNodes.map((node) => {
          const active = node.id === safeActiveId;
          const selected = state.selectionMode !== "none" && selectedIds.has(node.id);
          const hovered = hoverId === node.id && !node.disabled && !selected;
          const open = expanded.has(node.id);
          const nodeBg = selected ? state.itemActiveBg : active && !hovered ? state.itemFocusBg : hovered ? state.itemHoverBg : state.itemBg;
          const nodeColor = node.disabled ? state.itemDisabledColor : selected ? state.itemSelectedText : hovered ? state.itemHoverText : state.itemText;
          const folderColor = node.expandable ? (open ? state.folderOpenIconColor : state.folderIconColor) : state.leafIconColor;

          return (
            <div
              key={node.id}
              ref={(element) => { if (element) itemRefs.current.set(node.id, element); else itemRefs.current.delete(node.id); }}
              id={node.id}
              role="treeitem"
              aria-level={node.level}
              aria-posinset={node.posinset}
              aria-setsize={node.setsize}
              aria-expanded={node.expandable ? open : undefined}
              aria-selected={state.selectionMode === "none" ? false : selected}
              aria-disabled={node.disabled || undefined}
              tabIndex={active ? 0 : -1}
              onClick={() => {
                if (node.disabled) return;
                focusNode(node.id);
                toggleSelected(node);
              }}
              onMouseEnter={() => setHoverId(node.id)}
              onMouseLeave={() => setHoverId("")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginLeft: (node.level - 1) * state.indentSize,
                minHeight: state.itemHeight,
                padding: "0 " + state.itemPadding + "px",
                borderRadius: state.itemRadius,
                borderLeft: node.level > 1 ? "2px solid " + state.indentGuideColor : undefined,
                background: nodeBg,
                color: nodeColor,
                outline: selected ? "1px solid " + state.itemSelectedBorder : undefined,
                cursor: node.disabled ? state.disabledCursor : "pointer",
                fontSize: 14,
              }}
            >
              <button type="button" tabIndex={-1} disabled={!node.expandable || node.disabled} aria-label={node.expandable ? (open ? "Collapse " : "Expand ") + node.label : undefined} onClick={(event) => { event.stopPropagation(); toggleExpanded(node); }} style={{ display: "grid", placeItems: "center", width: state.expandIconSize, height: state.expandIconSize, flexShrink: 0, border: 0, padding: 0, background: "transparent", color: state.expandIconColor, transition: state.transitionDuration > 0 ? "transform " + state.transitionDuration + "ms " + state.transitionEasing : "none", transform: node.expandable && open ? "rotate(90deg)" : "none" }}>
                <svg aria-hidden="true" width={state.expandIconSize} height={state.expandIconSize} viewBox="0 0 14 14" fill="none">{node.expandable ? <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> : <circle cx="7" cy="7" r="1.5" fill="currentColor" />}</svg>
              </button>
              {state.checkboxEnabled ? <span aria-hidden="true" style={{ display: "inline-grid", placeItems: "center", width: 16, height: 16, borderRadius: 4, border: "1.5px solid " + state.checkboxColor, background: selected ? state.checkboxCheckedBg : "transparent", color: state.background, fontSize: 10 }}>{selected ? "x" : ""}</span> : null}
              {state.showIcons ? <span aria-hidden="true" style={{ color: folderColor }}>{node.expandable ? (open ? "open folder" : "folder") : "file"}</span> : null}
              <span>{node.label}</span>
            </div>
          );
        }) : null}
      </div>
      <p id={state.id + "-help"} style={{ color: state.muted, fontSize: 12, margin: 0 }}>{state.helper} Use arrow keys, Home, End, Enter, and Space in the tree preview.</p>
    </section>
  );
}
`;
}
