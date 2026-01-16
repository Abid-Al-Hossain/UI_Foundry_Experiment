"use client";

import React, { useState, useMemo } from "react";
import * as LucideIcons from "lucide-react";
import { type IconState } from "../types";

// Get all icon names, filtering out non-component exports
const ICON_NAMES = Object.keys(LucideIcons).filter(
  (key) => key !== "icons" && key !== "createLucideIcon" && key !== "default",
);

export default function IconSelectionSection({
  state,
  setKey,
}: {
  state: IconState;
  setKey: (key: keyof IconState) => (val: any) => void;
}) {
  const [search, setSearch] = useState("");
  const setIconName = setKey("iconName");

  const filteredIcons = useMemo(() => {
    if (!search) return ICON_NAMES.slice(0, 100); // Limit initial render for performance
    const lower = search.toLowerCase();
    return ICON_NAMES.filter((name) =>
      name.toLowerCase().includes(lower),
    ).slice(0, 100);
  }, [search]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Search Icon
        </label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search icons..."
          className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-5 gap-2 max-h-[300px] overflow-y-auto p-1 border rounded-xl bg-slate-50 dark:bg-slate-900/50">
        {filteredIcons.map((name) => {
          // @ts-ignore
          const Icon = LucideIcons[name] as React.ElementType;
          const isActive = state.iconName === name;

          if (!Icon) return null;

          return (
            <button
              key={name}
              onClick={() => setIconName(name)}
              title={name}
              className={`flex items-center justify-center p-2 rounded-lg transition-all aspect-square ${
                isActive
                  ? "bg-blue-600 text-white shadow-md scale-105"
                  : "bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
              }`}
            >
              <Icon size={20} />
            </button>
          );
        })}
      </div>
      <div className="text-xs text-center text-slate-400">
        Showing top {filteredIcons.length} matches
      </div>
    </div>
  );
}
