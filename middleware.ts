import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./src/i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Branded, bilingual, fully self-contained maintenance page (no external assets,
// so it renders even with everything else gated). Returned with HTTP 503 so
// search engines treat the outage as temporary.
const MAINTENANCE_HTML = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>HCW — Maintenance</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:Georgia,'Times New Roman',serif;background:linear-gradient(135deg,#0d6e6e 0%,#042828 100%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;text-align:center}
  .card{max-width:560px}
  .badge{display:inline-flex;align-items:center;gap:8px;background:rgba(245,166,35,.18);border:1px solid rgba(251,191,36,.35);color:#fbbf24;font-family:Inter,system-ui,sans-serif;font-size:13px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;padding:6px 14px;border-radius:999px;margin-bottom:28px}
  .dot{width:8px;height:8px;border-radius:50%;background:#fbbf24;animation:pulse 1.6s ease-in-out infinite}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
  h1{font-size:34px;line-height:1.2;margin-bottom:14px}
  .accent{height:4px;width:64px;background:#f5a623;border-radius:2px;margin:22px auto}
  p{font-family:Inter,system-ui,sans-serif;font-size:17px;line-height:1.6;color:#ccefef;margin-bottom:10px}
  .sep{margin:30px 0;border:0;border-top:1px solid rgba(255,255,255,.12)}
  .en{color:#99dfdf;font-size:15px}
  a{color:#fbbf24;text-decoration:none;font-weight:600}
  .contact{font-family:Inter,system-ui,sans-serif;font-size:14px;color:#5ec5c5;margin-top:26px}
  .quote{font-style:italic;color:#f5a623;font-size:15px;margin-top:24px}
</style>
</head>
<body>
  <div class="card">
    <span class="badge"><span class="dot"></span>Maintenance</span>
    <h1>Notre site est en cours d'amélioration</h1>
    <p>Nous revenons très bientôt. Merci de votre patience.</p>
    <div class="accent"></div>
    <p class="en">Our site is getting an upgrade — we'll be back very soon. Thank you for your patience.</p>
    <hr class="sep" />
    <p class="contact">Besoin de nous joindre ? / Need us?<br/>
      <a href="mailto:contact@h-cw.org">contact@h-cw.org</a> ·
      <a href="https://wa.me/33661935017">WhatsApp</a>
    </p>
    <p class="quote">« L'éducation est une liberté. »</p>
  </div>
</body>
</html>`;

export default function middleware(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE === "true") {
    const token = process.env.MAINTENANCE_BYPASS_TOKEN;
    const queryToken = request.nextUrl.searchParams.get("bypass");
    const hasCookie =
      !!token && request.cookies.get("hcw-bypass")?.value === token;

    // First visit with the correct ?bypass=<token>: set a cookie, then browse freely.
    if (token && queryToken === token) {
      const res = intlMiddleware(request);
      res.cookies.set("hcw-bypass", token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 24h
      });
      return res;
    }

    if (!hasCookie) {
      return new NextResponse(MAINTENANCE_HTML, {
        status: 503,
        headers: {
          "content-type": "text/html; charset=utf-8",
          "retry-after": "3600",
          "cache-control": "no-store, must-revalidate",
        },
      });
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
