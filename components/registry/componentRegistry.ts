export type ComponentItem = {
  name: string;
  slug: string;
  description: string;
};

export type ComponentSection = {
  title: string;
  items: ComponentItem[];
};

export const SECTION_LIST: ComponentSection[] = [
  {
    title: "Basic / Atomic Components",
    items: [
      {
        name: "Avatar",
        slug: "avatar",
        description: "User profile pictures with status indicators.",
      },
      {
        name: "Badge / Tag",
        slug: "badge",
        description: "Labels for status, categories, or counts.",
      },
      {
        name: "Button",
        slug: "buttons",
        description: "Interactive elements for actions.",
      },
      {
        name: "Divider",
        slug: "divider",
        description: "Visual separation between content.",
      },
      { name: "Icon", slug: "icon", description: "SVG icons and symbols." },
      {
        name: "Image",
        slug: "image",
        description: "Responsive image wrappers with fallback.",
      },
      {
        name: "Progress Bar",
        slug: "progress",
        description: "Visual indicator of operation progress.",
      },
      {
        name: "Spinner",
        slug: "spinner",
        description: "Loading indicators for async states.",
      },
      {
        name: "Text / Typography",
        slug: "typography",
        description: "Headings, paragraphs, and text styles.",
      },
      {
        name: "Tooltip",
        slug: "tooltip",
        description: "Pop-up information on hover.",
      },
    ],
  },
  {
    title: "Input & Form Components",
    items: [
      {
        name: "Checkbox",
        slug: "checkbox",
        description: "Select one or more items.",
      },
      {
        name: "Date Picker",
        slug: "date-picker",
        description: "Select a date or range.",
      },
      {
        name: "File Upload",
        slug: "file-upload",
        description: "Drag & drop or click to upload files.",
      },
      {
        name: "OTP / PIN Input",
        slug: "otp-input",
        description: "One-time password entry.",
      },
      {
        name: "Radio Button",
        slug: "radio",
        description: "Select exactly one option.",
      },
      {
        name: "Range Slider",
        slug: "slider",
        description: "Select a value from a range.",
      },
      {
        name: "Search Input",
        slug: "search-input",
        description: "Input optimized for search queries.",
      },
      {
        name: "Select / Dropdown",
        slug: "select",
        description: "Pick a value from a list.",
      },
      {
        name: "Text Input",
        slug: "input",
        description: "Single-line text fields.",
      },
      {
        name: "Textarea",
        slug: "textarea",
        description: "Multi-line text fields.",
      },
      {
        name: "Time Picker",
        slug: "time-picker",
        description: "Select a time value.",
      },
      {
        name: "Toggle / Switch",
        slug: "toggle",
        description: "Binary on/off selection.",
      },
    ],
  },
  {
    title: "Layout Components",
    items: [
      {
        name: "Container",
        slug: "container",
        description: "Centered content wrapper.",
      },
      {
        name: "Divider (Layout)",
        slug: "layout-divider",
        description: "Section separators.",
      },
      {
        name: "Flex Wrapper",
        slug: "flex",
        description: "Flexbox utility wrapper.",
      },
      { name: "Footer", slug: "footers", description: "Page footers." },
      { name: "Grid", slug: "grid", description: "Grid layout system." },
      { name: "Header", slug: "headers", description: "Page headers." },
      { name: "Navbar", slug: "navbar", description: "Navigation bars." },
      {
        name: "Section",
        slug: "section",
        description: "Semantic section wrapper.",
      },
      {
        name: "Sidebar",
        slug: "sidebar",
        description: "Side navigation panel.",
      },
      { name: "Spacer", slug: "spacer", description: "Empty space utility." },
    ],
  },
  {
    title: "Data Display Components",
    items: [
      {
        name: "Accordion",
        slug: "accordion",
        description: "Collapsible content sections.",
      },
      {
        name: "Card",
        slug: "cards",
        description: "Container for grouped information.",
      },
      {
        name: "List",
        slug: "list",
        description: "Ordered or unordered lists.",
      },
      {
        name: "Pagination",
        slug: "pagination",
        description: "Navigate through pages of data.",
      },
      {
        name: "Statistic",
        slug: "statistic",
        description: "Display key numbers and metrics.",
      },
      {
        name: "Table",
        slug: "tables",
        description: "Rows and columns of data.",
      },
      { name: "Tabs", slug: "tabs", description: "Switch between views." },
      {
        name: "Timeline",
        slug: "timeline",
        description: "Events in chronological order.",
      },
      {
        name: "Tree View",
        slug: "tree-view",
        description: "Hierarchical data display.",
      },
    ],
  },
  {
    title: "Feedback & Status",
    items: [
      { name: "Alert", slug: "alert", description: "Important messages." },
      { name: "Drawer", slug: "drawer", description: "Slide-out panels." },
      {
        name: "Empty State",
        slug: "empty-state",
        description: "Placeholder for no data.",
      },
      {
        name: "Modal / Dialog",
        slug: "modals",
        description: "Overlay windows.",
      },
      { name: "Popover", slug: "popover", description: "Contextual popups." },
      {
        name: "Skeleton",
        slug: "skeleton",
        description: "Loading placeholders.",
      },
      { name: "Toast", slug: "toast", description: "Temporary notifications." },
    ],
  },
  {
    title: "Navigation Components",
    items: [
      {
        name: "Breadcrumb",
        slug: "breadcrumb",
        description: "Path to current resource.",
      },
      {
        name: "Dropdown Menu",
        slug: "dropdown-menu",
        description: "Toggleable menu list.",
      },
      {
        name: "Mega Menu",
        slug: "mega-menu",
        description: "Complex navigation menu.",
      },
      { name: "Menu", slug: "menu", description: "Standard menu list." },
      { name: "Stepper", slug: "stepper", description: "Step-by-step wizard." },
    ],
  },
  {
    title: "Media & Interactive",
    items: [
      {
        name: "Audio Player",
        slug: "audio-player",
        description: "Play audio files.",
      },
      { name: "Carousel", slug: "carousel", description: "Image rotators." },
      { name: "Chart", slug: "chart", description: "Data visualization." },
      { name: "Gallery", slug: "gallery", description: "Image grid." },
      {
        name: "Lightbox",
        slug: "lightbox",
        description: "Overlay image viewer.",
      },
      {
        name: "Video Player",
        slug: "video-player",
        description: "Play video files.",
      },
    ],
  },
  {
    title: "Advanced Components",
    items: [
      {
        name: "Auth Form",
        slug: "auth-form",
        description: "Login and register forms.",
      },
      {
        name: "Command Palette",
        slug: "command-palette",
        description: "Command search interface.",
      },
      {
        name: "Drag & Drop",
        slug: "drag-drop",
        description: "Drag and drop zones.",
      },
      {
        name: "Filter Panel",
        slug: "filter-panel",
        description: "Complex filtering UI.",
      },
      {
        name: "Rich Text Editor",
        slug: "rich-text",
        description: "WYSIWYG editor.",
      },
      {
        name: "Settings Panel",
        slug: "settings-panel",
        description: "Complex configuration forms.",
      },
    ],
  },
];

// Flat list for easy lookup (helper)
export const ALL_COMPONENTS = SECTION_LIST.flatMap((s) => s.items).sort(
  (a, b) => a.name.localeCompare(b.name)
);

export const getComponentBySlug = (slug: string) =>
  ALL_COMPONENTS.find((c) => c.slug === slug);
