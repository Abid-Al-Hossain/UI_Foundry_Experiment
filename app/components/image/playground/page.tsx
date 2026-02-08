"use client";

import React, { useState, useRef, useEffect } from "react";
import AppShell from "@/components/layout/AppShell";
import useHydrated from "@/components/hooks/useHydrated";
import { useHistoryState } from "../../../hooks/useHistoryState";
import PreviewDownloadPanel, {
  type DownloadFormat,
} from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import { ScrollArea } from "@/app/components/controls/layout/ScrollArea";
import { PlaygroundLayout } from "@/app/components/controls/layout/PlaygroundLayout";
import UndoRedoButtons from "@/app/components/controls/layout/UndoRedoButtons";
import SectionSelector from "@/app/components/controls/layout/SectionSelector";

// Sections
import LivePreview from "../_section/LivePreview";
import ImageBasicsSection from "../_section/ImageBasicsSection";
import ImageFiltersSection from "../_section/ImageFiltersSection";
import ImageTransformSection from "../_section/ImageTransformSection";
import ImageShapeSection from "../_section/ImageShapeSection";
import ImageMaskingSection from "../_section/ImageMaskingSection";
import ImageEffectsSection from "../_section/ImageEffectsSection";
import ImageAnimationSection from "../_section/ImageAnimationSection";

// Types & Utils
import { type ImageState, INITIAL_IMAGE_STATE } from "../types";
import { buildImageExportPayload } from "../_utils/exportUtils";

export default function ImagePlaygroundPage() {
  const mounted = useHydrated();

  // Layout & Resize State (Unified)
  const [activeSection, setActiveSection] = useState("basics");

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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [downloadFormat, setDownloadFormat] = useState<DownloadFormat>("html");
  const [downloadName, setDownloadName] = useState("styled-image");

  const handleDownload = () => {
    const { content, filename } = buildImageExportPayload({
      downloadFormat,
      downloadName,
      ...state,
    });

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

  // Section Configuration
  const sections = [
    { id: "basics", label: "Basics", component: ImageBasicsSection },
    { id: "filters", label: "Filters", component: ImageFiltersSection },
    { id: "transform", label: "Transform", component: ImageTransformSection },
    { id: "shape", label: "Shape", component: ImageShapeSection },
    { id: "masking", label: "Masking", component: ImageMaskingSection },
    { id: "effects", label: "Effects", component: ImageEffectsSection },
    { id: "animation", label: "Animation", component: ImageAnimationSection },
  ];

  const activeComp = sections.find((s) => s.id === activeSection);
  const ActiveComponent = activeComp?.component || ImageBasicsSection;

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
      <ActiveComponent state={state} setState={setState} />
    </>
  );

  const preview = (
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
    </AppShell>
  );
}
