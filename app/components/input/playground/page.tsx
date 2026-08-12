"use client";

import React, { useState, useMemo } from "react";
import ContrastGuard from "@/app/components/controls/color/ContrastGuard";
import AppShell from "@/components/layout/AppShell";
import { useHistoryState } from "@/app/hooks/useHistoryState";
import LivePreview from "../_section/LivePreview";
import PreviewDownloadPanel from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import type { PreviewCanvasMode } from "@/app/components/controls/layout/PreviewPanel";
import { PlaygroundLayout } from "@/app/components/controls/layout/PlaygroundLayout";
import UndoRedoButtons from "@/app/components/controls/layout/UndoRedoButtons";
import SectionSelector from "@/app/components/controls/layout/SectionSelector";

import PresetsSection from "../_section/PresetsSection";
import { INPUT_PRESETS } from "../_data/inputPresets";
import BasicsSection from "../_section/BasicsSection";
import StylingSection from "../_section/StylingSection";
import TypographySection from "../_section/TypographySection";
import StatesSection from "../_section/StatesSection";
import EffectsSection from "../_section/EffectsSection";
import LabelsSection from "../_section/LabelsSection";
import FieldAttributesSection from "../_section/FieldAttributesSection";
import AdornmentsSection from "../_section/AdornmentsSection";
import AccessibilitySection from "../_section/AccessibilitySection";
import { buildTextInputExportPayload } from "../_utils/exportUtils";

import { type TextInputState, type TextInputSetter, INITIAL_STATE } from "../types";
import type { TextInputPreset } from "../_data/inputPresets";

export default function TextInputPlaygroundPage() {
  const [activeSection, setActiveSection] = useState("presets");
  const [previewResetKey, setPreviewResetKey] = useState(0);
  const [previewBgMode, setPreviewBgMode] = useState<PreviewCanvasMode>("custom");
  const [previewBgInput, setPreviewBgInput] = useState("#0b1220");

  const {
    state,
    set: updateState,
    undo,
    redo,
    reset,
    canUndo,
    canRedo,
  } = useHistoryState<TextInputState>(INITIAL_STATE);
  const [downloadName, setDownloadName] = useState("text-input");

  const applyPreset = (preset: TextInputPreset) => {
    updateState(() => ({ ...preset.state }));
    setPreviewResetKey((value) => value + 1);
  };

  const exportPayload = useMemo(
    () => ({
      ...state,
      downloadName: downloadName || "text-input",
    }),
    [downloadName, state],
  );

  const exportCode = useMemo(
    () => buildTextInputExportPayload(exportPayload),
    [exportPayload],
  );

  const sections = [
    { id: "presets", label: "Presets", component: PresetsSection },
    { id: "basics", label: "Basics", component: BasicsSection },
    { id: "field-attrs", label: "Field", component: FieldAttributesSection },
    { id: "styling", label: "Styling", component: StylingSection },
    { id: "typography", label: "Typography", component: TypographySection },
    { id: "states", label: "States", component: StatesSection },
    { id: "effects", label: "Effects", component: EffectsSection },
    { id: "labels", label: "Labels", component: LabelsSection },
    { id: "adornments", label: "Adorn", component: AdornmentsSection },
    { id: "accessibility", label: "Accessibility", component: AccessibilitySection },
  ];

  const setKey: TextInputSetter = (key) => (val) => {
    updateState((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const activeComp = sections.find((s) => s.id === activeSection);
  const ActiveComponent = activeComp?.component as
    | React.ComponentType<{ state: TextInputState; setKey: TextInputSetter }>
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
        active={activeSection}
        onChange={setActiveSection}
      />
      {activeSection === "presets" ? (
        <PresetsSection state={state} presets={INPUT_PRESETS} onApply={applyPreset} />
      ) : (
        ActiveComponent ? <ActiveComponent state={state} setKey={setKey} /> : null
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
          key={`${previewResetKey}:${state.defaultValue}:${state.inputType}`}
          state={state}
        />
      }
      code={exportCode.content}
    />
  );

  return (
    <AppShell contentOverflow="hidden">
      <PlaygroundLayout
        title="Text Input Studio"
        headerActions={headerActions}
        controls={controls}
        preview={preview}
      />

<ContrastGuard /></AppShell>
  );
}




