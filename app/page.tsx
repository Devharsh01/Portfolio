"use client";
import Hero from "./hero-section/Hero";
import { useEffect, useState } from "react";
import { getPreloaderFlag } from "./utils/preloaderFlag";

import dynamic from "next/dynamic";
import PreLoader from "./animations/PreLoader/PreLoader";
import NavBar from "@/components/common/NavBar";
const Work = dynamic(() => import("./work-section/Work"));
const About = dynamic(() => import("./about-section/About"));
const Experience = dynamic(() => import("./experience-section/Experience"));
const Blog = dynamic(() => import("./blog-section/BlogGrid"));
const Contact = dynamic(() => import("./contact/Contact"));
const Footer = dynamic(() => import("./footer/Footer"));

export default function Home() { 
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  return (
    <>
      {getPreloaderFlag() && <PreLoader />}
      <NavBar />

      {/* <ScrollerMotion> */}
      <main className="flex flex-col items-center justify-center">
        <Hero />
        <Work />
        <About />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
