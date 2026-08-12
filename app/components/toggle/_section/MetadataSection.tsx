"use client";

import React from "react";
import NativeControlMetadataControl from "@/app/components/controls/sections/NativeControlMetadataControl";
import { SectionCard } from "@/app/components/controls/ui";
import { type ToggleKeyUpdater, type ToggleState } from "../types";

export default function MetadataSection({ state, setKey }: { state: ToggleState; setKey: ToggleKeyUpdater }) {
  return (
    <SectionCard title="Metadata" subtitle="Native control attributes.">
      <NativeControlMetadataControl
        id={state.id}
        onIdChange={setKey("id")}
        name={state.name}
        onNameChange={setKey("name")}
        value={state.value}
        onValueChange={setKey("value")}
        title={state.title}
        onTitleChange={setKey("title")}
        tabIndex={state.tabIndex}
        onTabIndexChange={setKey("tabIndex")}
        dir={state.dir}
        onDirChange={setKey("dir")}
        lang={state.lang}
        onLangChange={setKey("lang")}
        idPlaceholder="toggle-switch"
      />
    </SectionCard>
  );
}
