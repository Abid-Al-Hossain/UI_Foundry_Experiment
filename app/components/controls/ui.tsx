"use client";

import React from "react";
import Select, { type SelectOption } from "./input/Select";

export { SectionCard } from "./layout/SectionCard";

export { LabeledField } from "./layout/LabeledField";

import { SegmentedControl } from "./input/SegmentedControl";
export { SegmentedControl as Segmented };

/**
 * FilterSelect — same prop shape as `Segmented` (value / onChange(value) /
 * items|options) but renders a compact native dropdown styled like the studio's
 * other selects. Use this for preset FILTERS with several options: a segmented
 * control with many options collapses to a tall one-per-row stack in the narrow
 * filter grid, whereas a dropdown stays compact and consistent.
 */
export function FilterSelect(props: {
  value: string;
  onChange: (value: string) => void;
  items?: { value: string; label: string }[];
  options?: ({ value: string; label: string } | string)[];
  label?: string;
  onReset?: () => void;
  id?: string;
  "aria-label"?: string;
}) {
  const source = props.items ?? props.options ?? [];
  const options: SelectOption[] = source.map((option) =>
    typeof option === "string" ? { value: option, label: option } : option,
  );
  if (!options.some((option) => option.value === "all")) {
    options.unshift({ value: "all", label: "All" });
  }
  const select = (
    <Select
      id={props.id}
      aria-label={props["aria-label"] ?? props.label}
      value={props.value}
      onChange={props.onChange}
      options={options}
    />
  );
  if (!props.label && !props.onReset) return select;

  return (
    <label className="grid gap-2 text-sm font-medium" style={{ color: "var(--text)" }}>
      {props.label ? <span>{props.label}</span> : null}
      <div className="flex items-end gap-2">
        {select}
        {props.onReset ? (
          <button
            type="button"
            onClick={props.onReset}
            className="h-9 rounded-xl border px-3 text-xs font-semibold uf-clickable"
            style={{
              borderColor: "var(--border)",
              background: "var(--surface)",
              color: "var(--text)",
            }}
          >
            All
          </button>
        ) : null}
      </div>
    </label>
  );
}

export function ExportWarningBadge({
  label = "React Export Only",
}: {
  label?: string;
}) {
  return (
    <span
      className="ml-2 inline-flex items-center rounded-sm px-1.5 py-0.5 text-[10px] font-medium"
      style={{
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        color: "#fbbf24",
        border: "1px solid rgba(245, 158, 11, 0.2)",
      }}
      title="This feature requires Javascript/React and will not work in pure HTML/CSS export."
    >
      {label}
    </span>
  );
}
