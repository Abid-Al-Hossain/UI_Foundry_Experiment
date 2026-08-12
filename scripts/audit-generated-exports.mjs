import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";

const projectRoot = process.cwd();
const motherComponentsRoot = path.join(projectRoot, "app", "components");
const standaloneMode = !fs.existsSync(motherComponentsRoot);
const componentsRoot = standaloneMode
  ? path.join(projectRoot, "app")
  : motherComponentsRoot;
const nativeRequire = createRequire(import.meta.url);
const moduleCache = new Map();
const matureExportBuilders = {
  avatar: "buildAvatarExport",
  badge: "buildBadgeExportPayload",
  button: "buildExportPayload",
  buttons: "buildExportPayload",
  checkbox: "buildCheckboxExportPayload",
  divider: "buildDividerExportPayload",
  icon: "buildIconExportPayload",
  image: "buildImageExportPayload",
  input: "buildTextInputExportPayload",
  progress: "buildProgressExport",
  radio: "buildRadioExportPayload",
  spinner: "buildSpinnerExport",
  textarea: "buildTextareaExportPayload",
  toggle: "buildToggleExportPayload",
  tooltip: "buildExportPayload",
  typography: "buildTypographyExport",
};

function resolveLocal(request, fromFile) {
  const base = request.startsWith("@/")
    ? path.join(projectRoot, request.slice(2))
    : path.resolve(path.dirname(fromFile), request);
  const candidates = [base, `${base}.ts`, `${base}.tsx`, `${base}.js`, `${base}.mjs`, path.join(base, "index.ts"), path.join(base, "index.tsx")];
  return candidates.find((candidate) => fs.existsSync(candidate));
}

function loadTypeScriptModule(filePath) {
  const absolutePath = path.resolve(filePath);
  if (moduleCache.has(absolutePath)) return moduleCache.get(absolutePath).exports;

  const moduleRecord = { exports: {} };
  moduleCache.set(absolutePath, moduleRecord);
  const source = fs.readFileSync(absolutePath, "utf8");
  const transpiled = ts.transpileModule(source, {
    fileName: absolutePath,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
    reportDiagnostics: true,
  });
  const syntaxErrors = (transpiled.diagnostics ?? []).filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error);
  if (syntaxErrors.length) throw new Error(formatDiagnostics(syntaxErrors));

  const localRequire = (request) => {
    if (request.startsWith(".") || request.startsWith("@/")) {
      const resolved = resolveLocal(request, absolutePath);
      if (!resolved) throw new Error(`Cannot resolve ${request} from ${absolutePath}`);
      if (/\.(?:ts|tsx)$/.test(resolved)) return loadTypeScriptModule(resolved);
      return nativeRequire(resolved);
    }
    return nativeRequire(request);
  };
  const execute = new Function("require", "module", "exports", "__filename", "__dirname", transpiled.outputText);
  execute(localRequire, moduleRecord, moduleRecord.exports, absolutePath, path.dirname(absolutePath));
  return moduleRecord.exports;
}

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}

function formatDiagnostics(diagnostics) {
  return diagnostics.map((diagnostic) => {
    const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
    if (!diagnostic.file || diagnostic.start === undefined) return message;
    const position = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
    const sourceLines = diagnostic.file.text.split(/\r?\n/);
    const context = sourceLines.slice(Math.max(0, position.line - 2), position.line + 3)
      .map((line, offset) => `${Math.max(0, position.line - 2) + offset + 1}: ${line}`)
      .join("\n");
    return `${path.relative(projectRoot, diagnostic.file.fileName)}:${position.line + 1}:${position.character + 1} ${message}${context ? `\n${context}` : ""}`;
  }).join("\n");
}

function findDefaultState(componentDirectory) {
  const dataDirectory = path.join(componentDirectory, "_data");
  const presetFiles = walk(dataDirectory).filter((file) => /presets?\.ts$/i.test(file));
  for (const presetFile of presetFiles) {
    const exports = loadTypeScriptModule(presetFile);
    const entry = Object.entries(exports).find(([name, value]) => name.startsWith("DEFAULT_") && value && typeof value === "object" && !Array.isArray(value));
    if (entry) return entry[1];
  }
  const typesFile = path.join(componentDirectory, "types.ts");
  if (fs.existsSync(typesFile)) {
    const exports = loadTypeScriptModule(typesFile);
    const entry = Object.entries(exports).find(([name, value]) => ((name.startsWith("INITIAL") && name.endsWith("STATE")) || name.startsWith("DEFAULT_")) && value && typeof value === "object" && !Array.isArray(value));
    if (entry) return entry[1];
  }
  return null;
}

