"use client";

import React, { useState, useRef, useEffect } from "react";
import AppShell from "@/components/layout/AppShell";
import useHydrated from "@/components/hooks/useHydrated";
import { useHistoryState } from "../../../hooks/useHistoryState";
import LivePreview from "../_section/LivePreview";
// Fix IDE staleness
import PreviewDownloadPanel, {
  DownloadFormat,
} from "../../buttons/action/_section/PreviewDownloadPanel";

// --- Sections (we will create these next) ---
import ContentSection from "../_section/ContentSection";
import AppearanceSection from "../_section/AppearanceSection";
import StatusSection from "../_section/StatusSection";
import EffectsSection from "../_section/EffectsSection";
import ThreeBadgeSection from "../_section/ThreeBadgeSection";
import { buildBadgeExportPayload } from "../_utils/exportUtils";

// --- Types ---
// --- Types ---
import {
  type BadgeVariant,
  type BadgeShape,
  type BadgeSize,
  type BadgeIconPosition,
  type BadgeState,
  INITIAL_BADGE_STATE,
} from "../types";

export default function BadgePage() {
  const mounted = useHydrated();
  // Layout & Resize State
  const [activeSection, setActiveSection] = useState("basics");
  const [isDesktop, setIsDesktop] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(520);
  const splitRef = useRef<HTMLDivElement>(null);

  // Unified History State
  const {
    state,
    set: updateState,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistoryState<BadgeState>(INITIAL_BADGE_STATE);

  // Destructure for easier passing
  const {
    label,
    count,
    showIcon,
    iconName,
    iconPosition,
    variant,
    shape,
    size,
    color,
    textColor,
    paddingX,
    paddingY,
    fontSize,
    borderRadius,
    borderWidth,
    showDot,
    dotColor,
    dotPulse,
    gradientEnabled,
    gradientStart,
    gradientEnd,
    gradientAngle,
    dropShadow,
    shadowColor,
    shadowBlur,
    use3D,
    depth,
    tiltEnabled,
    tiltMax,
    glareOpacity,
    icon3DEnabled,
    icon3DGeometry,
    icon3DSpinSpeed,
    dismissible,
    interactive,
    hoverScale,
    clickRipple,
  } = state;

  // -- Setters (Boilerplate Proxies) --
  // I'll create a helper or just define them inline in sections for brevity if possible,
  // but sticking to your pattern:
  const setLabel = (v: any) =>
    updateState((s) => ({
      ...s,
      label: typeof v === "function" ? v(s.label) : v,
    }));
  const setCount = (v: any) =>
    updateState((s) => ({
      ...s,
      count: typeof v === "function" ? v(s.count) : v,
    }));
  const setShowIcon = (v: any) =>
    updateState((s) => ({
      ...s,
      showIcon: typeof v === "function" ? v(s.showIcon) : v,
    }));
  const setIconName = (v: any) =>
    updateState((s) => ({
      ...s,
      iconName: typeof v === "function" ? v(s.iconName) : v,
    }));
  const setIconPosition = (v: any) =>
    updateState((s) => ({
      ...s,
      iconPosition: typeof v === "function" ? v(s.iconPosition) : v,
    }));

  const setVariant = (v: any) =>
    updateState((s) => ({
      ...s,
      variant: typeof v === "function" ? v(s.variant) : v,
    }));
  const setShape = (v: any) =>
    updateState((s) => ({
      ...s,
      shape: typeof v === "function" ? v(s.shape) : v,
    }));
  const setSize = (v: any) =>
    updateState((s) => ({
      ...s,
      size: typeof v === "function" ? v(s.size) : v,
    }));
  const setColor = (v: any) =>
    updateState((s) => ({
      ...s,
      color: typeof v === "function" ? v(s.color) : v,
    }));
  const setTextColor = (v: any) =>
    updateState((s) => ({
      ...s,
      textColor: typeof v === "function" ? v(s.textColor) : v,
    }));

  const setPaddingX = (v: any) =>
    updateState((s) => ({
      ...s,
      paddingX: typeof v === "function" ? v(s.paddingX) : v,
    }));
  const setPaddingY = (v: any) =>
    updateState((s) => ({
      ...s,
      paddingY: typeof v === "function" ? v(s.paddingY) : v,
    }));
  const setFontSize = (v: any) =>
    updateState((s) => ({
      ...s,
      fontSize: typeof v === "function" ? v(s.fontSize) : v,
    }));
  const setBorderRadius = (v: any) =>
    updateState((s) => ({
      ...s,
      borderRadius: typeof v === "function" ? v(s.borderRadius) : v,
    }));
  const setBorderWidth = (v: any) =>
    updateState((s) => ({
      ...s,
      borderWidth: typeof v === "function" ? v(s.borderWidth) : v,
    }));

  const setShowDot = (v: any) =>
    updateState((s) => ({
      ...s,
      showDot: typeof v === "function" ? v(s.showDot) : v,
    }));
  const setDotColor = (v: any) =>
    updateState((s) => ({
      ...s,
      dotColor: typeof v === "function" ? v(s.dotColor) : v,
    }));
  const setDotPulse = (v: any) =>
    updateState((s) => ({
      ...s,
      dotPulse: typeof v === "function" ? v(s.dotPulse) : v,
    }));

  const setGradientEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      gradientEnabled: typeof v === "function" ? v(s.gradientEnabled) : v,
    }));
  const setGradientStart = (v: any) =>
    updateState((s) => ({
      ...s,
      gradientStart: typeof v === "function" ? v(s.gradientStart) : v,
    }));
  const setGradientEnd = (v: any) =>
    updateState((s) => ({
      ...s,
      gradientEnd: typeof v === "function" ? v(s.gradientEnd) : v,
    }));
  const setGradientAngle = (v: any) =>
    updateState((s) => ({
      ...s,
      gradientAngle: typeof v === "function" ? v(s.gradientAngle) : v,
    }));
  const setDropShadow = (v: any) =>
    updateState((s) => ({
      ...s,
      dropShadow: typeof v === "function" ? v(s.dropShadow) : v,
    }));
  const setShadowColor = (v: any) =>
    updateState((s) => ({
      ...s,
      shadowColor: typeof v === "function" ? v(s.shadowColor) : v,
    }));
  const setShadowBlur = (v: any) =>
    updateState((s) => ({
      ...s,
      shadowBlur: typeof v === "function" ? v(s.shadowBlur) : v,
    }));

  const setUse3D = (v: any) =>
    updateState((s) => ({
      ...s,
      use3D: typeof v === "function" ? v(s.use3D) : v,
    }));
  const setDepth = (v: any) =>
    updateState((s) => ({
      ...s,
      depth: typeof v === "function" ? v(s.depth) : v,
    }));
  const setTiltEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      tiltEnabled: typeof v === "function" ? v(s.tiltEnabled) : v,
    }));
  const setTiltMax = (v: any) =>
    updateState((s) => ({
      ...s,
      tiltMax: typeof v === "function" ? v(s.tiltMax) : v,
    }));
  const setGlareOpacity = (v: any) =>
    updateState((s) => ({
      ...s,
      glareOpacity: typeof v === "function" ? v(s.glareOpacity) : v,
    }));

  const setIcon3DEnabled = (v: any) =>
    updateState((s) => ({
      ...s,
      icon3DEnabled: typeof v === "function" ? v(s.icon3DEnabled) : v,
    }));
  const setIcon3DGeometry = (v: any) =>
    updateState((s) => ({
      ...s,
      icon3DGeometry: typeof v === "function" ? v(s.icon3DGeometry) : v,
    }));
  const setIcon3DSpinSpeed = (v: any) =>
    updateState((s) => ({
      ...s,
      icon3DSpinSpeed: typeof v === "function" ? v(s.icon3DSpinSpeed) : v,
    }));

  const setDismissible = (v: any) =>
    updateState((s) => ({
      ...s,
      dismissible: typeof v === "function" ? v(s.dismissible) : v,
    }));
  const setInteractive = (v: any) =>
    updateState((s) => ({
      ...s,
      interactive: typeof v === "function" ? v(s.interactive) : v,
    }));
  const setHoverScale = (v: any) =>
    updateState((s) => ({
      ...s,
      hoverScale: typeof v === "function" ? v(s.hoverScale) : v,
    }));
  const setClickRipple = (v: any) =>
    updateState((s) => ({
      ...s,
      clickRipple: typeof v === "function" ? v(s.clickRipple) : v,
    }));

  // --- Resize Handler ---
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !splitRef.current) return;
      const newWidth =
        e.clientX - splitRef.current.getBoundingClientRect().left;
      // Clamping
      if (newWidth > 320 && newWidth < 900) {
        setLeftPanelWidth(newWidth);
      }
    };
    const handleMouseUp = () => setIsResizing(false);
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none";
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
    };
  }, [isResizing]);

  // --- Export Logic ---
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [downloadFormat, setDownloadFormat] = useState<DownloadFormat>("html");
  const [downloadName, setDownloadName] = useState("badge-component");

  const previewPayload = { ...state };

  useEffect(() => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(previewPayload, "*");
    }
  }, [previewPayload]);

  // ... (inside component)

  const handleDownload = () => {
    const { content, filename } = buildBadgeExportPayload({
      downloadFormat,
      downloadName,
      ...state,
    });

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const sectionItems = [
    {
      id: "content",
      label: "Content",
      content: (
        <ContentSection
          label={label}
          setLabel={setLabel}
          count={count}
          setCount={setCount}
          showIcon={showIcon}
          setShowIcon={setShowIcon}
          iconName={iconName}
          setIconName={setIconName}
          iconPosition={iconPosition}
          setIconPosition={setIconPosition}
          dismissible={dismissible}
          setDismissible={setDismissible}
        />
      ),
    },
    {
      id: "appearance",
      label: "Appearance",
      content: (
        <AppearanceSection
          variant={variant}
          setVariant={setVariant}
          shape={shape}
          setShape={setShape}
          size={size}
          setSize={setSize}
          color={color}
          setColor={setColor}
          textColor={textColor}
          setTextColor={setTextColor}
          paddingX={paddingX}
          setPaddingX={setPaddingX}
          paddingY={paddingY}
          setPaddingY={setPaddingY}
          fontSize={fontSize}
          setFontSize={setFontSize}
          borderRadius={borderRadius}
          setBorderRadius={setBorderRadius}
          borderWidth={borderWidth}
          setBorderWidth={setBorderWidth}
        />
      ),
    },
    {
      id: "status",
      label: "Status & Dot",
      content: (
        <StatusSection
          showDot={showDot}
          setShowDot={setShowDot}
          dotColor={dotColor}
          setDotColor={setDotColor}
          dotPulse={dotPulse}
          setDotPulse={setDotPulse}
        />
      ),
    },
    {
      id: "effects",
      label: "Effects",
      content: (
        <EffectsSection
          gradientEnabled={gradientEnabled}
          setGradientEnabled={setGradientEnabled}
          gradientStart={gradientStart}
          setGradientStart={setGradientStart}
          gradientEnd={gradientEnd}
          setGradientEnd={setGradientEnd}
          gradientAngle={gradientAngle}
          setGradientAngle={setGradientAngle}
          dropShadow={dropShadow}
          setDropShadow={setDropShadow}
          shadowColor={shadowColor}
          setShadowColor={setShadowColor}
          shadowBlur={shadowBlur}
          setShadowBlur={setShadowBlur}
          interactive={interactive}
          setInteractive={setInteractive}
          hoverScale={hoverScale}
          setHoverScale={setHoverScale}
          clickRipple={clickRipple}
          setClickRipple={setClickRipple}
        />
      ),
    },
    {
      id: "3d",
      label: "3D Engine",
      content: (
        <ThreeBadgeSection
          use3D={use3D}
          setUse3D={setUse3D}
          depth={depth}
          setDepth={setDepth}
          tiltEnabled={tiltEnabled}
          setTiltEnabled={setTiltEnabled}
          tiltMax={tiltMax}
          setTiltMax={setTiltMax}
          glareOpacity={glareOpacity}
          setGlareOpacity={setGlareOpacity}
          icon3DEnabled={icon3DEnabled}
          setIcon3DEnabled={setIcon3DEnabled}
          icon3DGeometry={icon3DGeometry}
          setIcon3DGeometry={setIcon3DGeometry}
          icon3DSpinSpeed={icon3DSpinSpeed}
          setIcon3DSpinSpeed={setIcon3DSpinSpeed}
        />
      ),
    },
  ];

  const activePanel =
    sectionItems.find((item) => item.id === activeSection) ?? sectionItems[0];

  // --- Render ---
  return (
    <AppShell contentOverflow="hidden">
      {/* Layout: Fixed height container with independent scrolling columns */}
      <div
        ref={splitRef}
        className="flex flex-col gap-6 h-full lg:min-h-0 lg:flex-row lg:overflow-hidden"
        style={{ userSelect: isResizing ? "none" : "auto" }}
      >
        {/* Left Column: Controls */}
        <div
          className="flex-1 space-y-6 px-4 lg:min-h-0 lg:overflow-y-auto lg:px-6 lg:pb-10 lg:overscroll-contain lg:h-full"
          style={{
            scrollbarGutter: "stable",
            ...(isDesktop ? { width: leftPanelWidth, flex: "0 0 auto" } : null),
          }}
        >
          <div className="flex items-center justify-between">
            <h1
              className="text-2xl font-bold tracking-tight"
              style={{ color: "var(--text)" }}
            >
              Badge Studio
            </h1>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={undo}
                disabled={!canUndo}
                className="flex items-center justify-center p-2 rounded-lg border transition-all"
                style={{
                  borderColor: "var(--border)",
                  color: canUndo ? "var(--text)" : "var(--muted)",
                  opacity: canUndo ? 1 : 0.5,
                  cursor: canUndo ? "pointer" : "not-allowed",
                  background: canUndo ? "var(--card)" : "transparent",
                }}
                title="Undo (Ctrl+Z)"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 7v6h6" />
                  <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
                </svg>
              </button>
              <button
                type="button"
                onClick={redo}
                disabled={!canRedo}
                className="flex items-center justify-center p-2 rounded-lg border transition-all"
                style={{
                  borderColor: "var(--border)",
                  color: canRedo ? "var(--text)" : "var(--muted)",
                  opacity: canRedo ? 1 : 0.5,
                  cursor: canRedo ? "pointer" : "not-allowed",
                  background: canRedo ? "var(--card)" : "transparent",
                }}
                title="Redo (Ctrl+Y)"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 7v6h-6" />
                  <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" />
                </svg>
              </button>
            </div>
          </div>

          {/* Section Tabs */}
          <div
            className="rounded-2xl border p-3"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in oklab, var(--card) 70%, transparent)",
            }}
          >
            <div
              className="text-xs font-semibold mb-3"
              style={{ color: "var(--muted)" }}
            >
              Sections
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {sectionItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className="min-h-[52px] w-full rounded-xl border px-4 py-3 text-sm font-semibold leading-snug text-center whitespace-normal break-words uf-clickable transition-all"
                  style={{
                    borderColor: "var(--border)",
                    background:
                      activePanel?.id === item.id
                        ? "var(--primary)"
                        : "transparent",
                    color:
                      activePanel?.id === item.id ? "white" : "var(--text)",
                    boxShadow:
                      activePanel?.id === item.id
                        ? "0 4px 12px var(--primary-shadow)"
                        : "none",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {activePanel?.content}
        </div>

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
          className="flex-1 lg:min-h-0 lg:overflow-y-auto lg:pb-10 lg:h-full"
          style={{ minWidth: 360 }}
        >
          <div className="sticky top-20 px-6">
            <PreviewDownloadPanel
              mounted={mounted}
              iframeSrcDoc=""
              iframeRef={iframeRef}
              handleIframeLoad={() => {}}
              downloadFormat={downloadFormat}
              setDownloadFormat={setDownloadFormat}
              downloadName={downloadName}
              setDownloadName={setDownloadName}
              handleDownload={handleDownload}
              previewNode={<LivePreview state={state} />}
            />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
