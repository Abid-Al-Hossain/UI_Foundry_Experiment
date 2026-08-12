"use client";

import React from "react";
import FieldMessagesControl from "@/app/components/controls/sections/FieldMessagesControl";
import { SectionCard } from "@/app/components/controls/ui";
import { type ToggleKeyUpdater, type ToggleState } from "../types";

export default function MessagesSection({ state, setKey }: { state: ToggleState; setKey: ToggleKeyUpdater }) {
  return (
    <SectionCard title="Messages" subtitle="Description, helper, error, and success states.">
      <FieldMessagesControl
        description={{ text: state.descriptionText, color: state.descriptionColor }}
        helper={{ text: state.helperText, color: state.helperColor }}
        error={{ text: state.errorText, color: state.errorColor }}
        success={{ text: state.successText, color: state.successColor }}
        onDescriptionTextChange={setKey("descriptionText")}
        onDescriptionColorChange={setKey("descriptionColor")}
        onHelperTextChange={setKey("helperText")}
        onHelperColorChange={setKey("helperColor")}
        onErrorTextChange={setKey("errorText")}
        onErrorColorChange={setKey("errorColor")}
        onSuccessTextChange={setKey("successText")}
        onSuccessColorChange={setKey("successColor")}
        helperPlaceholder="Optional guidance"
      />
    </SectionCard>
  );
}
