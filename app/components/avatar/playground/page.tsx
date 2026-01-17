"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import AppShell from "@/components/layout/AppShell";
import PreviewDownloadPanel, {
  DownloadFormat,
} from "@/app/components/controls/layout/SharedPreviewDownloadPanel";
import { buildAvatarExport } from "./_utils/exportUtils";
import { PREVIEW_SRC_DOC } from "./_utils/avatarPreviewDoc";
import { useHistoryState } from "../../../hooks/useHistoryState";
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
} from "@heroicons/react/24/outline";

// New Sections
const ThreeAvatarSection = dynamic(
  () => import("./_section/ThreeAvatarSection"),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 w-full animate-pulse rounded-xl bg-slate-900/50" />
    ),
  },
);
const MotionSection = dynamic(() => import("./_section/MotionSection"), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full animate-pulse rounded-xl bg-slate-900/50" />
  ),
});

import {
  type ThreeDBadgeMode,
  type ThreeDStatusMode,
} from "./_section/ThreeAvatarSection";

import {
  type MotionEntrance,
  type MotionHover,
} from "./_section/MotionSection";
import AvatarLivePreview from "./_section/AvatarLivePreview";

// --- Types & Initial State ---
type AvatarState = {
  // Basics
  src: string;
  srcSet: string;
  alt: string;
  initials: string;
  objectFit: "cover" | "contain" | "fill" | "none" | "scale-down";
  objectPosition: string;
  // Sizing
  size: string;
  aspectRatio: string;
  radiusMode: "circle" | "rounded" | "square" | "custom";
  radiusValue: number;
  // Style
  borderWidth: number;
  borderColor: string;
  borderStyle: "solid" | "dashed" | "dotted";
  borderOffset: number;
  initialsBg: string;
  initialsColor: string;
  fontFamily: string;
  // Effects
  opacity: number;
  filterGrayscale: number;
  filterBlur: number;
  filterSepia: number;
  filterBrightness: number;
  filterContrast: number;
  // Status
  status: "none" | "online" | "offline" | "busy" | "away";
  statusPosition: "top-right" | "bottom-right" | "bottom-left" | "top-left";
  statusAnimation: "none" | "pulse";
  badgeCount: string;
  // Group
  showGroup: boolean;
  groupSpacing: number;
  groupLimit: number;
  groupDirection: "row" | "column";
  // Interactions
  hoverZoom: boolean;
  hoverGrayscale: boolean;
  // Transformations & 3D
  imageRotation: number;
  imageScale: number;
  effect3D: "none" | "tilt" | "glitch" | "pulse";
  // New 3D & Motion
  // "Presence" Engine
  use3DBadge: ThreeDBadgeMode;
  badgeAnimate: boolean;
  use3DStatus: ThreeDStatusMode;

  // Advanced 3D Accessories
  accessoryType: "none" | "crown" | "halo-cyber" | "orb-float";
  accessoryColor: string;
  orbitSpeed: string;

  // Motion Textures & Effects
  entranceAnimation: MotionEntrance;
  hoverEffect: MotionHover;
  textureEffect: "none" | "glitch" | "fluid" | "glass";
  borderEffect: "none" | "snake" | "heartbeat" | "glow-pulse";
};

