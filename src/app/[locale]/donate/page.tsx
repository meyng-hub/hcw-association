import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import DonateClient from "./DonateClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "donate" });
  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
    },
  };
}

export default async function DonatePage({
  searchParams,
}: {
  searchParams: Promise<{ amount?: string }>;
}) {
  const { amount } = await searchParams;
  const parsed = amount ? Number(amount) : NaN;
  const initialAmount =
    Number.isFinite(parsed) && parsed >= 5 ? parsed : undefined;
  return <DonateClient initialAmount={initialAmount} />;
}
