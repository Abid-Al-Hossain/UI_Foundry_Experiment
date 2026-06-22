"use client";

import React, { useState, useMemo, useDeferredValue } from "react";
import ContrastGuard from "@/app/components/controls/color/ContrastGuard";
import AppShell from "@/components/layout/AppShell";
import { PlaygroundLayout } from "@/app/components/controls/layout/PlaygroundLayout";
import PreviewDownloadPanel from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import type { PreviewCanvasMode } from "@/app/components/controls/layout/PreviewPanel";
import useHydrated from "@/components/hooks/useHydrated";
import { useHistoryState } from "@/app/hooks/useHistoryState";
import { DEFAULT_TYPOGRAPHY_STATE, type TypographyState } from "../types";
import { type TypographyUpdater } from "../types";
import { buildTypographyExport } from "../_utils/exportUtils";
import { TypographyPreview } from "../_components/TypographyPreview";
import UndoRedoButtons from "@/app/components/controls/layout/UndoRedoButtons";
import SectionSelector from "@/app/components/controls/layout/SectionSelector";

import PresetsSection from "../_section/PresetsSection";
import ScaleSection from "../_section/ScaleSection";
import HeadingsSection from "../_section/HeadingsSection";
import BodySection from "../_section/BodySection";
import FontSection from "../_section/FontSection";
import MetadataSection from "../_section/MetadataSection";
import ColorsSection from "../_section/ColorsSection";
import PreviewSection from "../_section/PreviewSection";
import SpacingSection from "../_section/SpacingSection";
import LayoutSection from "../_section/LayoutSection";
import SemanticsSection from "../_section/SemanticsSection";
import EffectsSection from "../_section/EffectsSection";
import DecorationSection from "../_section/DecorationSection";
import ShadowSection from "../_section/ShadowSection";
import AccessibilitySection from "../_section/AccessibilitySection";

type ActiveSection =
  | "presets"
  | "scale"
  | "headings"
  | "body"
  | "font"
  | "metadata"
  | "colors"
  | "preview"
  | "spacing"
  | "layout"
  | "semantics"
  | "effects"
  | "decoration"
  | "shadow"
  | "accessibility";

export default function TypographyPlayground() {
  const mounted = useHydrated();
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
  } = useHistoryState<TypographyState>(DEFAULT_TYPOGRAPHY_STATE);

  const [activeSection, setActiveSection] = useState<ActiveSection>("presets");

  // Lifted state for sub-selections within sections
  const [selectedHeading, setSelectedHeading] = useState<1 | 2 | 3 | 4 | 5 | 6>(
    1,
  );
  const [selectedBody, setSelectedBody] = useState<
    "body" | "lead" | "small" | "caption"
  >("body");

  const handleUpdate: TypographyUpdater = (key, value) => {
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
            applyPreset={(preset) => {
              updateState((prev) => ({ ...prev, ...preset.state }));
              if (preset.selectedHeading) setSelectedHeading(preset.selectedHeading);
              if (preset.selectedBody) setSelectedBody(preset.selectedBody);
              setPreviewResetKey((value) => value + 1);
            }}
          />
        );
      case "scale":
        return <ScaleSection state={state} update={handleUpdate} />;
      case "headings":
        return (
          <HeadingsSection
            state={state}
            update={handleUpdate}
            selectedLevel={selectedHeading}
            setSelectedLevel={setSelectedHeading}
          />
        );
      case "body":
        return (
          <BodySection
            state={state}
            update={handleUpdate}
            selectedStyle={selectedBody}
            setSelectedStyle={setSelectedBody}
          />
        );
      case "font":
        return <FontSection state={state} update={handleUpdate} />;
      case "metadata":
        return <MetadataSection state={state} update={handleUpdate} />;
      case "colors":
        return <ColorsSection state={state} update={handleUpdate} />;
      case "preview":
        return <PreviewSection state={state} update={handleUpdate} />;
      case "spacing":
        return <SpacingSection state={state} update={handleUpdate} />;
      case "layout":
        return <LayoutSection state={state} update={handleUpdate} />;
      case "semantics":
        return <SemanticsSection state={state} update={handleUpdate} />;
      case "effects":
        return <EffectsSection state={state} update={handleUpdate} />;
      case "decoration":
        return <DecorationSection state={state} update={handleUpdate} />;
      case "shadow":
        return <ShadowSection state={state} update={handleUpdate} />;
      case "accessibility":
        return <AccessibilitySection />;
      default:
        return null;
    }
  };

  const sections: { id: ActiveSection; label: string }[] = [
    { id: "presets", label: "Presets" },
    { id: "scale", label: "Scale" },
    { id: "headings", label: "Headings" },
    { id: "body", label: "Body" },
    { id: "font", label: "Font Family" },
    { id: "metadata", label: "Metadata" },
    { id: "colors", label: "Colors" },
    { id: "preview", label: "Preview" },
    { id: "spacing", label: "Spacing" },
    { id: "layout", label: "Layout" },
    { id: "semantics", label: "Semantics" },
    { id: "effects", label: "Effects" },
    { id: "decoration", label: "Decoration" },
    { id: "shadow", label: "Shadow" },
    { id: "accessibility", label: "Accessibility" },
  ];

  const controls = (
    <div className="p-6 space-y-8">
      <SectionSelector
        sections={sections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      {renderActiveSection()}
    </div>
  );

  // Export Logic
  const exportPayload = useMemo(() => state, [state]);
  const deferredExportPayload = useDeferredValue(exportPayload);
  const exportCode = useMemo(
    () => buildTypographyExport(deferredExportPayload),
    [deferredExportPayload],
  );

  // --- Preview ---
  const preview = (
    <PreviewDownloadPanel
      mounted={mounted}
      iframeSrcDoc=""
      iframeRef={{ current: null }}
      handleIframeLoad={() => {}}
      downloadFormat="react"
      downloadName={state.downloadName || "typography"}
      setDownloadFormat={() => {}}
      setDownloadName={(v) => handleUpdate("downloadName", v)}
      handleDownload={() => {
        const { content, filename } = buildTypographyExport(exportPayload);
        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
      }}
      previewBgMode={previewBgMode}
      setPreviewBgMode={setPreviewBgMode}
      previewBgInput={previewBgInput}
      setPreviewBgInput={setPreviewBgInput}
      previewNode={
        <TypographyPreview
          key={previewResetKey}
          state={state}
          activeSection={activeSection === "presets" ? "scale" : activeSection}
          selectedHeading={selectedHeading}
          selectedBody={selectedBody}
        />
      }
      code={exportCode.content}
    />
  );

  return (
    <AppShell contentOverflow="hidden">
      <PlaygroundLayout
        title="Typography Studio"
        headerActions={headerActions}
        controls={controls}
        preview={preview}
      />

<ContrastGuard /></AppShell>
  );
}
