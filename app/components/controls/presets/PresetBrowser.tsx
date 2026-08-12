"use client";

import { useMemo, useState } from "react";
import Input from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";

export type PresetMetadata<State extends object> = {
  id: string;
  family: string;
  archetype: string;
  variant: string;
  size: string;
  tags: string[];
  state: Partial<State> & Record<string, unknown>;
};

export type PresetBrowserProps<
  State extends object,
  Preset extends PresetMetadata<State>,
> = {
  presets: readonly Preset[];
  activePresetId: string | null;
  onApply: (preset: Preset) => void;
  onResetStudio?: () => void;
  pageSize?: number;
  subtitle?: string;
  renderPreview?: (preset: Preset) => React.ReactNode;
};

function uniqueOptions<
  State extends object,
  Preset extends PresetMetadata<State>,
>(presets: readonly Preset[], field: "family" | "archetype" | "variant" | "size") {
  return ["all", ...Array.from(new Set(presets.map((preset) => preset[field])))];
}

function stateColor(state: Record<string, unknown>, keys: string[], fallback: string) {
  for (const key of keys) {
    const value = state[key];
    if (typeof value === "string" && value.trim()) return value;
  }
  return fallback;
}

function DefaultPresetPreview<State extends object>({
  preset,
}: {
  preset: PresetMetadata<State>;
}) {
  const state = preset.state;
  const background = stateColor(
    state,
    ["background", "surface", "trackColor", "containerBg"],
    "var(--card)",
  );
  const foreground = stateColor(
    state,
    ["foreground", "textColor", "color", "labelColor"],
    "var(--text)",
  );
  const accent = stateColor(
    state,
    ["accent", "primary", "fillColor", "activeColor"],
    "var(--primary)",
  );
  const border = stateColor(
    state,
    ["border", "borderColor", "trackColor"],
    "var(--border)",
  );

  return (
    <div
      className="relative grid min-h-24 place-items-center overflow-hidden rounded-xl border p-4"
      style={{ background, borderColor: border, color: foreground }}
      aria-hidden="true"
    >
      <span
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: accent }}
      />
      <div className="text-center">
        <div className="text-sm font-semibold">{preset.archetype}</div>
        <div className="mt-1 text-[11px] uppercase tracking-[0.16em] opacity-70">
          {preset.variant} / {preset.size}
        </div>
      </div>
    </div>
  );
}

export default function PresetBrowser<
  State extends object,
  Preset extends PresetMetadata<State>,
