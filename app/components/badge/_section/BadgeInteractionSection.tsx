"use client";

import React from "react";
import { SectionCard } from "@/app/components/controls/ui";
import Switch from "@/app/components/controls/input/Switch";

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
        <Switch
          label={<><span>Interactive Hover</span></>}
          checked={props.interactive}
          onChange={(checked) => props.setInteractive(checked)}
        />

        <Switch
          label={<><span>Dismiss Button</span></>}
          checked={props.dismissible}
          onChange={(checked) => props.setDismissible(checked)}
        />
      </div>
    </SectionCard>
  );
}
