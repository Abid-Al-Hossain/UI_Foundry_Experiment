"use client";

import React from "react";
import { SectionCard } from "@/app/components/controls/ui";
import ShadowLayerControl from "@/app/components/controls/effects/ShadowLayerControl";
import { RadioState, RadioSetter } from "../types";

export default function ShadowSection({
  state,
  setKey,
}: {
  state: RadioState;
  setKey: RadioSetter;
}) {
  return (
    <SectionCard title="Shadow" subtitle="Radio depth and ambient shadow.">
      <ShadowLayerControl
        label="Drop Shadow"
        enabled={state.shadowEnabled}
        setEnabled={setKey("shadowEnabled")}
        x={state.shadowX}
        setX={(v) => setKey("shadowX")(v)}
        y={state.shadowY}
        setY={(v) => setKey("shadowY")(v)}
        blur={state.shadowBlur}
        setBlur={(v) => setKey("shadowBlur")(v)}
        spread={state.shadowSpread}
        setSpread={(v) => setKey("shadowSpread")(v)}
        opacity={state.shadowOpacity}
        setOpacity={(v) => setKey("shadowOpacity")(v)}
        color={state.shadowColor}
        setColor={setKey("shadowColor")}
      />
    </SectionCard>
  );
}
