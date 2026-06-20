# SESSION HANDOFF — HCW Wix→Vercel migration & redesign

**Date:** 2026-06-20 · **Branch:** `feat/redesign-wix-migration`

## Objective

Move HCW off Wix (cost) onto the existing Next.js 16 rebuild on Vercel, with a
reference-driven redesign and a HelloAsso-primary donation flow.

## Done this session (committed on `feat/redesign-wix-migration`)

- **Blocker 1 — Tailwind v4 palette was dead.** The JS `tailwind.config.ts` was
  ignored by Tailwind v4 (CSS-first), so `charcoal`/`cream` utilities + Fraunces
  `font-serif` rendered nothing. Ported brand tokens to `@theme {}` in
  `globals.css`; deleted the inert config. Verified the palette now ships in the
  built CSS.
- **Blocker 2 — 342 MB of images.** Gitignored the ~300 MB `public/images/drive/`
  archive; recompressed the 11 large source photos **41.5 MB → 3.3 MB** via
  `scripts/optimize-images.mjs`.
- **Redesign (HelloAsso primary):** flipped `DonateClient` so HelloAsso is the
  primary CTA (0% fee + auto tax-receipt badges), Stripe is the card backup;
  monthly defaults ON; named program "Le Cercle Charles Wenezoui". Added the
  **founder-legacy / manifesto** homepage section (Hervé-Charles Wenezoui) and a
  registration-number footer trust signal (hidden until `REGISTRATION.rna` set).
- **Bug fixed — EN site rendered French.** `[locale]/layout.tsx` never passed
  `locale` to `getMessages()`/`NextIntlClientProvider`, so all `/en` routes
  defaulted to FR. Fixed and verified (`/en` → English, `/fr` → French).

All verified with `npx tsc --noEmit` (clean) + `npm run build` (33/33 pages) +
rendered-HTML checks against the dev server in both locales.

## NEXT — do these in order (don't let the live site/email go dark)

### 0. TODAY — stop the Wix bleed (only you can; in the Wix dashboard)

- Turn OFF auto-renew on **both** subscriptions (Premium plan renewed ~Jun 20;
  Social Media Marketing Plus renews Jul 7). Wix's 14-day refund does **not**
  cover renewals, so today's charge is likely sunk — but cancelling keeps the
  Wix site live until period end, so migrate calmly. Cancel the Marketing add-on
  regardless.

### 1. Fill the placeholders (see CLAUDE.md "Placeholders")

Real RNA, real HelloAsso form URL, verify impact numbers + tax-receipt
eligibility, provision Sanity (`NEXT_PUBLIC_SANITY_*`).

### 2. Set Vercel env vars (project `hcw-association`)

From `.env.example`: `STRIPE_*`, `NEXT_PUBLIC_HELLOASSO_URL`, `RESEND_API_KEY`,
`BREVO_API_KEY`, `NEXT_PUBLIC_SANITY_*`, `NEXT_PUBLIC_SITE_URL`,
`NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.

### 3. Email continuity (HIGHEST migration risk)

`contact@h-cw.org` currently routes through Wix mail (DNS shows Wix/SendGrid
DKIM: `sg.h-cw.org`, `_dmarc.wixmail`, `s1/s2._domainkey`). MX points at Google
(`aspmx`). BEFORE any DNS cutover: pick a provider (Google Workspace / Zoho free
/ IONOS) and re-create MX + SPF + DKIM + DMARC. Test send/receive first.

### 4. DNS cutover at IONOS (domain registered there; NS delegated to Wix)

Switch nameservers off `wixdns.net` → IONOS DNS, then recreate:

- `A @ → 76.76.21.21` (Vercel), `CNAME www → cname.vercel-dns.com`
- **all email records from step 3**
- **`A n8n.h-cw.org → 38.143.19.195`** (separate automation server — easy to miss)
  Add the domain in the Vercel project; verify `h-cw.org`, `www`, email, and
  `n8n.` all resolve. Add 301 redirects (`next.config.ts`) from old Wix URLs.

### 5. Let Wix lapse at period end. Done.

## Recovery pointers

- Repo: `meyng-hub/hcw-association` · this branch holds all the above.
- `git log --oneline -5` on `feat/redesign-wix-migration` for the last commit.
- Reference-site teardown & cost analysis: in the chat session that produced this.
