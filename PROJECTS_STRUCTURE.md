# Project Structure Documentation

This document explains the enhanced project structure that follows the theodorusclarence.com format for better content management and scalability.

## Overview

The project structure has been enhanced to support MDX-based project content, similar to how theodorusclarence.com manages projects. This provides better content management, SEO optimization, and development experience.

## Directory Structure

```
Portfolio-v2/
├── contents/
│   └── projects/           # MDX project files
│       ├── odunsi.mdx
│       ├── interlock.mdx
│       ├── synthetix.mdx
│       ├── propellent.mdx
│       └── flixify.mdx
├── constants/
│   └── projectDetails.ts   # Enhanced type definitions and legacy support
├── lib/
│   └── projects.ts         # Utility functions for project management
└── ...
```

## Project File Format

Each project is now stored as an MDX file with frontmatter containing metadata:

```mdx
---
title: 'Project Name'
description: 'Brief project description'
category: 'Project Category'
publishedAt: '2024-01-15'
techs: 'react,nextjs,tailwindcss'
banner: 'projects/project-image.png'
link: 'https://project-demo.com'
github: 'https://github.com/user/repo'
youtube: 'https://youtube.com/watch?v=...'
---

> ## Short Explanation

Detailed project description...

> ## Project Goals

Project objectives and goals...

<blockquote className='with-icons'>
  ## Tech Stack Used
  <div className='not-prose mt-2'>
    <TechIcons techs={['react', 'nextjs', 'tailwindcss']} />
  </div>
</blockquote>

> ## Features

### Feature 1
Description of feature 1...

### Feature 2
Description of feature 2...
```

## Type Definitions

### ProjectFrontmatter
```typescript
export type ProjectFrontmatter = {
  slug: string;
  title: string;
  publishedAt: string;
  lastUpdated?: string;
  description: string;
  category?: string;
  techs: string; // comma-separated string
  banner: string;
  link?: string;
  github?: string;
  youtube?: string;
  available: boolean;
};
```

### ProjectType
```typescript
export type ProjectType = {
  code: string;
  frontmatter: ProjectFrontmatter;
};
```

## Available Functions

### From `lib/projects.ts`

- `getProjectSlugs()`: Get all project slugs
- `getProjectBySlug(slug)`: Get specific project data
- `getAllProjects()`: Get all projects with frontmatter
- `getProjectsByCategory(category)`: Filter projects by category
- `getFeaturedProjects()`: Get available/featured projects
- `getAllTechnologies()`: Get unique list of all technologies used
- `getProjectsByTech(tech)`: Filter projects by technology

### From `constants/projectDetails.ts`

- `featuredProjects`: Array of project frontmatter
- `devProjects`: Legacy format for backward compatibility
- `designProjectsData`: Design projects in new format
- `designProjects`: Design projects in legacy format
- `convertToLegacyProject()`: Convert new format to legacy
- `getProjectBySlug()`: Get project by slug
- `getProjectsByCategory()`: Filter by category
- `getAvailableProjects()`: Get available projects
- `getTechsUsed()`: Get all technologies used

## Benefits

1. **Better Content Management**: Each project has its own file with rich content
2. **SEO Optimization**: MDX supports better meta tags and structured data
3. **Maintainability**: Easier to update individual projects
4. **Flexibility**: Support for rich content including images, videos, and interactive components
5. **Backward Compatibility**: Legacy format still supported
6. **Type Safety**: Full TypeScript support with proper type definitions

## Migration Notes

The old array-based structure is still supported through compatibility functions. Existing components can continue to use the `devProjects` array, while new components can leverage the enhanced MDX-based structure.

## Next Steps

1. Install `gray-matter` for better frontmatter parsing: `npm install gray-matter`
2. Add MDX support if not already present: `npm install @next/mdx @mdx-js/loader`
3. Create dynamic project pages using the new structure
4. Add more rich content to existing project MDX files
5. Consider adding pagination and filtering capabilities

## Dependencies

Optional but recommended:
- `gray-matter`: For robust frontmatter parsing
- `@next/mdx`: For MDX support in Next.js
- `@mdx-js/loader`: MDX loader for webpack