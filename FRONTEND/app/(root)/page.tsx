import Collections from "@/components/Collections";
import ContactLinks from "@/components/ContactLinks";
import Footer1 from "@/components/Footer/Footer1";
import Footer2 from "@/components/Footer/Footer2";


import ProductList from "@/components/ProductList";
import SliderBanner from "@/components/Slider/Banner";
import { Component } from "lucide-react";




export default function Home() {
  return (
    <>
      {/* <Image src="/banner.png" alt="banner" width={2000} height={1000} className="w-screen" /> */}
      <SliderBanner />
      <Collections />
      <ProductList />
      <Footer1 />
      <Footer2 />
      <ContactLinks />

    </>
  );
}

export const dynamic = "force-dynamic";
