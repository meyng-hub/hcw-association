@AGENTS.md

# CLAUDE.md — HCW (Humanity, Culture & Welfare)

Website for **HCW**, an education & culture charity operating in the Central
African Republic. HCW carries the initials of **Hervé-Charles Wenezoui** (a CAR
Doctor of Law & diplomat); the association was founded in 2009 by his son in his
memory. Bilingual **FR (default) / EN**. Audience: francophone donors in
France/Europe + diaspora, plus institutional partners.

- **Live (legacy):** https://www.h-cw.org — still on **Wix** (migrating off).
- **Repo:** https://github.com/meyng-hub/hcw-association (default branch `master`)
- **Host (target):** Vercel — project `hcw-association` (team `team_wONuXem8DRnuW9clO8GDXkaZ`)

## Stack

Next.js **16.2.6** (App Router, Turbopack) · React 19.2 · **Tailwind v4**
(CSS-first) · **next-intl 4** (FR default, localized pathnames) · framer-motion ·
Leaflet maps · **Stripe** + **HelloAsso** (donations) · **Sanity** (CMS) ·
Resend (email) · Brevo (newsletter) · Plausible (cookieless analytics).

## Gotchas (learned in this repo)

1. **Tailwind v4 is CSS-first — the JS `tailwind.config.ts` is NOT auto-loaded.**
   Brand tokens (teal/cream/charcoal palette, Fraunces `font-serif`) live in the
   `@theme {}` block in [`src/app/globals.css`](src/app/globals.css). If you add a
   custom color/font, add it there — a `tailwind.config.ts` would be silently
   ignored. (Before 2026-06-20 the config existed but was inert, so
   `text-charcoal-900`, `bg-cream-50`, `font-serif` rendered nothing.)
2. **next-intl: pass `locale` explicitly.** [`[locale]/layout.tsx`](src/app/[locale]/layout.tsx)
   must call `getMessages({ locale })` AND `<NextIntlClientProvider locale={locale}>`.
   Without it, `useLocale()`/`getMessages()` fall back to the default (fr) and
   **every `/en` route silently renders French** (fixed 2026-06-20).
3. **Images:** the `public/images/drive/` archive (~300 MB) is **gitignored** —
   archival photos belong in Sanity, never git. Recompress new source photos with
   [`scripts/optimize-images.mjs`](scripts/optimize-images.mjs) before committing.
4. **Donation rails:** HelloAsso is **primary** (0% fee, auto Cerfa receipt),
   Stripe is the card backup. The HelloAsso form URL is
   `NEXT_PUBLIC_HELLOASSO_URL` (see `src/lib/constants.ts`). Monthly defaults ON;
   the named program is "Le Cercle Charles Wenezoui".

## ⚠️ Placeholders to replace before production launch

- `REGISTRATION.rna` in [`src/lib/constants.ts`](src/lib/constants.ts) — real RNA
  number (footer trust signal stays hidden until set).
- `HELLOASSO.formUrl` — the association's real HelloAsso donation form URL.
- **Verify the impact numbers** (`IMPACT_STATS`: 800 prizes / 90,000 students /
  €70,000) against real records before headlining — carried over from the Wix
  site, not yet independently confirmed.
- **Tax-receipt claim** ("66% déductible / reçu fiscal") requires the association
  to hold _intérêt général_ status — confirm before publishing.
- **Sanity** is unprovisioned (client falls back to `projectId: "placeholder"`).
  Create the project and set `NEXT_PUBLIC_SANITY_*` for news/campaigns to render.

## Build / verify

```bash
npm run dev          # local (port 3000)
npx tsc --noEmit     # type-check (0 errors)
npm run build        # production build
```

CI: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) — type-check +
`vercel build`/`deploy` on push to `master` (preview on PRs).

## Migration off Wix → Vercel

See [`SESSION-HANDOFF.md`](SESSION-HANDOFF.md) for the full runbook (Wix
auto-renew, IONOS DNS, email continuity, n8n subdomain, cutover order).
