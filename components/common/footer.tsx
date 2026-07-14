"use client";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { NAME, GITHUB_URL, LINKEDIN_URL } from "@/constants/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-neutral-800 relative z-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-4 ">
          {/* Social Links */}
          <div className="flex space-x-6">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-blue-500 transition-colors"
            >
              {/* @ts-expect-error react-icons compatibility issue with React 19 types */}
              <FaGithub size={20} />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-blue-500 transition-colors"
            >
              {/* @ts-expect-error react-icons compatibility issue with React 19 types */}
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://twitter.com/Dev_Harsh01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-blue-500 transition-colors"
            >
              {/* @ts-expect-error react-icons compatibility issue with React 19 types */}
              <FaXTwitter size={20} />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-neutral-500 text-sm">
            <p>© {currentYear} {NAME}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
