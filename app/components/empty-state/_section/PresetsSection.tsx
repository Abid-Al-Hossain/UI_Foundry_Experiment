"use client";

import { useMemo, useState } from "react";
import Input from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import { EMPTYSTATE_PRESETS } from "../_data/EmptyStatePresets";
import type { StudioPreset } from "../types";

const PAGE_SIZE = 4;

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("all");
  const [size, setSize] = useState("all");
  const [page, setPage] = useState(1);
  const [surpriseStep, setSurpriseStep] = useState(0);
  const families = useMemo(() => ["all", ...Array.from(new Set(EMPTYSTATE_PRESETS.map((preset) => preset.family)))], []);
  const sizes = useMemo(() => ["all", ...Array.from(new Set(EMPTYSTATE_PRESETS.map((preset) => preset.size)))], []);
  const filtered = EMPTYSTATE_PRESETS.filter((preset) => [preset.family, preset.archetype, preset.variant, preset.size, preset.state.title, preset.state.stateMode, ...preset.tags].join(" ").toLowerCase().includes(query.toLowerCase()) && (family === "all" || preset.family === family) && (size === "all" || preset.size === size));
  const source = filtered.length ? filtered : EMPTYSTATE_PRESETS;
  const totalPages = Math.max(1, Math.ceil(source.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = source.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const resetFilters = () => {
    setQuery("");
    setFamily("all");
    setSize("all");
    setPage(1);
  };
  const surprise = () => {
    const nextStep = surpriseStep + 1;
    const preset = source[(nextStep * 3 + currentPage) % source.length];
    const index = source.findIndex((candidate) => candidate.id === preset.id);
    setSurpriseStep(nextStep);
    setPage(Math.floor(index / PAGE_SIZE) + 1);
    onApply(preset);
  };

  return (
    <SectionCard title="Presets" subtitle={`${EMPTYSTATE_PRESETS.length} native empty-state presets with paged browsing.`}>
      <div className="grid gap-3 sm:grid-cols-3">
        <Input label="Search presets" value={query} onChange={(value) => { setQuery(value); setPage(1); }} />
        <Select label="Family" value={family} options={families} onChange={(value) => { setFamily(value); setPage(1); }} />
        <Select label="Size" value={size} options={sizes} onChange={(value) => { setSize(value); setPage(1); }} />
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={surprise} className="rounded-xl border px-4 py-3 text-sm font-semibold" style={{ borderColor: "var(--border)", color: "var(--text)" }}>Surprise me</button>
        <button type="button" onClick={resetFilters} className="rounded-xl border px-4 py-3 text-sm font-semibold" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>Reset filters</button>
      </div>
      <div className="flex items-center justify-between text-xs" style={{ color: "var(--muted)" }}>
        <span>{source.length} matches</span>
        <span>Page {currentPage} of {totalPages}</span>
      </div>
      <div className="grid gap-3">
        {visible.map((preset) => (
          <button key={preset.id} type="button" onClick={() => onApply(preset)} className="rounded-2xl border p-4 text-left" style={{ borderColor: activePresetId === preset.id ? "var(--primary)" : "var(--border)", background: activePresetId === preset.id ? "color-mix(in oklab, var(--primary) 20%, transparent)" : "color-mix(in oklab, var(--card) 65%, transparent)", color: "var(--text)" }}>
            <strong>{preset.archetype}</strong>
            <span className="ml-2 text-xs uppercase tracking-[0.16em]" style={{ color: "var(--muted)" }}>{preset.variant} / {preset.size}</span>
            <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{preset.state.title} - {preset.tags.join(", ")}</p>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button type="button" disabled={currentPage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="rounded-xl border px-4 py-2 text-sm font-semibold disabled:opacity-40" style={{ borderColor: "var(--border)", color: "var(--text)" }}>Previous</button>
        <button type="button" disabled={currentPage === totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} className="rounded-xl border px-4 py-2 text-sm font-semibold disabled:opacity-40" style={{ borderColor: "var(--border)", color: "var(--text)" }}>Next</button>
      </div>
    </SectionCard>
  );
}
