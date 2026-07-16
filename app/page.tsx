"use client";
import Hero from "./hero-section/Hero";
import { useEffect, useState } from "react";
import { getPreloaderFlag } from "./utils/preloaderFlag";

import dynamic from "next/dynamic";
import PreLoader from "./animations/PreLoader/PreLoader";
import NavBar from "@/components/common/NavBar";
import { AIChatModal } from "@/components/tools/ai-chat-modal";
const Work = dynamic(() => import("./work-section/Work"));
const About = dynamic(() => import("./about-section/About"));
const Experience = dynamic(() => import("./experience-section/Experience"));
const Blog = dynamic(() => import("./blog-section/BlogGrid"));
const Contact = dynamic(() => import("./contact/Contact"));
const Footer = dynamic(() => import("./footer/Footer"));

export default function Home() { 
  const [isChatOpen, setIsChatOpen] = useState(false);

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

      {/* AI Chat Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#e4ded7]/20 to-[#000] backdrop-blur-sm flex items-center justify-center  transition-all duration-500 hover:scale-110 hover:rotate-12 border border-[#e4ded7]/30 group"
        aria-label="Open AI Chat"
      >
        <svg 
          className="w-7 h-7 text-white group-hover:scale-110 transition-transform"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
          />
        </svg>
      </button>

      {/* AI Chat Modal */}
      <AIChatModal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </>
  );
}
