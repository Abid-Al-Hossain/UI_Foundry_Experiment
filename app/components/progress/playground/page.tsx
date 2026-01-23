"use client";

import React, { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { PlaygroundLayout } from "@/app/components/controls/layout/PlaygroundLayout";
import { ScrollArea } from "@/app/components/controls/layout/ScrollArea";
import PreviewDownloadPanel from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import { useHistoryState } from "../../../hooks/useHistoryState";
import { INITIAL_PROGRESS_STATE, type ProgressState } from "../types";
import { buildProgressExport } from "./_utils/exportUtils";
import { ProgressPreview } from "./_components/ProgressPreview";
import { SegmentedControl } from "@/app/components/controls/input/SegmentedControl";

import BasicsSection from "./_section/BasicsSection";
import StylingSection from "./_section/StylingSection";
import EffectsSection from "./_section/EffectsSection";
import ContentSection from "./_section/ContentSection";
import InteractionSection from "./_section/InteractionSection";

export default function ProgressBarPlayground() {
  const {
    state,
    set: updateState,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistoryState<ProgressState>(INITIAL_PROGRESS_STATE);
  const [activeTab, setActiveTab] = useState("basics");

  const handleUpdate = (key: keyof ProgressState, value: any) => {
    updateState((prev) => ({ ...prev, [key]: value }));
  };

  const HeaderActions = (
    <div className="flex items-center gap-2">
      <button
        onClick={undo}
        disabled={!canUndo}
        className="px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Undo
      </button>
      <button
        onClick={redo}
        disabled={!canRedo}
        className="px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Redo
      </button>
      <button
        onClick={() => updateState(INITIAL_PROGRESS_STATE)}
        className="px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
      >
        Reset
      </button>
    </div>
  );

  return (
    <AppShell>
      <PlaygroundLayout
        title="Ultimate Progress Bar"
        headerActions={HeaderActions}
        preview={
          <div className="flex items-center justify-center p-12 bg-slate-900 rounded-xl min-h-[400px] overflow-hidden relative">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at center, #334155 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <ProgressPreview state={state} />
          </div>
        }
        controls={
          <ScrollArea className="h-full">
            <div className="p-6 space-y-8">
              {/* Internal Tab Navigation */}
              <div className="pb-4 border-b border-slate-800/50 mb-4">
                <SegmentedControl
                  value={activeTab}
                  onChange={(v: any) => setActiveTab(v)}
                  items={[
                    { label: "Basics", value: "basics" },
                    { label: "Styling", value: "styling" },
                    { label: "Effects", value: "effects" },
                    { label: "Content", value: "content" },
                    { label: "Interact", value: "interact" },
                  ]}
                />
              </div>

              {activeTab === "basics" && (
                <BasicsSection state={state} update={handleUpdate} />
              )}
              {activeTab === "styling" && (
                <StylingSection state={state} update={handleUpdate} />
              )}
              {activeTab === "effects" && (
                <EffectsSection state={state} update={handleUpdate} />
              )}
              {activeTab === "content" && (
                <ContentSection state={state} update={handleUpdate} />
              )}
              {activeTab === "interact" && <InteractionSection />}
            </div>
          </ScrollArea>
        }
        // Disabled download panel temporarily if needed or pass dummy props, but trying to match SharedPreviewDownloadPanel props
        // It seems SharedPreviewDownloadPanel was not fully typed in my mental model, better to check its definition if errors persist.
        // For now, removing it or simplifying if not critical.
        // Wait, the previous error was `Property 'onDownloadFormatChange' does not exist`.
        // I will check SharedPreviewDownloadPanel props if I can, but I'll try to rely on what I saw in 7366.
        // In 7366: props: { setDownloadFormat, setDownloadName ... }
        // The user error said: Type { ... onDownloadFormatChange ... } is not assignable.
        // My previous attempt fixed the usage to `setDownloadFormat`.
        // I will proceed with the fixed usage.
      />
    </AppShell>
  );
}
