"use client";

import React from "react";
import { SectionCard } from "./ui";
import SizeControl from "./SizeControl";

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
    <SectionCard title="Radius" subtitle="Corner rounding.">
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
          <SizeControl
            label="Radius"
            valueText={props.radiusText}
            setValueText={props.setRadiusText}
            min={0}
            max={60}
            computedValue={props.radiusUnified}
          />
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            <SizeControl label="Top-left" valueText={props.radiusTLText} setValueText={props.setRadiusTLText} min={0} max={60} computedValue={props.radiusTL} />
            <SizeControl label="Top-right" valueText={props.radiusTRText} setValueText={props.setRadiusTRText} min={0} max={60} computedValue={props.radiusTR} />
            <SizeControl label="Bottom-right" valueText={props.radiusBRText} setValueText={props.setRadiusBRText} min={0} max={60} computedValue={props.radiusBR} />
            <SizeControl label="Bottom-left" valueText={props.radiusBLText} setValueText={props.setRadiusBLText} min={0} max={60} computedValue={props.radiusBL} />
          </div>
        )}
      </div>
    </SectionCard>
  );
}
