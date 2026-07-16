import { devProjects, ProjectProps } from "../../constants/projectDetails";
import { useState, useMemo } from "react";
import DetailedProjectCard from "../projects/DetailedProjectCard";

interface ProjectGridProps {
  count?: number; // Optional prop with default to show all projects
  searchTerm?: string; // Search term to filter projects
}

const ProjectGrid = ({ count = devProjects.length, searchTerm = "" }: ProjectGridProps) => {
  // Filter projects based on search term (search in technologies)
  const filteredProjects = useMemo(() => {
    if (!searchTerm.trim()) {
      return devProjects;
    }
    
    const term = searchTerm.toLowerCase().trim();
    return devProjects.filter((project) =>
      project.keywords.some((keyword) => keyword.toLowerCase().includes(term)) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(term))
    );
  }, [searchTerm]);

  // Show projects based on the count prop and search filter
  const projectsToShow = filteredProjects.slice(0, count);
  
  return (
    <>
        <div className="grid w-[90%] grid-cols-1 grid-rows-2 gap-y-10 gap-x-6 lg:max-w-[1200px] lg:grid-cols-1">
          {projectsToShow.length > 0 ? (
            projectsToShow.map((project: ProjectProps) => (
              <DetailedProjectCard
                id={project.id}
                key={project.id}
                name={project.name}
                description={project.description}
                technologies={project.technologies}
                keywords={project.keywords}
                github={project.github}
                demo={project.demo}
                image={project.image}
                available={project.available}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-[#e4ded7]/60 text-lg">
                No projects found matching "{searchTerm}". Try searching with different skills.
              </p>
            </div>
          )}
        </div>
    </>
  );
};

export default ProjectGrid;
