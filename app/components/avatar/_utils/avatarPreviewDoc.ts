"use client";

export const PREVIEW_SRC_DOC = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  html, body { margin: 0; padding: 0; width: 100%; height: 100%; }
  body {
    display: flex; align-items: center; justify-content: center;
    font-family: system-ui, sans-serif;
    background: transparent;
    transition: background-color 0.2s ease;
  }

  .avatar-root {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden; /* For image clipping */
    
    /* Variables set by JS */
    width: var(--size);
    height: var(--size);
    border-radius: var(--radius);
    
    background-color: var(--initials-bg);
    color: var(--initials-color);
    font-family: var(--font-family);
    font-weight: 600;
    
    /* Border */
    border-width: var(--border-width);
    border-style: var(--border-style);
    border-color: var(--border-color);
    
    /* Filters */
    opacity: var(--opacity);
    filter: var(--filters);
    
    /* Transition */
    transition: all 0.3s ease;
  }

  /* Image */
  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: var(--object-fit);
    object-position: var(--object-position);
    display: none; /* Toggled by JS */
  }

  /* Initials */
  .avatar-initials {
    font-size: var(--font-size);
    display: none; /* Toggled by JS */
    user-select: none;
  }

  /* Status Indicator */
  .status-dot {
    position: absolute;
    width: 25%; height: 25%;
    min-width: 12px; min-height: 12px;
    border-radius: 50%;
    background-color: var(--status-color);
    border: 2px solid white;
    box-sizing: border-box;
    z-index: 10;
    display: none; /* Toggled by JS */
  }
  
  /* Status Positions */
  .pos-top-left { top: -2px; left: -2px; }
  .pos-top-right { top: -2px; right: -2px; }
  .pos-bottom-left { bottom: -2px; left: -2px; }
  .pos-bottom-right { bottom: -2px; right: -2px; }

  /* Animations */
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(var(--status-rgb), 0.7); }
    70% { box-shadow: 0 0 0 6px rgba(var(--status-rgb), 0); }
    100% { box-shadow: 0 0 0 0 rgba(var(--status-rgb), 0); }
  }
  .anim-pulse { animation: pulse 2s infinite; }

  /* Hover Effects */
  .avatar-root:hover {
    transform: var(--hover-transform);
    filter: var(--hover-filter);
  }

</style>
</head>
<body>

<div id="root" class="avatar-root">
  <img id="img" class="avatar-img" alt="" />
  <span id="initials" class="avatar-initials"></span>
  <div id="status" class="status-dot"></div>
</div>

<script>
  const root = document.getElementById('root');
  const img = document.getElementById('img');
  const initialsEl = document.getElementById('initials');
  const statusEl = document.getElementById('status');

  window.addEventListener('message', (e) => {
    const d = e.data;
    if (!d) return;

    // --- DOM Content Updates ---
    if (d.src) {
        img.src = d.src;
        img.srcset = d.srcSet || "";
        img.alt = d.alt || "";
        img.style.display = 'block';
        initialsEl.style.display = 'none';
        
        // Remove borderRadius from img if root handles it (but object-fit needs it sometimes)
        // We set inherit in CSS so it follows root
    } else {
        img.style.display = 'none';
        initialsEl.textContent = d.initials;
        initialsEl.style.display = 'inline';
    }

    // --- CSS Variables ---
    const s = root.style;
    s.setProperty('--size', d.size);
    s.setProperty('--radius', d.radiusStyle);
    
    s.setProperty('--initials-bg', d.initialsBg);
    s.setProperty('--initials-color', d.initialsColor);
    s.setProperty('--font-family', d.fontFamily);
    s.setProperty('--font-size', 'calc(' + d.size + ' * 0.4)');
    
    s.setProperty('--border-width', d.borderWidth + 'px');
    s.setProperty('--border-style', d.borderStyle);
    s.setProperty('--border-color', d.borderColor);
    
    s.setProperty('--object-fit', d.objectFit);
    s.setProperty('--object-position', d.objectPosition);
    
    s.setProperty('--opacity', d.opacity / 100);
    s.setProperty('--filters', d.filters); // Prepared string from parent

    // --- Status ---
    if (d.status === 'none') {
        statusEl.style.display = 'none';
    } else {
        statusEl.style.display = 'block';
        statusEl.className = 'status-dot pos-' + d.statusPosition;
        
        let color = '#94a3b8'; // offline
        let rgb = '148, 163, 184';
        if(d.status === 'online') { color = '#22c55e'; rgb = '34, 197, 94'; }
        if(d.status === 'busy') { color = '#ef4444'; rgb = '239, 68, 68'; }
        if(d.status === 'away') { color = '#eab308'; rgb = '234, 179, 8'; }
        
        s.setProperty('--status-color', color);
        s.setProperty('--status-rgb', rgb);
        
        if (d.statusAnimation === 'pulse') {
            statusEl.classList.add('anim-pulse');
        } else {
            statusEl.classList.remove('anim-pulse');
        }
    }
    
    // --- Hover ---
    s.setProperty('--hover-transform', d.hoverZoom ? 'scale(1.1)' : 'none');
    // If hoverGrayscale is on, we might toggle filter. 
    // Simplified: passing specific hover filter override or just allowing CSS to handle simple ones?
    // Let's handle grayscale toggle simply:
    let hoverFilters = d.filters; 
    if (d.hoverGrayscale) {
       // Check if current filter has grayscale, if so remove it, else add it?
       // Usually it implies "Color on hover" (so start grayscale) or "Grayscale on hover".
       // Let's assume standard behavior: Start normal, Hover -> Grayscale.
       hoverFilters = 'grayscale(100%) ' + d.filters;
    }
    s.setProperty('--hover-filter', hoverFilters);

  });
</script>
</body>
</html>`;
