"use client";

import React from "react";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  label?: string;
  onChange?: (value: string) => void;
  onNativeChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export default function Textarea(props: TextareaProps) {
  const {
    className,
    label,
    onChange,
    onNativeChange,
    id,
    rows = 4,
    ...rest
  } = props;
  const generatedId = React.useId();
  const textareaId = id ?? generatedId;

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    onChange?.(event.currentTarget.value);
    onNativeChange?.(event);
  };

  const control = (
    <textarea
      {...rest}
      id={textareaId}
      rows={rows}
      onChange={handleChange}
      className={`min-h-24 w-full resize-y rounded-xl border px-3 py-2 text-sm outline-none transition-colors placeholder:text-slate-500 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/30 disabled:cursor-not-allowed disabled:opacity-50 ${className ?? ""}`}
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in oklab, var(--card) 65%, transparent)",
        color: "var(--text)",
        ...props.style,
      }}
    />
  );

  if (!label) return control;

  return (
    <label
      htmlFor={textareaId}
      className="grid gap-2 text-sm font-medium"
      style={{ color: "var(--text)" }}
    >
      <span>{label}</span>
      {control}
    </label>
  );
}
