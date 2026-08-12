"use client";

import React, { useId } from "react";
import { Switch as HeadlessSwitch } from "@headlessui/react";

export interface SwitchProps {
  label?: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  "aria-label"?: string;
}

export default function Switch({
  label,
  checked,
  onChange,
  disabled,
  id,
  "aria-label": ariaLabel,
}: SwitchProps) {
  const generatedId = useId();
  const switchId = id ?? generatedId;
  const switchNode = (
    <HeadlessSwitch
      id={switchId}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      aria-label={label ? undefined : ariaLabel ?? "Toggle setting"}
      className={`${checked ? "bg-[var(--primary)]" : "bg-slate-700"} relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-50`}
    >
      <span
        aria-hidden="true"
        className={`${checked ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
    </HeadlessSwitch>
  );

  if (!label) return switchNode;

  return (
    <div className="flex items-center justify-between gap-3">
      <label htmlFor={switchId} className="text-sm font-medium text-slate-300">{label}</label>
      {switchNode}
    </div>
  );
}
