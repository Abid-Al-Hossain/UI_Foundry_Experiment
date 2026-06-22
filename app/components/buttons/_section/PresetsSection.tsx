"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { type ButtonPreset, BUTTON_PRESET_COUNT } from "../_data/buttonPresets";
import PresetButtonPreview from "./PresetButtonPreview";
import { LabeledField, SectionCard, FilterSelect } from "./ui";

const PAGE_SIZE = 24;

function pickRandomPreset<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function Badge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full border px-2 py-1 text-[11px] font-medium"
      style={{
        borderColor: "color-mix(in oklab, var(--border) 85%, transparent)",
        background: "color-mix(in oklab, var(--surface) 78%, transparent)",
        color: "var(--muted)",
      }}
    >
      {label}
    </span>
  );
}

export default function PresetsSection({
  presets,
  onApplyPreset,
}: {
  presets: ButtonPreset[];
  onApplyPreset: (preset: ButtonPreset) => void;
}) {
  const pageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : direction < 0 ? "-100%" : 0,
      opacity: direction === 0 ? 0 : 1,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : direction < 0 ? "100%" : 0,
      opacity: direction === 0 ? 0 : 1,
    }),
  };

  const [query, setQuery] = useState("");
  const [variantFilter, setVariantFilter] = useState("all");
  const [familyFilter, setFamilyFilter] = useState("all");
  const [moodFilter, setMoodFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [pageDirection, setPageDirection] = useState(0);

  const families = Array.from(new Set(presets.map((preset) => preset.family)));
  const moods = Array.from(new Set(presets.map((preset) => preset.mood)));
  const sizes = Array.from(new Set(presets.map((preset) => preset.size)));
  const search = query.trim().toLowerCase();

  const filtered = presets.filter((preset) => {
    if (variantFilter !== "all" && preset.variant !== variantFilter) return false;
    if (familyFilter !== "all" && preset.family !== familyFilter) return false;
    if (moodFilter !== "all" && preset.mood !== moodFilter) return false;
    if (sizeFilter !== "all" && preset.size !== sizeFilter) return false;
    if (!search) return true;

    const haystack = [preset.name, preset.summary, ...preset.tags].join(" ").toLowerCase();
    return haystack.includes(search);
  });
  const resultLabel = `${filtered.length} ${filtered.length === 1 ? "match" : "matches"}`;

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const visible = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);
  const pageKey = [
    safePage,
    query.trim().toLowerCase(),
    variantFilter,
    familyFilter,
    moodFilter,
    sizeFilter,
  ].join(":");

  const resetFilters = () => {
    setPageDirection(0);
    setQuery("");
    setVariantFilter("all");
    setFamilyFilter("all");
    setMoodFilter("all");
    setSizeFilter("all");
    setPage(0);
  };

  const applyRandomPreset = () => {
    if (!filtered.length) return;
    const next = pickRandomPreset(filtered);
    onApplyPreset(next);
  };

  const goToPage = (targetPage: number) => {
    if (targetPage === safePage) return;
    setPageDirection(targetPage > safePage ? 1 : -1);
    setPage(targetPage);
  };

  return (
    <SectionCard
      title="Presets"
      subtitle={`${BUTTON_PRESET_COUNT} editable starting points built from the current button system.`}
    >
      <div className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <LabeledField label="Search presets" hint={resultLabel}>
            <input
              value={query}
              onChange={(event) => {
                setPageDirection(0);
                setQuery(event.target.value);
                setPage(0);
              }}
              placeholder="Search by name, family, mood, or tag"
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            />
          </LabeledField>

          <LabeledField label="Variant">
            <FilterSelect
              value={variantFilter}
              onChange={(value) => {
                setPageDirection(0);
                setVariantFilter(value);
                setPage(0);
              }}
              items={[
                { value: "all", label: "All" },
                { value: "solid", label: "Solid" },
                { value: "outline", label: "Outline" },
                { value: "ghost", label: "Ghost" },
              ]}
            />
          </LabeledField>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <LabeledField label="Family">
            <select
              value={familyFilter}
              onChange={(event) => {
                setPageDirection(0);
                setFamilyFilter(event.target.value);
                setPage(0);
              }}
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none uf-clickable"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            >
              <option value="all">All families</option>
              {families.map((family) => (
                <option key={family} value={family}>
                  {family}
                </option>
              ))}
            </select>
          </LabeledField>

          <LabeledField label="Mood">
            <select
              value={moodFilter}
              onChange={(event) => {
                setPageDirection(0);
                setMoodFilter(event.target.value);
                setPage(0);
              }}
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none uf-clickable"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            >
              <option value="all">All moods</option>
              {moods.map((mood) => (
                <option key={mood} value={mood}>
                  {mood}
                </option>
              ))}
            </select>
          </LabeledField>

          <LabeledField label="Size">
            <select
              value={sizeFilter}
              onChange={(event) => {
                setPageDirection(0);
                setSizeFilter(event.target.value);
                setPage(0);
              }}
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none uf-clickable"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            >
              <option value="all">All sizes</option>
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
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
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: {
                  type: "spring",
                  stiffness: 320,
                  damping: 34,
                  mass: 0.9,
                },
                opacity: {
                  duration: 0.14,
                  ease: "linear",
                },
              }}
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
              ) : visible.map((preset, index) => (
              <motion.div
                key={preset.id}
                initial={{
                  opacity: 0,
                  x: pageDirection > 0 ? 24 : pageDirection < 0 ? -24 : 0,
                  y: 0,
                }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  x: {
                    type: "spring",
                    stiffness: 340,
                    damping: 32,
                    mass: 0.9,
                  },
                  opacity: {
                    duration: 0.18,
                    delay: Math.min(index, 7) * 0.015,
                    ease: "linear",
                  },
                }}
                className="rounded-2xl border p-3"
                data-audit="preset-card"
                data-preset-id={preset.id}
                data-testid={`preset-card-${preset.id}`}
                style={{
                  borderColor: "var(--border)",
                  background: "color-mix(in oklab, var(--card) 68%, transparent)",
                }}
              >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                        {preset.name}
                      </div>
                      <div className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
                        {preset.summary}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onApplyPreset(preset)}
                      className="rounded-xl px-3 py-2 text-xs font-semibold uf-clickable"
                      data-audit="preset-apply-button"
                      data-preset-id={preset.id}
                      data-testid={`preset-apply-${preset.id}`}
                      style={{
                        background: "var(--primary)",
                        color: "#ffffff",
                      }}
                    >
                      Apply
                    </button>
                  </div>
                  <PresetButtonPreview preset={preset} />

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge label={preset.family} />
                    <Badge label={preset.mood} />
                    <Badge label={preset.variant} />
                    <Badge label={preset.size} />
                    {preset.state.animation !== "none" ? <Badge label={preset.state.animation} /> : null}
                    {preset.state.textAnimation !== "none" ? (
                      <Badge label={preset.state.textAnimation} />
                    ) : null}
                    {preset.state.depthAnimation !== "none" ? (
                      <Badge label={preset.state.depthAnimation} />
                    ) : null}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs" style={{ color: "var(--muted)" }}>
            Page {safePage + 1} of {pageCount}
          </div>

          <div className="inline-flex items-center gap-2">
            <button
              type="button"
              disabled={safePage === 0}
              onClick={() => goToPage(Math.max(0, safePage - 1))}
              className="rounded-xl border px-3 py-2 text-sm font-semibold uf-clickable disabled:opacity-50"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            >
              Previous
            </button>

            <button
              type="button"
              disabled={safePage >= pageCount - 1}
              onClick={() => goToPage(Math.min(pageCount - 1, safePage + 1))}
              className="rounded-xl border px-3 py-2 text-sm font-semibold uf-clickable disabled:opacity-50"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
