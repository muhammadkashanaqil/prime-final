export const projects = {
  support: {
    category: "AI AGENTS / E-COMMERCE & RETAIL",
    client: "OmniRetail Global",
    title: "Customer support.<br>Without the bottleneck.",
    introduction:
      "An AI support system that handles routine questions and routes the conversations that need a human.",
    tags: ["Customer support", "Knowledge retrieval", "Human handoff"],
    challenge:
      "Repeated questions create queues, while useful customer and order information lives in separate systems. The opportunity is to connect that context with the conversation, without losing the ability to involve a person.",
    steps: [
      [
        "01 / TRIGGER",
        "A question arrives",
        "A customer starts a conversation about an order, a product, or a routine support issue.",
      ],
      [
        "02 / INTELLIGENCE",
        "Retrieve the context",
        "The agent works from connected business knowledge to find information relevant to the request.",
      ],
      [
        "03 / ACTION",
        "Resolve or hand off",
        "Routine questions receive a useful response. Exceptions are routed to the right person with context.",
      ],
    ],
    approach:
      "Keep the workflow grounded in approved knowledge, define the actions the agent can take, and make escalation part of the design. The result is a connected support experience built around your team’s operation.",
    service: "AI agents & chatbots",
  },
  documents: {
    category: "WORKFLOW AUTOMATION / FINANCE & OPERATIONS",
    client: "Apex FinServe",
    title: "From paperwork<br>to possibility.",
    introduction:
      "Invoice extraction, multi-currency verification, and ledger reconciliation in one connected workflow.",
    tags: ["Document processing", "Data validation", "Ledger reconciliation"],
    challenge:
      "Documents arrive in different formats, and moving their contents between systems creates repetitive work. A connected workflow brings extraction, verification, and reconciliation together while making exceptions visible.",
    steps: [
      [
        "01 / TRIGGER",
        "Receive the invoice",
        "An incoming document starts the process and carries its source context through the workflow.",
      ],
      [
        "02 / INTELLIGENCE",
        "Extract & validate",
        "Relevant fields are extracted and checked against the information the operation needs.",
      ],
      [
        "03 / ACTION",
        "Reconcile the ledger",
        "Validated information moves to the next system. Items needing review are surfaced to a person.",
      ],
    ],
    approach:
      "Connect each stage with explicit checks, review paths, and traceable outputs. Automate the repetitive transfer of information while keeping people involved in decisions that require judgement.",
    service: "Workflow automation",
  },
  pipelines: {
    category: "DATA ENGINEERING / LOGISTICS & SUPPLY CHAIN",
    client: "Nexus Logistics Partners",
    title: "A clearer view<br>of every move.",
    introduction:
      "A resilient data pipeline connecting operational events, anomaly detection, and supply-chain analytics.",
    tags: ["Event ingestion", "Data quality", "Operational analytics"],
    challenge:
      "Operational events become difficult to use when they arrive from disconnected systems with inconsistent structures. A dependable pipeline connects those events to a common analytical view.",
    steps: [
      [
        "01 / TRIGGER",
        "Ingest the events",
        "Bring operational records into a shared pipeline while preserving the source information.",
      ],
      [
        "02 / INTELLIGENCE",
        "Transform & check",
        "Apply consistent structures and quality checks, making unexpected inputs visible.",
      ],
      [
        "03 / ACTION",
        "Make data useful",
        "Deliver reliable inputs for analytics, reporting, and anomaly detection.",
      ],
    ],
    approach:
      "Treat recovery and observability as part of the pipeline. Define what healthy data looks like, make failures inspectable, and connect the outputs to the decisions your team needs to make.",
    service: "Data pipeline engineering",
  },
};

export const insights = {
  roi: {
    category: "PRIME PERSPECTIVES / STRATEGY",
    title: "A practical framework<br>for automation ROI.",
    introduction:
      "Turn time saved, fewer errors, and faster operations into a clearer business case.",
    body: `<h3>Start with a real workflow</h3><p>Choose a repeatable task your team understands. Map where it begins, where it ends, who touches it, and how often it happens. A precise workflow is easier to evaluate than a broad promise to “add AI.”</p><h3>Establish the baseline</h3><p>Record the time spent on an ordinary case, the frequency of exceptions, and the effort involved in fixing mistakes. Separate hands-on work from waiting time. Both can matter, but they answer different questions.</p><h3>Count the whole cost</h3><p>Include implementation, usage, maintenance, review, and the time required to train your team. Then compare those costs with a realistic estimate of the work that can be removed. Keep assumptions visible and use a range when inputs are uncertain.</p><div class="article-takeaway">Useful automation gives people back time they can actually use.</div><h3>Pilot, measure, refine</h3><p>Begin with a contained workflow and compare its performance with your baseline. Track time saved alongside quality, exceptions, and team adoption. Expand once the system is dependable and the value is clear.</p><p>The best first project is often the one with a clear trigger, consistent inputs, and a manageable path for exceptions.</p>`,
  },
  data: {
    category: "PRIME PERSPECTIVES / DATA ENGINEERING",
    title: "Better AI starts with<br>a resilient data pipeline.",
    introduction:
      "Clean inputs, recovery paths, and observability matter as much as the model.",
    body: `<h3>Know where the information comes from</h3><p>An AI system can only work usefully with the information it can access. Identify the sources that matter, how frequently they change, who owns them, and which parts are approved for the system to use.</p><h3>Check data before it becomes context</h3><p>A pipeline should do more than move records. It should check expected fields, identify missing values, and handle duplicates. When a source changes, make that change visible instead of silently passing an inconsistent record to the next step.</p><h3>Build a recovery path</h3><p>Connections fail and services become temporarily unavailable. Decide which operations can be retried, how to prevent duplicate actions, and when a person should investigate. Keep enough context to understand what happened without unnecessarily retaining sensitive data.</p><div class="article-takeaway">A dependable pipeline makes the system easier to trust, inspect, and improve.</div><h3>Monitor the inputs, too</h3><p>A successful request does not always mean useful data. Watch freshness, completeness, and the points where information stops moving. Connect these signals to the people responsible for the operation.</p><p>With a reliable data foundation, your team can spend more time improving the experience and less time diagnosing unclear inputs.</p>`,
  },
  agents: {
    category: "PRIME PERSPECTIVES / AI AGENTS",
    title: "When your business needs<br>more than a chatbot.",
    introduction:
      "From answering questions to completing useful work across your systems.",
    body: `<h3>Find the step after the answer</h3><p>A conversation is often the beginning of a workflow. A prospect needs to be qualified, a request needs to reach the right team, or a customer needs an update from another system. That next step is where connected automation can become useful.</p><h3>Ground the agent in your operation</h3><p>Give the agent access to approved knowledge and the specific tools it needs. Define what information it should collect, which actions it can take, and the situations in which it must ask for help. More access is not automatically more useful.</p><h3>Make boundaries visible</h3><p>An agent should be able to recognize missing information and hand off a conversation. Sensitive or consequential actions may need an explicit approval step. Design those checks as part of the customer experience.</p><div class="article-takeaway">The goal is a completed, useful task — with a clear path back to a person.</div><h3>Test the whole journey</h3><p>Evaluate real scenarios from the first question through the final action. Include unclear requests, unavailable tools, and customers who need human help. Review what the system did and improve the parts that create friction.</p><p>When knowledge, business rules, and connected tools work together, a chat interface can become a practical entry point to your operation.</p>`,
  },
};
