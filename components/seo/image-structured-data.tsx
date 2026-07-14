import { NAME, ROLE, PORTFOLIO_URL } from "@/constants/site";

export function ProfileImagesSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": PORTFOLIO_URL,
          },
          about: {
            "@type": "Person",
            name: NAME,
            description:
              `${ROLE} specializing in TypeScript, React, Next.js, Node.js, and AWS.`,
          },
          associatedMedia: [
            {
              "@type": "ImageObject",
              contentUrl: `${PORTFOLIO_URL}/profile1.jpeg`,
              name: "Dev Harsh Agarwal - Full Stack Engineer Primary Profile",
              description:
                "Primary profile photo of Dev Harsh Agarwal, Full Stack Engineer",
              encodingFormat: "image/jpeg",
              width: "800",
              height: "800",
            },
            {
              "@type": "ImageObject",
              contentUrl: `${PORTFOLIO_URL}/profile.jpeg`,
              name: "Dev Harsh Agarwal - Full Stack Engineer Alternate Profile",
              description:
                "Secondary profile photo of Dev Harsh Agarwal, showcasing professional appearance",
              encodingFormat: "image/jpeg",
              width: "800",
              height: "800",
            },
          ],
        }),
      }}
    />
  );
}
