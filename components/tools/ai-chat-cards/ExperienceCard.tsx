import React from "react";
import { MdWork } from "react-icons/md";

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface ExperienceCardProps {
  experiences: Experience[];
}

const MdWorkIcon = MdWork as any;

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experiences,
}) => (
  <div className="mt-3 space-y-4">
    {experiences.map((exp, index) => (
      <div
        key={index}
        className="bg-[#212531]/60 backdrop-blur-sm rounded-xl p-5 border border-[#e4ded7]/20 shadow-md hover:shadow-lg hover:shadow-[#e4ded7]/10 transition-all duration-300 hover:border-[#e4ded7]/30"
      >
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-[#e4ded7]/10">
            <MdWorkIcon className="text-[#e4ded7]/80 w-5 h-5" />
          </div>
          <h3 className="font-semibold text-[#e4ded7]">{exp.title}</h3>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-sm text-[#e4ded7]/80 font-medium">{exp.company}</span>
          <span className="text-xs text-[#e4ded7]/60 bg-[#e4ded7]/5 px-2 py-1 rounded">{exp.period}</span>
        </div>
        <p className="mt-3 text-sm text-[#e4ded7]/80 leading-relaxed">{exp.description}</p>
      </div>
    ))}
  </div>
);

export default ExperienceCard;
