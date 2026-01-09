/* eslint-disable */
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRef } from 'react';
import {
  CheckCircle,
  XCircle,
} from "lucide-react";
import EmailForm from "./EmailForm";
import ReactMarkdown from "react-markdown";
import { monaSans } from "../fonts/monaSans";
import "../animations/animate.css";
import AnimatedBody from "../animations/AnimatedBody";
import AnimatedTitle from "../animations/AnimatedTitle";
import AnimatedWords2 from "../animations/AnimatedWords2";
import Link from "next/link";
import Alert from "@/components/ui/alert";

// Add this interface after the imports and before the component
interface EmailMessage {
  id: string;
  content: string;
  subject: string;
  senderName?: string;
  senderEmail?: string;
  timestamp: number;
  mode: "manual" | "ai";
}

// Custom CSS for scrollbar and other UI elements
const customStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(228, 222, 215, 0.05);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(228, 222, 215, 0.15);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(228, 222, 215, 0.25);
  }
`;

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [islandExpanded, setIslandExpanded] = useState(false);
  const [shouldHideNavbar, setShouldHideNavbar] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [newEmail, setNewEmail] = useState<EmailMessage | undefined>(undefined);
  const [messageCount, setMessageCount] = useState(0);
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (status === "error" || status === "success") {
      setShouldHideNavbar(true);
      setIslandExpanded(true);

      timer = setTimeout(() => {
        setIslandExpanded(false);

        setTimeout(() => {
          setStatus("idle");
          setErrorMessage("");
          setShouldHideNavbar(false);
        }, 500);
      }, 3000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [status]);

  useEffect(() => {
    const event = new CustomEvent("toggleNavbar", {
      detail: { visible: !shouldHideNavbar },
    });
    window.dispatchEvent(event);
  }, [shouldHideNavbar]);

  // Handler for when an email is sent from the EmailForm component
  const handleEmailSent = (email: EmailMessage) => {
    setNewEmail(email);
    setStatus("success");
  };

  const handleMessageCountChange = (count: number) => {
    setMessageCount(count);
  };

  return (
    <>
      <style jsx global>{customStyles}</style>
      <motion.section
      className="relative z-10 flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0E1016] bg-cover bg-center py-4 sm:py-8 md:py-12 lg:py-16"
      id="contact"
      initial="initial"
      animate="animate"
    >
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#e4ded7]/8 via-transparent to-[#e4ded7]/8"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(228,222,215,0.02),transparent_50%)]"></div>
      </div>

      {/* Main Content */}
      <div
        className={`w-full transition-all duration-700 ease-in-out`}
      >
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className={`flex flex-col items-center justify-center ${monaSans.className} relative w-full`}>
            <AnimatedWords2
              title={"Let's Talk"}
              style={
                "flex flex-col sm:flex-row items-center text-center text-[130px] font-extrabold uppercase leading-[0.85em] text-[#e4ded7] sm:text-[160px] md:text-[200px] lg:text-[260px] xl:text-[360px] 2xl:text-[480px]"
              }
            />
          </div>

          
          {isContactFormVisible && (
            <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12">
              <EmailForm 
                onEmailSent={handleEmailSent}
                onMessageCountChange={handleMessageCountChange}
              />
            </div>
          )}
            
          {/* Contact Info and Links Section */}
          {/* <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 flex flex-col sm:flex-row items-center space-y-8 sm:space-y-12 justify-center"> */}
          <div className="mt-8 sm:mt-12 md:mt-14 lg:mt-16 flex flex-col md:flex-row items-center gap-8 md:gap-16 lg:gap-24 justify-center">
            
            {/*Contact Info */}
            <div>
              {/* Contact Description */}
              <div className="text-center ">
                <AnimatedBody
                  text={
                    "Got a question, proposal, project, or want to work together on something?"
                  }
                  className={
                    "text-sm sm:text-base md:text-lg font-semibold uppercase text-[#e4ded7] leading-relaxed tracking-wide"
                  }
                />
              </div>

              {/* Contact Links */}
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center pt-4 sm:gap-8 text-sm sm:text-base font-semibold uppercase text-[#e4ded7]">
                <button
                  onClick={() => setIsContactFormVisible(!isContactFormVisible)}
                  aria-label="Send me an email"
                  className="underline uppercase underline-offset-4 hover:no-underline transition-all duration-300 hover:text-[#e4ded7]/80"
                >
                  <AnimatedBody
                    text={"Send me an email"}
                    className={""}
                  />
                </button>
                <AnimatedBody
                  text={"or"}
                  className={"text-[#e4ded7]/60"}
                />
                <Link
                  href="https://wa.me/919456658136"
                  target="_blank"
                  aria-label="Book a call"
                  className="underline underline-offset-4 hover:no-underline transition-all duration-300 hover:text-[#e4ded7]/80"
                >
                  <AnimatedBody
                    text={"Connect on call"}
                    className={""}
                  />
                </Link>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#e4ded7]">
              <Link
                href="https://github.com/Devharsh01"
                target="_blank"
                aria-label="View GitHub Profile"
                className="hover:text-[#e4ded7]/70 transition-all duration-300 transform hover:scale-110"
              >
                <AnimatedTitle
                  text={"GH"}
                  className={
                    "text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#e4ded7]"
                  }
                  wordSpace={"mr-[0.25em]"}
                  charSpace={"mr-[0.01em]"}
                />
              </Link>
              <Link
                href="https://www.linkedin.com/in/dev-harsh-agarwal-31351724a/"
                target="_blank"
                aria-label="View LinkedIn Profile"
                className="hover:text-[#e4ded7]/70 transition-all duration-300 transform hover:scale-110"
              >
                <AnimatedTitle
                  text={"LN"}
                  className={
                    "text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#e4ded7]"
                  }
                  wordSpace={"mr-[0.25em]"}
                  charSpace={"mr-[0.01em]"}
                />
              </Link>
              <Link
                href="https://leetcode.com/u/Dev_Harsh01/"
                target="_blank"
                aria-label="View LeetCode Profile"
                className="hover:text-[#e4ded7]/70 transition-all duration-300 transform hover:scale-110"
              >
                <AnimatedTitle
                  text={"LT"}
                  className={
                    "text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#e4ded7]"
                  }
                  wordSpace={"mr-[0.25em]"}
                  charSpace={"mr-[0.01em]"}
                />
              </Link>
              {/* <Link
                href="https://www.instagram.com/victorwill__/"
                target="_blank"
                aria-label="View Instagram Profile"
                className="hover:text-[#e4ded7]/70 transition-all duration-300 transform hover:scale-110"
              >
                <AnimatedTitle
                  text={"IG"}
                  className={
                    "text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#e4ded7]"
                  }
                  wordSpace={"mr-[0.25em]"}
                  charSpace={"mr-[0.01em]"}
                />
              </Link>
              <Link
                href="https://blog.victorwilliams.me/"
                target="_blank"
                aria-label="View Hashnode Profile"
                className="hover:text-[#e4ded7]/70 transition-all duration-300 transform hover:scale-110"
              >
                <AnimatedTitle
                  text={"HN"}
                  className={
                    "text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#e4ded7]"
                  }
                  wordSpace={"mr-[0.25em]"}
                  charSpace={"mr-[0.01em]"}
                />
              </Link> */}
            </div>
            
          </div>
        </div>
      </div>
    </motion.section>
    </>
  );
}