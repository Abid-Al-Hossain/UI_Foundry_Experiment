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

  // Responsive & Resize Logic
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Ensure robust width on mode switch
  useEffect(() => {
    if (isDesktop) {
      setLeftPanelWidth((prev) => (prev >= minLeftW ? prev : defaultLeftDataW));
    }
  }, [isDesktop, minLeftW, defaultLeftDataW]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !splitRef.current) return;
      const splitRect = splitRef.current.getBoundingClientRect();
      const newWidth = e.clientX - splitRect.left;

      const safeMax = splitRect.width - 360; // Ensure 360px for right panel
      const actualMax = Math.min(maxLeftW, safeMax);

      if (newWidth > minLeftW && newWidth < actualMax) {
        setLeftPanelWidth(newWidth);
      }
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
