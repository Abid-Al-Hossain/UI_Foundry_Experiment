"use client";

import React, {
  useState,
  useRef,
  useMemo,
  useDeferredValue,
} from "react";
import ContrastGuard from "@/app/components/controls/color/ContrastGuard";
import AppShell from "@/components/layout/AppShell";
import useHydrated from "@/components/hooks/useHydrated";
import { useHistoryState } from "@/app/hooks/useHistoryState";
import LivePreview from "../_section/LivePreview";
import PreviewDownloadPanel from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import type { PreviewCanvasMode } from "@/app/components/controls/layout/PreviewPanel";
import { PlaygroundLayout } from "@/app/components/controls/layout/PlaygroundLayout";
import UndoRedoButtons from "@/app/components/controls/layout/UndoRedoButtons";
import SectionSelector from "@/app/components/controls/layout/SectionSelector";

// Sections
import PresetsSection from "../_section/PresetsSection";
import DividerBasicsSection from "../_section/DividerBasicsSection";
import DividerMetadataSection from "../_section/DividerMetadataSection";
import DividerSizingSection from "../_section/DividerSizingSection";
import DividerColorsSection from "../_section/DividerColorsSection";
import DividerSurfaceSection from "../_section/DividerSurfaceSection";
import DividerContentSection from "../_section/DividerContentSection";
import DividerTypographySection from "../_section/DividerTypographySection";
import DividerEffectsSection from "../_section/DividerEffectsSection";
import DividerMotionSection from "../_section/DividerMotionSection";
import DividerAccessibilitySection from "../_section/DividerAccessibilitySection";
import DividerStatesSection from "../_section/DividerStatesSection";
import { buildDividerExportPayload } from "../_utils/exportUtils";

import {
  type DividerState,
  INITIAL_DIVIDER_STATE,
} from "../types";

export default function DividerPage() {
  const mounted = useHydrated();
  // Layout & Resize State
  const [activeSection, setActiveSection] = useState("presets");
  const [previewResetKey, setPreviewResetKey] = useState(0);
  const [previewBgMode, setPreviewBgMode] =
    useState<PreviewCanvasMode>("custom");
  const [previewBgInput, setPreviewBgInput] = useState("#0b1220");

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
  const [downloadName, setDownloadName] = useState("divider-component");

  // Refactored Export for Code View
  const exportPayload = useMemo(() => {
      return {
        downloadName: downloadName || "divider-component",
        ...state,
      };
  }, [downloadName, state]);

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
    { id: "presets", label: "Presets", component: PresetsSection },
    { id: "basics", label: "Basics", component: DividerBasicsSection },
    { id: "metadata", label: "Metadata", component: DividerMetadataSection },
    { id: "sizing", label: "Sizing", component: DividerSizingSection },
    { id: "colors", label: "Colors", component: DividerColorsSection },
    { id: "surface", label: "Surface", component: DividerSurfaceSection },
    { id: "content", label: "Content", component: DividerContentSection },
    { id: "typography", label: "Typography", component: DividerTypographySection },
    { id: "effects", label: "Effects", component: DividerEffectsSection },
    { id: "motion", label: "Motion", component: DividerMotionSection },
    { id: "accessibility", label: "Accessibility", component: DividerAccessibilitySection },
    { id: "states", label: "States", component: DividerStatesSection },
  ];

  // Generic Setter Helper
  type SetterValue<T> = T | ((prev: T) => T);
  const setKey =
    <K extends keyof DividerState>(key: K) =>
    (val: SetterValue<DividerState[K]>) => {
    updateState((prev) => ({
      ...prev,
      [key]: typeof val === "function" ? val(prev[key]) : val,
    }));
  };
  const setFloat =
    <K extends keyof DividerState>(key: K) =>
    (val: string | number) => {
    const num = parseFloat(String(val));
    updateState((prev) => ({ ...prev, [key]: isNaN(num) ? 0 : num }));
  };

  const activeComp = sections.find((s) => s.id === activeSection);
  const ActiveComponent = (activeComp?.component ||
    DividerBasicsSection) as React.ComponentType<{
    state: DividerState;
    setKey: typeof setKey;
    setFloat: typeof setFloat;
    updateState: typeof updateState;
    applyPreset?: (preset: { state: Partial<DividerState> }) => void;
  }>;

  const headerActions = (
    <UndoRedoButtons
      undo={undo}
      redo={redo}
      reset={() => {
        reset();
        setPreviewResetKey((value) => value + 1);
      }}
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
        applyPreset={(preset) => {
          updateState((current) => ({ ...current, ...preset.state }));
          setPreviewResetKey((value) => value + 1);
        }}
      />
    </>
  );

  const preview = (
    <PreviewDownloadPanel
      mounted={mounted}
      iframeSrcDoc=""
      iframeRef={iframeRef}
      handleIframeLoad={() => {}}
      downloadFormat="react"
      setDownloadFormat={() => {}}
      downloadName={downloadName}
      setDownloadName={setDownloadName}
      handleDownload={handleDownload}
      previewBgMode={previewBgMode}
      setPreviewBgMode={setPreviewBgMode}
      previewBgInput={previewBgInput}
      setPreviewBgInput={setPreviewBgInput}
      previewNode={<LivePreview key={previewResetKey} state={state} />}
      code={exportCode.content}
    />
  );
  return (
    <AppShell contentOverflow="hidden">
      <PlaygroundLayout
        title="Divider Studio"
        headerActions={headerActions}
        controls={controls}
        preview={preview}
      />

<ContrastGuard /></AppShell>
  );
}
