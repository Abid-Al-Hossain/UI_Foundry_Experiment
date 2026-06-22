"use client";

import { useMemo, useState } from "react";
import Input from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import { DRAWER_PRESETS } from "../_data/DrawerPresets";
import type { StudioPreset } from "../types";

const PAGE_SIZE = 8;

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("all");
  const [size, setSize] = useState("all");
  const [page, setPage] = useState(1);
  const [surpriseSeed, setSurpriseSeed] = useState(0);
  const families = useMemo(() => ["all", ...Array.from(new Set(DRAWER_PRESETS.map((preset) => preset.family)))], []);
  const sizes = useMemo(() => ["all", ...Array.from(new Set(DRAWER_PRESETS.map((preset) => preset.size)))], []);
  const filtered = DRAWER_PRESETS.filter((preset) => [preset.family, preset.archetype, preset.variant, preset.size, ...preset.tags].join(" ").toLowerCase().includes(query.toLowerCase()) && (family === "all" || preset.family === family) && (size === "all" || preset.size === size));
  const source = filtered.length ? filtered : DRAWER_PRESETS;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const resetFilters = () => {
    setQuery("");
    setFamily("all");
    setSize("all");
    setPage(1);
  };
  const applySurprise = () => {
    onApply(source[(surpriseSeed * 7 + currentPage + filtered.length) % source.length]);
    setSurpriseSeed((value) => value + 1);
  };

  return <SectionCard title="Presets" subtitle={`${filtered.length} dialog-native drawer presets with pagination.`}><div className="grid gap-3 sm:grid-cols-3"><Input label="Search presets" value={query} onChange={(value) => { setQuery(value); setPage(1); }} /><Select label="Family" value={family} options={families} onChange={(value) => { setFamily(value); setPage(1); }} /><Select label="Size" value={size} options={sizes} onChange={(value) => { setSize(value); setPage(1); }} /></div><div className="flex flex-wrap gap-2"><button type="button" onClick={applySurprise} className="rounded-xl border px-4 py-3 text-sm font-semibold" style={{ borderColor: "var(--border)", color: "var(--text)" }}>Surprise me</button><button type="button" onClick={resetFilters} className="rounded-xl border px-4 py-3 text-sm font-semibold" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>Reset filters</button></div><div className="grid gap-3">{pageItems.map((preset) => <button key={preset.id} type="button" onClick={() => onApply(preset)} className="rounded-2xl border p-4 text-left" style={{ borderColor: activePresetId === preset.id ? "var(--primary)" : "var(--border)", background: activePresetId === preset.id ? "color-mix(in oklab, var(--primary) 20%, transparent)" : "color-mix(in oklab, var(--card) 65%, transparent)", color: "var(--text)" }}><strong>{preset.archetype}</strong><span className="ml-2 text-xs uppercase tracking-[0.16em]" style={{ color: "var(--muted)" }}>{preset.variant} / {preset.size}</span><p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{preset.tags.join(", ")}</p></button>)}</div><div className="flex items-center justify-between gap-3 text-sm" style={{ color: "var(--muted)" }}><span>Page {currentPage} of {totalPages}</span><div className="flex gap-2"><button type="button" disabled={currentPage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="rounded-xl border px-3 py-2 disabled:opacity-40" style={{ borderColor: "var(--border)" }}>Prev</button><button type="button" disabled={currentPage === totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} className="rounded-xl border px-3 py-2 disabled:opacity-40" style={{ borderColor: "var(--border)" }}>Next</button></div></div></SectionCard>;
}
