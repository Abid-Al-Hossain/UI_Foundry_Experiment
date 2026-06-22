"use client";

import { useMemo, useState } from "react";
import Input from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import { POPOVER_PRESETS } from "../_data/PopoverPresets";
import type { StudioPreset } from "../types";

const PAGE_SIZE = 12;

type Props = {
  activePresetId: string | null;
  onApply: (preset: StudioPreset) => void;
};

function pickRandomPreset(items: StudioPreset[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function Badge({ label }: { label: string }) {
  return (
    <span
      className="rounded-full border px-2 py-1 text-[11px] font-medium"
      style={{
        borderColor: "color-mix(in oklab, var(--border) 85%, transparent)",
        background: "color-mix(in oklab, var(--surface) 72%, transparent)",
        color: "var(--muted)",
      }}
    >
      {label}
    </span>
  );
}

export default function PresetsSection({ activePresetId, onApply }: Props) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("all");
  const [variant, setVariant] = useState("all");
  const [size, setSize] = useState("all");
  const [page, setPage] = useState(0);

  const families = useMemo(() => ["all", ...Array.from(new Set(POPOVER_PRESETS.map((preset) => preset.family)))], []);
  const variants = useMemo(() => ["all", ...Array.from(new Set(POPOVER_PRESETS.map((preset) => preset.variant)))], []);
  const sizes = useMemo(() => ["all", ...Array.from(new Set(POPOVER_PRESETS.map((preset) => preset.size)))], []);
  const search = query.trim().toLowerCase();

  const filtered = POPOVER_PRESETS.filter((preset) => {
    if (family !== "all" && preset.family !== family) return false;
    if (variant !== "all" && preset.variant !== variant) return false;
    if (size !== "all" && preset.size !== size) return false;
    if (!search) return true;

    const haystack = [preset.family, preset.archetype, preset.variant, preset.size, ...preset.tags].join(" ").toLowerCase();
    return haystack.includes(search);
  });

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const visible = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);
  const resultLabel = `${filtered.length} ${filtered.length === 1 ? "match" : "matches"}`;

  const updateQuery = (value: string) => {
    setQuery(value);
    setPage(0);
  };

  const updateFamily = (value: string) => {
    setFamily(value);
    setPage(0);
  };

  const updateVariant = (value: string) => {
    setVariant(value);
    setPage(0);
  };

  const updateSize = (value: string) => {
    setSize(value);
    setPage(0);
  };

  const resetFilters = () => {
    setQuery("");
    setFamily("all");
    setVariant("all");
    setSize("all");
    setPage(0);
  };

  const surprise = () => {
    if (!filtered.length) return;
    onApply(pickRandomPreset(filtered));
  };

  return (
    <SectionCard title="Presets" subtitle="Structured full-state presets with search, filters, pagination, surprise, and applied-state highlighting.">
      <div className="grid gap-3 sm:grid-cols-2">
        <Input label="Search presets" value={query} onChange={updateQuery} />
        <Select label="Family" value={family} options={families} onChange={updateFamily} />
        <Select label="Variant" value={variant} options={variants} onChange={updateVariant} />
        <Select label="Size" value={size} options={sizes} onChange={updateSize} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={resetFilters}
          className="rounded-xl border px-4 py-3 text-sm font-semibold transition hover:bg-white/10"
          data-audit="preset-reset-filters"
          data-testid="preset-reset-filters"
          style={{ borderColor: "var(--border)", color: "var(--text)" }}
        >
          Reset filters
        </button>
        <button
          type="button"
          onClick={surprise}
          disabled={!filtered.length}
          className="rounded-xl border px-4 py-3 text-sm font-semibold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          data-audit="preset-surprise"
          data-testid="preset-surprise"
          style={{ borderColor: "var(--border)", color: "var(--text)" }}
        >
          Surprise me
        </button>
        <span className="text-xs" data-audit="preset-result-count" data-testid="preset-result-count" style={{ color: "var(--muted)" }}>
          {resultLabel}
        </span>
      </div>

      <div className="grid gap-3" data-audit="preset-results" data-testid="preset-results">
        {visible.length === 0 ? (
          <div
            className="rounded-2xl border p-5 text-sm"
            data-audit="preset-empty-state"
            data-testid="preset-empty-state"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in oklab, var(--card) 65%, transparent)",
              color: "var(--muted)",
            }}
          >
            No presets match the current filters. Adjust or reset the filters to continue.
          </div>
        ) : (
          visible.map((preset) => {
            const applied = activePresetId === preset.id;

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onApply(preset)}
                aria-pressed={applied}
                className="rounded-2xl border p-4 text-left transition hover:bg-white/10"
                data-audit="preset-card"
                data-applied={applied ? "true" : "false"}
                data-preset-id={preset.id}
                data-testid={`preset-card-${preset.id}`}
                style={{
                  borderColor: applied ? "var(--primary)" : "var(--border)",
                  background: applied ? "color-mix(in oklab, var(--primary) 20%, transparent)" : "color-mix(in oklab, var(--card) 65%, transparent)",
                  color: "var(--text)",
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <strong>{preset.archetype}</strong>
                    <span className="text-xs uppercase tracking-[0.16em]" style={{ color: "var(--muted)" }}>
                      {preset.variant} / {preset.size}
                    </span>
                  </div>
                  <span className="text-xs font-semibold" style={{ color: applied ? "var(--primary)" : "var(--muted)" }}>
                    {applied ? "Applied" : "Apply"}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge label={preset.family} />
                  <Badge label={preset.variant} />
                  <Badge label={preset.size} />
                  {preset.tags.slice(0, 4).map((tag, tagIndex) => (
                    <Badge key={`${tag}-${tagIndex}`} label={tag} />
                  ))}
                </div>
              </button>
            );
          })
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs" data-audit="preset-page-count" data-testid="preset-page-count" style={{ color: "var(--muted)" }}>
          Page {safePage + 1} of {pageCount}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={safePage === 0}
            onClick={() => setPage(Math.max(0, safePage - 1))}
            className="rounded-xl border px-3 py-2 text-sm font-semibold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            data-audit="preset-prev-page"
            data-testid="preset-prev-page"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
          >
            Previous
          </button>
          <button
            type="button"
            disabled={safePage >= pageCount - 1}
            onClick={() => setPage(Math.min(pageCount - 1, safePage + 1))}
            className="rounded-xl border px-3 py-2 text-sm font-semibold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            data-audit="preset-next-page"
            data-testid="preset-next-page"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
          >
            Next
          </button>
        </div>
      </div>
    </SectionCard>
  );
}
