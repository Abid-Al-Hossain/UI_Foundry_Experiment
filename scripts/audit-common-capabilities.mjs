import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const componentRoot = path.join(root, "app", "components");
const failures = [];
const notes = [];

const excludedDirectories = new Set(["controls", "site", "[slug]"]);
const editorFileExemptions = [
  /^.*LivePreview\.tsx$/,
  /^Preset.*Preview\.tsx$/,
  /^PreviewBackgroundSection\.tsx$/,
  /^Animated.*\.tsx$/,
  /^.*Renderer\.tsx$/,
  /^Three.*Section\.tsx$/,
  /^DividerLine\.tsx$/,
  /^ui\.tsx$/,
];

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function listComponentDirectories() {
  return fs
    .readdirSync(componentRoot, { withFileTypes: true })
    .filter(
      (entry) => entry.isDirectory() && !excludedDirectories.has(entry.name),
    )
    .map((entry) => entry.name)
    .filter((slug) => fs.existsSync(path.join(componentRoot, slug, "types.ts")));
}

function isEditorFileExempt(fileName) {
  return editorFileExemptions.some((pattern) => pattern.test(fileName));
}

function auditSharedDefinitions() {
  const definitions = [
    ["ColorControl", /(?:function|const)\s+ColorControl\b/],
    ["FontFamilySelect", /function\s+FontFamilySelect\b/],
    ["PreviewPanel", /function\s+PreviewPanel\b/],
    ["SegmentedControl", /function\s+SegmentedControl\b/],
    ["Input", /function\s+Input\b/],
    ["Select", /function\s+Select\b/],
    ["Slider", /function\s+Slider\b/],
    ["Switch", /function\s+Switch\b/],
    ["Textarea", /function\s+Textarea\b/],
    ["SectionCard", /function\s+SectionCard\b/],
    ["SectionSelector", /function\s+SectionSelector\b/],
    ["SharedPreviewDownloadPanel", /function\s+SharedPreviewDownloadPanel\b/],
    ["PresetBrowser", /function\s+PresetBrowser\b/],
    ["FilterSelect", /function\s+FilterSelect\b/],
  ];

  const sourceFiles = [];
  const walk = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(fullPath);
      else if (/\.(?:ts|tsx)$/.test(entry.name)) sourceFiles.push(fullPath);
    }
  };
  walk(componentRoot);

  for (const [name, pattern] of definitions) {
    const owners = sourceFiles.filter((file) => pattern.test(read(file)));
    if (owners.length !== 1) {
      failures.push(
        `${name} must have one mother-project implementation; found ${owners.length}: ${owners
          .map((file) => path.relative(root, file))
          .join(", ")}`,
      );
    }
  }
}

