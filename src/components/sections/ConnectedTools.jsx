function ToolLogos({ duplicate = false }) {
  return (
    <div className="tool-logo-group" aria-hidden={duplicate || undefined}>
      <span className="n8n-mark">⌘ n8n</span>
      <span>OpenAI</span>
      <span className="supabase-mark">ϟ supabase</span>
      <span className="anthropic-mark">ANTHROPIC</span>
      <span>
        Python<span className="tool-dot">●</span>
      </span>
      <span>Pinecone</span>
    </div>
  );
}

export default function ConnectedTools() {
  return (
    <section className="tools-section wrap" aria-label="Connected tools">
      <div className="tools-strip">
        <p>
          CONNECTED TO THE
          <br />
          TOOLS YOU ALREADY USE
        </p>
        <div className="tool-names tools-marquee">
          <div className="tool-logo-track">
            <ToolLogos />
            <ToolLogos duplicate />
          </div>
        </div>
      </div>
    </section>
  );
}
