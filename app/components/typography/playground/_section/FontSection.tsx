"use client";

import React from "react";
import { type TypographyState } from "../../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import FontFamilySelect from "@/app/components/controls/typography/FontFamilySelect";
import {
  SYSTEM_FONTS,
  GOOGLE_FONTS,
} from "@/app/components/buttons/action/_data/buttonConstants";

type Props = {
  state: TypographyState;
  update: (key: keyof TypographyState, value: any) => void;
};

export default function FontSection({ state, update }: Props) {
  const filteredSystemFonts = state.fontSearch
    ? SYSTEM_FONTS.filter((f) =>
        f.label.toLowerCase().includes(state.fontSearch.toLowerCase()),
      )
    : SYSTEM_FONTS;

  const filteredGoogleFonts = state.fontSearch
    ? GOOGLE_FONTS.filter((f) =>
        f.toLowerCase().includes(state.fontSearch.toLowerCase()),
      )
    : GOOGLE_FONTS;

  return (
    <div className="space-y-6">
      <Section title="Font Family" subtitle="Choose your typeface">
        <FontFamilySelect
          fontBucket={state.fontBucket}
          setFontBucket={(v) => update("fontBucket", v)}
          fontSearch={state.fontSearch}
          setFontSearch={(v) => update("fontSearch", v)}
          systemFonts={SYSTEM_FONTS}
          filteredSystemFonts={filteredSystemFonts}
          systemFontIdx={state.systemFontIdx}
          setSystemFontIdx={(v) => update("systemFontIdx", v)}
          googleFonts={GOOGLE_FONTS}
          filteredGoogleFonts={filteredGoogleFonts}
          googleFontFamily={state.googleFontFamily}
          setGoogleFontFamily={(v) => update("googleFontFamily", v)}
        />

        {/* Live Font Preview */}
        <div
          className="mt-4 p-4 rounded-lg border"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface)",
            fontFamily:
              state.fontBucket === "google"
                ? `"${state.googleFontFamily}", sans-serif`
                : SYSTEM_FONTS[state.systemFontIdx]?.css || "system-ui",
          }}
        >
          <div className="text-2xl font-bold" style={{ color: "var(--text)" }}>
            The quick brown fox
          </div>
          <div className="text-base mt-1" style={{ color: "var(--text)" }}>
            jumps over the lazy dog. 0123456789
          </div>
          <div className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
          </div>
        </div>
      </Section>
    </div>
  );
}
