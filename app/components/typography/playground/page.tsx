"use client";

import React, { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { PlaygroundLayout } from "@/app/components/controls/layout/PlaygroundLayout";
import PreviewDownloadPanel from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import useHydrated from "@/components/hooks/useHydrated";
import { useHistoryState } from "../../../hooks/useHistoryState";
import { DEFAULT_TYPOGRAPHY_STATE, type TypographyState } from "../types";
import { buildTypographyExport } from "./_utils/exportUtils";
import { TypographyPreview } from "./_components/TypographyPreview";

import ScaleSection from "./_section/ScaleSection";
import HeadingsSection from "./_section/HeadingsSection";
import BodySection from "./_section/BodySection";
import FontSection from "./_section/FontSection";
import SpacingSection from "./_section/SpacingSection";
import DecorationSection from "./_section/DecorationSection";
import AccessibilitySection from "./_section/AccessibilitySection";

type ActiveSection =
  | "scale"
  | "headings"
  | "body"
  | "font"
  | "spacing"
  | "decoration"
  | "a11y";

export default function TypographyPlayground() {
  const mounted = useHydrated();
  const {
    state,
    set: updateState,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistoryState<TypographyState>(DEFAULT_TYPOGRAPHY_STATE);

  const [activeSection, setActiveSection] = useState<ActiveSection>("scale");

  // Lifted state for sub-selections within sections
  const [selectedHeading, setSelectedHeading] = useState<1 | 2 | 3 | 4 | 5 | 6>(
    1,
  );
  const [selectedBody, setSelectedBody] = useState<
    "body" | "lead" | "small" | "caption"
  >("body");

  const handleUpdate = (key: keyof TypographyState, value: any) => {
    updateState((prev) => ({ ...prev, [key]: value }));
  };

  // --- Header Actions ---
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

  // --- Controls ---
  const renderActiveSection = () => {
    switch (activeSection) {
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
      case "spacing":
        return <SpacingSection state={state} update={handleUpdate} />;
      case "decoration":
        return <DecorationSection state={state} update={handleUpdate} />;
      case "a11y":
        return <AccessibilitySection state={state} update={handleUpdate} />;
      default:
        return null;
    }
  };

  const sections: { id: ActiveSection; label: string }[] = [
    { id: "scale", label: "Scale" },
    { id: "headings", label: "Headings" },
    { id: "body", label: "Body" },
    { id: "font", label: "Font" },
    { id: "spacing", label: "Spacing" },
    { id: "decoration", label: "Decoration" },
    { id: "a11y", label: "A11y" },
  ];

  const controls = (
    <div className="p-6 space-y-8">
      <div
        className="rounded-2xl border p-3"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in oklab, var(--card) 70%, transparent)",
        }}
      >
        <div
          className="text-xs font-semibold"
          style={{ color: "var(--muted)" }}
        >
          Sections
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveSection(s.id)}
              className="min-h-[52px] w-full rounded-xl border px-4 py-3 text-sm font-semibold leading-snug text-center whitespace-normal break-words uf-clickable"
              style={{
                borderColor: "var(--border)",
                background:
                  activeSection === s.id ? "var(--primary)" : "transparent",
                color: activeSection === s.id ? "white" : "var(--text)",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      {renderActiveSection()}
    </div>
  );

  // --- Preview ---
  const preview = (
    <PreviewDownloadPanel
      mounted={mounted}
      iframeSrcDoc=""
      iframeRef={{ current: null }}
      handleIframeLoad={() => {}}
      downloadFormat={state.downloadFormat || "react"}
      downloadName={state.downloadName || "typography"}
      setDownloadFormat={(v) => handleUpdate("downloadFormat", v as any)}
      setDownloadName={(v) => handleUpdate("downloadName", v)}
      handleDownload={() => {
        const { content, filename } = buildTypographyExport(state);
        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
      }}
      previewNode={
        <TypographyPreview
          state={state}
          activeSection={activeSection}
          selectedHeading={selectedHeading}
          selectedBody={selectedBody}
        />
      }
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
    </AppShell>
  );
}
