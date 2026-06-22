"use client";

import { useMemo, useState } from "react";
import Input from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import { AUTHFORM_PRESETS } from "../_data/AuthFormPresets";
import type { StudioPreset } from "../types";

const PAGE_SIZE = 8;

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("all");
  const [variant, setVariant] = useState("all");
  const [size, setSize] = useState("all");
  const [page, setPage] = useState(1);
  const families = useMemo(() => ["all", ...Array.from(new Set(AUTHFORM_PRESETS.map((preset) => preset.family)))], []);
  const variants = useMemo(() => ["all", ...Array.from(new Set(AUTHFORM_PRESETS.map((preset) => preset.variant)))], []);
  const sizes = useMemo(() => ["all", ...Array.from(new Set(AUTHFORM_PRESETS.map((preset) => preset.size)))], []);
  const filtered = useMemo(() => AUTHFORM_PRESETS.filter((preset) => [preset.family, preset.archetype, preset.variant, preset.size, ...preset.tags].join(" ").toLowerCase().includes(query.toLowerCase()) && (family === "all" || preset.family === family) && (variant === "all" || preset.variant === variant) && (size === "all" || preset.size === size)), [family, query, size, variant]);
  const source = filtered.length ? filtered : AUTHFORM_PRESETS;
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const resetFilters = () => { setQuery(""); setFamily("all"); setVariant("all"); setSize("all"); setPage(1); };
  const updateQuery = (value: string) => { setQuery(value); setPage(1); };
  const updateFamily = (value: string) => { setFamily(value); setPage(1); };
  const updateVariant = (value: string) => { setVariant(value); setPage(1); };
  const updateSize = (value: string) => { setSize(value); setPage(1); };
  return (
    <SectionCard title="Presets" subtitle="48 structured full-state presets.">
      <div className="grid gap-3 sm:grid-cols-4">
        <Input label="Search presets" value={query} onChange={updateQuery} />
        <Select label="Family" value={family} options={families} onChange={updateFamily} />
        <Select label="Variant" value={variant} options={variants} onChange={updateVariant} />
        <Select label="Size" value={size} options={sizes} onChange={updateSize} />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          {filtered.length} results - page {currentPage} of {pageCount}
          {activePresetId ? " - applied preset active" : ""}
        </p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={resetFilters} className="rounded-xl border px-4 py-3 text-sm font-semibold" style={{ borderColor: "var(--border)", color: "var(--text)" }}>Reset filters</button>
          <button type="button" onClick={() => onApply(source[Math.floor(Math.random() * source.length)])} className="rounded-xl border px-4 py-3 text-sm font-semibold" style={{ borderColor: "var(--border)", color: "var(--text)" }}>Surprise me</button>
        </div>
      </div>
      <div className="grid gap-3">
        {visible.map((preset) => (
          <button key={preset.id} type="button" aria-pressed={activePresetId === preset.id} onClick={() => onApply(preset)} className="rounded-2xl border p-4 text-left" style={{ borderColor: activePresetId === preset.id ? "var(--primary)" : "var(--border)", background: activePresetId === preset.id ? "color-mix(in oklab, var(--primary) 20%, transparent)" : "color-mix(in oklab, var(--card) 65%, transparent)", color: "var(--text)" }}>
            <strong>{preset.archetype}</strong>
            <span className="ml-2 text-xs uppercase tracking-[0.16em]" style={{ color: "var(--muted)" }}>{preset.family} / {preset.variant} / {preset.size}</span>
            <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{preset.tags.join(", ")}</p>
          </button>
        ))}
        {!visible.length ? <div className="rounded-2xl border p-4 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>No presets match the current filters.</div> : null}
      </div>
      <div className="flex items-center justify-between gap-3">
        <button type="button" disabled={currentPage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="rounded-xl border px-4 py-2 text-sm disabled:opacity-40" style={{ borderColor: "var(--border)", color: "var(--text)" }}>Previous</button>
        <button type="button" disabled={currentPage === pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))} className="rounded-xl border px-4 py-2 text-sm disabled:opacity-40" style={{ borderColor: "var(--border)", color: "var(--text)" }}>Next</button>
      </div>
    </SectionCard>
  );
}
