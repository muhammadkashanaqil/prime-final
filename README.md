# Prime Automation — UI Revision 04

This is the complete updated Next.js source project, based on `updatedwithbackend.zip`.

Start with **START-HERE.md**. On Windows, extract into a new folder and run **START-WINDOWS.cmd**. The terminal prints **UI REVISION 04** and starts this exact folder. Open the Local URL from that terminal after stopping your old server.

This revision corrects the hero typography, restores the illustrated homepage systems, applies the supplied brand palette, adds lightweight inner-page motion, and gives every case-study narrative field Write / Preview / Source views. Backend routes, authentication, database access, the Prisma schema, database file, and environment configuration are preserved.

## Latest requested corrections

- Revision 04 also restores the neutral gray second line in the Selected Systems heading, keeps desktop floating navigation inside the left gutter, and clarifies the case-study Featured label. The Windows starter generates Prisma Client before starting Next.js.

- The hero headline is white, proportionate, and uses the local heading font. The eyebrow and supporting text have their own small-text styles, isolated from the legacy hero rules that were overriding them. The globe remains stationary and sharp.
- Homepage **01 / SELECTED SYSTEMS** again uses the original animated support, invoice, and data-pipeline illustrations. Its filters and illustrative project dialogs remain available. The **Our Work** directory and case-study detail pages continue to show real published CMS projects and images.
- The brand palette is **#c82aef**, **#0c1322**, **#c1c1c1**, and **#ffffff**, with transparent tints for borders/surfaces and separate semantic error/status colors. The old muted purple accents have been replaced across public pages, the dashboard, and chat.
- Inner-page introductions, cards, and selected sections receive short one-time entrance transitions. FAQ answers and button arrows have small interaction effects. Motion settings, reduced-motion preferences, keyboard focus, and route cleanup are respected. No animation dependency was added.
- All four case-study narrative fields have **Write**, **Preview**, and **Source** buttons. Structured narratives offer a summary and editable, reorderable bullet points. Plain text stays plain text; extra JSON properties and unsupported custom structures are preserved. New narratives start empty instead of containing sample client claims, and an existing empty optional implementation stays empty.

## Included frontend improvements

- A consistent design for Services, all six service details, About, Insights, article details, Case Studies, project details, FAQs, Contact, legal pages, the thank-you page, and 404.
- Clearer typography, white interior page backgrounds, exact magenta brand accents, readable article widths, responsive grids, and stronger contrast.
- A dedicated admin workspace with mobile navigation, cleaner tables, status indicators, improved field labels, accessible confirmation dialogs, and a more useful overview.
- An article section editor with a reading preview. It saves the same body format used by the existing backend.
- Dashboard-managed content is connected to the public pages. Draft records stay excluded by the existing CMS queries.
- Contact forms display a success message only after a successful server response. The contact page preserves selected services, UTM attribution, field errors, and the thank-you redirect.
- The public chatbot now calls your FastAPI deployment. The old application chat route is retained unchanged, but the active widget no longer uses it.
- Local font loading, smaller client-side listing payloads, appropriately sized images, and route-aware effect cleanup reduce unnecessary work. No new production dependencies were added.

## Run the project

From the project folder:

```bash
npm ci
npm run prisma:generate
npm run dev
```

Use your existing environment configuration. The original `.env.local` is retained in this private source package. `.env.example` documents the available variables.

For a production build:

```bash
npm run build
npm start
```

This design update requires no database migration, database push, or seeding.

## Dashboard and public content

| Dashboard item | Public destination |
| --- | --- |
| Published posts | Homepage insights, `/insights`, `/insights/[slug]` |
| Published case studies | `/case-studies`, `/case-studies/[slug]`, matching service pages; homepage uses illustrative system demos |
| Published FAQs | Homepage FAQ selection, `/faq`, matching service pages |
| Contact and scheduling settings | Contact page, footer, navigation contact details, thank-you booking link |
| Business name, footer and social settings | Footer and site metadata |
| Default SEO settings | Default site title, description and social metadata |
| Chatbot welcome message | Active FastAPI chat widget |
| Contact and audit submissions | Existing `/api/contact` endpoint and Leads dashboard |

The homepage prioritizes featured FAQs and loads published insights. Its three illustrated system demos are independent of uploaded project images. Published case studies remain connected to Our Work, project detail pages, and relevant services. Public listing components receive only the fields they need. Full content still comes from the existing detail-page CMS queries.

The existing 60-second public-page revalidation interval remains in use. Publishing and saving continue to use the original admin endpoints and their existing revalidation behavior.

## FastAPI chatbot

The default endpoint is:

```text
https://prime-chatbot-tau.vercel.app/chat
```

To change the deployment URL, set the following public frontend variable and rebuild:

```dotenv
NEXT_PUBLIC_FASTAPI_CHAT_URL="https://prime-chatbot-tau.vercel.app/chat"
```

The browser sends the existing FastAPI request format:

```json
{
  "message": "What can you automate?",
  "history": [],
  "session_id": "browser-generated-session-id"
}
```

The adapter reads `answer` (or the compatible `output` field), `session_id`, and `history`. It retains up to 12 messages in session storage, supports retry without duplicate messages, and provides a contact link when the service is unavailable. Requests time out after 45 seconds so the interface does not stay stuck indefinitely.

The deployed FastAPI service must allow your website origin through its existing CORS configuration. No Python service code, n8n lead integration, application API route, or database settings were changed in this update.

Active chat files:

- `src/components/chatbot/ChatWidget.tsx`
- `src/lib/chat-client.ts`
- `src/styles/chat.css`

## Validation

- Production build: passed with Next.js 15.5.23 and Node.js 24.22.1.
- Type checking: passed.
- 24 component interaction checks: passed using mocked requests.
- The 24 protected backend/database/configuration files match the uploaded source byte for byte.
- Fetch contracts in all 11 admin files containing requests match the original source.
- The dependency manifest and lockfile are unchanged. The hero artwork and its stationary behavior are preserved; typography, colors, and lightweight UI motion are updated.

The interaction checks covered article filtering, case-study links, FAQ search, homepage illustration filters, real project images, homepage FAQs, post publishing, article editing, narrative writing/preview/source round trips, unsupported JSON preservation, empty optional narratives, case-study publishing, FAQ editing, image uploads, settings, deletion confirmation, lead status updates, contact error/success handling, audit response handling, FastAPI conversation history/retry, effect cleanup after route changes, keyboard-triggered reveals, and motion-off behavior.

Database access during the build was pointed at an unreachable local test address. No production records were created, updated, deleted, migrated, or seeded. Database-backed pages therefore used their existing empty-data fallbacks during the build check.

Visual review covered desktop and mobile homepage snapshots rendered from production HTML and CSS, plus the actual case-study form rendered with fixture data. These were read-only snapshots: client interactions were checked separately with the mocked component checks above. The preview service could not run the live Next.js app because it passed unsupported Vite flags to `next dev`. Live authenticated database workflows, FastAPI connectivity, and deployed CORS behavior were not verified. These need a staging check with your existing deployment environment. The Windows starter was reviewed but not executed on Windows. No site was deployed by this update.

See `FRONTEND-VALIDATION.json` for the preservation checks and the files included in this redesign.
