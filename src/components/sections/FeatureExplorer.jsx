export default function FeatureExplorer() {
  return (
    <section
      className="ai-explorer"
      id="ai-in-action"
      aria-labelledby="ai-explorer-title"
    >
      <div className="wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">PRIME / AI IN ACTION</span>
            <h2 id="ai-explorer-title">
              Your operation.
              <br />
              Working together<span className="accent">.</span>
            </h2>
          </div>
          <p>
            Explore the AI systems we can build around your customers, your
            team, and the tools you already use.
          </p>
        </div>
        <div className="feature-layout">
          <div
            className="feature-tabs"
            role="tablist"
            aria-label="Explore AI systems"
            aria-orientation="vertical"
          >
            <button
              type="button"
              className="feature-tab"
              id="feature-tab-inbox"
              role="tab"
              aria-selected="false"
              aria-controls="feature-panel-inbox"
              tabIndex="-1"
            >
              <span className="feature-tab-icon">
                <svg className="icon" aria-hidden="true">
                  <use href="#i-inbox"></use>
                </svg>
              </span>
              <span className="feature-tab-label">
                AI Inbox<small>Hand off with context</small>
              </span>
            </button>
            <button
              type="button"
              className="feature-tab"
              id="feature-tab-copilot"
              role="tab"
              aria-selected="false"
              aria-controls="feature-panel-copilot"
              tabIndex="-1"
            >
              <span className="feature-tab-icon">
                <svg className="icon" aria-hidden="true">
                  <use href="#i-copilot"></use>
                </svg>
              </span>
              <span className="feature-tab-label">
                AI Copilot<small>Give your team a head start</small>
              </span>
            </button>
            <button
              type="button"
              className="feature-tab"
              id="feature-tab-operator"
              role="tab"
              aria-selected="true"
              aria-controls="feature-panel-operator"
              tabIndex="0"
            >
              <span className="feature-tab-icon">
                <svg className="icon" aria-hidden="true">
                  <use href="#i-spark"></use>
                </svg>
              </span>
              <span className="feature-tab-label">
                AI Operator<small>Turn requests into workflows</small>
              </span>
            </button>
            <button
              type="button"
              className="feature-tab"
              id="feature-tab-intelligence"
              role="tab"
              aria-selected="false"
              aria-controls="feature-panel-intelligence"
              tabIndex="-1"
            >
              <span className="feature-tab-icon">
                <svg className="icon" aria-hidden="true">
                  <use href="#i-insights"></use>
                </svg>
              </span>
              <span className="feature-tab-label">
                Agent Intelligence<small>See what needs attention</small>
              </span>
            </button>
            <button
              type="button"
              className="feature-tab"
              id="feature-tab-lab"
              role="tab"
              aria-selected="false"
              aria-controls="feature-panel-lab"
              tabIndex="-1"
            >
              <span className="feature-tab-icon">
                <svg className="icon" aria-hidden="true">
                  <use href="#i-lab"></use>
                </svg>
              </span>
              <span className="feature-tab-label">
                Customer Experience Lab
                <small>Rehearse real conversations</small>
              </span>
            </button>
            <button
              type="button"
              className="feature-tab"
              id="feature-tab-systems"
              role="tab"
              aria-selected="false"
              aria-controls="feature-panel-systems"
              tabIndex="-1"
            >
              <span className="feature-tab-icon">
                <svg className="icon" aria-hidden="true">
                  <use href="#i-data"></use>
                </svg>
              </span>
              <span className="feature-tab-label">
                Business Systems<small>Bring your tools together</small>
              </span>
            </button>
          </div>
          <div className="feature-workspace">
            <div className="feature-panels">
              <div
                className="feature-panel"
                id="feature-panel-inbox"
                role="tabpanel"
                aria-labelledby="feature-tab-inbox"
                tabIndex="0"
                hidden
              >
                <div className="feature-summary">
                  <h3>AI Inbox</h3>
                  <p>
                    Keep conversations moving when a person needs to step in.
                    Bring customer details, conversation history, and an
                    AI-prepared summary together so your team can pick up with
                    context.
                  </p>
                  <a
                    className="text-link feature-cta"
                    href="#contact"
                    data-audit=""
                    data-service="AI agents & chatbots"
                  >
                    Build your support workflow
                    <svg className="icon" aria-hidden="true">
                      <use href="#i-arrow"></use>
                    </svg>
                  </a>
                </div>
                <div className="feature-browser">
                  <div className="feature-browser-bar" aria-hidden="true">
                    <span className="feature-window-dots">
                      <i></i>
                      <i></i>
                      <i></i>
                    </span>
                    <span className="feature-address">
                      <svg className="icon" aria-hidden="true">
                        <use href="#i-lock"></use>
                      </svg>
                      prime / workspace / inbox
                    </span>
                  </div>
                  <div className="feature-demo-toolbar">
                    <span className="feature-demo-title">
                      <svg className="icon" aria-hidden="true">
                        <use href="#i-inbox"></use>
                      </svg>
                      AI Inbox
                    </span>
                    <span className="feature-demo-tag">ILLUSTRATIVE DEMO</span>
                  </div>
                  <div className="feature-demo-body">
                    <div className="demo-inbox">
                      <div className="demo-inbox-list">
                        <strong>
                          Team inbox <span>03</span>
                        </strong>
                        <div className="demo-thread is-current">
                          <strong>Alex Morgan</strong>Reschedule my visit
                          <small>Needs your team</small>
                        </div>
                        <div className="demo-thread">
                          <strong>Sam Taylor</strong>Pricing question
                          <small>Handled by AI</small>
                        </div>
                        <div className="demo-thread">
                          <strong>Jamie Chen</strong>Getting started
                          <small>Handled by AI</small>
                        </div>
                      </div>
                      <div>
                        <div className="demo-contact">
                          <span className="demo-avatar">AM</span>
                          <div>
                            <strong>Alex Morgan</strong>
                            <small>Website conversation</small>
                          </div>
                          <span className="demo-pill is-purple">
                            Human handoff
                          </span>
                        </div>
                        <div className="demo-message demo-message-user">
                          Could someone help move my appointment to Friday?
                        </div>
                        <div className="demo-note demo-step" data-demo-step="1">
                          <strong>
                            <svg className="icon" aria-hidden="true">
                              <use href="#i-spark"></use>
                            </svg>{" "}
                            AI handoff summary
                          </strong>
                          Alex wants to reschedule. The preferred date is
                          Friday. A team member needs to confirm availability.
                        </div>
                        <div
                          className="demo-response-footer demo-step"
                          data-demo-step="2"
                        >
                          <span className="demo-pill is-success">
                            <svg className="icon" aria-hidden="true">
                              <use href="#i-check"></use>
                            </svg>
                            Context included
                          </span>
                          <span className="demo-pill is-purple">
                            Assigned to your team
                          </span>
                        </div>
                        <div
                          className="demo-inline-complete demo-step"
                          data-demo-step="3"
                        >
                          <svg className="icon" aria-hidden="true">
                            <use href="#i-check"></use>
                          </svg>
                          Ready for a person to take over.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="feature-panel"
                id="feature-panel-copilot"
                role="tabpanel"
                aria-labelledby="feature-tab-copilot"
                tabIndex="0"
                hidden
              >
                <div className="feature-summary">
                  <h3>AI Copilot</h3>
                  <p>
                    Give your team a useful starting point for everyday work.
                    Surface relevant information and draft replies from your
                    business knowledge, with a person reviewing the response
                    before it is sent.
                  </p>
                  <a
                    className="text-link feature-cta"
                    href="#contact"
                    data-audit=""
                    data-service="Custom AI development"
                  >
                    Build your team’s copilot
                    <svg className="icon" aria-hidden="true">
                      <use href="#i-arrow"></use>
                    </svg>
                  </a>
                </div>
                <div className="feature-browser">
                  <div className="feature-browser-bar" aria-hidden="true">
                    <span className="feature-window-dots">
                      <i></i>
                      <i></i>
                      <i></i>
                    </span>
                    <span className="feature-address">
                      <svg className="icon" aria-hidden="true">
                        <use href="#i-lock"></use>
                      </svg>
                      prime / workspace / copilot
                    </span>
                  </div>
                  <div className="feature-demo-toolbar">
                    <span className="feature-demo-title">
                      <svg className="icon" aria-hidden="true">
                        <use href="#i-copilot"></use>
                      </svg>
                      AI Copilot
                    </span>
                    <span className="feature-demo-tag">ILLUSTRATIVE DEMO</span>
                  </div>
                  <div className="feature-demo-body">
                    <div className="demo-copilot">
                      <div className="demo-mail">
                        <span className="demo-eyebrow">CUSTOMER EMAIL</span>
                        <small>Alex Morgan · Example message</small>
                        <h4>What happens after we sign up?</h4>
                        <p>
                          Hi team, could you walk me through your onboarding
                          process and what you need from us?
                        </p>
                        <div className="demo-response-footer">
                          <span className="demo-pill is-purple">
                            New enquiry
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="demo-eyebrow">PRIME / COPILOT</span>
                        <div
                          className="demo-response demo-step"
                          data-demo-step="1"
                        >
                          <strong>
                            <svg className="icon" aria-hidden="true">
                              <use href="#i-spark"></use>
                            </svg>{" "}
                            Relevant knowledge found
                          </strong>
                          <p>Onboarding guide · Getting started</p>
                        </div>
                        <div
                          className="demo-draft demo-step"
                          data-demo-step="2"
                        >
                          “We start with a discovery call, map your workflow,
                          and agree on the first milestone. I can help you
                          arrange the next step.”
                        </div>
                        <div
                          className="demo-inline-complete demo-step"
                          data-demo-step="3"
                        >
                          <svg className="icon" aria-hidden="true">
                            <use href="#i-check"></use>
                          </svg>
                          Draft ready for your review.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="feature-panel"
                id="feature-panel-operator"
                role="tabpanel"
                aria-labelledby="feature-tab-operator"
                tabIndex="0"
              >
                <div className="feature-summary">
                  <h3>AI Operator</h3>
                  <p>
                    Manage AI workflows in plain language. Request a change,
                    review the proposed update, and decide when it goes
                    live—with a clear record of what changed and why.
                  </p>
                  <a
                    className="text-link feature-cta"
                    href="#contact"
                    data-audit=""
                    data-service="Custom AI development"
                  >
                    Build your AI operations layer
                    <svg className="icon" aria-hidden="true">
                      <use href="#i-arrow"></use>
                    </svg>
                  </a>
                </div>
                <div className="feature-browser">
                  <div className="feature-browser-bar" aria-hidden="true">
                    <span className="feature-window-dots">
                      <i></i>
                      <i></i>
                      <i></i>
                    </span>
                    <span className="feature-address">
                      <svg className="icon" aria-hidden="true">
                        <use href="#i-lock"></use>
                      </svg>
                      prime / workspace / operator
                    </span>
                  </div>
                  <div className="feature-demo-toolbar">
                    <span className="feature-demo-title">
                      <svg className="icon" aria-hidden="true">
                        <use href="#i-spark"></use>
                      </svg>
                      AI Operator
                    </span>
                    <span className="feature-demo-tag">ILLUSTRATIVE DEMO</span>
                  </div>
                  <div className="feature-demo-body">
                    <span className="demo-eyebrow">
                      AGENT SETTINGS / CONVERSATIONAL CONTROL
                    </span>
                    <div className="demo-message demo-message-user">
                      Make our support agent sound more direct and professional.
                    </div>
                    <div
                      className="demo-assistant demo-step"
                      data-demo-step="1"
                    >
                      <span className="demo-avatar">
                        <svg className="icon" aria-hidden="true">
                          <use href="#i-spark"></use>
                        </svg>
                      </span>
                      <div className="demo-response">
                        <strong>I’ve prepared an updated tone of voice.</strong>
                        <p>
                          Use shorter answers, clear next steps, and a calm,
                          professional tone. Keep existing escalation rules.
                        </p>
                        <div
                          className="demo-response-footer demo-step"
                          data-demo-step="2"
                        >
                          <span className="demo-pill is-success">
                            <svg className="icon" aria-hidden="true">
                              <use href="#i-check"></use>
                            </svg>
                            Tone updated
                          </span>
                          <span className="demo-pill is-success">
                            <svg className="icon" aria-hidden="true">
                              <use href="#i-check"></use>
                            </svg>
                            Handoff rules kept
                          </span>
                          <span className="demo-pill is-purple">
                            Awaiting your review
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="demo-complete demo-step" data-demo-step="3">
                      <svg className="icon" aria-hidden="true">
                        <use href="#i-check"></use>
                      </svg>
                      Proposed changes are ready. You choose when to apply them.
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="feature-panel"
                id="feature-panel-intelligence"
                role="tabpanel"
                aria-labelledby="feature-tab-intelligence"
                tabIndex="0"
                hidden
              >
                <div className="feature-summary">
                  <h3>Agent Intelligence</h3>
                  <p>
                    Bring conversations and workflow activity into a clear
                    performance view. Spot recurring questions, find missing
                    knowledge, and decide what to improve next.
                  </p>
                  <a
                    className="text-link feature-cta"
                    href="#contact"
                    data-audit=""
                    data-service="Data pipeline engineering"
                  >
                    Bring your data into focus
                    <svg className="icon" aria-hidden="true">
                      <use href="#i-arrow"></use>
                    </svg>
                  </a>
                </div>
                <div className="feature-browser">
                  <div className="feature-browser-bar" aria-hidden="true">
                    <span className="feature-window-dots">
                      <i></i>
                      <i></i>
                      <i></i>
                    </span>
                    <span className="feature-address">
                      <svg className="icon" aria-hidden="true">
                        <use href="#i-lock"></use>
                      </svg>
                      prime / workspace / intelligence
                    </span>
                  </div>
                  <div className="feature-demo-toolbar">
                    <span className="feature-demo-title">
                      <svg className="icon" aria-hidden="true">
                        <use href="#i-insights"></use>
                      </svg>
                      Agent Intelligence
                    </span>
                    <span className="feature-demo-tag">ILLUSTRATIVE DEMO</span>
                  </div>
                  <div className="feature-demo-body">
                    <div className="demo-chart-heading">
                      <span>Conversation overview</span>
                      <small>Example dataset · 7 days</small>
                    </div>
                    <div className="demo-metrics demo-step" data-demo-step="1">
                      <div className="demo-metric">
                        <span>Conversations</span>
                        <strong>248</strong>
                        <small>Across your channels</small>
                      </div>
                      <div className="demo-metric">
                        <span>AI resolution</span>
                        <strong>86%</strong>
                        <small>Sample performance</small>
                      </div>
                      <div className="demo-metric">
                        <span>Human handoffs</span>
                        <strong>35</strong>
                        <small>With context attached</small>
                      </div>
                    </div>
                    <div
                      className="demo-chart-box demo-step"
                      data-demo-step="2"
                    >
                      <div className="demo-chart-heading">
                        <span>Questions handled by AI</span>
                        <small>Sample activity</small>
                      </div>
                      <div
                        className="demo-bars"
                        role="img"
                        aria-label="Illustrative activity chart with seven days of sample conversation data"
                      >
                        <i style={{ "--bar-height": "38%" }}></i>
                        <i style={{ "--bar-height": "61%" }}></i>
                        <i style={{ "--bar-height": "48%" }}></i>
                        <i style={{ "--bar-height": "74%" }}></i>
                        <i style={{ "--bar-height": "67%" }}></i>
                        <i style={{ "--bar-height": "84%" }}></i>
                        <i style={{ "--bar-height": "94%" }}></i>
                      </div>
                      <div className="demo-chart-labels">
                        <span>MON</span>
                        <span>TUE</span>
                        <span>WED</span>
                        <span>THU</span>
                        <span>FRI</span>
                        <span>SAT</span>
                        <span>SUN</span>
                      </div>
                    </div>
                    <div
                      className="demo-recommendation demo-step"
                      data-demo-step="3"
                    >
                      <svg className="icon" aria-hidden="true">
                        <use href="#i-insights"></use>
                      </svg>{" "}
                      Suggested improvement: add an answer about rescheduling.
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="feature-panel"
                id="feature-panel-lab"
                role="tabpanel"
                aria-labelledby="feature-tab-lab"
                tabIndex="0"
                hidden
              >
                <div className="feature-summary">
                  <h3>Customer Experience Lab</h3>
                  <p>
                    Put your agent through realistic scenarios before rollout.
                    Test routine requests, missing information, and escalation
                    paths so your team can review the experience before
                    customers use it.
                  </p>
                  <a
                    className="text-link feature-cta"
                    href="#contact"
                    data-audit=""
                    data-service="AI audit & optimization"
                  >
                    Explore your testing workflow
                    <svg className="icon" aria-hidden="true">
                      <use href="#i-arrow"></use>
                    </svg>
                  </a>
                </div>
                <div className="feature-browser">
                  <div className="feature-browser-bar" aria-hidden="true">
                    <span className="feature-window-dots">
                      <i></i>
                      <i></i>
                      <i></i>
                    </span>
                    <span className="feature-address">
                      <svg className="icon" aria-hidden="true">
                        <use href="#i-lock"></use>
                      </svg>
                      prime / workspace / lab
                    </span>
                  </div>
                  <div className="feature-demo-toolbar">
                    <span className="feature-demo-title">
                      <svg className="icon" aria-hidden="true">
                        <use href="#i-lab"></use>
                      </svg>
                      Customer Experience Lab
                    </span>
                    <span className="feature-demo-tag">ILLUSTRATIVE DEMO</span>
                  </div>
                  <div className="feature-demo-body">
                    <div className="demo-test-heading">
                      Customer journey checks <small>3 sample scenarios</small>
                    </div>
                    <div className="demo-test-row demo-step" data-demo-step="1">
                      <span>
                        <svg className="icon" aria-hidden="true">
                          <use href="#i-chat"></use>
                        </svg>
                      </span>
                      <div>
                        <strong>A first-time visitor</strong>
                        <small>Asks about services and next steps</small>
                      </div>
                      <span className="demo-pill is-success">
                        <svg className="icon" aria-hidden="true">
                          <use href="#i-check"></use>
                        </svg>
                        Pass
                      </span>
                    </div>
                    <div className="demo-test-row demo-step" data-demo-step="2">
                      <span>
                        <svg className="icon" aria-hidden="true">
                          <use href="#i-copilot"></use>
                        </svg>
                      </span>
                      <div>
                        <strong>A request without enough detail</strong>
                        <small>Agent asks a clarifying question</small>
                      </div>
                      <span className="demo-pill is-success">
                        <svg className="icon" aria-hidden="true">
                          <use href="#i-check"></use>
                        </svg>
                        Pass
                      </span>
                    </div>
                    <div className="demo-test-row demo-step" data-demo-step="3">
                      <span>
                        <svg className="icon" aria-hidden="true">
                          <use href="#i-inbox"></use>
                        </svg>
                      </span>
                      <div>
                        <strong>A customer needs a person</strong>
                        <small>Conversation routes to your team</small>
                      </div>
                      <span className="demo-pill is-success">
                        <svg className="icon" aria-hidden="true">
                          <use href="#i-check"></use>
                        </svg>
                        Pass
                      </span>
                    </div>
                    <div
                      className="demo-test-note demo-step"
                      data-demo-step="3"
                    >
                      <svg className="icon" aria-hidden="true">
                        <use href="#i-check"></use>
                      </svg>{" "}
                      Review the results before approving your rollout.
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="feature-panel"
                id="feature-panel-systems"
                role="tabpanel"
                aria-labelledby="feature-tab-systems"
                tabIndex="0"
                hidden
              >
                <div className="feature-summary">
                  <h3>Business Systems</h3>
                  <p>
                    Connect AI with the software your business already runs on.
                    Bring your CRM, calendar, inbox, and internal data into a
                    workflow that carries the right information from one step to
                    the next.
                  </p>
                  <a
                    className="text-link feature-cta"
                    href="#contact"
                    data-audit=""
                    data-service="AI system integration"
                  >
                    Connect your business systems
                    <svg className="icon" aria-hidden="true">
                      <use href="#i-arrow"></use>
                    </svg>
                  </a>
                </div>
                <div className="feature-browser">
                  <div className="feature-browser-bar" aria-hidden="true">
                    <span className="feature-window-dots">
                      <i></i>
                      <i></i>
                      <i></i>
                    </span>
                    <span className="feature-address">
                      <svg className="icon" aria-hidden="true">
                        <use href="#i-lock"></use>
                      </svg>
                      prime / workspace / systems
                    </span>
                  </div>
                  <div className="feature-demo-toolbar">
                    <span className="feature-demo-title">
                      <svg className="icon" aria-hidden="true">
                        <use href="#i-data"></use>
                      </svg>
                      Business Systems
                    </span>
                    <span className="feature-demo-tag">ILLUSTRATIVE DEMO</span>
                  </div>
                  <div className="feature-demo-body">
                    <span className="demo-eyebrow">
                      YOUR TOOLS / ONE CONNECTED WORKFLOW
                    </span>
                    <div
                      className="demo-systems-grid demo-step"
                      data-demo-step="1"
                    >
                      <div className="demo-system">
                        <b>n8n</b>
                        <span>
                          n8n<small>Workflows</small>
                        </span>
                      </div>
                      <div className="demo-system">
                        <b>H</b>
                        <span>
                          HubSpot<small>Customer records</small>
                        </span>
                      </div>
                      <div className="demo-system">
                        <b>31</b>
                        <span>
                          Calendar<small>Scheduling</small>
                        </span>
                      </div>
                      <div className="demo-system">
                        <b>@</b>
                        <span>
                          Email<small>Follow-ups</small>
                        </span>
                      </div>
                      <div className="demo-system">
                        <b>S</b>
                        <span>
                          Supabase<small>Business data</small>
                        </span>
                      </div>
                      <div className="demo-system">
                        <b>
                          {"{"} {"}"}
                        </b>
                        <span>
                          Your API<small>Custom tools</small>
                        </span>
                      </div>
                    </div>
                    <div className="demo-flow demo-step" data-demo-step="2">
                      <span>
                        <strong>New enquiry</strong>Capture context
                      </span>
                      <svg className="icon" aria-hidden="true">
                        <use href="#i-arrow"></use>
                      </svg>
                      <span>
                        <strong>CRM record</strong>Keep it connected
                      </span>
                      <svg className="icon" aria-hidden="true">
                        <use href="#i-arrow"></use>
                      </svg>
                      <span>
                        <strong>Team follow-up</strong>Move it forward
                      </span>
                    </div>
                    <div
                      className="demo-inline-complete demo-step"
                      data-demo-step="3"
                    >
                      <svg className="icon" aria-hidden="true">
                        <use href="#i-check"></use>
                      </svg>
                      A connected path from first contact to the next step.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="feature-controls" id="feature-controls" hidden>
              <div className="feature-counter">
                <span id="feature-count">03 / 06</span>
                <span className="feature-counter-track" aria-hidden="true">
                  <span id="feature-progress"></span>
                </span>
              </div>
              <div className="feature-controls-actions">
                <button type="button" id="feature-replay">
                  <svg className="icon" aria-hidden="true">
                    <use href="#i-replay"></use>
                  </svg>
                  Replay demo
                </button>
                <button
                  type="button"
                  id="feature-autoplay"
                  aria-pressed="false"
                >
                  <svg className="icon" aria-hidden="true">
                    <use href="#i-play"></use>
                  </svg>
                  <span>Play tour</span>
                </button>
              </div>
            </div>
            <p className="sr-only" id="feature-status" role="status"></p>
            <noscript>
              <p>
                Enable JavaScript to switch between the six interactive
                previews.
              </p>
            </noscript>
          </div>
        </div>
      </div>
    </section>
  );
}
