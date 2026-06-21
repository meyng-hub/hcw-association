# HelloAsso donation form — beginner step-by-step

Goal: create a free HelloAsso donation form so the **"Faire un don"** button on
h-cw.org collects real donations (card, 0% fee, automatic tax receipts). When
it's done you'll have a **link** — send it to me and I connect it to the site.

⏱️ ~20–30 minutes. HelloAsso may take 1–2 days to validate the association before
money can be paid out, so start early.

> Note: HelloAsso sometimes changes its wording. If a button isn't named exactly
> as below, look for the closest match — the steps are the same.

---

## Before you start — have these ready

Your association's official details (copy-paste these):

| Field | Value |
| --- | --- |
| Nom de l'association | **ASSOCIATION CHARLES WENEZOUI** |
| N° RNA | **W602001421** |
| N° SIREN | **841 629 157** |
| N° SIRET | **841 629 157 00014** |
| Adresse | **13 rue Anatole France, 60290 Rantigny** |
| Date de création | **09/03/2009** |
| Email | **contact@h-cw.org** |

**The one thing you must find yourself:** the association's **bank details
(RIB / IBAN)** — HelloAsso sends the collected donations to this account. Get the
RIB from your bank (it's a small PDF, or in your bank app under "RIB/IBAN").

Optional but nice: the **HCW logo** image file (`public/images/hcw-logo.png`) and
one good **photo** of the children/classroom for the form's banner.

---

## Part A — Create your HelloAsso account (5 min)

1. Go to **https://www.helloasso.com**
2. Top right, click **"Inscription"** (or **"Créer un compte"**).
3. Choose the **association / organisation** option (not "particulier").
4. Enter your email **contact@h-cw.org**, create a password, validate the email
   they send you.

## Part B — Register the association (5–10 min)

1. When asked to add your organisation, search for **"Association Charles
   Wenezoui"** or enter the **SIRET 841 629 157 00014** — HelloAsso often finds it
   automatically from the public registry.
2. Confirm/fill the details from the table above (RNA, address, etc.).
3. Add the **bank details (IBAN/RIB)** when asked — this is where donations land.
4. HelloAsso may ask for a document to verify the association (e.g. the
   **récépissé de déclaration** or the **avis SIRENE** PDF you already have). Upload
   it if requested. (Validation can take 1–2 days — that's normal.)

## Part C — Create the donation form (10 min)

1. From your dashboard, click **"Créer"** → choose **"Formulaire de don"**
   (sometimes shown as **"Collecte de dons"** or **"Faire un don"**).
2. **Title:** `Soutenir l'éducation en Centrafrique` (or similar).
3. **Description:** a few sentences — you can reuse:
   > L'Association Charles Wenezoui œuvre depuis 2009 pour l'éducation et la
   > culture en République Centrafricaine. Chaque don finance directement nos
   > programmes. Merci de votre générosité.
4. **Suggested amounts** — set these to match the website:
   - **20 €** — 1 mois de fournitures scolaires pour un enfant
   - **50 €** — formation d'un enseignant aux méthodes modernes
   - **100 €** — équipement complet d'une classe
   - **500 €** — bourse scolaire pour une jeune fille pendant un an
   - leave a **"montant libre"** (free amount) option ON
5. **Recurring donations:** turn ON the **"don mensuel" / "don régulier"** option —
   this lets people give monthly (our site defaults to monthly; the program is
   named **"Le Cercle Charles Wenezoui"** if it asks for a name).
6. **Image/banner:** upload the photo + logo if you have them (optional).
7. **Reçu fiscal (tax receipt):** HelloAsso will ask if your association can issue
   tax receipts.
   - ✅ If you have **already given donors a reçu fiscal before** (or confirmed your
     *intérêt général* status), turn this ON — donors get automatic receipts.
   - ⚠️ If you're **not sure**, leave it **OFF** for now (you can switch it on later
     once confirmed). Don't claim it if unsure.

## Part D — Publish and copy the link (2 min)

1. Click **"Publier"** (or **"Mettre en ligne"**).
2. Open your published form. Copy its web address from the browser bar — it looks
   like:
   ```
   https://www.helloasso.com/associations/association-charles-wenezoui/formulaires/1/widget
   ```
   (the exact ending may differ — that's fine, copy whatever it shows).

## Part E — Send me the link

Paste that link to me in the chat, e.g.:
> "HelloAsso link: https://www.helloasso.com/associations/association-charles-wenezoui/formulaires/1/widget"

---

## What I do once you send the link

1. Set it as `NEXT_PUBLIC_HELLOASSO_URL` on the site.
2. The big donate button automatically becomes **"Donner via HelloAsso"** (0% fee
   + tax receipt), with card payment as the backup.
3. Redeploy and test it end-to-end, then confirm it works.

## Common questions

- **Is it really free?** Yes — 0% commission for the association. At checkout
  HelloAsso suggests donors add a small voluntary "contribution" to HelloAsso;
  donors can set it to 0. You receive 100% of the donation either way.
- **When do we get the money?** HelloAsso transfers collected donations to your
  IBAN (typically on a regular payout schedule once the association is validated).
- **Do I need Stripe?** No — HelloAsso handles the whole payment. (Stripe is only
  the alternative if you ever want to take cards directly on-site.)
- **Can I change amounts later?** Yes, anytime, from the HelloAsso dashboard — the
  website link stays the same.
