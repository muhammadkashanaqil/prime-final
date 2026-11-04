interface RichTextProps {
  content: any;
  className?: string;
}
export default function RichTextRenderer({
  content,
  className = "",
}: RichTextProps) {
  if (content === null || content === undefined || content === "") return null;
  if (typeof content === "string") {
    try {
      const parsed = JSON.parse(content);
      if (typeof parsed === "object" && parsed !== null)
        return <RichTextRenderer content={parsed} className={className} />;
    } catch {
      /* Plain text remains plain text; CMS input is never injected as HTML. */
    }
    return (
      <div className={`pa-prose ${className}`}>
        {content
          .split(/\n\s*\n/)
          .filter(Boolean)
          .map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
      </div>
    );
  }
  if (typeof content === "object" && Array.isArray(content.sections))
    return (
      <div className={`pa-prose ${className}`}>
        {content.sections.map((section: any, i: number) => (
          <section key={i}>
            {section.heading && <h3>{section.heading}</h3>}
            {section.content && <RichTextRenderer content={section.content} />}
          </section>
        ))}
      </div>
    );
  if (typeof content === "object" && (content.summary || content.bulletPoints))
    return (
      <div className={`pa-prose ${className}`}>
        {content.summary && <p>{content.summary}</p>}
        {Array.isArray(content.bulletPoints) && (
          <ul>
            {content.bulletPoints.map((point: string, i: number) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        )}
      </div>
    );
  return null;
}
