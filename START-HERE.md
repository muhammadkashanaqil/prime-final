# Prime Automation — Revision 04

This package includes the five requested UI changes. Check `VERSION.txt` to identify it.

## Run this copy on Windows

1. Stop the old development terminal with **Ctrl+C**.
2. Extract this ZIP into a **new folder**. Do not merge it over the old project.
3. Open `prime-automation-v4`, then double-click **START-WINDOWS.cmd**. It runs from its own folder, installs locked dependencies when needed, and generates the Prisma client without pushing or migrating the database.
4. Open the exact **Local** URL shown by that terminal. If another server still uses port 3000, the new server may use another port.

Or open a terminal inside `prime-automation-v4` and run:

```powershell
Get-Content .\VERSION.txt
npm ci
npm run prisma:generate
npm run dev
```

The first line should identify **UI REVISION 04**.

## What you should see

- A white three-line hero headline and a small “YOUR AMBITION. AUTOMATED.” eyebrow.
- Three illustrated homepage cards: support messages, an invoice, and a data pipeline. Real CMS photos remain on **Our Work**.
- Brand accents using **#c82aef**, with **#0c1322**, **#c1c1c1**, and **#ffffff**.
- Subtle inner-page entrance and interaction animations.
- **Write / Preview / Source** buttons on all four architecture narrative fields in Dashboard → Case studies → Edit.

The work heading now uses a neutral gray second line, and the desktop floating navigation stays inside the left gutter.

Backend, database, authentication, and existing API contracts are unchanged. No database migration, push, or seed is required.
