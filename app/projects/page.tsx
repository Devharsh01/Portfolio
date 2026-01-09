"use client";
import ProjectGrid from "../work-section/ProjectGrid";
import NavBar from "../../components/common/NavBar";
import Link from "next/link";
import PreLoader from "../animations/PreLoader/PreLoader";
import { getPreloaderFlag } from "../utils/preloaderFlag";
import SearchBar from "./SearchBar";
import ScrollToTop from "../../components/common/ScrollToTop";
import { useEffect, useState } from "react";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <>
      {getPreloaderFlag() && <PreLoader />}
      <NavBar />
      
      <section
        className="relative z-10 flex w-full flex-col items-center justify-center bg-[#0E1016] bg-cover bg-center py-16 md:py-20 lg:py-20"
        id="work"
      >
        {/* Home Button */}
        <div className="absolute top-8 left-8 md:top-12 md:left-12 lg:top-16 lg:left-16">
          <Link
            href="/"
            // className="inline-flex items-center px-4 py-2 bg-[#e4ded7]/10 text-[#e4ded7] rounded-lg backdrop-blur-sm border border-[#e4ded7]/20 hover:bg-[#e4ded7]/20 transition-all duration-300 hover:scale-105"
            aria-label="Go to Home"
          >
            <button
              className="hidden rounded-md border-2 border-[#e4ded7] py-2 px-4 text-[14px] font-semibold text-[#e4ded7] sm:block  md:text-[16px] lg:block"
            >
              HOME
            </button>
          </Link>
        </div>
        <h2 className="mb-10 text-[36px] text-[#e4ded7] md:mb-16 md:text-[42px] lg:mb-16 lg:text-[72px]">
          Featured Work
        </h2>

        <SearchBar onSearch={handleSearch} />

        <ProjectGrid searchTerm={searchTerm} />
      </section>
      
      <ScrollToTop />
    </>
  );
};

export default Projects;
