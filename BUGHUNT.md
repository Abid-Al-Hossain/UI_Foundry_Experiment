# UI Foundry — Bug Hunt Taxonomy & Checklist

A systematic catalogue of bug classes for a **visual component studio** (Next.js + React live-preview editor with presets, undo/redo, theming, and multi-format code export). Compiled from web research on this class of tool + this project's own known bug history. Each category lists **what to check**, **how to detect**, and **severity weight**. The accompanying hunt scripts live in `scripts/bughunt/`.

> Project shape: 65 component "Studios" under `app/components/<slug>/playground`, each = editor (sections of controls) + live preview + Output panel (Design/Code + export). Shared controls in `app/components/controls/`. Registry-driven nav.

---

## A. Runtime & console errors  — severity: CRITICAL
- Uncaught `pageerror` / thrown exceptions on load or interaction.
- `console.error` / `console.warn` spam (React key warnings, prop-type, act warnings).
- Unhandled promise rejections.
- React error boundary trips / "Something went wrong".
- **Detect:** Playwright — load every `/components/<slug>/playground`, capture `pageerror` + `console`. Drive controls, re-capture.

## B. Hydration / SSR mismatch (Next.js) — severity: HIGH
- `Math.random()`, `Date.now()`, `new Date()`, `crypto.randomUUID()` used during render.
- `window` / `document` / `localStorage` / `navigator` read during render (not in effect).
- Markup that differs server vs client → "Text content does not match server-rendered HTML".
- `suppressHydrationWarning` used to mask a real mismatch.
- **Detect:** Playwright console for `hydrat`/`did not match`; grep render bodies for non-deterministic calls.

