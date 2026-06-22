import { type SpinnerState } from "../types";

type SpinnerExportResult = {
  content: string;
  filename: string;
};

function indent(value: string, spaces = 2) {
  const prefix = " ".repeat(spaces);
  return value
    .split("\n")
    .map((line) => (line ? `${prefix}${line}` : line))
    .join("\n");
}

function buildSphereDots(radius: number, count = 40) {
  const points: Array<{ x: number; y: number; z: number }> = [];
  const phi = Math.PI * (3 - Math.sqrt(5));

  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / (count - 1)) * 2;
    const ringRadius = Math.sqrt(1 - y * y);
    const theta = phi * index;
    const x = Math.cos(theta) * ringRadius;
    const z = Math.sin(theta) * ringRadius;

    points.push({
      x: Number((x * radius).toFixed(3)),
      y: Number((y * radius).toFixed(3)),
      z: Number((z * radius).toFixed(3)),
    });
  }

  return points;
}

function getReactVariantMarkup(state: SpinnerState) {
  const rainbowStroke = `"url(#ui-spinner-rainbow)"`;
  const gradientStroke = `"url(#ui-spinner-gradient)"`;
  const solidStroke = "color1";
  const strokePaint =
    state.colorMode === "rainbow"
      ? rainbowStroke
      : state.colorMode === "gradient" || state.colorMode === "neon"
        ? gradientStroke
        : solidStroke;

  switch (state.variant) {
    case "circular":
      return `
<div style={{ position: "relative", width: size, height: size, filter: getDropShadow(color1) }}>
  <svg width={size} height={size} viewBox={"0 0 " + size + " " + size} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ui-spinner-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor={color1} />
        <stop offset="100%" stopColor={color2} />
      </linearGradient>
      <linearGradient id="ui-spinner-rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="20%" stopColor="#f97316" />
        <stop offset="40%" stopColor="#eab308" />
        <stop offset="60%" stopColor="#22c55e" />
        <stop offset="80%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>
    <circle
      cx={size / 2}
      cy={size / 2}
      r={(size - thickness) / 2}
      fill="none"
      stroke={trackColor}
      strokeWidth={thickness}
      opacity={trackOpacity}
    />
    <circle
      cx={size / 2}
      cy={size / 2}
      r={(size - thickness) / 2}
      fill="none"
      stroke={${strokePaint}}
      strokeWidth={thickness}
      strokeLinecap={linecap}
      strokeDasharray={2 * Math.PI * ((size - thickness) / 2)}
      strokeDashoffset={2 * Math.PI * ((size - thickness) / 2) * 0.25}
      style={{
        transformOrigin: "center",
        animation: "uiSpinnerSpin " + speed + "ms " + easing + " infinite",
      }}
    />
  </svg>
</div>`;

    case "dots":
      return `
<div
  style={{
    display: "flex",
    gap: gap + "px",
    alignItems: "center",
    justifyContent: "center",
    filter: ${state.gooeyIntensity > 0 ? '"url(#ui-spinner-goo)"' : "getDropShadow(color1)"},
  }}
>
  {Array.from({ length: particleCount }).map((_, index) => (
    <span
      key={index}
      style={{
        display: "block",
        width: dotSize,
        height: dotSize,
        borderRadius: "999px",
        background: getAccentFill(index, particleCount),
        boxShadow: getAccentShadow(index, particleCount),
        animation: "uiSpinnerBounce " + speed + "ms " + easing + " infinite",
        animationDelay: index * dotDelay + "ms",
      }}
    />
  ))}
</div>`;

    case "bars":
      return `
<div
  style={{
    display: "flex",
    gap: gap + "px",
    alignItems: "center",
    justifyContent: "center",
    height: size,
    filter: getDropShadow(color1),
  }}
>
  {Array.from({ length: particleCount }).map((_, index) => (
    <span
      key={index}
      style={{
        display: "block",
        width: barWidth,
        height: size,
        borderRadius: Math.min(barWidth, 4),
        background: getAccentFill(index, particleCount),
        boxShadow: getAccentShadow(index, particleCount),
        animation: "uiSpinnerStretch " + speed + "ms " + easing + " infinite",
        animationDelay: index * dotDelay + "ms",
      }}
    />
  ))}
</div>`;

    case "infinity":
      return `
<div style={{ width: size, height: size / 2 }}>
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ overflow: "visible", filter: getDropShadow(color1) }}
  >
    <defs>
      <linearGradient id="ui-spinner-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor={color1} />
        <stop offset="100%" stopColor={color2} />
      </linearGradient>
      <linearGradient id="ui-spinner-rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="20%" stopColor="#f97316" />
        <stop offset="40%" stopColor="#eab308" />
        <stop offset="60%" stopColor="#22c55e" />
        <stop offset="80%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>
    <path
      d="M50,50 C30,20 0,20 0,50 C0,80 30,80 50,50 C70,20 100,20 100,50 C100,80 70,80 50,50"
      stroke={trackColor}
      strokeOpacity={trackOpacity}
      strokeWidth={thickness}
      strokeLinecap={linecap}
    />
    <path
      d="M50,50 C30,20 0,20 0,50 C0,80 30,80 50,50 C70,20 100,20 100,50 C100,80 70,80 50,50"
      stroke={${strokePaint}}
      strokeWidth={thickness}
      strokeLinecap={linecap}
      strokeDasharray="20 280"
      style={{ animation: "uiSpinnerInfinity " + speed + "ms linear infinite" }}
    />
  </svg>
</div>`;

    case "cube":
      return `
<div style={{ perspective: perspective + "px", width: size, height: size, filter: getDropShadow(color1) }}>
  <div
    style={{
      width: "100%",
      height: "100%",
      position: "relative",
      transformStyle: "preserve-3d",
      animation: "uiSpinnerCube " + speed + "ms linear infinite",
    }}
  >
    {["front", "back", "right", "left", "top", "bottom"].map((face) => {
      const transformMap = {
        front: "translateZ(" + halfSize + "px)",
        back: "rotateY(180deg) translateZ(" + halfSize + "px)",
        right: "rotateY(90deg) translateZ(" + halfSize + "px)",
        left: "rotateY(-90deg) translateZ(" + halfSize + "px)",
        top: "rotateX(90deg) translateZ(" + halfSize + "px)",
        bottom: "rotateX(-90deg) translateZ(" + halfSize + "px)",
      };

      return (
        <span
          key={face}
          style={{
            position: "absolute",
            width: size,
            height: size,
            border: "2px solid " + color1,
            background: colorMode === "gradient" ? getAccentFill(0, 1) : color1 + "20",
            transform: transformMap[face],
          }}
        />
      );
    })}
  </div>
</div>`;

    case "pyramid":
      return `
<div style={{ perspective: perspective + "px", width: size, height: size, filter: getDropShadow(color1) }}>
  <div
    style={{
      width: "100%",
      height: "100%",
      position: "relative",
      transformStyle: "preserve-3d",
      animation: "uiSpinnerPyramid " + speed + "ms linear infinite",
    }}
  >
    {[0, 90, 180, 270].map((angle) => (
      <span
        key={angle}
        style={{
          position: "absolute",
          width: size,
          height: size,
          background: colorMode === "gradient" ? getAccentFill(0, 1) : "linear-gradient(to top, " + color1 + "20, " + color1 + ")",
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          transformOrigin: "bottom center",
          transform: "rotateY(" + angle + "deg) translateZ(" + halfSize + "px) rotateX(30deg)",
        }}
      />
    ))}
  </div>
</div>`;

    case "sphere":
      return `
<div style={{ perspective: perspective + "px", width: size, height: size, filter: getDropShadow(color1) }}>
  <div
    style={{
      width: "100%",
      height: "100%",
      position: "relative",
      transformStyle: "preserve-3d",
      animation: "uiSpinnerSphere " + speed + "ms linear infinite",
    }}
  >
    {sphereDots.map((dot, index) => (
      <span
        key={index}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 4,
          height: 4,
          borderRadius: "999px",
          background: getAccentFill(index, sphereDots.length),
          boxShadow: getAccentShadow(index, sphereDots.length),
          transform: "translate3d(" + dot.x + "px, " + dot.y + "px, " + dot.z + "px)",
        }}
      />
    ))}
  </div>
</div>`;

    case "liquid":
      return `
<div style={{ width: size, height: size, filter: "url(#ui-spinner-goo)" }}>
  <svg style={{ position: "absolute", width: 0, height: 0 }}>
    <defs>
      <filter id="ui-spinner-goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation={gooBlur} result="blur" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
          result="goo"
        />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>
  <div style={{ position: "relative", width: "100%", height: "100%" }}>
    <span
      style={{
        position: "absolute",
        top: "10%",
        left: "35%",
        width: "30%",
        height: "30%",
        borderRadius: "999px",
        background: getAccentFill(0, 2),
        boxShadow: getAccentShadow(0, 2),
        transformOrigin: "center 150%",
        animation: "uiSpinnerLiquid " + speed + "ms linear infinite",
      }}
    />
    <span
      style={{
        position: "absolute",
        bottom: "10%",
        right: "35%",
        width: "40%",
        height: "40%",
        borderRadius: "999px",
        background: getAccentFill(1, 2),
        boxShadow: getAccentShadow(1, 2),
        transformOrigin: "center -100%",
        animation: "uiSpinnerLiquidReverse " + Math.max(280, Math.round(speed * 0.7)) + "ms linear infinite",
      }}
    />
  </div>
</div>`;

    case "glitch":
      return `
<div style={{ position: "relative", width: size, height: size }}>
  {[0, 1, 2].map((layer) => {
    const strokeColor =
      layer === 0 ? color1 : layer === 1 ? "#ef4444" : "#22d3ee";

    return (
      <span
        key={layer}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "999px",
          border: thickness + "px solid transparent",
          borderTopColor: strokeColor,
          borderRightColor: strokeColor,
          opacity: layer === 0 ? 1 : 0.7,
          filter: layer === 0 ? getDropShadow(color1) : "none",
          animation:
            layer === 0 || glitchFrequency === 0
              ? "uiSpinnerSpin " + speed + "ms linear infinite"
              : "uiSpinnerSpin " + speed + "ms linear infinite, uiSpinnerGlitch " + Math.max(120, Math.round(speed * (layer === 1 ? 0.5 : 0.7) * (100 / Math.max(1, glitchFrequency)))) + "ms steps(2) infinite" + (layer === 1 ? " reverse" : ""),
        }}
      />
    );
  })}
</div>`;

    case "quantum":
      return `
<div style={{ perspective: perspective + "px", width: size, height: size, filter: getDropShadow(color1) }}>
  <div
    style={{
      width: "100%",
      height: "100%",
      position: "relative",
      transformStyle: "preserve-3d",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <span
      style={{
        width: nucleusSize,
        height: nucleusSize,
        borderRadius: "999px",
        background: getAccentFill(0, particleCount),
        boxShadow: getAccentShadow(0, particleCount),
        transform: "translateZ(0)",
      }}
    />
    {Array.from({ length: particleCount }).map((_, index) => (
      <span
        key={index}
        style={{
          position: "absolute",
          inset: 0,
          transform: "rotateZ(" + ((180 / particleCount) * index) + "deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <span
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            borderRadius: "999px",
            border: thickness + "px solid " + getAccentFill(index, particleCount),
            borderTopColor: "transparent",
            borderBottomColor: "transparent",
            animation: "uiSpinnerQuantum " + speed + "ms linear infinite",
          }}
        />
      </span>
    ))}
  </div>
</div>`;

    default:
      return `
<div
  style={{
    width: size,
    height: size,
    borderRadius: "999px",
    border: thickness + "px solid " + trackColor,
    borderTopColor: color1,
    boxSizing: "border-box",
    animation: "uiSpinnerSpin " + speed + "ms " + easing + " infinite",
    filter: getDropShadow(color1),
  }}
/>`;
  }
}

