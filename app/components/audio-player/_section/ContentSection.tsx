"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Input from "@/app/components/controls/input/Input";
import type { AudioPlayerState } from "../types";

type Props = { state: AudioPlayerState; update: <K extends keyof AudioPlayerState>(key: K, value: AudioPlayerState[K]) => void };

export default function ContentSection({ state, update }: Props) {
  return <SectionCard title="Content" subtitle="Native audio source and transcript copy.">
      <div className="space-y-4"><Input label="Audio source URL" value={state.src} placeholder="https://example.com/episode.mp3" onChange={(value) => update("src", value)} />
<Input label="Transcript label" value={state.transcriptLink} onChange={(value) => update("transcriptLink", value)} /></div>
    </SectionCard>;
}
