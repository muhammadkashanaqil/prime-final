import Link from "next/link";
import RichTextRenderer from "@/components/marketing/RichTextRenderer";
export default function Faq({ faqs = [] }: { faqs?: any[] }) {
  return (
    <section
      className="faq section wrap home-cms-faq"
      id="faq"
      aria-labelledby="faq-title"
    >
      <div>
        <span className="eyebrow">A FEW GOOD QUESTIONS</span>
        <h2 id="faq-title" data-reveal="">
          Clarity
          <br />
          comes first.
        </h2>
        <Link
          href="/faq"
          className="text-link"
          style={{ marginTop: 20, display: "inline-flex" }}
        >
          All your questions ↗
        </Link>
      </div>
      <div className="faq-list">
        {faqs.length ? (
          faqs.map((faq) => (
            <details key={faq.id}>
              <summary>
                {faq.question}
                <span>+</span>
              </summary>
              <div style={{ paddingBottom: 24 }}>
                <RichTextRenderer content={faq.answer} />
              </div>
            </details>
          ))
        ) : (
          <p>
            Have a question about your project?{" "}
            <Link href="/contact" className="text-link">
              Let’s talk ↗
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
