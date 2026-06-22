"use client";

import React from "react";
import { type IconFloatSetter, type IconSetter, type IconState } from "../types";
import BorderControl from "@/app/components/controls/layout/BorderControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";

export default function IconFrameSection({
  state,
  setKey,
  setFloat,
}: {
  state: IconState;
  setKey: IconSetter;
  setFloat: IconFloatSetter;
}) {
  if (state.shape === "none") {
    return (
      <div className="space-y-6">
        <SectionCard
          title="Frame"
          subtitle="Choose a container shape in Surface to style a frame."
        >
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            A frame appears once the icon uses a square, circle, rounded, or
            squircle container.
          </p>
        </SectionCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionCard title="Frame" subtitle="Outline and corner treatment.">
        <div className="space-y-4">
          <BorderControl
            width={state.borderWidth}
            setWidth={setFloat("borderWidth")}
            style={state.borderStyle}
            setStyle={(value) =>
              setKey("borderStyle")(value as IconState["borderStyle"])
            }
            color={state.borderColor}
            setColor={setKey("borderColor")}
          />

          {(state.shape === "rounded" || state.shape === "squircle") && (
            <div className="border-t pt-2" style={{ borderColor: "var(--border)" }}>
              <SizeControl
                label="Radius"
                value={state.borderRadius}
                onChange={setFloat("borderRadius")}
                min={0}
                max={100}
                unit="px"
              />
            </div>
          )}
        </div>
      </SectionCard>
    </div>
  );
}
