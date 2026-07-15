import React from "react";
import {
  FaLink,
  FaExternalLinkAlt,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaMedium,
  FaFileAlt,
  FaGlobe,
  FaCode,
  FaEnvelope,
} from "react-icons/fa";
import { SiDevdotto } from "react-icons/si";
import { PORTFOLIO_URL } from "@/constants/site";

// Hostname of the portfolio, derived from the single source of truth
const PORTFOLIO_HOST = (() => {
  try {
    return new URL(PORTFOLIO_URL).hostname;
  } catch {
    return PORTFOLIO_URL;
  }
})();

export interface Link {
  title: string;
  url: string;
  description?: string;
  icon?: string; // Optional icon identifier
}

interface LinkCardProps {
  links: Link[];
}

const LinkIcon = FaLink as any;
const ExternalLinkIcon = FaExternalLinkAlt as any;
const GithubIcon = FaGithub as any;
const LinkedinIcon = FaLinkedin as any;
const TwitterIcon = FaTwitter as any;
const YoutubeIcon = FaYoutube as any;
const MediumIcon = FaMedium as any;
const FileAltIcon = FaFileAlt as any;
const GlobeIcon = FaGlobe as any;
const CodeIcon = FaCode as any;
const EnvelopeIcon = FaEnvelope as any;
const DevdottoIcon = SiDevdotto as any;

export const LinkCard: React.FC<LinkCardProps> = ({ links }) => {
  // Function to safely extract domain from URL
  const extractDomain = (url: string): string => {
    try {
      // Add protocol if missing
      const urlWithProtocol = url.startsWith("http") ? url : `https://${url}`;
      return new URL(urlWithProtocol).hostname;
    } catch (error) {
      // If URL parsing fails, just return the original URL
      console.error("Error parsing URL:", url, error);
      return url;
    }
  };

  // Function to determine icon based on URL or specified icon
  const getIconForLink = (link: Link) => {
    // If an icon is specified, use it
    if (link.icon) {
      return link.icon;
    }

    // Otherwise determine icon based on URL
    const url = link.url.toLowerCase();

    // Direct string matching for common patterns
    if (url.includes("github.com")) return "github";
    if (url.includes("linkedin.com")) return "linkedin";
    if (url.includes("twitter.com") || url.includes("x.com")) return "twitter";
    if (url.includes("youtube.com")) return "youtube";
    if (url.includes("medium.com")) return "medium";
    if (url.includes("dev.to")) return "dev";
    if (url.includes("resume")) return "resume";
    if (url.includes("mailto:")) return "email";
    if (url.includes("ethglobal.com") || url.includes("dorahacks.io"))
      return "hackathon";
    if (url.includes("npmjs.com")) return "npm";

    // Try to extract domain for domain-specific checks
    try {
      const domain = extractDomain(url);
      if (domain.includes(PORTFOLIO_HOST)) return "portfolio";
    } catch (error) {
      // If domain extraction fails, continue with other checks
      console.error("Error extracting domain:", error);
    }

    // Default icon
    return "link";
  };

  // Render the appropriate icon component
  const renderIcon = (iconType: string) => {
    const iconClass = "text-[#e4ded7]/60 w-5 h-5";
    switch (iconType) {
      case "github":
        return <GithubIcon className={iconClass} />;
      case "linkedin":
        return <LinkedinIcon className={iconClass} />;
      case "twitter":
        return <TwitterIcon className={iconClass} />;
      case "youtube":
        return <YoutubeIcon className={iconClass} />;
      case "medium":
        return <MediumIcon className={iconClass} />;
      case "dev":
        return <DevdottoIcon className={iconClass} />;
      case "resume":
        return <FileAltIcon className={iconClass} />;
      case "portfolio":
        return <GlobeIcon className={iconClass} />;
      case "hackathon":
        return <CodeIcon className={iconClass} />;
      case "npm":
        return <span className="text-[#e4ded7]/60 font-semibold text-sm">NPM</span>;
      case "email":
        return <EnvelopeIcon className={iconClass} />;
      default:
        return <LinkIcon className={iconClass} />;
    }
  };

  // Function to ensure URL has a protocol
  const ensureProtocol = (url: string): string => {
    if (
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("mailto:")
    ) {
      return url;
    }
    return `https://${url}`;
  };

  // Group links by category for better organization
  const groupLinksByCategory = () => {
    const groups: Record<string, Link[]> = {
      Profile: [],
      Projects: [],
      Social: [],
      Other: [],
    };

    links.forEach((link) => {
      const url = link.url.toLowerCase();
      if (
        url.includes("github.com") ||
        url.includes("linkedin.com") ||
        url.includes("resume") ||
        url.includes(PORTFOLIO_HOST)
      ) {
        groups["Profile"].push(link);
      } else if (
        url.includes("ethglobal.com") ||
        url.includes("dorahacks.io") ||
        url.includes("npmjs.com")
      ) {
        groups["Projects"].push(link);
      } else if (
        url.includes("twitter.com") ||
        url.includes("medium.com") ||
        url.includes("dev.to") ||
        url.includes("youtube.com")
      ) {
        groups["Social"].push(link);
      } else {
        groups["Other"].push(link);
      }
    });

    // Filter out empty categories
    return Object.entries(groups).filter(([_, linksArray]) => linksArray.length > 0);
  };

  const groupedLinks = groupLinksByCategory();

  return (
    <div className="mt-3 space-y-4">
      <div className="bg-[#212531]/60 backdrop-blur-sm rounded-xl p-5 border border-[#e4ded7]/20 shadow-md hover:shadow-lg hover:shadow-[#e4ded7]/10 transition-all duration-300">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-[#e4ded7]/10">
            <LinkIcon className="text-[#e4ded7]/80 w-5 h-5" />
          </div>
          <h3 className="font-semibold text-[#e4ded7]">Links & Resources</h3>
        </div>

        <div className="space-y-5">
          {groupedLinks.map(([category, categoryLinks]) => (
            <div key={category} className="space-y-3">
              {groupedLinks.length > 1 && (
                <h4 className="text-sm font-medium text-[#e4ded7]/60 border-b border-[#e4ded7]/10 pb-2">
                  {category}
                </h4>
              )}

              {categoryLinks.map((link, index) => (
                <div key={index} className="group">
                  <a
                    href={ensureProtocol(link.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="bg-[#e4ded7]/5 hover:bg-[#e4ded7]/10 rounded-lg p-3.5 transition-all duration-300 border border-[#e4ded7]/10 hover:border-[#e4ded7]/30 hover:shadow-md hover:scale-[1.02]">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          {renderIcon(getIconForLink(link))}
                          <span className="font-medium text-[#e4ded7]/90 group-hover:text-[#e4ded7] transition-colors">
                            {link.title}
                          </span>
                        </div>
                        <ExternalLinkIcon className="text-[#e4ded7]/40 group-hover:text-[#e4ded7]/80 transition-all duration-300 group-hover:translate-x-1 w-4 h-4" />
                      </div>

                      {link.description && (
                        <p className="mt-2 text-sm text-[#e4ded7]/70 leading-relaxed">
                          {link.description}
                        </p>
                      )}
                    </div>
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
