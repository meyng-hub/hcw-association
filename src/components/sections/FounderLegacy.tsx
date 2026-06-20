"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight, Quote } from "lucide-react";

/**
 * Founder legacy / manifesto — the emotional anchor of the homepage.
 * HCW carries the initials of Hervé-Charles Wenezoui; the association was
 * founded in 2009 by his son in his memory. Leading with the founder's
 * name turns the late founder's conviction into the site's emotional hook
 * (the Age of Union manifesto pattern).
 */
export default function FounderLegacy() {
  const locale = useLocale();
  const isFr = locale === "fr";

  return (
    <section
      className="relative overflow-hidden bg-cream-50 py-24"
      aria-labelledby="legacy-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Portrait / founder banner */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="/images/fondateur-banniere-boro.jpg"
                alt={
                  isFr
                    ? "Hervé-Charles Wenezoui, fondateur de l'esprit de HCW"
                    : "Hervé-Charles Wenezoui, whose name HCW carries"
                }
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-charcoal-900/50 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>
            {/* Floating year badge */}
            <div className="absolute -bottom-5 -right-2 rounded-2xl bg-teal-600 px-6 py-4 text-white shadow-lg sm:right-6">
              <p className="font-serif text-3xl font-bold leading-none text-amber-300">
                2009
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-teal-100">
                {isFr ? "Fondée en sa mémoire" : "Founded in his memory"}
              </p>
            </div>
          </div>

          {/* Manifesto */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-600">
              {isFr ? "Notre héritage" : "Our legacy"}
            </p>
            <h2
              id="legacy-heading"
              className="font-serif text-3xl font-bold leading-tight text-charcoal-900 sm:text-4xl"
            >
              {isFr
                ? "Au nom d'Hervé-Charles Wenezoui"
                : "In the name of Hervé-Charles Wenezoui"}
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-gray-600">
              {isFr
                ? "HCW porte les initiales d'Hervé-Charles Wenezoui — juriste et diplomate centrafricain, docteur en droit. En 2009, son fils a fondé l'association en sa mémoire, pour perpétuer sa conviction : l'ouverture au monde par le savoir et la culture est un moteur essentiel du développement."
                : "HCW carries the initials of Hervé-Charles Wenezoui — a Central African Doctor of Law and diplomat. In 2009, his son founded the association in his memory, to carry forward his conviction: that openness to the world through knowledge and culture is an essential driver of development."}
            </p>

            {/* Pull quote */}
            <blockquote className="relative mt-8 rounded-2xl border-l-4 border-amber-400 bg-white p-6 shadow-sm">
              <Quote
                className="absolute -top-3 left-5 h-7 w-7 fill-amber-400 text-amber-400"
                aria-hidden="true"
              />
              <p className="font-serif text-xl font-semibold italic text-charcoal-900">
                {isFr
                  ? "« L'éducation est une liberté. »"
                  : "“Education is freedom.”"}
              </p>
              <footer className="mt-2 text-sm text-gray-500">
                {isFr
                  ? "La conviction qui guide chacun de nos programmes."
                  : "The conviction that guides every one of our programmes."}
              </footer>
            </blockquote>

            <p className="mt-6 text-sm leading-relaxed text-gray-500">
              {isFr
                ? "Depuis notre première mission à Boro en 2010, la quasi-totalité de chaque don finance directement nos programmes éducatifs en République Centrafricaine."
                : "Since our first mission in Boro in 2010, nearly every euro donated funds our education programmes in the Central African Republic directly."}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/${locale}/about`}
                className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-teal-600 px-6 py-3 text-sm font-semibold text-teal-700 transition-all hover:bg-teal-50"
              >
                {isFr ? "Découvrir notre histoire" : "Discover our story"}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
