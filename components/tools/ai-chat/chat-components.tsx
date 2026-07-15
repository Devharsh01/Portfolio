import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { RiRobot2Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import { CgSpinner } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import { predefinedPrompts } from "@/constants/prompt-data";
import {
  HeaderProps,
  MessageDisplayProps,
  InputAreaProps,
  Message,
  StructuredContent,
} from "./types";
import {
  SkillsCard,
  ProjectsCard,
  ExperienceCard,
  ContactCard,
  LinkCard,
} from "../ai-chat-cards";

// Glitch animation for cyberpunk effect
const glitchAnimation = {
  textShadow: [
    "0 0 0 #00ffff",
    "2px 2px 0 #ff00ff, -2px -2px 0 #00ffff, 2px 2px 0 #ff00ff",
    "0 0 0 #00ffff",
  ],
  opacity: [1, 0.8, 1],
  x: [0, -1, 1, 0],
};

const RobotIcon = RiRobot2Line as any;
const XIcon = IoClose as any;
const FiSearchIcon = FiSearch as any;
const IoSendIcon = IoSend as any;
const CgSpinnerIcon = CgSpinner as any;
const FaUserIcon = FaUser as any;

/**
 * Header component for the chat modal
 */
export const ChatHeader: React.FC<HeaderProps> = ({ onClose, onClearChat }) => {
  
  return (
    <div
      className="border-b border-[#e4ded7]/20 p-5 flex items-center justify-between bg-[#0E1016]/80 backdrop-blur-xl transition-all duration-300"
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e4ded7]/20 to-[#e4ded7]/10 border border-[#e4ded7]/30 flex items-center justify-center shadow-md transition-all duration-300">
          <RobotIcon className="w-5 h-5 text-[#e4ded7]" />
        </div>
        <div>
          <h3 className="font-semibold text-[#e4ded7] text-base">AI Assistant</h3>
          <p className="text-xs text-[#e4ded7]/60 mt-0.5">
            Powered by Mistral & Web Search
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClearChat();
          }}
          className="px-3 py-2 hover:bg-[#e4ded7]/10 rounded-xl transition-all duration-300 hover:scale-105 flex items-center space-x-1.5 group"
          title="Clear chat and start new conversation"
        >
          <svg
            className="w-4 h-4 text-[#e4ded7]/60 group-hover:text-[#e4ded7] transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {/* Chat bubble */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 5a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2H9l-5 5V5z"
            />

            {/* Plus sign (centered & visible) */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 7v4m-2-2h4"
            />
          </svg>

          <span className="text-xs text-[#e4ded7]/60 group-hover:text-[#e4ded7] font-medium transition-colors">
            New Chat
          </span>
        </button>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-[#e4ded7]/10 rounded-xl transition-all duration-300 hover:rotate-90 hover:scale-110"
        >
          <XIcon className="w-5 h-5 text-[#e4ded7]/60 hover:text-[#e4ded7]" />
        </button>
      </div>
    </div>
  );
};

/**
 * Component to render all messages in the chat
 */
export const MessageDisplay: React.FC<MessageDisplayProps> = ({
  messages,
  isSearching,
  error,
  renderStructuredContent,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#0E1016]/40">
      {/* Background subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e4ded7]/5 to-[#e4ded7]/2 filter blur-[100px] -z-10" />

      {error ? (
        <div
          className="bg-[#0E1016]/90 text-red-400 border border-red-500/30 rounded-xl p-4 text-sm backdrop-blur-sm"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(error),
          }}
        />
      ) : (
        messages.map((message, index) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            key={index}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            } group`}
          >
            {message.type === "assistant" && (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#e4ded7]/20 to-[#e4ded7]/10 border border-[#e4ded7]/30 flex items-center justify-center mr-2 shadow-md">
                <RobotIcon className="w-4 h-4 text-[#e4ded7]" />
              </div>
            )}
            <div
              className={`max-w-[85%] p-4 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                message.type === "user"
                  ? "bg-gradient-to-br from-[#e4ded7]/90 to-[#e4ded7]/70 text-[#0E1016] border border-[#e4ded7]/30"
                  : "bg-[#212531]/80 text-[#e4ded7] border border-[#e4ded7]/20 backdrop-blur-sm"
              }`}
            >
              {message.type === "assistant" &&
              index === messages.length - 1 &&
              message.content === "..." ? (
                isSearching ? (
                  <SearchingIndicator />
                ) : (
                  <ThinkingIndicator />
                )
              ) : (
                <MessageContent
                  message={message}
                  renderStructuredContent={renderStructuredContent}
                />
              )}
              <div
                className={`mt-2 text-[10px] ${
                  message.type === "user"
                    ? "text-[#0E1016]/60"
                    : "text-[#e4ded7]/40"
                }`}
              >
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
            {message.type === "user" && (
              <div className="w-8 h-8 rounded-xl bg-[#212531] border border-[#e4ded7]/30 flex items-center justify-center ml-2 shadow-md">
                <FaUserIcon className="w-4 h-4 text-[#e4ded7]/80" />
              </div>
            )}
          </motion.div>
        ))
      )}
    </div>
  );
};

/**
 * Message content component
 */
const MessageContent: React.FC<{
  message: Message;
  renderStructuredContent: (content: StructuredContent) => React.ReactNode;
}> = ({ message, renderStructuredContent }) => {
  // Don't show structured content for simple questions like "who made you"
  const isBasicQuestion =
    message.type === "assistant" &&
    message.content.toLowerCase().includes("dev harsh") &&
    (message.content.toLowerCase().includes("created") ||
      message.content.toLowerCase().includes("made") ||
      message.content.toLowerCase().includes("developer"));

  return (
    <>
      {/* Always show the text response */}
      {message.content.trim() && (
        <div
          className="prose prose-invert prose-xs max-w-none text-sm"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              marked.parse(message.content).toString()
            ),
          }}
        />
      )}

      {/* Add a small divider if we have both text and structured content */}
      {message.content.trim() &&
        message.structuredContent &&
        !isBasicQuestion && (
          <div className="my-2 border-t border-[#e4ded7]/20"></div>
        )}

      {/* Only render structured content if it's not a basic question about the creator */}
      {message.structuredContent &&
        !isBasicQuestion &&
        renderStructuredContent(message.structuredContent)}
    </>
  );
};

/**
 * Animated searching indicator
 */
const SearchingIndicator: React.FC = () => {
  return (
    <div className="flex flex-col items-center space-y-3 py-2">
      <div className="flex items-center space-x-2">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <FiSearchIcon className="w-5 h-5 text-[#e4ded7]/80" />
        </motion.div>
        <motion.div
          className="text-sm font-medium text-[#e4ded7]/90"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Searching the web...
        </motion.div>
      </div>
      <div className="relative w-40 h-1 bg-[#e4ded7]/10 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#e4ded7]/60 to-[#e4ded7]/30 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        />
      </div>
      <div className="flex space-x-3 mt-1">
        <motion.div
          className="w-2 h-2 bg-[#e4ded7]/60 rounded-full"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="w-2 h-2 bg-[#e4ded7]/70 rounded-full"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.15,
          }}
        />
        <motion.div
          className="w-2 h-2 bg-[#e4ded7]/80 rounded-full"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />
      </div>
    </div>
  );
};

