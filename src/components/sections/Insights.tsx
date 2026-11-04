import Link from "next/link";
export default function Insights({ posts = [] }: { posts?: any[] }) {
  return (
    <section className="insights section wrap" id="insights">
      <div className="section-heading">
        <div>
          <span className="eyebrow">PRIME / PERSPECTIVES</span>
          <h2 data-reveal="">
            A little perspective.
            <br />
            <span className="muted-heading">A lot of possibility.</span>
          </h2>
        </div>
        <Link href="/insights" className="text-link">
          All insights ↗
        </Link>
      </div>
      <div className="insight-grid">
        {posts.map((post, i) => (
          <Link
            key={post.id}
            href={`/insights/${post.slug}`}
            className="insight"
            data-reveal=""
          >
            <div
              className={`insight-art ${["roi-art", "data-art", "ai-art"][i % 3]}`}
              aria-hidden="true"
            >
              {post.coverImageUrl ? (
                <img
                  src={post.coverImageUrl}
                  alt=""
                  loading="lazy"
                  width="600"
                  height="400"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <>
                  <span>{["IDEAS ↗", "CONNECTED.", "NEXT."][i % 3]}</span>
                  <i />
                </>
              )}
            </div>
            <span className="insight-meta">
              {post.categoriesList?.[0] || "PERSPECTIVE"} / 0{i + 1}
            </span>
            <h3>{post.title}</h3>
            <span className="insight-link">
              Read the perspective{" "}
              <svg className="icon">
                <use href="#i-arrow" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
      {!posts.length && (
        <p style={{ paddingBlock: 24 }}>
          Fresh perspectives are on the way.{" "}
          <Link href="/services" className="text-link">
            Explore what we build ↗
          </Link>
        </p>
      )}
    </section>
  );
}
