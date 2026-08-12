"use client";

import { useMemo, useState } from "react";
import Input from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import { TIMELINE_PRESETS } from "../_data/TimelinePresets";
import type { StudioPreset } from "../types";

const PAGE_SIZE = 8;

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("all");
  const [size, setSize] = useState("all");
  const [page, setPage] = useState(1);
  const families = useMemo(() => ["all", ...Array.from(new Set(TIMELINE_PRESETS.map((preset) => preset.family)))], []);
  const sizes = useMemo(() => ["all", ...Array.from(new Set(TIMELINE_PRESETS.map((preset) => preset.size)))], []);
  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    return TIMELINE_PRESETS.filter((preset) => {
      const haystack = [preset.family, preset.archetype, preset.variant, preset.size, ...preset.tags].join(" ").toLowerCase();
      return (!search || haystack.includes(search)) && (family === "all" || preset.family === family) && (size === "all" || preset.size === size);
    });
  }, [family, query, size]);
  const source = filtered.length ? filtered : TIMELINE_PRESETS;
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);
  const hasFilters = Boolean(query || family !== "all" || size !== "all" || page !== 1);
  const activePreset = activePresetId ? TIMELINE_PRESETS.find((preset) => preset.id === activePresetId) : null;
const resetFilters = () => {
    setQuery("");
    setFamily("all");
    setSize("all");
    setPage(1);
  };

  return (
    <SectionCard title="Presets" subtitle="48 structured full-state presets.">
      <div data-testid="preset-browser" data-audit="preset-browser" className="grid gap-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <Input label="Search presets" value={query} onChange={(value) => { setQuery(value); setPage(1); }} data-testid="preset-search" />
          <Select label="Family" value={family} options={families} onChange={(value) => { setFamily(value); setPage(1); }} />
          <Select label="Size" value={size} options={sizes} onChange={(value) => { setSize(value); setPage(1); }} />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p data-testid="preset-result-count" data-audit="preset-result-count" className="text-sm" style={{ color: "var(--muted)" }}>
            {filtered.length} of {TIMELINE_PRESETS.length} presets match
          </p>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={resetFilters} disabled={!hasFilters} data-testid="preset-reset" data-audit="preset-filter-reset" className="rounded-xl border px-4 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50" style={{ borderColor: "var(--border)", color: "var(--text)" }}>Reset filters</button>
            <button type="button" onClick={() => onApply(source[Math.floor(Math.random() * source.length)])} data-testid="preset-surprise" className="rounded-xl border px-4 py-3 text-sm font-semibold" style={{ borderColor: "var(--border)", color: "var(--text)" }}>Surprise me</button>
          </div>
        </div>
        {activePreset && (
          <p data-testid="applied-preset" data-audit="applied-preset" className="rounded-xl border px-3 py-2 text-sm" style={{ borderColor: "var(--primary)", color: "var(--text)", background: "color-mix(in oklab, var(--primary) 14%, transparent)" }}>
            Applied: {activePreset.family} / {activePreset.archetype} / {activePreset.variant}
          </p>
        )}
        <div className="grid gap-3" data-testid="preset-results">
          {pageItems.map((preset) => (
            <button key={preset.id} type="button" onClick={() => onApply(preset)} data-testid="preset-card" data-preset-id={preset.id} aria-pressed={activePresetId === preset.id} className="rounded-2xl border p-4 text-left" style={{ borderColor: activePresetId === preset.id ? "var(--primary)" : "var(--border)", background: activePresetId === preset.id ? "color-mix(in oklab, var(--primary) 20%, transparent)" : "color-mix(in oklab, var(--card) 65%, transparent)", color: "var(--text)" }}>
              <strong>{preset.archetype}</strong>
              <span className="ml-2 text-xs uppercase tracking-[0.16em]" style={{ color: "var(--muted)" }}>{preset.variant} / {preset.size}</span>
              <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{preset.tags.join(", ")}</p>
            </button>
          ))}
          {!pageItems.length && <p className="rounded-2xl border p-4 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>No presets match the current filters.</p>}
        </div>
        <nav aria-label="Preset pages" data-testid="preset-pagination" data-audit="preset-pagination" className="flex items-center justify-between gap-3">
          <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={currentPage === 1} className="rounded-xl border px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50" style={{ borderColor: "var(--border)", color: "var(--text)" }}>Previous</button>
          <span className="text-sm" style={{ color: "var(--muted)" }}>Page {currentPage} of {pageCount}</span>
          <button type="button" onClick={() => setPage((value) => Math.min(pageCount, value + 1))} disabled={currentPage === pageCount} className="rounded-xl border px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50" style={{ borderColor: "var(--border)", color: "var(--text)" }}>Next</button>
        </nav>
      </div>
    </SectionCard>
  );
}
