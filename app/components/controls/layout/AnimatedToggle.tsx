"use client";

import { motion } from "framer-motion";
import { useId } from "react";

interface Option {
  value: string;
  label: string;
}

interface AnimatedToggleProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}

export function AnimatedToggle({
  value,
  onChange,
  options,
}: AnimatedToggleProps) {
  const layoutId = `toggle-bg-${useId().replace(/:/g, "")}`;
  return (
    <div
      role="group"
      aria-label="Choose an option"
      className="flex shrink-0 p-1 rounded-full relative"
      style={{
        background: "color-mix(in oklab, var(--surface) 90%, transparent)",
        border: "1px solid var(--border)",
      }}
    >
      {options.map((option) => (
        <button
          type="button"
          key={option.value}
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
          className={`relative z-10 px-4 py-1.5 text-xs font-semibold transition-colors duration-300 ${
            value === option.value
              ? "text-[var(--on-primary)]"
              : "text-[var(--muted)] hover:text-[var(--text)]"
          }`}
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          {value === option.value && (
            <motion.div
              layoutId={layoutId}
              className="absolute inset-0 rounded-full z-[-1] shadow-sm"
              style={{ background: "var(--primary)" }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {option.label}
        </button>
      ))}
    </div>
  );
}
