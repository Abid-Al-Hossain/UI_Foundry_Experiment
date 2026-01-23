"use client";

import React, { useMemo } from "react";
import type { ImageState } from "../types";

interface LivePreviewProps {
  state: ImageState;
}

export default function LivePreview({ state }: LivePreviewProps) {
  // Build filter string
  const filterString = useMemo(() => {
    const filters: string[] = [];

    if (state.brightness !== "100")
      filters.push(`brightness(${state.brightness}%)`);
    if (state.contrast !== "100") filters.push(`contrast(${state.contrast}%)`);
    if (state.saturation !== "100")
      filters.push(`saturate(${state.saturation}%)`);
    if (state.grayscale !== "0") filters.push(`grayscale(${state.grayscale}%)`);
    if (state.sepia !== "0") filters.push(`sepia(${state.sepia}%)`);
    if (state.hueRotate !== "0")
      filters.push(`hue-rotate(${state.hueRotate}deg)`);
    if (state.invert !== "0") filters.push(`invert(${state.invert}%)`);
    if (state.blur !== "0") filters.push(`blur(${state.blur}px)`);
    if (state.filterOpacity !== "100")
      filters.push(`opacity(${state.filterOpacity}%)`);

    if (state.dropShadowEnabled) {
      filters.push(
        `drop-shadow(${state.dropShadowX}px ${state.dropShadowY}px ${state.dropShadowBlur}px ${state.dropShadowColor})`,
      );
    }

    return filters.length > 0 ? filters.join(" ") : "none";
  }, [state]);

  // Build transform string
  const transformString = useMemo(() => {
    const transforms: string[] = [];

    const scaleXVal = state.flipHorizontal
      ? -parseFloat(state.scaleX)
      : parseFloat(state.scaleX);
    const scaleYVal = state.flipVertical
      ? -parseFloat(state.scaleY)
      : parseFloat(state.scaleY);

    if (scaleXVal !== 1 || scaleYVal !== 1) {
      transforms.push(`scale(${scaleXVal}, ${scaleYVal})`);
    }
    if (state.rotate !== "0") transforms.push(`rotate(${state.rotate}deg)`);
    if (state.translateX !== "0" || state.translateY !== "0") {
      transforms.push(
        `translate(${state.translateX}px, ${state.translateY}px)`,
      );
    }
    if (state.skewX !== "0") transforms.push(`skewX(${state.skewX}deg)`);
    if (state.skewY !== "0") transforms.push(`skewY(${state.skewY}deg)`);

    // 3D transforms
    if (state.rotateX !== "0") transforms.push(`rotateX(${state.rotateX}deg)`);
    if (state.rotateY !== "0") transforms.push(`rotateY(${state.rotateY}deg)`);
    if (state.rotateZ !== "0") transforms.push(`rotateZ(${state.rotateZ}deg)`);

    return transforms.length > 0 ? transforms.join(" ") : "none";
  }, [state]);

  // Build border radius
  const borderRadius = useMemo(() => {
    if (state.borderRadiusMode === "uniform") {
      return `${state.borderRadiusUniform}px`;
    }
    return `${state.borderRadiusTL}px ${state.borderRadiusTR}px ${state.borderRadiusBR}px ${state.borderRadiusBL}px`;
  }, [state]);

  // Build clip-path
  const clipPath = useMemo(() => {
    if (state.clipPathShape === "none") return "none";
    if (state.clipPathShape === "circle") return "circle(50% at 50% 50%)";
    if (state.clipPathShape === "ellipse") return "ellipse(50% 50% at 50% 50%)";
    if (state.clipPathShape === "polygon") {
      // Hexagon as default
      return "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
    }
    if (state.clipPathShape === "inset") return "inset(10% round 10px)";
    return "none";
  }, [state.clipPathShape]);

  // Build box shadow
  const boxShadow = useMemo(() => {
    if (!state.boxShadowEnabled) return "none";
    const inset = state.boxShadowInset ? "inset " : "";
    return `${inset}${state.boxShadowX}px ${state.boxShadowY}px ${state.boxShadowBlur}px ${state.boxShadowSpread}px ${state.boxShadowColor}`;
  }, [state]);

  // Build mask (for vignette or gradient fade)
  const maskImage = useMemo(() => {
    if (state.maskType === "none") return "none";

    if (state.maskType === "linear-gradient") {
      const start = `rgba(0,0,0,${parseInt(state.maskStartOpacity) / 100})`;
      const end = `rgba(0,0,0,${parseInt(state.maskEndOpacity) / 100})`;
      return `linear-gradient(${state.maskAngle}deg, ${start}, ${end})`;
    }

    if (state.maskType === "radial-gradient") {
      const start = `rgba(0,0,0,${parseInt(state.maskStartOpacity) / 100})`;
      const end = `rgba(0,0,0,${parseInt(state.maskEndOpacity) / 100})`;
      return `radial-gradient(circle, ${start} 0%, ${end} 100%)`;
    }

    if (state.maskType === "vignette" && state.vignetteEnabled) {
      const intensity = parseInt(state.vignetteIntensity) / 100;
      const softness = parseInt(state.vignetteSoftness);
      return `radial-gradient(circle, transparent ${softness}%, ${state.vignetteColor} ${100 - intensity * 20}%)`;
    }

    return "none";
  }, [state]);

  // Compute dimensions
  const widthValue =
    state.widthUnit === "auto" ? "auto" : `${state.width}${state.widthUnit}`;
  const heightValue =
    state.heightUnit === "auto" ? "auto" : `${state.height}${state.heightUnit}`;

  const aspectRatioValue =
    state.aspectRatio === "custom"
      ? `${state.customAspectWidth} / ${state.customAspectHeight}`
      : state.aspectRatio === "none"
        ? "auto"
        : state.aspectRatio;

  // Container styles
  const containerStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-block",
    perspective: state.perspective !== "0" ? `${state.perspective}px` : "none",
  };

  // Image wrapper for overlay/duotone
  const wrapperStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-block",
  };

  // Main image styles
  const imageStyle: React.CSSProperties = {
    width: widthValue,
    height: heightValue,
    aspectRatio: aspectRatioValue,
    objectFit: state.objectFit,
    objectPosition: `${state.objectPositionX}% ${state.objectPositionY}%`,
    filter: filterString,
    transform: transformString,
    transformOrigin: state.transformOrigin,
    borderRadius,
    clipPath,
    border:
      state.borderWidth !== "0"
        ? `${state.borderWidth}px ${state.borderStyle} ${state.borderColor}`
        : "none",
    boxShadow,
    mixBlendMode: state.mixBlendMode as any,
    maskImage: maskImage !== "none" ? maskImage : undefined,
    WebkitMaskImage: maskImage !== "none" ? maskImage : undefined,
    transition:
      state.hoverEffect !== "none"
        ? `all ${state.hoverDuration}ms ease`
        : undefined,
  };

  // Overlay styles
  const overlayStyle: React.CSSProperties = state.overlayEnabled
    ? {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: state.overlayColor,
        opacity: parseInt(state.overlayOpacity) / 100,
        mixBlendMode: state.overlayBlendMode as any,
        pointerEvents: "none",
        borderRadius,
        clipPath,
      }
    : {};

  // Vignette overlay (alternative to mask)
  const vignetteStyle: React.CSSProperties =
    state.vignetteEnabled && state.maskType === "none"
      ? {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `radial-gradient(circle, transparent ${state.vignetteSoftness}%, ${state.vignetteColor} 100%)`,
          opacity: parseInt(state.vignetteIntensity) / 100,
          pointerEvents: "none",
          borderRadius,
          clipPath,
        }
      : {};

  return (
    <div style={containerStyle}>
      <div style={wrapperStyle}>
        <img
          src={state.src}
          alt={state.alt}
          loading={state.loading}
          style={imageStyle}
          className="image-preview"
        />
        {state.overlayEnabled && <div style={overlayStyle} />}
        {state.vignetteEnabled && state.maskType === "none" && (
          <div style={vignetteStyle} />
        )}
      </div>
    </div>
  );
}
