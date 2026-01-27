"use client";

import React from "react";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import { LabeledField } from "@/app/components/controls/layout/LabeledField";
import Select from "@/app/components/controls/input/Select";

import {
  TooltipState,
  ROLE_OPTIONS,
  FOCUS_MANAGEMENT_OPTIONS,
  TooltipRole,
  FocusManagementMode,
} from "../../types";

interface AccessibilitySectionProps {
  state: TooltipState;
  update: <K extends keyof TooltipState>(
    key: K,
    value: TooltipState[K],
  ) => void;
}

export default function AccessibilitySection({
  state,
  update,
}: AccessibilitySectionProps) {
  return (
    <div className="space-y-4">
      {/* ARIA Attributes */}
      <SectionCard
        title="ARIA Attributes"
        subtitle="Screen reader accessibility"
      >
        <div className="space-y-4">
          <LabeledField label="ARIA Label">
            <input
              type="text"
              value={state.ariaLabel}
              onChange={(e) => update("ariaLabel", e.target.value)}
              placeholder="Optional accessible label"
              className="w-full h-9 px-3 rounded-lg border text-sm outline-none focus:border-[var(--primary)] transition-colors"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--card) 65%, transparent)",
                color: "var(--text)",
              }}
            />
          </LabeledField>

          <LabeledField label="ARIA DescribedBy">
            <input
              type="text"
              value={state.ariaDescribedBy}
              onChange={(e) => update("ariaDescribedBy", e.target.value)}
              placeholder="ID of describing element"
              className="w-full h-9 px-3 rounded-lg border text-sm outline-none focus:border-[var(--primary)] transition-colors"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--card) 65%, transparent)",
                color: "var(--text)",
              }}
            />
          </LabeledField>
        </div>
      </SectionCard>

      {/* Role */}
      <SectionCard title="Role" subtitle="WAI-ARIA role for the tooltip">
        <LabeledField label="Role">
          <Select
            value={state.role}
            onChange={(v) => update("role", v as TooltipRole)}
            options={ROLE_OPTIONS}
          />
        </LabeledField>

        <div
          className="mt-3 p-3 rounded-lg text-xs"
          style={{
            background: "var(--surface)",
            color: "var(--muted)",
          }}
        >
          <strong>Role descriptions:</strong>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>
              <code>tooltip</code> - Standard informational popup
            </li>
            <li>
              <code>menu</code> - Dropdown menu with options
            </li>
            <li>
              <code>dialog</code> - Modal-like interactive content
            </li>
            <li>
              <code>listbox</code> - Selectable list of options
            </li>
          </ul>
        </div>
      </SectionCard>

      {/* Focus Management */}
      <SectionCard
        title="Focus Management"
        subtitle="Keyboard navigation behavior"
      >
        <LabeledField label="Focus Mode">
          <Select
            value={state.focusManagement}
            onChange={(v) =>
              update("focusManagement", v as FocusManagementMode)
            }
            options={FOCUS_MANAGEMENT_OPTIONS}
          />
        </LabeledField>

        <div
          className="mt-3 p-3 rounded-lg text-xs"
          style={{
            background: "var(--surface)",
            color: "var(--muted)",
          }}
        >
          <strong>Focus modes:</strong>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>
              <code>none</code> - No automatic focus management
            </li>
            <li>
              <code>first</code> - Focus first focusable element
            </li>
            <li>
              <code>trap</code> - Trap focus within tooltip (modal-like)
            </li>
          </ul>
        </div>
      </SectionCard>

      {/* Accessibility Checklist */}
      <SectionCard title="Best Practices" subtitle="Accessibility checklist">
        <div className="space-y-2">
          <AccessibilityCheck
            passed={state.triggerEvent.includes("focus")}
            label="Keyboard accessible (focus trigger enabled)"
          />
          <AccessibilityCheck
            passed={state.hideOnEscapeKey}
            label="Escape key dismissal"
          />
          <AccessibilityCheck
            passed={state.role === "tooltip"}
            label="Correct ARIA role for informational content"
          />
          <AccessibilityCheck
            passed={state.showDelay < 500}
            label="Reasonable show delay (< 500ms)"
          />
          <AccessibilityCheck
            passed={!state.disabled}
            label="Tooltip is enabled for all users"
          />
        </div>
      </SectionCard>
    </div>
  );
}

function AccessibilityCheck({
  passed,
  label,
}: {
  passed: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
        style={{
          background: passed
            ? "color-mix(in oklab, #22c55e 20%, transparent)"
            : "color-mix(in oklab, #ef4444 20%, transparent)",
          color: passed ? "#22c55e" : "#ef4444",
        }}
      >
        {passed ? "✓" : "×"}
      </span>
      <span style={{ color: "var(--text)" }}>{label}</span>
    </div>
  );
}
