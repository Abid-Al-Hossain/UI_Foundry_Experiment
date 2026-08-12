"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionCard, LabeledField, FilterSelect } from "@/app/components/controls/ui";
import { BADGE_PRESETS, BADGE_PRESET_COUNT, type BadgePreset } from "../_data/badgePresets";
import type { BadgeState, BadgeVariant } from "../types";
import Input from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";

type Props = {
  state: BadgeState;
  activePresetId: string | null;
  applyPreset: (preset: BadgePreset) => void;
};

const PAGE_SIZE = 24;

function pickRandomPreset<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function presetIconGlyph(iconName: string) {
  switch (iconName) {
    case "alert":
      return "!";
    case "check":
      return "V";
    case "heart":
      return "<3";
    case "shield":
      return "S";
    case "zap":
      return "Z";
    case "bell":
      return "B";
    default:
      return "*";
  }
}

function badgeShapeRadius(shape: BadgeState["shape"], borderRadius: number) {
  if (shape === "pill") return "9999px";
  if (shape === "circle") return "9999px";
  if (shape === "square") return "6px";
  return `${borderRadius}px`;
}

function getIconPreviewSize(fontSize: number, iconSize: number) {
  return Math.max(12, Math.round((fontSize * iconSize) / 100));
}

function renderPreviewContent(state: BadgeState) {
  const iconSizePx = getIconPreviewSize(state.fontSize, state.iconSize);

  return (
    <div
      className="inline-flex items-center justify-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold"
      style={{
        borderRadius: badgeShapeRadius(state.shape, state.borderRadius),
        background:
          state.variant === "outline"
            ? "transparent"
            : state.variant === "soft"
              ? `${state.color}20`
              : state.variant === "ghost"
                ? "transparent"
                : state.variant === "glass"
                  ? `${state.color}40`
                  : state.variant === "neumorphic"
                    ? "#e0e5ec"
                    : state.gradientEnabled
                      ? `linear-gradient(${state.gradientAngle}deg, ${state.gradientStart}, ${state.gradientEnd})`
                      : state.color,
        border:
          state.variant === "outline"
            ? `${state.borderWidth}px solid ${state.color}`
            : state.variant === "glass"
              ? "1px solid rgba(255,255,255,0.3)"
              : `${state.borderWidth}px solid ${state.color}`,
        boxShadow: state.dropShadow
          ? `0 4px ${state.shadowBlur}px ${state.shadowColor}`
          : "none",
        color:
          state.variant === "solid" || state.variant === "neumorphic"
            ? state.textColor
            : state.color,
        fontFamily: "Inter, sans-serif",
      }}
    >
      {state.showDot && (
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{
            background: state.dotColor,
            boxShadow: state.dotPulse ? `0 0 0 3px ${state.dotColor}40` : "none",
          }}
        />
      )}
      {state.showIcon && state.iconPosition !== "only" && (
        <span style={{ fontSize: `${iconSizePx}px`, lineHeight: 1 }}>
          {presetIconGlyph(state.iconName)}
        </span>
      )}
      {state.iconPosition !== "only" && <span>{state.label}</span>}
      {state.count && state.iconPosition !== "only" && <span>{state.count}</span>}
      {state.showIcon && state.iconPosition === "only" && (
        <span style={{ fontSize: `${iconSizePx}px`, lineHeight: 1 }}>
          {presetIconGlyph(state.iconName)}
        </span>
      )}
      {state.dismissible && <span aria-hidden="true">x</span>}
    </div>
  );
}

export default function PresetsSection({ state, activePresetId, applyPreset }: Props) {
  const [query, setQuery] = useState("");
  const [variantFilter, setVariantFilter] = useState("all");
  const [familyFilter, setFamilyFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [pageDirection, setPageDirection] = useState(0);

  const variantOptions = Array.from(new Set(BADGE_PRESETS.map((preset) => preset.state.variant).filter(Boolean))) as BadgeVariant[];
  const familyOptions = Array.from(new Set(BADGE_PRESETS.map((preset) => preset.family)));
  const sizeOptions = Array.from(new Set(BADGE_PRESETS.map((preset) => preset.size)));
  const search = query.trim().toLowerCase();

  const filtered = useMemo(
    () =>
      BADGE_PRESETS.filter((preset) => {
        if (variantFilter !== "all" && preset.state.variant !== variantFilter) return false;
        if (familyFilter !== "all" && preset.family !== familyFilter) return false;
        if (sizeFilter !== "all" && preset.size !== sizeFilter) return false;
        if (!search) return true;
        const haystack = [preset.name, preset.description, preset.family, preset.archetype, preset.size, ...preset.tags]
          .join(" ")
          .toLowerCase();
        return haystack.includes(search);
      }),
    [familyFilter, search, sizeFilter, variantFilter],
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const visible = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);
  const pageKey = [safePage, search, variantFilter, familyFilter, sizeFilter].join(":");
  const resultLabel = `${filtered.length} ${filtered.length === 1 ? "match" : "matches"}`;

  const resetFilters = () => {
    setQuery("");
    setVariantFilter("all");
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
      subtitle={`${BADGE_PRESET_COUNT} editable starting points built from the badge system.`}
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
                        </div>
                        <div className="mt-3 flex justify-center">{renderPreviewContent(previewState)}</div>
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