/**
 * Animated thinking indicator
 */
const ThinkingIndicator: React.FC = () => {
  return (
    <div className="flex flex-col space-y-3 py-2">
      <div className="flex items-center space-x-1.5">
        <motion.div
          className="w-2.5 h-2.5 bg-[#e4ded7]/60 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            times: [0, 0.5, 1],
          }}
        />
        <motion.div
          className="w-2.5 h-2.5 bg-[#e4ded7]/70 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            delay: 0.2,
            times: [0, 0.5, 1],
          }}
        />
        <motion.div
          className="w-2.5 h-2.5 bg-[#e4ded7]/80 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            delay: 0.4,
            times: [0, 0.5, 1],
          }}
        />
      </div>
      <div className="text-xs text-[#e4ded7]/60 italic">Thinking...</div>
    </div>
  );
};

/**
 * Input area component with predefined prompts
 */
export const InputArea: React.FC<InputAreaProps> = ({
  input,
  setInput,
  isLoading,
  handleSubmit,
  handleKeyDown,
  inputRef
}) => {
  const promptScrollRef = useRef<HTMLDivElement>(null);
  const [activePromptCategory, setActivePromptCategory] = useState<
    "all" | "theme" | "info" | "contact"
  >("all");

  // Add state to track if prompt panel is expanded
  const [isPromptPanelExpanded, setIsPromptPanelExpanded] = useState(true);

  // Add state to track loading message timing
  const [showSecondaryLoadingMessage, setShowSecondaryLoadingMessage] =
    useState(false);

  // Effect to handle the loading message change timer
  React.useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (isLoading) {
      setShowSecondaryLoadingMessage(false);
      timerId = setTimeout(() => {
        setShowSecondaryLoadingMessage(true);
      }, 10000);
    } else {
      setShowSecondaryLoadingMessage(false);
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [isLoading]);

  // Function to toggle prompt panel
  const togglePromptPanel = () => {
    setIsPromptPanelExpanded((prev) => !prev);
  };

  // Function to handle predefined prompt selection
  const handlePromptSelect = (prefix: string, prompt: string) => {
    setInput(`${prefix} ${prompt}`.trim());
    // Collapse panel after selection
    setIsPromptPanelExpanded(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  // Add horizontal scroll with arrow buttons functionality
  const scrollPrompts = (direction: "left" | "right") => {
    if (promptScrollRef.current) {
      const scrollAmount = 200; // Adjust scroll amount as needed
      const currentScroll = promptScrollRef.current.scrollLeft;
      promptScrollRef.current.scrollTo({
        left:
          direction === "left"
            ? currentScroll - scrollAmount
            : currentScroll + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Get filtered prompts based on active category
  const filteredPrompts =
    activePromptCategory === "all"
      ? predefinedPrompts
      : predefinedPrompts.filter(
          (prompt) => prompt.category === activePromptCategory
        );

  return (
    <div className="border-t border-[#e4ded7]/20 p-5 bg-[#0E1016]/80 backdrop-blur-xl">      {/* Collapsible prompt suggestion panel */}
      <div className="relative mb-3">
        {/* Toggle button for prompt panel */}
        <button
          onClick={togglePromptPanel}
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10 px-4 py-1 rounded-full bg-[#212531]/90 border border-[#e4ded7]/30 shadow-lg text-[#e4ded7]/80 hover:text-[#e4ded7] hover:border-[#e4ded7]/50 transition-all duration-300 text-xs flex items-center gap-1.5 hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-3 w-3 transition-transform duration-300 ${
              isPromptPanelExpanded ? "rotate-360" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isPromptPanelExpanded ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"}
            />
          </svg>
        </button>

        {/* Animated collapsible panel */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isPromptPanelExpanded ? "auto" : 0,
            opacity: isPromptPanelExpanded ? 1 : 0,
            marginBottom: isPromptPanelExpanded ? 16 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="pt-5">
            {/* Prompt category selector tabs */}
            <div className="flex justify-center mb-2">
              <div className="inline-flex p-0.5 rounded-xl bg-[#212531]/40 backdrop-blur-sm border border-[#e4ded7]/20">
                <button
                  onClick={() => setActivePromptCategory("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                    activePromptCategory === "all"
                      ? "bg-[#e4ded7]/10 text-[#e4ded7] shadow-sm"
                      : "text-[#e4ded7]/60 hover:text-[#e4ded7]/80"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActivePromptCategory("info")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                    activePromptCategory === "info"
                      ? "bg-[#e4ded7]/10 text-[#e4ded7] shadow-sm"
                      : "text-[#e4ded7]/60 hover:text-[#e4ded7]/80"
                  }`}
                >
                  Info
                </button>
                <button
                  onClick={() => setActivePromptCategory("contact")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                    activePromptCategory === "contact"
                      ? "bg-[#e4ded7]/10 text-[#e4ded7] shadow-sm"
                      : "text-[#e4ded7]/60 hover:text-[#e4ded7]/80"
                  }`}
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Prompt suggestions */}
            <div className="relative">
              {/* Left scroll button */}
              <button
                onClick={() => scrollPrompts("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-[#212531]/90 border border-[#e4ded7]/20 rounded-full shadow-md text-[#e4ded7]/60 hover:text-[#e4ded7] hover:border-[#e4ded7]/40 transition-all duration-300 hover:scale-110"
                aria-label="Scroll left"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Predefined prompts scroll container */}
              <div
                ref={promptScrollRef}
                className="flex overflow-x-auto py-2 scrollbar-hide mask-fade-edges"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  paddingLeft: "1.5rem",
                  paddingRight: "1.5rem",
                }}
              >
                {filteredPrompts.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptSelect(item.prefix, item.prompt)}
                    className={`flex-shrink-0 inline-flex items-center px-4 py-2 mr-2 rounded-full text-sm border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-md ${
                      item.category === "info"
                        ? "bg-[#e4ded7]/5 text-[#e4ded7]/90 border-[#e4ded7]/30 hover:bg-[#e4ded7]/10 hover:border-[#e4ded7]/50"
                        : "bg-[#e4ded7]/5 text-[#e4ded7]/90 border-[#e4ded7]/30 hover:bg-[#e4ded7]/10 hover:border-[#e4ded7]/50"
                    }`}
                  >
                    <span className="mr-1.5">{item.icon}</span>
                    <span>{item.prompt}</span>
                  </button>
                ))}
              </div>

              {/* Right scroll button */}
              <button
                onClick={() => scrollPrompts("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-[#212531]/90 border border-[#e4ded7]/20 rounded-full shadow-md text-[#e4ded7]/60 hover:text-[#e4ded7] hover:border-[#e4ded7]/40 transition-all duration-300 hover:scale-110"
                aria-label="Scroll right"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Gradient masks for fade effect */}
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0E1016]/90 to-transparent pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0E1016]/90 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </motion.div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative w-full">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message or click Suggestions above"
            className="flex-1 w-full bg-[#212531]/60 text-sm text-[#e4ded7] placeholder-[#e4ded7]/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e4ded7]/30 border border-[#e4ded7]/20 resize-none backdrop-blur-sm transition-all duration-300 hover:border-[#e4ded7]/30"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className={`relative px-5 py-3 rounded-xl transition-all duration-300 flex items-center justify-center overflow-hidden ${
            isLoading || !input.trim()
              ? "bg-[#212531]/50 text-[#e4ded7]/30 cursor-not-allowed border border-[#e4ded7]/10"
              : "bg-[#212531]/80 border border-[#e4ded7]/30 text-[#e4ded7] hover:border-[#e4ded7]/60 hover:shadow-lg hover:shadow-[#e4ded7]/20 hover:scale-105 active:scale-95"
          }`}
        >
          {!(isLoading || !input.trim()) && (
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-[#e4ded7]/5 via-[#e4ded7]/10 to-[#e4ded7]/5 opacity-50" />
            </div>
          )}

          <div className="relative z-10">
            {isLoading ? (
              <CgSpinnerIcon className="animate-spin h-5 w-5" />
            ) : (
              <IoSendIcon className="w-5 h-5" />
            )}
          </div>
        </button>
      </form>
    </div>
  );
};

/**
 * Function to render structured content
 */
export const renderStructuredContent = (content: StructuredContent) => {
  switch (content.type) {
    case "skills":
      return <SkillsCard skills={content.data} />;
    case "projects":
      return <ProjectsCard projects={content.data} />;
    case "experience":
      return <ExperienceCard experiences={content.data} />;
    case "contact":
      return <ContactCard contact={content.data} />;
    case "links":
      return <LinkCard links={content.data} />;
    default:
      return null;
  }
};
