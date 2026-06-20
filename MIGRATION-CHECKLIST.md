# HCW — Wix → Vercel cutover checklist

**Hard deadline: Jul 9, 2026** (Wix premium expires; after that the Wix site loses
`h-cw.org` and shows Wix branding). Auto-renew is OFF on both Wix subscriptions.

Based on a live DNS audit of `h-cw.org` on 2026-06-20 (records below are real).

---

## ⚠️ Critical path = EMAIL. Do step 1 TODAY.

`contact@h-cw.org` runs on **Google Workspace** (MX → `aspmx.l.google.com`), but
the current DNS is incomplete: **only one MX (`alt3`), no SPF, no DKIM, dead Wix
DMARC.** Mail probably works but is fragile. The migration must (a) not lose it,
and (b) fix it.

### Step 1 — confirm the Google Workspace account (blocker)

- Sign in at **admin.google.com** with a `…@h-cw.org` admin address.
- Confirm the mailbox is **active** and check **Billing**: is Google Workspace
  paid **directly to Google**, or **through Wix**?
  - **Directly to Google** → easy: just keep the Google MX records (step 4). Email
    survives the Wix exit untouched.
  - **Through Wix / can't log in** → resolve this FIRST. You may need to move
    billing to Google or recreate the mailbox. This is the only thing that can
    truly break email — sort it well before Jul 9.

---

## Step 2 — finish the Vercel site (my side + your data)

- Set env vars in Vercel project `hcw-association` (from `.env.example`):
  `STRIPE_*`, `NEXT_PUBLIC_HELLOASSO_URL`, `RESEND_API_KEY`, `BREVO_API_KEY`,
  `NEXT_PUBLIC_SANITY_*`, `NEXT_PUBLIC_SITE_URL=https://www.h-cw.org`,
  `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=h-cw.org`.
- Merge the redesign branch → `master` so CI deploys to production (Vercel URL).
- Verify everything on the temporary `*.vercel.app` URL BEFORE touching DNS.

## Step 3 — switch DNS control to IONOS (recommended over Vercel NS, for email safety)

`h-cw.org` is registered at **IONOS** but its nameservers are delegated to Wix
(`ns14/ns15.wixdns.net`, not editable inside Wix). In the **IONOS** domain panel:

- Change nameservers from `*.wixdns.net` → **IONOS default DNS** (use IONOS's own
  nameservers / "Use IONOS name servers").
- Then manage all records in the IONOS DNS zone (next steps).

> Keep DNS at IONOS rather than moving to Vercel nameservers — it keeps email DNS
> in one place you control and avoids putting MX records into Vercel.

## Step 4 — create the IONOS DNS zone (exact records)

**Website → Vercel** (replace the Wix records):
| Type | Host | Value | Note |
|------|------|-------|------|
| A | `@` | `76.76.21.21` | use the exact IP Vercel shows in Project → Domains |
| CNAME | `www` | `cname.vercel-dns.com` | |

_Remove_ the old Wix records: `A @ → 185.230.63.107/.171/.186`, `CNAME www → cdn1.wixdns.net`.

**Preserve (do NOT drop):**
| Type | Host | Value |
|------|------|-------|
| A | `n8n` | `38.143.19.195` |

**Email → Google Workspace (set the FULL correct set — current is incomplete):**
| Type | Host | Value | Priority |
|------|------|-------|----------|
| MX | `@` | `aspmx.l.google.com` | 1 |
| MX | `@` | `alt1.aspmx.l.google.com` | 5 |
| MX | `@` | `alt2.aspmx.l.google.com` | 5 |
| MX | `@` | `alt3.aspmx.l.google.com` | 10 |
| MX | `@` | `alt4.aspmx.l.google.com` | 10 |
| TXT | `@` | `v=spf1 include:_spf.google.com ~all` | — (SPF) |
| TXT | `google._domainkey` | _(DKIM key from Google Admin → Apps → Gmail → Authenticate email)_ | — |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:contact@h-cw.org` | — |

_Remove_ the Wix sending records (no longer needed): `s1/s2/sel1._domainkey`,
`sg.h-cw.org`, and the `_dmarc → _dmarc.wixemails.com` CNAME.

## Step 5 — connect the domain in Vercel

- Vercel → project → Settings → Domains → add `h-cw.org` and `www.h-cw.org`.
- Vercel verifies and issues SSL automatically once DNS points to it.

## Step 6 — verify (after propagation, ~15 min–48 h)

```bash
nslookup -type=A h-cw.org 8.8.8.8        # → 76.76.21.x (Vercel), not 185.230.x
nslookup -type=MX h-cw.org 8.8.8.8       # → full aspmx.l.google.com set
nslookup -type=A n8n.h-cw.org 8.8.8.8    # → 38.143.19.195 (unchanged)
curl -sI https://www.h-cw.org | grep -i server   # Vercel
```

- Send a test email TO and FROM `contact@h-cw.org`.
- Click through the live site; confirm donate (HelloAsso), FR/EN, forms.

## Step 7 — redirects + let Wix lapse

- Add 301 redirects in `next.config.ts` for any indexed old Wix URLs.
- Leave the Wix site alone; it expires Jul 9 on its own.

---

## Rollback (if anything breaks at cutover)

Switch the IONOS nameservers **back to `ns14.wixdns.net` / `ns15.wixdns.net`**.
Within propagation time the site + email revert to the current Wix state.
(Valid until Jul 9, 2026 — after that the Wix plan is gone, so don't rely on this
late in the window.)
