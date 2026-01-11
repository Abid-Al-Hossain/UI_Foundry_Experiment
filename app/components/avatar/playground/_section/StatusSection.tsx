import React from "react";
import { SectionCard, LabeledField, Segmented } from "./ui";

export default function StatusSection(props: {
  status: "none" | "online" | "offline" | "busy" | "away";
  setStatus: (v: any) => void;
  statusPosition: "top-right" | "bottom-right" | "bottom-left" | "top-left";
  setStatusPosition: (v: any) => void;
  statusAnimation: "none" | "pulse";
  setStatusAnimation: (v: any) => void;
  badgeCount: string;
  setBadgeCount: (v: string) => void;
}) {
  return (
    <div className="space-y-6">
      <SectionCard
        title="Status & Badge"
        subtitle="Show availability or notification count."
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

          <LabeledField label="Badge Label">
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={props.badgeCount}
                onChange={(e) => props.setBadgeCount(e.target.value)}
                placeholder="e.g. 1, 99+, New"
                className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--primary)] text-[var(--text)]"
                style={{ borderColor: "var(--border)" }}
              />
              <p className="text-xs text-[var(--muted)]">
                Adding text turns the dot into a circular/pill badge.
              </p>
            </div>
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