const INITIAL_STATE: AvatarState = {
  src: "https://api.dicebear.com/9.x/avataaars/svg?seed=Felix",
  srcSet: "",
  alt: "User Avatar",
  initials: "JD",
  objectFit: "cover",
  objectPosition: "center",
  size: "128px",
  aspectRatio: "1/1",
  radiusMode: "circle",
  radiusValue: 64,
  borderWidth: 0,
  borderColor: "#e2e8f0",
  borderStyle: "solid",
  borderOffset: 0,
  initialsBg: "#e2e8f0",
  initialsColor: "#64748b",
  fontFamily: "sans-serif",
  opacity: 100,
  filterGrayscale: 0,
  filterBlur: 0,
  filterSepia: 0,
  filterBrightness: 100,
  filterContrast: 100,
  status: "none",
  statusPosition: "bottom-right",
  statusAnimation: "none",
  badgeCount: "",
  showGroup: false,
  groupSpacing: -12,
  groupLimit: 5,
  groupDirection: "row",
  hoverZoom: false,
  hoverGrayscale: false,
  imageRotation: 0,
  imageScale: 1,
  effect3D: "none",
  use3DBadge: "none",
  badgeAnimate: true,
  use3DStatus: "none",
  accessoryType: "none",
  accessoryColor: "#facc15",
  orbitSpeed: "1",
  entranceAnimation: "none",
  hoverEffect: "none",
  textureEffect: "none",
  borderEffect: "none",
};

// Sections
import BasicsSection from "./_section/BasicsSection";
import SizingSection from "./_section/SizingSection";
import StyleSection from "./_section/StyleSection";
import StatusSection from "./_section/StatusSection";
import EffectsSection from "./_section/EffectsSection";
import GroupPreviewSection from "./_section/GroupPreviewSection";

import useHydrated from "@/components/hooks/useHydrated";

