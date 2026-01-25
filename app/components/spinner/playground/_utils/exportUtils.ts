import { type SpinnerState } from "../../types";

export function buildSpinnerExport(state: SpinnerState) {
  const {
    variant,
    size,
    color1,
    color2,
    speed,
    thickness,
    gap,
    particleCount,
    label,
    downloadFormat,
    downloadName,
  } = state;
  const filename = `${downloadName || "spinner"}.${downloadFormat === "html" ? "html" : "tsx"}`;

  // Helper to get React Code
  const getReactCode = () => {
    switch (variant) {
      case "circular":
        return `
// Circular Spinner
export default function CircularSpinner() {
  return (
    <div className="relative" style={{ width: ${size}, height: ${size} }}>
      <style>{\`
        @keyframes spin { to { transform: rotate(360deg); } }
      \`}</style>
      <svg className="animate-[spin_${speed}ms_linear_infinite]" viewBox="0 0 ${size} ${size}">
        <circle cx="${size / 2}" cy="${size / 2}" r="${(size - thickness) / 2}" fill="none" stroke="${state.trackColor}" strokeWidth="${thickness}" opacity="${state.trackOpacity}" />
        <circle cx="${size / 2}" cy="${size / 2}" r="${(size - thickness) / 2}" fill="none" stroke="${color1}" strokeWidth="${thickness}" strokeLinecap="${state.linecap}" strokeDasharray="${size * 3}" strokeDashoffset="${size}" />
      </svg>
    </div>
  );
}`;
      case "dots":
        return `
// Dots Spinner
export default function DotsSpinner() {
  return (
    <div className="flex items-center justify-center gap-[${gap}px]">
      <style>{\`
        @keyframes bounce { 50% { transform: translateY(-10px); } }
      \`}</style>
      {Array.from({ length: ${Math.max(1, particleCount)} }).map((_, i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-full bg-[${color1}]"
          style={{
            animation: \`bounce ${speed}ms ease-in-out infinite\`,
            animationDelay: \`\${i * 100}ms\`
          }}
        />
      ))}
    </div>
  );
}`;
      default:
        return `
// ${variant} Spinner
export default function Spinner() {
  return (
    <div className="relative flex flex-col items-center justify-center p-4">
       <div className="w-[${size}px] h-[${size}px] border-[${thickness}px] border-[${color1}] rounded-full animate-spin border-t-transparent" />
       
       {/* Labels */}
       ${(state.labels || [])
         .map((l) => {
           // Simplified static export for now - ideally resembles the Preview logic
           if (l.type === "text")
             return `<div className="absolute text-[${l.size}px] font-medium" style={{ ${getExportPositionStyle(l.position)} }}>${l.text}</div>`;
           return "";
         })
         .join("\n       ")}
    </div>
  );
}`;
    }
  };

  function getExportPositionStyle(pos: string) {
    switch (pos) {
      case "top-left":
        return "top: 20px; left: 20px;";
      case "top-center":
        return "top: 20px; left: 50%; transform: translateX(-50%);";
      case "top-right":
        return "top: 20px; right: 20px;";
      case "center-left":
        return "top: 50%; left: 20px; transform: translateY(-50%);";
      case "center":
        return "top: 50%; left: 50%; transform: translate(-50%, -50%);";
      case "center-right":
        return "top: 50%; right: 20px; transform: translateY(-50%);";
      case "bottom-left":
        return "bottom: 20px; left: 20px;";
      case "bottom-center":
        return "bottom: 20px; left: 50%; transform: translateX(-50%);";
      case "bottom-right":
        return "bottom: 20px; right: 20px;";
      default:
        return "";
    }
  }

  // Helper to get HTML Code (Simple approximation)
  const getHtmlCode = () => {
    return `
<!-- ${variant} Spinner -->
<div class="spinner-${variant}" style="width: ${size}px; height: ${size}px; border: ${thickness}px solid ${color1}; border-radius: 50%; border-top-color: transparent; animation: spin ${speed}ms linear infinite;"></div>
<style>@keyframes spin { to { transform: rotate(360deg); } }</style>
    `;
  };

  const content = downloadFormat === "html" ? getHtmlCode() : getReactCode();

  return { content, filename };
}
