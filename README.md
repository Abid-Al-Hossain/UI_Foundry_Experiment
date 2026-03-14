# 💎 UI Foundry (Pro Edition)

**UI Foundry** is a premium, laboratory-grade UI component platform designed for developers and designers who need high-performance, fully customizable, and production-ready components. 

Instead of simple static components, UI Foundry provides a **Studio Experience** for every element—allowing you to visually tweak every property (shadows, animations, typography, border-radius) in real-time and export the resulting code in multiple formats.

---

## 🚀 The Concept: "Component Studio"
Most UI kits give you a `.tsx` file and expect you to change the code. UI Foundry flips this:
1. **Explore**: Browse a rich gallery of atomic and complex components.
2. **Experiment**: Open the **Studio** to access professional-grade sliders, color pickers, and state toggles.
3. **Export**: Click one button to get the **HTML**, **React (JSX/TSX)**, or **Design Tokens** for exactly what you just built.

---

## 🛠️ Tech Stack
This project is built using the bleeding edge of the web ecosystem:
- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Runtime**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/) (The next generation of CSS utility frameworks)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & CSS Transitions
- **3D Engine**: [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction) & [Three.js](https://threejs.org/) (used in premium Avatar and Button effects)
- **Icons**: [Lucide React](https://lucide.dev/) & [Heroicons](https://heroicons.com/)

---

## 🗂️ Component Registry
The project features a growing library of **15+ completed premium components**:

### 🔹 Basic / Atomic
- **Button Pro**: 3D effects, magnetic interactions, and multi-state animations.
- **Avatar Pro**: Features a "3D Presence" engine, status indicators, and grouping logic.
- **Badge / Tag**: Versatile labels for status, categories, or counts.
- **Divider**: Visual separators with text integration and sleek styling.
- **Icon Studio**: Search and customize SVG icons with real-time scaling and coloring.
- **Image Wrapper**: Premium responsive image wrappers with fallback and filter effects.
- **Progress Bar**: Liquid, glitch, and stripe-animated progress indicators.
- **Spinner**: 12+ unique loading animations for high-end async states.
- **Typography**: Complete control over font families (Google/System), scales, and hierarchy.

### 🔸 Input & Forms
- **Toggle / Switch**: (New!) Precision controls for track, thumb, and transitional icons.
- **Checkbox**: Custom checkmark paths, indeterminate states, and focus ring styling.
- **Radio Button**: Radio group builder with custom indicators and horizontal/vertical layouts.
- **Text Input**: Premium single-line fields with focus effects and label positioning.
- **Textarea**: Auto-resizing multi-line fields with state-based styling.
- **Tooltip**: Advanced positioning, arrow customization, and timing controls.

---

## 🏗️ Architecture & Registry
UI Foundry is architected for scalability. Adding a new component to the entire ecosystem only requires:
1. Creating a folder in `app/components/[component-name]`.
2. Defining the component's **State Interface** in `types.ts`.
3. Adding a entry to the `SECTION_LIST` in `components/registry/componentRegistry.ts`.

All components automatically benefit from the **Unified AppShell**, **Theme Provider**, and **History Management (Undo/Redo)** system.

---

## 🚦 Getting Started

### 1. Prerequisites
- Node.js 18.x or later
- npm or pnpm

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Abid-Al-Hossain/UI_Foundry_Experiment.git

# Navigate to the project
cd UI_Foundry_Experiment

# Install dependencies
npm install
```

### 3. Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the main dashboard.

---

## 📦 Standalone Extraction
This "Mother Project" is used to develop the core components. Each component can also be extracted into its own standalone project for individual distribution.

To extract a component:
1. Use the provided extraction script (available in the internal tools directory).
2. The script clones the `template-base` and injects the specific component's `_section`, `_utils`, and `types`.
3. The result is a minimal, fully isolated Next.js project.

---

## 📜 License
This project is for experimental and commercial distribution purposes. All rights reserved by [Abid Al Hossain](https://github.com/Abid-Al-Hossain).
