"use client";

import React from "react";

export function Switch(props: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
}) {
  // Use provided ID or generate random one for accessibility
  const uniqueId =
    props.id || `switch-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex items-center gap-2">
      <input
        id={uniqueId}
        type="checkbox"
        checked={props.checked}
        onChange={(e) => props.onChange(e.target.checked)}
        className="uf-clickable h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        style={{ accentColor: "var(--primary)" }}
      />
      <label
        htmlFor={uniqueId}
        className="text-sm font-medium uf-clickable select-none"
        style={{ color: "var(--text)" }}
      >
        {props.label}
      </label>
    </div>
  );
}
