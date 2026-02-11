"use client";

import React, { useState, useMemo, useDeferredValue } from "react";
import AppShell from "@/components/layout/AppShell";
import { PlaygroundLayout } from "@/app/components/controls/layout/PlaygroundLayout";
import PreviewDownloadPanel from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import useHydrated from "@/components/hooks/useHydrated";
import { useHistoryState } from "../../../hooks/useHistoryState";
import { DEFAULT_TYPOGRAPHY_STATE, type TypographyState } from "../types";
import { buildTypographyExport } from "./_utils/exportUtils";
import { TypographyPreview } from "./_components/TypographyPreview";
import UndoRedoButtons from "@/app/components/controls/layout/UndoRedoButtons";
import SectionSelector from "@/app/components/controls/layout/SectionSelector";

import ScaleSection from "./_section/ScaleSection";
import HeadingsSection from "./_section/HeadingsSection";
import BodySection from "./_section/BodySection";
import FontSection from "./_section/FontSection";
import SpacingSection from "./_section/SpacingSection";
import DecorationSection from "./_section/DecorationSection";
import AccessibilitySection from "./_section/AccessibilitySection";

type ActiveSection =
  | "scale"
  | "headings"
  | "body"
  | "font"
  | "spacing"
  | "decoration"
  | "a11y";

export default function TypographyPlayground() {
  const mounted = useHydrated();
  const {
    state,
    set: updateState,
    undo,
    redo,
    reset,
    canUndo,
    canRedo,
  } = useHistoryState<TypographyState>(DEFAULT_TYPOGRAPHY_STATE);

  const [activeSection, setActiveSection] = useState<ActiveSection>("scale");

  // Lifted state for sub-selections within sections
  const [selectedHeading, setSelectedHeading] = useState<1 | 2 | 3 | 4 | 5 | 6>(
    1,
  );
  const [selectedBody, setSelectedBody] = useState<
    "body" | "lead" | "small" | "caption"
  >("body");

  const handleUpdate = (key: keyof TypographyState, value: any) => {
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
      case "scale":
        return <ScaleSection state={state} update={handleUpdate} />;
      case "headings":
        return (
          <HeadingsSection
            state={state}
            update={handleUpdate}
            selectedLevel={selectedHeading}
            setSelectedLevel={setSelectedHeading}
          />
        );
      case "body":
        return (
          <BodySection
            state={state}
            update={handleUpdate}
            selectedStyle={selectedBody}
            setSelectedStyle={setSelectedBody}
          />
        );
      case "font":
        return <FontSection state={state} update={handleUpdate} />;
      case "spacing":
        return <SpacingSection state={state} update={handleUpdate} />;
      case "decoration":
        return <DecorationSection state={state} update={handleUpdate} />;
      case "a11y":
        return <AccessibilitySection state={state} update={handleUpdate} />;
      default:
        return null;
    }
  };

  const sections: { id: ActiveSection; label: string }[] = [
    { id: "scale", label: "Scale" },
    { id: "headings", label: "Headings" },
    { id: "body", label: "Body" },
    { id: "font", label: "Font" },
    { id: "spacing", label: "Spacing" },
    { id: "decoration", label: "Decoration" },
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

  // Export Logic
  const exportPayload = useMemo(() => state, [state]);
  const deferredExportPayload = useDeferredValue(exportPayload);
  const exportCode = useMemo(
    () => buildTypographyExport(deferredExportPayload),
    [deferredExportPayload],
  );

  // --- Preview ---
  const preview = (
    <PreviewDownloadPanel
      mounted={mounted}
      iframeSrcDoc=""
      iframeRef={{ current: null }}
      handleIframeLoad={() => {}}
      downloadFormat={state.downloadFormat || "react"}
      downloadName={state.downloadName || "typography"}
      setDownloadFormat={(v) => handleUpdate("downloadFormat", v as any)}
      setDownloadName={(v) => handleUpdate("downloadName", v)}
      handleDownload={() => {
        const { content, filename } = buildTypographyExport(exportPayload);
        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
      }}
      previewNode={
        <TypographyPreview
          state={state}
          activeSection={activeSection}
          selectedHeading={selectedHeading}
          selectedBody={selectedBody}
        />
      }
      code={exportCode.content}
    />
  );

  return (
    <AppShell contentOverflow="hidden">
      <PlaygroundLayout
        title="Typography Studio"
        headerActions={headerActions}
        controls={controls}
        preview={preview}
      />
    </AppShell>
  );
}
