"use client";

import React, { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/app/components/controls/layout/ScrollArea";

interface PlaygroundLayoutProps {
  title: string;
  headerActions?: React.ReactNode;
  controls: React.ReactNode;
  preview: React.ReactNode;
  // Optional config
  defaultLeftDataW?: number;
  minLeftW?: number;
  maxLeftW?: number;
}

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
  const [leftPanelWidth, setLeftPanelWidth] = useState(defaultLeftDataW);
  const splitRef = useRef<HTMLDivElement>(null);

  // Layout overhead the left panel must leave room for when sizing against the
  // container: the resizer handle (w-2 = 8px) + the two `gap-6` column gaps
  // (24px each). Reserve at least this much PLUS the right panel minimum so the
  // Output panel can never be pushed off-screen / clipped by overflow-hidden.
  const RESIZER_W = 8;
  const COLUMN_GAP = 24;
  const RIGHT_MIN_W = 360;
  const LAYOUT_OVERHEAD = RESIZER_W + COLUMN_GAP * 2;

  // Clamp the left panel width so it never exceeds maxLeftW and always leaves
  // the right panel its minimum width within the current container.
  const clampLeftWidth = (width: number, containerWidth: number) => {
    const hardMax = containerWidth - RIGHT_MIN_W - LAYOUT_OVERHEAD;
    const max = Math.max(minLeftW, Math.min(maxLeftW, hardMax));
    return Math.min(Math.max(width, minLeftW), max);
  };

  // Responsive & Resize Logic
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Re-clamp the left width whenever the container can shrink (window resize or
  // entering desktop), so the right panel stays fully visible at all times.
  useEffect(() => {
    if (!isDesktop) return;
    const reclamp = () => {
      const containerWidth = splitRef.current?.getBoundingClientRect().width ?? 0;
      if (!containerWidth) return;
      setLeftPanelWidth((prev) =>
        clampLeftWidth(prev >= minLeftW ? prev : defaultLeftDataW, containerWidth),
      );
    };
    reclamp();
    window.addEventListener("resize", reclamp);
    return () => window.removeEventListener("resize", reclamp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop, minLeftW, maxLeftW, defaultLeftDataW]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !splitRef.current) return;
      const splitRect = splitRef.current.getBoundingClientRect();
      const newWidth = e.clientX - splitRect.left;
      setLeftPanelWidth(clampLeftWidth(newWidth, splitRect.width));
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.userSelect = "";
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResizing, minLeftW, maxLeftW]);

  return (
    <div
      ref={splitRef}
      className="flex flex-col gap-6 h-full overflow-y-auto lg:min-h-0 lg:flex-row lg:overflow-hidden"
      style={
        {
          "--left-panel-width": `${leftPanelWidth}px`,
        } as React.CSSProperties
      }
    >
      {/* Left Column: Controls */}
      <ScrollArea
        className="flex-1 space-y-6 px-4 lg:min-h-0 lg:px-6 lg:pb-10 lg:overscroll-contain lg:h-full"
        style={{
          scrollbarGutter: "stable",
          width: isDesktop ? "var(--left-panel-width, 520px)" : "100%",
          minWidth: isDesktop ? "var(--left-panel-width, 520px)" : "100%",
          flex: "0 0 auto",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ color: "var(--text)" }}
          >
            {title}
          </h1>
          {headerActions && (
            <div className="flex items-center gap-2">{headerActions}</div>
          )}
        </div>

        {/* Controls Content */}
        {controls}
      </ScrollArea>

      {/* Resizer */}
      <div className="hidden lg:flex lg:items-stretch" aria-hidden="true">
        <div
          onMouseDown={() => setIsResizing(true)}
          className="h-full w-2 cursor-col-resize rounded-full transition-colors hover:bg-slate-300 dark:hover:bg-slate-700"
          style={{
            background: "color-mix(in oklab, var(--border) 80%, transparent)",
          }}
          title="Drag to resize panels"
        />
      </div>

      {/* Right Column: Preview */}
      <div
        className="flex-1 lg:min-h-0 lg:pb-0 lg:h-full"
        style={{ minWidth: 360 }}
      >
        <div className="h-full w-full">{preview}</div>
      </div>
    </div>
  );
}
