"use client";

import React from "react";
import { type IconFloatSetter, type IconSetter, type IconState } from "../types";
import SizeControl from "@/app/components/controls/input/SizeControl";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import { LabeledField } from "@/app/components/controls/layout/LabeledField";
import Select from "@/app/components/controls/input/Select";

export default function IconAnimationSection({
  state,
  setKey,
  setFloat,
}: {
  state: IconState;
  setKey: IconSetter;
  setFloat: IconFloatSetter;
}) {
  return (
    <div className="space-y-6">
      <SectionCard title="Motion" subtitle="Looping, entrance, and hover behavior.">
        <div className="space-y-4">
          <LabeledField label="Type">
            <Select
              value={state.animationType}
              onChange={(value) =>
                setKey("animationType")(value as IconState["animationType"])
              }
              options={[
                { value: "none", label: "None" },
                { value: "spin", label: "Spin" },
                { value: "pulse", label: "Pulse" },
                { value: "bounce", label: "Bounce" },
                { value: "wiggle", label: "Wiggle" },
                { value: "float", label: "Float" },
                { value: "tada", label: "Tada" },
                { value: "flash", label: "Flash" },
                { value: "jello", label: "Jello" },
                { value: "rubberBand", label: "Rubber Band" },
              ]}
            />
          </LabeledField>

          <SizeControl
            label="Duration"
            value={state.animationDuration}
            onChange={setFloat("animationDuration")}
            min={0.2}
            max={8}
            step={0.1}
            unit="s"
          />

          <LabeledField label="Entrance">
            <Select
              value={state.entranceAnimation}
              onChange={(value) =>
                setKey("entranceAnimation")(
                  value as IconState["entranceAnimation"],
                )
              }
              options={[
                { value: "none", label: "None" },
                { value: "fade", label: "Fade" },
                { value: "zoom", label: "Zoom" },
                { value: "slide-up", label: "Slide Up" },
                { value: "slide-down", label: "Slide Down" },
                { value: "rotate-in", label: "Rotate In" },
              ]}
            />
          </LabeledField>

          <LabeledField label="Hover Effect">
            <Select
              value={state.hoverEffect}
              onChange={(value) =>
                setKey("hoverEffect")(value as IconState["hoverEffect"])
              }
              options={[
                { value: "none", label: "None" },
                { value: "scale", label: "Scale Up" },
                { value: "rotate", label: "Rotate 180 deg" },
                { value: "shake", label: "Shake" },
                { value: "glow", label: "Glow Intensify" },
                { value: "3d-tilt", label: "3D Tilt" },
              ]}
            />
          </LabeledField>
        </div>
      </SectionCard>
    </div>
  );
}
