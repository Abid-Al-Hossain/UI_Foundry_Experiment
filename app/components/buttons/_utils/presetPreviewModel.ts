import { SYSTEM_FONTS } from "../_data/buttonConstants";
import { type ActionButtonState } from "../types";
import { buildGradient, clamp, hexWithAlpha, norm } from "./colorUtils";

export type PresetPreviewModel = {
  canvas: string;
  width: string;
  minHeight: string;
  padding: string;
  background: string;
  color: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
  boxShadow: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  letterSpacing: string;
  lineHeight: string;
  topGradient: string;
  backdropFilter: string;
  iconSize: string;
  iconGap: string;
  iconColor: string;
  isHero: boolean;
};

function toLength(value: string, fallback: number) {
  const numeric = Number(value);
  return `${Number.isFinite(numeric) ? numeric : fallback}px`;
}

function getPreviewCanvas(state: ActionButtonState) {
  if (state.previewBgMode === "white") return "#ffffff";
  if (state.previewBgMode === "black") return "#000000";
  return norm(state.previewBgInput).ok ? norm(state.previewBgInput).hex : state.previewBgInput;
}

function getBaseBackground(state: ActionButtonState) {
  if (state.variant !== "solid") return "transparent";
  if (!state.useGradient) {
    return norm(state.bgInput).ok ? norm(state.bgInput).hex : state.bgInput;
  }
  return buildGradient(
    state.gradAngleText,
    state.gradStartInput,
    state.gradMidEnabled,
    state.gradMidInput,
    state.gradEndInput,
  );
}

