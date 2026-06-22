"use client";

import { useEffect, useMemo, useState } from "react";
import Input from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import { GRID_PRESETS } from "../_data/GridPresets";
import type { StudioPreset } from "../types";

const PAGE_SIZE = 8;

function uniqueValues(key: keyof Pick<StudioPreset, "family" | "size" | "variant">) {
  return ["all", ...Array.from(new Set(GRID_PRESETS.map((preset) => preset[key])))];
}

function pickRandomPreset(items: StudioPreset[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("all");
  const [size, setSize] = useState("all");
  const [variant, setVariant] = useState("all");
  const [page, setPage] = useState(0);

  const families = useMemo(() => uniqueValues("family"), []);
  const sizes = useMemo(() => uniqueValues("size"), []);
  const variants = useMemo(() => uniqueValues("variant"), []);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    return GRID_PRESETS.filter((preset) => {
      if (family !== "all" && preset.family !== family) return false;
      if (size !== "all" && preset.size !== size) return false;
      if (variant !== "all" && preset.variant !== variant) return false;

      if (!search) return true;

      const haystack = [preset.family, preset.archetype, preset.variant, preset.size, ...preset.tags].join(" ").toLowerCase();
      return haystack.includes(search);
    });
  }, [family, query, size, variant]);

  useEffect(() => {
    setPage(0);
  }, [family, query, size, variant]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const visible = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);
  const resultLabel = `${filtered.length} ${filtered.length === 1 ? "match" : "matches"}`;
  const filtersActive = Boolean(query.trim()) || family !== "all" || size !== "all" || variant !== "all";

  const resetFilters = () => {
    setQuery("");
    setFamily("all");
    setSize("all");
    setVariant("all");
    setPage(0);
  };

  const applyRandomPreset = () => {
    if (!filtered.length) return;
    onApply(pickRandomPreset(filtered));
  };

  const goToPage = (nextPage: number) => {
    setPage(Math.min(Math.max(nextPage, 0), pageCount - 1));
  };

  return (
    <SectionCard title="Presets" subtitle={`48 full-state grid presets. ${resultLabel}.`}>
      <div className="grid gap-3 sm:grid-cols-4" data-audit="preset-filters" data-testid="preset-filters">
        <Input label="Search presets" value={query} onChange={setQuery} />
        <Select label="Family" value={family} options={families} onChange={setFamily} />
        <Select label="Variant" value={variant} options={variants} onChange={setVariant} />
        <Select label="Size" value={size} options={sizes} onChange={setSize} />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm" style={{ color: "var(--muted)" }} data-audit="preset-result-count" data-testid="preset-result-count">
          Showing {visible.length} of {filtered.length} presets
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={resetFilters}
            disabled={!filtersActive}
            className="rounded-xl border px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
            data-audit="preset-reset-filters"
            data-testid="preset-reset-filters"
          >
            Reset filters
          </button>
          <button
            type="button"
            onClick={applyRandomPreset}
            disabled={!filtered.length}
            className="rounded-xl border px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            style={{ borderColor: "var(--primary)", color: "var(--text)" }}
            data-audit="preset-surprise"
            data-testid="preset-surprise"
          >
            Surprise me
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-3" data-audit="preset-grid" data-testid="preset-grid">
        {visible.length ? (
          visible.map((preset) => {
            const isApplied = activePresetId === preset.id;

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onApply(preset)}
                aria-pressed={isApplied}
                className="rounded-2xl border p-4 text-left transition"
                style={{
                  borderColor: isApplied ? "var(--primary)" : "var(--border)",
                  background: isApplied ? "color-mix(in oklab, var(--primary) 20%, transparent)" : "color-mix(in oklab, var(--card) 65%, transparent)",
                  color: "var(--text)",
                }}
                data-audit="preset-card"
                data-preset-id={preset.id}
                data-applied={isApplied ? "true" : undefined}
                data-testid={`preset-card-${preset.id}`}
              >
                <span className="flex flex-wrap items-center gap-2">
                  <strong>{preset.archetype}</strong>
                  <span className="text-xs uppercase tracking-[0.16em]" style={{ color: "var(--muted)" }}>
                    {preset.variant} / {preset.size}
                  </span>
                  {isApplied ? (
                    <span className="rounded-full px-2 py-1 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ background: "var(--primary)", color: "var(--background)" }}>
                      Applied
                    </span>
                  ) : null}
                </span>
                <span className="mt-2 block text-sm" style={{ color: "var(--muted)" }}>
                  {preset.family} / {preset.tags.join(", ")}
                </span>
              </button>
            );
          })
        ) : (
          <div className="rounded-2xl border p-4 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }} data-audit="preset-empty-state" data-testid="preset-empty-state">
            No presets match the current filters. Adjust or reset the filters to continue.
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3" data-audit="preset-pagination" data-testid="preset-pagination">
        <span className="text-sm" style={{ color: "var(--muted)" }}>
          Page {safePage + 1} of {pageCount}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={safePage <= 0}
            onClick={() => goToPage(safePage - 1)}
            className="rounded-xl border px-3 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
            data-audit="preset-prev-page"
            data-testid="preset-prev-page"
          >
            Previous
          </button>
          <button
            type="button"
            disabled={safePage >= pageCount - 1}
            onClick={() => goToPage(safePage + 1)}
            className="rounded-xl border px-3 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
            data-audit="preset-next-page"
            data-testid="preset-next-page"
          >
            Next
          </button>
        </div>
      </div>
    </SectionCard>
  );
}
