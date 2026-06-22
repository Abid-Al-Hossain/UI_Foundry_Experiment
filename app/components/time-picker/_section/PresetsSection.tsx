"use client";

import { useMemo, useState } from "react";
import Input from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import { TIMEPICKER_PRESETS } from "../_data/TimePickerPresets";
import type { StudioPreset } from "../types";

const PAGE_SIZE = 12;

type Props = {
  activePresetId: string | null;
  onApply: (preset: StudioPreset) => void;
};

export default function PresetsSection({ activePresetId, onApply }: Props) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("all");
  const [variant, setVariant] = useState("all");
  const [size, setSize] = useState("all");
  const [page, setPage] = useState(0);

  const families = useMemo(() => ["all", ...Array.from(new Set(TIMEPICKER_PRESETS.map((preset) => preset.family)))], []);
  const variants = useMemo(() => ["all", ...Array.from(new Set(TIMEPICKER_PRESETS.map((preset) => preset.variant)))], []);
  const sizes = useMemo(() => ["all", ...Array.from(new Set(TIMEPICKER_PRESETS.map((preset) => preset.size)))], []);
  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return TIMEPICKER_PRESETS.filter((preset) => {
      const haystack = [preset.family, preset.archetype, preset.variant, preset.size, ...preset.tags].join(" ").toLowerCase();
      return (!search || haystack.includes(search)) && (family === "all" || preset.family === family) && (variant === "all" || preset.variant === variant) && (size === "all" || preset.size === size);
    });
  }, [family, query, size, variant]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount - 1);
  const visible = filtered.slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE);
  const resultLabel = `${filtered.length} ${filtered.length === 1 ? "preset" : "presets"}`;

  const resetFilters = () => {
    setQuery("");
    setFamily("all");
    setVariant("all");
    setSize("all");
    setPage(0);
  };

  const surprise = () => {
    const source = filtered.length ? filtered : TIMEPICKER_PRESETS;
    onApply(source[Math.floor(Math.random() * source.length)]);
  };

  return (
    <SectionCard title="Presets" subtitle="48 structured full-state presets with reset filters, result count, pagination, surprise, and applied-state highlighting.">
      <div className="grid gap-3 sm:grid-cols-4">
        <Input label="Search presets" value={query} onChange={(value) => { setQuery(value); setPage(0); }} />
        <Select label="Family" value={family} options={families} onChange={(value) => { setFamily(value); setPage(0); }} />
        <Select label="Variant" value={variant} options={variants} onChange={(value) => { setVariant(value); setPage(0); }} />
        <Select label="Size" value={size} options={sizes} onChange={(value) => { setSize(value); setPage(0); }} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={resetFilters} className="rounded-xl border px-4 py-3 text-sm font-semibold transition hover:bg-white/10" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
          Reset filters
        </button>
        <button type="button" onClick={surprise} disabled={!filtered.length} className="rounded-xl border px-4 py-3 text-sm font-semibold transition hover:bg-white/10 disabled:opacity-50" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
          Surprise me
        </button>
        <span data-audit="preset-result-count" className="text-sm" style={{ color: "var(--muted)" }}>{resultLabel}</span>
      </div>

      <div className="grid gap-3">
        {visible.length ? visible.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => onApply(preset)}
            aria-pressed={activePresetId === preset.id}
            data-audit="preset-card"
            data-preset-id={preset.id}
            data-testid={`preset-card-${preset.id}`}
            className="rounded-2xl border p-4 text-left transition hover:bg-white/10"
            style={{
              borderColor: activePresetId === preset.id ? "var(--primary)" : "var(--border)",
              background: activePresetId === preset.id ? "color-mix(in oklab, var(--primary) 20%, transparent)" : "color-mix(in oklab, var(--card) 65%, transparent)",
              color: "var(--text)",
            }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <strong>{preset.archetype}</strong>
              <span className="text-xs uppercase tracking-[0.16em]" style={{ color: "var(--muted)" }}>{preset.variant} / {preset.size}</span>
            </div>
            <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{preset.tags.join(", ")}</p>
          </button>
        )) : (
          <div className="rounded-2xl border p-4 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
            No time picker presets match the current filters. Reset filters to continue.
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs" style={{ color: "var(--muted)" }}>Page {currentPage + 1} of {pageCount}</span>
        <div className="inline-flex gap-2">
          <button type="button" disabled={currentPage === 0} onClick={() => setPage(Math.max(0, currentPage - 1))} className="rounded-xl border px-3 py-2 text-sm font-semibold disabled:opacity-50" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
            Previous
          </button>
          <button type="button" disabled={currentPage >= pageCount - 1} onClick={() => setPage(Math.min(pageCount - 1, currentPage + 1))} className="rounded-xl border px-3 py-2 text-sm font-semibold disabled:opacity-50" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
            Next
          </button>
        </div>
      </div>
    </SectionCard>
  );
}
