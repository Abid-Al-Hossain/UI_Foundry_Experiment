"use client";

import { useState, useMemo, useDeferredValue } from "react";
import ContrastGuard from "@/app/components/controls/color/ContrastGuard";
import AppShell from "@/components/layout/AppShell";
import { PlaygroundLayout } from "@/app/components/controls/layout/PlaygroundLayout";
import PreviewDownloadPanel from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import type { PreviewCanvasMode } from "@/app/components/controls/layout/PreviewPanel";
import { useHistoryState } from "@/app/hooks/useHistoryState";
import { DEFAULT_SPINNER_STATE, type SpinnerState } from "../types";
import { buildSpinnerExport } from "../_utils/exportUtils";
import { SpinnerPreview } from "../_components/SpinnerPreview";
import UndoRedoButtons from "@/app/components/controls/layout/UndoRedoButtons";
import SectionSelector from "@/app/components/controls/layout/SectionSelector";

import PresetsSection from "../_section/PresetsSection";
import BasicsSection from "../_section/BasicsSection";
import MetadataSection from "../_section/MetadataSection";
import SizingSection from "../_section/SizingSection";
import ColorsSection from "../_section/ColorsSection";
import SurfaceSection from "../_section/SurfaceSection";
import TrackSection from "../_section/TrackSection";
import MotionSection from "../_section/MotionSection";
import DepthSection from "../_section/DepthSection";
import EffectsSection from "../_section/EffectsSection";
import DistortionSection from "../_section/DistortionSection";
import ParticlesSection from "../_section/ParticlesSection";
import AccessibilitySection from "../_section/AccessibilitySection";
import StatesSection from "../_section/StatesSection";
import LabelsSection from "../_section/LabelsSection";
import StatusSection from "../_section/StatusSection";
import { SPINNER_PRESETS } from "../_data/spinnerPresets";
import { findActivePresetId } from "@/app/components/controls/presets/findActivePresetId";
export default function SpinnerPlayground() {
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
  } = useHistoryState<SpinnerState>(DEFAULT_SPINNER_STATE);

  const [activeSection, setActiveSection] = useState("presets");

  const handleUpdate = <K extends keyof SpinnerState>(
    key: K,
    value: SpinnerState[K],
  ) => {
    updateState((prev) => ({ ...prev, [key]: value }));
  };

  // --- Header Actions ---
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

  // --- Controls ---
  const renderActiveSection = () => {
    switch (activeSection) {
      case "presets":
        return (
          <PresetsSection
            state={state}
            activePresetId={findActivePresetId(
              state,
              DEFAULT_SPINNER_STATE,
              SPINNER_PRESETS,
              ["downloadName"],
            )}
            applyPreset={(preset) => {
              updateState((current) => ({ ...current, ...preset.state }));
              setPreviewResetKey((value) => value + 1);
            }}
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
      case "surface":
        return <SurfaceSection state={state} update={handleUpdate} />;
      case "track":
        return <TrackSection state={state} update={handleUpdate} />;
      case "status":
        return <StatusSection update={handleUpdate} />;
      case "depth":
        return <DepthSection state={state} update={handleUpdate} />;
      case "effects":
        return <EffectsSection state={state} update={handleUpdate} />;
      case "distortion":
        return <DistortionSection state={state} update={handleUpdate} />;
      case "particles":
        return <ParticlesSection state={state} update={handleUpdate} />;
      case "motion":
        return <MotionSection state={state} update={handleUpdate} />;
      case "labels":
        return (
          <LabelsSection
            state={state}
            updateLabels={(labels) => handleUpdate("labels", labels)}
          />
        );
      case "accessibility":
        return <AccessibilitySection state={state} update={handleUpdate} />;
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
    { id: "surface", label: "Surface" },
    { id: "track", label: "Track" },
    { id: "status", label: "Status" },
    { id: "depth", label: "Depth" },
    { id: "effects", label: "Effects" },
    { id: "distortion", label: "Distortion" },
    { id: "particles", label: "Particles" },
    { id: "motion", label: "Motion" },
    { id: "labels", label: "Labels" },
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

  // Export Logic
  const exportPayload = useMemo(() => state, [state]);
  const deferredExportPayload = useDeferredValue(exportPayload);
  const exportCode = useMemo(
    () => buildSpinnerExport(deferredExportPayload),
    [deferredExportPayload],
  );

  // --- Preview ---
  const preview = (
    <PreviewDownloadPanel
      downloadName={state.downloadName || "spinner"}
      setDownloadName={(v) => handleUpdate("downloadName", v)}
      previewBgMode={previewBgMode}
      onPreviewBgMode={setPreviewBgMode}
      previewBgInput={previewBgInput}
      onPreviewBgInput={setPreviewBgInput}
      preview={<SpinnerPreview key={previewResetKey} state={state} />}
      code={exportCode.content}
    />
  );
  return (
    <AppShell contentOverflow="hidden">
      <PlaygroundLayout
        title="Spinner Studio"
        headerActions={headerActions}
        controls={controls}
        preview={preview}
      />

<ContrastGuard /></AppShell>
  );
}