function findDeclaredStateKeys(componentDirectory) {
  const typesFile = path.join(componentDirectory, "types.ts");
  if (!fs.existsSync(typesFile)) return [];
  const source = fs.readFileSync(typesFile, "utf8");
  const sourceFile = ts.createSourceFile(typesFile, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const keys = [];
  for (const node of sourceFile.statements) {
    if (!ts.isTypeAliasDeclaration(node) || !node.name.text.endsWith("State") || !ts.isTypeLiteralNode(node.type)) continue;
    for (const member of node.type.members) {
      if (!ts.isPropertySignature(member) || !member.name) continue;
      if (ts.isIdentifier(member.name) || ts.isStringLiteral(member.name)) keys.push(member.name.text);
    }
  }
  return keys;
}

const componentDirectories = standaloneMode
  ? [componentsRoot]
  : fs
      .readdirSync(componentsRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => path.join(componentsRoot, entry.name));
const generated = [];
const failures = [];
const skipped = [];

for (const componentDirectory of componentDirectories) {
  const slug = standaloneMode
    ? path.basename(projectRoot).replace(/-component$/, "")
    : path.basename(componentDirectory);
  const exportFile = path.join(componentDirectory, "_utils", "exportUtils.ts");
  if (!fs.existsSync(exportFile)) continue;

  try {
    const defaultState = findDefaultState(componentDirectory);
    if (!defaultState) {
      skipped.push(`${slug}: no exported DEFAULT_* state found`);
      continue;
    }
    const exports = loadTypeScriptModule(exportFile);
    let code;
    let generatedFileName = `${slug}.jsx`;
    if (typeof exports.buildReactCode === "function") {
      code = exports.buildReactCode(defaultState);
    } else {
      const builderName = matureExportBuilders[slug];
      const builder = builderName ? exports[builderName] : undefined;
      if (typeof builder !== "function") {
        skipped.push(`${slug}: no supported React export builder found`);
        continue;
      }
      const result = builder({ ...defaultState, downloadName: `audit-${slug}`, componentName: `Audit${slug.replace(/(^|-)([a-z])/g, (_, _dash, letter) => letter.toUpperCase())}` });
      code = result?.content ?? result?.code;
      generatedFileName = result?.filename ?? `${slug}.tsx`;
    }
    if (typeof code !== "string" || !code.trim()) throw new Error("buildReactCode returned no code");

    const knownKeys = new Set([...Object.keys(defaultState), ...findDeclaredStateKeys(componentDirectory)]);
    const referencedKeys = [...code.matchAll(/\bstate\.([A-Za-z_$][\w$]*)/g)].map((match) => match[1]);
    const unknownKeys = [...new Set(referencedKeys.filter((key) => !knownKeys.has(key)))];
    if (unknownKeys.length) throw new Error(`generated code references unknown state fields: ${unknownKeys.join(", ")}`);
    const transpiled = ts.transpileModule(code, {
      fileName: generatedFileName,
      compilerOptions: {
        allowJs: generatedFileName.endsWith(".jsx"),
        checkJs: false,
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
      reportDiagnostics: true,
    });
    const syntaxErrors = (transpiled.diagnostics ?? []).filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error);
    if (syntaxErrors.length) throw new Error(formatDiagnostics(syntaxErrors));

    const moduleRecord = { exports: {} };
    const execute = new Function("require", "module", "exports", transpiled.outputText);
    execute(nativeRequire, moduleRecord, moduleRecord.exports);
    const Component = moduleRecord.exports.default;
    if (typeof Component !== "function") throw new Error("generated module has no default component export");
    const React = nativeRequire("react");
    const { renderToStaticMarkup } = nativeRequire("react-dom/server");
    renderToStaticMarkup(React.createElement(Component));
    generated.push({ slug, code });
  } catch (error) {
    failures.push(`${slug}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

console.log(`Generated export audit: ${generated.length} compiled and server-rendered, ${skipped.length} skipped, ${failures.length} failure(s).`);
for (const message of skipped) console.warn(`SKIP ${message}`);
for (const message of failures) console.error(`FAIL ${message}`);
if (failures.length) process.exitCode = 1;
