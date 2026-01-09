import React from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

export interface Contact {
  email: string;
  linkedin?: string;
  github?: string;
  phone?: string;
}

interface ContactCardProps {
  contact: Contact;
}

const EnvelopeIcon = FaEnvelope as any;
const LinkedinIcon = FaLinkedin as any;
const GithubIcon = FaGithub as any;

export const ContactCard: React.FC<ContactCardProps> = ({ contact }) => (
  <div className="mt-3 bg-[#212531]/60 backdrop-blur-sm rounded-xl p-5 border border-[#e4ded7]/20 shadow-md hover:shadow-lg hover:shadow-[#e4ded7]/10 transition-all duration-300">
    <div className="flex items-center gap-2 mb-4">
      <div className="p-2 rounded-lg bg-[#e4ded7]/10">
        <EnvelopeIcon className="text-[#e4ded7]/80 w-5 h-5" />
      </div>
      <h3 className="font-semibold text-[#e4ded7]">Contact Information</h3>
    </div>
    <div className="space-y-3">
      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-[#e4ded7]/5 hover:bg-[#e4ded7]/10 transition-colors duration-300">
        <EnvelopeIcon className="text-[#e4ded7]/60 w-4 h-4" />
        <a
          href={`mailto:${contact.email}`}
          className="text-[#e4ded7]/90 hover:text-[#e4ded7] hover:underline transition-colors duration-300"
        >
          {contact.email}
        </a>
      </div>
      {contact.linkedin && (
        <div className="flex items-center gap-3 p-2.5 rounded-lg bg-[#e4ded7]/5 hover:bg-[#e4ded7]/10 transition-colors duration-300">
          <LinkedinIcon className="text-[#e4ded7]/60 w-4 h-4" />
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e4ded7]/90 hover:text-[#e4ded7] hover:underline transition-colors duration-300"
          >
            LinkedIn Profile
          </a>
        </div>
      )}
      {contact.github && (
        <div className="flex items-center gap-3 p-2.5 rounded-lg bg-[#e4ded7]/5 hover:bg-[#e4ded7]/10 transition-colors duration-300">
          <GithubIcon className="text-[#e4ded7]/60 w-4 h-4" />
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e4ded7]/90 hover:text-[#e4ded7] hover:underline transition-colors duration-300"
          >
            GitHub Profile
          </a>
        </div>
      )}
      {contact.phone && (
        <div className="flex items-center gap-3 p-2.5 rounded-lg bg-[#e4ded7]/5">
          <span className="text-[#e4ded7]/60">📱</span>
          <span className="text-[#e4ded7]/80">{contact.phone}</span>
        </div>
      )}
    </div>
  </div>
);

export default ContactCard;
