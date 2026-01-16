"use client";

import React from "react";
import { PreviewPanel } from "@/app/components/controls/layout/PreviewPanel";

export type DownloadFormat =
  | "html"
  | "react"
  | "tailwind"
  | "css-vars"
  | "scss"
  | "tailwind-config"
  | "figma-tokens";

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
  // Optional override for React-based previews (Three.js/Framer)
  previewNode?: React.ReactNode;
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
    previewNode,
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
              aria-label="Select download format"
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
          <div className="h-[620px] w-full">
            <PreviewPanel>
              {previewNode ? (
                <div className="h-full w-full flex items-center justify-center">
                  {previewNode}
                </div>
              ) : mounted && iframeSrcDoc ? (
                <iframe
                  ref={iframeRef}
                  onLoad={handleIframeLoad}
                  onFocus={() => {
                    iframeRef.current?.contentWindow?.postMessage(
                      { type: "focus-button" },
                      "*",
                    );
                  }}
                  title="Action Button Preview"
                  sandbox="allow-scripts"
                  srcDoc={iframeSrcDoc}
                  tabIndex={0}
                  className="h-full w-full"
                />
              ) : (
                <div className="h-full w-full" />
              )}
            </PreviewPanel>
          </div>
        </div>

        <div className="mt-4 text-xs" style={{ color: "var(--muted)" }}>
          Tip: If you want the button centered/bottom in preview too, we can add
          a “Preview alignment” control.
        </div>
      </div>
    </div>
  );
}
