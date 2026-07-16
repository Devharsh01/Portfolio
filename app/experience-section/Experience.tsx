"use client";

import { experiences } from "@/constants/experience";
import { Timeline } from "@/components/ui/timeline";
import AnimatedTitle from "../animations/AnimatedTitle";

export default function Experience() {
  const timelineData = experiences.map((exp) => ({
    title: exp.period,
    content: (
      <div className="flex flex-col gap-4">
        <div>
          <h4 className="text-xl md:text-2xl font-bold text-[#e4ded7]">
            {exp.role}
          </h4>
          <span className="inline-block mt-1 text-sm md:text-base font-semibold text-[#e4ded7]/60">
            {exp.company}
          </span>
        </div>
        <ul className="list-disc pl-5 flex flex-col gap-2.5 text-[#95979D] text-[14px] md:text-[15px] leading-relaxed">
          {exp.description.map((bullet, idx) => (
            <li key={idx} className="hover:text-[#e4ded7] transition-colors duration-200">
              {bullet}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          {exp.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="rounded-lg bg-[#e4ded7]/5 px-3 py-1.5 text-[11px] md:text-[12px] font-bold uppercase tracking-wider text-[#e4ded7]/80 border border-[#e4ded7]/10 backdrop-blur-sm hover:bg-[#e4ded7]/10 hover:text-[#e4ded7] transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    ),
  }));

  return (
    <section
      className="relative z-10 w-full items-center justify-center overflow-hidden bg-[#0E1016] bg-cover bg-center py-16 md:py-20 lg:py-20"
      id="experience"
    >
      <div className="mx-auto flex w-[90%] flex-col lg:max-w-[1212.8px]">
        <AnimatedTitle
          text={"WORK EXPERIENCE"}
          className={
            "mb-4 text-left text-[40px] font-bold leading-[0.9em] tracking-tighter text-[#e4ded7] sm:text-[45px] md:mb-8 md:text-[60px] lg:text-[80px]"
          }
          wordSpace={"mr-[14px]"}
          charSpace={"mr-[0.001em]"}
        />
        <Timeline data={timelineData} />
      </div>
    </section>
  );
}
