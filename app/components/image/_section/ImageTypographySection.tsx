"use client";

import React from "react";
import type { ImageState } from "../types";
import ColorControl from "@/app/components/controls/color/ColorControl";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import { TypographyStyleControl } from "@/app/components/controls/typography/TypographyControl";

interface ImageTypographySectionProps {
  state: ImageState;
  setState: (updater: (prev: ImageState) => ImageState) => void;
}

export default function ImageTypographySection({
  state,
  setState,
}: ImageTypographySectionProps) {
  const setKey =
    <K extends keyof ImageState>(key: K) =>
    (value: ImageState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    };

  return (
    <div className="space-y-6">
      <SectionCard
        title="Typography"
        subtitle="Caption text treatment for editorial overlays."
      >
        {state.captionEnabled ? (
          <div className="space-y-4">
            <ColorControl
              label="Caption Color"
              value={state.captionTextColor}
              onChange={setKey("captionTextColor")}
            />

            <TypographyStyleControl
              fontSize={Number(state.captionFontSize) || 12}
              setFontSize={(value) =>
                setKey("captionFontSize")(String(value))
              }
              fontSizeMin={12}
              fontSizeMax={48}
            />
          </div>
        ) : (
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Enable the caption overlay in Effects to style caption typography.
          </p>
        )}
      </SectionCard>
    </div>
  );
}
