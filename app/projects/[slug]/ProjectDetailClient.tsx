"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faLink } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import TableOfContents from '@/components/projects/TableOfContents';
import MDXRenderer from '@/components/projects/MDXRenderer';
import AnimatedTitle from '@/app/animations/AnimatedTitle';
import AnimatedBody from '@/app/animations/AnimatedBody';
import { getPreloaderFlag } from '@/app/utils/preloaderFlag';
import PreLoader from '@/app/animations/PreLoader/PreLoader';
import NavBar from '@/components/common/NavBar';

interface ProjectDetailClientProps {
  mdxContent: string;
  projectData: {
    title: string;
    description: string;
    technologies?: string[];
    github?: string;
    demo?: string;
    image?: any;
  };
}

export default function ProjectDetailClient({ mdxContent, projectData }: ProjectDetailClientProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [toc, setToc] = useState<Array<{id: string, level: number, text: string}>>([]);

  useEffect(() => {
      console.log(getPreloaderFlag());
      window.scrollTo({
        top: 0,
        left: 0,
      });
    }, []);

  // Generate table of contents from rendered content
  useEffect(() => {
    const generateTOC = () => {
      const headings = document.querySelectorAll('.mdx-content h1, .mdx-content h2');
      const tocItems = Array.from(headings).map((heading, index) => {
        const id = heading.id || `heading-${index}`;
        if (!heading.id) {
          heading.id = id;
        }
        return {
          id,
          level: parseInt(heading.tagName.charAt(1)),
          text: heading.textContent || '',
        };
      });
      setToc(tocItems);
    };

    if (mdxContent) {
      // Delay to ensure content is rendered
      setTimeout(generateTOC, 500);
    }
  }, [mdxContent]);

  // Scrollspy logic
  useEffect(() => {
    const handleScroll = () => {
      if (toc.length === 0) return;

      const headings = document.querySelectorAll('.mdx-content h1, .mdx-content h2');
      const scrollPosition = window.scrollY + 150; // Offset for navbar and spacing
      
      let currentSection = '';
      let closestDistance = Infinity;
      
      headings.forEach((heading) => {
        const element = heading as HTMLElement;
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const distance = Math.abs(elementTop - scrollPosition);
        
        // Find the heading closest to our scroll position
        if (elementTop <= scrollPosition && distance < closestDistance) {
          closestDistance = distance;
          currentSection = element.id;
        }
      });

      // If no heading is above the scroll position, use the first one
      if (!currentSection && headings.length > 0) {
        const firstHeading = headings[0] as HTMLElement;
        currentSection = firstHeading.id;
      }

      // Check if we're at the bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      if (isAtBottom && headings.length > 0) {
        const lastHeading = headings[headings.length - 1] as HTMLElement;
        currentSection = lastHeading.id;
      }

      if (currentSection && currentSection !== activeSection) {
        console.log('Setting active section:', currentSection);
        setActiveSection(currentSection);
      }
    };

    // Initial call to set active section
    setTimeout(handleScroll, 100);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [toc, activeSection]);

  return (
    <>
      {getPreloaderFlag() && <PreLoader />}
      <NavBar/>
      {/* Project Header Section */}
      <section className="px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#e4ded7]/10 text-[#e4ded7] rounded-lg backdrop-blur-sm border border-[#e4ded7]/20 hover:bg-[#e4ded7]/20 transition-all duration-300"
              data-blobity-magnetic="false"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
              Back to Projects
            </Link>
          </motion.div>

          {/* Project Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >

            {/* Title and Description */}
            <AnimatedTitle
              text={projectData.title}
              className="text-[#e4ded7] text-3xl md:text-4xl lg:text-5xl mb-4"
              wordSpace="mr-[0.25em]"
              charSpace="-mr-[0.01em]"
            />
            
            <AnimatedBody
              text={projectData.description}
              className="text-[#95979D] text-base md:text-lg mb-6 max-w-4xl leading-relaxed"
            />

            {/* Project Links and Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-5">
              {projectData.github && (
                <Link
                  href={projectData.github}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#e4ded7]/10 text-[#e4ded7] rounded-lg backdrop-blur-sm border border-[#e4ded7]/20 hover:bg-[#e4ded7]/20 transition-all duration-300"
                  data-blobity-magnetic="false"
                >
                  <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
                  Repository
                </Link>
              )}
              
              {projectData.demo && (
                <Link
                  href={projectData.demo}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#e4ded7]/10 text-[#e4ded7] rounded-lg backdrop-blur-sm border border-[#e4ded7]/20 hover:bg-[#e4ded7]/20 transition-all duration-300"
                  data-blobity-magnetic="false"
                >
                  <FontAwesomeIcon icon={faLink} className="w-4 h-4" />
                  Live Demo
                </Link>
              )}
            </div>

            {/* Technologies */}
            {projectData.technologies && (
              <div className="flex flex-wrap gap-2">
                {projectData.technologies.map((tech: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#e4ded7]/5 text-[#e4ded7]/80 text-sm font-medium rounded-full border border-[#e4ded7]/10"
                    data-blobity-magnetic="false"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          <hr className="border-[#e4ded7]/20 mb-8" />
        </div>
      </section>

      {/* Content Section */}
      <section className="px-8 md:px-12 lg:px-16 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-[1fr,300px] lg:gap-10">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mdx-content prose prose-invert prose-lg max-w-none"
            >
              <MDXRenderer content={mdxContent} />
            </motion.article>

            {/* Table of Contents */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="sticky top-10">
                <TableOfContents
                  toc={toc}
                  activeSection={activeSection}
                  github={projectData.github}
                  demo={projectData.demo}
                />
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </>
  );
}