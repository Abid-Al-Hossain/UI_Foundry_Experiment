"use client";

import React from "react";
import { SectionCard, Segmented } from "./ui";
import SizeControl from "@/app/components/controls/input/SizeControl";

export default function RadiusSection(props: {
  linkRadius: boolean;
  setLinkRadius: (v: boolean) => void;

  radiusText: string;
  setRadiusText: (v: string) => void;

  radiusTLText: string;
  setRadiusTLText: (v: string) => void;
  radiusTRText: string;
  setRadiusTRText: (v: string) => void;
  radiusBRText: string;
  setRadiusBRText: (v: string) => void;
  radiusBLText: string;
  setRadiusBLText: (v: string) => void;

  radiusUnified: number;
  radiusTL: number;
  radiusTR: number;
  radiusBR: number;
  radiusBL: number;
}) {
  return (
    <SectionCard
      title="Corner Radius"
      subtitle="Rounding of the button corners."
    >
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => props.setLinkRadius(!props.linkRadius)}
          className="rounded-xl border px-3 py-2 text-sm font-semibold uf-clickable"
          style={{
            borderColor: "var(--border)",
            background: props.linkRadius ? "var(--primary)" : "transparent",
            color: props.linkRadius ? "white" : "var(--text)",
          }}
        >
          Link corners: {props.linkRadius ? "On" : "Off"}
        </button>

        {props.linkRadius ? (
          <>
            <SizeControl
              label="Radius (px)"
              value={Number(props.radiusText) || 0}
              onChange={(v) => props.setRadiusText(String(v))}
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
                  props.radiusText === "0"
                    ? "Square"
                    : props.radiusText === "9999"
                      ? "Pill"
                      : "Custom"
                }
                onChange={(v) => {
                  if (v === "Square") props.setRadiusText("0");
                  if (v === "Pill") props.setRadiusText("9999");
                  if (v === "Custom") props.setRadiusText("8");
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
              value={Number(props.radiusTLText) || 0}
              onChange={(v) => props.setRadiusTLText(String(v))}
              min={0}
              max={60}
              step={1}
            />
            <SizeControl
              label="Top-right"
              value={Number(props.radiusTRText) || 0}
              onChange={(v) => props.setRadiusTRText(String(v))}
              min={0}
              max={60}
              step={1}
            />
            <SizeControl
              label="Bottom-right"
              value={Number(props.radiusBRText) || 0}
              onChange={(v) => props.setRadiusBRText(String(v))}
              min={0}
              max={60}
              step={1}
            />
            <SizeControl
              label="Bottom-left"
              value={Number(props.radiusBLText) || 0}
              onChange={(v) => props.setRadiusBLText(String(v))}
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
