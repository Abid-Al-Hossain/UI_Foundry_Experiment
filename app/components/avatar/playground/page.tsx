"use client";

import React, { useState, useRef, useEffect } from "react";
import AppShell from "@/components/layout/AppShell";
import PreviewDownloadPanel, {
  DownloadFormat,
} from "./_section/PreviewDownloadPanel";
import { buildAvatarExport } from "./_utils/exportUtils";
import { PREVIEW_SRC_DOC } from "./_utils/avatarPreviewDoc";

// Sections
import BasicsSection from "./_section/BasicsSection";
import SizingSection from "./_section/SizingSection";
import StyleSection from "./_section/StyleSection";
import StatusSection from "./_section/StatusSection";
import EffectsSection from "./_section/EffectsSection";
import GroupPreviewSection from "./_section/GroupPreviewSection";

export default function AvatarPage() {
  // --- State Inventory (Massive) ---

  // Basics
  const [src, setSrc] = useState("https://i.pravatar.cc/300");
  const [srcSet, setSrcSet] = useState("");
  const [alt, setAlt] = useState("User Avatar");
  const [initials, setInitials] = useState("JD");
  const [objectFit, setObjectFit] = useState<
    "cover" | "contain" | "fill" | "none" | "scale-down"
  >("cover");
  const [objectPosition, setObjectPosition] = useState("center");

  // Sizing
  const [size, setSize] = useState("128px");
  const [aspectRatio, setAspectRatio] = useState("1/1");
  const [radiusMode, setRadiusMode] = useState<
    "circle" | "rounded" | "square" | "custom"
  >("circle");
  const [radiusValue, setRadiusValue] = useState(64);

  // Style
  const [borderWidth, setBorderWidth] = useState(0);
  const [borderColor, setBorderColor] = useState("#e2e8f0");
  const [borderStyle, setBorderStyle] = useState<"solid" | "dashed" | "dotted">(
    "solid"
  );
  const [borderOffset, setBorderOffset] = useState(0);
  const [initialsBg, setInitialsBg] = useState("#f1f5f9");
  const [initialsColor, setInitialsColor] = useState("#64748b");
  const [fontFamily, setFontFamily] = useState("sans-serif");

  // Effects
  const [opacity, setOpacity] = useState(100);
  const [filterGrayscale, setFilterGrayscale] = useState(0);
  const [filterBlur, setFilterBlur] = useState(0);
  const [filterSepia, setFilterSepia] = useState(0);
  const [filterBrightness, setFilterBrightness] = useState(100);
  const [filterContrast, setFilterContrast] = useState(100);

  // Status
  const [status, setStatus] = useState<
    "none" | "online" | "offline" | "busy" | "away"
  >("none");
  const [statusPosition, setStatusPosition] = useState<
    "top-right" | "bottom-right" | "bottom-left" | "top-left"
  >("bottom-right");
  const [statusAnimation, setStatusAnimation] = useState<"none" | "pulse">(
    "none"
  );
  const [badgeCount, setBadgeCount] = useState("");

  // Group
  const [showGroup, setShowGroup] = useState(false);
  const [groupSpacing, setGroupSpacing] = useState(-12);
  const [groupLimit, setGroupLimit] = useState(5);
  const [groupDirection, setGroupDirection] = useState<"row" | "column">("row");

  // Interactions
  const [hoverZoom, setHoverZoom] = useState(false);
  const [hoverGrayscale, setHoverGrayscale] = useState(false);

  // Transformations & 3D
  const [imageRotation, setImageRotation] = useState(0);
  const [imageScale, setImageScale] = useState(1);
  const [effect3D, setEffect3D] = useState<
    "none" | "tilt" | "glitch" | "pulse"
  >("none");

  // Filters (Missing in state view previously? check if they exist or I need to add them too?)
  // Checking file content: I saw filterGrayscale usage but not definition in lines 60-160?
  // I should check if filterGrayscale is defined.
  // Wait, I'll add them if missing.
  // usage in getPreviewPayload suggests they exist or are expected.
  // I will assume filters exist or add if I see they are missing.
  // The ERROR was imageRotation.
  // I will just add imageRotation block.

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
    downloadFormat: "html" as const,
    downloadName: "",
  });

  const handleDownload = () => {
    const { filename, content } = buildAvatarExport({
      ...getExportParams(),
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
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ color: "var(--text)" }}
          >
            Avatar
          </h1>
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
              iframeSrcDoc={initialSrcDoc}
              iframeRef={iframeRef}
              handleIframeLoad={() => {
                // Send initial sync when iframe loads
                if (iframeRef.current?.contentWindow) {
                  iframeRef.current.contentWindow.postMessage(
                    previewPayload,
                    "*"
                  );
                }
              }}
              downloadFormat={downloadFormat}
              setDownloadFormat={setDownloadFormat}
              downloadName={downloadName}
              setDownloadName={setDownloadName}
              handleDownload={handleDownload}
            />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
