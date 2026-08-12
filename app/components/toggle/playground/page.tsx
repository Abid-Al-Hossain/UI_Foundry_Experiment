"use client";
import React, { useState, useRef, useMemo } from "react";
import AppShell from "@/components/layout/AppShell";
import useHydrated from "@/components/hooks/useHydrated";
import { useHistoryState } from "@/app/hooks/useHistoryState";
import LivePreview from "../_section/LivePreview";
import PreviewDownloadPanel from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import type { PreviewCanvasMode } from "@/app/components/controls/layout/PreviewPanel";
import { PlaygroundLayout } from "@/app/components/controls/layout/PlaygroundLayout";
import UndoRedoButtons from "@/app/components/controls/layout/UndoRedoButtons";
import SectionSelector from "@/app/components/controls/layout/SectionSelector";

import BasicsSection from "../_section/BasicsSection";
import MetadataSection from "../_section/MetadataSection";
import TrackSection from "../_section/TrackSection";
import ThumbSection from "../_section/ThumbSection";
import StatesSection from "../_section/StatesSection";
import FocusSection from "../_section/FocusSection";
import ShadowSection from "../_section/ShadowSection";
import MessagesSection from "../_section/MessagesSection";
import EffectsSection from "../_section/EffectsSection";
import TypographySection from "../_section/TypographySection";
import AccessibilitySection from "../_section/AccessibilitySection";
import PresetsSection from "../_section/PresetsSection";
import { TOGGLE_PRESETS } from "../_data/presets";
import { buildToggleExportPayload } from "../_utils/exportUtils";
import { type ToggleState, type ToggleKeyUpdater, INITIAL_STATE } from "../types";
import ContrastGuard from "@/app/components/controls/color/ContrastGuard";

export default function TogglePlaygroundPage() {
  const mounted = useHydrated();
  const [activeSection, setActiveSection] = useState("presets");
  const [previewResetKey, setPreviewResetKey] = useState(0);
  const [previewBgMode, setPreviewBgMode] =
    useState<PreviewCanvasMode>("custom");
  const [previewBgInput, setPreviewBgInput] = useState("#0b1220");
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
  const [downloadName, setDownloadName] = useState("toggle-switch");

  const exportPayload = useMemo(
    () => ({
      ...state,
      downloadName: downloadName || "toggle-switch",
    }),
    [downloadName, state],
  );
  const exportCode = useMemo(
    () => buildToggleExportPayload(exportPayload),
    [exportPayload],
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

  const applyPreset = (presetState: ToggleState) => {
    updateState((prev) => ({
      ...prev,
      ...presetState,
    }));
    setPreviewResetKey((key) => key + 1);
  };

  const handleReset = () => {
    reset();
    setPreviewResetKey((key) => key + 1);
  };

  const editorSections = [
    { id: "basics", label: "Basics", component: BasicsSection },
    { id: "metadata", label: "Metadata", component: MetadataSection },
    { id: "track", label: "Track", component: TrackSection },
    { id: "thumb", label: "Thumb", component: ThumbSection },
    { id: "focus", label: "Focus", component: FocusSection },
    { id: "states", label: "States", component: StatesSection },
    { id: "messages", label: "Description & Messages", component: MessagesSection },
    { id: "motion", label: "Motion", component: EffectsSection },
    { id: "shadow", label: "Shadow", component: ShadowSection },
    { id: "typography", label: "Typography", component: TypographySection },
    { id: "accessibility", label: "Accessibility", component: AccessibilitySection },
  ];
  const sections = [
    { id: "presets", label: "Presets" },
    ...editorSections,
  ];

  const setKey: ToggleKeyUpdater = (key) => (val) => {
    updateState((prev) => {
      const nextValue =
        typeof val === "function"
          ? val(prev[key])
          : val;
      return {
        ...prev,
        [key]: nextValue,
      } as ToggleState;
    });
  };

  const activeComp = editorSections.find((s) => s.id === activeSection);
  const ActiveComponent = activeComp?.component || BasicsSection;
  const headerActions = (
    <UndoRedoButtons
      undo={undo}
      redo={redo}
      reset={handleReset}
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
      {activeSection === "presets" ? (
        <PresetsSection
          state={state}
          presets={TOGGLE_PRESETS}
          onApply={(preset) => applyPreset(preset.state)}
        />
      ) : (
        <ActiveComponent state={state} setKey={setKey} />
      )}
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
      previewNode={
        <LivePreview
          key={`${previewResetKey}:${state.checked}`}
          state={state}
          resetKey={previewResetKey}
          canvasBg={previewBgInput}
        />
      }
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

<ContrastGuard /></AppShell>
  );
}
