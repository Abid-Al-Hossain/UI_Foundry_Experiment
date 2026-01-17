"use client";

import React from "react";
import { SectionCard } from "./ui";
import BorderControl from "@/app/components/controls/layout/BorderControl";

type BorderStyle = "none" | "solid" | "dashed" | "dotted" | "double";
type ButtonVariant = "solid" | "outline" | "ghost";

export default function BorderSection(props: {
  PALETTE: readonly string[];

  variant: ButtonVariant;

  borderWidthText: string;
  setBorderWidthText: (v: string) => void;

  borderStyle: BorderStyle;
  setBorderStyle: (v: BorderStyle) => void;

  borderInput: string;
  setBorderInput: (v: string) => void;

  borderNorm: { ok: boolean; hex: string; rgb: string };

  computedBorderWidth: number;
  computedBorderStyle: BorderStyle;

  borderHoverWidthText: string;
  setBorderHoverWidthText: (v: string) => void;

  borderActiveWidthText: string;
  setBorderActiveWidthText: (v: string) => void;
}) {
  const ghost = props.variant === "ghost";

  return (
    <SectionCard title="Border" subtitle="Stroke width, style, and color.">
      <BorderControl
        width={Number(props.borderWidthText) || 0}
        setWidth={(v) => props.setBorderWidthText(String(v))}
        style={props.borderStyle}
        setStyle={props.setBorderStyle}
        hoverWidth={Number(props.borderHoverWidthText) || 0}
        setHoverWidth={(v) => props.setBorderHoverWidthText(String(v))}
        activeWidth={Number(props.borderActiveWidthText) || 0}
        setActiveWidth={(v) => props.setBorderActiveWidthText(String(v))}
        palette={props.PALETTE}
        color={props.borderInput}
        setColor={props.setBorderInput}
      />
    </SectionCard>
  );
}
