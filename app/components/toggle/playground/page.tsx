"use client";
import React, { useState, useRef, useMemo, useDeferredValue } from "react";
import AppShell from "@/components/layout/AppShell";
import useHydrated from "@/components/hooks/useHydrated";
import { useHistoryState } from "../../../hooks/useHistoryState";
import LivePreview from "../_section/LivePreview";
import PreviewDownloadPanel, {
  DownloadFormat,
} from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import { PlaygroundLayout } from "@/app/components/controls/layout/PlaygroundLayout";
import UndoRedoButtons from "@/app/components/controls/layout/UndoRedoButtons";
import SectionSelector from "@/app/components/controls/layout/SectionSelector";

import BasicsSection from "../_section/BasicsSection";
import TrackSection from "../_section/TrackSection";
import ThumbSection from "../_section/ThumbSection";
import StatesSection from "../_section/StatesSection";
import EffectsSection from "../_section/EffectsSection";
import TypographySection from "../_section/TypographySection";
import AccessibilitySection from "../_section/AccessibilitySection";
import { buildToggleExportPayload } from "../_utils/exportUtils";
import { type ToggleState, INITIAL_STATE } from "../types";

export default function TogglePlaygroundPage() {
  const mounted = useHydrated();
  const [activeSection, setActiveSection] = useState("basics");
  const {
    state,
    set: updateState,
    undo,
    redo,
    reset,
    canUndo,
    canRedo,
  } = useHistoryState<ToggleState>(INITIAL_STATE);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [downloadFormat, setDownloadFormat] = useState<DownloadFormat>("html");
  const [downloadName, setDownloadName] = useState("toggle-switch");

  const exportPayload = useMemo(
    () => ({
      ...state,
      downloadFormat,
      downloadName: downloadName || "toggle-switch",
    }),
    [downloadFormat, downloadName, state],
  );
  const deferredExportPayload = useDeferredValue(exportPayload);
  const exportCode = useMemo(
    () => buildToggleExportPayload(deferredExportPayload),
    [deferredExportPayload],
  );

  const handleDownload = () => {
    const { content, filename } = buildToggleExportPayload(exportPayload);
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

  const sections = [
    { id: "basics", label: "Basics", component: BasicsSection },
    { id: "track", label: "Track", component: TrackSection },
    { id: "thumb", label: "Thumb", component: ThumbSection },
    { id: "states", label: "States", component: StatesSection },
    { id: "effects", label: "Effects", component: EffectsSection },
    { id: "typography", label: "Typography", component: TypographySection },
    { id: "a11y", label: "A11y", component: AccessibilitySection },
  ];

  const setKey = (key: keyof ToggleState) => (val: any) => {
    updateState((prev) => ({
      ...prev,
      [key]: typeof val === "function" ? val(prev[key]) : val,
    }));
  };

  const activeComp = sections.find((s) => s.id === activeSection);
  const ActiveComponent = activeComp?.component || BasicsSection;
  const headerActions = (
    <UndoRedoButtons
      undo={undo}
      redo={redo}
      reset={reset}
      canUndo={canUndo}
      canRedo={canRedo}
    />
  );

  const controls = (
    <>
      <SectionSelector
        sections={sections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <ActiveComponent state={state} setKey={setKey} />
    </>
  );

  const preview = (
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
      code={exportCode.content}
    />
  );

  return (
    <AppShell contentOverflow="hidden">
      <PlaygroundLayout
        title="Toggle / Switch Studio"
        headerActions={headerActions}
        controls={controls}
        preview={preview}
      />
    </AppShell>
  );
}
