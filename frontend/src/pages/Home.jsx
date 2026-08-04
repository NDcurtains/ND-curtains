import React from "react";
import Seo from "../components/Seo";
import Marquee from "../components/Marquee";
import HomeHero from "../components/home/HomeHero";
import HomeIntro from "../components/home/HomeIntro";
import HomeManifesto from "../components/home/HomeManifesto";
import HomeShowcase from "../components/home/HomeShowcase";
import HomeSuppliers from "../components/home/HomeSuppliers";
import HomeReviews from "../components/home/HomeReviews";
import HomeCta from "../components/home/HomeCta";

const MARQUEE = [
  "Custom Curtains",
  "Sheer",
  "Blockout",
  "Double Curtains",
  "S-Fold / Wave",
  "Pinch Pleat",
  "Blinds",
];

const Home = () => {
  return (
    <>
      <Seo
        title="Custom Curtains & Blinds Melbourne"
        description="ND Curtains — custom-made sheer curtains, blockout curtains and blinds in Melbourne. In-home measure, premium and affordable fabrics, S-Fold/Wave and Pinch Pleat. Servicing Officer South & South East Melbourne."
        path="/"
      />
      <HomeHero />
      <Marquee items={MARQUEE} />
      <HomeIntro />
      <HomeManifesto />
      <HomeShowcase />
      <HomeSuppliers />
      <HomeReviews />
      <HomeCta />
    </>
  );
};

export default Home;
