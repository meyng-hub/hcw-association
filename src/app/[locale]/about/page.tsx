import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Heart,
  Globe,
  Lightbulb,
  Award,
  Users,
  ChevronRight,
  Quote,
} from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("page_title"),
    description: t("meta_description"),
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        fr: "/fr/about",
        en: "/en/about",
      },
    },
    openGraph: {
      title: `${t("page_title")} | ${SITE_NAME}`,
      description: t("meta_description"),
      type: "website",
    },
  };
}

const TIMELINE = [
  {
    year: 2009,
    fr: "Fondation de l'Association Charles WENEZOUI — « Promouvoir le SAVOIR et la CULTURE »",
    en: "Foundation of Association Charles WENEZOUI — «Promoting Knowledge and Culture»",
    highlight: false,
  },
  {
    year: 2010,
    fr: "Première mission de terrain à Boro, République Centrafricaine — des centaines d'enfants réunis autour du savoir",
    en: "First field mission in Boro, Central African Republic — hundreds of children gathered around knowledge",
    highlight: false,
    photo: "/images/fondateur-banniere-boro.jpg",
    photoAltFr:
      "La bannière de l'Association Charles Wenezoui déployée à Boro en 2010",
    photoAltEn:
      "The Association Charles Wenezoui banner deployed in Boro in 2010",
  },
  {
    year: 2013,
    fr: "Lancement des premiers programmes éducatifs structurés — alphabétisation et soutien scolaire",
    en: "Launch of first structured educational programmes — literacy and school support",
    highlight: false,
  },
  {
    year: 2015,
    fr: "2 000 élèves bénéficiaires du premier programme d'alphabétisation",
    en: "2,000 students reached through the first literacy programme",
    highlight: false,
  },
  {
    year: 2017,
    fr: "Commémoration des 10 ans à Bekou — célébration communautaire de la mémoire du Docteur Wenezoui",
    en: "10th anniversary commemoration in Bekou — community celebration of Dr. Wenezoui's memory",
    highlight: true,
    photo: "/images/commemoration-10ans-bekou-2017.jpg",
    photoAltFr: "Commémoration des 10 ans de l'association à Bekou, 2017",
    photoAltEn: "10th anniversary commemoration in Bekou, 2017",
  },
  {
    year: 2018,
    fr: "Création du concours eNdara Challenge pour l'innovation jeunesse",
    en: "Creation of the eNdara Challenge competition for youth innovation",
    highlight: false,
  },
  {
    year: 2020,
    fr: "Réponse COVID-19 : kits scolaires distribués malgré la crise",
    en: "COVID-19 response: school kits distributed despite the crisis",
    highlight: false,
  },
  {
    year: 2022,
    fr: "Partenariat WEIRAM pour l'autonomisation des femmes en RCA",
    en: "WEIRAM partnership for women's empowerment in CAR",
    highlight: false,
  },
  {
    year: 2025,
    fr: "90 000 élèves touchés depuis la fondation — le legs du Docteur Wenezoui vivant à travers chacun d'eux",
    en: "90,000 students reached since founding — Dr. Wenezoui's legacy living through every one of them",
    highlight: true,
  },
];

