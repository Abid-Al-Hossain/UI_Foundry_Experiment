"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Switch from "@/app/components/controls/input/Switch";
import Select from "@/app/components/controls/input/Select";
import type { VideoPlayerState } from "../types";

type Props = { state: VideoPlayerState; update: <K extends keyof VideoPlayerState>(key: K, value: VideoPlayerState[K]) => void };

export default function BehaviorSection({ state, update }: Props) {
  return <SectionCard title="Behavior" subtitle="Native video controls and playback defaults.">
      <div className="space-y-4"><Select label="Preload" value={state.preload} options={["none", "metadata", "auto"]} onChange={(value) => update("preload", value)} />
<Select label="Object fit" value={state.objectFit} options={["cover", "contain", "fill", "scale-down"]} onChange={(value) => update("objectFit", value)} />
<Switch label="Captions track" checked={state.showCaptions} onChange={(value) => update("showCaptions", value)} />
<Switch label="Autoplay" checked={state.autoplay} onChange={(value) => update("autoplay", value)} />
<Switch label="Loop" checked={state.loop} onChange={(value) => update("loop", value)} />
<Switch label="Muted" checked={state.muted} onChange={(value) => update("muted", value)} />
<Switch label="Disabled" checked={state.disabled} onChange={(value) => update("disabled", value)} /></div>
    </SectionCard>;
}
