"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export type HeadingScrollSpy = Array<{
  id: string;
  level: number;
  text: string;
}>;

interface TableOfContentsProps {
  toc: HeadingScrollSpy;
  activeSection: string;
  github?: string;
  demo?: string;
}

export default function TableOfContents({ toc, activeSection, github, demo }: TableOfContentsProps) {
  const lastPosition = useRef<number>(0);

  // Auto-scroll the TOC to keep active section in view
  useEffect(() => {
    const container = document.getElementById('toc-container');
    const activeLink = document.getElementById(`toc-link-${activeSection}`);

    if (container && activeLink) {
      const cTop = container.scrollTop;
      const cBottom = cTop + container.clientHeight;
      const lTop = activeLink.offsetTop - container.offsetTop;
      const lBottom = lTop + activeLink.clientHeight;
      const isTotal = lTop >= cTop && lBottom <= cBottom;
      const isScrollingUp = lastPosition.current > window.scrollY;
      lastPosition.current = window.scrollY;

      if (!isTotal) {
        const offset = 25;
        const top = isScrollingUp
          ? lTop - container.clientHeight + offset
          : lTop - offset;

        container.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }, [activeSection]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const minLevel = toc.reduce((min, item) => Math.min(min, item.level), 6);

  if (!toc.length) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#212531]/50 backdrop-blur-sm border border-[#e4ded7]/10 rounded-2xl p-6"
    >
      <h3 className="text-[#e4ded7] text-xl font-semibold mb-4">
        Table of Contents
      </h3>
      
      <div
        id="toc-container"
        className="max-h-[calc(100vh-200px)] overflow-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#e4ded7]/20"
      >
        <nav className="space-y-1">
          {toc.map(({ id, level, text }) => {
            const isActive = activeSection === id;
            const indent = (level - minLevel) * 16;
            
            return (
              <motion.a
                key={id}
                id={`toc-link-${id}`}
                href={`#${id}`}
                onClick={(e) => handleLinkClick(e, id)}
                className={`
                  block py-2 px-3 rounded-lg text-sm transition-all duration-300
                  ${isActive 
                    ? 'bg-[#e4ded7]/10 text-[#e4ded7] font-medium border-l-2 border-[#e4ded7]' 
                    : 'text-[#95979D] hover:text-[#e4ded7] hover:bg-[#e4ded7]/5'
                  }
                `}
                style={{ paddingLeft: `${12 + indent}px` }}
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
                data-blobity-magnetic="false"
              >
                <span className="line-clamp-2">
                  {text}
                </span>
              </motion.a>
            );
          })}
        </nav>
      </div>
      
      {/* Progress Indicator */}
      <div className="mt-4 pt-4 border-t border-[#e4ded7]/10">
        <div className="flex items-center justify-between text-xs text-[#95979D]">
          <span>Reading Progress</span>
          <span>{toc.findIndex(item => item.id === activeSection) + 1} / {toc.length}</span>
        </div>
        <div className="mt-2 h-1 bg-[#e4ded7]/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#e4ded7] rounded-full"
            initial={{ width: '0%' }}
            animate={{ 
              width: `${((toc.findIndex(item => item.id === activeSection) + 1) / toc.length) * 100}%` 
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Links Section */}
      {(demo || github) && (
        <div className="mt-4 pt-4 border-t border-[#e4ded7]/10 space-y-1">
          {demo && (
            <motion.a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm text-[#95979D] hover:text-[#e4ded7] hover:bg-[#e4ded7]/5 transition-all duration-300"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
              data-blobity-magnetic="false"
            >
              <FontAwesomeIcon icon={faLink} className="w-4 h-4" />
              <span>Live Demo</span>
            </motion.a>
          )}
          {github && (
            <motion.a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm text-[#95979D] hover:text-[#e4ded7] hover:bg-[#e4ded7]/5 transition-all duration-300"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
              data-blobity-magnetic="false"
            >
              <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
              <span>GitHub</span>
            </motion.a>
          )}
        </div>
      )}
    </motion.div>
  );
}