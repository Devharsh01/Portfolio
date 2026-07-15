// Mapping between project names and MDX file names
export const projectSlugMapping: Record<string, string> = {
  'fashion-cave': 'fashion-cave',
  'rendition': 'rendition',
  'patient-ms': 'patient-management-system',
  'exec-os': 'exec-os'
};

// Function to get MDX filename from project slug
export function getMDXFilename(slug: string): string {
  return projectSlugMapping[slug.toLowerCase()] || slug;
}

// Function to create slug from project name
export function createSlug(projectName: string): string {
  return projectName.toLowerCase().replace(/\s+/g, '-');
}