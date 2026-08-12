"use client";

import { useState, useMemo, useDeferredValue } from "react";
import ContrastGuard from "@/app/components/controls/color/ContrastGuard";
import AppShell from "@/components/layout/AppShell";
import { useHistoryState } from "@/app/hooks/useHistoryState";
import PreviewDownloadPanel from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import type { PreviewCanvasMode } from "@/app/components/controls/layout/PreviewPanel";
import { PlaygroundLayout } from "@/app/components/controls/layout/PlaygroundLayout";
import UndoRedoButtons from "@/app/components/controls/layout/UndoRedoButtons";
import SectionSelector from "@/app/components/controls/layout/SectionSelector";

// Sections
import LivePreview from "../_section/LivePreview";
import ImageBasicsSection from "../_section/ImageBasicsSection";
import ImageMetadataSection from "../_section/ImageMetadataSection";
import ImageCompositionSection from "../_section/ImageCompositionSection";
import ImageLoadingSection from "../_section/ImageLoadingSection";
import ImageFiltersSection from "../_section/ImageFiltersSection";
import ImageTransformSection from "../_section/ImageTransformSection";
import ImageShapeSection from "../_section/ImageShapeSection";
import ImageMaskingSection from "../_section/ImageMaskingSection";
import ImageEffectsSection from "../_section/ImageEffectsSection";
import ImageTypographySection from "../_section/ImageTypographySection";
import ImageAnimationSection from "../_section/ImageAnimationSection";
import ImageAccessibilitySection from "../_section/ImageAccessibilitySection";
import ImageStatesSection from "../_section/ImageStatesSection";
import ImagePresetsSection from "../_section/ImagePresetsSection";

// Types & Utils
import { type ImageState, INITIAL_IMAGE_STATE } from "../types";
import { buildImageExportPayload } from "../_utils/exportUtils";

export default function ImagePlaygroundPage() {
  const [previewResetKey, setPreviewResetKey] = useState(0);
  const [previewBgMode, setPreviewBgMode] =
    useState<PreviewCanvasMode>("custom");
  const [previewBgInput, setPreviewBgInput] = useState("#0b1220");

  // Layout & Resize State (Unified)
  const [activeSection, setActiveSection] = useState("presets");

  // History State
  const {
    state,
    set: setState,
    undo,
    redo,
    reset,
    canUndo,
    canRedo,
  } = useHistoryState<ImageState>(INITIAL_IMAGE_STATE);

  // Download/Export
  const [downloadName, setDownloadName] = useState("styled-image");

  // Refactored Export for Code View
  const exportPayload = useMemo(() => {
    return {
      downloadName: downloadName || "styled-image",
      ...state,
    };
  }, [downloadName, state]);

  const deferredExportPayload = useDeferredValue(exportPayload);

  const exportCode = useMemo(
    () => buildImageExportPayload(deferredExportPayload),
    [deferredExportPayload],
  );

  // Section Configuration
  const sections = [
    { id: "presets", label: "Presets" },
    { id: "basics", label: "Basics", component: ImageBasicsSection },
    { id: "metadata", label: "Metadata", component: ImageMetadataSection },
    { id: "composition", label: "Composition", component: ImageCompositionSection },
    { id: "loading", label: "Loading", component: ImageLoadingSection },
    { id: "filters", label: "Filters", component: ImageFiltersSection },
    { id: "transform", label: "Transform", component: ImageTransformSection },
    { id: "shape", label: "Shape", component: ImageShapeSection },
    { id: "masking", label: "Masking", component: ImageMaskingSection },
    { id: "effects", label: "Effects", component: ImageEffectsSection },
    { id: "typography", label: "Typography", component: ImageTypographySection },
    { id: "animation", label: "Motion", component: ImageAnimationSection },
    { id: "states", label: "States", component: ImageStatesSection },
    { id: "accessibility", label: "Accessibility" },
  ];

  const activeComp = sections.find((s) => s.id === activeSection);
  const ActiveComponent = activeComp?.component || ImageBasicsSection;

  const applyPreset = (presetState: Partial<ImageState>) => {
    setState(() => ({ ...INITIAL_IMAGE_STATE, ...presetState }));
    setPreviewResetKey((value) => value + 1);
  };

  const handleReset = () => {
    reset();
    setPreviewResetKey((value) => value + 1);
  };

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
        <ImagePresetsSection state={state} applyPreset={applyPreset} />
      ) : activeSection === "accessibility" ? (
        <ImageAccessibilitySection
          hasAltText={Boolean(state.alt.trim())}
          hasMeaningfulRole={state.ariaRole !== "none"}
          isDecorative={state.ariaHidden}
          usesLazyLoading={state.loading === "lazy"}
        />
      ) : (
        <ActiveComponent state={state} setState={setState} />
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
      preview={<LivePreview key={previewResetKey} state={state} />}
      code={exportCode.content}
    />
  );
  return (
    <AppShell contentOverflow="hidden">
      <PlaygroundLayout
        title="Image Studio"
        headerActions={headerActions}
        controls={controls}
        preview={preview}
      />

<ContrastGuard /></AppShell>
  );
}
