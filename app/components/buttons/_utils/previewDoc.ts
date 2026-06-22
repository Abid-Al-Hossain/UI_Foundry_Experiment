"use client";

export const PREVIEW_SRC_DOC = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  /* Base Reset */
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; font-family: sans-serif; transition: background 0.2s;
  }

  .preview-root { width: 100%; display: flex; justify-content: center; }
  .preview-single.is-hidden { display: none; }
  .preview-item { display: inline-flex; }
  .preview-group {
    display: flex; flex-wrap: wrap;
    gap: var(--group-gap, 12px);
    justify-content: var(--group-justify, center);
  }
  .preview-group.is-hidden { display: none; }
  
  /* CSS Variables handled by JS */
  .btn {
    appearance: none; outline: none; 
    cursor: pointer; position: relative; display: inline-flex;
    overflow: hidden;
    transition:
      background var(--btn-color-duration) var(--btn-color-ease),
      color var(--btn-color-duration) var(--btn-color-ease),
      border-color var(--btn-color-duration) var(--btn-color-ease),
      filter var(--btn-color-duration) var(--btn-color-ease),
      box-shadow var(--btn-color-duration) var(--btn-color-ease),
      transform var(--btn-transform-duration) var(--btn-transform-ease),
      border-width var(--btn-transform-duration) var(--btn-transform-ease);
    
    /* Dynamic Props */
    background: var(--btn-bg);
    color: var(--btn-text);
    border-color: var(--btn-border);
    border-width: var(--btn-border-width);
    filter: none;
    box-shadow: var(--btn-shadow);
    backdrop-filter: blur(var(--btn-backdrop-blur, 0));
    -webkit-backdrop-filter: blur(var(--btn-backdrop-blur, 0));
    transform-style: preserve-3d;
  }

  .btn::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: var(--btn-top-gradient, none);
    pointer-events: none;
    z-index: 0;
  }

  .btn::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(
      circle at calc(50% + var(--btn-light-x, 0px)) calc(20% + var(--btn-light-y, 0px)),
      rgba(255, 255, 255, var(--btn-parallax-opacity, 0)),
      rgba(255, 255, 255, 0) 60%
    );
    pointer-events: none;
    z-index: 0;
  }

  .btn > * {
    position: relative;
    z-index: 1;
  }
  
  /* Robust CSS Hover */
  .btn:hover:not(:disabled),
  .btn.force-hover {
    background: var(--btn-hover-bg);
    color: var(--btn-hover-text);
    border-color: var(--btn-hover-border);
    border-width: var(--btn-hover-border-width);
    filter: var(--btn-hover-filter);
    box-shadow: var(--btn-hover-shadow, var(--btn-shadow));
    transform: perspective(var(--btn-hover-perspective)) rotateX(var(--btn-hover-tilt-x)) rotateY(var(--btn-hover-tilt-y));
  }

  .btn:active:not(:disabled),
  .btn.force-active {
    background: var(--btn-active-bg);
    color: var(--btn-active-text);
    border-color: var(--btn-active-border);
    border-width: var(--btn-active-border-width);
    filter: var(--btn-active-filter);
    transform: translateY(var(--btn-active-ty)) scale(var(--btn-active-scale));
    box-shadow: var(--btn-active-shadow, var(--btn-shadow));
  }

  .btn:disabled {
    cursor: var(--btn-disabled-cursor);
    opacity: var(--btn-disabled-opacity);
    background: var(--btn-disabled-bg);
    color: var(--btn-disabled-text);
    border-color: var(--btn-disabled-border);
    border-width: var(--btn-disabled-border-width);
    text-shadow: var(--btn-disabled-text-shadow);
  }

  .btn.suppress-hover:hover,
  .btn.suppress-hover:disabled:hover {
    background: var(--btn-disabled-bg);
    color: var(--btn-disabled-text);
    border-color: var(--btn-disabled-border);
    border-width: var(--btn-disabled-border-width);
    filter: none;
  }

  .icon-svg { flex-shrink: 0; display: inline-flex; filter: var(--icon-emboss-filter, none); }
  .icon-svg svg { width: 100%; height: 100%; display: block; }
  
  @keyframes spin { to { transform: rotate(360deg); } }
  .anim-spin { animation: spin 0.8s linear infinite; }
  @keyframes gentle-rise { 0% { transform: translateY(8px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
  @keyframes breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.014); } }
  @keyframes soft-drift { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
  @keyframes soft-glow { 0%, 100% { opacity: 0.08; } 50% { opacity: 0.22; } }
  @keyframes sheen-sweep { 0%, 72%, 100% { transform: translateX(-160%); opacity: 0; } 82% { opacity: 0.08; } 90% { transform: translateX(0%); opacity: 0.24; } 100% { transform: translateX(160%); opacity: 0; } }
  @keyframes aurora-drift { 0%, 100% { background-position: 0% 50%; opacity: 0.26; } 50% { background-position: 100% 50%; opacity: 0.42; } }
  .preview-item[data-animation="gentle-rise"] { animation: gentle-rise 260ms cubic-bezier(0.4, 0, 0.2, 1) backwards; }
  .preview-item[data-animation="breathe"] { animation: breathe 4.2s ease-in-out infinite; }
  .preview-item[data-animation="soft-drift"] { animation: soft-drift 4.8s ease-in-out infinite; }

  .ambient-layer {
    position: absolute;
    pointer-events: none;
    z-index: 0 !important;
    border-radius: inherit;
    opacity: 0;
  }
  .ambient-glow {
    inset: -16%;
    background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.26), transparent 62%);
    filter: blur(18px);
    mix-blend-mode: screen;
  }
  .ambient-sheen {
    inset: -28%;
    background: linear-gradient(115deg, transparent 36%, rgba(255, 255, 255, 0.18) 50%, transparent 64%);
    transform: translateX(-160%);
    mix-blend-mode: screen;
  }
  .ambient-aurora {
    inset: -22%;
    background: linear-gradient(120deg, rgba(255, 255, 255, 0.04), rgba(96, 165, 250, 0.14), rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.08));
    background-size: 200% 200%;
    filter: blur(16px);
    mix-blend-mode: soft-light;
  }
  .btn[data-animation="soft-glow"] .ambient-glow { animation: soft-glow 3.8s ease-in-out infinite; }
  .btn[data-animation="sheen"] .ambient-sheen { animation: sheen-sweep 4.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
  .btn[data-animation="aurora"] .ambient-aurora { animation: aurora-drift 6.4s ease-in-out infinite; }

  .btn:focus-visible {
    box-shadow: var(--btn-shadow), 0 0 0 var(--ring-offset) var(--preview-bg), 0 0 0 calc(var(--ring-offset) + var(--ring-width)) var(--ring-color);
  }
  .btn.force-focus-ring {
    box-shadow: var(--btn-shadow), 0 0 0 var(--ring-offset) var(--preview-bg), 0 0 0 calc(var(--ring-offset) + var(--ring-width)) var(--ring-color);
  }

  @media (prefers-reduced-motion: reduce) {
    .preview-item,
    .ambient-glow,
    .ambient-sheen,
    .ambient-aurora,
    .icon-svg,
    .anim-spin {
      animation: none !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>
</head>
<body>

<div id="preview-root" class="preview-root" data-audit="iframe-preview-root" data-testid="iframe-preview-root">
  <div id="single-wrap" class="preview-single" data-audit="iframe-preview-single-wrap" data-testid="iframe-preview-single-wrap">
    <div class="preview-item" data-audit="iframe-preview-item" data-testid="iframe-preview-item-single">
      <button class="btn" data-role="single" data-audit="iframe-preview-button" data-testid="iframe-preview-button-single">
        <span class="ambient-layer ambient-glow" aria-hidden="true"></span>
        <span class="ambient-layer ambient-sheen" aria-hidden="true"></span>
        <span class="ambient-layer ambient-aurora" aria-hidden="true"></span>
        <span class="icon-svg icon-left" data-audit="iframe-preview-icon-left" data-testid="iframe-preview-icon-left-single"></span>
        <span class="label" data-audit="iframe-preview-label" data-testid="iframe-preview-label-single"></span>
        <span class="icon-svg icon-right" data-audit="iframe-preview-icon-right" data-testid="iframe-preview-icon-right-single"></span>
      </button>
    </div>
  </div>
  <div id="group-wrap" class="preview-group" aria-hidden="true" data-audit="iframe-preview-group-wrap" data-testid="iframe-preview-group-wrap">
    <div class="preview-item" data-audit="iframe-preview-item" data-testid="iframe-preview-item-group-0">
      <button class="btn" data-role="group" data-audit="iframe-preview-button" data-testid="iframe-preview-button-group-0">
        <span class="ambient-layer ambient-glow" aria-hidden="true"></span>
        <span class="ambient-layer ambient-sheen" aria-hidden="true"></span>
        <span class="ambient-layer ambient-aurora" aria-hidden="true"></span>
        <span class="icon-svg icon-left" data-audit="iframe-preview-icon-left" data-testid="iframe-preview-icon-left-group-0"></span>
        <span class="label" data-audit="iframe-preview-label" data-testid="iframe-preview-label-group-0"></span>
        <span class="icon-svg icon-right" data-audit="iframe-preview-icon-right" data-testid="iframe-preview-icon-right-group-0"></span>
      </button>
    </div>
    <div class="preview-item" data-audit="iframe-preview-item" data-testid="iframe-preview-item-group-1">
      <button class="btn" data-role="group" data-audit="iframe-preview-button" data-testid="iframe-preview-button-group-1">
        <span class="ambient-layer ambient-glow" aria-hidden="true"></span>
        <span class="ambient-layer ambient-sheen" aria-hidden="true"></span>
        <span class="ambient-layer ambient-aurora" aria-hidden="true"></span>
        <span class="icon-svg icon-left" data-audit="iframe-preview-icon-left" data-testid="iframe-preview-icon-left-group-1"></span>
        <span class="label" data-audit="iframe-preview-label" data-testid="iframe-preview-label-group-1"></span>
        <span class="icon-svg icon-right" data-audit="iframe-preview-icon-right" data-testid="iframe-preview-icon-right-group-1"></span>
      </button>
    </div>
    <div class="preview-item" data-audit="iframe-preview-item" data-testid="iframe-preview-item-group-2">
      <button class="btn" data-role="group" data-audit="iframe-preview-button" data-testid="iframe-preview-button-group-2">
        <span class="ambient-layer ambient-glow" aria-hidden="true"></span>
        <span class="ambient-layer ambient-sheen" aria-hidden="true"></span>
        <span class="ambient-layer ambient-aurora" aria-hidden="true"></span>
        <span class="icon-svg icon-left" data-audit="iframe-preview-icon-left" data-testid="iframe-preview-icon-left-group-2"></span>
        <span class="label" data-audit="iframe-preview-label" data-testid="iframe-preview-label-group-2"></span>
        <span class="icon-svg icon-right" data-audit="iframe-preview-icon-right" data-testid="iframe-preview-icon-right-group-2"></span>
      </button>
    </div>
  </div>
</div>

<script>
  const body = document.body;
  const singleWrap = document.getElementById('single-wrap');
  const groupWrap = document.getElementById('group-wrap');
  const buttons = Array.from(document.querySelectorAll('.btn'));
  const defaultSpinnerSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>';

  function renderSpinner(target, svg) {
    if (!target || !svg) return;
    target.innerHTML = svg;
    const svgEl = target.querySelector('svg');
    if (svgEl) svgEl.classList.add('anim-spin');
  }
  function getParts(btn){
    return {
      labelSpan: btn.querySelector('.label'),
      iconL: btn.querySelector('.icon-left'),
      iconR: btn.querySelector('.icon-right'),
    };
  }

  function clearIconSlot(slot){
    if (!slot) return;
    slot.innerHTML = '';
    slot.style.display = 'none';
    slot.style.marginRight = '0';
    slot.style.marginLeft = '0';
  }

  function showIcon(slot, svg, size, color, gap, position){
    if (!slot || !svg) return;
    slot.innerHTML = svg;
    slot.style.display = 'inline-flex';
    slot.style.width = size;
    slot.style.height = size;
    slot.style.color = color;
    if (position === 'left') slot.style.marginRight = gap;
    else slot.style.marginLeft = gap;
  }

  function pickIconSvg(d, state){
    if (state === 'active' && d.activeIconSvg) return d.activeIconSvg;
    if (state === 'hover' && d.hoverIconSvg) return d.hoverIconSvg;
    return d.baseIconSvg || '';
  }

  function getVisualState(btn, d){
    if (d.loading) return 'loading';
    if (d.forceActive && d.activeEnabled) return 'active';
    if (d.forceHover && d.hoverEnabled) return 'hover';
    const isActive = btn.dataset.active === 'true';
    const isHover = btn.dataset.hover === 'true';
    return isActive ? 'active' : (isHover ? 'hover' : 'base');
  }

  function normalizeAnimationPreset(value) {
    if (value === 'subtle-pop') return 'none';
    if (value === 'pulse') return 'breathe';
    if (value === 'float') return 'soft-drift';
    if (
      value === 'breathe' ||
      value === 'soft-drift' ||
      value === 'soft-glow' ||
      value === 'sheen' ||
      value === 'aurora' ||
      value === 'neon-pulse' ||
      value === 'cyber-glitch'
    ) {
      return value;
    }
    return 'none';
  }

  function applyIconState(btn, d){
    const parts = getParts(btn);
    const iconGap = d.iconGap + "px";
    const iconSize = d.iconSize + "px";
    const iconColor = d.iconColor;
    const loadingMode = d.loadingSpinnerMode || "default";
    const loadingSpinnerSvg = loadingMode === "custom"
      ? (d.loadingSpinnerSvg || "")
      : (loadingMode === "none" ? "" : defaultSpinnerSvg);
    const spinnerPosition = d.loadingSpinnerPosition === "right" ? "right" : "left";

    clearIconSlot(parts.iconL);
    clearIconSlot(parts.iconR);

    if (d.loading) {
      if (d.loadingIconSvg) {
        const target = d.iconPosition === 'left' ? parts.iconL : parts.iconR;
        showIcon(target, d.loadingIconSvg, iconSize, iconColor, iconGap, d.iconPosition);
      } else if (loadingSpinnerSvg) {
        const target = spinnerPosition === 'right' ? parts.iconR : parts.iconL;
        renderSpinner(target, loadingSpinnerSvg);
        if (target) {
          target.style.display = 'inline-flex';
          target.style.width = iconSize;
          target.style.height = iconSize;
          target.style.color = iconColor;
          if (spinnerPosition === 'left') target.style.marginRight = iconGap;
          else target.style.marginLeft = iconGap;
        }
      }
      return;
    }

    const state = getVisualState(btn, d);
    const svg = pickIconSvg(d, state);
    if (svg) {
      const target = d.iconPosition === 'left' ? parts.iconL : parts.iconR;
      showIcon(target, svg, iconSize, iconColor, iconGap, d.iconPosition);
    }
  }

  buttons.forEach((btn) => {
    btn.addEventListener('blur', () => {
      btn.classList.remove('force-focus-ring');
    });
  });

  function ensureFontLink(family){
      if(!family) return;
      const id = 'gf-preview';
      let link = document.getElementById(id);
      if(!link){
          link = document.createElement('link');
          link.id = id;
          link.rel = 'stylesheet';
          document.head.appendChild(link);
      }
      const href = 'https://fonts.googleapis.com/css2?family=' + family.replace(/ /g, '+') + ':wght@100..900&display=swap';
      if(link.getAttribute('href') !== href) link.setAttribute('href', href);
  }

  let lastGroupEnabled = false;
  let lastPreviewResetKey = -1;

  window.addEventListener('message', (e) => {
    const d = e.data;
    if(!d) return;
    if (d.type === 'focus-button') {
      const candidates = lastGroupEnabled
        ? buttons.filter((b) => b.getAttribute('data-role') === 'group')
        : buttons.filter((b) => b.getAttribute('data-role') === 'single');
      const target = candidates[0] || buttons[0];
      if (target) {
        target.classList.add('force-focus-ring');
        target.focus();
      }
      return;
    }

    const loadingLabel = d.loadingLabel || "Loading...";
    lastGroupEnabled = Boolean(d.groupEnabled);
    if (d.previewResetKey !== lastPreviewResetKey) {
      lastPreviewResetKey = d.previewResetKey;
      buttons.forEach((btn) => {
        btn.dataset.hover = 'false';
        btn.dataset.active = 'false';
        btn.classList.remove('force-focus-ring');
        btn.style.setProperty('--btn-light-x', '0px');
        btn.style.setProperty('--btn-light-y', '0px');
        btn.style.setProperty('--btn-parallax-opacity', '0');
        btn.blur();
      });
    }
    if (singleWrap) {
      singleWrap.classList.toggle('is-hidden', lastGroupEnabled);
      singleWrap.setAttribute('aria-hidden', String(lastGroupEnabled));
    }
    if (groupWrap) {
      groupWrap.classList.toggle('is-hidden', !lastGroupEnabled);
      groupWrap.setAttribute('aria-hidden', String(!lastGroupEnabled));
      const gMap = { left: 'flex-start', center: 'center', right: 'flex-end' };
      groupWrap.style.setProperty('--group-gap', d.groupGap + "px");
      groupWrap.style.setProperty('--group-justify', gMap[d.groupAlign] || 'center');
    }

    body.style.background = d.previewBg;
    
    // Update Fonts
    if(d.fontFamily && !d.fontFamily.includes('system-ui')){
        const fam = d.fontFamily.split(',')[0].replace(/['"]/g, '');
        ensureFontLink(fam);
    }

    // Alignment Map: [align-items (vertical), justify-content (horizontal)]
    const map = {
      'top-left':      ['flex-start', 'flex-start'],
      'top-center':    ['flex-start', 'center'],
      'top-right':     ['flex-start', 'flex-end'],
      'middle-left':   ['center',     'flex-start'],
      'middle-center': ['center',     'center'],
      'middle-right':  ['center',     'flex-end'],
      'bottom-left':   ['flex-end',   'flex-start'],
      'bottom-center': ['flex-end',   'center'],
      'bottom-right':  ['flex-end',   'flex-end'],
    };
    const [alignItems, justify] = map[d.align] || ['center','center'];

    const activeButtons = lastGroupEnabled
      ? buttons.filter((b) => b.getAttribute('data-role') === 'group')
      : buttons.filter((b) => b.getAttribute('data-role') === 'single');

    activeButtons.forEach((btn) => {
      const parts = getParts(btn);
      if (parts.labelSpan) parts.labelSpan.textContent = d.loading ? loadingLabel : d.label;

      // Set Dimensions & Radius
      btn.style.width = d.width + "px";
      btn.style.height = d.height + "px";
      btn.style.padding = d.padY + "px " + d.padX + "px";
      btn.style.borderRadius = d.radiusTL + "px " + d.radiusTR + "px " + d.radiusBR + "px " + d.radiusBL + "px";
      btn.disabled = d.disabled || d.loading;
      if (d.ariaLabel) btn.setAttribute('aria-label', d.ariaLabel);
      else btn.removeAttribute('aria-label');
      if (d.ariaPressedMode && d.ariaPressedMode !== 'off') {
        btn.setAttribute('aria-pressed', d.ariaPressedMode);
      } else {
        btn.removeAttribute('aria-pressed');
      }
      let ariaBusyValue = null;
      if (d.ariaBusyMode === 'auto') {
        ariaBusyValue = d.loading ? 'true' : null;
      } else if (d.ariaBusyMode && d.ariaBusyMode !== 'off') {
        ariaBusyValue = d.ariaBusyMode;
      }
      if (ariaBusyValue) {
        btn.setAttribute('aria-busy', ariaBusyValue);
      } else {
        btn.removeAttribute('aria-busy');
      }
      
      // Set Border Width/Style
      btn.style.setProperty('--btn-border-width', d.borderWidth + "px");
      btn.style.setProperty('--btn-hover-border-width', d.borderHoverWidth + "px");
      btn.style.setProperty('--btn-active-border-width', d.borderActiveWidth + "px");
      btn.style.borderStyle = d.borderStyle;

      // Set CSS Variables for Colors & Hover
      btn.style.setProperty('--btn-bg', d.cssBg);
      btn.style.setProperty('--btn-text', d.cssText);
      btn.style.setProperty('--btn-border', d.cssBorder);
      
      const hoverVisualsEnabled = d.hoverEnabled && !d.disabled && !d.loading;
      const activeVisualsEnabled = d.activeEnabled && !d.disabled && !d.loading;
      btn.style.setProperty('--btn-hover-bg', hoverVisualsEnabled ? d.cssHoverBg : d.cssBg);
      btn.style.setProperty('--btn-hover-text', hoverVisualsEnabled ? d.cssHoverText : d.cssText);
      btn.style.setProperty('--btn-hover-border', hoverVisualsEnabled ? d.cssHoverBorder : d.cssBorder);
      btn.style.setProperty('--btn-hover-filter', hoverVisualsEnabled ? d.cssHoverFilter : 'none');

      btn.style.setProperty('--btn-active-bg', activeVisualsEnabled ? d.cssActiveBg : d.cssBg);
      btn.style.setProperty('--btn-active-text', activeVisualsEnabled ? d.cssActiveText : d.cssText);
      btn.style.setProperty('--btn-active-border', activeVisualsEnabled ? d.cssActiveBorder : d.cssBorder);
      btn.style.setProperty('--btn-active-filter', activeVisualsEnabled ? d.cssActiveFilter : 'none');
      btn.style.setProperty('--btn-active-ty', activeVisualsEnabled ? (d.activeTy + "px") : "0px");
      btn.style.setProperty('--btn-active-scale', activeVisualsEnabled ? d.activeScale : "1");
      
      btn.style.setProperty('--btn-disabled-bg', d.cssDisabledBg);
      btn.style.setProperty('--btn-disabled-text', d.cssDisabledText);
      btn.style.setProperty('--btn-disabled-border', d.cssDisabledBorder);
      btn.style.setProperty('--btn-disabled-opacity', d.disabledOpacity);
      btn.style.setProperty('--btn-disabled-cursor', d.disabledCursor);
      btn.style.setProperty('--btn-disabled-border-width', d.disabledBorderWidth + "px");
      btn.style.setProperty('--btn-disabled-text-shadow', d.disabledTextShadow);

      btn.style.setProperty('--btn-color-duration', d.transitionColorMs + "ms");
      btn.style.setProperty('--btn-color-ease', d.transitionColorEasing);
      btn.style.setProperty('--btn-transform-duration', d.transitionTransformMs + "ms");
      btn.style.setProperty('--btn-transform-ease', d.transitionTransformEasing);

      // Box Shadow
      btn.style.setProperty('--btn-shadow', d.boxShadow || 'none');
      btn.style.setProperty('--btn-hover-shadow', hoverVisualsEnabled ? (d.boxShadowHover || d.boxShadow || 'none') : (d.boxShadow || 'none'));
      btn.style.setProperty('--btn-active-shadow', activeVisualsEnabled ? (d.boxShadowActive || d.boxShadow || 'none') : (d.boxShadow || 'none'));
      btn.style.setProperty('--btn-hover-tilt-x', hoverVisualsEnabled ? ((d.hoverTiltX || 0) + "deg") : "0deg");
      btn.style.setProperty('--btn-hover-tilt-y', hoverVisualsEnabled ? ((d.hoverTiltY || 0) + "deg") : "0deg");
      btn.style.setProperty('--btn-hover-perspective', hoverVisualsEnabled ? ((d.hoverPerspective || 800) + "px") : "800px");
      btn.style.setProperty('--btn-top-gradient', d.topGradient || 'none');
      btn.style.setProperty('--btn-backdrop-blur', d.backdropBlurEnabled && d.backdropBlurText ? (d.backdropBlurText + "px") : "0px");
      btn.style.setProperty('--btn-parallax-opacity', 0);
      btn.style.setProperty('--btn-light-x', '0px');
      btn.style.setProperty('--btn-light-y', '0px');
      btn.style.setProperty('--icon-emboss-filter', d.iconEmbossFilter || 'none');

      // Typography & Alignment
      btn.style.fontFamily = d.fontFamily;
      btn.style.fontSize = d.fontSizeValue + d.fontSizeUnit;
      btn.style.fontWeight = d.fontWeight;
      btn.style.letterSpacing = d.letterSpacingValue + d.letterSpacingUnit;
      btn.style.lineHeight = d.lineHeight;
      btn.style.fontStyle = d.fontStyle;
      btn.style.textTransform = d.textTransform;
      btn.style.textDecoration = d.underline ? 'underline' : 'none';
      btn.style.alignItems = alignItems;
      btn.style.justifyContent = justify;

      // Text Shadow
      if (d.textShadowEnabled) {
        btn.style.textShadow = \`\${d.tsX}px \${d.tsY}px \${d.tsBlur}px \${d.tsColor}\`;
      } else {
        btn.style.textShadow = 'none';
      }
      if (d.disabled || d.loading) {
        btn.style.textShadow = d.disabledTextShadow || 'none';
      }

      // Icons
      if (!btn.dataset.hover) btn.dataset.hover = 'false';
      if (!btn.dataset.active) btn.dataset.active = 'false';
      applyIconState(btn, d);

      // Animation State
      btn.className = 'btn';
      const animationPreset = normalizeAnimationPreset(d.animation);
      btn.dataset.animation = animationPreset;
      const motionWrap = btn.closest('.preview-item');
      if (motionWrap) motionWrap.dataset.animation = animationPreset;
      const allowForceHover = d.forceHover && d.hoverEnabled && !d.disabled && !d.loading;
      const allowForceActive = d.forceActive && d.activeEnabled && !d.disabled && !d.loading;
      if (allowForceHover) btn.classList.add('force-hover');
      if (allowForceActive) btn.classList.add('force-active');
      if (d.forceFocus) btn.classList.add('force-focus-ring');
      btn.classList.toggle('suppress-hover', d.disabledHoverSuppressed && (d.disabled || d.loading));

      // Hover/Active icon state hooks
      const resetParallax = () => {
        btn.style.setProperty('--btn-light-x', '0px');
        btn.style.setProperty('--btn-light-y', '0px');
        btn.style.setProperty('--btn-parallax-opacity', '0');
      };
      const parallaxStrength = d.parallaxHighlightEnabled ? (Number(d.parallaxStrength) || 0) : 0;
      btn.onmousemove = (e) => {
        if (!parallaxStrength) return;
        const rect = btn.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const nx = e.clientX - rect.left - rect.width / 2;
        const ny = e.clientY - rect.top - rect.height / 2;
        const maxShift = Math.min(rect.width, rect.height) * 0.35 * parallaxStrength;
        const shiftX = Math.max(-maxShift, Math.min(maxShift, nx));
        const shiftY = Math.max(-maxShift, Math.min(maxShift, ny));
        btn.style.setProperty('--btn-light-x', Math.round(shiftX) + 'px');
        btn.style.setProperty('--btn-light-y', Math.round(shiftY) + 'px');
        btn.style.setProperty('--btn-parallax-opacity', parallaxStrength);
      };
      btn.onmouseenter = () => {
        if (!d.hoverEnabled || d.forceHover || d.forceActive || d.disabled || d.loading) return;
        btn.dataset.hover = 'true';
        applyIconState(btn, d);
        if (parallaxStrength) btn.style.setProperty('--btn-parallax-opacity', parallaxStrength);
      };
      btn.onmouseleave = () => {
        resetParallax();
        if (!d.hoverEnabled || d.forceHover || d.forceActive) return;
        btn.dataset.hover = 'false';
        btn.dataset.active = 'false';
        applyIconState(btn, d);
      };
      btn.onmousedown = () => {
        if (!d.activeEnabled || d.disabled || d.loading || d.forceActive) return;
        btn.dataset.active = 'true';
        applyIconState(btn, d);
      };
      btn.onmouseup = () => {
        if (d.forceActive) return;
        btn.dataset.active = 'false';
        applyIconState(btn, d);
      };
    });
    
    // Focus vars
    const ringWidth = d.focusRingEnabled ? d.focusRingWidth : 0;
    const ringOffset = d.focusRingEnabled ? d.focusRingOffset : 0;
    const ringColor = d.focusRingEnabled ? d.focusRingColor : "transparent";
    document.documentElement.style.setProperty('--ring-width', ringWidth + "px");
    document.documentElement.style.setProperty('--ring-offset', ringOffset + "px");
    document.documentElement.style.setProperty('--ring-color', ringColor);
    document.documentElement.style.setProperty('--preview-bg', d.previewBg);
  });
</script>
</body>
</html>`;
