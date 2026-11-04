import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro, PageCTA } from "@/components/marketing/PageKit";
export const metadata: Metadata = {
  title: "About Prime",
  description:
    "We build intelligent systems that connect your workflows, data, and communications.",
};
const principles = [
  [
    "Useful before impressive.",
    "A system earns its place by making work easier. We start with a real problem and a clear idea of what better looks like.",
  ],
  [
    "Connect what works.",
    "Your existing tools and the knowledge of your team are our starting point. We build around them with thoughtful integrations.",
  ],
  [
    "Keep people in the loop.",
    "Good automation makes the next step clear. We consider exceptions, human handoffs, and the people who will use the system every day.",
  ],
  [
    "Build for the long run.",
    "Readable systems, useful documentation, and ongoing observation make it easier to maintain and improve what we build.",
  ],
];
export default function AboutPage() {
  return (
    <div className="pa-page">
      <div className="pa-container">
        <PageIntro
          eyebrow="PRIME / ABOUT US"
          title={
            <>
              Work can
              <br />
              <em>work better.</em>
            </>
          }
          description="We’re an engineering team connecting AI, data, and operations. Our work starts with your business—and the people behind it."
        >
          <Link className="pa-button" href="/contact">
            Meet your next possibility <ArrowUpRight size={18} />
          </Link>
        </PageIntro>
        <section className="pa-section pa-split">
          <div>
            <span className="pa-kicker">OUR POINT OF VIEW</span>
            <h2 style={{ marginTop: 22 }}>
              Better connections.
              <br />
              Better ways to work.
            </h2>
          </div>
          <div className="pa-prose">
            <p className="pa-statement">
              Most businesses don’t need another tool. They need the pieces to
              work together.
            </p>
            <p>
              Information gets stuck between systems. Teams repeat the same
              tasks. Good ideas wait behind a growing queue of everyday work.
            </p>
            <p>
              We help connect those pieces: useful AI agents, dependable
              workflows, and data that arrives where it’s needed. Each project
              begins with an understanding of your operation and a practical
              plan for improving it.
            </p>
            <p>
              From the first conversation to the handover, the goal stays the
              same: make your business easier to run.
            </p>
          </div>
        </section>
        <section className="pa-section">
          <div className="pa-section-heading">
            <div>
              <span className="pa-kicker">HOW WE THINK</span>
              <h2>A few things we build on.</h2>
            </div>
          </div>
          <div className="pa-principles">
            {principles.map(([title, description], i) => (
              <div className="pa-principle" key={title}>
                <span className="pa-number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="pa-section">
          <div className="pa-section-heading">
            <div>
              <span className="pa-kicker">WORKING TOGETHER</span>
              <h2>A clear path from idea to everyday use.</h2>
            </div>
          </div>
          <div className="pa-steps">
            {[
              [
                "Understand",
                "Map your workflow, talk through the constraints, and agree on the problem to solve.",
              ],
              [
                "Design",
                "Define the connections, responsibilities, and measures of success.",
              ],
              [
                "Build & test",
                "Develop in manageable steps. Test the happy path and the exceptions.",
              ],
              [
                "Launch & refine",
                "Support the handover, observe the system, and improve it with your team.",
              ],
            ].map(([title, text], i) => (
              <div className="pa-step" key={title}>
                <span className="pa-number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
        <PageCTA title="What could work better for you?" />
      </div>
    </div>
  );
}
