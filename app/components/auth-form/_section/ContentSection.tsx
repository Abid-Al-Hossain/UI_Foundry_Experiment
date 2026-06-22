"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import type { AuthFormState } from "../types";

type Props = { state: AuthFormState; update: <K extends keyof AuthFormState>(key: K, value: AuthFormState[K]) => void };

export default function ContentSection({ state, update }: Props) {
  return <SectionCard title="Content" subtitle="Content controls for native auth generation.">
      <div className="space-y-4"><Select label="Form mode" value={state.mode} options={["sign-in", "sign-up", "reset-password", "invite"]} onChange={(value) => update("mode", value)} /><Select label="Validation mode" value={state.validationMode} options={["inline", "on-blur", "on-submit"]} onChange={(value) => update("validationMode", value)} /></div>
    </SectionCard>;
}
