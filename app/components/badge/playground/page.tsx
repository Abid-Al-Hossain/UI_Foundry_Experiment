"use client";

import React, { useState, useRef, useEffect } from "react";
import AppShell from "@/components/layout/AppShell";
import useHydrated from "@/components/hooks/useHydrated";
import { useHistoryState } from "../../../hooks/useHistoryState";
import LivePreview from "../_section/LivePreview";
// Fix IDE staleness
import PreviewDownloadPanel, {
  DownloadFormat,
} from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import { ScrollArea } from "@/app/components/controls/layout/ScrollArea";
import { PlaygroundLayout } from "@/app/components/controls/layout/PlaygroundLayout";
import UndoRedoButtons from "@/app/components/controls/layout/UndoRedoButtons";
import SectionSelector from "@/app/components/controls/layout/SectionSelector";

// --- Sections (we will create these next) ---
import ContentSection from "../_section/ContentSection";
import AppearanceSection from "../_section/AppearanceSection";
import StatusSection from "../_section/StatusSection";
import EffectsSection from "../_section/EffectsSection";
import ThreeBadgeSection from "../_section/ThreeBadgeSection";
import BadgeAccessibilitySection from "./_section/BadgeAccessibilitySection";
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
  const [activeSection, setActiveSection] = useState("basics");

  // Unified History State
  const {
    state,
    set: updateState,
    undo,
    redo,
    reset,
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
    iconGap,
    iconSize,
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
    ariaLabel,
    ariaRole,
    ariaLive,
  } = state;

  // -- Setters (Boilerplate Proxies) --
  const setKey = (key: string) => (v: any) => {
    updateState((s) => ({
      ...s,
      [key]: typeof v === "function" ? v(s[key as keyof BadgeState]) : v,
    }));
  };

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
  const setIconGap = (v: any) =>
    updateState((s) => ({
      ...s,
      iconGap: typeof v === "function" ? v(s.iconGap) : v,
    }));
  const setIconSize = (v: any) =>
    updateState((s) => ({
      ...s,
      iconSize: typeof v === "function" ? v(s.iconSize) : v,
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
  const setAriaLabel = (v: any) =>
    updateState((s) => ({
      ...s,
      ariaLabel: typeof v === "function" ? v(s.ariaLabel) : v,
    }));
  const setAriaRole = (v: any) =>
    updateState((s) => ({
      ...s,
      ariaRole: typeof v === "function" ? v(s.ariaRole) : v,
    }));
  const setAriaLive = (v: any) =>
    updateState((s) => ({
      ...s,
      ariaLive: typeof v === "function" ? v(s.ariaLive) : v,
    }));

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
      content: <ContentSection state={state} setKey={setKey} />,
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
    {
      id: "a11y",
      label: "A11y",
      content: (
        <BadgeAccessibilitySection
          ariaLabel={ariaLabel}
          setAriaLabel={setAriaLabel}
          ariaRole={ariaRole}
          setAriaRole={setAriaRole}
          ariaLive={ariaLive}
          setAriaLive={setAriaLive}
          label={label}
          count={count}
        />
      ),
    },
  ];

  const activePanel =
    sectionItems.find((item) => item.id === activeSection) ?? sectionItems[0];

  // --- Render ---
  const headerActions = (
    <UndoRedoButtons
      undo={undo}
      redo={redo}
      reset={reset}
      canUndo={canUndo}
      canRedo={canRedo}
    />
  );

  const controls = (
    <>
      <SectionSelector
        sections={sectionItems}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {activePanel?.content}
    </>
  );

  const preview = (
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
  );

  return (
    <AppShell contentOverflow="hidden">
      <PlaygroundLayout
        title="Badge Studio"
        headerActions={headerActions}
        controls={controls}
        preview={preview}
      />
    </AppShell>
  );
}
