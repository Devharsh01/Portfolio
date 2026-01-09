"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "@/components/common/NavBar";

const NotFound = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <>
      <NavBar />
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#050505] overflow-hidden font-sans text-white selection:bg-white selection:text-black">
        
        {/* 1. Dynamic Background Grain/Grid */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #333 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* 2. Mouse Spotlight Effect*/}
        <div 
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
          }}
        />

        {/* 3. Main Content */}
        <div className="z-10 flex flex-col items-center justify-center px-4 -mt-20 text-center">
          
          {/* Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-neutral-400 backdrop-blur-md"
          >
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
            Error 404
          </motion.div>

          {/* Massive 404 Text */}
          <div className="relative">
            <motion.h1
              initial={{ y: 100, opacity: 0, skewY: 5 }}
              animate={{ y: 0, opacity: 1, skewY: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="select-none text-[clamp(8rem,20vw,24rem)] font-black leading-[0.8] tracking-tighter text-white mix-blend-difference"
            >
              404
            </motion.h1>
            
            {/* Decorative Blur behind text */}
            <div className="absolute left-1/2 top-1/2 -z-10 h-[60%] w-[100%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[120px]" />
          </div>

          {/* Subtext Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-8 flex max-w-lg flex-col items-center gap-4"
          >
            <h2 className="text-2xl font-light text-neutral-200 md:text-3xl">
              Nothing to see here.
            </h2>
            <p className="text-base text-neutral-500 leading-relaxed">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
          </motion.div>
        </div>

        {/* Corner Copyright/Info */}
        <div className="absolute bottom-6 left-6 hidden text-xs font-medium tracking-widest text-neutral-700 md:block">
          DEV HARSH AGARWAL © 2025
        </div>
        <div className="absolute bottom-6 right-6 hidden text-xs font-medium tracking-widest text-neutral-700 md:block">
          SYSTEM STATUS: NORMAL
        </div>
      </div>
    </>
  );
};

export default NotFound;
