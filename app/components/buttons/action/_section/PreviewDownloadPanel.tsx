"use client";

import React from "react";

export type DownloadFormat = "html" | "react" | "tailwind";

export default function PreviewDownloadPanel(props: {
  mounted: boolean;

  iframeSrcDoc: string;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  handleIframeLoad: () => void;

  downloadFormat: DownloadFormat;
  setDownloadFormat: (v: DownloadFormat) => void;

  downloadName: string;
  setDownloadName: (v: string) => void;

  handleDownload: () => void;
}) {
  const {
    mounted,
    iframeSrcDoc,
    iframeRef,
    handleIframeLoad,
    downloadFormat,
    setDownloadFormat,
    downloadName,
    setDownloadName,
    handleDownload,
  } = props;

  return (
    <div className="lg:overflow-auto lg:pl-2">
      <div
        className="rounded-2xl border p-5"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in oklab, var(--surface) 80%, transparent)",
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>
            Preview
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <input
              value={downloadName}
              onChange={(e) => setDownloadName(e.target.value)}
              placeholder="File name"
              className="min-w-[160px] flex-1 rounded-xl border px-3 py-2 text-sm font-semibold outline-none uf-clickable"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--card) 70%, transparent)",
                color: "var(--text)",
              }}
              aria-label="Download file name"
            />

            <select
              value={downloadFormat}
              onChange={(e) => setDownloadFormat(e.target.value as DownloadFormat)}
              className="rounded-xl border px-3 py-2 text-sm font-semibold outline-none uf-clickable"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--card) 70%, transparent)",
                color: "var(--text)",
              }}
              aria-label="Select download format"
            >
              <option value="html">HTML</option>
              <option value="react">React</option>
              <option value="tailwind">Tailwind</option>
            </select>

            <button
              onClick={handleDownload}
              className="rounded-xl px-4 py-2 text-sm font-semibold transition uf-clickable"
              style={{ background: "var(--primary)", color: "white" }}
            >
              Download
            </button>
          </div>
        </div>

        <div className="mt-4">
          <div
            className="rounded-2xl border"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in oklab, var(--card) 70%, transparent)",
            }}
          >
            {mounted && iframeSrcDoc ? (
              <iframe
                ref={iframeRef}
                onLoad={handleIframeLoad}
                onFocus={() => {
                  iframeRef.current?.contentWindow?.postMessage({ type: "focus-button" }, "*");
                }}
                title="Action Button Preview"
                sandbox="allow-scripts"
                srcDoc={iframeSrcDoc}
                tabIndex={0}
                className="h-[620px] w-full rounded-2xl"
              />
            ) : (
              <div className="h-[620px] w-full rounded-2xl" />
            )}
          </div>
        </div>

        <div className="mt-4 text-xs" style={{ color: "var(--muted)" }}>
          Tip: If you want the button centered/bottom in preview too, we can add a “Preview alignment” control.
        </div>
      </div>
    </div>
  );
}
