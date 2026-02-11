import React, { useId } from "react";
import { SectionCard } from "./ui";
import TypographyControl from "@/app/components/controls/typography/TypographyControl";
import { ActionButtonState } from "@/app/components/buttons/action/types";
import { SYSTEM_FONTS, GOOGLE_FONTS } from "../_data/buttonConstants";

export default function TypographySection({
  state,
  setKey,
  fontSizeMin = 8,
  fontSizeMax = 200,
  fontSizeStep = 1,
  letterSpacingMin = -5,
  letterSpacingMax = 20,
  letterSpacingStep = 0.1,
}: {
  state: ActionButtonState;
  setKey: (key: keyof ActionButtonState) => (val: any) => void;
  fontSizeMin?: number;
  fontSizeMax?: number;
  fontSizeStep?: number;
  letterSpacingMin?: number;
  letterSpacingMax?: number;
  letterSpacingStep?: number;
}) {
  const idItalic = useId();
  const idUnderline = useId();

  const search = state.fontSearch.toLowerCase();
  const filteredSystemFonts = SYSTEM_FONTS.filter((f) =>
    f.label.toLowerCase().includes(search),
  );
  const filteredGoogleFonts = GOOGLE_FONTS.filter((f) =>
    f.toLowerCase().includes(search),
  );

  return (
    <SectionCard title="Typography" subtitle="Font + spacing + decoration.">
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
        fontSize={Number(state.fontSizeText) || 0}
        setFontSize={(v) => setKey("fontSizeText")(String(v))}
        fontSizeUnit={state.fontSizeUnit}
        setFontSizeUnit={setKey("fontSizeUnit")}
        fontSizeMin={fontSizeMin}
        fontSizeMax={fontSizeMax}
        // Weight
        fontWeight={state.fontWeight}
        setFontWeight={setKey("fontWeight")}
        // Decoration
        fontStyle={state.fontStyle}
        setFontStyle={setKey("fontStyle")}
        textDecoration={state.underline ? "underline" : "none"}
        setTextDecoration={(v) => setKey("underline")(v === "underline")}
        textTransform={state.textTransform}
        setTextTransform={setKey("textTransform")}
        // Spacing
        letterSpacing={Number(state.letterSpacingText) || 0}
        setLetterSpacing={(v) => setKey("letterSpacingText")(String(v))}
        letterSpacingUnit={state.letterSpacingUnit}
        setLetterSpacingUnit={setKey("letterSpacingUnit")}
        lineHeight={Number(state.lineHeightText) || 1}
        setLineHeight={(v) => setKey("lineHeightText")(String(v))}
      />
    </SectionCard>
  );
}
