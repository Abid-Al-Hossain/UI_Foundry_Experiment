"use client";

import React from "react";
import { SectionCard } from "@/app/components/controls/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import TypographyControl from "@/app/components/controls/typography/TypographyControl";
import { SegmentedControl } from "@/app/components/controls/input/SegmentedControl";
import {
  SYSTEM_FONTS,
  GOOGLE_FONTS,
} from "@/app/components/controls/typography/fontConstants";
import { type TextInputSetter, type TextInputState } from "../types";

export default function TypographySection({
  state,
  setKey,
}: {
  state: TextInputState;
  setKey: TextInputSetter;
}) {
  // Simple filtering for fonts
  const search = state.fontSearch.toLowerCase();
  const filteredSystemFonts = SYSTEM_FONTS.filter((f) =>
    f.label.toLowerCase().includes(search),
  );
  const filteredGoogleFonts = GOOGLE_FONTS.filter((f) =>
    f.toLowerCase().includes(search),
  );

  return (
    <SectionCard title="Typography" subtitle="Input text styling.">
      <div className="space-y-6">
        <TypographyControl
          // Font Family
          fontBucket={state.fontBucket}
          setFontBucket={setKey("fontBucket")}
          fontSearch={state.fontSearch}
          setFontSearch={setKey("fontSearch")}
          systemFonts={SYSTEM_FONTS}
          filteredSystemFonts={filteredSystemFonts}
          systemFontIdx={state.systemFontIdx}
          setSystemFontIdx={setKey("systemFontIdx")}
          googleFonts={GOOGLE_FONTS}
          filteredGoogleFonts={filteredGoogleFonts}
          googleFontFamily={state.googleFontFamily}
          setGoogleFontFamily={setKey("googleFontFamily")}
          // Font Size
          fontSize={state.fontSize}
          setFontSize={(v) => setKey("fontSize")(v)}
          fontSizeUnit={state.fontSizeUnit}
          setFontSizeUnit={setKey("fontSizeUnit")}
          fontSizeMin={10}
          fontSizeMax={64}
          // Weight
          fontWeight={state.fontWeight}
          setFontWeight={setKey("fontWeight")}
          // Decoration
          fontStyle={state.fontStyle}
          setFontStyle={setKey("fontStyle")}
          textDecoration="none"
          setTextDecoration={() => {}} // Inputs usually don't have underline
          textTransform={state.textTransform}
          setTextTransform={setKey("textTransform")}
          // Spacing
          letterSpacing={state.letterSpacing}
          setLetterSpacing={(v) => setKey("letterSpacing")(v)}
          letterSpacingUnit={state.letterSpacingUnit}
          setLetterSpacingUnit={setKey("letterSpacingUnit")}
          lineHeight={state.lineHeight}
          setLineHeight={(v) => setKey("lineHeight")(v)}
        />

        <div className="pt-4 border-t space-y-4" style={{ borderColor: "var(--border)" }}>
          <div>
            <label className="text-sm font-medium block mb-2" style={{ color: "var(--text)" }}>Text Align</label>
            <SegmentedControl
              value={state.textAlign}
              onChange={(v) => setKey("textAlign")(v as "left" | "center" | "right")}
              items={[{ value: "left", label: "Left" }, { value: "center", label: "Center" }, { value: "right", label: "Right" }]}
            />
          </div>
          <ColorControl
            label="Text Color"
            palette={[
              "#1e293b",
              "#334155",
              "#64748b",
              "#94a3b8",
              "#e2e8f0",
              "#000000",
              "#ffffff",
            ]}
            value={state.textColor}
            onChange={setKey("textColor")}
          />
        </div>
      </div>
    </SectionCard>
  );
}
