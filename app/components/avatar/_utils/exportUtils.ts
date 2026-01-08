export type AvatarExportInput = {
  // Basics
  src: string;
  srcSet: string;
  alt: string;
  initials: string;
  objectFit: "cover" | "contain" | "fill" | "none" | "scale-down";
  objectPosition: string; // e.g. "center", "top left"

  // Sizing & Shape
  size: string; // px or rem or tailwind class logic handling
  aspectRatio: string; // "1/1", "4/3", etc.
  radiusMode: "circle" | "rounded" | "square" | "custom";
  radiusValue: number; // px

  // Styling
  borderWidth: number;
  borderColor: string;
  borderStyle: "solid" | "dashed" | "dotted";
  borderOffset: number; // ring offset
  shadow: string; // class or value
  opacity: number;
  initialsBg: string;
  initialsColor: string;
  fontFamily: string;

  // Filters (0-100 or specific values)
  filterGrayscale: number;
  filterBlur: number; // px
  filterBrightness: number;
  filterContrast: number;
  filterSepia: number;

  // Status & Badge
  status: "none" | "online" | "offline" | "busy" | "away";
  statusPosition: "top-right" | "bottom-right" | "bottom-left" | "top-left";
  statusAnimation: "none" | "pulse";
  badgeCount: string; // "5", "99+", or empty

  // Interactions
  hoverZoom: boolean;
  hoverGrayscale: boolean; // toggle grayscale on hover

  // Meta
  downloadFormat:
    | "html"
    | "react"
    | "tailwind"
    | "css-vars"
    | "scss"
    | "tailwind-config"
    | "figma-tokens";
  downloadName: string;
};

