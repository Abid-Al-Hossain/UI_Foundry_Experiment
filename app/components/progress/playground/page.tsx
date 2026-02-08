"use client";

import React, { useState, useRef } from "react";
import AppShell from "@/components/layout/AppShell";
import { PlaygroundLayout } from "@/app/components/controls/layout/PlaygroundLayout";
import { ScrollArea } from "@/app/components/controls/layout/ScrollArea";
import PreviewDownloadPanel from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import useHydrated from "@/components/hooks/useHydrated";
import { useHistoryState } from "../../../hooks/useHistoryState";
import { INITIAL_PROGRESS_STATE, type ProgressState } from "../types";
import { buildProgressExport } from "./_utils/exportUtils";
import { ProgressPreview } from "./_components/ProgressPreview";
import UndoRedoButtons from "@/app/components/controls/layout/UndoRedoButtons";
import SectionSelector from "@/app/components/controls/layout/SectionSelector";

import BasicsSection from "./_section/BasicsSection";
import StylingSection from "./_section/StylingSection";
import EffectsSection from "./_section/EffectsSection";
import ContentSection from "./_section/ContentSection";
import LabelsSection from "./_section/LabelsSection";
import ThreeDSection from "./_section/ThreeDSection";
import AccessibilitySection from "./_section/AccessibilitySection";
import { type ProgressLabelConfig } from "../types";

export default function ProgressBarPlayground() {
  const mounted = useHydrated();
  const {
    state,
    set: updateState,
    undo,
    redo,
    reset,
    canUndo,
    canRedo,
  } = useHistoryState<ProgressState>(INITIAL_PROGRESS_STATE);
  const [activeSection, setActiveSection] = useState("basics");

  const handleUpdate = (key: keyof ProgressState, value: any) => {
    updateState((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdateLabels = (labels: ProgressLabelConfig[]) => {
    updateState((prev) => ({ ...prev, labels }));
  };

  // --- Header Actions (Matching Avatar Template) ---
  const headerActions = (
    <UndoRedoButtons
      undo={undo}
      redo={redo}
      reset={reset}
      canUndo={canUndo}
      canRedo={canRedo}
    />
  );

  // --- Controls & Navigation ---
  const renderActiveSection = () => {
    switch (activeSection) {
      case "basics":
        return <BasicsSection state={state} update={handleUpdate} />;
      case "styling":
        return <StylingSection state={state} update={handleUpdate} />;
      case "effects":
        return <EffectsSection state={state} update={handleUpdate} />;
      case "content":
        return <ContentSection state={state} update={handleUpdate} />;
      case "labels":
        return (
          <LabelsSection state={state} updateLabels={handleUpdateLabels} />
        );
      case "3d":
        return <ThreeDSection state={state} update={handleUpdate} />;
      case "a11y":
        return <AccessibilitySection state={state} update={handleUpdate} />;
      default:
        return null;
    }
  };

  const sections = [
    { id: "basics", label: "Basics" },
    { id: "styling", label: "Styling" },
    { id: "effects", label: "Effects" },
    { id: "labels", label: "Labels" },
    { id: "content", label: "Content" },
    { id: "3d", label: "3D" },
    { id: "a11y", label: "A11y" },
  ];

  const controls = (
    <div className="p-6 space-y-8">
      <SectionSelector
        sections={sections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      {renderActiveSection()}
    </div>
  );

  // --- Preview & Download ---
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const preview = (
    <PreviewDownloadPanel
      mounted={mounted}
      iframeSrcDoc="" // We use inline React preview for progress bar
      iframeRef={{ current: null }}
      handleIframeLoad={() => {}}
      downloadFormat={state.downloadFormat || "react"}
      downloadName={state.downloadName || "progress"}
      setDownloadFormat={(v) => handleUpdate("downloadFormat", v)}
      setDownloadName={(v) => handleUpdate("downloadName", v)}
      handleDownload={() => {
        const { content, filename } = buildProgressExport({
          ...state,
          downloadFormat: state.downloadFormat || "react",
          downloadName: state.downloadName || "progress",
        });
        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
      }}
      previewNode={
        <div className="flex items-center justify-center p-12 bg-slate-900 rounded-xl min-h-[400px] overflow-hidden relative w-full h-full">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, #334155 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <ProgressPreview state={state} />
        </div>
      }
    />
  );

  return (
    <AppShell contentOverflow="hidden">
      <PlaygroundLayout
        title="Progress Playground"
        headerActions={headerActions}
        controls={controls}
        preview={preview}
      />
    </AppShell>
  );
}
