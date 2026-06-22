"use client";

import React from "react";
import { type IconFloatSetter, type IconSetter, type IconState } from "../types";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Switch from "@/app/components/controls/input/Switch";

export default function IconEffectsSection({
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
      {/* Drop Shadow */}
      <SectionCard title="Drop Shadow" subtitle="Adding depth">
        <div className="space-y-4">
          <Switch
            label="Enable Shadow"
            checked={state.shadowEnabled}
            onChange={setKey("shadowEnabled")}
          />

          {state.shadowEnabled && (
            <div className="space-y-3">
              <ColorControl
                label="Color"
                value={state.shadowColor}
                onChange={setKey("shadowColor")}
              />
              <div className="grid grid-cols-2 gap-4">
                <SizeControl
                  label="X Offset"
                  value={state.shadowX}
                  onChange={setFloat("shadowX")}
                  min={-50}
                  max={50}
                  unit="px"
                />
                <SizeControl
                  label="Y Offset"
                  value={state.shadowY}
                  onChange={setFloat("shadowY")}
                  min={-50}
                  max={50}
                  unit="px"
                />
                <SizeControl
                  label="Blur"
                  value={state.shadowBlur}
                  onChange={setFloat("shadowBlur")}
                  min={0}
                  max={100}
                  unit="px"
                />
                <SizeControl
                  label="Spread"
                  value={state.shadowSpread}
                  onChange={setFloat("shadowSpread")}
                  min={-20}
                  max={20}
                  unit="px"
                />
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      {/* Neon Glow */}
      <SectionCard title="Neon Glow" subtitle="Outer bloom effect">
        <div className="space-y-4">
          <Switch
            label="Enable Glow"
            checked={state.glowEnabled}
            onChange={setKey("glowEnabled")}
          />

          {state.glowEnabled && (
            <div className="space-y-3">
              <ColorControl
                label="Glow Color"
                value={state.glowColor}
                onChange={setKey("glowColor")}
              />
              <SizeControl
                label="Blur Radius"
                value={state.glowBlur}
                onChange={setFloat("glowBlur")}
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
