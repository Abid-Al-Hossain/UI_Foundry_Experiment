"use client";

import React from "react";

export type DownloadFormat = "html" | "react" | "tailwind" | "css-vars";

export default function PreviewDownloadPanel(props: {
  iframeSrcDoc: string;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  handleIframeLoad: () => void;

  downloadFormat: DownloadFormat;
  setDownloadFormat: (v: DownloadFormat) => void;

  downloadName: string;
  setDownloadName: (v: string) => void;

  handleDownload: () => void;
  previewNode?: React.ReactNode;
}) {
  const {
    iframeSrcDoc,
    iframeRef,
    handleIframeLoad,
    downloadFormat,
    setDownloadFormat,
    downloadName,
    setDownloadName,
    handleDownload,
    previewNode,
  } = props;

  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in oklab, var(--surface) 50%, transparent)",
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>
          Preview
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={downloadName}
            onChange={(e) => setDownloadName(e.target.value)}
            placeholder="File name"
            className="w-32 rounded-xl border px-3 py-2 text-sm font-semibold outline-none"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in oklab, var(--card) 70%, transparent)",
              color: "var(--text)",
            }}
          />
          <select
            value={downloadFormat}
            onChange={(e) =>
              setDownloadFormat(e.target.value as DownloadFormat)
            }
            className="rounded-xl border px-3 py-2 text-sm font-semibold outline-none uf-clickable"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in oklab, var(--card) 70%, transparent)",
              color: "var(--text)",
            }}
          >
            <option value="html">HTML</option>
            <option value="react">React</option>
            <option value="tailwind">Tailwind</option>
          </select>
          <button
            onClick={handleDownload}
            className="rounded-xl px-4 py-2 text-sm font-semibold transition uf-clickable hover:opacity-90"
            style={{ background: "var(--primary)", color: "white" }}
          >
            Download
          </button>
        </div>
      </div>

      <div
        className="relative overflow-hidden rounded-2xl border bg-[url('https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/checkerboard_light.png')] dark:bg-[url('https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/checkerboard_dark.png')]"
        style={{ borderColor: "var(--border)", height: 500 }}
      >
        {previewNode ? (
          <div className="h-full w-full flex items-center justify-center p-8">
            {previewNode}
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            onLoad={handleIframeLoad}
            title="Avatar Preview"
            srcDoc={iframeSrcDoc}
            className="h-full w-full border-none"
          />
        )}
      </div>
    </div>
  );
}
