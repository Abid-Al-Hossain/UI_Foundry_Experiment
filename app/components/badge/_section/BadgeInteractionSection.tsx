"use client";

import React from "react";
import { SectionCard } from "@/app/components/controls/ui";

export default function BadgeInteractionSection(props: {
  interactive: boolean;
  setInteractive: (v: boolean) => void;
  dismissible: boolean;
  setDismissible: (v: boolean) => void;
}) {
  return (
    <SectionCard
      title="Interaction"
      subtitle="Dismiss, hover, and press behavior for interactive badges."
    >
      <div className="space-y-4">
        <label
          className="flex items-center justify-between rounded-xl border px-4 py-3 text-sm"
          style={{ borderColor: "var(--border)", color: "var(--text)" }}
        >
          <span>Interactive Hover</span>
          <input
            type="checkbox"
            checked={props.interactive}
            onChange={(e) => props.setInteractive(e.target.checked)}
          />
        </label>

        <label
          className="flex items-center justify-between rounded-xl border px-4 py-3 text-sm"
          style={{ borderColor: "var(--border)", color: "var(--text)" }}
        >
          <span>Dismiss Button</span>
          <input
            type="checkbox"
            checked={props.dismissible}
            onChange={(e) => props.setDismissible(e.target.checked)}
          />
        </label>
      </div>
    </SectionCard>
  );
}
