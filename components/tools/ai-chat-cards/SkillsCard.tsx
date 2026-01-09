import React from "react";
import { FaCode } from "react-icons/fa";

export interface Skill {
  name: string;
  category: string;
}

interface SkillsCardProps {
  skills: Skill[];
}

const CodeIcon = FaCode as any;

export const SkillsCard: React.FC<SkillsCardProps> = ({ skills }) => {
  // Group skills by category for better organization
  const groupedSkills: Record<string, Skill[]> = {};

  skills.forEach((skill) => {
    if (!groupedSkills[skill.category]) {
      groupedSkills[skill.category] = [];
    }
    groupedSkills[skill.category].push(skill);
  });

  return (
    <div className="mt-3 space-y-4">
      <div className="bg-[#212531]/60 backdrop-blur-sm rounded-xl p-5 border border-[#e4ded7]/20 shadow-md hover:shadow-lg hover:shadow-[#e4ded7]/10 transition-all duration-300">
        <div className="flex items-center gap-2 mb-5">
          <div className="p-2 rounded-lg bg-[#e4ded7]/10">
            <CodeIcon className="text-[#e4ded7]/80 w-5 h-5" />
          </div>
          <h3 className="font-semibold text-[#e4ded7] text-base">Skills & Technologies</h3>
        </div>

        <div className="space-y-6">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="space-y-3">
              <h4 className="text-sm font-medium text-[#e4ded7]/60 border-b border-[#e4ded7]/10 pb-2">
                {category}
              </h4>

              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-[#e4ded7]/10 hover:bg-[#e4ded7]/15 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 border border-[#e4ded7]/20 hover:border-[#e4ded7]/30"
                  >
                    <span className="font-medium text-sm text-[#e4ded7]">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsCard;
