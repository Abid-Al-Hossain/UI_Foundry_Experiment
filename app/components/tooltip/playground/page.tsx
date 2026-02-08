"use client";

import React, { useMemo } from "react";
import AppShell from "@/components/layout/AppShell";
import { PlaygroundLayout } from "@/app/components/controls/layout/PlaygroundLayout";
import PreviewDownloadPanel from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import { useHistoryState } from "@/app/hooks/useHistoryState";
import UndoRedoButtons from "@/app/components/controls/layout/UndoRedoButtons";
import SectionSelector from "@/app/components/controls/layout/SectionSelector";

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
  const { state, set, undo, redo, reset, canUndo, canRedo } =
    useHistoryState<TooltipState>(DEFAULT_TOOLTIP_STATE);

  // Generic updater
  const update = <K extends keyof TooltipState>(
    key: K,
    value: TooltipState[K],
  ) => {
    set((s: TooltipState) => ({ ...s, [key]: value }));
  };

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
    <UndoRedoButtons
      undo={undo}
      redo={redo}
      reset={reset}
      canUndo={canUndo}
      canRedo={canRedo}
    />
  );

  // Controls content
  const controlsContent = (
    <div className="p-6 space-y-8">
      {/* Section Selector */}
      {/* Section Selector */}
      <SectionSelector
        sections={sections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

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
