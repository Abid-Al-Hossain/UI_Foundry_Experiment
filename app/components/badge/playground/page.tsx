"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useDeferredValue,
} from "react";
import AppShell from "@/components/layout/AppShell";
import useHydrated from "@/components/hooks/useHydrated";
import { useHistoryState } from "@/app/hooks/useHistoryState";
import LivePreview from "../_section/LivePreview";
// Fix IDE staleness
import PreviewDownloadPanel from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import type { PreviewCanvasMode } from "@/app/components/controls/layout/PreviewPanel";
import { PlaygroundLayout } from "@/app/components/controls/layout/PlaygroundLayout";
import UndoRedoButtons from "@/app/components/controls/layout/UndoRedoButtons";
import SectionSelector from "@/app/components/controls/layout/SectionSelector";

// --- Sections (we will create these next) ---
import PresetsSection from "../_section/PresetsSection";
import ContentSection from "../_section/ContentSection";
import BadgeStyleSection from "../_section/BadgeStyleSection";
import BadgeColorsSection from "../_section/BadgeColorsSection";
import BadgeSizingSection from "../_section/BadgeSizingSection";
import BadgeTypographySection from "../_section/BadgeTypographySection";
import BadgeMetadataSection from "../_section/BadgeMetadataSection";
import BadgeInteractionSection from "../_section/BadgeInteractionSection";
import BadgeStatesSection from "../_section/BadgeStatesSection";
import BadgeMotionSection from "../_section/BadgeMotionSection";
import StatusSection from "../_section/StatusSection";
import EffectsSection from "../_section/EffectsSection";
import ThreeBadgeSection from "../_section/ThreeBadgeSection";
import BadgeAccessibilitySection from "../_section/BadgeAccessibilitySection";
import { buildBadgeExportPayload } from "../_utils/exportUtils";
import ContrastGuard from "@/app/components/controls/color/ContrastGuard";

// --- Types ---
// --- Types ---
import {
  type BadgeState,
  INITIAL_BADGE_STATE,
} from "../types";

