import { NAME, ROLE, PORTFOLIO_URL, GITHUB_URL, LINKEDIN_URL, LEETCODE_URL } from "@/constants/site";

export function PersonSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: NAME,
          url: PORTFOLIO_URL,
          sameAs: [GITHUB_URL, LINKEDIN_URL, LEETCODE_URL],
          jobTitle: ROLE,
          knowsAbout: ["Web Development", "Cloud", "TypeScript", "React", "Next.js", "AWS"],
          image: "/profile1.jpeg",
          description: "Full Stack Engineer specializing in TypeScript, React, Next.js, Node.js, and AWS."
        })
      }}
    />
  );
}
