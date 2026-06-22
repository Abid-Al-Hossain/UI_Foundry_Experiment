import React from "react";
import { type SpinnerUpdate } from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";

type Props = {
  update: SpinnerUpdate;
};

export default function StatusSection({ update }: Props) {
  const applyLabelPreset = (value: string) => {
    update("label", value);
  };

  return (
    <div className="space-y-6">
      <Section title="Status" subtitle="Common loading-copy presets for preview and export.">
        <div className="grid gap-2 md:grid-cols-2">
          {[
            "Loading...",
            "Loading dashboard data",
            "Syncing account status",
            "Preparing export",
          ].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => applyLabelPreset(value)}
              className="rounded-xl border px-3 py-2 text-sm font-semibold transition"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            >
              {value}
            </button>
          ))}
        </div>

        <p className="mt-3 text-xs text-slate-500">
          This status copy powers the spinner&apos;s invisible loading semantics.
          Visible overlay labels are configured separately in the labels section.
        </p>
      </Section>
    </div>
  );
}
