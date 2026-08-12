# UI Foundry

UI Foundry is a registry-driven collection of 65 visual component studios built
with Next.js, React, and TypeScript. Each studio combines structured editing
controls, full-state presets, a live preview, undo and redo history, and a
React/JSX export workflow.

The mother project is the integrated product. The sibling `*-component`
repositories are self-contained editions of the same studios for independent
distribution.

## Product model

Each registered component provides two routes:

- a gallery page that introduces the component and links to its studio
- a playground page containing the full editor and output workspace

The common editor shell provides:

- section navigation
- undo, redo, and reset actions
- page-owned preview background controls
- transient preview reset behavior
- live design and code views
- export filename editing
- copy and React/JSX download workflows
- shared accessibility and contrast guidance

Component-specific sections are added only when they belong to the component's
real rendering, semantic, accessibility, or interaction model.

## Component catalog

The registry currently contains 65 component studios.

### Basic and atomic

Avatar, Badge, Button, Divider, Icon, Image, Progress, Spinner, Typography, and
Tooltip.

### Input and form

Checkbox, Date Picker, File Upload, OTP Input, Radio, Slider, Search Input,
Select, Text Input, Textarea, Time Picker, and Toggle.

### Layout

Container, Layout Divider, Flex, Footer, Grid, Header, Navbar, Section, Sidebar,
and Spacer.

### Data display

Accordion, Card, List, Pagination, Statistic, Table, Tabs, Timeline, and Tree
View.

### Feedback and status

Alert, Drawer, Empty State, Modal, Popover, Skeleton, and Toast.

### Navigation

Breadcrumb, Dropdown Menu, Mega Menu, Menu, and Stepper.

### Media and interactive

Audio Player, Carousel, Chart, Gallery, Lightbox, and Video Player.

### Advanced

Auth Form, Command Palette, Drag and Drop, Filter Panel, Rich Text Editor, and
Settings Panel.

The source of truth for names, descriptions, categories, and routes is
`components/registry/componentRegistry.ts`.

## Architecture

```text
app/
  components/
    controls/                     Shared mother-project editor controls
    buttons/                      Representative component studio
      _data/                       Presets and constants
      _section/                    Editing sections and live preview
      _utils/                      Export and component-specific logic
      audit/                       Studio audit route when applicable
      playground/page.tsx         Full editor route
      page.tsx                    Gallery route
      types.ts                    Typed editor state
components/
  registry/componentRegistry.ts   Registry for all 65 studios
  layout/                          Application shell and navigation
scripts/
  audit-generated-exports.mjs     React export compilation/render audit
```

All playgrounds use the shared application shell, playground layout, section
selector, history controls, preview canvas, code presentation, and export panel.
The component state, presets, native controls, preview anatomy, and export logic
remain component-specific.

## Shared editor contract

Common editing tasks use centralized mother-project implementations, including:

- color editing and contrast feedback
- text inputs, selects, sliders, switches, and segmented controls
- font-family selection
- section cards and labeled fields
- preview backgrounds and output-stage layout
- design/code switching and code copying
- filename normalization and React downloads

Common page-level state names are kept stable where applicable:

- `previewResetKey`
- `previewBgMode`
- `previewBgInput`
- `downloadName`

Preset systems use structured metadata and full editor state so applying a
preset changes the complete component rather than only its palette.

## Export contract

React/JSX is the only shipped user-facing export format. The visible code,
copied code, and downloaded file are generated from the same current export
payload. Downloaded component files use the `.jsx` extension.

The export audit compiles and server-renders every registered export builder to
catch malformed JSX, invalid React trees, and component-specific export errors.

## Standalone editions

Each sibling `*-component` project is an independent Next.js application with:

- its own package manifest and lockfile
- local copies of shared editor controls
- local presets, state, preview, and export utilities
- no runtime import from this mother project
- no runtime import from another standalone component project

This duplication is intentional. It allows every studio to be distributed on
its own while preserving a common UI Foundry design language.

## Technology

- Next.js 16.3.0 with the App Router
- React 19
- TypeScript 5
- Tailwind CSS 4
- Framer Motion
- Lucide React
- React Three Fiber and Three.js where native to a component

## Requirements

- Node.js 20 or newer
- npm

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` and select a component from the registry-driven
navigation.

## Verification

Run the compiler, linter, production build, and export audit independently:

```bash
npm run typecheck
npm run lint -- --quiet
npm run build
npm run audit:exports
```

A successful production build alone is not treated as proof that editor state,
accessibility behavior, or generated React output is correct. Those contracts
are checked separately by static audits and targeted browser smoke tests in the
workspace.

## Repository

Mother project: `https://github.com/Abid-Al-Hossain/UI_Foundry_Experiment`

Standalone repositories use the `UI_<component>` naming convention under the
`Abid-Al-Hossain` GitHub account.

## License and author

Developed by Abid Al Hossain as part of the UI Foundry component-studio product
line. Confirm the intended marketplace and repository license before public
distribution.