function getBaseShadow(state: ActionButtonState) {
  const allowOuter = state.variant !== "ghost";
  const layers: string[] = [];
  const shadowColor = norm(state.shColorInput).ok ? norm(state.shColorInput).hex : state.shColorInput;
  const shadowOpacity = clamp(Number(state.shOpacityText) || 0, 0, 1);
  const shadowBase = hexWithAlpha(shadowColor, shadowOpacity);
  const depthPx = clamp(Number(state.depthText) || 0, 0, 40);
  const lightAngleMap: Record<string, number> = {
    "top-left": 225,
    "top-right": 315,
    "bottom-left": 135,
    "bottom-right": 45,
  };
  const rawLightAngle =
    state.lightDirection === "custom"
      ? Number(state.lightAngleText)
      : (lightAngleMap[state.lightDirection] ?? 315);
  const safeLightAngle = Number.isFinite(rawLightAngle) ? rawLightAngle : 315;
  const shadowAngle = (safeLightAngle + 180) % 360;
  const shadowRad = (shadowAngle * Math.PI) / 180;
  const shadowDirX = Math.cos(shadowRad);
  const shadowDirY = Math.sin(shadowRad);
  const buildStackLayer = (
    enabled: boolean,
    xText: string,
    yText: string,
    blurText: string,
    spreadText: string,
    opacityText: string,
  ) => {
    if (!enabled) return null;
    const opacity = clamp(Number(opacityText) || 0, 0, 1);
    return `${Number(xText) || 0}px ${Number(yText) || 0}px ${Number(blurText) || 0}px ${
      Number(spreadText) || 0
    }px ${hexWithAlpha(shadowColor, opacity)}`;
  };

  if (state.shadowEnabled && allowOuter) {
    layers.push(
      `${Number(state.shXText) || 0}px ${Number(state.shYText) || 0}px ${
        Number(state.shBlurText) || 0
      }px ${Number(state.shSpreadText) || 0}px ${shadowBase}`,
    );
  }

  if (state.shadowStackEnabled && allowOuter) {
    const stackLayers = [
      buildStackLayer(
        state.stack1Enabled,
        state.stack1XText,
        state.stack1YText,
        state.stack1BlurText,
        state.stack1SpreadText,
        state.stack1OpacityText,
      ),
      buildStackLayer(
        state.stack2Enabled,
        state.stack2XText,
        state.stack2YText,
        state.stack2BlurText,
        state.stack2SpreadText,
        state.stack2OpacityText,
      ),
      buildStackLayer(
        state.stack3Enabled,
        state.stack3XText,
        state.stack3YText,
        state.stack3BlurText,
        state.stack3SpreadText,
        state.stack3OpacityText,
      ),
    ].filter(Boolean) as string[];
    layers.push(...stackLayers);
  }

  if (depthPx > 0 && allowOuter) {
    const depthOpacity = clamp(0.12 + depthPx / 60, 0.12, 0.4);
    const depthColor = hexWithAlpha(shadowColor, depthOpacity);
    const dx = Math.round(shadowDirX * depthPx);
    const dy = Math.round(shadowDirY * depthPx);
    const blur = Math.round(depthPx * 2);
    layers.push(`${dx}px ${dy}px ${blur}px 0px ${depthColor}`);
  }

  const edgeThicknessPx = clamp(Number(state.edgeThicknessText) || 0, 0, 20);
  if (edgeThicknessPx > 0 && allowOuter) {
    const edgeOpacity = clamp(0.1 + depthPx / 80, 0.08, 0.24);
    const edgeColor = hexWithAlpha(shadowColor, edgeOpacity);
    const edgeX = Math.round(shadowDirX * edgeThicknessPx);
    const edgeY = Math.round(shadowDirY * edgeThicknessPx);
    layers.push(`${edgeX}px ${edgeY}px 0px 0px ${edgeColor}`);
  }

  if (state.baseShadowEnabled) {
    const baseShadowSize = clamp(Number(state.baseShadowSizeText) || 0, 0, 30);
    const baseShadowOpacity = clamp(Number(state.baseShadowOpacityText) || 0, 0, 1);
    if (baseShadowSize > 0 && baseShadowOpacity > 0 && allowOuter) {
      const baseColor = hexWithAlpha(shadowColor, baseShadowOpacity);
      const baseOffset = Math.round(baseShadowSize * 0.6);
      const baseBlur = Math.round(baseShadowSize * 1.8);
      layers.push(`0 ${baseOffset}px ${baseBlur}px 0px ${baseColor}`);
    }
  }

  if (state.rimLightEnabled) {
    const rimLightSize = clamp(Number(state.rimLightSizeText) || 0, 0, 30);
    const rimLightOpacity = clamp(Number(state.rimLightOpacityText) || 0, 0, 1);
    const rimLightColor = norm(state.rimLightColorInput).ok
      ? norm(state.rimLightColorInput).hex
      : state.rimLightColorInput;
    if (rimLightSize > 0 && rimLightOpacity > 0 && allowOuter) {
      layers.push(`0 0 ${rimLightSize}px 0px ${hexWithAlpha(rimLightColor, rimLightOpacity)}`);
    }
  }

  if (state.innerShadowEnabled && depthPx > 0) {
    const insetOpacity = clamp(0.18 + depthPx / 80, 0.15, 0.45);
    const insetColor = hexWithAlpha(shadowColor, insetOpacity);
    const insetOffset = Math.max(2, Math.round(depthPx * 0.4));
    const insetBlur = Math.max(4, Math.round(depthPx * 1.2));
    layers.push(
      `inset ${Math.round(shadowDirX * insetOffset)}px ${Math.round(
        shadowDirY * insetOffset,
      )}px ${insetBlur}px 0px ${insetColor}`,
    );
  }

  if (state.glossEnabled) {
    const glossSize = clamp(Number(state.glossSizeText) || 0, 0, 40);
    const glossOpacity = clamp(Number(state.glossOpacityText) || 0, 0, 1);
    const specularStrength = clamp(Number(state.specularStrengthText) || 0, 0, 1);
    const roughness = clamp(Number(state.roughnessText) || 0, 0, 1);
    const glossBlur = Math.round(glossSize * (1.5 + roughness * 1.5));
    const glossStrength = clamp(
      glossOpacity * specularStrength * (1 - roughness * 0.3),
      0,
      1,
    );

    if (glossSize > 0 && glossStrength > 0) {
      layers.push(
        `inset ${Math.round(-shadowDirX * glossSize)}px ${Math.round(
          -shadowDirY * glossSize,
        )}px ${glossBlur}px 0px rgba(255, 255, 255, ${glossStrength})`,
      );
    }
  }

  if (state.bevelEnabled) {
    const bevelSize = Math.max(0, Number(state.bevelSizeText) || 0);
    const bevelBlur = Math.max(0, Number(state.bevelSoftnessText) || 0);
    if (bevelSize > 0) {
      const bevelX = Math.round(shadowDirX * bevelSize);
      const bevelY = Math.round(shadowDirY * bevelSize);
      layers.push(`inset ${-bevelX}px ${-bevelY}px ${bevelBlur}px 0px rgba(255, 255, 255, 0.35)`);
      layers.push(`inset ${bevelX}px ${bevelY}px ${bevelBlur}px 0px rgba(0, 0, 0, 0.25)`);
    }
  }

  const borderDepthPx = clamp(Number(state.borderDepthSizeText) || 0, 0, 24);
  if (state.borderDepthMode !== "none" && borderDepthPx > 0) {
    const sign = state.borderDepthMode === "raised" ? 1 : -1;
    const bx = Math.round(shadowDirX * borderDepthPx);
    const by = Math.round(shadowDirY * borderDepthPx);
    layers.push(`inset ${-sign * bx}px ${-sign * by}px ${borderDepthPx}px 0px rgba(255, 255, 255, 0.35)`);
    layers.push(`inset ${sign * bx}px ${sign * by}px ${borderDepthPx}px 0px rgba(0, 0, 0, 0.28)`);
  }

  const edgeGradientSizePx = clamp(Number(state.edgeGradientSizeText) || 0, 0, 24);
  const edgeGradientStrength = clamp(Number(state.edgeGradientStrengthText) || 0, 0, 1);
  if (state.edgeGradientEnabled && edgeGradientSizePx > 0 && edgeGradientStrength > 0) {
    const edgeInset = Math.max(1, Math.round(edgeGradientSizePx / 2));
    layers.push(
      `inset 0 ${edgeGradientSizePx}px ${edgeGradientSizePx}px -${edgeInset}px rgba(255, 255, 255, ${edgeGradientStrength})`,
    );
    layers.push(
      `inset 0 -${edgeGradientSizePx}px ${edgeGradientSizePx}px -${edgeInset}px rgba(0, 0, 0, ${edgeGradientStrength * 0.9})`,
    );
  }

  return layers.join(", ") || "none";
}

