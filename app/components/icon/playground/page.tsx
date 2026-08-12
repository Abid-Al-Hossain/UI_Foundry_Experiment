"use client";

import { useState, useMemo, useDeferredValue } from "react";
import ContrastGuard from "@/app/components/controls/color/ContrastGuard";
import AppShell from "@/components/layout/AppShell";
import { useHistoryState } from "@/app/hooks/useHistoryState";
import LivePreview from "../_section/LivePreview";
import PreviewDownloadPanel from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import type { PreviewCanvasMode } from "@/app/components/controls/layout/PreviewPanel";
import { PlaygroundLayout } from "@/app/components/controls/layout/PlaygroundLayout";
import UndoRedoButtons from "@/app/components/controls/layout/UndoRedoButtons";
import SectionSelector from "@/app/components/controls/layout/SectionSelector";

// Sections
import IconBasicsSection from "../_section/IconBasicsSection";
import IconMetadataSection from "../_section/IconMetadataSection";
import IconSelectionSection from "../_section/IconSelectionSection";
import IconColorsSection from "../_section/IconColorsSection";
import IconSizingSection from "../_section/IconSizingSection";
import IconContainerSection from "../_section/IconContainerSection";
import IconFrameSection from "../_section/IconFrameSection";
import IconEffectsSection from "../_section/IconEffectsSection";
import IconTransformSection from "../_section/IconTransformSection";
import IconAnimationSection from "../_section/IconAnimationSection";
import IconAccessibilitySection from "../_section/IconAccessibilitySection";
import IconStatesSection from "../_section/IconStatesSection";
import IconPresetsSection from "../_section/IconPresetsSection";
import { buildIconExportPayload } from "../_utils/exportUtils";

import { type IconFloatSetter, type IconSetter, type IconState, INITIAL_ICON_STATE } from "../types";

export default function IconPlaygroundPage() {
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
  } = useHistoryState<IconState>(INITIAL_ICON_STATE);
  const [downloadName, setDownloadName] = useState("icon-component");

  // Refactored Export for Code View
  const exportPayload = useMemo(() => {
    return {
      downloadName: downloadName || "icon-component",
      ...state,
    };
  }, [downloadName, state]);

  const deferredExportPayload = useDeferredValue(exportPayload);

  const exportCode = useMemo(
    () => buildIconExportPayload(deferredExportPayload),
    [deferredExportPayload],
  );

  // Section Mapping
  const sections = [
    { id: "presets", label: "Presets" },
    { id: "basics", label: "Basics", component: IconBasicsSection },
    { id: "metadata", label: "Metadata", component: IconMetadataSection },
    { id: "sizing", label: "Sizing", component: IconSizingSection },
    { id: "colors", label: "Colors", component: IconColorsSection },
    { id: "surface", label: "Surface", component: IconContainerSection },
    { id: "frame", label: "Frame", component: IconFrameSection },
    { id: "icon", label: "Library", component: IconSelectionSection },
    { id: "transform", label: "Transform", component: IconTransformSection },
    { id: "effects", label: "Effects", component: IconEffectsSection },
    { id: "motion", label: "Motion", component: IconAnimationSection },
    { id: "states", label: "States", component: IconStatesSection },
    { id: "accessibility", label: "Accessibility", component: IconAccessibilitySection },
  ];

  // Generic Setter Helper
  const setKey: IconSetter = (key) => (val) => {
    updateState((prev) => ({
      ...prev,
      [key]: typeof val === "function" ? val(prev[key]) : val,
    }));
  };
  // Helper for float values
  const setFloat: IconFloatSetter = (key) => (val) => {
    const num = typeof val === "number" ? val : parseFloat(String(val));
    updateState((prev) => ({ ...prev, [key]: isNaN(num) ? 0 : num }));
  };

  const applyPreset = (presetState: Partial<IconState>) => {
    updateState(() => ({ ...INITIAL_ICON_STATE, ...presetState }));
    setPreviewResetKey((value) => value + 1);
  };

  const handleReset = () => {
    reset();
    setPreviewResetKey((value) => value + 1);
  };

  const activeComp = sections.find((s) => s.id === activeSection);
  const ActiveComponent = activeComp?.component || IconBasicsSection;

  // --- Header Actions ---
  const headerActions = (
    <UndoRedoButtons
      undo={undo}
      redo={redo}
      reset={handleReset}
      canUndo={canUndo}
      canRedo={canRedo}
    />
  );

  // --- Controls ---
  const controls = (
    <>
      <SectionSelector
        sections={sections}
        active={activeSection}
        onChange={setActiveSection}
      />
      {activeSection === "presets" ? (
        <IconPresetsSection state={state} applyPreset={applyPreset} />
      ) : activeSection === "accessibility" ? (
        <IconAccessibilitySection state={state} />
      ) : (
        <ActiveComponent state={state} setKey={setKey} setFloat={setFloat} />
      )}
    </>
  );

  // --- Preview ---
  const preview = (
    <PreviewDownloadPanel
      downloadName={downloadName}
      setDownloadName={setDownloadName}
      previewBgMode={previewBgMode}
      onPreviewBgMode={setPreviewBgMode}
      previewBgInput={previewBgInput}
      onPreviewBgInput={setPreviewBgInput}
      preview={<LivePreview key={previewResetKey} state={state} />}
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

<ContrastGuard /></AppShell>
  );
}