>({
  presets,
  activePresetId,
  onApply,
  onResetStudio,
  pageSize = 12,
  subtitle,
  renderPreview,
}: PresetBrowserProps<State, Preset>) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("all");
  const [archetype, setArchetype] = useState("all");
  const [variant, setVariant] = useState("all");
  const [size, setSize] = useState("all");
  const [page, setPage] = useState(0);

  const families = useMemo(() => uniqueOptions(presets, "family"), [presets]);
  const archetypes = useMemo(
    () => uniqueOptions(presets, "archetype"),
    [presets],
  );
  const variants = useMemo(() => uniqueOptions(presets, "variant"), [presets]);
  const sizes = useMemo(() => uniqueOptions(presets, "size"), [presets]);
  const search = query.trim().toLowerCase();

  const filtered = useMemo(
    () =>
      presets.filter((preset) => {
        if (family !== "all" && preset.family !== family) return false;
        if (archetype !== "all" && preset.archetype !== archetype) return false;
        if (variant !== "all" && preset.variant !== variant) return false;
        if (size !== "all" && preset.size !== size) return false;
        if (!search) return true;

        return [
          preset.family,
          preset.archetype,
          preset.variant,
          preset.size,
          ...preset.tags,
        ]
          .join(" ")
          .toLowerCase()
          .includes(search);
      }),
    [archetype, family, presets, search, size, variant],
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const visible = filtered.slice(
    safePage * pageSize,
    safePage * pageSize + pageSize,
  );
  const hasFilters =
    Boolean(search) ||
    family !== "all" ||
    archetype !== "all" ||
    variant !== "all" ||
    size !== "all";

  const resetPage = () => setPage(0);
  const resetFilters = () => {
    setQuery("");
    setFamily("all");
    setArchetype("all");
    setVariant("all");
    setSize("all");
    setPage(0);
  };
  const surprise = () => {
    const usesFilteredCatalog = filtered.length > 0;
    const source = usesFilteredCatalog ? filtered : presets;
    if (!source.length) return;
    const selectedIndex = Math.floor(Math.random() * source.length);
    const selected = source[selectedIndex];
    if (!usesFilteredCatalog) {
      setQuery("");
      setFamily("all");
      setArchetype("all");
      setVariant("all");
      setSize("all");
      setPage(Math.floor(presets.indexOf(selected) / pageSize));
    } else {
      setPage(Math.floor(selectedIndex / pageSize));
    }
    onApply(selected);
  };

  return (
    <SectionCard
      title="Presets"
      subtitle={
        subtitle ??
        `${presets.length} structured full-state presets with shared search, filtering, paging, and applied-state behavior.`
      }
    >
      <div className="grid gap-4" data-audit="preset-browser" data-testid="preset-browser">
        <div className="grid gap-3 sm:grid-cols-2">
          <Input
            label="Search presets"
            value={query}
            placeholder="Search family, archetype, variant, size, or tag"
            onChange={(value) => {
              setQuery(value);
              resetPage();
            }}
          />
          <div
            className="grid content-end text-xs"
            data-audit="preset-result-count"
            data-testid="preset-result-count"
            style={{ color: "var(--muted)" }}
          >
            {filtered.length} {filtered.length === 1 ? "match" : "matches"} across {presets.length} presets
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" data-audit="preset-filters">
          <Select label="Family" value={family} options={families} onChange={(value) => { setFamily(value); resetPage(); }} />
          <Select label="Archetype" value={archetype} options={archetypes} onChange={(value) => { setArchetype(value); resetPage(); }} />
          <Select label="Variant" value={variant} options={variants} onChange={(value) => { setVariant(value); resetPage(); }} />
          <Select label="Size" value={size} options={sizes} onChange={(value) => { setSize(value); resetPage(); }} />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={resetFilters}
            disabled={!hasFilters}
            className="rounded-xl border px-4 py-3 text-sm font-semibold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            data-audit="preset-reset-filters"
            data-testid="preset-reset-filters"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
          >
            Reset filters
          </button>
          <button
            type="button"
            onClick={surprise}
            disabled={!presets.length}
            className="rounded-xl border px-4 py-3 text-sm font-semibold transition hover:bg-white/10 disabled:opacity-50"
            data-audit="preset-surprise-button"
            data-testid="preset-surprise-button"
            style={{
              borderColor: "color-mix(in oklab, var(--primary) 60%, var(--border))",
              background: "color-mix(in oklab, var(--primary) 16%, transparent)",
              color: "var(--text)",
            }}
          >
            Surprise me
          </button>
          {onResetStudio ? (
            <button
              type="button"
              onClick={onResetStudio}
              className="rounded-xl border px-4 py-3 text-sm font-semibold transition hover:bg-white/10"
              data-audit="preset-reset-studio"
              data-testid="preset-reset-studio"
              style={{ borderColor: "var(--border)", color: "var(--text)" }}
            >
              Reset studio
            </button>
          ) : null}
          <span className="text-xs" style={{ color: "var(--muted)" }}>
            Presets apply a complete editable state snapshot.
          </span>
        </div>

        <div className="grid gap-3 md:grid-cols-2" data-audit="preset-grid" data-testid="preset-grid">
          {visible.length === 0 ? (
            <div
              className="rounded-2xl border p-5 text-sm md:col-span-2"
              data-audit="preset-empty-state"
              data-testid="preset-empty-state"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--card) 65%, transparent)",
                color: "var(--muted)",
              }}
            >
              No presets match the current filters. Reset filters or change the search query.
            </div>
          ) : (
            visible.map((preset) => {
              const isApplied = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onApply(preset)}
                  aria-pressed={isApplied}
                  data-audit="preset-apply-button"
                  data-preset-id={preset.id}
                  data-applied={isApplied ? "true" : "false"}
                  data-testid={`preset-apply-${preset.id}`}
                  className="grid gap-3 rounded-2xl border p-4 text-left transition hover:bg-white/10"
                  style={{
                    borderColor: isApplied ? "var(--primary)" : "var(--border)",
                    background: isApplied
                      ? "color-mix(in oklab, var(--primary) 20%, transparent)"
                      : "color-mix(in oklab, var(--card) 65%, transparent)",
                    color: "var(--text)",
                  }}
                >
                  {renderPreview ? renderPreview(preset) : <DefaultPresetPreview preset={preset} />}
                  <span className="flex flex-wrap items-start justify-between gap-2">
                    <span>
                      <strong>{preset.archetype}</strong>
                      <span className="ml-2 text-xs uppercase tracking-[0.16em]" style={{ color: "var(--muted)" }}>
                        {preset.variant} / {preset.size}
                      </span>
                    </span>
                    {isApplied ? (
                      <span className="text-xs font-semibold" style={{ color: "var(--primary)" }}>
                        Applied
                      </span>
                    ) : null}
                  </span>
                  <span className="text-sm" style={{ color: "var(--muted)" }}>
                    {preset.tags.slice(0, 5).join(", ")}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3" data-audit="preset-pagination" data-testid="preset-pagination">
          <span className="text-xs" style={{ color: "var(--muted)" }}>
            Page {safePage + 1} of {pageCount}
          </span>
          <span className="flex items-center gap-2">
            <button
              type="button"
              disabled={safePage === 0}
              onClick={() => setPage(Math.max(0, safePage - 1))}
              className="rounded-xl border px-3 py-2 text-sm font-semibold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              data-testid="preset-page-previous"
              style={{ borderColor: "var(--border)", color: "var(--text)" }}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={safePage >= pageCount - 1}
              onClick={() => setPage(Math.min(pageCount - 1, safePage + 1))}
              className="rounded-xl border px-3 py-2 text-sm font-semibold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              data-testid="preset-page-next"
              style={{ borderColor: "var(--border)", color: "var(--text)" }}
            >
              Next
            </button>
          </span>
        </div>
      </div>
    </SectionCard>
  );
}