function getTopGradient(state: ActionButtonState) {
  if (!state.topGradientEnabled) return "none";
  const opacity = clamp(Number(state.topGradOpacityText) || 0.15, 0, 1);
  const topStart = norm(state.topGradStartInput).ok
    ? norm(state.topGradStartInput).hex
    : state.topGradStartInput;
  const topMid = norm(state.topGradMidInput).ok
    ? norm(state.topGradMidInput).hex
    : state.topGradMidInput;
  const topEnd = norm(state.topGradEndInput).ok
    ? norm(state.topGradEndInput).hex
    : state.topGradEndInput;
  return state.topGradMidEnabled
    ? `linear-gradient(${Number(state.topGradAngleText) || 180}deg, ${hexWithAlpha(
        topStart,
        opacity,
      )}, ${hexWithAlpha(topMid, opacity)}, ${hexWithAlpha(topEnd, opacity)})`
    : `linear-gradient(${Number(state.topGradAngleText) || 180}deg, ${hexWithAlpha(
        topStart,
        opacity,
      )}, ${hexWithAlpha(topEnd, opacity)})`;
}

function getFontFamily(state: ActionButtonState) {
  if (state.fontBucket === "google" && state.googleFontFamily) {
    return `"${state.googleFontFamily}", system-ui`;
  }
  return SYSTEM_FONTS[state.systemFontIdx]?.css ?? "Arial, system-ui";
}

function getBackdropFilter(state: ActionButtonState) {
  if (!state.backdropBlurEnabled) return "none";
  const blur = clamp(Number(state.backdropBlurText) || 0, 0, 40);
  return blur > 0 ? `blur(${blur}px)` : "none";
}

export function buildPresetPreviewModel(state: ActionButtonState): PresetPreviewModel {
  return {
    canvas: getPreviewCanvas(state),
    width: toLength(state.widthText, 180),
    minHeight: toLength(state.heightText, 40),
    padding: `${toLength(state.paddingYText, 0)} ${toLength(state.paddingXText, 16)}`,
    background: getBaseBackground(state),
    color: norm(state.textInput).ok ? norm(state.textInput).hex : state.textInput,
    borderColor: norm(state.borderInput).ok ? norm(state.borderInput).hex : state.borderInput,
    borderWidth: toLength(state.borderWidthText, 1),
    borderRadius: `${toLength(state.radiusTLText, 12)} ${toLength(
      state.radiusTRText,
      12,
    )} ${toLength(state.radiusBRText, 12)} ${toLength(state.radiusBLText, 12)}`,
    boxShadow: getBaseShadow(state),
    fontFamily: getFontFamily(state),
    fontSize: toLength(state.fontSizeText, 14),
    fontWeight: state.fontWeight,
    letterSpacing: `${state.letterSpacingText}${state.letterSpacingUnit}`,
    lineHeight: state.lineHeightText || "1",
    topGradient: getTopGradient(state),
    backdropFilter: getBackdropFilter(state),
    iconSize: toLength(state.iconSizeText, 18),
    iconGap: toLength(state.iconGapText, 10),
    iconColor:
      state.iconColorMode === "custom" &&
      (norm(state.iconColorInput).ok ? norm(state.iconColorInput).hex : state.iconColorInput)
        ? norm(state.iconColorInput).ok
          ? norm(state.iconColorInput).hex
          : state.iconColorInput
        : "currentColor",
    isHero: state.widthText === "260" || Number(state.widthText) >= 240,
  };
}
