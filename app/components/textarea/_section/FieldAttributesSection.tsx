"use client";

import React from "react";
import { SectionCard, LabeledField, Segmented } from "@/app/components/controls/ui";
import SizeControl from "@/app/components/controls/input/SizeControl";
import Select from "@/app/components/controls/input/Select";
import { type TextareaSetter, type TextareaState } from "../types";
import Input from "@/app/components/controls/input/Input";
import Switch from "@/app/components/controls/input/Switch";

export default function FieldAttributesSection({
  state,
  setKey,
}: {
  state: TextareaState;
  setKey: TextareaSetter;
}) {
  return (
    <SectionCard
      title="Field Attributes"
      subtitle="Platform attributes, multiline sizing, wrap, and resize behavior."
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
              onChange={(v) => setKey("dir")(v as TextareaState["dir"])}
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
              setKey("autocomplete")(v as TextareaState["autocomplete"])
            }
            options={[
              { value: "off", label: "Off" },
              { value: "on", label: "On" },
            ]}
          />
        </LabeledField>

        <div className="grid grid-cols-2 gap-3">
          <LabeledField label="Input Mode">
            <Select
              value={state.inputMode}
              onChange={(v) =>
                setKey("inputMode")(v as TextareaState["inputMode"])
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
                setKey("enterKeyHint")(v as TextareaState["enterKeyHint"])
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
                setKey("autoCapitalize")(v as TextareaState["autoCapitalize"])
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
                setKey("autoCorrect")(v as TextareaState["autoCorrect"])
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
          id="textarea-spellcheck-field"
          checked={state.spellcheck}
          onChange={(checked) => setKey("spellcheck")(checked)}
        />

        <div className="grid grid-cols-2 gap-3">
          <SizeControl
            label="Rows"
            value={state.rows}
            onChange={(v) => setKey("rows")(v)}
            min={1}
            max={20}
            step={1}
          />
          <SizeControl
            label="Min Rows"
            value={state.minRows}
            onChange={(v) => setKey("minRows")(v)}
            min={1}
            max={24}
            step={1}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SizeControl
            label="Max Rows"
            value={state.maxRows}
            onChange={(v) => setKey("maxRows")(v)}
            min={state.minRows}
            max={30}
            step={1}
          />
          <SizeControl
            label="Cols"
            value={state.cols}
            onChange={(v) => setKey("cols")(v)}
            min={10}
            max={100}
            step={5}
          />
        </div>

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

        <LabeledField label="Wrap">
          <Segmented
            value={state.wrap}
            onChange={(v) => setKey("wrap")(v as TextareaState["wrap"])}
            items={[
              { value: "soft", label: "Soft" },
              { value: "hard", label: "Hard" },
              { value: "off", label: "Off" },
            ]}
          />
        </LabeledField>

        <LabeledField label="Resize">
          <Select
            value={state.resize}
            onChange={(v) => setKey("resize")(v as TextareaState["resize"])}
            options={[
              { value: "none", label: "None" },
              { value: "both", label: "Both" },
              { value: "horizontal", label: "Horizontal" },
              { value: "vertical", label: "Vertical" },
            ]}
          />
        </LabeledField>
      </div>
    </SectionCard>
  );
}
