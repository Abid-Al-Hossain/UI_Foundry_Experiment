"use client";

import React from "react";
import { Download, Check, FileCode, Code2 } from "lucide-react";
import Input from "../input/Input";

type ExportOptionsControlProps = {
  fileName: string;
  setFileName: (v: string) => void;

  onDownload: () => void;
  isDownloading?: boolean;
};

export default function ExportOptionsControl({
  fileName,
  setFileName,
  onDownload,
  isDownloading,
}: ExportOptionsControlProps) {
  return (
    <div
      className="flex flex-wrap items-center gap-3 rounded-2xl border p-4"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in oklab, var(--surface) 50%, transparent)",
      }}
    >
      <div className="flex-1 min-w-[200px]">
        <Input
          aria-label="Export filename"
          type="text"
          value={fileName}
          onChange={setFileName}
          placeholder="component-name"
          startContent={<FileCode size={16} />}
        />
      </div>

      <div className="flex items-center gap-2">
        <div
          className="flex h-9 w-[180px] items-center gap-2 rounded-xl border px-3 text-sm font-medium"
          aria-label="Export format: React / JSX"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in oklab, var(--card) 65%, transparent)",
            color: "var(--text)",
          }}
        >
          <Code2 size={16} className="opacity-50" />
          React / JSX
        </div>

        <button
          type="button"
          onClick={onDownload}
          disabled={isDownloading}
          aria-label={isDownloading ? "Downloaded React component" : "Export React component"}
          className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-[var(--on-primary)] transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          style={{
            background: isDownloading
              ? "var(--success, #10b981)"
              : "var(--primary)",
            boxShadow: "0 2px 8px -2px rgba(0,0,0,0.2)",
          }}
        >
          {isDownloading ? (
            <>
              <Check size={16} />
              Downloaded
            </>
          ) : (
            <>
              <Download size={16} />
              Export
            </>
          )}
        </button>
      </div>
    </div>
  );
}
