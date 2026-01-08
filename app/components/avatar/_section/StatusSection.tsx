"use client";

import React from "react";
import { SectionCard, LabeledField, Segmented } from "./ui";

export default function StatusSection(props: {
  status: "none" | "online" | "offline" | "busy" | "away";
  setStatus: (v: any) => void;
  statusPosition: "top-right" | "bottom-right" | "bottom-left" | "top-left";
  setStatusPosition: (v: any) => void;
  statusAnimation: "none" | "pulse";
  setStatusAnimation: (v: any) => void;
}) {
  return (
    <div className="space-y-6">
      <SectionCard
        title="Status Indicator"
        subtitle="Show availability or state."
      >
        <div className="space-y-4">
          <LabeledField label="Status">
            <Segmented
              value={props.status}
              onChange={props.setStatus}
              items={[
                { value: "none", label: "None" },
                { value: "online", label: "Online" },
                { value: "offline", label: "Offline" },
                { value: "busy", label: "Busy" },
                { value: "away", label: "Away" },
              ]}
            />
          </LabeledField>

          <LabeledField label="Position">
            <Segmented
              value={props.statusPosition}
              onChange={props.setStatusPosition}
              items={[
                { value: "top-left", label: "TL" },
                { value: "top-right", label: "TR" },
                { value: "bottom-left", label: "BL" },
                { value: "bottom-right", label: "BR" },
              ]}
            />
          </LabeledField>

          <LabeledField label="Animation">
            <Segmented
              value={props.statusAnimation}
              onChange={props.setStatusAnimation}
              items={[
                { value: "none", label: "None" },
                { value: "pulse", label: "Pulse" },
              ]}
            />
          </LabeledField>
        </div>
      </SectionCard>
    </div>
  );
}