function buildReactSpinner(state: SpinnerState) {
  const labelsJson = JSON.stringify(state.labels || [], null, 2);
  const sphereDotsJson = JSON.stringify(buildSphereDots(state.size / 2, 40), null, 2);
  const dotCount = Math.max(1, state.particleCount);
  const dotSize = Math.max(4, (state.size - state.gap * (dotCount - 1)) / dotCount);
  const barWidth = Math.max(4, (state.size - state.gap * (dotCount - 1)) / dotCount);
  const dotDelay = Math.max(40, Math.round(state.speed / Math.max(dotCount, 1) / 2));
  const gooBlur = state.gooeyIntensity > 0 ? 5 + state.gooeyIntensity : 10;

  return `import React from "react";

const labels = ${labelsJson};
const sphereDots = ${sphereDotsJson};

function getLabelStyle(label, color1) {
  const baseStyle = {
    position: "absolute",
    pointerEvents: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    fontWeight: 600,
    color: label.color || color1,
    fontSize: (label.size || 14) + "px",
  };

  switch (label.position) {
    case "top-left":
      return { ...baseStyle, top: 20, left: 20 };
    case "top-center":
      return { ...baseStyle, top: 20, left: "50%", transform: "translateX(-50%)" };
    case "top-right":
      return { ...baseStyle, top: 20, right: 20 };
    case "center-left":
      return { ...baseStyle, top: "50%", left: 20, transform: "translateY(-50%)" };
    case "center":
      return { ...baseStyle, top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    case "center-right":
      return { ...baseStyle, top: "50%", right: 20, transform: "translateY(-50%)" };
    case "bottom-left":
      return { ...baseStyle, bottom: 20, left: 20 };
    case "bottom-center":
      return { ...baseStyle, bottom: 20, left: "50%", transform: "translateX(-50%)" };
    case "bottom-right":
      return { ...baseStyle, bottom: 20, right: 20 };
    default:
      return baseStyle;
  }
}

function renderAnimatedLabel(indicator) {
  switch (indicator) {
    case "rocket":
      return <span style={{ animation: "uiSpinnerLabelBob 900ms ease-in-out infinite" }}>rocket</span>;
    case "walking-person":
      return <span style={{ animation: "uiSpinnerLabelBob 900ms ease-in-out infinite" }}>walk</span>;
    case "spinning-star":
    default:
      return <span style={{ animation: "uiSpinnerLabelSpin 1200ms linear infinite" }}>*</span>;
  }
}

function renderLabelContent(label) {
  if (label.type === "text") {
    return label.text || "";
  }

  if (label.type === "icon") {
    if (label.customSvg) {
      return (
        <span
          style={{
            display: "inline-flex",
            width: (label.size || 20) + "px",
            height: (label.size || 20) + "px",
          }}
          dangerouslySetInnerHTML={{ __html: label.customSvg }}
        />
      );
    }

    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4px 8px",
          borderRadius: "999px",
          border: "1px solid currentColor",
          fontSize: "0.7em",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        {label.iconName || "icon"}
      </span>
    );
  }

  return renderAnimatedLabel(label.animatedIndicator || "none");
}

export default function Spinner() {
  const variant = ${JSON.stringify(state.variant)};
  const size = ${state.size};
  const thickness = ${state.thickness};
  const speed = ${state.speed};
  const gap = ${state.gap};
  const particleCount = ${dotCount};
  const dotSize = ${Number(dotSize.toFixed(3))};
  const barWidth = ${Number(barWidth.toFixed(3))};
  const dotDelay = ${dotDelay};
  const halfSize = size / 2;
  const nucleusSize = size * 0.2;
  const perspective = ${state.perspective};
  const gooBlur = ${gooBlur};
  const glitchFrequency = ${state.glitchFrequency};
  const easing = ${JSON.stringify(state.easing)};
  const linecap = ${JSON.stringify(state.linecap)};
  const colorMode = ${JSON.stringify(state.colorMode)};
  const color1 = ${JSON.stringify(state.color1)};
  const color2 = ${JSON.stringify(state.color2)};
  const trackColor = ${JSON.stringify(state.trackColor)};
  const trackOpacity = ${state.trackOpacity};
  const glowIntensity = ${state.glowIntensity};
  const ariaLabel = ${JSON.stringify(state.label || "Loading")};
  const [isFocused, setIsFocused] = React.useState(false);

  const getRainbowColor = (index, total) => {
    const safeTotal = Math.max(total, 1);
    return "hsl(" + Math.round((360 / safeTotal) * index) + " 90% 60%)";
  };

  const getAccentFill = (index = 0, total = 1) => {
    switch (colorMode) {
      case "gradient":
        return "linear-gradient(135deg, " + color1 + ", " + color2 + ")";
      case "rainbow":
        return getRainbowColor(index, total);
      case "neon":
        return color1;
      default:
        return color1;
    }
  };

  const getAccentShadow = (index = 0, total = 1) => {
    const accentColor = colorMode === "rainbow" ? getRainbowColor(index, total) : color1;

    if (colorMode === "neon") {
      return "0 0 " + Math.max(glowIntensity, 8) + "px " + accentColor + ", 0 0 " + Math.max(glowIntensity * 2, 16) + "px " + color2;
    }

    if (glowIntensity > 0) {
      return "0 0 " + glowIntensity + "px " + accentColor;
    }

    return "none";
  };

  const getDropShadow = (accentColor) => {
    if (colorMode === "neon") {
      return "drop-shadow(0 0 " + Math.max(glowIntensity, 8) + "px " + accentColor + ") drop-shadow(0 0 " + Math.max(glowIntensity * 2, 16) + "px " + color2 + ")";
    }

    if (glowIntensity > 0) {
      return "drop-shadow(0 0 " + glowIntensity + "px " + accentColor + ")";
    }

    return "none";
  };

  const renderSpinner = () => (
${indent(getReactVariantMarkup(state), 4)}
  );

  return (
    <div
      role={${state.ariaHidden} ? undefined : ${JSON.stringify(state.role)}}
      aria-live={${state.ariaHidden} ? undefined : ${JSON.stringify(state.ariaLive)}}
      aria-label={${state.ariaHidden} ? undefined : ariaLabel}
      aria-valuetext={${state.ariaHidden} ? undefined : ${JSON.stringify(state.ariaValueText || undefined)}}
      aria-hidden={${JSON.stringify(state.ariaHidden || undefined)}}
      tabIndex={${state.focusRingEnabled && !state.disabled} ? 0 : undefined}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        minWidth: size + 80,
        minHeight: size + 80,
        opacity: ${state.disabled} ? ${state.disabledOpacity} : 1,
        pointerEvents: ${state.disabled} ? "none" : undefined,
        transition: ${state.transitionDuration > 0 ? `"opacity ${state.transitionDuration}ms ${state.transitionEasing}"` : "undefined"},
        outline: isFocused && ${state.focusRingEnabled} ? \`${state.focusRingWidth}px solid ${state.focusRingColor}\` : undefined,
        outlineOffset: isFocused && ${state.focusRingEnabled} ? ${state.focusRingOffset} : undefined,
      }}
    >
      <style>{\`
        @keyframes uiSpinnerSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes uiSpinnerBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-\${dotSize}px); }
        }

        @keyframes uiSpinnerStretch {
          0%, 100% { transform: scaleY(0.4); opacity: 0.5; }
          50% { transform: scaleY(1); opacity: 1; }
        }

        @keyframes uiSpinnerInfinity {
          to { stroke-dashoffset: -300; }
        }

        @keyframes uiSpinnerCube {
          from { transform: rotateX(0deg) rotateY(0deg); }
          to { transform: rotateX(360deg) rotateY(360deg); }
        }

        @keyframes uiSpinnerPyramid {
          from { transform: rotateY(0deg) rotateX(15deg); }
          to { transform: rotateY(360deg) rotateX(15deg); }
        }

        @keyframes uiSpinnerSphere {
          from { transform: rotateY(0deg) rotateX(0deg); }
          to { transform: rotateY(360deg) rotateX(360deg); }
        }

        @keyframes uiSpinnerLiquid {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes uiSpinnerLiquidReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        @keyframes uiSpinnerGlitch {
          0% { transform: skew(0deg); clip-path: inset(0 0 0 0); }
          20% { transform: skew(-10deg); clip-path: inset(10% 0 40% 0); }
          40% { transform: skew(10deg); clip-path: inset(40% 0 10% 0); }
          60% { transform: skew(-5deg); clip-path: inset(0 0 0 0); }
          80% { transform: skew(5deg); clip-path: inset(50% 0 30% 0); }
          100% { transform: skew(0deg); clip-path: inset(0 0 0 0); }
        }

        @keyframes uiSpinnerQuantum {
          from { transform: rotateX(70deg) rotateY(0deg); }
          to { transform: rotateX(70deg) rotateY(360deg); }
        }

        @keyframes uiSpinnerLabelBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        @keyframes uiSpinnerLabelSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      \`}</style>
      {renderSpinner()}
      {labels.map((label) => (
        <div key={label.id} style={getLabelStyle(label, color1)}>
          {renderLabelContent(label)}
        </div>
      ))}
    </div>
  );
}
`;
}

export function buildSpinnerExport(state: SpinnerState): SpinnerExportResult {
  return {
    content: buildReactSpinner(state),
    filename: `${state.downloadName || "spinner"}.tsx`,
  };
}
