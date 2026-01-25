"use client";
import React from "react";
import { type SpinnerState, type SpinnerLabelConfig } from "../../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SelectControl from "@/app/components/controls/input/Select";
import InputControl from "@/app/components/controls/input/Input";
import SliderControl from "@/app/components/controls/input/Slider";
import IconPickerControl, {
  type IconSource,
} from "@/app/components/controls/layout/IconPickerControl";
import { Plus, Trash2 } from "lucide-react";

type Props = {
  state: SpinnerState;
  updateLabels: (labels: SpinnerLabelConfig[]) => void;
};

const POSITION_OPTIONS = [
  { label: "↖ Top Left", value: "top-left" },
  { label: "↑ Top Center", value: "top-center" },
  { label: "↗ Top Right", value: "top-right" },
  { label: "← Center Left", value: "center-left" },
  { label: "● Center", value: "center" },
  { label: "→ Center Right", value: "center-right" },
  { label: "↙ Bottom Left", value: "bottom-left" },
  { label: "↓ Bottom Center", value: "bottom-center" },
  { label: "↘ Bottom Right", value: "bottom-right" },
];

const TYPE_OPTIONS = [
  { label: "Text", value: "text" },
  { label: "Icon", value: "icon" },
  { label: "Animated", value: "animated" },
];

const ANIMATED_INDICATOR_OPTIONS = [
  { label: "None", value: "none" },
  { label: "🚶 Walking Person", value: "walking-person" },
  { label: "⭐ Spinning Star", value: "spinning-star" },
  { label: "🚀 Rocket", value: "rocket" },
];

function generateLabelId() {
  return `label-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export default function LabelsSection({ state, updateLabels }: Props) {
  const labels = state.labels || [];

  const addLabel = () => {
    const newLabel: SpinnerLabelConfig = {
      id: generateLabelId(),
      position: "bottom-center",
      type: "text",
      text: "Loading...",
      size: 14,
    };
    updateLabels([...labels, newLabel]);
  };

  const removeLabel = (id: string) => {
    updateLabels(labels.filter((l) => l.id !== id));
  };

  const updateLabel = (
    id: string,
    key: keyof SpinnerLabelConfig,
    value: any,
  ) => {
    updateLabels(labels.map((l) => (l.id === id ? { ...l, [key]: value } : l)));
  };

  return (
    <div className="space-y-6">
      <Section title="Labels" subtitle="Add text, icons, or indicators">
        <button
          onClick={addLabel}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border-2 border-dashed border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 transition-colors text-gray-400 hover:text-blue-400"
        >
          <Plus size={18} />
          <span>Add Label</span>
        </button>

        {labels.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            No labels added.
          </p>
        )}

        {labels.map((label, index) => (
          <div
            key={label.id}
            className="mt-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-300">
                Label #{index + 1}
              </span>
              <button
                onClick={() => removeLabel(label.id)}
                className="p-1.5 rounded hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                title="Remove label"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <ControlGroup label="Position">
              <SelectControl
                value={label.position}
                options={POSITION_OPTIONS}
                onChange={(v) => updateLabel(label.id, "position", v)}
              />
            </ControlGroup>

            <ControlGroup label="Type">
              <SelectControl
                value={label.type}
                options={TYPE_OPTIONS}
                onChange={(v) => updateLabel(label.id, "type", v)}
              />
            </ControlGroup>

            {label.type === "text" && (
              <>
                <ControlGroup label="Text">
                  <InputControl
                    value={label.text || ""}
                    onChange={(e) =>
                      updateLabel(label.id, "text", e.target.value)
                    }
                    placeholder="Loading..."
                  />
                </ControlGroup>

                <ControlGroup label="Font Size (px)">
                  <SliderControl
                    value={label.size || 14}
                    min={10}
                    max={32}
                    step={1}
                    onChange={(v) => updateLabel(label.id, "size", Number(v))}
                  />
                </ControlGroup>
              </>
            )}

            {label.type === "icon" && (
              <>
                <IconPickerControl
                  label="Icon"
                  source={(label.iconSource as IconSource) || "library"}
                  setSource={(v) => updateLabel(label.id, "iconSource", v)}
                  name={label.iconName || ""}
                  setName={(v) => updateLabel(label.id, "iconName", v)}
                  customSvg={label.customSvg || ""}
                  setCustomSvg={(v) => updateLabel(label.id, "customSvg", v)}
                  allowNone={false}
                />

                <ControlGroup label="Icon Size (px)">
                  <SliderControl
                    value={label.size || 24}
                    min={16}
                    max={64}
                    step={4}
                    onChange={(v) => updateLabel(label.id, "size", Number(v))}
                  />
                </ControlGroup>
              </>
            )}

            {label.type === "animated" && (
              <>
                <ControlGroup label="Indicator">
                  <SelectControl
                    value={label.animatedIndicator || "none"}
                    options={ANIMATED_INDICATOR_OPTIONS}
                    onChange={(v) =>
                      updateLabel(label.id, "animatedIndicator", v)
                    }
                  />
                </ControlGroup>
                <ControlGroup label="Size (px)">
                  <SliderControl
                    value={label.size || 24}
                    min={16}
                    max={64}
                    step={4}
                    onChange={(v) => updateLabel(label.id, "size", Number(v))}
                  />
                </ControlGroup>
              </>
            )}
          </div>
        ))}
      </Section>
    </div>
  );
}