export default function BadgePage() {
  const mounted = useHydrated();
  const [activeSection, setActiveSection] = useState("presets");
  const [previewResetKey, setPreviewResetKey] = useState(0);
  const [previewBgMode, setPreviewBgMode] =
    useState<PreviewCanvasMode>("custom");
  const [previewBgInput, setPreviewBgInput] = useState("#0b1220");

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

  type SetterValue<T> = T | ((prev: T) => T);
  const makeSetter =
    <K extends keyof BadgeState>(key: K) =>
    (value: SetterValue<BadgeState[K]>) => {
      updateState((current) => ({
        ...current,
        [key]:
          typeof value === "function"
            ? (value as (prev: BadgeState[K]) => BadgeState[K])(current[key])
            : value,
      }));
    };

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
    borderStyle,
    disabled,
    disabledOpacity,
    disabledCursor,
    transitionDuration,
    transitionEasing,
    focusRingEnabled,
    focusRingWidth,
    focusRingColor,
    hoverBgColor,
    hoverTextColor,
    letterSpacing,
    textTransform,
    ariaLabel,
    ariaRole,
    ariaLive,
  } = state;

  // -- Setters (typed proxies) --
  const setKey = makeSetter;

  // --- Export Logic ---
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [downloadName, setDownloadName] = useState("badge-component");

  useEffect(() => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(state, "*");
    }
  }, [state]);

  // Refactored Export for Code View
  const exportPayload = useMemo(() => {
    return {
      downloadName: downloadName || "badge-component",
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
      borderStyle,
      disabled,
      disabledOpacity,
      disabledCursor,
      transitionDuration,
      transitionEasing,
      focusRingEnabled,
      focusRingWidth,
      focusRingColor,
      hoverBgColor,
      hoverTextColor,
      letterSpacing,
      textTransform,
      ariaLabel,
      ariaRole,
      ariaLive,
    };
  }, [
    downloadName,
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
    borderStyle,
    disabled,
    disabledOpacity,
    disabledCursor,
    transitionDuration,
    transitionEasing,
    focusRingEnabled,
    focusRingWidth,
    focusRingColor,
    hoverBgColor,
    hoverTextColor,
    letterSpacing,
    textTransform,
    ariaLabel,
    ariaRole,
    ariaLive,
  ]);

  const deferredExportPayload = useDeferredValue(exportPayload);

  const exportCode = useMemo(
    () => buildBadgeExportPayload(deferredExportPayload),
    [deferredExportPayload],
  );

  const handleDownload = () => {
    const { content, filename } = buildBadgeExportPayload(exportPayload);

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
      id: "presets",
      label: "Presets",
      content: (
        <PresetsSection
          state={state}
          applyPreset={(preset) => {
            updateState((current) => ({ ...current, ...preset.state }));
            setPreviewResetKey((value) => value + 1);
          }}
        />
      ),
    },
    {
      id: "metadata",
      label: "Metadata",
      content: (
        <BadgeMetadataSection
          ariaLabel={ariaLabel}
          setAriaLabel={makeSetter("ariaLabel")}
          ariaRole={ariaRole}
          setAriaRole={makeSetter("ariaRole")}
          ariaLive={ariaLive}
          setAriaLive={makeSetter("ariaLive")}
        />
      ),
    },
    {
      id: "content",
      label: "Content",
      content: <ContentSection state={state} setKey={setKey} />,
    },
    {
      id: "styling",
      label: "Styling",
      content: (
        <BadgeStyleSection
          variant={variant}
          setVariant={makeSetter("variant")}
          shape={shape}
          setShape={makeSetter("shape")}
          size={size}
          setSize={makeSetter("size")}
        />
      ),
    },
    {
      id: "colors",
      label: "Colors",
      content: (
        <BadgeColorsSection
          color={color}
          setColor={makeSetter("color")}
          textColor={textColor}
          setTextColor={makeSetter("textColor")}
        />
      ),
    },
    {
      id: "sizing",
      label: "Sizing",
      content: (
        <BadgeSizingSection
          shape={shape}
          paddingX={paddingX}
          setPaddingX={makeSetter("paddingX")}
          paddingY={paddingY}
          setPaddingY={makeSetter("paddingY")}
          borderRadius={borderRadius}
          setBorderRadius={makeSetter("borderRadius")}
          borderWidth={borderWidth}
          setBorderWidth={makeSetter("borderWidth")}
        />
      ),
    },
    {
      id: "typography",
      label: "Typography",
      content: (
        <BadgeTypographySection
          showIcon={showIcon}
          fontSize={fontSize}
          setFontSize={makeSetter("fontSize")}
          iconSize={iconSize}
          setIconSize={makeSetter("iconSize")}
          iconGap={iconGap}
          setIconGap={makeSetter("iconGap")}
        />
      ),
    },
    {
      id: "status",
      label: "Status",
      content: (
        <StatusSection
          showDot={showDot}
          setShowDot={makeSetter("showDot")}
          dotColor={dotColor}
          setDotColor={makeSetter("dotColor")}
          dotPulse={dotPulse}
          setDotPulse={makeSetter("dotPulse")}
        />
      ),
    },
    {
      id: "effects",
      label: "Effects",
      content: (
        <EffectsSection
          gradientEnabled={gradientEnabled}
          setGradientEnabled={makeSetter("gradientEnabled")}
          gradientStart={gradientStart}
          setGradientStart={makeSetter("gradientStart")}
          gradientEnd={gradientEnd}
          setGradientEnd={makeSetter("gradientEnd")}
          gradientAngle={gradientAngle}
          setGradientAngle={makeSetter("gradientAngle")}
          dropShadow={dropShadow}
          setDropShadow={makeSetter("dropShadow")}
          shadowColor={shadowColor}
          setShadowColor={makeSetter("shadowColor")}
          shadowBlur={shadowBlur}
          setShadowBlur={makeSetter("shadowBlur")}
        />
      ),
    },
    {
      id: "interaction",
      label: "Interaction",
      content: (
        <BadgeInteractionSection
          interactive={interactive}
          setInteractive={makeSetter("interactive")}
          dismissible={dismissible}
          setDismissible={makeSetter("dismissible")}
        />
      ),
    },
    {
      id: "states",
      label: "States",
      content: <BadgeStatesSection state={state} makeSetter={makeSetter} />,
    },
    {
      id: "motion",
      label: "Motion",
      content: (
        <BadgeMotionSection
          interactive={interactive}
          hoverScale={hoverScale}
          setHoverScale={makeSetter("hoverScale")}
          clickRipple={clickRipple}
          setClickRipple={makeSetter("clickRipple")}
          icon3DEnabled={icon3DEnabled}
          icon3DSpinSpeed={icon3DSpinSpeed}
          setIcon3DSpinSpeed={makeSetter("icon3DSpinSpeed")}
        />
      ),
    },
    {
      id: "depth",
      label: "Depth",
      content: (
        <ThreeBadgeSection
          use3D={use3D}
          setUse3D={makeSetter("use3D")}
          depth={depth}
          setDepth={makeSetter("depth")}
          tiltEnabled={tiltEnabled}
          setTiltEnabled={makeSetter("tiltEnabled")}
          tiltMax={tiltMax}
          setTiltMax={makeSetter("tiltMax")}
          glareOpacity={glareOpacity}
          setGlareOpacity={makeSetter("glareOpacity")}
          icon3DEnabled={icon3DEnabled}
          setIcon3DEnabled={makeSetter("icon3DEnabled")}
          icon3DGeometry={icon3DGeometry}
          setIcon3DGeometry={makeSetter("icon3DGeometry")}
        />
      ),
    },
    {
      id: "accessibility",
      label: "Accessibility",
      content: (
        <BadgeAccessibilitySection
          ariaRole={ariaRole}
          ariaLive={ariaLive}
          ariaLabel={ariaLabel}
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
      reset={() => {
        reset();
        setPreviewResetKey((value) => value + 1);
      }}
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
      downloadFormat="react"
      setDownloadFormat={() => {}}
      downloadName={downloadName}
      setDownloadName={setDownloadName}
      handleDownload={handleDownload}
      previewBgMode={previewBgMode}
      setPreviewBgMode={setPreviewBgMode}
      previewBgInput={previewBgInput}
      setPreviewBgInput={setPreviewBgInput}
      previewNode={<LivePreview key={previewResetKey} state={state} />}
      code={exportCode.content}
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

<ContrastGuard /></AppShell>
  );
}
