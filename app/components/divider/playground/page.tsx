"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useDeferredValue,
} from "react";
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

// Sections
import DividerBasicsSection from "../_section/DividerBasicsSection";
import DividerContentSection from "../_section/DividerContentSection";
import DividerEffectsSection from "../_section/DividerEffectsSection";
import DividerHyperSection from "../_section/DividerHyperSection";
import DividerAccessibilitySection from "../_section/DividerAccessibilitySection";
import { buildDividerExportPayload } from "../_utils/exportUtils";

import {
  type DividerOrientation,
  type DividerVariant,
  type DividerContentPosition,
  type DividerState,
  INITIAL_DIVIDER_STATE,
} from "../types";

export default function DividerPage() {
  const mounted = useHydrated();
  // Layout & Resize State
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
  } = useHistoryState<DividerState>(INITIAL_DIVIDER_STATE);

  // Resize Logic

  // Download Props
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [downloadFormat, setDownloadFormat] = useState<DownloadFormat>("html");
  const [downloadName, setDownloadName] = useState("divider-component");

  // Refactored Export for Code View
  const exportPayload = useMemo(() => {
    return {
      downloadFormat,
      downloadName: downloadName || "divider-component",
      ...state,
    };
  }, [downloadFormat, downloadName, state]);

  const deferredExportPayload = useDeferredValue(exportPayload);

  const exportCode = useMemo(
    () => buildDividerExportPayload(deferredExportPayload),
    [deferredExportPayload],
  );

  const handleDownload = () => {
    const { content, filename } = buildDividerExportPayload(exportPayload);

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
    { id: "basics", label: "Basics", component: DividerBasicsSection },
    { id: "content", label: "Label", component: DividerContentSection },
    { id: "effects", label: "Effects", component: DividerEffectsSection },
    { id: "hyper", label: "Hyper FX", component: DividerHyperSection },
    { id: "a11y", label: "A11y", component: DividerAccessibilitySection },
  ];

  // Generic Setter Helper
  const setKey = (key: keyof DividerState) => (val: any) => {
    updateState((prev) => ({
      ...prev,
      [key]: typeof val === "function" ? val(prev[key]) : val,
    }));
  };
  const setFloat = (key: keyof DividerState) => (val: any) => {
    const num = parseFloat(val);
    updateState((prev) => ({ ...prev, [key]: isNaN(num) ? 0 : num }));
  };

  const activeComp = sections.find((s) => s.id === activeSection);
  const ActiveComponent = activeComp?.component || DividerBasicsSection;

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

      <ActiveComponent
        state={state}
        setKey={setKey}
        setFloat={setFloat}
        updateState={updateState}
      />
    </>
  );

  const preview = (
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
        code={exportCode.content}
      />
    </div>
  );

  return (
    <AppShell contentOverflow="hidden">
      <PlaygroundLayout
        title="Divider Studio"
        headerActions={headerActions}
        controls={controls}
        preview={preview}
      />
    </AppShell>
  );
}
