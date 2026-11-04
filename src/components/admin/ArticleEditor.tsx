"use client";
import { useState, useId } from "react";
import { Plus, ArrowUp, ArrowDown, X } from "lucide-react";
import RichTextRenderer from "@/components/marketing/RichTextRenderer";
export default function ArticleEditor({
  value,
  onChange,
  label = "Article",
  compact = false,
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  compact?: boolean;
}) {
  const [mode, setMode] = useState<"write" | "preview" | "source">("write");
  const id = useId();
  let document: Record<string, any> | null = null;
  let narrative: Record<string, any> | null = null;
  let unsupported = false;
  try {
    const parsed = JSON.parse(value);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      if (
        Array.isArray(parsed.sections) &&
        parsed.sections.every(
          (section: any) =>
            section &&
            typeof section === "object" &&
            !Array.isArray(section) &&
            (section.heading === undefined ||
              typeof section.heading === "string") &&
            (section.content === undefined ||
              typeof section.content === "string"),
        )
      )
        document = parsed;
      else if (
        (typeof parsed.summary === "string" ||
          Array.isArray(parsed.bulletPoints)) &&
        (parsed.summary === undefined || typeof parsed.summary === "string") &&
        (parsed.bulletPoints === undefined ||
          (Array.isArray(parsed.bulletPoints) &&
            parsed.bulletPoints.every(
              (point: unknown) => typeof point === "string",
            )))
      )
        narrative = parsed;
      else unsupported = true;
    } else if (Array.isArray(parsed)) unsupported = true;
  } catch {
    /* Plain text articles are also supported. */
  }
  const sections: { heading?: string; content?: string }[] =
    document?.sections || [];
  function update(next: typeof sections) {
    onChange(JSON.stringify({ ...document, sections: next }, null, 2));
  }
  function move(index: number, offset: number) {
    const next = [...sections];
    [next[index], next[index + offset]] = [next[index + offset], next[index]];
    update(next);
  }
  const points: string[] = narrative?.bulletPoints || [];
  function updateNarrative(change: Record<string, unknown>) {
    onChange(JSON.stringify({ ...narrative, ...change }, null, 2));
  }
  function movePoint(index: number, offset: number) {
    const next = [...points];
    [next[index], next[index + offset]] = [next[index + offset], next[index]];
    updateNarrative({ bulletPoints: next });
  }
  return (
    <div
      className={`admin-article-editor${compact ? " admin-editor-compact" : ""}`}
    >
      <div
        className="admin-editor-tabs"
        role="group"
        aria-label={`${label} editor view`}
      >
        {(["write", "preview", "source"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            aria-pressed={mode === tab}
            onClick={() => setMode(tab)}
            aria-controls={`${id}-panel`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div id={`${id}-panel`}>
        {mode === "preview" ? (
          <div className="admin-article-preview">
            {unsupported ? (
              <p>
                This content uses a custom structure. Use Source to review it;
                your original data is preserved.
              </p>
            ) : (
              <RichTextRenderer content={value} />
            )}
            {!value.trim() && <p>Your preview will appear here.</p>}
          </div>
        ) : mode === "source" || (!document && !narrative) ? (
          <>
            <label htmlFor={`${id}-body`} className="sr-only">
              {`${label} ${mode === "source" ? "source" : "body"}`}
            </label>
            <textarea
              id={`${id}-body`}
              className="admin-source-textarea"
              rows={compact ? 7 : 16}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={`Write ${label.toLowerCase()} here…`}
              spellCheck={mode !== "source"}
            />
            <p className="admin-editor-help">
              {mode === "source"
                ? "Edit the original text or JSON. Switching views never changes your saved format."
                : unsupported
                  ? "This content uses a custom structure. Edit it here or in Source; all existing data is preserved."
                  : "Write in paragraphs. Empty lines separate paragraphs on the website."}
            </p>
          </>
        ) : narrative ? (
          <div className="admin-editor-narrative">
            <label htmlFor={`${id}-summary`}>Summary</label>
            <textarea
              id={`${id}-summary`}
              aria-label={`${label} summary`}
              rows={5}
              value={narrative.summary || ""}
              onChange={(e) => updateNarrative({ summary: e.target.value })}
              placeholder="Explain this part of the project…"
            />
            <div className="admin-editor-section-head">
              <span>
                KEY POINTS <span>(optional)</span>
              </span>
            </div>
            <div className="admin-editor-points">
              {points.map((point, index) => (
                <div className="admin-editor-point" key={index}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <textarea
                    aria-label={`${label} point ${index + 1}`}
                    rows={2}
                    value={point}
                    onChange={(e) =>
                      updateNarrative({
                        bulletPoints: points.map((p, i) =>
                          i === index ? e.target.value : p,
                        ),
                      })
                    }
                    placeholder="Add a key point…"
                  />
                  <div className="admin-editor-point-actions">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => movePoint(index, -1)}
                      aria-label={`Move point ${index + 1} up`}
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      type="button"
                      disabled={index === points.length - 1}
                      onClick={() => movePoint(index, 1)}
                      aria-label={`Move point ${index + 1} down`}
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        updateNarrative({
                          bulletPoints: points.filter((_, i) => i !== index),
                        })
                      }
                      aria-label={`Remove point ${index + 1}`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="admin-action"
              onClick={() => updateNarrative({ bulletPoints: [...points, ""] })}
            >
              <Plus size={16} /> Add a key point
            </button>
            <p className="admin-editor-help">
              Write naturally here. Preview shows the published layout; Source
              keeps your original structure available.
            </p>
          </div>
        ) : (
          <div>
            {sections.map((section, index) => (
              <div className="admin-editor-section" key={index}>
                <div className="admin-editor-section-head">
                  <span>SECTION {String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <button
                      type="button"
                      onClick={() => move(index, -1)}
                      disabled={index === 0}
                      aria-label={`Move section ${index + 1} up`}
                    >
                      <ArrowUp size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(index, 1)}
                      disabled={index === sections.length - 1}
                      aria-label={`Move section ${index + 1} down`}
                    >
                      <ArrowDown size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        update(sections.filter((_, i) => i !== index))
                      }
                      aria-label={`Remove section ${index + 1}`}
                    >
                      <X size={15} />
                    </button>
                  </div>
                </div>
                <label htmlFor={`${id}-${index}-heading`}>
                  Heading <span>(optional)</span>
                </label>
                <input
                  id={`${id}-${index}-heading`}
                  value={section.heading || ""}
                  onChange={(e) =>
                    update(
                      sections.map((s, i) =>
                        i === index ? { ...s, heading: e.target.value } : s,
                      ),
                    )
                  }
                  placeholder="Give this section a title"
                />
                <label htmlFor={`${id}-${index}-content`}>Paragraphs</label>
                <textarea
                  id={`${id}-${index}-content`}
                  rows={7}
                  value={section.content || ""}
                  onChange={(e) =>
                    update(
                      sections.map((s, i) =>
                        i === index ? { ...s, content: e.target.value } : s,
                      ),
                    )
                  }
                  placeholder="Share your perspective…"
                />
              </div>
            ))}
            <button
              type="button"
              className="admin-action"
              onClick={() =>
                update([...sections, { heading: "", content: "" }])
              }
            >
              <Plus size={16} /> Add a section
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
