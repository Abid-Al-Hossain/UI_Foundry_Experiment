"use client";

import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";

const HISTORY_LIMIT = 100;

type HistoryState<T> = {
  past: T[];
  present: T;
  future: T[];
  lastCommitted: T;
  hasPendingEdit: boolean;
};

type HistoryAction<T> =
  | { type: "SET"; payload: T | ((previous: T) => T) }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "COMMIT" }
  | { type: "RESET"; payload: T };

function createReducer<T>() {
  return (state: HistoryState<T>, action: HistoryAction<T>): HistoryState<T> => {
    switch (action.type) {
      case "SET": {
        const nextPresent =
          typeof action.payload === "function"
            ? (action.payload as (previous: T) => T)(state.present)
            : action.payload;

        if (Object.is(nextPresent, state.present)) return state;

        return {
          ...state,
          present: nextPresent,
          // A divergent edit invalidates redo immediately, not after debounce.
          future: [],
          hasPendingEdit: !Object.is(nextPresent, state.lastCommitted),
        };
      }

      case "COMMIT": {
        if (!state.hasPendingEdit || Object.is(state.present, state.lastCommitted)) {
          return { ...state, hasPendingEdit: false };
        }

        return {
          past: [...state.past, state.lastCommitted].slice(-HISTORY_LIMIT),
          present: state.present,
          future: [],
          lastCommitted: state.present,
          hasPendingEdit: false,
        };
      }

      case "UNDO": {
        // Undoing during the debounce window restores the last committed state,
        // rather than skipping over it to an older history entry.
        if (state.hasPendingEdit) {
          return {
            ...state,
            present: state.lastCommitted,
            future: [state.present, ...state.future].slice(0, HISTORY_LIMIT),
            hasPendingEdit: false,
          };
        }

        if (state.past.length === 0) return state;
        const previous = state.past[state.past.length - 1];
        return {
          past: state.past.slice(0, -1),
          present: previous,
          future: [state.present, ...state.future].slice(0, HISTORY_LIMIT),
          lastCommitted: previous,
          hasPendingEdit: false,
        };
      }

      case "REDO": {
        if (state.hasPendingEdit || state.future.length === 0) return state;
        const next = state.future[0];
        return {
          past: [...state.past, state.present].slice(-HISTORY_LIMIT),
          present: next,
          future: state.future.slice(1),
          lastCommitted: next,
          hasPendingEdit: false,
        };
      }

      case "RESET":
        return {
          past: [],
          present: action.payload,
          future: [],
          lastCommitted: action.payload,
          hasPendingEdit: false,
        };
    }
  };
}

export function useHistoryState<T>(initialState: T, delayMs = 500) {
  const reducer = useMemo(() => createReducer<T>(), []);
  const [historyState, dispatch] = useReducer(reducer, {
    past: [],
    present: initialState,
    future: [],
    lastCommitted: initialState,
    hasPendingEdit: false,
  });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initialStateRef = useRef(initialState);

  const clearPendingTimer = useCallback(() => {
    if (!timeoutRef.current) return;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }, []);

  useEffect(() => clearPendingTimer, [clearPendingTimer]);

  const undo = useCallback(() => {
    clearPendingTimer();
    dispatch({ type: "UNDO" });
  }, [clearPendingTimer]);

  const redo = useCallback(() => {
    clearPendingTimer();
    dispatch({ type: "REDO" });
  }, [clearPendingTimer]);

  const set = useCallback(
    (value: T | ((previous: T) => T)) => {
      dispatch({ type: "SET", payload: value });
      clearPendingTimer();
      timeoutRef.current = setTimeout(() => {
        dispatch({ type: "COMMIT" });
        timeoutRef.current = null;
      }, delayMs);
    },
    [clearPendingTimer, delayMs],
  );

  const pushSnapshot = useCallback(() => {
    clearPendingTimer();
    dispatch({ type: "COMMIT" });
  }, [clearPendingTimer]);

  const reset = useCallback(() => {
    clearPendingTimer();
    dispatch({ type: "RESET", payload: initialStateRef.current });
  }, [clearPendingTimer]);

  return {
    state: historyState.present,
    set,
    undo,
    redo,
    reset,
    canUndo: historyState.hasPendingEdit || historyState.past.length > 0,
    canRedo: !historyState.hasPendingEdit && historyState.future.length > 0,
    pushSnapshot,
  };
}
