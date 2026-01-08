"use client";

import React from "react";

export type DownloadFormat =
  | "html"
  | "react"
  | "tailwind"
  | "css-vars"
  | "scss"
  | "tailwind-config"
  | "figma-tokens";

export default function PreviewDownloadPanel(props: {
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
          <div
            className="text-sm font-semibold"
            style={{ color: "var(--text)" }}
          >
            Preview
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              value={downloadName}
              onChange={(e) => setDownloadName(e.target.value)}
              placeholder="File name"
              className="min-w-[160px] flex-1 rounded-xl border px-3 py-2 text-sm font-semibold outline-none"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--card) 70%, transparent)",
                color: "var(--text)",
              }}
              aria-label="Download file name"
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
              <option value="css-vars">CSS Variables</option>
              <option value="scss">SCSS</option>
              <option value="tailwind-config">Tailwind Config</option>
              <option value="figma-tokens">Figma Tokens</option>
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
            <iframe
              ref={iframeRef}
              onLoad={handleIframeLoad}
              title="Avatar Preview"
              sandbox="allow-scripts"
              srcDoc={iframeSrcDoc}
              className="h-[400px] w-full rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
