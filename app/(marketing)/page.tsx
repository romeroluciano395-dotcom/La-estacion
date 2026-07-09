import { Hero } from "@/features/home/components/hero";
import { Stats } from "@/features/home/components/stats";
import { WhyUs } from "@/features/home/components/why-us";
import { Services } from "@/features/home/components/services";
import { Featured } from "@/features/home/components/featured";
import { Cta } from "@/features/home/components/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <WhyUs />
      <Services />
      <Featured />
      <Cta />
    </>
  );
}
