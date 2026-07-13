import { SITE, SITE_URL } from "@/lib/constants";
import { getSiteSettings } from "@/services/settings.service";
import { JsonLd } from "@/components/shared/json-ld";
import { Hero } from "@/features/home/components/hero";
import { Stats } from "@/features/home/components/stats";
import { WhyUs } from "@/features/home/components/why-us";
import { Services } from "@/features/home/components/services";
import { Featured } from "@/features/home/components/featured";
import { Cta } from "@/features/home/components/cta";

export default async function HomePage() {
  const settings = await getSiteSettings();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.nombre,
    description: settings.descripcion,
    url: SITE_URL,
    email: settings.email,
    address: settings.direccion,
    sameAs: [settings.instagram, settings.facebook].filter(Boolean),
    logo: `${SITE_URL}/icon.svg`,
    slogan: SITE.tagline,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero />
      <Stats />
      <WhyUs />
      <Services />
      <Featured />
      <Cta />
    </>
  );
}