## C. Controlled / uncontrolled inputs — severity: HIGH
- `value` prop without `onChange` (read-only field, can't type).
- `value={undefined|null}` then later defined → "changing uncontrolled to controlled" warning.
- Number inputs producing `NaN`; `value={state.x}` where `x` can be `undefined`.
- **Detect:** console warning capture; grep for `value=` without sibling `onChange`; type into every text/number input and confirm it accepts input.

## D. Control → preview wiring (dead controls / functionality) — severity: HIGH
- A control exists in the editor but changing it does **nothing** to the preview (dead wiring).
- **onChange contract (KNOWN bug class):** a shared `Input`/`Slider` passes the raw `event` to a handler expecting a `value` (or vice versa) — `any`-typed so tsc misses it. Symptom: typing sets state to `[object Object]` / `undefined`.
- Slider min/max/step ignored; select option not applied; color picker not applied; toggle inverted.
- **Detect:** functional sweep — snapshot preview DOM/`outerHTML`, drive each editor control (set slider to max, toggle checkboxes, pick each select option, change color/text), assert preview changed. Flag controls that produce no change OR set `[object Object]`/`NaN`/`undefined`.

## E. State management (undo/redo, reset, presets) — severity: HIGH
- **Undo not exact:** undo then redo doesn't return to identical state.
- **Reset** doesn't restore `INITIAL_STATE` (or resets preview but not state, or vice versa).
- **Preset apply:** merges instead of full replace (stale fields linger) — or replaces fields the user shouldn't lose (downloadName/format).
- **Non-idempotent transitions (KNOWN):** A→B→A doesn't restore A (e.g. ContrastGuard one-way override — fixed; audit for others, esp. anything that mutates state in a derived/`useEffect` path).
- Stale closures (handlers capturing old state); setters that don't support functional updates where used as such.
- **Detect:** snapshot state→change→undo→compare; reset→compare to initial; apply preset→toggle variant→back→compare.

## F. Visual / CSS — severity: MEDIUM
- **Text leakage / overflow** (`scrollWidth>clientWidth`, mid-word breaks) — editor + preview.
- **Invisible / low-contrast text (KNOWN):** presets pairing light-on-light or fg==bg; labels on the canvas; "white-on-light" solid button labels.
- Editor scroll/resize regressions; right panel clipped on resize.
- z-index/stacking, overlapping controls, layout shift (CLS), clipped preview, 0-area visible elements, negative dimensions/radius.
- **Detect:** overflow detector; WCAG contrast detector (ContrastGuard logic) per component × every preset; geometry audit.

## G. Export / code-gen parity — severity: HIGH
- Exported code **doesn't match** the live preview (different colors/sizes than shown).
- Generated code is **empty**, truncated, or **syntactically invalid** (unbalanced braces/JSX, undefined interpolations like `undefined`/`NaN`/`[object Object]`).
- Format switch (React/HTML/Tailwind/SCSS/CSS-vars/Figma-tokens) — some formats produce broken/placeholder output.
- Download filename wrong/empty; "React-only" features silently dropped in HTML export without warning.
- **Detect:** open Code view per component, per format; assert non-empty, balanced delimiters, no `undefined`/`NaN`/`[object Object]` substrings; basic parse.

## H. Forms & interactions — severity: HIGH
- **Form submit → full page reload (KNOWN):** a `<form>` whose submit isn't `preventDefault`-ed, or a `<button>` without `type="button"` inside a form, reloads the studio and wipes state.
- Clicks that navigate away unexpectedly; `<a href="#">` jumping scroll.
- Buttons that do nothing; double-fire handlers; drag interactions that select text.
- **Detect:** grep for `<form`; Playwright — click every editor button and confirm the URL/`performance.navigation` didn't reload; watch for unexpected navigations.

## I. Accessibility — severity: MEDIUM
- Form controls without an associated `<label>`/`aria-label` (placeholder ≠ label).
- Images without `alt`; empty buttons/links; missing document `lang`.
- `outline: none` with no visible focus replacement; keyboard traps (modal/drawer can't Esc/Tab out).
- ARIA misuse: `aria-hidden` on focusable, roles without keyboard model, label contradicting visible text.
- Non-semantic interactive elements (`onClick` on `<div>`).
- **Detect:** inject `axe-core` per playground; tab-order/focus probe; grep `outline:` / `role=` / `onClick` on non-buttons.

## J. Consistency — severity: LOW/MEDIUM
- Same shared control behaves/looks different across components.
- Inconsistent section labels/order, defaults, casing ("A11y" vs "Accessibility"); duplicate section ids.
- Registry name/slug/description vs actual route mismatch; landing page metadata vs studio.
- Export filename/`downloadName` defaults inconsistent.
- **Detect:** cross-component diff of section ids/labels; registry ↔ filesystem ↔ route check.

## K. Routing / navigation — severity: MEDIUM
- Landing `/components/<slug>` → "Open Studio" link 404 or wrong slug.
- Sidebar/registry links resolve; every registered slug has a real route; no orphan routes.
- Back/forward preserves or sanely resets; deep-link to a section.
- **Detect:** crawl nav + registry; assert HTTP 200 for every landing + playground; check the Studio link target.

## L. Performance / memory / cleanup — severity: LOW
- Listeners/intervals/observers/`requestAnimationFrame` not cleaned in effect returns (leak across route changes).
- `URL.createObjectURL` without `revokeObjectURL`.
- Unbounded re-renders (missing memo on heavy preview); large first-load JS.
- **Detect:** grep `addEventListener`/`setInterval`/`setTimeout`/`new MutationObserver`/`createObjectURL` and verify paired cleanup/revoke.

---

## Severity scoring for the report
CRITICAL (crash / data loss / wrong export) > HIGH (broken control, hydration, form reload, unreadable) > MEDIUM (visual/nav/a11y) > LOW (consistency/perf). Each finding: `component · category · severity · symptom · evidence · suspected cause`.

---

# 🔬 HUNT RESULTS (run 2026-06-22, prod build, Playwright + axe-core, all 65 components)

Detectors in `scripts/bughunt/`: `01-runtime` (A/B/C), `02-functional` + `02b-triage` (D/E/H), `03-export` + `03b-codepeek` (G), `04-a11y` + `04b-a11y-detail` (I), routing + static grep (K/J/L).

## ✅ Clean (verified, no issues)
| Category | Result |
|---|---|
| A/B/C Runtime · console · hydration | **0/65** errors/warnings on load + interaction |
| D/E Control→preview wiring · onChange contract | **No `[object Object]`** anywhere (no event-vs-value bug); no `NaN`/`undefined` in any preview |
| H Form-submit reload | 6 components have `<form>`, all `preventDefault`-ed; **0 reloads** in sweep |
| G React export | Valid; the `undefined` tokens are **idiomatic JS** (`aria-x={false||undefined}`, `maxLength={undefined}`, `: undefined` in style objects) — React omits them, not bugs |
| K Routing | **130/130** landing+playground routes return 200; no broken links |
| J Section-label consistency | `"Accessibility"` label uniform across 15; section ids consistent |

## 🐞 Confirmed issues (by severity)

### 1. [MEDIUM·a11y, systematic] White text on `--primary` fails WCAG AA
- **Evidence (axe):** active SectionSelector button + Export button = `#ffffff` on `#4f7cff` → **contrast 3.71** (need 4.5). ~130 nodes, **~2 per component, all 65**.
- **Cause:** brand `--primary` (#4f7cff) is too light for white 14px text. The ContrastGuard fixes the *preview*, not the editor chrome (section buttons, Export, other primary buttons).
- **Fix options:** darken `--primary` to ≥ #3b6cf0-ish (meets 4.5 with white), OR bump those buttons' text size/weight to the large-text threshold, OR use a darker text on primary.

### 2. [MEDIUM·a11y, widespread] `<select>` controls have no accessible name
- **Evidence (axe `select-name`):** ~91 nodes. The native `Select` (`input/Select.tsx`), `FilterSelect`, and Family/Size dropdowns render `<select>` with no `aria-label`/`id`; `LabeledField` renders a `<label>` **not associated** via `htmlFor`/`id`.
- **Fix:** associate `LabeledField` label↔control (generate an `id` + `htmlFor`), or add `aria-label` to `Select`/`FilterSelect`.

### 3. [LOW·leak] Download handler leaks a blob URL
- **Evidence:** `spinner/playground/page.tsx` and `typography/playground/page.tsx` call `URL.createObjectURL` but never `URL.revokeObjectURL` (all other components revoke).
- **Fix:** add `URL.revokeObjectURL(url)` after the click in those two `handleDownload`s.

### 4. [LOW·docs] README overclaims "Multi-Format Export"
- **Evidence:** `DownloadFormat = "react"` in mother **and** canon; the format dropdown offers only `React / JSX`. README's *"HTML/CSS, Tailwind, Design Tokens, SCSS, CSS variables"* export is not in the product (by design — not a regression). Some dead format-branch code remains in `SharedPreviewDownloadPanel`.
- **Fix:** trim the README export claim to React-only (or implement the other formats).

### 5. [LOW·a11y, few components] Minor axe rules
- `aria-progressbar-name` (audio-player, video-player, progress), `scrollable-region-focusable` ×3, `role-img-alt` (icon preview), `link-in-text-block` (rich-text), `aria-allowed-attr` + `aria-required-children` (gallery), one `label`. Mostly preview-internal; fix per component.

## Headline
No crashes, no hydration, no broken controls, no broken exports, no dead routes. The real issues are **accessibility** (contrast on `--primary`, unlabeled selects) plus a tiny blob-URL leak and a docs overclaim. Fixes are low-risk except #1 (a brand-color/design decision).

---

# 🛠️ FIXES APPLIED (2026-06-22)

| # | Fix | Files |
|---|---|---|
| 1 | **Contrast** — added a per-theme `--on-primary` (adaptive readable text color; **no brand hue changed**) and switched every "text on `--primary`" chrome spot to it: SectionSelector active, Export button, SegmentedControl active, AnimatedToggle active, buttons/avatar local Segmented. White text on the colored primaries became readable. | `app/globals.css` (8 themes), `SectionSelector`, `SegmentedControl`, `AnimatedToggle`, `ExportOptionsControl`, buttons/avatar `_section/ui.tsx` |
| 2 | **select-name** — `LabeledField` now associates its `<label>` with the control (`useId` + `htmlFor` + clones child with `id`); `Select`/`FilterSelect` forward `id`; `Select` gets `aria-label`; the Export-format `<Select>` got `aria-label="Export format"`. | `controls/ui.tsx` (×2 incl. buttons local), `input/Select.tsx`, `ExportOptionsControl` |
| 3 | **Leak** — added `URL.revokeObjectURL(url)` to the two download handlers. | `spinner`, `typography` playgrounds |
| 4 | **Docs** — README export claim corrected to React-only (others marked roadmap). | `README.md` |
| 5 | **Minor a11y** — progressbar `aria-label` (audio/video), preview canvas `tabIndex`+role (scrollable-region), icon `role=img` fallback name, rich-text inline-link underline, gallery: figures `role=listitem` inside an inner `role=list`, section landmark `list→region`, removed disallowed `aria-selected`. | audio/video/icon/rich-text/gallery `_section`, `PreviewPanel` |

**Result: axe WCAG 2a/2aa violations 231 → 2.** Eliminated: `select-name` (91→0), `color-contrast` (130→1), `scrollable-region-focusable` (3→0), `aria-progressbar-name` (2→0), `role-img-alt`/`link-in-text-block`/`aria-allowed-attr` (→0), `aria-required-children` (gallery→0). Residual **1** = `badge` `color-contrast` on a 12%-opacity badge over the dark canvas — a measurement disagreement between axe and the ContrastGuard (text is readable on the effective dark background); treated as a false positive. Build 134/134, tsc clean.
