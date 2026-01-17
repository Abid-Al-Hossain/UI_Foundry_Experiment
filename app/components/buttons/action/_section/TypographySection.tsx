"use client";

import React from "react";
import { SectionCard } from "./ui";
import TypographyControl from "@/app/components/controls/typography/TypographyControl";

export type FontStyleKey = "normal" | "italic";
export type FontWeightKey = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type TextTransformKey =
  | "none"
  | "uppercase"
  | "lowercase"
  | "capitalize";

export type SystemFontItem = { label: string; css: string };

export default function TypographySection(props: {
  // state
  fontBucket: "system" | "google";
  setFontBucket: (v: "system" | "google") => void;

  fontSearch: string;
  setFontSearch: (v: string) => void;

  systemFonts: SystemFontItem[];
  filteredSystemFonts: SystemFontItem[];
  systemFontIdx: number;
  setSystemFontIdx: (v: number) => void;

  googleFonts: string[];
  filteredGoogleFonts: string[];
  googleFontFamily: string;
  setGoogleFontFamily: (v: string) => void;

  // style numbers
  fontSizeText: string;
  setFontSizeText: (v: string) => void;
  fontSizeDisplay: string;
  fontSizeUnit: "px" | "rem";
  setFontSizeUnit: (v: "px" | "rem") => void;
  fontSizeMin: number;
  fontSizeMax: number;
  fontSizeStep: number;

  fontWeight: FontWeightKey;
  setFontWeight: (v: FontWeightKey) => void;

  fontStyle: FontStyleKey;
  setFontStyle: (v: FontStyleKey) => void;

  underline: boolean;
  setUnderline: (v: boolean) => void;

  textTransform: TextTransformKey;
  setTextTransform: (v: TextTransformKey) => void;

  letterSpacingText: string;
  setLetterSpacingText: (v: string) => void;
  letterSpacingDisplay: string;
  letterSpacingUnit: "px" | "em";
  setLetterSpacingUnit: (v: "px" | "em") => void;
  letterSpacingMin: number;
  letterSpacingMax: number;
  letterSpacingStep: number;

  lineHeightText: string;
  setLineHeightText: (v: string) => void;
  lineHeight: number;

  // ids
  idItalic: string;
  idUnderline: string;
}) {
  return (
    <SectionCard title="Typography" subtitle="Font + spacing + decoration.">
      <TypographyControl
        // Font Family
        fontBucket={props.fontBucket}
        setFontBucket={props.setFontBucket}
        fontSearch={props.fontSearch}
        setFontSearch={props.setFontSearch}
        systemFonts={props.systemFonts}
        filteredSystemFonts={props.filteredSystemFonts}
        systemFontIdx={props.systemFontIdx}
        setSystemFontIdx={props.setSystemFontIdx}
        googleFonts={props.googleFonts}
        filteredGoogleFonts={props.filteredGoogleFonts}
        googleFontFamily={props.googleFontFamily}
        setGoogleFontFamily={props.setGoogleFontFamily}
        // Font Size
        fontSize={Number(props.fontSizeText) || 0}
        setFontSize={(v) => props.setFontSizeText(String(v))}
        fontSizeUnit={props.fontSizeUnit}
        setFontSizeUnit={props.setFontSizeUnit}
        fontSizeMin={props.fontSizeMin}
        fontSizeMax={props.fontSizeMax}
        // Weight
        fontWeight={props.fontWeight}
        setFontWeight={(v) => props.setFontWeight(v as FontWeightKey)}
        // Decoration
        fontStyle={props.fontStyle}
        setFontStyle={props.setFontStyle}
        textDecoration={props.underline ? "underline" : "none"}
        setTextDecoration={(v) => props.setUnderline(v === "underline")}
        textTransform={props.textTransform}
        setTextTransform={props.setTextTransform}
        // Spacing
        letterSpacing={Number(props.letterSpacingText) || 0}
        setLetterSpacing={(v) => props.setLetterSpacingText(String(v))}
        letterSpacingUnit={props.letterSpacingUnit}
        setLetterSpacingUnit={props.setLetterSpacingUnit}
        lineHeight={Number(props.lineHeightText) || 1}
        setLineHeight={(v) => props.setLineHeightText(String(v))}
      />
    </SectionCard>
  );
}