export default function AvatarPage() {
  const mounted = useHydrated();
  // --- Unified State Management ---
  const {
    state,
    set: updateState,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistoryState<AvatarState>(INITIAL_STATE);

  // Destructure state for easier access
  const {
    src,
    srcSet,
    alt,
    initials,
    objectFit,
    objectPosition,
    size,
    aspectRatio,
    radiusMode,
    radiusValue,
    borderWidth,
    borderColor,
    borderStyle,
    borderOffset,
    initialsBg,
    initialsColor,
    fontFamily,
    opacity,
    filterGrayscale,
    filterBlur,
    filterSepia,
    filterBrightness,
    filterContrast,
    status,
    statusPosition,
    statusAnimation,
    badgeCount,
    showGroup,
    groupSpacing,
    groupLimit,
    groupDirection,
    hoverZoom,
    hoverGrayscale,
    imageRotation,
    imageScale,
    effect3D,
    use3DBadge,
    badgeAnimate,
    use3DStatus,
    accessoryType,
    accessoryColor,
    orbitSpeed,
    entranceAnimation,
    hoverEffect,
    textureEffect,
    borderEffect,
  } = state;

  // -- Proxy Setters for Backward Compatibility --
  const setSrc = (v: any) =>
    updateState((s) => ({ ...s, src: typeof v === "function" ? v(s.src) : v }));
  const setSrcSet = (v: any) =>
    updateState((s) => ({
      ...s,
      srcSet: typeof v === "function" ? v(s.srcSet) : v,
    }));
  const setAlt = (v: any) =>
    updateState((s) => ({ ...s, alt: typeof v === "function" ? v(s.alt) : v }));
  const setInitials = (v: any) =>
    updateState((s) => ({
      ...s,
      initials: typeof v === "function" ? v(s.initials) : v,
    }));
  const setObjectFit = (v: any) =>
    updateState((s) => ({
      ...s,
      objectFit: typeof v === "function" ? v(s.objectFit) : v,
    }));
  const setObjectPosition = (v: any) =>
    updateState((s) => ({
      ...s,
      objectPosition: typeof v === "function" ? v(s.objectPosition) : v,
    }));
  const setSize = (v: any) =>
    updateState((s) => ({
      ...s,
      size: typeof v === "function" ? v(s.size) : v,
    }));
  const setAspectRatio = (v: any) =>
    updateState((s) => ({
      ...s,
      aspectRatio: typeof v === "function" ? v(s.aspectRatio) : v,
    }));
  const setRadiusMode = (v: any) =>
    updateState((s) => ({
      ...s,
      radiusMode: typeof v === "function" ? v(s.radiusMode) : v,
    }));
  const setRadiusValue = (v: any) =>
    updateState((s) => ({
      ...s,
      radiusValue: typeof v === "function" ? v(s.radiusValue) : v,
    }));
  const setBorderWidth = (v: any) =>
    updateState((s) => ({
      ...s,
      borderWidth: typeof v === "function" ? v(s.borderWidth) : v,
    }));
  const setBorderColor = (v: any) =>
    updateState((s) => ({
      ...s,
      borderColor: typeof v === "function" ? v(s.borderColor) : v,
    }));
  const setBorderStyle = (v: any) =>
    updateState((s) => ({
      ...s,
      borderStyle: typeof v === "function" ? v(s.borderStyle) : v,
    }));
  const setBorderOffset = (v: any) =>
    updateState((s) => ({
      ...s,
      borderOffset: typeof v === "function" ? v(s.borderOffset) : v,
    }));
  const setInitialsBg = (v: any) =>
    updateState((s) => ({
      ...s,
      initialsBg: typeof v === "function" ? v(s.initialsBg) : v,
    }));
  const setInitialsColor = (v: any) =>
    updateState((s) => ({
      ...s,
      initialsColor: typeof v === "function" ? v(s.initialsColor) : v,
    }));
  const setFontFamily = (v: any) =>
    updateState((s) => ({
      ...s,
      fontFamily: typeof v === "function" ? v(s.fontFamily) : v,
    }));
  const setOpacity = (v: any) =>
    updateState((s) => ({
      ...s,
      opacity: typeof v === "function" ? v(s.opacity) : v,
    }));
  const setFilterGrayscale = (v: any) =>
    updateState((s) => ({
      ...s,
      filterGrayscale: typeof v === "function" ? v(s.filterGrayscale) : v,
    }));
  const setFilterBlur = (v: any) =>
    updateState((s) => ({
      ...s,
      filterBlur: typeof v === "function" ? v(s.filterBlur) : v,
    }));
  const setFilterSepia = (v: any) =>
    updateState((s) => ({
      ...s,
      filterSepia: typeof v === "function" ? v(s.filterSepia) : v,
    }));
  const setFilterBrightness = (v: any) =>
    updateState((s) => ({
      ...s,
      filterBrightness: typeof v === "function" ? v(s.filterBrightness) : v,
    }));
  const setFilterContrast = (v: any) =>
    updateState((s) => ({
      ...s,
      filterContrast: typeof v === "function" ? v(s.filterContrast) : v,
    }));
  const setStatus = (v: any) =>
    updateState((s) => ({
      ...s,
      status: typeof v === "function" ? v(s.status) : v,
    }));
  const setStatusPosition = (v: any) =>
    updateState((s) => ({
      ...s,
      statusPosition: typeof v === "function" ? v(s.statusPosition) : v,
    }));
  const setStatusAnimation = (v: any) =>
    updateState((s) => ({
      ...s,
      statusAnimation: typeof v === "function" ? v(s.statusAnimation) : v,
    }));
  const setBadgeCount = (v: any) =>
    updateState((s) => ({
      ...s,
      badgeCount: typeof v === "function" ? v(s.badgeCount) : v,
    }));
  const setShowGroup = (v: any) =>
    updateState((s) => ({
      ...s,
      showGroup: typeof v === "function" ? v(s.showGroup) : v,
    }));
  const setGroupSpacing = (v: any) =>
    updateState((s) => ({
      ...s,
      groupSpacing: typeof v === "function" ? v(s.groupSpacing) : v,
    }));
  const setGroupLimit = (v: any) =>
    updateState((s) => ({
      ...s,
      groupLimit: typeof v === "function" ? v(s.groupLimit) : v,
    }));
  const setGroupDirection = (v: any) =>
    updateState((s) => ({
      ...s,
      groupDirection: typeof v === "function" ? v(s.groupDirection) : v,
    }));
  const setHoverZoom = (v: any) =>
    updateState((s) => ({
      ...s,
      hoverZoom: typeof v === "function" ? v(s.hoverZoom) : v,
    }));
  const setHoverGrayscale = (v: any) =>
    updateState((s) => ({
      ...s,
      hoverGrayscale: typeof v === "function" ? v(s.hoverGrayscale) : v,
    }));
  const setImageRotation = (v: any) =>
    updateState((s) => ({
      ...s,
      imageRotation: typeof v === "function" ? v(s.imageRotation) : v,
    }));
  const setImageScale = (v: any) =>
    updateState((s) => ({
      ...s,
      imageScale: typeof v === "function" ? v(s.imageScale) : v,
    }));
  const setEffect3D = (v: any) =>
    updateState((s) => ({
      ...s,
      effect3D: typeof v === "function" ? v(s.effect3D) : v,
    }));
  const setUse3DBadge = (v: any) =>
    updateState((s) => ({
      ...s,
      use3DBadge: typeof v === "function" ? v(s.use3DBadge) : v,
    }));
  const setBadgeAnimate = (v: any) =>
    updateState((s) => ({
      ...s,
      badgeAnimate: typeof v === "function" ? v(s.badgeAnimate) : v,
    }));
  const setUse3DStatus = (v: any) =>
    updateState((s) => ({
      ...s,
      use3DStatus: typeof v === "function" ? v(s.use3DStatus) : v,
    }));
  const setEntranceAnimation = (v: any) =>
    updateState((s) => ({
      ...s,
      entranceAnimation: typeof v === "function" ? v(s.entranceAnimation) : v,
    }));
  const setHoverEffect = (v: any) =>
    updateState((s) => ({
      ...s,
      hoverEffect: typeof v === "function" ? v(s.hoverEffect) : v,
    }));
  const setAccessoryType = (v: any) =>
    updateState((s) => ({
      ...s,
      accessoryType: typeof v === "function" ? v(s.accessoryType) : v,
    }));
  const setAccessoryColor = (v: any) =>
    updateState((s) => ({
      ...s,
      accessoryColor: typeof v === "function" ? v(s.accessoryColor) : v,
    }));
  const setOrbitSpeed = (v: any) =>
    updateState((s) => ({
      ...s,
      orbitSpeed: typeof v === "function" ? v(s.orbitSpeed) : v,
    }));
  const setTextureEffect = (v: any) =>
    updateState((s) => ({
      ...s,
      textureEffect: typeof v === "function" ? v(s.textureEffect) : v,
    }));
  const setBorderEffect = (v: any) =>
    updateState((s) => ({
      ...s,
      borderEffect: typeof v === "function" ? v(s.borderEffect) : v,
    }));

  // --- Layout & Meta State ---
  const [activeSection, setActiveSection] = useState("basics");
  const [isResizing, setIsResizing] = useState(false);
  const splitRef = useRef<HTMLDivElement>(null);
  const [leftPanelWidth, setLeftPanelWidth] = useState(520);
  const [isDesktop, setIsDesktop] = useState(false);

  // Export
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [downloadFormat, setDownloadFormat] = useState<DownloadFormat>("html");
  const [downloadName, setDownloadName] = useState("my-avatar");

  // --- Responsive & Resize Logic ---
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !splitRef.current) return;
      const splitRect = splitRef.current.getBoundingClientRect();
      const newWidth = e.clientX - splitRect.left;
      if (newWidth > 320 && newWidth < splitRect.width - 360) {
        setLeftPanelWidth(newWidth);
      }
    };
    const handleMouseUp = () => setIsResizing(false);
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  // --- Tabs ---
  const sections = [
    { id: "basics", label: "Basics" },
    { id: "sizing", label: "Sizing" },
    { id: "style", label: "Style" },
    { id: "effects", label: "Effects" },
    { id: "3d", label: "3D (New)" },
    { id: "motion", label: "Motion (New)" },
    { id: "status", label: "Status" },
    { id: "group", label: "Group" },
  ];

  // --- Preview Logic (PostMessage) ---
  const getPreviewPayload = () => {
    // Helpers
    let radiusStyle = "";
    if (radiusMode === "circle") radiusStyle = "9999px";
    else if (radiusMode === "square") radiusStyle = "0px";
    else radiusStyle = `${radiusValue}px`;

    const filters = [
      filterGrayscale > 0 ? `grayscale(${filterGrayscale}%)` : "",
      filterBlur > 0 ? `blur(${filterBlur}px)` : "",
      filterSepia > 0 ? `sepia(${filterSepia}%)` : "",
      filterBrightness !== 100 ? `brightness(${filterBrightness}%)` : "",
      filterContrast !== 100 ? `contrast(${filterContrast}%)` : "",
    ]
      .filter(Boolean)
      .join(" ");

    return {
      src,
      srcSet,
      alt,
      initials,
      size,
      radiusStyle,
      initialsBg,
      initialsColor,
      fontFamily,
      borderWidth,
      borderStyle,
      borderColor,
      objectFit,
      objectPosition,
      opacity,
      filters,
      status,
      statusPosition,
      statusAnimation,
      hoverZoom,
      hoverGrayscale,
      groupSpacing,
      groupLimit,
      groupDirection,
      showGroup,
      imageRotation,
      imageScale,
      effect3D,
    };
  };

  const previewPayload = getPreviewPayload();

  // Initial Load Only
  const initialSrcDoc = PREVIEW_SRC_DOC;

  // Live Updates via PostMessage
  useEffect(() => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(previewPayload, "*");
    }
  }, [previewPayload]);

  // --- Export Handler ---
  const getExportParams = () => ({
    src,
    srcSet,
    alt,
    initials,
    objectFit,
    objectPosition,
    size,
    aspectRatio,
    radiusMode,
    radiusValue,
    borderWidth,
    borderColor,
    borderStyle,
    borderOffset,
    shadow: "",
    opacity,
    initialsBg,
    initialsColor,
    fontFamily,
    filterGrayscale,
    filterBlur,
    filterBrightness,
    filterContrast,
    filterSepia,
    status,
    statusPosition,
    statusAnimation,
    badgeCount,
    hoverZoom,
    hoverGrayscale,
    groupSpacing,
    groupLimit,
    groupDirection,
    showGroup,
    imageRotation,
    imageScale,
    effect3D,
    use3DBadge,
    badgeAnimate,
    use3DStatus,
    accessoryType,
    accessoryColor,
    orbitSpeed,
    entranceAnimation,
    hoverEffect,
    textureEffect,
    borderEffect,
    downloadFormat: "html" as const,
    downloadName: "",
  });

  const handleDownload = () => {
    const { filename, content } = buildAvatarExport({
      ...getExportParams(),
      use3DBadge,
      badgeAnimate,
      use3DStatus,
      accessoryType,
      accessoryColor,
      orbitSpeed,
      entranceAnimation,
      hoverEffect,
      textureEffect,
      borderEffect,
      downloadFormat,
      downloadName,
    });
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // --- Section Renderer ---
  const renderActiveSection = () => {
    switch (activeSection) {
      case "basics":
        return (
          <BasicsSection
            src={src}
            setSrc={setSrc}
            alt={alt}
            setAlt={setAlt}
            initials={initials}
            setInitials={setInitials}
            objectFit={objectFit}
            setObjectFit={setObjectFit}
          />
        );
      case "sizing":
        return (
          <SizingSection
            size={size}
            setSize={setSize}
            radiusMode={radiusMode}
            setRadiusMode={setRadiusMode}
            radiusValue={radiusValue}
            setRadiusValue={setRadiusValue}
          />
        );
      case "style":
        return (
          <StyleSection
            borderWidth={borderWidth}
            setBorderWidth={setBorderWidth}
            borderColor={borderColor}
            setBorderColor={setBorderColor}
            borderStyle={borderStyle}
            setBorderStyle={setBorderStyle}
            initialsBg={initialsBg}
            setInitialsBg={setInitialsBg}
            initialsColor={initialsColor}
            setInitialsColor={setInitialsColor}
          />
        );
      case "effects":
        return (
          <EffectsSection
            opacity={opacity}
            setOpacity={setOpacity}
            filterGrayscale={filterGrayscale}
            setFilterGrayscale={setFilterGrayscale}
            filterBlur={filterBlur}
            setFilterBlur={setFilterBlur}
            filterSepia={filterSepia}
            setFilterSepia={setFilterSepia}
            filterBrightness={filterBrightness}
            setFilterBrightness={setFilterBrightness}
            filterContrast={filterContrast}
            setFilterContrast={setFilterContrast}
            imageRotation={imageRotation}
            setImageRotation={setImageRotation}
            imageScale={imageScale}
            setImageScale={setImageScale}
            effect3D={effect3D}
            setEffect3D={setEffect3D}
          />
        );
      case "3d":
        return (
          <ThreeAvatarSection
            use3DBadge={use3DBadge}
            setUse3DBadge={setUse3DBadge}
            badgeAnimate={badgeAnimate}
            setBadgeAnimate={setBadgeAnimate}
            use3DStatus={use3DStatus}
            setUse3DStatus={setUse3DStatus}
            accessoryType={accessoryType as any}
            setAccessoryType={setAccessoryType}
            accessoryColor={accessoryColor}
            setAccessoryColor={setAccessoryColor}
            orbitSpeed={orbitSpeed}
            setOrbitSpeed={setOrbitSpeed}
          />
        );
      case "motion":
        return (
          <MotionSection
            entranceAnimation={entranceAnimation}
            setEntranceAnimation={setEntranceAnimation}
            hoverEffect={hoverEffect}
            setHoverEffect={setHoverEffect}
            textureEffect={textureEffect as any}
            setTextureEffect={setTextureEffect}
            borderEffect={borderEffect as any}
            setBorderEffect={setBorderEffect}
          />
        );
      case "status":
        return (
          <StatusSection
            status={status}
            setStatus={setStatus}
            statusPosition={statusPosition}
            setStatusPosition={setStatusPosition}
            statusAnimation={statusAnimation}
            setStatusAnimation={setStatusAnimation}
            badgeCount={badgeCount}
            setBadgeCount={setBadgeCount}
          />
        );
      case "group":
        return (
          <GroupPreviewSection
            showGroup={showGroup}
            setShowGroup={setShowGroup}
            groupSpacing={groupSpacing}
            setGroupSpacing={setGroupSpacing}
            groupLimit={groupLimit}
            setGroupLimit={setGroupLimit}
            groupDirection={groupDirection}
            setGroupDirection={setGroupDirection}
          />
        );
      default:
        return null;
    }
  };

  // --- Live Preview Node construction ---
  const showLivePreview =
    use3DBadge !== "none" ||
    use3DStatus !== "none" ||
    entranceAnimation !== "none" ||
    hoverEffect !== "none";
  let livePreviewNode = null;

  if (showLivePreview) {
    let radiusStyle = "";
    if (radiusMode === "circle") radiusStyle = "9999px";
    else if (radiusMode === "square") radiusStyle = "0px";
    else radiusStyle = `${radiusValue}px`;

    const containerStyle: React.CSSProperties = {
      width: size,
      height: size,
      borderRadius: radiusStyle,
      borderWidth: `${borderWidth}px`,
      borderStyle: borderStyle as any,
      borderColor: borderColor,
      backgroundColor: initialsBg,
      color: initialsColor,
      fontFamily: fontFamily,
      fontSize: "2rem", // approximate
      // Filters
      filter: `grayscale(${filterGrayscale}%) blur(${filterBlur}px) sepia(${filterSepia}%) brightness(${filterBrightness}%) contrast(${filterContrast}%)`,
      opacity: opacity / 100,
      transform: `rotate(${imageRotation}deg) scale(${imageScale})`,
      // internal layout
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };

    const imageStyle: React.CSSProperties = {
      width: "100%",
      height: "100%",
      objectFit: objectFit as any,
      objectPosition: objectPosition,
      display: "block",
    };

    livePreviewNode = (
      <AvatarLivePreview
        src={src}
        alt={alt}
        initials={initials}
        size={size}
        radiusMode={radiusMode}
        radiusValue={radiusValue}
        borderWidth={borderWidth}
        borderColor={borderColor}
        borderStyle={borderStyle}
        objectFit={objectFit}
        filters=""
        use3DBadge={use3DBadge}
        badgeAnimate={badgeAnimate}
        use3DStatus={use3DStatus}
        accessoryType={accessoryType}
        accessoryColor={accessoryColor}
        orbitSpeed={orbitSpeed}
        entranceAnimation={entranceAnimation}
        hoverEffect={hoverEffect}
        textureEffect={textureEffect}
        borderEffect={borderEffect}
        containerStyle={containerStyle}
        imageStyle={imageStyle}
      />
    );
  }

  return (
    <AppShell contentOverflow="hidden">
      <div
        ref={splitRef}
        className="flex flex-col gap-6 h-full lg:min-h-0 lg:flex-row lg:overflow-hidden"
        style={{ userSelect: isResizing ? "none" : "auto" }}
      >
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
              Avatar
            </h1>
            <div className="flex items-center gap-1">
              <button
                onClick={undo}
                disabled={!canUndo}
                title="Undo (Ctrl+Z)"
                className="rounded-full p-2 transition hover:opacity-80 disabled:opacity-30"
                style={{ color: "var(--text)" }}
              >
                <ArrowUturnLeftIcon className="h-5 w-5" />
              </button>
              <button
                onClick={redo}
                disabled={!canRedo}
                title="Redo (Ctrl+Shift+Z)"
                className="rounded-full p-2 transition hover:opacity-80 disabled:opacity-30"
                style={{ color: "var(--text)" }}
              >
                <ArrowUturnRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div
            className="rounded-2xl border p-3"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in oklab, var(--card) 70%, transparent)",
            }}
          >
            <div
              className="text-xs font-semibold"
              style={{ color: "var(--muted)" }}
            >
              Sections
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {sections.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveSection(s.id)}
                  className="min-h-[52px] w-full rounded-xl border px-4 py-3 text-sm font-semibold leading-snug text-center whitespace-normal break-words uf-clickable"
                  style={{
                    borderColor: "var(--border)",
                    background:
                      activeSection === s.id ? "var(--primary)" : "transparent",
                    color: activeSection === s.id ? "white" : "var(--text)",
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          {renderActiveSection()}
        </div>

        <div className="hidden lg:flex lg:items-stretch" aria-hidden="true">
          <div
            onMouseDown={() => setIsResizing(true)}
            className="h-full w-2 cursor-col-resize rounded-full transition hover:bg-[var(--primary)]"
            style={{
              background: "color-mix(in oklab, var(--border) 80%, transparent)",
            }}
          />
        </div>

        <div
          className="flex-1 lg:min-h-0 lg:overflow-y-auto lg:pb-10 lg:h-full"
          style={{ minWidth: 360 }}
        >
          <div className="sticky top-20">
            <PreviewDownloadPanel
              mounted={mounted}
              iframeSrcDoc={initialSrcDoc}
              iframeRef={iframeRef}
              handleIframeLoad={() => {
                // Send initial sync when iframe loads
                if (iframeRef.current?.contentWindow) {
                  iframeRef.current.contentWindow.postMessage(
                    previewPayload,
                    "*",
                  );
                }
              }}
              downloadFormat={downloadFormat}
              setDownloadFormat={setDownloadFormat}
              downloadName={downloadName}
              setDownloadName={setDownloadName}
              handleDownload={handleDownload}
              previewNode={livePreviewNode}
            />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