export function buildAvatarExport(params: AvatarExportInput) {
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
    shadow,
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
    downloadFormat,
    downloadName,
  } = params;

  let content = "";
  const filenameBase = downloadName || "avatar";

  // --- Helper: Radius ---
  let radiusStyle = "";
  let twRadius = "";
  if (radiusMode === "circle") {
    radiusStyle = "9999px";
    twRadius = "rounded-full";
  } else if (radiusMode === "square") {
    radiusStyle = "0px";
    twRadius = "rounded-none";
  } else {
    radiusStyle = `${radiusValue}px`;
    twRadius = `rounded-[${radiusValue}px]`;
  }

  // --- Helper: Status Indicator ---
  const getStatusColor = (s: string) => {
    switch (s) {
      case "online":
        return "#22c55e"; // green-500
      case "offline":
        return "#94a3b8"; // slate-400
      case "busy":
        return "#ef4444"; // red-500
      case "away":
        return "#eab308"; // yellow-500
      default:
        return "transparent";
    }
  };

  const statusColor = getStatusColor(status);

  // Position logic
  const statusPosStyle =
    {
      "top-right": "top: 0; right: 0;",
      "bottom-right": "bottom: 0; right: 0;",
      "bottom-left": "bottom: 0; left: 0;",
      "top-left": "top: 0; left: 0;",
    }[statusPosition] || "bottom: 0; right: 0;";

  const twStatusPos =
    {
      "top-right": "-top-1 -right-1",
      "bottom-right": "-bottom-1 -right-1",
      "bottom-left": "-bottom-1 -left-1",
      "top-left": "-top-1 -left-1", // Tweaked for visual overlap
    }[statusPosition] || "-bottom-1 -right-1";

  // --- CSS Generation ---
  const filters = [
    filterGrayscale > 0 ? `grayscale(${filterGrayscale}%)` : "",
    filterBlur > 0 ? `blur(${filterBlur}px)` : "",
    filterSepia > 0 ? `sepia(${filterSepia}%)` : "",
    filterBrightness !== 100 ? `brightness(${filterBrightness}%)` : "",
    filterContrast !== 100 ? `contrast(${filterContrast}%)` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const transitionStyle = "transition: all 0.3s ease;";
  const hoverStyles = [];
  if (hoverZoom) hoverStyles.push("transform: scale(1.1);");
  if (hoverGrayscale) hoverStyles.push("filter: grayscale(0%);"); // Assume it starts grayscale or toggles

  // Container Styles
  const containerStyle = [
    `width: ${size}; height: ${size};`, // simplistic for now, assuming px or valid unit passed
    `position: relative;`,
    `display: inline-block;`,
    `opacity: ${opacity / 100};`,
    // If not img, apply radius to container
    !src ? `border-radius: ${radiusStyle};` : "",
    !src ? `background-color: ${initialsBg};` : "",
  ]
    .filter(Boolean)
    .join(" ");

  // Image/Content Styles
  const imgStyle = [
    `width: 100%; height: 100%;`,
    `object-fit: ${objectFit};`,
    `object-position: ${objectPosition};`,
    borderWidth > 0
      ? `border: ${borderWidth}px ${borderStyle} ${borderColor};`
      : "",
    filters ? `filter: ${filters};` : "",
    transitionStyle,
  ].join(" ");

  // Status Styles
  const badgeStyle = [
    `position: absolute;`,
    statusPosStyle,
    `width: ${parseInt(size) * 0.25}px; height: ${
      parseInt(size) * 0.25
    }px; min-width: 12px; min-height: 12px;`,
    `background-color: ${statusColor};`,
    `border: 2px solid white;`,
    `border-radius: 50%;`,
    statusAnimation === "pulse" ? "animation: pulse 2s infinite;" : "",
    `box-sizing: border-box;`,
  ].join(" ");

  const initialsStyle = [
    `width: 100%; height: 100%;`,
    `display: flex; align-items: center; justify-content: center;`,
    `color: ${initialsColor};`,
    `font-family: ${fontFamily};`,
    `font-size: calc(${size} * 0.4);`,
    `font-weight: 600;`,
  ].join(" ");

  // --- Tailwind Class Generation ---
  // Using arbitrary values for precision to match the editor exactly
  const twClasses = [
    `w-[${size}] h-[${size}]`,
    "relative inline-block",
    `opacity-[${opacity / 100}]`,
    hoverZoom ? "hover:scale-110 transition-transform duration-300" : "",
    filters !== "" ? `[filter:${filters.replace(/\s+/g, "_")}]` : "", // Arbitrary filter if complex
  ]
    .filter(Boolean)
    .join(" ");

  const twFilters = [
    filterGrayscale > 0 ? `grayscale-[${filterGrayscale}%]` : "",
    filterBlur > 0 ? `blur-[${filterBlur}px]` : "",
    filterSepia > 0 ? `sepia-[${filterSepia}%]` : "",
    filterBrightness !== 100 ? `brightness-[${filterBrightness}%]` : "",
    filterContrast !== 100 ? `contrast-[${filterContrast}%]` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const twImgClasses = [
    "w-full h-full",
    `object-${objectFit}`,
    `object-[${objectPosition.replace(" ", "-")}]`,
    twRadius,
    borderWidth > 0
      ? `border-[${borderWidth}px] border-[${borderColor}] border-${borderStyle}`
      : "",
    twFilters,
    "transition-all duration-300",
  ]
    .filter(Boolean)
    .join(" ");

  // --- HTML Output ---
  if (downloadFormat === "html") {
    let mainContent = "";
    if (src) {
      mainContent = `<img src="${src}" srcset="${
        srcSet || ""
      }" alt="${alt}" style="${imgStyle}" />`;
    } else {
      mainContent = `<div style="${initialsStyle}">${initials}</div>`;
    }

    let statusBadge = "";
    if (status !== "none") {
      statusBadge = `<span style="${badgeStyle}"></span>`;
    }

    const pulseKeyframes =
      statusAnimation === "pulse"
        ? `
    <style>
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7); }
        70% { box-shadow: 0 0 0 6px rgba(0, 0, 0, 0); }
        100% { box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); }
      }
    </style>`
        : "";

    content = `
${pulseKeyframes}
<div class="avatar-container" style="${containerStyle}">
  ${mainContent}
  ${statusBadge}
</div>`;
  }

  // --- React Output ---
  else if (downloadFormat === "react") {
    const componentName = filenameBase
      .replace(/[^a-zA-Z]/g, " ")
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("");

    content = `export default function ${componentName}() {
  return (
    <div className="relative inline-block" style={{ width: '${size}', height: '${size}', opacity: ${
      opacity / 100
    } }}>
      ${
        src
          ? `
      <img 
        src="${src}" 
        alt="${alt}"
        className="transition-all duration-300 ${
          hoverZoom ? "hover:scale-110" : ""
        }"
        style={{
          width: '100%',
          height: '100%',
          objectFit: '${objectFit}',
          objectPosition: '${objectPosition}',
          borderRadius: '${radiusStyle}',
          border: '${borderWidth}px ${borderStyle} ${borderColor}',
          filter: '${filters}'
        }}
      />`
          : `
      <div 
        style={{
          width: '100%', 
          height: '100%',
          borderRadius: '${radiusStyle}',
          backgroundColor: '${initialsBg}',
          color: '${initialsColor}',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '${fontFamily}',
          fontWeight: 600,
          border: '${borderWidth}px ${borderStyle} ${borderColor}'
        }}
      >
        <span style={{ fontSize: 'calc(${size} * 0.4)' }}>${initials}</span>
      </div>`
      }
      
      {/* Status Indicator */}
      ${
        status !== "none"
          ? `
      <span 
        className="${statusAnimation === "pulse" ? "animate-pulse" : ""}"
        style={{
          position: 'absolute',
          ${statusPosStyle.replace(/;/g, ",").replace(/:/g, ": ")}
          width: '25%',
          height: '25%',
          minWidth: '12px',
          minHeight: '12px',
          backgroundColor: '${statusColor}',
          borderRadius: '50%',
          border: '2px solid white',
          boxSizing: 'border-box'
        }}
      />`
          : ""
      }
    </div>
  );
}`;
  }

  // --- CSS Variables ---
  else if (downloadFormat === "css-vars") {
    content = `:root {
  /* Dimensions & Shape */
  --avatar-size: ${size};
  --avatar-radius: ${radiusStyle};
  
  /* Borders */
  --avatar-border-width: ${borderWidth}px;
  --avatar-border-color: ${borderColor};
  --avatar-border-style: ${borderStyle};
  
  /* Fallback / Initials */
  --avatar-initials-bg: ${initialsBg};
  --avatar-initials-color: ${initialsColor};
  --avatar-font: ${fontFamily};
  
  /* Effects */
  --avatar-opacity: ${opacity / 100};
  --avatar-filter: ${filters || "none"};
  
  /* Status */
  --avatar-status-color: ${statusColor};
  --avatar-status-pos: ${statusPosStyle};
}`;
  }

  // --- SCSS ---
  else if (downloadFormat === "scss") {
    content = `// Variables
$avatar-size: ${size};
$avatar-radius: ${radiusStyle};
$avatar-border: ${borderWidth}px ${borderStyle} ${borderColor};
$avatar-opacity: ${opacity / 100};
$avatar-filter: ${filters || "none"};

// Status
$avatar-status-color: ${statusColor};

.avatar {
  width: $avatar-size;
  height: $avatar-size;
  border-radius: $avatar-radius;
  position: relative;
  display: inline-block;
  opacity: $avatar-opacity;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: ${objectFit};
    object-position: ${objectPosition};
    border: $avatar-border;
    border-radius: inherit;
    filter: $avatar-filter;
    transition: all 0.3s ease;
    
    ${hoverZoom ? "&:hover { transform: scale(1.1); }" : ""}
  }
  
  // Status Badge
  .status {
    position: absolute;
    width: 25%;
    height: 25%;
    min-width: 12px;
    min-height: 12px;
    background-color: $avatar-status-color;
    border: 2px solid white;
    border-radius: 50%;
    box-sizing: border-box;
    ${statusPosStyle}
    
    ${
      statusAnimation === "pulse"
        ? `
    animation: pulse 2s infinite;
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7); }
      70% { box-shadow: 0 0 0 6px rgba(0, 0, 0, 0); }
      100% { box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); }
    }`
        : ""
    }
  }
}`;
  }

  // --- Tailwind Config ---
  else if (downloadFormat === "tailwind-config") {
    content = `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'avatar-border': '${borderColor}',
        'avatar-bg': '${initialsBg}',
        'avatar-text': '${initialsColor}',
        'avatar-status': '${statusColor}',
      },
      borderRadius: {
        'avatar': '${radiusStyle}',
      },
      width: {
        'avatar': '${size}',
      },
      height: {
        'avatar': '${size}',
      }
    }
  }
}`;
  }

  // --- Figma Tokens ---
  else if (downloadFormat === "figma-tokens") {
    content = JSON.stringify(
      {
        avatar: {
          sizing: {
            size: { value: size, type: "sizing" },
            radius: { value: radiusStyle, type: "borderRadius" },
            borderWidth: { value: `${borderWidth}px`, type: "borderWidth" },
          },
          colors: {
            border: { value: borderColor, type: "color" },
            background: { value: initialsBg, type: "color" },
            text: { value: initialsColor, type: "color" },
            status: { value: statusColor, type: "color" },
          },
          opacity: {
            main: { value: `${opacity}%`, type: "opacity" },
          },
          font: {
            family: { value: fontFamily, type: "fontFamilies" },
          },
        },
      },
      null,
      2
    );
  }

  // --- Tailwind HTML ---
  else if (downloadFormat === "tailwind") {
    content = `<!-- Tailwind Component -->
<div class="${twClasses}">
  ${
    src
      ? `<img src="${src}" alt="${alt}" class="${twImgClasses}" />`
      : `<div class="${twImgClasses} flex items-center justify-center font-semibold bg-[${initialsBg}] text-[${initialsColor}] text-[length:calc(${size}*0.4)]">${initials}</div>`
  }
  
  ${
    status !== "none"
      ? `<span class="absolute ${twStatusPos} w-1/4 h-1/4 min-w-[12px] min-h-[12px] rounded-full border-2 border-white bg-[${statusColor}] ${
          statusAnimation === "pulse" ? "animate-pulse" : ""
        }"></span>`
      : ""
  }
</div>`;
  } else {
    content = `/* Format ${downloadFormat} not fully implemented yet */`;
  }

  let ext =
    downloadFormat === "react"
      ? "tsx"
      : downloadFormat === "tailwind-config"
      ? "js"
      : downloadFormat === "figma-tokens"
      ? "json"
      : downloadFormat === "scss"
      ? "scss"
      : downloadFormat === "css-vars"
      ? "css"
      : "html";
  return { filename: `${filenameBase}.${ext}`, content };
}
