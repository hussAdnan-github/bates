import Branches from "@/components/shared/Branches";
import Contact from "@/components/shared/Contact";
import Features from "@/components/shared/Features";
import Hero from "@/components/shared/Hero";
import Image from "next/image";

export default function Home() {
  return (
   <>
        <Hero/>
    <Features/>
    <Branches/>
    <Contact/>
   </>
  );
}
