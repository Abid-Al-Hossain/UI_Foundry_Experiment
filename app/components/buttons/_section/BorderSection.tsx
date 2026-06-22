"use client";

import React from "react";
import { SectionCard } from "./ui";
import BorderControl from "@/app/components/controls/layout/BorderControl";

type BorderStyle = "none" | "solid" | "dashed" | "dotted" | "double";
type ButtonVariant = "solid" | "outline" | "ghost";

import { ActionButtonState } from "../types";

export default function BorderSection({
  state,
  setKey,
  PALETTE,
}: {
  state: ActionButtonState;
  setKey: (key: keyof ActionButtonState) => (val: any) => void;
  PALETTE: readonly string[];
}) {
  const ghost = state.variant === "ghost";

  return (
    <SectionCard title="Border" subtitle="Stroke width, style, and color.">
      <BorderControl
        width={Number(state.borderWidthText) || 0}
        setWidth={(v) => setKey("borderWidthText")(String(v))}
        style={state.borderStyle}
        setStyle={setKey("borderStyle")}
        // No, setKey("borderStyle")(v)
        // But BorderControl expects setStyle prop...
        // Let's check BorderControl props. It expects (v: BorderStyle) => void.
        // setKey("borderStyle") returns (val: any) => void.
        // So (v) => setKey("borderStyle")(v) works.
        hoverWidth={Number(state.borderHoverWidthText) || 0}
        setHoverWidth={(v) => setKey("borderHoverWidthText")(String(v))}
        activeWidth={Number(state.borderActiveWidthText) || 0}
        setActiveWidth={(v) => setKey("borderActiveWidthText")(String(v))}
        palette={PALETTE}
        color={state.borderInput}
        setColor={(v) => setKey("borderInput")(v)}
      />
    </SectionCard>
  );
}
