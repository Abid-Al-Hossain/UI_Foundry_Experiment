"use client";

import React from "react";
import FontFamilySelect, { type SystemFontItem } from "./FontFamilySelect";
import FontWeightSelect from "./FontWeightSelect";
import TextDecorationControl, {
  type TextTransform,
} from "./TextDecorationControl";
import SizeControl from "../input/SizeControl";
import { SegmentedControl } from "../input/SegmentedControl";
import { LabeledField } from "../layout/LabeledField";

export type TypographyFontFamilyControlProps = {
  fontBucket: "system" | "google";
  setFontBucket: (value: "system" | "google") => void;
  fontSearch: string;
  setFontSearch: (value: string) => void;
  systemFonts: SystemFontItem[];
  filteredSystemFonts: SystemFontItem[];
  systemFontIdx: number;
  setSystemFontIdx: (value: number) => void;
  googleFonts: string[];
  filteredGoogleFonts: string[];
  googleFontFamily: string;
  setGoogleFontFamily: (value: string) => void;
};

export type TypographyStyleControlProps = {
  fontSize?: number;
  setFontSize?: (value: number) => void;
  fontSizeUnit?: "px" | "rem";
  setFontSizeUnit?: (value: "px" | "rem") => void;
  fontSizeMin?: number;
  fontSizeMax?: number;
  fontWeight?: number;
  setFontWeight?: (value: number) => void;
  fontStyle?: "normal" | "italic";
  setFontStyle?: (value: "normal" | "italic") => void;
  textDecoration?: "none" | "underline";
  setTextDecoration?: (value: "none" | "underline") => void;
  textTransform?: TextTransform;
  setTextTransform?: (value: TextTransform) => void;
};

export type TypographySpacingControlProps = {
  letterSpacing?: number;
  setLetterSpacing?: (value: number) => void;
  letterSpacingUnit?: "px" | "em";
  setLetterSpacingUnit?: (value: "px" | "em") => void;
  lineHeight?: number;
  setLineHeight?: (value: number) => void;
};

export type TypographyControlProps = TypographyFontFamilyControlProps &
  Required<
    Pick<
      TypographyStyleControlProps,
      | "fontSize"
      | "setFontSize"
      | "fontSizeUnit"
      | "setFontSizeUnit"
      | "fontWeight"
      | "setFontWeight"
      | "fontStyle"
      | "setFontStyle"
      | "textDecoration"
      | "setTextDecoration"
      | "textTransform"
      | "setTextTransform"
    >
  > &
  Required<TypographySpacingControlProps> & {
    fontSizeMin?: number;
    fontSizeMax?: number;
  };

function GroupHeading({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-xs font-semibold tracking-wide"
      style={{ color: "var(--muted)" }}
    >
      {children}
    </div>
  );
}

export function TypographyFontFamilyControl(
  props: TypographyFontFamilyControlProps,
) {
  return <FontFamilySelect {...props} />;
}

export function TypographyStyleControl(props: TypographyStyleControlProps) {
  const showFontSize =
    props.fontSize !== undefined && props.setFontSize !== undefined;
  const showFontSizeUnit =
    props.fontSizeUnit !== undefined && props.setFontSizeUnit !== undefined;
  const showWeight =
    props.fontWeight !== undefined && props.setFontWeight !== undefined;
  const showDecoration =
    (props.fontStyle !== undefined && props.setFontStyle !== undefined) ||
    (props.textDecoration !== undefined &&
      props.setTextDecoration !== undefined) ||
    (props.textTransform !== undefined &&
      props.setTextTransform !== undefined);

  if (!showFontSize && !showWeight && !showDecoration) return null;

  return (
    <div
      className="space-y-4 border-t pt-4"
      style={{ borderColor: "var(--border)" }}
    >
      <GroupHeading>STYLE &amp; SIZE</GroupHeading>

      {showFontSizeUnit ? (
        <LabeledField label="Font size unit">
          <SegmentedControl
            value={props.fontSizeUnit!}
            onChange={props.setFontSizeUnit!}
            items={[
              { value: "px", label: "px" },
              { value: "rem", label: "rem" },
            ]}
          />
        </LabeledField>
      ) : null}

      {showFontSize ? (
        <SizeControl
          label="Font size"
          value={props.fontSize!}
          onChange={props.setFontSize!}
          min={props.fontSizeMin ?? 10}
          max={props.fontSizeMax ?? 100}
        />
      ) : null}

      {showWeight ? (
        <FontWeightSelect
          value={props.fontWeight!}
          onChange={props.setFontWeight!}
        />
      ) : null}

      {showDecoration ? (
        <TextDecorationControl
          italic={
            props.fontStyle === undefined
              ? undefined
              : props.fontStyle === "italic"
          }
          setItalic={
            props.setFontStyle
              ? (value) => props.setFontStyle?.(value ? "italic" : "normal")
              : undefined
          }
          underline={
            props.textDecoration === undefined
              ? undefined
              : props.textDecoration === "underline"
          }
          setUnderline={
            props.setTextDecoration
              ? (value) =>
                  props.setTextDecoration?.(value ? "underline" : "none")
              : undefined
          }
          textTransform={props.textTransform}
          setTextTransform={props.setTextTransform}
        />
      ) : null}
    </div>
  );
}

export function TypographySpacingControl(
  props: TypographySpacingControlProps,
) {
  const showLetterSpacing =
    props.letterSpacing !== undefined &&
    props.setLetterSpacing !== undefined;
  const showLetterSpacingUnit =
    props.letterSpacingUnit !== undefined &&
    props.setLetterSpacingUnit !== undefined;
  const showLineHeight =
    props.lineHeight !== undefined && props.setLineHeight !== undefined;

  if (!showLetterSpacing && !showLineHeight) return null;

  return (
    <div
      className="space-y-4 border-t pt-4"
      style={{ borderColor: "var(--border)" }}
    >
      <GroupHeading>SPACING</GroupHeading>

      {showLetterSpacingUnit ? (
        <LabeledField label="Letter spacing unit">
          <SegmentedControl
            value={props.letterSpacingUnit!}
            onChange={props.setLetterSpacingUnit!}
            items={[
              { value: "px", label: "px" },
              { value: "em", label: "em" },
            ]}
          />
        </LabeledField>
      ) : null}

      {showLetterSpacing ? (
        <SizeControl
          label="Letter spacing"
          value={props.letterSpacing!}
          onChange={props.setLetterSpacing!}
          min={props.letterSpacingUnit === "em" ? -0.5 : -5}
          max={props.letterSpacingUnit === "em" ? 1 : 20}
          step={props.letterSpacingUnit === "em" ? 0.01 : 1}
        />
      ) : null}

      {showLineHeight ? (
        <SizeControl
          label="Line height"
          value={props.lineHeight!}
          onChange={props.setLineHeight!}
          min={0.8}
          max={3}
          step={0.05}
        />
      ) : null}
    </div>
  );
}

export default function TypographyControl(props: TypographyControlProps) {
  return (
    <div className="space-y-6">
      <TypographyFontFamilyControl {...props} />
      <TypographyStyleControl {...props} />
      <TypographySpacingControl {...props} />
    </div>
  );
}
