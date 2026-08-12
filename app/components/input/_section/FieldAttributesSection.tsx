"use client";

import React from "react";
import { SectionCard, LabeledField } from "@/app/components/controls/ui";
import Select from "@/app/components/controls/input/Select";
import { type TextInputSetter, type TextInputState } from "../types";
import Input from "@/app/components/controls/input/Input";
import Switch from "@/app/components/controls/input/Switch";

export default function FieldAttributesSection({
  state,
  setKey,
}: {
  state: TextInputState;
  setKey: TextInputSetter;
}) {
  return (
    <SectionCard
      title="Field Attributes"
      subtitle="Platform attributes, keyboard hints, and numeric constraints."
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <LabeledField label="ID Attribute">
            <Input
              value={state.id}
              onNativeChange={(e) => setKey("id")(e.target.value)}
             />
          </LabeledField>
          <LabeledField label="Name Attribute">
            <Input
              value={state.name}
              onNativeChange={(e) => setKey("name")(e.target.value)}
             />
          </LabeledField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <LabeledField label="Title">
            <Input
              value={state.title}
              onNativeChange={(e) => setKey("title")(e.target.value)}
              placeholder="Helpful browser tooltip"
             />
          </LabeledField>
          <LabeledField label="Tab Index">
            <Input
              type="number"
              value={state.tabIndex}
              onNativeChange={(e) => setKey("tabIndex")(Number(e.target.value))}
             />
          </LabeledField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <LabeledField label="Direction">
            <Select
              value={state.dir}
              onChange={(v) => setKey("dir")(v as TextInputState["dir"])}
              options={[
                { value: "auto", label: "Auto" },
                { value: "ltr", label: "LTR" },
                { value: "rtl", label: "RTL" },
              ]}
            />
          </LabeledField>
          <LabeledField label="Language">
            <Input
              value={state.lang}
              onNativeChange={(e) => setKey("lang")(e.target.value)}
              placeholder="en-US"
             />
          </LabeledField>
        </div>

        <LabeledField label="Autocomplete">
          <Select
            value={state.autocomplete}
            onChange={(v) =>
              setKey("autocomplete")(v as TextInputState["autocomplete"])
            }
            options={[
              { value: "off", label: "Off" },
              { value: "on", label: "On" },
              { value: "name", label: "Name" },
              { value: "email", label: "Email" },
              { value: "tel", label: "Tel" },
              { value: "url", label: "URL" },
              { value: "current-password", label: "Current Password" },
              { value: "new-password", label: "New Password" },
              { value: "one-time-code", label: "One-Time Code" },
            ]}
          />
        </LabeledField>

        <div className="grid grid-cols-2 gap-3">
          <LabeledField label="Input Mode">
            <Select
              value={state.inputmode}
              onChange={(v) =>
                setKey("inputmode")(v as TextInputState["inputmode"])
              }
              options={[
                { value: "text", label: "Text" },
                { value: "decimal", label: "Decimal" },
                { value: "numeric", label: "Numeric" },
                { value: "tel", label: "Tel" },
                { value: "search", label: "Search" },
                { value: "email", label: "Email" },
                { value: "url", label: "URL" },
                { value: "none", label: "None" },
              ]}
            />
          </LabeledField>
          <LabeledField label="Enter Key Hint">
            <Select
              value={state.enterKeyHint}
              onChange={(v) =>
                setKey("enterKeyHint")(v as TextInputState["enterKeyHint"])
              }
              options={[
                { value: "enter", label: "Enter" },
                { value: "done", label: "Done" },
                { value: "go", label: "Go" },
                { value: "next", label: "Next" },
                { value: "previous", label: "Previous" },
                { value: "search", label: "Search" },
                { value: "send", label: "Send" },
              ]}
            />
          </LabeledField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <LabeledField label="Auto Capitalize">
            <Select
              value={state.autoCapitalize}
              onChange={(v) =>
                setKey("autoCapitalize")(v as TextInputState["autoCapitalize"])
              }
              options={[
                { value: "sentences", label: "Sentences" },
                { value: "words", label: "Words" },
                { value: "characters", label: "Characters" },
                { value: "none", label: "None" },
                { value: "off", label: "Off" },
              ]}
            />
          </LabeledField>
          <LabeledField label="Auto Correct">
            <Select
              value={state.autoCorrect}
              onChange={(v) =>
                setKey("autoCorrect")(v as TextInputState["autoCorrect"])
              }
              options={[
                { value: "off", label: "Off" },
                { value: "on", label: "On" },
              ]}
            />
          </LabeledField>
        </div>

        <Switch
          label={<>Spellcheck</>}
          id="input-spellcheck"
          checked={state.spellCheck}
          onChange={(checked) => setKey("spellCheck")(checked)}
        />

        <div className="grid grid-cols-2 gap-3">
          <LabeledField
            label="Max Length"
            hint={state.maxLength === 0 ? "off" : `${state.maxLength}`}
          >
            <Input
              type="number"
              min={0}
              value={state.maxLength}
              onNativeChange={(e) => setKey("maxLength")(Number(e.target.value))}
             />
          </LabeledField>
          <LabeledField
            label="Min Length"
            hint={state.minLength === 0 ? "off" : `${state.minLength}`}
          >
            <Input
              type="number"
              min={0}
              value={state.minLength}
              onNativeChange={(e) => setKey("minLength")(Number(e.target.value))}
             />
          </LabeledField>
        </div>

        <LabeledField label="Pattern (regex)" hint="e.g. [A-Za-z]+">
          <Input
            value={state.pattern}
            onNativeChange={(e) => setKey("pattern")(e.target.value)}
           />
        </LabeledField>

        {state.inputType === "number" && (
          <div className="grid grid-cols-3 gap-3">
            <LabeledField label="Min">
              <Input
                value={state.minValue}
                onNativeChange={(e) => setKey("minValue")(e.target.value)}
                placeholder="0"
               />
            </LabeledField>
            <LabeledField label="Max">
              <Input
                value={state.maxValue}
                onNativeChange={(e) => setKey("maxValue")(e.target.value)}
                placeholder="100"
               />
            </LabeledField>
            <LabeledField label="Step">
              <Input
                value={state.stepValue}
                onNativeChange={(e) => setKey("stepValue")(e.target.value)}
                placeholder="1"
               />
            </LabeledField>
          </div>
        )}
      </div>
    </SectionCard>
  );
}
