# 💎 UI Foundry (Pro Edition)

**UI Foundry** is a premium, laboratory-grade UI component platform designed for developers and designers who need high-performance, fully customizable, and production-ready components. 

Unlike traditional component libraries, UI Foundry provides a **Studio-First workflow**, allowing you to visually refine parameters and export pixel-perfect code in real-time.

---

## 🚀 Core Philosophy: "The Component Laboratory"
The web is full of static UI kits. UI Foundry is built on a different principle: **Total Parameterization**. Every component is treated as a set of variables (state) that can be manipulated through a professional-grade interface.

1. **Precision Control**: Adjust shadows, 3D tilts, magnetic strengths, and typography scales with granular precision.
2. **Code Export**: One-click generation of fully typed, modern **React (TSX)** components that mirror the live preview exactly.
   - _Roadmap:_ HTML/CSS, Tailwind, SCSS/CSS-variables, and Figma design-token export are planned but not yet shipped — the Studio currently exports React/JSX.

---

## 🛠️ The Tech Stack
Built for speed, scalability, and developer experience:
- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router, Turbopack)
- **Runtime**: [React 19](https://react.dev/) (Hooks-first, optimized state updates)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/) & [OKLCH Color Space](https://oklch.com/)
- **Motion**: [Framer Motion](https://www.framer.com/motion/) for complex layout transitions.
- **3D Engine**: [React Three Fiber](https://r3f.docs.pmnd.rs/) for immersive elements.
- **State Engine**: Native React State + Undo/Redo historical snapshots.

---

## 🏗️ Project Architecture
The project follows a **Registry-Driven Architecture**, making it infinitely extensible:

### 📁 Directory Anatomy
```bash
/app
  /components
    /[component-name]
      /playground          # The Studio interface
        /_section          # Modular UI panels (Basics, Effects, etc.)
        /_utils            # Export and logic utilities
        page.tsx           # Entry point for the component studio
      types.ts             # Strict TypeScript interface for the component state
/components
  /registry
    componentRegistry.ts   # Central manifest for the whole system
  /shared                 # Low-level layout and input building blocks
```

### 💉 Adding New Components
To add a new component to the Foundry:
1. Create the component folder structure in `/app/components`.
2. Define the `State` interface in `types.ts`.
3. Register the component in `componentRegistry.ts` under the appropriate category.
4. The system automatically handles routing, sidebar navigation, and layout.

---

## 🗂️ Premium Component Gallery
The Foundry currently houses **65 high-fidelity components**, each with a full Studio (live preview, presets, undo/redo, and multi-format export):

### ⚛️ Basic / Atomic

Avatar · Badge / Tag · Button · Divider · Icon · Image · Progress Bar · Spinner · Text / Typography · Tooltip

### 🎛️ Input & Form

Checkbox · Date Picker · File Upload · OTP / PIN Input · Radio Button · Range Slider · Search Input · Select / Dropdown · Text Input · Textarea · Time Picker · Toggle / Switch

### 🧱 Layout

Container · Divider (Layout) · Flex Wrapper · Footer · Grid · Header · Navbar · Section · Sidebar · Spacer

### 📊 Data Display

Accordion · Card · List · Pagination · Statistic · Table · Tabs · Timeline · Tree View

### 🔔 Feedback & Status

Alert · Drawer · Empty State · Modal / Dialog · Popover · Skeleton · Toast

### 🧭 Navigation

Breadcrumb · Dropdown Menu · Mega Menu · Menu · Stepper

### 🎬 Media & Interactive

Audio Player · Carousel · Chart · Gallery · Lightbox · Video Player

### 🧪 Advanced

Auth Form · Command Palette · Drag & Drop · Filter Panel · Rich Text Editor · Settings Panel

---

## 📦 Standalone Extraction Engine
One of the most powerful features of UI Foundry is its **Extraction System**. While components are developed in this "Mother Project," they are designed to be exported as **Standalone Next.js Projects**.

Each standalone export includes:
- A dedicated, minimal Tailwind setup.
- Isolated shared infrastructure (hooks/themes).
- Full "Studio" functionality in a single-purpose project.

---

## 🚦 Installation & Setup

### 1. Requirements
- Node.js 20.x or later (Optimized for React 19)
- npm or pnpm

### 2. Quick Start
```bash
# Clone the repository
git clone https://github.com/Abid-Al-Hossain/UI_Foundry_Experiment.git

# Install dependencies
npm install

# Start the Studio
npm run dev
```

---

## 📜 License & Credits
Developed by **Abid Al Hossain**. This project is part of a premium UI research experiment.  
[GitHub Profile](https://github.com/Abid-Al-Hossain) | [Portfolio](https://abidalhossain.com)
