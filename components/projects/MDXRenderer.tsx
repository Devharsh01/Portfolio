"use client";

import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface MDXRendererProps {
  content: string;
}

export default function MDXRenderer({ content }: MDXRendererProps) {
  const components = useMemo(() => ({
    h1: ({ children, ...props }: any) => (
      <motion.h1
        {...props}
        className="text-3xl md:text-4xl font-bold text-[#e4ded7] mt-10 mb-5 first:mt-0 bg-gradient-to-r from-[#e4ded7] to-[#e4ded7]/80 bg-clip-text"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {children}
      </motion.h1>
    ),
    h2: ({ children, ...props }: any) => (
      <motion.h2
        {...props}
        className="text-2xl md:text-3xl font-bold text-[#e4ded7] mt-8 mb-4 relative"
        initial={{ opacity: 0, y: 25, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <span className="relative z-10">{children}</span>
        <motion.div 
          className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#e4ded7]/40 to-transparent"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </motion.h2>
    ),
    h3: ({ children, ...props }: any) => (
      <motion.h3
        {...props}
        className="text-xl md:text-2xl font-semibold text-[#e4ded7] mt-6 mb-3"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {children}
      </motion.h3>
    ),
    h4: ({ children, ...props }: any) => (
      <motion.h4
        {...props}
        className="text-lg md:text-xl font-semibold text-[#e4ded7] mt-5 mb-2"
        initial={{ opacity: 0, y: 15, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {children}
      </motion.h4>
    ),
    p: ({ children, ...props }: any) => (
      <motion.p
        {...props}
        className="text-[#95979D] text-base md:text-lg leading-relaxed mb-6 tracking-wide"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {children}
      </motion.p>
    ),
    ul: ({ children, ...props }: any) => (
      <motion.ul
        {...props}
        className="text-[#95979D] space-y-3 mb-6 pl-6 list-disc marker:text-[#e4ded7]/60"
        data-no-blobity="true"
        initial={{ opacity: 0, x: -15 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {children}
      </motion.ul>
    ),
    ol: ({ children, ...props }: any) => (
      <motion.ol
        {...props}
        className="text-[#95979D] space-y-3 mb-6 pl-6 list-decimal marker:text-[#e4ded7]/60"
        data-no-blobity="true"
        initial={{ opacity: 0, x: -15 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {children}
      </motion.ol>
    ),
    li: ({ children, ...props }: any) => (
      <motion.li 
        {...props} 
        className="text-[#95979D] leading-relaxed"
        data-no-blobity="true"
        initial={{ opacity: 0, x: -5 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        viewport={{ once: true }}
      >
        {children}
      </motion.li>
    ),
    blockquote: ({ children, ...props }: any) => (
      <motion.blockquote
        {...props}
        className="relative border-l-4 border-[#e4ded7] pl-6 py-5 my-8 bg-gradient-to-r from-[#212531]/40 to-[#212531]/20 rounded-r-lg shadow-lg backdrop-blur-sm"
        initial={{ opacity: 0, x: -30, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        data-blobity-magnetic="false"
      >
        <motion.div 
          className="text-[#e4ded7] italic text-lg leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {children}
        </motion.div>
      </motion.blockquote>
    ),
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <motion.div
          className="my-6 rounded-xl overflow-hidden border border-[#e4ded7]/15 shadow-2xl backdrop-blur-sm"
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-[#1a1b23] to-[#1e1f2a] px-4 py-2 border-b border-[#e4ded7]/10">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500/60 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500/60 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500/60 rounded-full"></div>
              <span className="ml-4 text-[#95979D] text-xs font-mono">{match[1]}</span>
            </div>
          </div>
          <pre className="bg-[#1a1b23] p-4 text-[#e4ded7] text-sm font-mono overflow-x-auto">
            <code className={className} {...props}>
              {children}
            </code>
          </pre>
        </motion.div>
      ) : (
        <code 
          className="bg-[#212531]/80 text-[#e4ded7] px-2 py-1 rounded-md text-sm font-mono border border-[#e4ded7]/15 shadow-sm" 
          data-blobity-magnetic="true"
          {...props}
        >
          {children}
        </code>
      );
    },
    a: ({ children, href, ...props }: any) => (
      <motion.a
        {...props}
        href={href}
        className="relative text-[#e4ded7] font-medium underline decoration-[#e4ded7]/40 underline-offset-4 hover:decoration-[#e4ded7] transition-all duration-300 hover:text-[#e4ded7]/90"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.a>
    ),
    hr: ({ ...props }: any) => (
      <hr {...props} className="border-[#e4ded7]/20 my-12" />
    ),
    table: ({ children, ...props }: any) => (
      <motion.div
        className="overflow-x-auto my-8 rounded-xl border border-[#e4ded7]/15 shadow-lg backdrop-blur-sm"
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <table {...props} className="w-full bg-gradient-to-br from-[#212531]/40 to-[#212531]/20">
          {children}
        </table>
      </motion.div>
    ),
    thead: ({ children, ...props }: any) => (
      <thead {...props} className="bg-[#e4ded7]/5">
        {children}
      </thead>
    ),
    th: ({ children, ...props }: any) => (
      <th {...props} className="px-4 py-3 text-left text-[#e4ded7] font-semibold border-b border-[#e4ded7]/10">
        {children}
      </th>
    ),
    td: ({ children, ...props }: any) => (
      <td {...props} className="px-4 py-3 text-[#95979D] border-b border-[#e4ded7]/5">
        {children}
      </td>
    ),
    strong: ({ children, ...props }: any) => (
      <strong {...props} className="text-[#e4ded7] font-semibold">
        {children}
      </strong>
    ),
    em: ({ children, ...props }: any) => (
      <em {...props} className="text-[#e4ded7]/90 italic">
        {children}
      </em>
    ),
  }), []);

  return (
    <div className="prose-custom [&_li]:data-[no-blobity] [&_ul]:data-[no-blobity] [&_ol]:data-[no-blobity]" data-no-blobity>
      <ReactMarkdown components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}