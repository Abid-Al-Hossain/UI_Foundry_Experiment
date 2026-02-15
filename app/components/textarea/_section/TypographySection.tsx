"use client";

import React, { useMemo } from "react";
import { SectionCard } from "../../buttons/action/_section/ui";
import TypographyControl from "@/app/components/controls/typography/TypographyControl";
import {
  SYSTEM_FONTS,
  GOOGLE_FONTS,
} from "@/app/components/controls/typography/fontConstants";
import { TextareaState } from "../types";

export default function TypographySection({
  state,
  setKey,
}: {
  state: TextareaState;
  setKey: (key: keyof TextareaState) => (val: any) => void;
}) {
  const filteredSystemFonts = useMemo(
    () =>
      SYSTEM_FONTS.filter((font) =>
        font.label
          .toLowerCase()
          .includes(state.fontSearch?.toLowerCase() || ""),
      ),
    [state.fontSearch],
  );

  const filteredGoogleFonts = useMemo(
    () =>
      GOOGLE_FONTS.filter((font) =>
        font.toLowerCase().includes(state.fontSearch?.toLowerCase() || ""),
      ),
    [state.fontSearch],
  );

  return (
    <SectionCard
      title="Typography"
      subtitle="Font family, size, weight, and more."
    >
      <div className="space-y-4">
        <TypographyControl
          // Font Family
          fontBucket={state.fontBucket}
          setFontBucket={setKey("fontBucket")}
          fontSearch={state.fontSearch || ""}
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
          setTextDecoration={() => {}}
          textTransform={state.textTransform as any}
          setTextTransform={setKey("textTransform")}
          // Spacing
          letterSpacing={state.letterSpacing}
          setLetterSpacing={(v) => setKey("letterSpacing")(v)}
          letterSpacingUnit={state.letterSpacingUnit}
          setLetterSpacingUnit={setKey("letterSpacingUnit")}
          lineHeight={state.lineHeight}
          setLineHeight={(v) => setKey("lineHeight")(v)}
        />
      </div>
    </SectionCard>
  );
}
