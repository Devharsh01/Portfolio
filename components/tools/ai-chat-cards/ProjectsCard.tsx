import React from "react";
import { BsCardChecklist } from "react-icons/bs";
import Link from "next/link";

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  image?: string;
}

interface ProjectsCardProps {
  projects: Project[];
}

const BsCardChecklistIcon = BsCardChecklist as any;

export const ProjectsCard: React.FC<ProjectsCardProps> = ({ projects }) => (
  <div className="mt-3 space-y-4">
    {projects.map((project, index) => (
      <div
        key={index}
        className="bg-[#212531]/60 backdrop-blur-sm rounded-xl p-5 border border-[#e4ded7]/20 shadow-md hover:shadow-lg hover:shadow-[#e4ded7]/10 transition-all duration-300 hover:border-[#e4ded7]/30"
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#e4ded7]/10">
              <BsCardChecklistIcon className="text-[#e4ded7]/80 w-4 h-4" />
            </div>
            <h3 className="font-semibold text-[#e4ded7]">{project.title}</h3>
          </div>
          {project.link && (
            project.link.startsWith("/") ? (
              <Link
                href={project.link}
                className="text-[#e4ded7]/80 hover:text-[#e4ded7] text-sm font-medium transition-colors duration-300 hover:underline"
              >
                View Project →
              </Link>
            ) : (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e4ded7]/80 hover:text-[#e4ded7] text-sm font-medium transition-colors duration-300 hover:underline"
              >
                View Project →
              </a>
            )
          )}
        </div>
        <p className="mt-2 text-sm text-[#e4ded7]/80 leading-relaxed">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 bg-[#e4ded7]/10 rounded-lg text-xs text-[#e4ded7]/90 border border-[#e4ded7]/20 font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default ProjectsCard;
