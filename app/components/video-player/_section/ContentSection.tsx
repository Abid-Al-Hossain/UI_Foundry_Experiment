"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Input from "@/app/components/controls/input/Input";
import type { VideoPlayerState } from "../types";

type Props = { state: VideoPlayerState; update: <K extends keyof VideoPlayerState>(key: K, value: VideoPlayerState[K]) => void };

export default function ContentSection({ state, update }: Props) {
  return <SectionCard title="Content" subtitle="Native video source, poster, and caption copy.">
      <div className="space-y-4"><Input label="Video source URL" value={state.src} placeholder="https://example.com/trailer.mp4" onChange={(value) => update("src", value)} />
<Input label="Poster image URL" value={state.poster} placeholder="https://example.com/poster.jpg" onChange={(value) => update("poster", value)} />
<Input label="Caption label" value={state.label} onChange={(value) => update("label", value)} /></div>
    </SectionCard>;
}
