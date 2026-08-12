import type { CommandPaletteState } from "../types";

export type ExportPayload = { fileName: string; mimeType: "text/plain;charset=utf-8"; content: string };

export function buildExportPayload(state: CommandPaletteState, fileName = "command-palette"): ExportPayload {
  return { fileName: `${fileName || "command-palette"}.jsx`, mimeType: "text/plain;charset=utf-8", content: buildReactCode(state) };
}

export function buildReactCode(state: CommandPaletteState) {
  const serializedState = JSON.stringify(state, null, 2);
  return `import * as React from "react";

const state = ${serializedState};

const systemFonts = ${JSON.stringify(["Arial, system-ui","Consolas, \"Liberation Mono\", \"Courier New\", ui-monospace, monospace","\"Courier New\", ui-monospace, monospace","Georgia, ui-serif, serif","Helvetica, Arial, system-ui","Menlo, Monaco, Consolas, \"Liberation Mono\", ui-monospace, monospace","Monaco, Menlo, Consolas, \"Liberation Mono\", ui-monospace, monospace","Roboto, system-ui, -apple-system, Arial","\"Segoe UI\", system-ui, -apple-system, Arial","system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial","\"Times New Roman\", Times, ui-serif, serif","ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace","ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial","ui-serif, Georgia, Cambria, \"Times New Roman\", Times, serif"])};
function resolveFont(s) { return s.fontBucket === "google" ? '"' + s.googleFontFamily + '", sans-serif' : (systemFonts[s.systemFontIdx] || "system-ui"); }
function buildShadow(s) { if (!s.shadowEnabled) return "none"; var hex = Math.round(s.shadowOpacity * 255).toString(16).padStart(2, "0"); return s.shadowX + "px " + s.shadowY + "px " + s.shadowBlur + "px " + s.shadowSpread + "px " + s.shadowColor + hex; }

const GROUP_LABELS = ["Navigation", "Actions", "Records", "Settings", "Support", "Recent", "Admin", "Shortcuts"];
const COMMAND_HELPERS = [
  "Open matching workspace",
  "Run primary action",
  "Jump to recent result",
  "Create a filtered view",
  "Review team workflow",
  "Pin this command",
  "Open detail panel",
  "Copy command link",
];
const SHORTCUTS = ["Ctrl+K", "G D", "Shift+Ctrl+P", "Ctrl+Enter", "Ctrl+1", "Ctrl+2", "Ctrl+3", "Esc"];

function cleanId(value) {
  return value.trim().replace(/[^a-zA-Z0-9_-]+/g, "-") || "command-palette";
}

function textValue(value, fallback) {
  return value && value.trim() ? value : fallback;
}

function getCommandPaletteModel(currentState, queryOverride) {
  const id = cleanId(currentState.id);
  const rawTotal = currentState.emptyState || currentState.previewState === "empty" ? 0 : Math.max(0, Math.floor(currentState.itemCount));
  const sourceTotal = Math.min(rawTotal, Math.max(0, Math.floor(currentState.maxResults)) || rawTotal);
  const groupCount = currentState.groupsEnabled
    ? Math.max(1, Math.min(Math.floor(currentState.groupCount), Math.max(sourceTotal, 1)))
    : 1;
  const isLoading = currentState.previewState === "loading";
  const isError = currentState.previewState === "error";
  const isInitiallyOpen = currentState.previewState !== "closed";
  const label = textValue(currentState.label, "Command");
  const query = queryOverride ?? currentState.query ?? "";
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const groups = Array.from({ length: groupCount }, (_, groupIndex) => {
    const groupLabel = !currentState.groupsEnabled ? "All commands" : currentState.recentEnabled && groupIndex === 0 ? "Recent" : GROUP_LABELS[groupIndex % GROUP_LABELS.length];
    const options = Array.from({ length: sourceTotal }, (_, index) => index)
      .filter((index) => index % groupCount === groupIndex)
      .map((index) => ({
        id: id + "-option-" + index,
        index,
        label: label + " " + (index + 1),
        helper: COMMAND_HELPERS[index % COMMAND_HELPERS.length],
        shortcut: SHORTCUTS[index % SHORTCUTS.length],
      }))
      .filter((option) => !normalizedQuery || [option.label, option.helper, option.shortcut, groupLabel].some((value) => value.toLocaleLowerCase().includes(normalizedQuery)));

    return {
      id: id + "-group-" + groupIndex,
      label: groupLabel,
      options,
    };
  }).filter((group) => group.options.length > 0);
  const visibleOptions = groups.flatMap((group) => group.options);
  const totalOptions = visibleOptions.length;
  const preferredIndex = Math.max(0, Math.min(Math.floor(currentState.highlightedIndex), Math.max(sourceTotal - 1, 0)));
  const activeIndex = totalOptions ? (visibleOptions.some((option) => option.index === preferredIndex) ? preferredIndex : visibleOptions[0].index) : -1;
  const isEmpty = totalOptions === 0;

  return {
    baseId: id,
    labelId: id + "-label",
    inputId: id + "-input",
    listboxId: id + "-listbox",
    helperId: id + "-helper",
    errorId: id + "-error",
    triggerId: id + "-trigger",
    inputLabel: textValue(currentState.inputLabel, "Search commands"),
    placeholder: textValue(currentState.placeholder, "Type a command or search route..."),
    query,
    emptyMessage: textValue(currentState.emptyMessage, "No commands match the current search."),
    loadingMessage: textValue(currentState.loadingMessage, "Loading command results..."),
    errorMessage: textValue(currentState.errorMessage, "Commands could not be loaded."),
    resultLabel: textValue(currentState.resultLabel, totalOptions + " command" + (totalOptions === 1 ? "" : "s") + " available"),
    isInitiallyOpen,
    isLoading,
    isEmpty,
    isError,
    activeIndex,
    totalOptions,
    groups,
  };
}

function getShellStyle(currentState) {
  const radius = currentState.radiusLinked ? currentState.radius + "px" : currentState.radiusTL + "px " + currentState.radiusTR + "px " + currentState.radiusBR + "px " + currentState.radiusBL + "px";
  return {
    width: currentState.width,
    minHeight: currentState.height,
    padding: currentState.padding,
    gap: currentState.gap,
    borderRadius: radius,
    border: currentState.borderWidth + "px " + currentState.borderStyle + " " + (currentState.disabled && currentState.disabledUseCustomColors ? currentState.disabledBorder : currentState.border),
    boxShadow: buildShadow(currentState),
    background: currentState.disabled && currentState.disabledUseCustomColors ? currentState.disabledBg : currentState.background,
    color: currentState.disabled && currentState.disabledUseCustomColors ? currentState.disabledText : currentState.foreground,
    fontFamily: resolveFont(currentState),
    fontStyle: currentState.fontStyle,
    textTransform: currentState.textTransform,
    textDecoration: currentState.textDecoration,
    letterSpacing: currentState.letterSpacing + currentState.letterSpacingUnit,
    lineHeight: currentState.lineHeight,
    opacity: currentState.disabled ? currentState.disabledOpacity : 1,
    cursor: currentState.disabled ? currentState.disabledCursor : undefined,
    display: "grid",
    transition: currentState.transitionDuration > 0 ? "all " + currentState.transitionDuration + "ms " + currentState.transitionEasing : "none",
  };
}

export default function CommandPaletteComponent({ onCommand }) {
  const initialModel = getCommandPaletteModel(state);
  const [isOpen, setIsOpen] = React.useState(initialModel.isInitiallyOpen);
  const [activeIndex, setActiveIndex] = React.useState(initialModel.activeIndex);
  const [query, setQuery] = React.useState(initialModel.query);
  const [debouncedQuery, setDebouncedQuery] = React.useState(initialModel.query);
  const [isSearching, setIsSearching] = React.useState(false);
  const [announcement, setAnnouncement] = React.useState("");
  const model = getCommandPaletteModel(state, debouncedQuery);
  const visibleOptions = model.groups.flatMap((group) => group.options);
  const activeDescendant = isOpen && activeIndex >= 0 ? model.baseId + "-option-" + activeIndex : undefined;
  const describedBy = model.isError ? model.helperId + " " + model.errorId : model.helperId;

  React.useEffect(() => {
    if (state.searchDebounce <= 0) {
      setDebouncedQuery(query);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsSearching(false);
    }, state.searchDebounce);
    return () => clearTimeout(timer);
  }, [query]);

  React.useEffect(() => { setActiveIndex(model.activeIndex); }, [debouncedQuery, model.activeIndex]);

  React.useEffect(() => {
    if (!state.keyboardShortcut.toLocaleLowerCase().replaceAll(" ", "").endsWith("+k")) return;
    const openFromShortcut = (event) => { if ((event.ctrlKey || event.metaKey) && event.key.toLocaleLowerCase() === "k") { event.preventDefault(); setIsOpen(true); } };
    document.addEventListener("keydown", openFromShortcut);
    return () => document.removeEventListener("keydown", openFromShortcut);
  }, []);

  const moveActive = (delta) => {
    if (!visibleOptions.length) return;
    setActiveIndex((current) => {
      const position = visibleOptions.findIndex((option) => option.index === current);
      return visibleOptions[(Math.max(position, 0) + delta + visibleOptions.length) % visibleOptions.length].index;
    });
  };

  const executeOption = (optionIndex) => {
    const option = visibleOptions.find((candidate) => candidate.index === optionIndex);
    if (!option) return;
    setAnnouncement(option.label + " executed.");
    onCommand?.(option);
    setIsOpen(false);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
      moveActive(1);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setIsOpen(true);
      moveActive(-1);
    }

    if (event.key === "Enter" && isOpen && activeIndex >= 0) {
      event.preventDefault();
      executeOption(activeIndex);
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <section id={state.id} role="dialog" aria-modal="false" aria-labelledby={model.labelId} aria-describedby={describedBy} style={getShellStyle(state)}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          <div>
            <h3 id={model.labelId} style={{ margin: 0, fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
            <p style={{ margin: "4px 0 0", color: state.muted, fontSize: state.bodySize }}>{state.description}</p>
          </div>
          <button id={model.triggerId} type="button" disabled={state.disabled} aria-label={isOpen ? "Close command palette" : "Open command palette"} aria-expanded={isOpen} aria-controls={model.listboxId} onClick={() => setIsOpen((value) => !value)} style={{ borderRadius: 999, border: "1px solid " + state.border, padding: "4px 12px", color: state.accent, background: "transparent", fontSize: 12, fontWeight: 700, transition: state.transitionDuration > 0 ? "all " + state.transitionDuration + "ms " + state.transitionEasing : "none" }}>
            {isOpen ? "Close" : "Open"}
          </button>
        </div>

        <label htmlFor={model.inputId} style={{ display: "grid", gap: 8, fontSize: 14, fontWeight: 700 }}>
          <span>{model.inputLabel}</span>
          <div style={{ position: "relative" }}>
            <input id={model.inputId} role="combobox" type="search" disabled={state.disabled} value={query} placeholder={model.placeholder} aria-expanded={isOpen} aria-controls={model.listboxId} aria-activedescendant={activeDescendant} aria-autocomplete="list" aria-describedby={describedBy} onFocus={() => setIsOpen(true)} onChange={(event) => setQuery(event.target.value)} onKeyDown={handleInputKeyDown} style={{ width: "100%", borderRadius: 18, border: "1px solid " + (state.previewState === "focus" ? state.accent : state.border), padding: "12px 64px 12px 16px", outline: "none", background: "rgba(255,255,255,.06)", color: state.foreground }} />
            {state.keyboardShortcut && (
              <kbd style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", border: "1px solid " + state.border, borderRadius: 8, padding: "4px 8px", color: state.muted, fontSize: 12 }}>
                {state.keyboardShortcut}
              </kbd>
            )}
          </div>
        </label>

        <p id={model.helperId} style={{ margin: 0, color: state.muted, fontSize: 12 }}>{state.helper} - {isSearching ? "Searching..." : model.resultLabel}</p>
        {model.isError && <p id={model.errorId} role="alert" style={{ margin: 0, border: "1px solid " + state.border, borderRadius: 18, padding: "12px 16px", color: state.accent }}>{model.errorMessage}</p>}

        {isOpen && (
          <div id={model.listboxId} role="listbox" aria-label={model.inputLabel} style={{ display: "grid", gap: 12, border: "1px solid " + state.border, borderRadius: 24, padding: 12, background: "rgba(2,6,23,.18)", transition: state.transitionDuration > 0 ? "all " + state.transitionDuration + "ms " + state.transitionEasing : "none" }}>
            {model.isLoading && <div role="status" style={{ borderRadius: 18, padding: "12px 16px", color: state.muted }}>{model.loadingMessage}</div>}
            {!model.isLoading && model.isEmpty && <div role="status" style={{ borderRadius: 18, padding: "12px 16px", color: state.muted }}>{model.emptyMessage}</div>}
            {!model.isLoading && !model.isEmpty && model.groups.map((group) => (
              <div key={group.id} role="group" aria-label={group.label} style={{ display: "grid", gap: 8 }}>
                <p style={{ margin: 0, paddingInline: 8, color: state.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: ".18em" }}>{group.label}</p>
                {group.options.map((option) => {
                  const selected = option.index === activeIndex;

                  return (
                    <div key={option.id} id={option.id} role="option" aria-selected={selected} onMouseDown={(event) => event.preventDefault()} onMouseMove={() => setActiveIndex(option.index)} onClick={() => executeOption(option.index)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, cursor: "pointer", border: "1px solid " + (selected ? state.accent : "transparent"), borderRadius: 18, padding: "12px 16px", background: selected ? state.itemActiveBg : "transparent", color: selected ? state.itemActiveText : undefined, transition: state.transitionDuration > 0 ? "all " + state.transitionDuration + "ms " + state.transitionEasing : "none" }}>
                      <span>
                        <strong>{option.label}</strong>
                        <small style={{ display: "block", color: selected ? state.itemActiveText : state.muted }}>{option.helper}</small>
                      </span>
                      {state.showShortcuts && <kbd style={{ border: "1px solid " + state.border, borderRadius: 8, padding: "4px 8px", color: selected ? state.itemActiveText : state.muted, fontSize: 12 }}>{option.shortcut}</kbd>}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
        <p aria-live="polite" style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>{announcement}</p>
      </section>
    </div>
  );
}
`;
}
