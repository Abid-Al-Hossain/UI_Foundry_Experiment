"use client";

import React, { useState, useRef, useMemo, useDeferredValue } from "react";
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

import PresetsSection from "../_section/PresetsSection";
import { TEXTAREA_PRESETS } from "../_data/textareaPresets";
import BasicsSection from "../_section/BasicsSection";
import StylingSection from "../_section/StylingSection";
import TypographySection from "../_section/TypographySection";
import StatesSection from "../_section/StatesSection";
import EffectsSection from "../_section/EffectsSection";
import LabelsSection from "../_section/LabelsSection";
import FieldAttributesSection from "../_section/FieldAttributesSection";
import WritingModesSection from "../_section/WritingModesSection";
import AccessibilitySection from "../_section/AccessibilitySection";
import { buildTextareaExportPayload } from "../_utils/exportUtils";

import {
  type TextareaSetter,
  type TextareaState,
  INITIAL_STATE,
} from "../types";
import type { TextareaPreset } from "../_data/textareaPresets";

export default function TextareaPlaygroundPage() {
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
  } = useHistoryState<TextareaState>(INITIAL_STATE);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [downloadName, setDownloadName] = useState("textarea");
  const downloadFormat = "react" as const;

  const applyPreset = (preset: TextareaPreset) => {
    updateState(() => ({ ...preset.state }));
    setPreviewResetKey((value) => value + 1);
  };

  const exportPayload = useMemo(
    () => ({
      ...state,
      downloadName: downloadName || "textarea",
    }),
    [downloadName, state],
  );

  const deferredExportPayload = useDeferredValue(exportPayload);
  const exportCode = useMemo(
    () => buildTextareaExportPayload(deferredExportPayload),
    [deferredExportPayload],
  );

  const handleDownload = () => {
    const { content, filename } = buildTextareaExportPayload(exportPayload);
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
    { id: "presets", label: "Presets", component: PresetsSection },
    { id: "basics", label: "Basics", component: BasicsSection },
    { id: "field-attrs", label: "Field", component: FieldAttributesSection },
    { id: "styling", label: "Styling", component: StylingSection },
    { id: "typography", label: "Typography", component: TypographySection },
    { id: "writing", label: "Writing", component: WritingModesSection },
    { id: "states", label: "States", component: StatesSection },
    { id: "effects", label: "Effects", component: EffectsSection },
    { id: "labels", label: "Labels", component: LabelsSection },
    { id: "accessibility", label: "Accessibility", component: AccessibilitySection },
  ];

  const setKey: TextareaSetter = (key) => (val) => {
    updateState((prev) => ({
      ...prev,
      [key]: typeof val === "function" ? val(prev[key]) : val,
    }));
  };

  const activeComp = sections.find((s) => s.id === activeSection);
  const ActiveComponent = activeComp?.component as
    | React.ComponentType<{ state: TextareaState; setKey: TextareaSetter }>
    | undefined;

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
      {activeSection === "presets" ? (
        <PresetsSection state={state} presets={TEXTAREA_PRESETS} onApply={applyPreset} />
      ) : (
        ActiveComponent ? <ActiveComponent state={state} setKey={setKey} /> : null
      )}
    </>
  );

  const preview = (
    <PreviewDownloadPanel
      mounted={mounted}
      iframeSrcDoc=""
      iframeRef={iframeRef}
      handleIframeLoad={() => {}}
      downloadFormat={downloadFormat}
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
          key={`${previewResetKey}:${state.defaultValue}`}
          state={state}
        />
      }
      code={exportCode.content}
    />
  );

  return (
    <AppShell contentOverflow="hidden">
      <PlaygroundLayout
        title="Textarea Studio"
        headerActions={headerActions}
        controls={controls}
        preview={preview}
      />

<ContrastGuard /></AppShell>
  );
}
