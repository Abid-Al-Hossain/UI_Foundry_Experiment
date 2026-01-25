"use client";

import React, { useState, useRef } from "react";
import AppShell from "@/components/layout/AppShell";
import { PlaygroundLayout } from "@/app/components/controls/layout/PlaygroundLayout";
import PreviewDownloadPanel from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import useHydrated from "@/components/hooks/useHydrated";
import { useHistoryState } from "../../../hooks/useHistoryState";
import { DEFAULT_SPINNER_STATE, type SpinnerState } from "../types";
import { buildSpinnerExport } from "./_utils/exportUtils";
import { SpinnerPreview } from "./_components/SpinnerPreview";

import BasicsSection from "./_section/BasicsSection";
import StylingSection from "./_section/StylingSection";
import EffectsSection from "./_section/EffectsSection";
import AccessibilitySection from "./_section/AccessibilitySection";
import LabelsSection from "./_section/LabelsSection";
import { SpinnerLabelConfig } from "../types";

export default function SpinnerPlayground() {
  const mounted = useHydrated();
  const {
    state,
    set: updateState,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistoryState<SpinnerState>(DEFAULT_SPINNER_STATE);

  const [activeSection, setActiveSection] = useState("basics");

  const handleUpdate = (key: keyof SpinnerState, value: any) => {
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
      case "basics":
        return <BasicsSection state={state} update={handleUpdate} />;
      case "styling":
        return <StylingSection state={state} update={handleUpdate} />;
      case "effects":
        return <EffectsSection state={state} update={handleUpdate} />;
      case "labels":
        return (
          <LabelsSection
            state={state}
            updateLabels={(labels) => handleUpdate("labels", labels)}
          />
        );
      case "a11y":
        return <AccessibilitySection state={state} update={handleUpdate} />;
      default:
        return null;
    }
  };

  const sections = [
    { id: "basics", label: "Basics" },
    { id: "styling", label: "Styling" },
    { id: "effects", label: "Effects" },
    { id: "labels", label: "Labels" },
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
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const preview = (
    <PreviewDownloadPanel
      mounted={mounted}
      iframeSrcDoc=""
      iframeRef={{ current: null }}
      handleIframeLoad={() => {}}
      downloadFormat={state.downloadFormat || "react"}
      downloadName={state.downloadName || "spinner"}
      setDownloadFormat={(v) => handleUpdate("downloadFormat", v)}
      setDownloadName={(v) => handleUpdate("downloadName", v)}
      handleDownload={() => {
        const { content, filename } = buildSpinnerExport(state);
        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
      }}
      previewNode={<SpinnerPreview state={state} />}
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
    </AppShell>
  );
}
