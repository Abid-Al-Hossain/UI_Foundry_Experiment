"use client";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import ColorControl from "@/app/components/controls/color/ColorControl";
import type { FileUploadState } from "../types";

type Props = { state: FileUploadState; update: <K extends keyof FileUploadState>(key: K, value: FileUploadState[K]) => void };

export default function ColorsSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Shell" subtitle="Base container colors.">
      <div className="space-y-4">
        <ColorControl label="Background" value={state.background} onChange={(v) => update("background", v)} />
        <ColorControl label="Foreground" value={state.foreground} onChange={(v) => update("foreground", v)} />
        <ColorControl label="Accent" value={state.accent} onChange={(v) => update("accent", v)} />
        <ColorControl label="Muted" value={state.muted} onChange={(v) => update("muted", v)} />
        <ColorControl label="Border" value={state.border} onChange={(v) => update("border", v)} />
      </div>
    </SectionCard>
      <SectionCard title="Action" subtitle="Primary button and call-to-action text.">
        <ColorControl label="Action text" value={state.actionText} onChange={(v) => update("actionText", v)} />
      </SectionCard>
      <SectionCard title="Dropzone States" subtitle="Idle, hover, and drag-over appearance.">
      <div className="space-y-4">
        <ColorControl label="Background" value={state.dropzoneBg} onChange={(v) => update("dropzoneBg", v)} />
        <ColorControl label="Text" value={state.dropzoneText} onChange={(v) => update("dropzoneText", v)} />
        <ColorControl label="Hover background" value={state.dropzoneHoverBg} onChange={(v) => update("dropzoneHoverBg", v)} />
        <ColorControl label="Hover border" value={state.dropzoneHoverBorder} onChange={(v) => update("dropzoneHoverBorder", v)} />
        <ColorControl label="Drag-active background" value={state.dropzoneActiveBg} onChange={(v) => update("dropzoneActiveBg", v)} />
        <ColorControl label="Drag-active border" value={state.dropzoneActiveBorder} onChange={(v) => update("dropzoneActiveBorder", v)} />
      </div>
    </SectionCard>
      <SectionCard title="Progress & File List" subtitle="Upload progress bar and file list item styling.">
      <div className="space-y-4">
        <ColorControl label="Progress background" value={state.progressBg} onChange={(v) => update("progressBg", v)} />
        <ColorControl label="Progress fill" value={state.progressFill} onChange={(v) => update("progressFill", v)} />
        <ColorControl label="File list background" value={state.fileListBg} onChange={(v) => update("fileListBg", v)} />
        <ColorControl label="File list item border" value={state.fileListItemBorder} onChange={(v) => update("fileListItemBorder", v)} />
        <ColorControl label="Remove icon" value={state.removeIconColor} onChange={(v) => update("removeIconColor", v)} />
      </div>
    </SectionCard>
      <SectionCard title="State Colors" subtitle="Status-driven accent colors.">
      <div className="space-y-4">
        <ColorControl label="Error" value={state.errorColor} onChange={(v) => update("errorColor", v)} />
        <ColorControl label="Success" value={state.successColor} onChange={(v) => update("successColor", v)} />
      </div>
    </SectionCard>
    </div>
  );
}
