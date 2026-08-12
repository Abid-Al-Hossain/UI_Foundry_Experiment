"use client";

import React from "react";
import { type SpinnerLabelConfig, type SpinnerState } from "../types";
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
  { label: "Top Left", value: "top-left" },
  { label: "Top Center", value: "top-center" },
  { label: "Top Right", value: "top-right" },
  { label: "Center Left", value: "center-left" },
  { label: "Center", value: "center" },
  { label: "Center Right", value: "center-right" },
  { label: "Bottom Left", value: "bottom-left" },
  { label: "Bottom Center", value: "bottom-center" },
  { label: "Bottom Right", value: "bottom-right" },
];

const TYPE_OPTIONS = [
  { label: "Text", value: "text" },
  { label: "Icon", value: "icon" },
  { label: "Animated", value: "animated" },
];

const ANIMATED_INDICATOR_OPTIONS = [
  { label: "None", value: "none" },
  { label: "Walking Person", value: "walking-person" },
  { label: "Spinning Star", value: "spinning-star" },
  { label: "Rocket", value: "rocket" },
];

function generateLabelId() {
  return `label-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
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
    updateLabels(labels.filter((label) => label.id !== id));
  };

  const updateLabel = (
    id: string,
    key: keyof SpinnerLabelConfig,
    value: unknown,
  ) => {
    updateLabels(
      labels.map((label) =>
        label.id === id ? { ...label, [key]: value } : label,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <Section title="Labels" subtitle="Add text, icons, or indicators">
        <button
          onClick={addLabel}
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-600 px-4 py-2 text-gray-400 transition-colors hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400"
        >
          <Plus size={18} />
          <span>Add Label</span>
        </button>

        {labels.length === 0 && (
          <p className="py-4 text-center text-sm text-gray-500">
            No labels added.
          </p>
        )}

        {labels.map((label, index) => (
          <div
            key={label.id}
            className="mt-4 space-y-4 rounded-lg border border-gray-700 bg-gray-800/50 p-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-300">
                Label #{index + 1}
              </span>
              <button
                onClick={() => removeLabel(label.id)}
                className="rounded p-1.5 text-gray-400 transition-colors hover:bg-red-500/20 hover:text-red-400"
                title="Remove label"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <ControlGroup label="Position">
              <SelectControl
                value={label.position}
                options={POSITION_OPTIONS}
                onChange={(value) => updateLabel(label.id, "position", value)}
              />
            </ControlGroup>

            <ControlGroup label="Type">
              <SelectControl
                value={label.type}
                options={TYPE_OPTIONS}
                onChange={(value) => updateLabel(label.id, "type", value)}
              />
            </ControlGroup>

            {label.type === "text" && (
              <>
                <ControlGroup label="Text">
                  <InputControl
                    value={label.text || ""}
                    onChange={(event) =>
                      updateLabel(label.id, "text", event)
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
                    onChange={(value) =>
                      updateLabel(label.id, "size", Number(value))
                    }
                  />
                </ControlGroup>
              </>
            )}

            {label.type === "icon" && (
              <>
                <IconPickerControl
                  label="Icon"
                  source={(label.iconSource as IconSource) || "library"}
                  setSource={(value) =>
                    updateLabel(label.id, "iconSource", value)
                  }
                  name={label.iconName || ""}
                  setName={(value) => updateLabel(label.id, "iconName", value)}
                  customSvg={label.customSvg || ""}
                  setCustomSvg={(value) =>
                    updateLabel(label.id, "customSvg", value)
                  }
                  allowNone={false}
                />

                <ControlGroup label="Icon Size (px)">
                  <SliderControl
                    value={label.size || 24}
                    min={16}
                    max={64}
                    step={4}
                    onChange={(value) =>
                      updateLabel(label.id, "size", Number(value))
                    }
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
                    onChange={(value) =>
                      updateLabel(label.id, "animatedIndicator", value)
                    }
                  />
                </ControlGroup>

                <ControlGroup label="Size (px)">
                  <SliderControl
                    value={label.size || 24}
                    min={16}
                    max={64}
                    step={4}
                    onChange={(value) =>
                      updateLabel(label.id, "size", Number(value))
                    }
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
