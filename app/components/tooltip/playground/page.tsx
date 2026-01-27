"use client";

import React, { useMemo } from "react";
import AppShell from "@/components/layout/AppShell";
import { PlaygroundLayout } from "@/app/components/controls/layout/PlaygroundLayout";
import PreviewDownloadPanel from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import { useHistoryState } from "@/app/hooks/useHistoryState";
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
} from "@heroicons/react/24/outline";

import {
  TooltipState,
  DEFAULT_TOOLTIP_STATE,
  DOWNLOAD_FORMAT_OPTIONS,
} from "../types";

// Section imports
import {
  PositionSection,
  AppearanceSection,
  ArrowSection,
  AnimationSection,
  TriggerSection,
  ContentSection,
  TypographySection,
  AccessibilitySection,
} from "./_section";

// Preview component
import TooltipPreview from "./_components/TooltipPreview";

// Export utilities
import { buildExportPayload } from "./_utils/exportUtils";

export default function TooltipPlayground() {
  const { state, set, undo, redo, canUndo, canRedo } =
    useHistoryState<TooltipState>(DEFAULT_TOOLTIP_STATE);

  // Generic updater
  const update = <K extends keyof TooltipState>(
    key: K,
    value: TooltipState[K],
  ) => {
    set((s: TooltipState) => ({ ...s, [key]: value }));
  };

  // Reset to default
  const reset = () => set(DEFAULT_TOOLTIP_STATE);

  // Active section for tab navigation
  const [activeSection, setActiveSection] = React.useState<string>("position");

  const sections = [
    { id: "position", label: "Position" },
    { id: "appearance", label: "Appearance" },
    { id: "arrow", label: "Arrow" },
    { id: "animation", label: "Animation" },
    { id: "trigger", label: "Trigger" },
    { id: "content", label: "Content" },
    { id: "typography", label: "Typography" },
    { id: "accessibility", label: "A11y" },
  ];

  // Handle download
  const handleDownload = () => {
    const { code, filename } = buildExportPayload(state, state.downloadFormat);
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Header actions (undo/redo/reset buttons)
  const headerActions = (
    <>
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
        <ArrowUturnLeftIcon className="w-5 h-5" />
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
        <ArrowUturnRightIcon className="w-5 h-5" />
      </button>
    </>
  );

  // Controls content
  const controlsContent = (
    <div className="p-6 space-y-8">
      {/* Section Selector */}
      <div
        className="rounded-2xl border p-3"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in oklab, var(--card) 70%, transparent)",
        }}
      >
        <div
          className="text-xs font-semibold"
          style={{ color: "var(--muted)" }}
        >
          Sections
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {sections.map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSection(sec.id)}
              className="min-h-[52px] w-full rounded-xl border px-4 py-3 text-sm font-semibold leading-snug text-center whitespace-normal break-words"
              style={{
                borderColor: "var(--border)",
                background:
                  activeSection === sec.id ? "var(--primary)" : "transparent",
                color: activeSection === sec.id ? "white" : "var(--text)",
              }}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Section Content */}
      {activeSection === "position" && (
        <PositionSection state={state} update={update} />
      )}
      {activeSection === "appearance" && (
        <AppearanceSection state={state} update={update} />
      )}
      {activeSection === "arrow" && (
        <ArrowSection state={state} update={update} />
      )}
      {activeSection === "animation" && (
        <AnimationSection state={state} update={update} />
      )}
      {activeSection === "trigger" && (
        <TriggerSection state={state} update={update} />
      )}
      {activeSection === "content" && (
        <ContentSection state={state} update={update} />
      )}
      {activeSection === "typography" && (
        <TypographySection state={state} update={update} />
      )}
      {activeSection === "accessibility" && (
        <AccessibilitySection state={state} update={update} />
      )}
    </div>
  );

  // Preview content
  const previewContent = (
    <PreviewDownloadPanel
      mounted={true}
      iframeSrcDoc=""
      iframeRef={React.createRef()}
      handleIframeLoad={() => {}}
      downloadName={state.downloadName}
      setDownloadName={(v) => update("downloadName", v)}
      downloadFormat={
        state.downloadFormat as
          | "html"
          | "react"
          | "tailwind"
          | "css-vars"
          | "scss"
          | "tailwind-config"
          | "figma-tokens"
      }
      setDownloadFormat={(v) =>
        update("downloadFormat", v as typeof state.downloadFormat)
      }
      handleDownload={handleDownload}
      previewNode={<TooltipPreview state={state} />}
    />
  );

  return (
    <AppShell>
      <PlaygroundLayout
        title="Tooltip Playground"
        headerActions={headerActions}
        controls={controlsContent}
        preview={previewContent}
      />
    </AppShell>
  );
}
