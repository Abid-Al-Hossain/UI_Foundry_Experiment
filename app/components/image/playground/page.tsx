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
    <>
      <button
        type="button"
        onClick={undo}
        disabled={!canUndo}
        className="flex items-center justify-center p-2 rounded-lg border transition-all"
        style={{
          borderColor: "var(--border)",
          color: canUndo ? "var(--text)" : "var(--muted)",
          opacity: canUndo ? 1 : 0.5,
          cursor: canUndo ? "pointer" : "not-allowed",
          background: canUndo ? "var(--card)" : "transparent",
        }}
        title="Undo (Ctrl+Z)"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 7v6h6" />
          <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
        </svg>
      </button>
      <button
        type="button"
        onClick={redo}
        disabled={!canRedo}
        className="flex items-center justify-center p-2 rounded-lg border transition-all"
        style={{
          borderColor: "var(--border)",
          color: canRedo ? "var(--text)" : "var(--muted)",
          opacity: canRedo ? 1 : 0.5,
          cursor: canRedo ? "pointer" : "not-allowed",
          background: canRedo ? "var(--card)" : "transparent",
        }}
        title="Redo (Ctrl+Y)"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 7v6h-6" />
          <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" />
        </svg>
      </button>
    </>
  );

  const controls = (
    <>
      <div
        className="rounded-2xl border p-3"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in oklab, var(--card) 70%, transparent)",
        }}
      >
        <div
          className="text-xs font-semibold mb-3"
          style={{ color: "var(--muted)" }}
        >
          Sections
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {sections.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveSection(item.id)}
              className="min-h-[52px] w-full rounded-xl border px-4 py-3 text-sm font-semibold leading-snug text-center whitespace-normal break-words uf-clickable transition-all"
              style={{
                borderColor: "var(--border)",
                background:
                  activeSection === item.id ? "var(--primary)" : "transparent",
                color: activeSection === item.id ? "white" : "var(--text)",
                boxShadow:
                  activeSection === item.id
                    ? "0 4px 12px var(--primary-shadow)"
                    : "none",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
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
