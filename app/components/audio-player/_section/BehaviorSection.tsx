"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Switch from "@/app/components/controls/input/Switch";
import Select from "@/app/components/controls/input/Select";
import type { AudioPlayerState } from "../types";

type Props = { state: AudioPlayerState; update: <K extends keyof AudioPlayerState>(key: K, value: AudioPlayerState[K]) => void };

export default function BehaviorSection({ state, update }: Props) {
  return <SectionCard title="Behavior" subtitle="Native audio controls and playback defaults.">
      <div className="space-y-4"><Select label="Preload" value={state.preload} options={["none", "metadata", "auto"]} onChange={(value) => update("preload", value)} />
<Select label="Playback rate" value={state.playbackRate} options={["0.75", "1", "1.25", "1.5", "2"]} onChange={(value) => update("playbackRate", value)} />
<Switch label="Timeline" checked={state.showTimeline} onChange={(value) => update("showTimeline", value)} />
<Switch label="Volume readout" checked={state.showVolume} onChange={(value) => update("showVolume", value)} />
<Switch label="Loop" checked={state.loop} onChange={(value) => update("loop", value)} />
<Switch label="Muted" checked={state.muted} onChange={(value) => update("muted", value)} />
<Switch label="Disabled" checked={state.disabled} onChange={(value) => update("disabled", value)} /></div>
    </SectionCard>;
}