function auditComponent(slug) {
  const sectionDirectory = path.join(componentRoot, slug, "_section");
  const playground = path.join(componentRoot, slug, "playground", "page.tsx");
  if (!fs.existsSync(sectionDirectory) || !fs.existsSync(playground)) {
    failures.push(`${slug}: missing _section or playground/page.tsx`);
    return;
  }

  const playgroundSource = read(playground);
  const typeSource = read(path.join(componentRoot, slug, "types.ts"));
  const shellMarkers = [
    "AppShell",
    "PlaygroundLayout",
    "useHistoryState",
    "UndoRedoButtons",
    "SectionSelector",
    "SharedPreviewDownloadPanel",
    "previewResetKey",
    "previewBgMode",
    "previewBgInput",
    "downloadName",
  ];
  for (const marker of shellMarkers) {
    if (!playgroundSource.includes(marker)) {
      failures.push(`${slug}: playground is missing shared shell marker ${marker}`);
    }
  }

  const outputMarkers = [
    "preview={",
    "code={",
    "downloadName=",
    "setDownloadName=",
    "previewBgMode=",
    "previewBgInput=",
    "onPreviewBgMode=",
    "onPreviewBgInput=",
  ];
  for (const marker of outputMarkers) {
    if (!playgroundSource.includes(marker)) {
      failures.push(`${slug}: shared output panel is missing ${marker}`);
    }
  }

  const obsoleteOutputProps = [
    "previewNode=",
    "iframeSrcDoc=",
    "downloadFormat=",
    "setDownloadFormat=",
  ];
  for (const marker of obsoleteOutputProps) {
    if (playgroundSource.includes(marker)) {
      failures.push(`${slug}: shared output panel still uses obsolete ${marker}`);
    }
  }

  if (!/<SectionSelector[\s\S]{0,800}\bactive=/.test(playgroundSource)) {
    failures.push(`${slug}: SectionSelector does not use the canonical active prop`);
  }
  if (!/<SectionSelector[\s\S]{0,800}\bonChange=/.test(playgroundSource)) {
    failures.push(`${slug}: SectionSelector does not use the canonical onChange prop`);
  }

  const previewContractSource = `${playgroundSource}\n${typeSource}`;
  if (
    !previewContractSource.includes('"custom"') ||
    !previewContractSource.includes('"#0b1220"')
  ) {
    failures.push(`${slug}: preview does not declare the shared dark studio default`);
  }

  const sectionFiles = fs
    .readdirSync(sectionDirectory)
    .filter((file) => file.endsWith(".tsx"));

  for (const fileName of sectionFiles) {
    const source = read(path.join(sectionDirectory, fileName));
    const delegatesToPresetBrowser = source.includes(
      "controls/presets/PresetBrowser",
    );
    if (
      !isEditorFileExempt(fileName) &&
      !source.includes("SectionCard") &&
      !delegatesToPresetBrowser
    ) {
      failures.push(`${slug}/${fileName}: editing section bypasses SectionCard`);
    }

    if (/Typography.*Section\.tsx$/.test(fileName)) {
      if (
        !/controls\/typography\/(?:TypographyControl|FontFamilySelect)/.test(
          source,
        )
      ) {
        failures.push(
          `${slug}/${fileName}: typography bypasses canonical typography controls`,
        );
      }
      if (/<(?:input|select|textarea)\b/.test(source)) {
        failures.push(
          `${slug}/${fileName}: typography contains a raw editor control`,
        );
      }
    }

    if (/Colors?Section\.tsx$/.test(fileName) && !source.includes("ColorControl")) {
      failures.push(
        `${slug}/${fileName}: color editing bypasses canonical ColorControl`,
      );
    }

    if (
      /PresetsSection\.tsx$/.test(fileName) &&
      fileName !== "OutlineGhostPresetsSection.tsx" &&
      !delegatesToPresetBrowser
    ) {
      const presetMarkers = [
        ["search", /Search presets/],
        ["reset filters", /Reset filters|preset-reset-filters/],
        ["surprise", /Surprise me/],
        ["pagination", /preset-pagination|Page \{/],
        ["empty state", /preset-empty-state|No .*presets match/],
        [
          "applied state",
          /data-applied|activePresetId|isApplied|isPresetStateApplied/,
        ],
      ];
      for (const [capability, pattern] of presetMarkers) {
        if (!pattern.test(source)) {
          failures.push(
            `${slug}/${fileName}: preset browser is missing ${capability}`,
          );
        }
      }

      if (
        source.includes('import type { StudioPreset } from "../types";') &&
        !source.includes("controls/presets/PresetBrowser")
      ) {
        failures.push(
          `${slug}/${fileName}: StudioPreset catalog bypasses canonical PresetBrowser`,
        );
      }
    }

    if (!isEditorFileExempt(fileName)) {
      for (const match of source.matchAll(/<(input|select|textarea)\b[^>]*>/g)) {
        const [openingTag, control] = match;
        if (
          control === "input" &&
          openingTag.includes("data-native-anatomy=")
        ) {
          notes.push(`${slug}/${fileName}: approved native input anatomy`);
          continue;
        }
        failures.push(`${slug}/${fileName}: raw ${control} editor control`);
      }
    }
  }
}

auditSharedDefinitions();
const components = listComponentDirectories();
components.forEach(auditComponent);

console.log(
  JSON.stringify(
    {
      components: components.length,
      failures,
      notes,
    },
    null,
    2,
  ),
);

if (failures.length > 0) process.exitCode = 1;