const VALUES = [
  {
    icon: BookOpen,
    keyFr: "Éducation",
    keyEn: "Education",
    descFr:
      "Garantir un accès équitable au savoir pour chaque enfant, quelles que soient ses origines.",
    descEn:
      "Ensuring equitable access to knowledge for every child, regardless of their background.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: Heart,
    keyFr: "Solidarité",
    keyEn: "Solidarity",
    descFr:
      "Agir ensemble, avec empathie, pour les communautés vulnérables d'Afrique centrale.",
    descEn:
      "Acting together, with empathy, for vulnerable communities in Central Africa.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: Globe,
    keyFr: "Culture",
    keyEn: "Culture",
    descFr:
      "Valoriser les identités culturelles centrafricaines comme levier de développement.",
    descEn:
      "Valuing Central African cultural identities as a driver of development.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: Lightbulb,
    keyFr: "Innovation",
    keyEn: "Innovation",
    descFr:
      "Concevoir des solutions créatives et adaptées aux réalités du terrain.",
    descEn: "Designing creative solutions adapted to on-the-ground realities.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const isFr = locale === "fr";

  return (
    <>
      {/* ── Hero ── */}
      <section
        aria-labelledby="about-hero-heading"
        className="relative overflow-hidden bg-charcoal-900 pt-32 pb-0 text-white"
      >
        {/* Full-bleed founding photo */}
        <div className="absolute inset-0">
          <Image
            src="/images/banniere-association-charles-wenezoui.jpg"
            alt={
              isFr
                ? "La bannière de l'Association Charles WENEZOUI à Boro, 2010"
                : "Association Charles WENEZOUI banner in Boro, 2010"
            }
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark gradient overlay — heavier at top so text is readable, lightens at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/90 via-charcoal-900/75 to-charcoal-900/95" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 pb-24">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            <Award className="h-4 w-4 text-amber-400" aria-hidden="true" />
            {isFr
              ? "En mémoire du Dr Hervé-Charles Wenezoui · Fondée en 2009"
              : "In memory of Dr Hervé-Charles Wenezoui · Founded 2009"}
          </p>

          <h1
            id="about-hero-heading"
            className="font-serif text-5xl font-bold leading-tight tracking-tight md:text-6xl"
          >
            {isFr ? "Notre histoire" : "Our story"}
          </h1>

          <p className="mt-6 text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed italic font-light">
            {isFr
              ? "« Promouvoir le SAVOIR et la CULTURE »"
              : "«Promoting Knowledge and Culture»"}
          </p>
          <p className="mt-2 text-sm text-gray-400">
            {isFr
              ? "— La devise originelle de l'Association Charles WENEZOUI, Boro, 2010"
              : "— The founding motto of Association Charles WENEZOUI, Boro, 2010"}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <strong className="text-white">H</strong>umanity
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <strong className="text-white">C</strong>ulture
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <strong className="text-white">W</strong>elfare
            </span>
          </div>
          <p className="mt-3 text-xs text-amber-400 tracking-widest uppercase font-semibold">
            {isFr
              ? "HCW · Les initiales d'Hervé-Charles Wenezoui"
              : "HCW · The initials of Hervé-Charles Wenezoui"}
          </p>
        </div>
      </section>

      {/* ── Founder Section — the emotional core ── */}
      <section aria-labelledby="founder-heading" className="bg-cream-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left: story */}
            <div>
              <div className="mb-4 h-1 w-12 rounded bg-amber-500" />
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-amber-600">
                {isFr ? "Notre fondateur" : "Our founder"}
              </p>
              <h2
                id="founder-heading"
                className="font-serif text-4xl font-bold text-charcoal-900 leading-tight"
              >
                {isFr
                  ? "Dr Hervé-Charles Wenezoui"
                  : "Dr Hervé-Charles Wenezoui"}
              </h2>
              <p className="mt-2 text-lg font-medium text-teal-600">
                {isFr
                  ? "Docteur en Droit · Diplomate · Homme de culture"
                  : "Doctor of Law · Diplomat · Man of culture"}
              </p>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-600">
                <p>
                  {isFr
                    ? "HCW est né du désir de perpétuer l'héritage d'un homme exceptionnel : le Docteur Hervé-Charles Wenezoui, juriste, diplomate et défenseur acharné de l'éducation en Afrique centrale. Son fils a fondé cette association en sa mémoire, portant ses initiales comme un engagement."
                    : "HCW was born from the desire to perpetuate the legacy of an exceptional man: Dr Hervé-Charles Wenezoui, jurist, diplomat, and tireless advocate for education in Central Africa. His son founded this association in his memory, carrying his initials as a commitment."}
                </p>
                <p>
                  {isFr
                    ? "L'association porte à la fois les valeurs « Humanity, Culture & Welfare » et les initiales de son fondateur. Ce double sens n'est pas un hasard — c'est une promesse : que chaque action menée soit digne de sa mémoire."
                    : 'The association carries both the values "Humanity, Culture & Welfare" and its founder\'s initials. This double meaning is no coincidence — it is a promise: that every action taken will be worthy of his memory.'}
                </p>
                <p>
                  {isFr
                    ? "Dès 2010, une première mission de terrain à Boro réunissait des centaines d'enfants sous la bannière : « Association Charles WENEZOUI — Promouvoir le SAVOIR et la CULTURE ». Ces mots résument encore aujourd'hui l'essence de tout ce que fait HCW."
                    : 'From 2010, a first field mission in Boro brought together hundreds of children under the banner: "Association Charles WENEZOUI — Promoting Knowledge and Culture". These words still summarise the essence of everything HCW does today.'}
                </p>
              </div>

              {/* Quote card */}
              <div className="mt-8 rounded-2xl bg-teal-700 p-6 text-white">
                <Quote
                  className="mb-3 h-8 w-8 text-amber-400 opacity-80"
                  aria-hidden="true"
                />
                <p className="text-lg font-serif italic leading-relaxed">
                  {isFr
                    ? "« L'ouverture au monde par la connaissance et la culture est un facteur essentiel de développement. »"
                    : "«Openness to the world through knowledge and culture is an essential factor of development.»"}
                </p>
                <p className="mt-3 text-sm text-teal-200">
                  —{" "}
                  {isFr
                    ? "Héritage du Dr Hervé-Charles Wenezoui"
                    : "Legacy of Dr Hervé-Charles Wenezoui"}
                </p>
              </div>
            </div>

            {/* Right: founding photos */}
            <div className="space-y-4">
              {/* Main photo — the original banner in Boro */}
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/images/fondateur-banniere-boro.jpg"
                  alt={
                    isFr
                      ? "La bannière « Association Charles WENEZOUI » déployée à Boro, RCA, janvier 2010"
                      : 'The "Association Charles WENEZOUI" banner deployed in Boro, CAR, January 2010'
                  }
                  width={700}
                  height={500}
                  className="w-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 px-4 py-3">
                  <p className="text-xs text-white font-medium">
                    {isFr
                      ? "Boro, République Centrafricaine · Janvier 2010"
                      : "Boro, Central African Republic · January 2010"}
                  </p>
                </div>
              </div>

              {/* Secondary photo — children in the classroom */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative overflow-hidden rounded-xl shadow-md">
                  <Image
                    src="/images/enfants-classe-boro-2010.jpg"
                    alt={
                      isFr
                        ? "Enfants réunis lors de la première mission de terrain à Boro, 2010"
                        : "Children gathered at the first field mission in Boro, 2010"
                    }
                    width={350}
                    height={300}
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="relative overflow-hidden rounded-xl shadow-md">
                  <Image
                    src="/images/salle-classe-boro-2010.jpg"
                    alt={
                      isFr
                        ? "Salle de classe à Boro lors de la première mission HCW, 2010"
                        : "Classroom in Boro during the first HCW mission, 2010"
                    }
                    width={350}
                    height={300}
                    className="w-full h-40 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section aria-labelledby="mission-heading" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 h-1 w-12 rounded bg-teal-600" />
              <h2
                id="mission-heading"
                className="font-serif text-4xl font-bold text-charcoal-900"
              >
                {t("mission_title")}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                {t("mission_text")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-700">
                  {isFr ? "Association loi 1901" : "Non-profit (loi 1901)"}
                </span>
                <span className="rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-700">
                  {isFr ? "Fondée en 2009" : "Founded 2009"}
                </span>
                <span className="rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-700">
                  {isFr
                    ? "République Centrafricaine"
                    : "Central African Republic"}
                </span>
              </div>
            </div>

            <div>
              <div className="mb-4 h-1 w-12 rounded bg-amber-500" />
              <h2 className="font-serif text-4xl font-bold text-charcoal-900">
                {isFr ? "Notre vision" : "Our vision"}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                {isFr
                  ? "Un monde où chaque enfant centrafricain a accès à une éducation de qualité, où la culture est vecteur de paix, et où la solidarité construit des ponts entre les peuples — à la hauteur du rêve du Docteur Wenezoui."
                  : "A world where every Central African child has access to quality education, where culture is a vehicle for peace, and where solidarity builds bridges between peoples — equal to Dr Wenezoui's dream."}
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="font-serif text-3xl font-bold text-teal-600">
                    90K+
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {isFr ? "élèves touchés" : "students reached"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-serif text-3xl font-bold text-teal-600">
                    6
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {isFr ? "programmes actifs" : "active programmes"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-serif text-3xl font-bold text-teal-600">
                    16
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {isFr ? "années d'action" : "years of action"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section aria-labelledby="timeline-heading" className="bg-cream-50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 h-1 w-12 rounded bg-teal-600" />
            <h2
              id="timeline-heading"
              className="font-serif text-4xl font-bold text-charcoal-900"
            >
              {isFr ? "Notre parcours" : "Our journey"}
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              {isFr
                ? "Seize ans d'action au service de la mémoire d'un homme et de l'avenir d'un peuple."
                : "Sixteen years of action in service of one man's memory and a people's future."}
            </p>
          </div>

          <ol
            className="relative border-l-2 border-teal-200 pl-8 space-y-10"
            aria-label={isFr ? "Chronologie HCW" : "HCW timeline"}
          >
            {TIMELINE.map((item) => {
              const isSpecial = item.highlight;
              return (
                <li key={item.year} className="relative">
                  {/* dot */}
                  <span
                    className={`absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full border-2 bg-white ${isSpecial ? "border-amber-500" : "border-teal-600"}`}
                    aria-hidden="true"
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${isSpecial ? "bg-amber-500" : "bg-teal-600"}`}
                    />
                  </span>
                  <time
                    dateTime={String(item.year)}
                    className={`mb-1 block text-xs font-bold uppercase tracking-wider ${isSpecial ? "text-amber-600" : "text-teal-600"}`}
                  >
                    {item.year}
                  </time>

                  {isSpecial ? (
                    <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 flex items-start gap-3">
                      <Award
                        className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500"
                        aria-hidden="true"
                      />
                      <p className="text-base font-semibold text-amber-900">
                        {isFr ? item.fr : item.en}
                      </p>
                    </div>
                  ) : (
                    <p className="text-base text-charcoal-900">
                      {isFr ? item.fr : item.en}
                    </p>
                  )}

                  {/* Optional milestone photo */}
                  {"photo" in item && item.photo && (
                    <div className="mt-4 overflow-hidden rounded-xl shadow-md">
                      <Image
                        src={item.photo}
                        alt={
                          isFr
                            ? (item.photoAltFr ?? "")
                            : (item.photoAltEn ?? "")
                        }
                        width={600}
                        height={300}
                        className="w-full h-44 object-cover object-center"
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── Values ── */}
      <section aria-labelledby="values-heading" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 h-1 w-12 rounded bg-teal-600" />
            <h2
              id="values-heading"
              className="font-serif text-4xl font-bold text-charcoal-900"
            >
              {isFr ? "Nos valeurs" : "Our values"}
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(
              ({ icon: Icon, keyFr, keyEn, descFr, descEn, color, bg }) => (
                <div
                  key={keyFr}
                  className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 hover:shadow-md transition-shadow"
                >
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${bg}`}
                  >
                    <Icon className={`h-6 w-6 ${color}`} aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-charcoal-900 mb-2">
                    {isFr ? keyFr : keyEn}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {isFr ? descFr : descEn}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section aria-labelledby="team-heading" className="bg-cream-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 h-1 w-12 rounded bg-teal-600" />
            <h2
              id="team-heading"
              className="font-serif text-4xl font-bold text-charcoal-900"
            >
              {isFr ? "Notre équipe" : "Our team"}
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              {isFr
                ? "Des personnes engagées, portées par la conviction que l'éducation change le monde."
                : "Dedicated people driven by the conviction that education changes the world."}
            </p>
          </div>

          {/* Team community photo */}
          <div className="mb-12 overflow-hidden rounded-2xl shadow-md">
            <figure>
              <Image
                src="/images/team-community.jpg"
                alt={
                  isFr
                    ? "L'équipe HCW et partenaires communautaires"
                    : "HCW team and community partners"
                }
                width={1200}
                height={600}
                className="w-full object-cover"
              />
              <figcaption className="bg-charcoal-900 px-6 py-3 text-center text-sm text-gray-300">
                {isFr
                  ? "Notre équipe et partenaires communautaires en République Centrafricaine"
                  : "Our team and community partners in the Central African Republic"}
              </figcaption>
            </figure>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
              <Users className="h-4 w-4" aria-hidden="true" />
              {isFr
                ? "Une équipe de bénévoles engagés en France et en République Centrafricaine"
                : "A team of committed volunteers in France and in the Central African Republic"}
            </p>
          </div>
        </div>
      </section>

      {/* ── Commemoration photo strip ── */}
      <section
        aria-label={
          isFr
            ? "Commémoration des 10 ans, Bekou 2017"
            : "10th anniversary commemoration, Bekou 2017"
        }
        className="bg-charcoal-900 py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8 text-center text-sm font-bold uppercase tracking-widest text-amber-400">
            {isFr
              ? "Commémoration des 10 ans · Bekou, 2017"
              : "10th Anniversary Commemoration · Bekou, 2017"}
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="overflow-hidden rounded-xl">
              <Image
                src="/images/commemoration-10ans-bekou-2017.jpg"
                alt={
                  isFr
                    ? "Rassemblement communautaire à Bekou, 2017"
                    : "Community gathering in Bekou, 2017"
                }
                width={400}
                height={300}
                className="w-full h-44 object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-xl">
              <Image
                src="/images/commemoration-10ans-discours.jpg"
                alt={
                  isFr
                    ? "Discours lors de la commémoration des 10 ans, 2017"
                    : "Speech at the 10th anniversary commemoration, 2017"
                }
                width={400}
                height={300}
                className="w-full h-44 object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-xl">
              <Image
                src="/images/commemoration-10ans-portait.jpg"
                alt={
                  isFr
                    ? "Participante à la commémoration de Bekou, 2017"
                    : "Participant at the Bekou commemoration, 2017"
                }
                width={400}
                height={300}
                className="w-full h-44 object-cover object-top transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-xl">
              <Image
                src="/images/commemoration-10ans-dame.jpg"
                alt={
                  isFr
                    ? "Cérémonie du 10e anniversaire de l'association, Bekou 2017"
                    : "10th anniversary ceremony of the association, Bekou 2017"
                }
                width={400}
                height={300}
                className="w-full h-44 object-cover object-top transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-gray-400">
            {isFr
              ? "Dix ans après la fondation, la communauté de Bekou s'est réunie pour honorer la mémoire du Dr Wenezoui et célébrer l'impact de son héritage."
              : "Ten years after its founding, the community of Bekou gathered to honour the memory of Dr Wenezoui and celebrate the impact of his legacy."}
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        aria-labelledby="about-cta-heading"
        className="bg-gradient-to-br from-teal-700 to-charcoal-900 py-20 text-white"
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 id="about-cta-heading" className="font-serif text-4xl font-bold">
            {isFr ? "Rejoindre notre mission" : "Join our mission"}
          </h2>
          <p className="mt-6 text-lg text-teal-100">
            {isFr
              ? "Chaque don, chaque heure de bénévolat perpétue la vision du Docteur Wenezoui."
              : "Every donation, every hour of volunteering perpetuates Dr Wenezoui's vision."}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${locale}/donate`}
              className="flex items-center gap-2 rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-amber-600 hover:shadow-xl active:scale-95"
            >
              <Heart className="h-4 w-4" aria-hidden="true" />
              {isFr ? "Faire un don" : "Donate"}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              {isFr ? "Nous contacter" : "Contact us"}
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
