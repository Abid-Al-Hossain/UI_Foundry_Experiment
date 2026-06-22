"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import type { ContainerState } from "../types";

type Props = { state: ContainerState; update: <K extends keyof ContainerState>(key: K, value: ContainerState[K]) => void };

export default function StructureSection({ state, update }: Props) {
  return <SectionCard title="Structure" subtitle="Choose the native wrapper that will be rendered and exported."><Select label="Semantic tag" value={state.element} options={[
  "div",
  "section",
  "main",
  "header",
  "footer",
  "aside",
  "nav"
]} onChange={(value) => update("element", value)} /></SectionCard>;
}
