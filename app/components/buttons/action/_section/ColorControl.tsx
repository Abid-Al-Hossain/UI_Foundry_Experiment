"use client";

import React from "react";

/** Color control (palette + custom input + picker + rgb display) — exact styling as your page.tsx */
export default function ColorControl(props: {
  title: string;
  palette: readonly string[];
  valueText: string;
  setValueText: (v: string) => void;
  normalizedHex: string;
  normalizedRgb: string;
  ok: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium" style={{ color: "var(--text)" }}>
          {props.title}
        </label>
        <input
          type="color"
          value={props.normalizedHex}
          onChange={(e) => props.setValueText(e.target.value)}
          className="h-9 w-12 rounded-lg border uf-clickable"
          style={{ borderColor: "var(--border)", cursor: "pointer" }}
          aria-label={`Pick ${props.title} color`}
        />
      </div>

      <div className="mt-2 grid grid-cols-8 gap-2">
        {props.palette.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => props.setValueText(c)}
            className="h-7 w-7 rounded-lg border transition uf-clickable"
            style={{ background: c, borderColor: "var(--border)", cursor: "pointer" }}
            title={c}
          />
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <input
          value={props.valueText}
          onChange={(e) => props.setValueText(e.target.value)}
          placeholder="#RRGGBB or rgb(r,g,b) or r,g,b"
          className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in oklab, var(--surface) 70%, transparent)",
            color: "var(--text)",
          }}
        />
        <div
          className="rounded-xl border px-3 py-2 text-sm"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in oklab, var(--surface) 70%, transparent)",
            color: "var(--muted)",
          }}
        >
          {props.ok ? props.normalizedRgb : "invalid"}
        </div>
      </div>
    </div>
  );
}
