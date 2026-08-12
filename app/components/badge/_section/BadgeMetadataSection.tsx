"use client";

import React from "react";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import InputControl from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";
import type { BadgeState } from "../types";

type Props = {
  ariaLabel: string;
  setAriaLabel: (v: string) => void;
  ariaRole: BadgeState["ariaRole"];
  setAriaRole: (v: BadgeState["ariaRole"]) => void;
  ariaLive: BadgeState["ariaLive"];
  setAriaLive: (v: BadgeState["ariaLive"]) => void;
};

export default function BadgeMetadataSection({
  ariaLabel,
  setAriaLabel,
  ariaRole,
  setAriaRole,
  ariaLive,
  setAriaLive,
}: Props) {
  return (
    <div className="space-y-6">
      <Section
        title="Metadata"
        subtitle="ARIA role and announcement settings for live badge semantics."
      >
        <div className="space-y-4">
          <ControlGroup label="ARIA Label">
            <InputControl
              value={ariaLabel}
              onChange={(e) => setAriaLabel(e)}
              placeholder="e.g. New notifications: 3"
            />
          </ControlGroup>

          <ControlGroup label="Role">
            <Select
              value={ariaRole}
              onChange={(v) => setAriaRole(v as BadgeState["ariaRole"])}
              options={[
                { value: "status", label: "status - Live status update" },
                { value: "alert", label: "alert - Urgent notification" },
                { value: "none", label: "none - Decorative only" },
              ]}
            />
          </ControlGroup>

          <ControlGroup label="Live Region">
            <Select
              value={ariaLive}
              onChange={(v) => setAriaLive(v as BadgeState["ariaLive"])}
              options={[
                { value: "off", label: "off - No announcements" },
                { value: "polite", label: "polite - Announce when idle" },
                { value: "assertive", label: "assertive - Immediate announcement" },
              ]}
            />
          </ControlGroup>
        </div>
      </Section>
    </div>
  );
}
