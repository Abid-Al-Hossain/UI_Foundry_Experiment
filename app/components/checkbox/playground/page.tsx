"use client";

import { useState, useMemo } from "react";
import ContrastGuard from "@/app/components/controls/color/ContrastGuard";
import AppShell from "@/components/layout/AppShell";
import { useHistoryState } from "@/app/hooks/useHistoryState";
import LivePreview from "../_section/LivePreview";
import PreviewDownloadPanel from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import type { PreviewCanvasMode } from "@/app/components/controls/layout/PreviewPanel";
import { PlaygroundLayout } from "@/app/components/controls/layout/PlaygroundLayout";
import UndoRedoButtons from "@/app/components/controls/layout/UndoRedoButtons";
import SectionSelector from "@/app/components/controls/layout/SectionSelector";

import BasicsSection from "../_section/BasicsSection";
import MetadataSection from "../_section/MetadataSection";
import StylingSection from "../_section/StylingSection";
import StatesSection from "../_section/StatesSection";
import FocusSection from "../_section/FocusSection";
import ShadowSection from "../_section/ShadowSection";
import MessagesSection from "../_section/MessagesSection";
import EffectsSection from "../_section/EffectsSection";
import TypographySection from "../_section/TypographySection";
import AccessibilitySection from "../_section/AccessibilitySection";
import PresetsSection from "../_section/PresetsSection";
import { CHECKBOX_PRESETS } from "../_data/presets";
import { buildCheckboxExportPayload } from "../_utils/exportUtils";

import { type CheckboxState, type CheckboxSetter, INITIAL_STATE } from "../types";

export default function CheckboxPlaygroundPage() {
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
  } = useHistoryState<CheckboxState>(INITIAL_STATE);
  const [downloadName, setDownloadName] = useState("checkbox");

  const exportPayload = useMemo(
    () => ({
      ...state,
      downloadName: downloadName || "checkbox",
    }),
    [downloadName, state],
  );

  const exportCode = useMemo(
    () => buildCheckboxExportPayload(exportPayload),
    [exportPayload],
  );

  const applyPreset = (presetState: CheckboxState) => {
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
    { id: "styling", label: "Styling", component: StylingSection },
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

  const setKey: CheckboxSetter = (key) => (val) => {
    updateState((prev) => ({
      ...prev,
      [key]: val,
    }));
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
        active={activeSection}
        onChange={setActiveSection}
      />
      {activeSection === "presets" ? (
        <PresetsSection
          state={state}
          presets={CHECKBOX_PRESETS}
          onApply={(preset) => applyPreset(preset.state)}
        />
      ) : (
        <ActiveComponent state={state} setKey={setKey} />
      )}
    </>
  );

  const preview = (
    <PreviewDownloadPanel
      downloadName={downloadName}
      setDownloadName={setDownloadName}
      previewBgMode={previewBgMode}
      onPreviewBgMode={setPreviewBgMode}
      previewBgInput={previewBgInput}
      onPreviewBgInput={setPreviewBgInput}
      preview={
        <LivePreview
          key={`${previewResetKey}:${state.checked}:${state.indeterminate}`}
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
        title="Checkbox Studio"
        headerActions={headerActions}
        controls={controls}
        preview={preview}
      />

<ContrastGuard /></AppShell>
  );
}
