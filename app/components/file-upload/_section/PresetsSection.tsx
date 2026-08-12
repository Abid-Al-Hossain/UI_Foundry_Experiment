"use client";

import PresetBrowser from "@/app/components/controls/presets/PresetBrowser";
import { FILEUPLOAD_PRESETS } from "../_data/FileUploadPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  return (
    <PresetBrowser
      presets={FILEUPLOAD_PRESETS}
      activePresetId={activePresetId}
      onApply={onApply}
    />
  );
}
