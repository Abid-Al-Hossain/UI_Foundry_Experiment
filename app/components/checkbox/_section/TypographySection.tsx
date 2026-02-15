import React from "react";
import { SectionCard } from "../../buttons/action/_section/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import TypographyControl from "@/app/components/controls/typography/TypographyControl";
import {
  SYSTEM_FONTS,
  GOOGLE_FONTS,
} from "@/app/components/controls/typography/fontConstants";
import { CheckboxState } from "../types";

export default function TypographySection({
  state,
  setKey,
}: {
  state: CheckboxState;
  setKey: (key: keyof CheckboxState) => (val: any) => void;
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
    <SectionCard title="Label Typography" subtitle="Label font styling.">
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
          fontSize={state.labelFontSize}
          setFontSize={(v) => setKey("labelFontSize")(v)}
          fontSizeUnit={state.fontSizeUnit}
          setFontSizeUnit={setKey("fontSizeUnit")}
          fontSizeMin={10}
          fontSizeMax={64}
          // Weight
          fontWeight={state.labelFontWeight}
          setFontWeight={setKey("labelFontWeight")}
          // Decoration
          fontStyle={state.labelFontStyle}
          setFontStyle={setKey("labelFontStyle")}
          textDecoration={state.labelUnderline ? "underline" : "none"}
          setTextDecoration={(v) => setKey("labelUnderline")(v === "underline")}
          textTransform={state.labelTextTransform as any}
          setTextTransform={setKey("labelTextTransform")}
          // Spacing
          letterSpacing={state.labelLetterSpacing}
          setLetterSpacing={(v) => setKey("labelLetterSpacing")(v)}
          letterSpacingUnit={state.letterSpacingUnit}
          setLetterSpacingUnit={setKey("letterSpacingUnit")}
          lineHeight={state.labelLineHeight}
          setLineHeight={(v) => setKey("labelLineHeight")(v)}
        />

        <div className="pt-4 border-t" style={{ borderColor: "var(--border)" }}>
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
            value={state.labelColor}
            onChange={setKey("labelColor")}
          />
        </div>
      </div>
    </SectionCard>
  );
}
