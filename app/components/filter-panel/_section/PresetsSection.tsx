"use client";

import { useMemo, useState } from "react";
import Input from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import { FILTERPANEL_PRESETS } from "../_data/FilterPanelPresets";
import type { StudioPreset } from "../types";

const PAGE_SIZE = 8;

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("all");
  const [size, setSize] = useState("all");
  const [page, setPage] = useState(0);
  const families = useMemo(() => ["all", ...Array.from(new Set(FILTERPANEL_PRESETS.map((preset) => preset.family)))], []);
  const sizes = useMemo(() => ["all", ...Array.from(new Set(FILTERPANEL_PRESETS.map((preset) => preset.size)))], []);
  const filtered = useMemo(() => FILTERPANEL_PRESETS.filter((preset) => [preset.family, preset.archetype, preset.variant, preset.size, ...preset.tags].join(" ").toLowerCase().includes(query.toLowerCase()) && (family === "all" || preset.family === family) && (size === "all" || preset.size === size)), [family, query, size]);
  const source = filtered.length ? filtered : FILTERPANEL_PRESETS;
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
const resetFilters = () => {
    setQuery("");
    setFamily("all");
    setSize("all");
    setPage(0);
  };

  return (
    <SectionCard title="Presets" subtitle={`${filtered.length} of ${FILTERPANEL_PRESETS.length} structured full-state presets.`}>
      <div className="grid gap-3 sm:grid-cols-3">
        <Input label="Search presets" value={query} onChange={(value) => { setQuery(value); setPage(0); }} />
        <Select label="Family" value={family} options={families} onChange={(value) => { setFamily(value); setPage(0); }} />
        <Select label="Size" value={size} options={sizes} onChange={(value) => { setSize(value); setPage(0); }} />
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => onApply(source[Math.floor(Math.random() * source.length)])} className="rounded-xl border px-4 py-3 text-sm font-semibold" style={{ borderColor: "var(--border)", color: "var(--text)" }}>Surprise me</button>
        <button type="button" onClick={resetFilters} className="rounded-xl border px-4 py-3 text-sm font-semibold" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>Reset filters</button>
      </div>
      <div className="grid gap-3">
        {visible.map((preset) => (
          <button key={preset.id} type="button" onClick={() => onApply(preset)} className="rounded-2xl border p-4 text-left" style={{ borderColor: activePresetId === preset.id ? "var(--primary)" : "var(--border)", background: activePresetId === preset.id ? "color-mix(in oklab, var(--primary) 20%, transparent)" : "color-mix(in oklab, var(--card) 65%, transparent)", color: "var(--text)" }}>
            <strong>{preset.archetype}</strong>
            <span className="ml-2 text-xs uppercase tracking-[0.16em]" style={{ color: "var(--muted)" }}>{preset.variant} / {preset.size}</span>
            <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{preset.tags.join(", ")}</p>
          </button>
        ))}
        {!visible.length && <p className="rounded-2xl border p-4 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>No presets match the current filters. Reset filters or use Surprise me to sample the full catalog.</p>}
      </div>
      <div className="flex items-center justify-between gap-3 text-sm" style={{ color: "var(--muted)" }}>
        <span>Page {Math.min(page + 1, pageCount)} of {pageCount}</span>
        <div className="flex gap-2">
          <button type="button" onClick={() => setPage((value) => Math.max(0, value - 1))} disabled={page === 0} className="rounded-lg border px-3 py-2 disabled:opacity-45" style={{ borderColor: "var(--border)" }}>Previous</button>
          <button type="button" onClick={() => setPage((value) => Math.min(pageCount - 1, value + 1))} disabled={page >= pageCount - 1} className="rounded-lg border px-3 py-2 disabled:opacity-45" style={{ borderColor: "var(--border)" }}>Next</button>
        </div>
      </div>
    </SectionCard>
  );
}
