"use client";

import React from "react";
import NativeControlMetadataControl from "@/app/components/controls/sections/NativeControlMetadataControl";
import { SectionCard } from "@/app/components/controls/ui";
import { type RadioSetter, type RadioState } from "../types";

export default function MetadataSection({ state, setKey }: { state: RadioState; setKey: RadioSetter }) {
  return (
    <SectionCard title="Metadata" subtitle="Native group attributes.">
      <NativeControlMetadataControl
        id={state.id}
        onIdChange={setKey("id")}
        name={state.name}
        onNameChange={setKey("name")}
        title={state.title}
        onTitleChange={setKey("title")}
        tabIndex={state.tabIndex}
        onTabIndexChange={setKey("tabIndex")}
        dir={state.dir}
        onDirChange={setKey("dir")}
        lang={state.lang}
        onLangChange={setKey("lang")}
        idLabel="Group ID"
        idPlaceholder="radio-group"
        nameLabel="Group Name"
      />
    </SectionCard>
  );
}
