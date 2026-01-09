import Link from "next/link";
import ProjectGrid from "./ProjectGrid";

const Work = () => {
  return (
    <section
      className="relative z-10 flex w-full flex-col items-center justify-center bg-[#0E1016] bg-cover bg-center py-16 md:py-20 lg:py-20"
      id="work"
    >
      <h2 className="mb-10 hidden text-[36px] text-[#e4ded7] md:mb-16 md:text-[42px] lg:mb-16 lg:text-[72px]">
        Featured Work
      </h2>

      <ProjectGrid count={3} />
      
      {/* All Projects Button */}
      <div className="mt-16 flex justify-center">
        <Link
          href="/projects"
          className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-[#e4ded7]/10 to-[#e4ded7]/5 px-8 py-4 font-medium text-[#e4ded7] transition-all duration-300 hover:from-[#e4ded7]/20 hover:to-[#e4ded7]/10 hover:shadow-lg hover:shadow-[#e4ded7]/20"
        >
          <span className="relative z-10 flex items-center gap-2">
            All Projects
            <svg 
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-[#e4ded7]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>
      </div>
    </section>
  );
};

export default Work;
