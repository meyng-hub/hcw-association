# 👋 START HERE — HCW master status & next steps

**Last updated:** 2026-06-21 · **This is the single doc to read first when resuming.**
It summarizes everything done, where things stand, what's left, and where to find detail.

---

## ⚡ Quick status

- **The HCW website is LIVE on Vercel** at **https://www.h-cw.org** — fully migrated off Wix.
- **It is in MAINTENANCE MODE right now** (visitors see a branded "under maintenance" page).
- Email + the `n8n` server are unaffected and working.
- Repo: `meyng-hub/hcw-association` · branch `feat/redesign-wix-migration` · PR **#1** · all pushed.

**To see the real site while in maintenance** (your private link):
`https://www.h-cw.org/fr?bypass=hcw-bypass-9k4m2x7q3v`

**To take it OUT of maintenance:** tell Claude _"take HCW out of maintenance"_ (flips one env var + redeploy, ~30s).

---

## 🔑 Key facts & access

|                         |                                                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------- |
| Live site               | https://www.h-cw.org (Vercel)                                                                 |
| Maintenance bypass link | `https://www.h-cw.org/fr?bypass=hcw-bypass-9k4m2x7q3v`                                        |
| Repo / branch / PR      | `meyng-hub/hcw-association` · `feat/redesign-wix-migration` · PR #1                           |
| Vercel project          | `hcw-association` (team `meyng-webs-projects`), CLI logged in as `mwenezoui-8807`             |
| Domain DNS              | at **Vercel** nameservers (`ns1/ns2.vercel-dns.com`), registrar still IONOS                   |
| Email                   | **Google Workspace for Nonprofits** (MX → Google; safe, independent of Wix)                   |
| n8n server              | `n8n.h-cw.org` → `38.143.19.195` (preserved)                                                  |
| Registration            | RNA **W602001421** · SIREN **841 629 157** · SIRET **841 629 157 00014** · founded 09/03/2009 |
| Deploy                  | `cd C:\HCW && vercel --prod` (CLI is authed) — or merge PR #1 to `master`                     |

---

## ✅ What's DONE this session (HCW)

1. **Migrated off Wix → Vercel.** DNS cut over (Vercel nameservers); email (Google) + n8n preserved; SSL valid; no downtime. Wix auto-renew is OFF (lapses Jul 9; nothing depends on it).
2. **Complete redesign** — founder-legacy manifesto (Hervé-Charles Wenezoui), donation flow, hero, bilingual FR/EN.
3. **Fixed 3 blockers** — Tailwind v4 dead palette, the EN-renders-French i18n bug, 342 MB→3.3 MB image optimization.
4. **Real registration wired** (RNA/SIREN in footer); **founding 2009 confirmed** via INSEE.
5. **Corrected the impact figure** — students reached **9,000+** (was a 10× "90,000" error), since 2009.
6. **Card-first donations** — Stripe leads now; **HelloAsso auto-promotes to primary once its URL is set**; monthly default ON; named "Le Cercle Charles Wenezoui".
7. **Softened the tax-receipt claim** ("sous réserve d'éligibilité") pending _intérêt général_ confirmation.
8. **Hid fabricated News/Campaign content**; added sitemap/robots/OG; fixed `?amount=` donate links.
9. **Maintenance mode** (env-toggled 503 page + your bypass link).
10. **Security pass** (`/gstack-cso`) — fixed a live info-disclosure leak + PII logging in the API routes.

## 📋 What's OPEN — your to-dos (only you can do these)

- [ ] **Take out of maintenance** when ready (tell Claude).
- [ ] **HelloAsso donation form** → follow **`HELLOASSO-SETUP.md`**, send Claude the link → donate button goes fully live.
- [ ] **Confirm _intérêt général_ status** → then the firm "66% tax receipt" promise can return.
- [ ] **Set Vercel env vars** so donations + forms actually _process_: `STRIPE_SECRET_KEY`, `RESEND_API_KEY` (forms), `BREVO_API_KEY` (newsletter), `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`. (Site renders fine without them; email + WhatsApp links already work.)
- [ ] **Verify remaining figures** (`800` prizes, `€70,000` raised) against real records.
- [ ] **DKIM key** (Google Admin → Gmail → Authenticate email) → send to Claude for better email deliverability. Optional.
- [ ] **Merge PR #1 → master** when ready (or keep deploying via the Vercel CLI).

---

## 🧰 gstack (AI-assisted workflow tooling) — adopted this session

- **Installed globally** (Bun + 53 skills). Commands are **prefixed**: `/gstack-cso`, `/gstack-review`, `/gstack-qa`, `/gstack-ship`, etc. (your MEYNG skills like `/office-hours`, `/ship` stay unprefixed and untouched).
- **Proven** — `/gstack-cso` caught the live HCW security bug we then fixed.
- **Team mode on** (auto-update check each session); HCW + ndaraAI bootstrapped.
- **Full beginner tutorial:** **`C:\Users\mwe17\.claude\GSTACK-GUIDE.md`** (read this to learn to drive it).
- Note: the ndaraAI gstack doc commit (`102ec25`) is **local, not pushed** — push it with your vocab work or separately.

---

## 📚 Where the detail lives (all in `C:\HCW\`)

| Doc                         | What it covers                                           |
| --------------------------- | -------------------------------------------------------- |
| **`START-HERE.md`**         | ← you are here (master summary)                          |
| `CLAUDE.md`                 | project conventions, stack, gotchas, resolved/open items |
| `MIGRATION-CHECKLIST.md`    | the Wix→Vercel DNS/email cutover (now DONE)              |
| `HELLOASSO-SETUP.md`        | step-by-step to create the donation form                 |
| `SESSION-HANDOFF.md`        | crash-recovery runbook                                   |
| `~/.claude/GSTACK-GUIDE.md` | how to use gstack (beginner tutorial)                    |

---

## ▶️ How to resume in a new session

Open a Claude Code session in `C:\HCW`, say _"read START-HERE.md"_, then pick a to-do above.
Common asks: _"take HCW out of maintenance"_ · _"here's the HelloAsso link: …"_ · _"set the Stripe key"_ · _"run /gstack-cso --comprehensive before launch"_.
