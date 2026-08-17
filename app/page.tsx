import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { TrackRecord } from "@/components/sections/TrackRecord";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { Segments } from "@/components/sections/Segments";
import { WhyAgileDoor } from "@/components/sections/WhyAgileDoor";

export default function Home() {
  return (
    <>
      <Hero />
      <TrackRecord />
      <WhyAgileDoor />
      <ProductShowcase />
      <Segments />
      <FinalCta />
    </>
  );
}
