"use client";

import { useState, useMemo } from "react";
import ContrastGuard from "@/app/components/controls/color/ContrastGuard";
import AppShell from "@/components/layout/AppShell";
import { PlaygroundLayout } from "@/app/components/controls/layout/PlaygroundLayout";
import PreviewDownloadPanel from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import type { PreviewCanvasMode } from "@/app/components/controls/layout/PreviewPanel";
import { useHistoryState } from "@/app/hooks/useHistoryState";
import { INITIAL_PROGRESS_STATE, type ProgressLabelsUpdater, type ProgressState, type ProgressUpdater } from "../types";
import { buildProgressExport } from "../_utils/exportUtils";
import { ProgressPreview } from "../_components/ProgressPreview";
import { PROGRESS_PRESETS } from "../_data/progressPresets";
import UndoRedoButtons from "@/app/components/controls/layout/UndoRedoButtons";
import SectionSelector from "@/app/components/controls/layout/SectionSelector";

import PresetsSection from "../_section/PresetsSection";
import BasicsSection from "../_section/BasicsSection";
import MetadataSection from "../_section/MetadataSection";
import SizingSection from "../_section/SizingSection";
import ColorsSection from "../_section/ColorsSection";
import TrackSection from "../_section/TrackSection";
import EffectsSection from "../_section/EffectsSection";
import MotionSection from "../_section/MotionSection";
import ContentSection from "../_section/ContentSection";
import SurfaceSection from "../_section/SurfaceSection";
import LabelsSection from "../_section/LabelsSection";
import AccessibilitySection from "../_section/AccessibilitySection";
import StatusSection from "../_section/StatusSection";
import ThreeDSection from "../_section/ThreeDSection";
import StatePreviewSection from "../_section/StatePreviewSection";
import StatesSection from "../_section/StatesSection";
export default function ProgressBarPlayground() {
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
  } = useHistoryState<ProgressState>(INITIAL_PROGRESS_STATE);
  const [activeSection, setActiveSection] = useState("presets");

  const handleUpdate: ProgressUpdater = (key, value) => {
    updateState((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdateLabels: ProgressLabelsUpdater = (labels) => {
    updateState((prev) => ({ ...prev, labels }));
  };

  const handleApplyPreset = (preset: (typeof PROGRESS_PRESETS)[number]) => {
    updateState((prev) => ({
      ...prev,
      ...preset.state,
      labels: preset.state.labels
        ? preset.state.labels.map((label) => ({ ...label }))
        : prev.labels,
    }));
    setPreviewResetKey((value) => value + 1);
  };

  const handleReset = () => {
    reset();
    setPreviewResetKey((value) => value + 1);
  };

  // --- Header Actions (Matching Avatar Template) ---
  const headerActions = (
    <UndoRedoButtons
      undo={undo}
      redo={redo}
      reset={handleReset}
      canUndo={canUndo}
      canRedo={canRedo}
    />
  );

  // --- Controls & Navigation ---
  const renderActiveSection = () => {
    switch (activeSection) {
      case "presets":
        return (
          <PresetsSection
            state={state}
            presets={PROGRESS_PRESETS}
            onApplyPreset={handleApplyPreset}
          />
        );
      case "basics":
        return <BasicsSection state={state} update={handleUpdate} />;
      case "metadata":
        return <MetadataSection state={state} update={handleUpdate} />;
      case "sizing":
        return <SizingSection state={state} update={handleUpdate} />;
      case "colors":
        return <ColorsSection state={state} update={handleUpdate} />;
      case "track":
        return <TrackSection state={state} update={handleUpdate} />;
      case "surface":
        return <SurfaceSection state={state} update={handleUpdate} />;
      case "status":
        return <StatusSection state={state} update={handleUpdate} />;
      case "state-preview":
        return <StatePreviewSection state={state} update={handleUpdate} />;
      case "effects":
        return <EffectsSection state={state} update={handleUpdate} />;
      case "depth":
        return <ThreeDSection state={state} update={handleUpdate} />;
      case "motion":
        return <MotionSection state={state} update={handleUpdate} />;
      case "content":
        return <ContentSection state={state} update={handleUpdate} />;
      case "labels":
        return (
          <LabelsSection state={state} updateLabels={handleUpdateLabels} />
        );
      case "accessibility":
        return <AccessibilitySection />;
      case "states":
        return <StatesSection state={state} update={handleUpdate} />;
      default:
        return null;
    }
  };

  const sections = [
    { id: "presets", label: "Presets" },
    { id: "basics", label: "Basics" },
    { id: "metadata", label: "Metadata" },
    { id: "sizing", label: "Sizing" },
    { id: "colors", label: "Colors" },
    { id: "track", label: "Track" },
    { id: "surface", label: "Surface" },
    { id: "status", label: "Status" },
    { id: "state-preview", label: "State Preview" },
    { id: "effects", label: "Effects" },
    { id: "depth", label: "Depth" },
    { id: "motion", label: "Motion" },
    { id: "labels", label: "Labels" },
    { id: "content", label: "Content" },
    { id: "accessibility", label: "Accessibility" },
    { id: "states", label: "States" },
  ];

  const controls = (
    <div className="p-6 space-y-8">
      <SectionSelector
        sections={sections}
        active={activeSection}
        onChange={setActiveSection}
      />
      {renderActiveSection()}
    </div>
  );

  // --- Preview & Download ---
  // Refactored Export for Code View
  const exportPayload = useMemo(() => {
    return {
      ...state,
      downloadName: state.downloadName || "progress",
    };
  }, [state]);

  const exportCode = useMemo(() => buildProgressExport(exportPayload), [exportPayload]);

  const preview = (
    <PreviewDownloadPanel
      downloadName={state.downloadName || "progress"}
      setDownloadName={(v) => handleUpdate("downloadName", v)}
      previewBgMode={previewBgMode}
      onPreviewBgMode={setPreviewBgMode}
      previewBgInput={previewBgInput}
      onPreviewBgInput={setPreviewBgInput}
      preview={<ProgressPreview key={previewResetKey} state={state} />}
      code={exportCode.content}
    />
  );
  return (
    <AppShell contentOverflow="hidden">
      <PlaygroundLayout
        title="Progress Playground"
        headerActions={headerActions}
        controls={controls}
        preview={preview}
      />

<ContrastGuard /></AppShell>
  );
}


