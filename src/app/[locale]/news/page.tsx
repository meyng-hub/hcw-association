import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Newspaper } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
    openGraph: {
      title: t("meta_title"),
      description: t("meta_description"),
    },
  };
}

// Shape kept for the News feature when real content is added (e.g. via Sanity).
// NewsClient imports this type. No articles ship until they are real — placeholder
// stories were removed to avoid publishing fabricated news.
export interface NewsArticle {
  id: string;
  titleFr: string;
  titleEn: string;
  excerptFr: string;
  excerptEn: string;
  date: string; // ISO date string
  tag: "impact" | "education" | "partnership" | "report" | "campaign" | "award";
  accentColor: "teal" | "amber";
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  const isFr = locale === "fr";

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-teal-600 pt-28 pb-20">
        <div
          aria-hidden="true"
          className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-teal-500/40"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/4 h-40 w-40 rounded-full bg-amber-500/20"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-400 mb-3">
            HCW
          </p>
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-teal-100">
            {t("hero_subtitle")}
          </p>
        </div>
      </section>

      {/* ── Coming soon (no fabricated articles) ── */}
      <section className="bg-cream-50 py-24">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
            <Newspaper className="h-8 w-8 text-teal-600" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-charcoal-900">
            {isFr ? "Actualités bientôt disponibles" : "News coming soon"}
          </h2>
          <p className="mt-3 text-gray-600">
            {isFr
              ? "Nous préparons cet espace pour partager les avancées de nos projets et l'impact de vos dons. Abonnez-vous pour être informé·e."
              : "We're preparing this space to share our project updates and the impact of your donations. Subscribe to be notified."}
          </p>
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section
        className="bg-teal-600 py-16"
        aria-labelledby="newsletter-heading"
      >
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2
            id="newsletter-heading"
            className="font-serif text-3xl font-bold text-white"
          >
            {t("newsletter_title")}
          </h2>
          <p className="mt-3 text-teal-100">{t("newsletter_subtitle")}</p>
          <form
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            aria-label={t("newsletter_title")}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              {t("newsletter_placeholder")}
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder={t("newsletter_placeholder")}
              className="flex-1 rounded-full px-5 py-3 text-sm text-charcoal-900 bg-white outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
            <button
              type="submit"
              className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-600 transition-colors"
            >
              {t("newsletter_submit")}
            </button>
          </form>
          <p className="mt-4 text-xs text-teal-200">
            {t("newsletter_disclaimer")}
          </p>
        </div>
      </section>
    </>
  );
}
