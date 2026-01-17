"use client";

import React, { useState, useRef, useEffect } from "react";
import AppShell from "@/components/layout/AppShell";
import useHydrated from "@/components/hooks/useHydrated";
import { useHistoryState } from "../../../hooks/useHistoryState";
import LivePreview from "./_section/LivePreview";
import PreviewDownloadPanel, {
  DownloadFormat,
} from "@/app/components/controls/layout/SharedPreviewDownloadPanel";

// TODO: Create these sections next
import IconSelectionSection from "./_section/IconSelectionSection";
import IconBasicsSection from "./_section/IconBasicsSection";
import IconContainerSection from "./_section/IconContainerSection";
import IconEffectsSection from "./_section/IconEffectsSection";
import IconAnimationSection from "./_section/IconAnimationSection";
import { buildIconExportPayload } from "./_utils/exportUtils";
import { PreviewPanel } from "@/app/components/controls/layout/PreviewPanel";

import { type IconState, INITIAL_ICON_STATE } from "./types";

export default function IconPlaygroundPage() {
  const mounted = useHydrated();
  // Layout & Resize State
  const [activeSection, setActiveSection] = useState("basics");
  const [isDesktop, setIsDesktop] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(520);
  const splitRef = useRef<HTMLDivElement>(null);

  // History State
  const {
    state,
    set: updateState,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistoryState<IconState>(INITIAL_ICON_STATE);

  // Resize Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !splitRef.current) return;
      const newWidth =
        e.clientX - splitRef.current.getBoundingClientRect().left;
      if (newWidth > 320 && newWidth < 900) {
        setLeftPanelWidth(newWidth);
      }
    };
    const handleMouseUp = () => setIsResizing(false);

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none";
    } else {
      document.body.style.userSelect = "";
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
    };
  }, [isResizing]);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Download Props
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [downloadFormat, setDownloadFormat] = useState<DownloadFormat>("react");
  const [downloadName, setDownloadName] = useState("icon-component");

  const handleDownload = () => {
    // TODO: Implement buildIconExportPayload
    const { content, filename } = buildIconExportPayload({
      downloadFormat,
      downloadName,
      ...state,
    });

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Section Mapping
  // Warning: Components defined below are placeholders until implemented
  const sections = [
    { id: "basics", label: "Basics", component: IconBasicsSection },
    { id: "container", label: "Container", component: IconContainerSection },
    { id: "icon", label: "Icon Lib", component: IconSelectionSection },
    { id: "effects", label: "Effects", component: IconEffectsSection },
    { id: "animation", label: "Animation", component: IconAnimationSection },
  ];

  // Generic Setter Helper
  const setKey = (key: keyof IconState) => (val: any) => {
    updateState((prev) => ({
      ...prev,
      [key]: typeof val === "function" ? val(prev[key]) : val,
    }));
  };
  // Helper for float values
  const setFloat = (key: keyof IconState) => (val: any) => {
    const num = parseFloat(val);
    updateState((prev) => ({ ...prev, [key]: isNaN(num) ? 0 : num }));
  };

  const activeComp = sections.find((s) => s.id === activeSection);
  const ActiveComponent = activeComp?.component || IconBasicsSection;

  return (
    <AppShell contentOverflow="hidden">
      <div
        ref={splitRef}
        className="flex flex-col gap-6 h-full lg:min-h-0 lg:flex-row lg:overflow-hidden"
        style={{ userSelect: isResizing ? "none" : "auto" }}
      >
        {/* Left Column: Controls */}
        <div
          className="flex-1 space-y-6 px-4 lg:min-h-0 lg:overflow-y-auto lg:px-6 lg:pb-10 lg:overscroll-contain lg:h-full"
          style={{
            scrollbarGutter: "stable",
            ...(isDesktop ? { width: leftPanelWidth, flex: "0 0 auto" } : null),
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1
              className="text-2xl font-bold tracking-tight"
              style={{ color: "var(--text)" }}
            >
              Icon Studio
            </h1>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={undo}
                disabled={!canUndo}
                className="flex items-center justify-center p-2 rounded-lg border transition-all"
                style={{
                  borderColor: "var(--border)",
                  color: canUndo ? "var(--text)" : "var(--muted)",
                  opacity: canUndo ? 1 : 0.5,
                  cursor: canUndo ? "pointer" : "not-allowed",
                  background: canUndo ? "var(--card)" : "transparent",
                }}
                title="Undo (Ctrl+Z)"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 7v6h6" />
                  <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
                </svg>
              </button>
              <button
                type="button"
                onClick={redo}
                disabled={!canRedo}
                className="flex items-center justify-center p-2 rounded-lg border transition-all"
                style={{
                  borderColor: "var(--border)",
                  color: canRedo ? "var(--text)" : "var(--muted)",
                  opacity: canRedo ? 1 : 0.5,
                  cursor: canRedo ? "pointer" : "not-allowed",
                  background: canRedo ? "var(--card)" : "transparent",
                }}
                title="Redo (Ctrl+Y)"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 7v6h-6" />
                  <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" />
                </svg>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div
            className="rounded-2xl border p-3"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in oklab, var(--card) 70%, transparent)",
            }}
          >
            <div
              className="text-xs font-semibold mb-3"
              style={{ color: "var(--muted)" }}
            >
              Sections
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {sections.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className="min-h-[52px] w-full rounded-xl border px-4 py-3 text-sm font-semibold leading-snug text-center whitespace-normal break-words uf-clickable transition-all"
                  style={{
                    borderColor: "var(--border)",
                    background:
                      activeSection === item.id
                        ? "var(--primary)"
                        : "transparent",
                    color: activeSection === item.id ? "white" : "var(--text)",
                    boxShadow:
                      activeSection === item.id
                        ? "0 4px 12px var(--primary-shadow)"
                        : "none",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <ActiveComponent state={state} setKey={setKey} setFloat={setFloat} />
        </div>

        {/* Resizer */}
        <div className="hidden lg:flex lg:items-stretch" aria-hidden="true">
          <div
            onMouseDown={() => setIsResizing(true)}
            className="h-full w-2 cursor-col-resize rounded-full transition-colors hover:bg-slate-300 dark:hover:bg-slate-700"
            style={{
              background: "color-mix(in oklab, var(--border) 80%, transparent)",
            }}
            title="Drag to resize panels"
          />
        </div>

        {/* Right Column: Preview */}
        <div
          className="flex-1 lg:min-h-0 lg:overflow-y-auto lg:pb-10 lg:h-full"
          style={{ minWidth: 360 }}
        >
          <div className="sticky top-20 px-6">
            <PreviewDownloadPanel
              mounted={mounted}
              iframeSrcDoc=""
              iframeRef={iframeRef}
              handleIframeLoad={() => {}}
              downloadFormat={downloadFormat}
              setDownloadFormat={setDownloadFormat}
              downloadName={downloadName}
              setDownloadName={setDownloadName}
              handleDownload={handleDownload}
              previewNode={<LivePreview state={state} />}
            />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
