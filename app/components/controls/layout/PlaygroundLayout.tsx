"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/app/components/controls/layout/ScrollArea";

interface PlaygroundLayoutProps {
  title: string;
  headerActions?: React.ReactNode;
  controls: React.ReactNode;
  preview: React.ReactNode;
  defaultLeftDataW?: number;
  minLeftW?: number;
  maxLeftW?: number;
}

const RESIZER_WIDTH = 8;
const COLUMN_GAP = 24;
const RIGHT_MIN_WIDTH = 360;
const DESKTOP_MIN_WIDTH = 760;

export function PlaygroundLayout({
  title,
  headerActions,
  controls,
  preview,
  defaultLeftDataW = 520,
  minLeftW = 320,
  maxLeftW = 900,
}: PlaygroundLayoutProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [leftPanelWidth, setLeftPanelWidth] = useState(defaultLeftDataW);
  const splitRef = useRef<HTMLDivElement>(null);

  const clampLeftWidth = useCallback(
    (width: number, availableWidth: number) => {
      const overhead = RESIZER_WIDTH + COLUMN_GAP * 2;
      const hardMax = availableWidth - RIGHT_MIN_WIDTH - overhead;
      const maximum = Math.max(minLeftW, Math.min(maxLeftW, hardMax));
      return Math.min(Math.max(width, minLeftW), maximum);
    },
    [maxLeftW, minLeftW],
  );

  useEffect(() => {
    const container = splitRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const desktop = width >= DESKTOP_MIN_WIDTH;
      setContainerWidth(width);
      setIsDesktop(desktop);
      if (desktop) {
        setLeftPanelWidth((current) => clampLeftWidth(current || defaultLeftDataW, width));
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [clampLeftWidth, defaultLeftDataW]);

  useEffect(() => {
    if (!isResizing) return;

    const handlePointerMove = (event: PointerEvent) => {
      const splitRect = splitRef.current?.getBoundingClientRect();
      if (!splitRect) return;
      setLeftPanelWidth(clampLeftWidth(event.clientX - splitRect.left, splitRect.width));
    };
    const handlePointerUp = () => setIsResizing(false);

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp, { once: true });
    document.body.style.userSelect = "none";
    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
      document.body.style.userSelect = "";
    };
  }, [clampLeftWidth, isResizing]);

  const separatorMaximum = Math.max(
    minLeftW,
    Math.min(maxLeftW, containerWidth - RIGHT_MIN_WIDTH - RESIZER_WIDTH - COLUMN_GAP * 2),
  );

  const resizeWithKeyboard = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 48 : 16;
    let next = leftPanelWidth;
    if (event.key === "ArrowLeft") next -= step;
    else if (event.key === "ArrowRight") next += step;
    else if (event.key === "Home") next = minLeftW;
    else if (event.key === "End") next = separatorMaximum;
    else return;
    event.preventDefault();
    setLeftPanelWidth(clampLeftWidth(next, containerWidth));
  };

  return (
    <div
      ref={splitRef}
      className={`flex h-full gap-6 ${
        isDesktop
          ? "min-h-0 flex-row overflow-hidden"
          : "flex-col overflow-y-auto"
      }`}
      style={{ "--left-panel-width": `${leftPanelWidth}px` } as React.CSSProperties}
    >
      <ScrollArea
        className={`flex-1 space-y-6 px-4 ${
          isDesktop
            ? "h-full min-h-0 overscroll-contain px-6 pb-10"
            : "pb-6"
        }`}
        style={{
          scrollbarGutter: "stable",
          width: isDesktop ? "var(--left-panel-width, 520px)" : "100%",
          minWidth: isDesktop ? "var(--left-panel-width, 520px)" : "100%",
          flex: "0 0 auto",
        }}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text)" }}>{title}</h1>
          {headerActions ? <div className="flex items-center gap-2">{headerActions}</div> : null}
        </div>
        {controls}
      </ScrollArea>

      {isDesktop ? <div className="flex items-stretch">
        <div
          role="separator"
          aria-label="Resize editor and preview panels"
          aria-orientation="vertical"
          aria-valuemin={minLeftW}
          aria-valuemax={Math.round(separatorMaximum)}
          aria-valuenow={Math.round(leftPanelWidth)}
          tabIndex={0}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            setIsResizing(true);
          }}
          onKeyDown={resizeWithKeyboard}
          className="h-full w-2 cursor-col-resize rounded-full transition-colors hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] dark:hover:bg-slate-700"
          style={{ background: "color-mix(in oklab, var(--border) 80%, transparent)" }}
          title="Drag or use arrow keys to resize panels"
        />
      </div> : null}

      <div
        className={`flex-1 ${isDesktop ? "h-full min-h-0 pb-0" : "min-h-[680px]"}`}
        style={{ minWidth: isDesktop ? RIGHT_MIN_WIDTH : 0 }}
      >
        <div className="h-full w-full">{preview}</div>
      </div>
    </div>
  );
}
