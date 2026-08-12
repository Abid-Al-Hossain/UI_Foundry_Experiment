"use client";

import React from "react";
import { LabeledField, SectionCard, Segmented } from "./ui";
import SizeControl from "@/app/components/controls/input/SizeControl";
import Input from "@/app/components/controls/input/Input";

export type MinTouchMode = "off" | "warn" | "enforce";

export default function AccessibilitySection(props: {
  ariaLabel: string;
  setAriaLabel: (v: string) => void;
  ariaPressedMode: "off" | "true" | "false";
  setAriaPressedMode: (v: "off" | "true" | "false") => void;
  ariaBusyMode: "off" | "auto" | "true" | "false";
  setAriaBusyMode: (v: "off" | "auto" | "true" | "false") => void;

  minTouchMode: MinTouchMode;
  setMinTouchMode: (v: MinTouchMode) => void;

  minTouchSizeText: string;
  setMinTouchSizeText: (v: string) => void;
  minTouchSizePx: number;
  minTouchWarning: boolean;

  contrastRatioText: string;
  contrastOk: boolean;
  contrastNote: string;
}) {
  return (
    <SectionCard
      title="Accessibility"
      subtitle="Touch size, contrast hints, and aria label."
    >
      <div className="space-y-4">
        <div className="text-xs" style={{ color: "var(--muted)" }}>
          Tip: Aria labels are best for icon-only buttons. Aria-busy auto
          follows Loading.
        </div>
        <LabeledField label="Aria label">
          <Input
            value={props.ariaLabel}
            onNativeChange={(e) => props.setAriaLabel(e.target.value)}
            placeholder="Optional (for icon-only buttons)"
           />
        </LabeledField>

        <LabeledField label="Aria pressed">
          <Segmented
            value={props.ariaPressedMode}
            onChange={(v) =>
              props.setAriaPressedMode(v as "off" | "true" | "false")
            }
            items={[
              { value: "off", label: "Off" },
              { value: "true", label: "True" },
              { value: "false", label: "False" },
            ]}
          />
        </LabeledField>

        <LabeledField label="Aria busy">
          <Segmented
            value={props.ariaBusyMode}
            onChange={(v) =>
              props.setAriaBusyMode(v as "off" | "auto" | "true" | "false")
            }
            items={[
              { value: "off", label: "Off" },
              { value: "auto", label: "Auto" },
              { value: "true", label: "True" },
              { value: "false", label: "False" },
            ]}
          />
        </LabeledField>

        <div className="space-y-2">
          <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
            Min touch size
          </div>
          <Segmented
            value={props.minTouchMode}
            onChange={(v) => props.setMinTouchMode(v as MinTouchMode)}
            items={[
              { value: "off", label: "Off" },
              { value: "warn", label: "Warn" },
              { value: "enforce", label: "Enforce" },
            ]}
          />
          <SizeControl
            label={`Minimum size (${props.minTouchSizePx}px)`}
            value={Number(props.minTouchSizeText) || 24}
            onChange={(v) => props.setMinTouchSizeText(String(v))}
            min={24}
            max={80}
            step={1}
          />
          {props.minTouchMode !== "off" ? (
            <div
              className="text-xs"
              style={{
                color: props.minTouchWarning ? "#ef4444" : "var(--muted)",
              }}
            >
              {props.minTouchWarning
                ? "Warning: button is below the minimum touch size."
                : "Touch size meets the minimum."}
            </div>
          ) : null}
        </div>

        <div
          className="space-y-1 text-xs"
          style={{ color: props.contrastOk ? "var(--muted)" : "#ef4444" }}
        >
          <div>Contrast: {props.contrastRatioText}</div>
          <div>{props.contrastNote}</div>
        </div>
      </div>
    </SectionCard>
  );
}
