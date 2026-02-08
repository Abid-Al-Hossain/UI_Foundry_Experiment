"use client";

import React, { useState, useRef, useEffect } from "react";
import AppShell from "@/components/layout/AppShell";
import useHydrated from "@/components/hooks/useHydrated";
import { useHistoryState } from "../../../hooks/useHistoryState";
import LivePreview from "./_section/LivePreview";
import PreviewDownloadPanel, {
  DownloadFormat,
} from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import { ScrollArea } from "@/app/components/controls/layout/ScrollArea";
import UndoRedoButtons from "@/app/components/controls/layout/UndoRedoButtons";
import SectionSelector from "@/app/components/controls/layout/SectionSelector";

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
    reset,
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
        className="flex flex-col gap-6 h-full overflow-y-auto lg:min-h-0 lg:flex-row lg:overflow-hidden"
        style={
          {
            userSelect: isResizing ? "none" : "auto",
            "--left-panel-width": `${leftPanelWidth}px`,
          } as React.CSSProperties
        }
      >
        {/* Left Column: Controls */}
        <ScrollArea
          className="flex-1 space-y-6 px-4 lg:min-h-0 lg:px-6 lg:pb-10 lg:overscroll-contain lg:h-full"
          style={{
            scrollbarGutter: "stable",
            width: "var(--left-panel-width, 520px)",
            minWidth: "var(--left-panel-width, 520px)",
            flex: "0 0 auto",
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
              <UndoRedoButtons
                undo={undo}
                redo={redo}
                reset={reset}
                canUndo={canUndo}
                canRedo={canRedo}
              />
            </div>
          </div>

          {/* Tabs */}
          <SectionSelector
            sections={sections}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />

          <ActiveComponent state={state} setKey={setKey} setFloat={setFloat} />
        </ScrollArea>

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
          className="flex-1 lg:min-h-0 lg:pb-0 lg:h-full"
          style={{ minWidth: 360 }}
        >
          <div className="h-full w-full">
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
