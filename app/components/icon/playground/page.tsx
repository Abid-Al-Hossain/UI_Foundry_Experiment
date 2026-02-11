"use client";

import React, { useState, useRef, useMemo, useDeferredValue } from "react";
import AppShell from "@/components/layout/AppShell";
import useHydrated from "@/components/hooks/useHydrated";
import { useHistoryState } from "../../../hooks/useHistoryState";
import LivePreview from "./_section/LivePreview";
import PreviewDownloadPanel, {
  DownloadFormat,
} from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import { PlaygroundLayout } from "@/app/components/controls/layout/PlaygroundLayout";
import UndoRedoButtons from "@/app/components/controls/layout/UndoRedoButtons";
import SectionSelector from "@/app/components/controls/layout/SectionSelector";

// Sections
import IconSelectionSection from "./_section/IconSelectionSection";
import IconBasicsSection from "./_section/IconBasicsSection";
import IconContainerSection from "./_section/IconContainerSection";
import IconEffectsSection from "./_section/IconEffectsSection";
import IconTransformSection from "./_section/IconTransformSection";
import IconAnimationSection from "./_section/IconAnimationSection";
import IconAccessibilitySection from "./_section/IconAccessibilitySection";
import { buildIconExportPayload } from "./_utils/exportUtils";

import { type IconState, INITIAL_ICON_STATE } from "./types";

export default function IconPlaygroundPage() {
  const mounted = useHydrated();
  const [activeSection, setActiveSection] = useState("basics");

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

  // Download Props
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [downloadFormat, setDownloadFormat] = useState<DownloadFormat>("react");
  const [downloadName, setDownloadName] = useState("icon-component");

  // Refactored Export for Code View
  const exportPayload = useMemo(() => {
    return {
      downloadFormat,
      downloadName: downloadName || "icon-component",
      ...state,
    };
  }, [downloadFormat, downloadName, state]);

  const deferredExportPayload = useDeferredValue(exportPayload);

  const exportCode = useMemo(
    () => buildIconExportPayload(deferredExportPayload),
    [deferredExportPayload],
  );

  const handleDownload = () => {
    const { content, filename } = buildIconExportPayload(exportPayload);

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
  const sections = [
    { id: "basics", label: "Basics", component: IconBasicsSection },
    { id: "container", label: "Container", component: IconContainerSection },
    { id: "icon", label: "Icon Lib", component: IconSelectionSection },
    { id: "transform", label: "Transform", component: IconTransformSection },
    { id: "effects", label: "Effects", component: IconEffectsSection },
    { id: "animation", label: "Animation", component: IconAnimationSection },
    { id: "a11y", label: "A11y", component: IconAccessibilitySection },
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
  const controls = (
    <>
      <SectionSelector
        sections={sections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <ActiveComponent state={state} setKey={setKey} setFloat={setFloat} />
    </>
  );

  // --- Preview ---
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
        title="Icon Studio"
        headerActions={headerActions}
        controls={controls}
        preview={preview}
      />
    </AppShell>
  );
}
