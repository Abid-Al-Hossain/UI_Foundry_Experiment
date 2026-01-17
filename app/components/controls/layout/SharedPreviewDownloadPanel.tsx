"use client";

import React from "react";
import { PreviewPanel } from "@/app/components/controls/layout/PreviewPanel";
import ExportOptionsControl from "@/app/components/controls/export/ExportOptionsControl";

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

          <ExportOptionsControl
            format={downloadFormat}
            setFormat={setDownloadFormat}
            fileName={downloadName}
            setFileName={setDownloadName}
            onDownload={handleDownload}
          />
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
