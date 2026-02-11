"use client";

import React from "react";
import { SectionCard, Segmented } from "./ui";
import SizeControl from "@/app/components/controls/input/SizeControl";

import { ActionButtonState } from "@/app/components/buttons/action/types";

export default function RadiusSection({
  state,
  setKey,
}: {
  state: ActionButtonState;
  setKey: (key: keyof ActionButtonState) => (val: any) => void;
}) {
  return (
    <SectionCard
      title="Corner Radius"
      subtitle="Rounding of the button corners."
    >
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setKey("linkRadius")(!state.linkRadius)}
          className="rounded-xl border px-3 py-2 text-sm font-semibold uf-clickable"
          style={{
            borderColor: "var(--border)",
            background: state.linkRadius ? "var(--primary)" : "transparent",
            color: state.linkRadius ? "white" : "var(--text)",
          }}
        >
          Link corners: {state.linkRadius ? "On" : "Off"}
        </button>

        {state.linkRadius ? (
          <>
            <SizeControl
              label="Radius (px)"
              value={Number(state.radiusText) || 0}
              onChange={(v) => setKey("radiusText")(String(v))}
              min={0}
              max={60}
              step={1}
            />
            <div className="space-y-2">
              <div
                className="text-sm font-medium"
                style={{ color: "var(--text)" }}
              >
                Presets
              </div>
              <Segmented
                value={
                  state.radiusText === "0"
                    ? "Square"
                    : state.radiusText === "9999"
                      ? "Pill"
                      : "Custom"
                }
                onChange={(v) => {
                  if (v === "Square") setKey("radiusText")("0");
                  if (v === "Pill") setKey("radiusText")("9999");
                  if (v === "Custom") setKey("radiusText")("8");
                }}
                items={[
                  { value: "Square", label: "Square" },
                  { value: "Pill", label: "Pill" },
                  { value: "Custom", label: "Custom" },
                ]}
              />
            </div>
          </>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            <SizeControl
              label="Top-left"
              value={Number(state.radiusTLText) || 0}
              onChange={(v) => setKey("radiusTLText")(String(v))}
              min={0}
              max={60}
              step={1}
            />
            <SizeControl
              label="Top-right"
              value={Number(state.radiusTRText) || 0}
              onChange={(v) => setKey("radiusTRText")(String(v))}
              min={0}
              max={60}
              step={1}
            />
            <SizeControl
              label="Bottom-right"
              value={Number(state.radiusBRText) || 0}
              onChange={(v) => setKey("radiusBRText")(String(v))}
              min={0}
              max={60}
              step={1}
            />
            <SizeControl
              label="Bottom-left"
              value={Number(state.radiusBLText) || 0}
              onChange={(v) => setKey("radiusBLText")(String(v))}
              min={0}
              max={60}
              step={1}
            />
          </div>
        )}
      </div>
    </SectionCard>
  );
}
