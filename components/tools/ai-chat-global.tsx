"use client";

import { useState } from "react";
import AIChatModal from "./ai-chat-modal";

export function AIChatGlobal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* AI Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#e4ded7]/20 to-[#000] backdrop-blur-sm flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-12 border border-[#e4ded7]/30 group"
        aria-label="Open AI Chat"
      >
        <svg 
          className="w-7 h-7 text-white group-hover:scale-110 transition-transform"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
          />
        </svg>
      </button>

      {/* AI Chat Modal */}
      <AIChatModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
}

export default AIChatGlobal;
