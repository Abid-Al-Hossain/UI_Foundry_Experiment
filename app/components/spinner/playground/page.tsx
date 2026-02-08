"use client";

import React, { useState, useRef } from "react";
import AppShell from "@/components/layout/AppShell";
import { PlaygroundLayout } from "@/app/components/controls/layout/PlaygroundLayout";
import PreviewDownloadPanel from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import useHydrated from "@/components/hooks/useHydrated";
import { useHistoryState } from "../../../hooks/useHistoryState";
import { DEFAULT_SPINNER_STATE, type SpinnerState } from "../types";
import { buildSpinnerExport } from "./_utils/exportUtils";
import { SpinnerPreview } from "./_components/SpinnerPreview";
import UndoRedoButtons from "@/app/components/controls/layout/UndoRedoButtons";
import SectionSelector from "@/app/components/controls/layout/SectionSelector";

import BasicsSection from "./_section/BasicsSection";
import StylingSection from "./_section/StylingSection";
import EffectsSection from "./_section/EffectsSection";
import AccessibilitySection from "./_section/AccessibilitySection";
import LabelsSection from "./_section/LabelsSection";
import { SpinnerLabelConfig } from "../types";

export default function SpinnerPlayground() {
  const mounted = useHydrated();
  const {
    state,
    set: updateState,
    undo,
    redo,
    reset,
    canUndo,
    canRedo,
  } = useHistoryState<SpinnerState>(DEFAULT_SPINNER_STATE);

  const [activeSection, setActiveSection] = useState("basics");

  const handleUpdate = (key: keyof SpinnerState, value: any) => {
    updateState((prev) => ({ ...prev, [key]: value }));
  };

  // --- Header Actions ---
  const headerActions = (
    <UndoRedoButtons
      undo={undo}
      redo={redo}
      reset={reset}
      canUndo={canUndo}
      canRedo={canRedo}
    />
  );

  // --- Controls ---
  const renderActiveSection = () => {
    switch (activeSection) {
      case "basics":
        return <BasicsSection state={state} update={handleUpdate} />;
      case "styling":
        return <StylingSection state={state} update={handleUpdate} />;
      case "effects":
        return <EffectsSection state={state} update={handleUpdate} />;
      case "labels":
        return (
          <LabelsSection
            state={state}
            updateLabels={(labels) => handleUpdate("labels", labels)}
          />
        );
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

  // --- Preview ---
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const preview = (
    <PreviewDownloadPanel
      mounted={mounted}
      iframeSrcDoc=""
      iframeRef={{ current: null }}
      handleIframeLoad={() => {}}
      downloadFormat={state.downloadFormat || "react"}
      downloadName={state.downloadName || "spinner"}
      setDownloadFormat={(v) => handleUpdate("downloadFormat", v)}
      setDownloadName={(v) => handleUpdate("downloadName", v)}
      handleDownload={() => {
        const { content, filename } = buildSpinnerExport(state);
        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
      }}
      previewNode={<SpinnerPreview state={state} />}
    />
  );

  return (
    <AppShell contentOverflow="hidden">
      <PlaygroundLayout
        title="Spinner Studio"
        headerActions={headerActions}
        controls={controls}
        preview={preview}
      />
    </AppShell>
  );
}
