"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionCard, LabeledField, FilterSelect } from "@/app/components/controls/ui";
import { SYSTEM_FONTS } from "../types";
import { TYPOGRAPHY_PRESETS, TYPOGRAPHY_PRESET_COUNT, type TypographyPreset } from "../_data/typographyPresets";
import type { TypographyState } from "../types";
import Input from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";

type Props = {
  state: TypographyState;
  activePresetId: string | null;
  applyPreset: (preset: TypographyPreset) => void;
};

const PAGE_SIZE = 24;

function pickRandomPreset<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function resolveFontFamily(state: TypographyState) {
  return state.fontBucket === "google"
    ? `"${state.googleFontFamily}", sans-serif`
    : SYSTEM_FONTS[state.systemFontIdx]?.css || "system-ui, sans-serif";
}

function previewText(state: TypographyState) {
  return state.fontBucket === "google"
    ? "The quick brown fox jumps over the lazy dog."
    : "A sharp, production-ready type system.";
}

export default function PresetsSection({ state, activePresetId, applyPreset }: Props) {
  const [query, setQuery] = useState("");
  const [bucketFilter, setBucketFilter] = useState("all");
  const [familyFilter, setFamilyFilter] = useState("all");
  const [variantFilter, setVariantFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [pageDirection, setPageDirection] = useState(0);

  const bucketOptions = Array.from(new Set(TYPOGRAPHY_PRESETS.map((preset) => preset.state.fontBucket).filter(Boolean))) as NonNullable<TypographyState["fontBucket"]>[];
  const familyOptions = Array.from(new Set(TYPOGRAPHY_PRESETS.map((preset) => preset.family)));
  const variantOptions = Array.from(new Set(TYPOGRAPHY_PRESETS.map((preset) => preset.variant)));
  const sizeOptions = Array.from(new Set(TYPOGRAPHY_PRESETS.map((preset) => preset.size)));
  const search = query.trim().toLowerCase();

  const filtered = useMemo(
    () =>
      TYPOGRAPHY_PRESETS.filter((preset) => {
        if (bucketFilter !== "all" && preset.state.fontBucket !== bucketFilter) return false;
        if (familyFilter !== "all" && preset.family !== familyFilter) return false;
        if (variantFilter !== "all" && preset.variant !== variantFilter) return false;
        if (sizeFilter !== "all" && preset.size !== sizeFilter) return false;
        if (!search) return true;
        const haystack = [preset.name, preset.description, preset.family, preset.archetype, preset.variant, preset.size, ...preset.tags]
          .join(" ")
          .toLowerCase();
        return haystack.includes(search);
      }),
    [bucketFilter, familyFilter, variantFilter, search, sizeFilter],
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const visible = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);
  const pageKey = [safePage, search, bucketFilter, familyFilter, variantFilter, sizeFilter].join(":");
  const resultLabel = `${filtered.length} ${filtered.length === 1 ? "match" : "matches"}`;

  const resetFilters = () => {
    setQuery("");
    setBucketFilter("all");
    setFamilyFilter("all");
    setVariantFilter("all");
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
      subtitle={`${TYPOGRAPHY_PRESET_COUNT} editable starting points built from the typography system.`}
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

          <LabeledField label="Font Bucket">
            <FilterSelect
              value={bucketFilter}
              onChange={(value) => {
                setBucketFilter(value);
                setPage(0);
                setPageDirection(0);
              }}
              items={[
                { value: "all", label: "All" },
                ...bucketOptions.map((value) => ({ value, label: value })),
              ]}
            />
          </LabeledField>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
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

          <LabeledField label="Variant">
            <Select
              options={[]}
              value={variantFilter}
              onNativeChange={(event) => {
                setVariantFilter(event.target.value);
                setPage(0);
                setPageDirection(0);
              }}
            >
              <option value="all">All variants</option>
              {variantOptions.map((variant) => (
                <option key={variant} value={variant}>
                  {variant}
                </option>
              ))}
            </Select>
          </LabeledField>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
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

                      <div className="mt-4 rounded-xl border p-4" style={{ borderColor: "var(--border)", background: previewState.previewBgColor, color: previewState.previewTextColor, fontFamily: resolveFontFamily(previewState) }}>
                        <div className="flex items-center justify-between gap-2 text-[11px]" style={{ color: previewState.previewTextColor }}>
                          <span>{preset.family}</span>
                          <span>{preset.variant}</span>
                          <span>{preset.size}</span>
                          <span>{previewState.scaleRatio}</span>
                        </div>
                        <div className="mt-3 text-2xl font-bold" style={{
                          color: previewState.defaultTextColor,
                          textShadow: previewState.textShadowEnabled
                            ? `${previewState.textShadowX}px ${previewState.textShadowY}px ${previewState.textShadowBlur}px ${previewState.textShadowColor}`
                            : "none",
                          textTransform: previewState.textTransform,
                          textDecoration: previewState.textDecoration,
                          letterSpacing: `${previewState.defaultLetterSpacing}${previewState.defaultLetterSpacingUnit}`,
                          lineHeight: previewState.defaultLineHeight,
                        }}>
                          Aa Bb Cc
                        </div>
                        <p
                          className="mt-2 text-sm"
                          style={{
                            color: previewState.previewTextColor,
                            lineHeight: previewState.defaultLineHeight,
                            direction: previewState.direction,
                            textAlign: previewState.textAlign,
                          }}
                        >
                          {previewText(previewState)}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {preset.tags.slice(0, 4).map((tag, tagIndex) => (
                            <BadgeChip key={`${tag}-${tagIndex}`} label={tag} />
                          ))}
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

function BadgeChip({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-wide"
      style={{
        borderColor: "var(--border)",
        color: "var(--muted)",
        background: "color-mix(in oklab, var(--surface) 90%, transparent)",
      }}
    >
      {label}
    </span>
  );
}
