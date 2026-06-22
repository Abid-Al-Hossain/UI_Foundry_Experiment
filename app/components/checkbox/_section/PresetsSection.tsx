"use client";

import React, { useMemo, useState } from "react";
import { SectionCard } from "@/app/components/controls/ui";
import type { CheckboxPreset } from "../_data/presets";

type Props = {
  state: { downloadName: string };
  presets: CheckboxPreset[];
  onApply: (preset: CheckboxPreset) => void;
};

const PAGE_SIZE = 12;

function pickRandomPreset<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export default function PresetsSection({ state, presets, onApply }: Props) {
  const [query, setQuery] = useState("");
  const [familyFilter, setFamilyFilter] = useState("all");
  const [archetypeFilter, setArchetypeFilter] = useState("all");
  const [variantFilter, setVariantFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [page, setPage] = useState(0);

  const families = useMemo(
    () => Array.from(new Set(presets.map((preset) => preset.family))),
    [presets],
  );
  const archetypes = useMemo(
    () => Array.from(new Set(presets.map((preset) => preset.archetype))),
    [presets],
  );
  const variants = useMemo(
    () => Array.from(new Set(presets.map((preset) => preset.variant))),
    [presets],
  );
  const sizes = useMemo(
    () => Array.from(new Set(presets.map((preset) => preset.size))),
    [presets],
  );

  const search = query.trim().toLowerCase();
  const filtered = presets.filter((preset) => {
    if (familyFilter !== "all" && preset.family !== familyFilter) return false;
    if (archetypeFilter !== "all" && preset.archetype !== archetypeFilter) return false;
    if (variantFilter !== "all" && preset.variant !== variantFilter) return false;
    if (sizeFilter !== "all" && preset.size !== sizeFilter) return false;
    if (!search) return true;
    const haystack = [
      preset.name,
      preset.summary,
      preset.family,
      preset.archetype,
      preset.variant,
      preset.size,
      ...preset.tags,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(search);
  });

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const visible = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);
  const activePresetName = state.downloadName;
  const resultLabel = `${filtered.length} ${filtered.length === 1 ? "match" : "matches"}`;

  const reset = () => {
    setQuery("");
    setFamilyFilter("all");
    setArchetypeFilter("all");
    setVariantFilter("all");
    setSizeFilter("all");
    setPage(0);
  };

  const surpriseMe = () => {
    if (!filtered.length) return;
    onApply(pickRandomPreset(filtered));
  };

  return (
    <SectionCard
      title="Presets"
      subtitle="Apply a complete checkbox snapshot, then keep editing from there."
    >
      <div className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted-text)" }}>
              Search presets
            </span>
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(0);
              }}
              placeholder="Name, family, archetype, variant, tag"
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-3">
            <FilterSelect
              label="Family"
              value={familyFilter}
              onChange={setFamilyFilter}
              options={families}
              onReset={() => setFamilyFilter("all")}
            />
            <FilterSelect
              label="Archetype"
              value={archetypeFilter}
              onChange={setArchetypeFilter}
              options={archetypes}
              onReset={() => setArchetypeFilter("all")}
            />
            <FilterSelect
              label="Variant"
              value={variantFilter}
              onChange={setVariantFilter}
              options={variants}
              onReset={() => setVariantFilter("all")}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <FilterSelect
            label="Size"
            value={sizeFilter}
            onChange={setSizeFilter}
            options={sizes}
            onReset={() => setSizeFilter("all")}
          />
          <button
            type="button"
            onClick={reset}
            className="rounded-xl border px-3 py-2 text-sm font-semibold uf-clickable"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          >
            Reset filters
          </button>
          <button
            type="button"
            onClick={surpriseMe}
            disabled={!filtered.length}
            className="rounded-xl border px-3 py-2 text-sm font-semibold uf-clickable disabled:opacity-60"
            style={{
              borderColor: "color-mix(in oklab, var(--primary) 55%, var(--border))",
              background: "color-mix(in oklab, var(--primary) 18%, transparent)",
              color: "var(--text)",
            }}
          >
            Surprise me
          </button>
          <div className="text-xs" style={{ color: "var(--muted-text)" }}>
            {resultLabel}. Presets apply a full editable state snapshot.
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 text-xs" style={{ color: "var(--muted-text)" }}>
          <span>
            Page {safePage + 1} of {pageCount}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((value) => Math.max(0, value - 1))}
              disabled={safePage === 0}
              className="rounded-lg border px-2.5 py-1.5 font-semibold uf-clickable disabled:opacity-50"
              style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => setPage((value) => Math.min(pageCount - 1, value + 1))}
              disabled={safePage >= pageCount - 1}
              className="rounded-lg border px-2.5 py-1.5 font-semibold uf-clickable disabled:opacity-50"
              style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}
            >
              Next
            </button>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          {visible.length === 0 ? (
            <div
              className="rounded-2xl border p-6 text-sm lg:col-span-2"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--card) 68%, transparent)",
                color: "var(--muted-text)",
              }}
            >
              No presets match the current filters. Adjust or reset the filters to continue.
            </div>
          ) : (
            visible.map((preset) => {
              const active = activePresetName === preset.state.downloadName;
              return (
                <article
                  key={preset.id}
                  className="rounded-2xl border p-4 transition-transform duration-200 hover:-translate-y-0.5"
                  style={{
                    borderColor: active ? "var(--primary)" : "var(--border)",
                    background: active
                      ? "color-mix(in oklab, var(--primary) 8%, var(--surface))"
                      : "color-mix(in oklab, var(--card) 72%, transparent)",
                    boxShadow: active
                      ? "0 0 0 1px color-mix(in oklab, var(--primary) 36%, transparent)"
                      : "none",
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                        {preset.name}
                      </h3>
                      <p className="text-xs leading-5" style={{ color: "var(--muted-text)" }}>
                        {preset.summary}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onApply(preset)}
                      className="rounded-xl px-3 py-2 text-xs font-semibold uf-clickable"
                      style={{
                        background: active ? "var(--primary)" : "color-mix(in oklab, var(--primary) 18%, transparent)",
                        color: active ? "#fff" : "var(--primary)",
                      }}
                    >
                      {active ? "Applied" : "Apply"}
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {preset.tags.map((tag, tagIndex) => (
                      <Chip key={`${tag}-${tagIndex}`}>{tag}</Chip>
                    ))}
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </SectionCard>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  onReset,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  onReset: () => void;
}) {
  return (
    <label className="space-y-2">
      <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted-text)" }}>
        {label}
      </span>
      <div className="flex gap-2">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 rounded-xl border px-3 py-2 text-sm outline-none uf-clickable"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in oklab, var(--surface) 70%, transparent)",
            color: "var(--text)",
          }}
        >
          <option value="all">All</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl border px-3 py-2 text-xs font-semibold uf-clickable"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface)",
            color: "var(--text)",
          }}
        >
          All
        </button>
      </div>
    </label>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-wide"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in oklab, var(--surface) 76%, transparent)",
        color: "var(--muted-text)",
      }}
    >
      {children}
    </span>
  );
}
