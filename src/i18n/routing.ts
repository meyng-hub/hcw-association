import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "fr",
  // NOTE: localized pathnames (e.g. /fr/donner, /fr/projets) were configured here
  // but never wired into the links (which use canonical /[locale]/donate via
  // next/link), so the localized aliases 404'd. Removed to keep routing
  // consistent. To add real localized URLs later, build navigation helpers with
  // next-intl's createNavigation and use its <Link> everywhere instead of
  // next/link — then re-introduce a `pathnames` map here.
});

export type Locale = (typeof routing.locales)[number];
