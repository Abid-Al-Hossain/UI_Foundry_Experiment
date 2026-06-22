import React from "react";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";

export default function AccessibilitySection() {
  return (
    <div className="space-y-6">
      <Section title="Accessibility" subtitle="Reading and contrast guidance">
        <div className="text-xs text-slate-400 space-y-2">
          <p>
            - Use semantic heading levels in order when exporting type systems.
          </p>
          <p>
            - Prefer generous line height and high contrast for long-form copy.
          </p>
          <p>
            - Reserve truncation and no-wrap settings for tight UI labels, not
            full paragraphs.
          </p>
        </div>
      </Section>
    </div>
  );
}
