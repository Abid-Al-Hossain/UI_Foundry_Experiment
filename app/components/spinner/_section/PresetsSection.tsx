"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionCard, LabeledField, FilterSelect } from "@/app/components/controls/ui";
import { SPINNER_PRESETS, SPINNER_PRESET_COUNT, type SpinnerPreset } from "../_data/spinnerPresets";
import type { SpinnerState } from "../types";
import { SpinnerPreview } from "../_components/SpinnerPreview";
import Input from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";

type Props = {
  state: SpinnerState;
  activePresetId: string | null;
  applyPreset: (preset: SpinnerPreset) => void;
};

const PAGE_SIZE = 24;

function pickRandomPreset<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export default function PresetsSection({ state, activePresetId, applyPreset }: Props) {
  const [query, setQuery] = useState("");
  const [variantFilter, setVariantFilter] = useState("all");
  const [modeFilter, setModeFilter] = useState("all");
  const [familyFilter, setFamilyFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [pageDirection, setPageDirection] = useState(0);

  const variantOptions = Array.from(new Set(SPINNER_PRESETS.map((preset) => preset.state.variant).filter(Boolean))) as NonNullable<SpinnerState["variant"]>[];
  const modeOptions = Array.from(new Set(SPINNER_PRESETS.map((preset) => preset.state.colorMode).filter(Boolean))) as NonNullable<SpinnerState["colorMode"]>[];
  const familyOptions = Array.from(new Set(SPINNER_PRESETS.map((preset) => preset.family)));
  const sizeOptions = Array.from(new Set(SPINNER_PRESETS.map((preset) => preset.size)));
  const search = query.trim().toLowerCase();

  const filtered = useMemo(
    () =>
      SPINNER_PRESETS.filter((preset) => {
        if (variantFilter !== "all" && preset.state.variant !== variantFilter) return false;
        if (modeFilter !== "all" && preset.state.colorMode !== modeFilter) return false;
        if (familyFilter !== "all" && preset.family !== familyFilter) return false;
        if (sizeFilter !== "all" && preset.size !== sizeFilter) return false;
        if (!search) return true;
        const haystack = [preset.name, preset.description, preset.family, preset.archetype, preset.size, ...preset.tags]
          .join(" ")
          .toLowerCase();
        return haystack.includes(search);
      }),
    [familyFilter, modeFilter, search, sizeFilter, variantFilter],
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const visible = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);
  const pageKey = [safePage, search, variantFilter, modeFilter, familyFilter, sizeFilter].join(":");
  const resultLabel = `${filtered.length} ${filtered.length === 1 ? "match" : "matches"}`;

  const resetFilters = () => {
    setQuery("");
    setVariantFilter("all");
    setModeFilter("all");
    setFamilyFilter("all");
    setSizeFilter("all");
    setPage(0);
    setPageDirection(0);
  };

  const applyRandomPreset = () => {
    if (!filtered.length) return;
    applyPreset(pickRandomPreset(filtered));
  };

  const goToPage = (targetPage: number) => {
    if (targetPage === safePage) return;
    setPageDirection(targetPage > safePage ? 1 : -1);
    setPage(targetPage);
  };

  return (
    <SectionCard
      title="Presets"
      subtitle={`${SPINNER_PRESET_COUNT} editable starting points built from the spinner system.`}
    >
      <div className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <LabeledField label="Search presets" hint={resultLabel}>
            <Input
              value={query}
              onNativeChange={(event) => {
                setQuery(event.target.value);
                setPage(0);
                setPageDirection(0);
              }}
              placeholder="Search by name, family, archetype, or tag"
             />
          </LabeledField>

          <LabeledField label="Variant">
            <FilterSelect
              value={variantFilter}
              onChange={(value) => {
                setVariantFilter(value);
                setPage(0);
                setPageDirection(0);
              }}
              items={[
                { value: "all", label: "All" },
                ...variantOptions.map((value) => ({ value, label: value })),
              ]}
            />
          </LabeledField>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <LabeledField label="Color Mode">
            <FilterSelect
              value={modeFilter}
              onChange={(value) => {
                setModeFilter(value);
                setPage(0);
                setPageDirection(0);
              }}
              items={[
                { value: "all", label: "All" },
                ...modeOptions.map((value) => ({ value, label: value })),
              ]}
            />
          </LabeledField>

          <LabeledField label="Family">
            <Select
              options={[]}
              value={familyFilter}
              onNativeChange={(event) => {
                setFamilyFilter(event.target.value);
                setPage(0);
                setPageDirection(0);
              }}
            >
              <option value="all">All families</option>
              {familyOptions.map((family) => (
                <option key={family} value={family}>
                  {family}
                </option>
              ))}
            </Select>
          </LabeledField>

          <LabeledField label="Size">
            <Select
              options={[]}
              value={sizeFilter}
              onNativeChange={(event) => {
                setSizeFilter(event.target.value);
                setPage(0);
                setPageDirection(0);
              }}
            >
              <option value="all">All sizes</option>
              {sizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </Select>
          </LabeledField>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={resetFilters}
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
            onClick={applyRandomPreset}
            disabled={!filtered.length}
            className="rounded-xl border px-3 py-2 text-sm font-semibold uf-clickable"
            style={{
              borderColor: "color-mix(in oklab, var(--primary) 55%, var(--border))",
              background: "color-mix(in oklab, var(--primary) 18%, transparent)",
              color: "var(--text)",
            }}
          >
            Surprise me
          </button>

          <div className="text-xs" style={{ color: "var(--muted)" }}>
            Presets apply a full editable state snapshot. You can keep tweaking from any section after applying one.
          </div>
        </div>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false} custom={pageDirection}>
            <motion.div
              key={pageKey}
              custom={pageDirection}
              initial={{ opacity: 0, x: pageDirection > 0 ? 24 : pageDirection < 0 ? -24 : 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: pageDirection > 0 ? -24 : pageDirection < 0 ? 24 : 0 }}
              transition={{ x: { type: "spring", stiffness: 320, damping: 34, mass: 0.9 }, opacity: { duration: 0.14, ease: "linear" } }}
              className="grid gap-3 lg:grid-cols-2"
              style={{ willChange: "transform, opacity" }}
            >
              {visible.length === 0 ? (
                <div
                  className="rounded-2xl border p-6 text-sm lg:col-span-2"
                  style={{
                    borderColor: "var(--border)",
                    background: "color-mix(in oklab, var(--card) 68%, transparent)",
                    color: "var(--muted)",
                  }}
                >
                  No presets match the current filters. Adjust or reset the filters to continue.
                </div>
              ) : (
                visible.map((preset, index) => {
                  const previewState = { ...state, ...preset.state };
                  const isApplied = activePresetId === preset.id;
                  return (
                    <motion.div
                      key={preset.id}
                      initial={{ opacity: 0, x: pageDirection > 0 ? 24 : pageDirection < 0 ? -24 : 0 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        x: { type: "spring", stiffness: 340, damping: 32, mass: 0.9 },
                        opacity: { duration: 0.18, delay: Math.min(index, 7) * 0.015, ease: "linear" },
                      }}
                      className="rounded-2xl border p-3"
                      data-audit="preset-card"
                      data-preset-id={preset.id}
                      data-applied={isApplied ? "true" : "false"}
                      style={{
                        borderColor: isApplied ? "var(--primary)" : "var(--border)",
                        background: isApplied
                          ? "color-mix(in oklab, var(--primary) 20%, transparent)"
                          : "color-mix(in oklab, var(--card) 70%, transparent)",
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                            {preset.name}
                          </div>
                          <div className="text-xs" style={{ color: "var(--muted)" }}>
                            {preset.description}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => applyPreset(preset)}
                          aria-pressed={isApplied}
                          className="rounded-xl px-3 py-1.5 text-xs font-semibold uf-clickable"
                          style={{ background: "var(--primary)", color: "#ffffff" }}
                        >
                          {isApplied ? "Applied" : "Apply"}
                        </button>
                      </div>

                      <div className="mt-4 rounded-xl border p-4" style={{ borderColor: "var(--border)", background: "color-mix(in oklab, var(--surface) 78%, transparent)" }}>
                        <div className="flex items-center justify-between gap-2 text-[11px]" style={{ color: "var(--muted)" }}>
                          <span>{preset.family}</span>
                          <span>{preset.size}</span>
                          <span>{preset.state.variant}</span>
                          <span>{preset.state.colorMode}</span>
                        </div>
                        <div className="mt-3 flex items-center justify-center rounded-lg px-3 py-4 text-sm" style={{ background: "color-mix(in oklab, var(--bg) 60%, transparent)", color: "var(--text)" }}>
                          <span className="font-semibold">{previewState.label}</span>
                          {previewState.labels?.length ? (
                            <span className="ml-2 text-xs" style={{ color: "var(--muted)" }}>
                              +{previewState.labels.length} label{previewState.labels.length === 1 ? "" : "s"}
                            </span>
                          ) : null}
                        </div>
                        <div className="mt-3 flex justify-center">
                          <SpinnerPreview state={previewState} />
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]" style={{ color: "var(--muted)" }}>
                          <span>Size {previewState.size}px</span>
                          <span>Speed {previewState.speed}ms</span>
                          <span>Glow {previewState.glowIntensity}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {pageCount > 1 ? (
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => goToPage(Math.max(0, safePage - 1))}
              disabled={safePage === 0}
              className="rounded-xl border px-3 py-2 text-sm font-semibold uf-clickable disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--surface) 72%, transparent)",
                color: "var(--text)",
              }}
            >
              Previous
            </button>

            <div className="text-xs" style={{ color: "var(--muted)" }}>
              Page {safePage + 1} of {pageCount}
            </div>

            <button
              type="button"
              onClick={() => goToPage(Math.min(pageCount - 1, safePage + 1))}
              disabled={safePage >= pageCount - 1}
              className="rounded-xl border px-3 py-2 text-sm font-semibold uf-clickable disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--surface) 72%, transparent)",
                color: "var(--text)",
              }}
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
    </SectionCard>
  );
}
