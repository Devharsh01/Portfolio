import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';


import ProjectDetailClient from '@/app/projects/[slug]/ProjectDetailClient';
import { devProjects } from '@/constants/projectDetails';
import PreLoader from "../../animations/PreLoader/PreLoader";
import { getPreloaderFlag } from "../../utils/preloaderFlag";
import NavBar from '@/components/common/NavBar';

// Generate static params for all possible project slugs
export async function generateStaticParams() {
  // Get slugs from project constants
  const projectSlugs = devProjects.map(project => 
    project.name.toLowerCase().replace(/\s+/g, '-')
  );
  
  // Get slugs from MDX files
  const projectsDirectory = path.join(process.cwd(), 'contents', 'projects');
  let mdxSlugs: string[] = [];
  
  try {
    if (fs.existsSync(projectsDirectory)) {
      const fileNames = fs.readdirSync(projectsDirectory);
      mdxSlugs = fileNames
        .filter(name => name.endsWith('.mdx'))
        .map(name => name.replace(/\.mdx$/, ''));
    }
  } catch (error) {
    console.warn('Could not read MDX directory:', error);
  }
  
  // Combine and deduplicate slugs
  const allSlugs = Array.from(new Set([...projectSlugs, ...mdxSlugs]));
  
  return allSlugs.map((slug) => ({
    slug: slug,
  }));
}

// Server-side function to load MDX content
function loadProjectData(slug: string) {
  const projectsDirectory = path.join(process.cwd(), 'contents', 'projects');
  const filePath = path.join(projectsDirectory, `${slug}.mdx`);
  
  // Find project in constants as fallback
  const project = devProjects.find(p => 
    p.name.toLowerCase().replace(/\s+/g, '-') === slug
  );
  
  let mdxData = null;
  
  try {
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter, content } = matter(fileContents);
      mdxData = { frontmatter, content };
    }
  } catch (error) {
    console.warn(`Could not read MDX file for ${slug}:`, error);
  }
  
  // Prepare project data (merge frontmatter with project constants)
  const projectData = {
    title: mdxData?.frontmatter?.title || project?.name || 'Project Not Found',
    description: mdxData?.frontmatter?.description || project?.description || 'No description available',
    technologies: mdxData?.frontmatter?.techs?.split(',') || project?.technologies || [],
    github: mdxData?.frontmatter?.github || project?.github,
    demo: mdxData?.frontmatter?.link || project?.demo,
    image: mdxData?.frontmatter?.banner ? `/${mdxData.frontmatter.banner}` : project?.image,
    category: mdxData?.frontmatter?.category,
    publishedAt: mdxData?.frontmatter?.publishedAt,
  };
  
  const mdxContent = mdxData?.content || 
    `# ${projectData.title}\n\n${projectData.description}\n\n## Technologies Used\n\n${projectData.technologies.join(', ')}`;
  
  return {
    projectData,
    mdxContent,
    project
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const { projectData, mdxContent, project } = loadProjectData(slug);

  // Handle project not found
  if (!projectData.title || projectData.title === 'Project Not Found') {
    return (
      <div className="min-h-screen bg-[#0E1016] flex items-center justify-center flex-col">
        <div className="text-[#e4ded7] text-xl mb-4">Project not found</div>
        <Link 
          href="/projects"
          className="px-4 py-2 bg-[#e4ded7]/10 text-[#e4ded7] rounded-lg backdrop-blur-sm border border-[#e4ded7]/20 hover:bg-[#e4ded7]/20 transition-all duration-300"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E1016]">
      
      <main className="relative z-10 pt-16">
        <ProjectDetailClient 
          mdxContent={mdxContent}
          projectData={projectData}
        />
      </main>
    </div>
  );
}