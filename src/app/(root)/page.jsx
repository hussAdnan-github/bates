import Branches from "@/components/shared/Branches";
import Contact from "@/components/shared/Contact";
import Features from "@/components/shared/Features";
import Hero from "@/components/shared/Hero";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  if (params?.source === "pwa") {
    redirect("/login");
  }
  return (
    <>
      <Hero />
      <Features />
      <Branches />
      <Contact />
    </>
  );
}
