"use client";

import React, { useId } from "react";

export interface LabeledFieldProps {
  label: React.ReactNode;
  children: React.ReactNode;
  hint?: React.ReactNode;
  description?: string;
  error?: string;
  required?: boolean;
  id?: string;
}

type FieldChildProps = {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  required?: boolean;
};

export function LabeledField({
  label,
  children,
  hint,
  description,
  error,
  required,
  id,
}: LabeledFieldProps) {
  const generatedId = useId();
  const childElement = React.isValidElement<FieldChildProps>(children) ? children : null;
  const fieldId = id ?? childElement?.props.id ?? generatedId;
  const descriptionId = description ? `${fieldId}-description` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy = [childElement?.props["aria-describedby"], descriptionId, errorId]
    .filter(Boolean)
    .join(" ") || undefined;
  const control = childElement
    ? React.cloneElement(childElement, {
        id: fieldId,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : childElement.props["aria-invalid"],
        required: required ?? childElement.props.required,
      })
    : children;

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={fieldId} className="text-sm font-medium" style={{ color: "var(--text)" }}>
          {label}
          {required ? <span aria-hidden="true"> *</span> : null}
        </label>
        {hint ? <span className="text-xs" style={{ color: "var(--muted)" }}>{hint}</span> : null}
      </div>
      <div className="mt-2">{control}</div>
      {description ? <p id={descriptionId} className="mt-1 text-xs" style={{ color: "var(--muted)" }}>{description}</p> : null}
      {error ? <p id={errorId} role="alert" className="mt-1 text-xs text-red-400">{error}</p> : null}
    </div>
  );
}

export default LabeledField;
