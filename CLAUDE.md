@AGENTS.md

# CLAUDE.md — HCW (Humanity, Culture & Welfare)

Website for **HCW**, an education & culture charity operating in the Central
African Republic. HCW carries the initials of **Hervé-Charles Wenezoui** (a CAR
Doctor of Law & diplomat); the association was founded in 2009 by his son in his
memory. Bilingual **FR (default) / EN**. Audience: francophone donors in
France/Europe + diaspora, plus institutional partners.

- **Live:** https://www.h-cw.org — on **Vercel** (migrated off Wix 2026-06-21; currently in maintenance mode). Read [`START-HERE.md`](START-HERE.md) first.
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

**Resolved (2026-06-20):**

- ✅ **Registration** set from the INSEE SIRENE avis: RNA `W602001421`, SIREN
  `841 629 157`, SIRET `…00014`. Footer shows it. Founding confirmed **09/03/2009**
  (validates all "depuis 2009").
- ✅ **Impact figure corrected** — students reached is **9,000+** (owner-confirmed;
  was a 10× "90,000" error) since 2009. `IMPACT_STATS.students = 9_000`.
- ✅ **Fabricated News/Campaign hidden** — removed from homepage + nav; `/news` is a
  "coming soon" stub. `NewsPreview.tsx` / `CampaignProgress.tsx` remain in the repo
  (unused) with placeholder data — replace before re-enabling.
- ✅ **Donations are card-first** — Stripe leads; HelloAsso auto-promotes to primary
  once `NEXT_PUBLIC_HELLOASSO_URL` is set. Monthly defaults ON; program "Le Cercle
  Charles Wenezoui".
- ✅ **Tax-receipt claim softened** to "un reçu fiscal pourra être adressé, sous
  réserve d'éligibilité" pending confirmation of _intérêt général_ status.

**Still open before public launch:**

- **HelloAsso form URL** — create the form, set `NEXT_PUBLIC_HELLOASSO_URL`.
- **Confirm _intérêt général_ status** — only then restore a definite "66% / reçu
  fiscal" promise.
- **Verify remaining figures** (`800` prizes, `€70,000` raised) against real records.
- **Sanity** is unprovisioned (`projectId: "placeholder"`) — optional, since
  News/Campaign are hidden; set `NEXT_PUBLIC_SANITY_*` for editable content.
- **Email + DNS cutover** — see `MIGRATION-CHECKLIST.md` (Jul 9 deadline).

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

## gstack (recommended)

This project uses [gstack](https://github.com/garrytan/gstack) for AI-assisted workflows.
Install it for the best experience:

```bash
git clone --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup --team
```

Skills are installed with the **`gstack-` prefix** (to avoid clashing with the
MEYNG project skills like `/office-hours`, `/ship`, `/retro`): use
`/gstack-qa`, `/gstack-review`, `/gstack-cso`, `/gstack-investigate`,
`/gstack-ship`, `/gstack-browse`. Use `/gstack-browse` for all web browsing.
