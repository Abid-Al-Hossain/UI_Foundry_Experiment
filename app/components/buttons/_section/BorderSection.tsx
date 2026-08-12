"use client";

import React from "react";
import { SectionCard } from "./ui";
import BorderControl from "@/app/components/controls/layout/BorderControl";

import { ActionButtonState, ActionButtonFieldSetter } from "../types";

export default function BorderSection({
  state,
  setKey,
  PALETTE,
}: {
  state: ActionButtonState;
  setKey: ActionButtonFieldSetter;
  PALETTE: readonly string[];
}) {
  return (
    <SectionCard title="Border" subtitle="Stroke width, style, and color.">
      <BorderControl
        width={Number(state.borderWidthText) || 0}
        setWidth={(v) => setKey("borderWidthText")(String(v))}
        style={state.borderStyle}
        setStyle={setKey("borderStyle")}
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
