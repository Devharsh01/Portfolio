"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { RiRobot2Line } from "react-icons/ri";
// import { IoClose } from "react-icons/io5";
import { Bot, X } from "lucide-react";

import {
  SkillsCard,
  ProjectsCard,
  ExperienceCard,
  ContactCard,
  LinkCard,
} from "./ai-chat-cards";
import AIChatAnimation from "../ui/ai-chat-animation";
import { clickbaitPrompts } from "@/constants/prompt-data";
import {
  ChatHeader,
  MessageDisplay,
  InputArea,
} from "./ai-chat/chat-components";
import {
  useMessageHandler,
  initializeChat,
  isTrustedClick,
} from "./ai-chat/chat-utils";
import { AIChatModalProps } from "./ai-chat/types";

interface StructuredContent {
  type: "skills" | "projects" | "experience" | "contact" | "links" | "general";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export function AIChatModal({ isOpen, onClose }: AIChatModalProps) {
  // Message handling
  const messageHandlers = useMessageHandler();
  const {
    messages,
    setMessages,
    isLoading,
    isSearching,
    error,
    setError,
    messagesEndRef,
    processMessage,
  } = messageHandlers;

  // UI State
  const [input, setInput] = useState("");
  const [showClickbait, setShowClickbait] = useState(true);
  const [clickbaitText, setClickbaitText] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [buttonPosition, setButtonPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // Refs
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatButtonRef = useRef<HTMLButtonElement>(null);
  const RobotIcon = Bot;
  const XIcon = X;

  // Select a random clickbait prompt on initial load
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * clickbaitPrompts.length);
    setClickbaitText(clickbaitPrompts[randomIndex]);

    // Check if user has interacted before
    const hasInteractedBefore = localStorage.getItem("hasInteractedWithAI");
    if (hasInteractedBefore === "true") {
      setShowClickbait(false);
      setHasInteracted(true);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      // Show animation first
      setShowAnimation(true);
      return () => clearTimeout(100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      // Hide clickbait when chat is opened
      setShowClickbait(false);

      // Mark that user has interacted
      setHasInteracted(true);
      localStorage.setItem("hasInteractedWithAI", "true");
    }
  }, [isOpen]);

  // Show a welcome message the first time the chat is opened in this session
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeChat(setMessages, setError);
    }
  }, [isOpen, messages.length, setMessages, setError]);

  // Function to clear chat and start new conversation
  const handleClearChat = () => {
    initializeChat(setMessages, setError);
    setInput("");
    setError("");
  };

  // Auto-dismiss clickbait after 8 seconds
  useEffect(() => {
    if (showClickbait && !hasInteracted) {
      const timer = setTimeout(() => {
        setShowClickbait(false);
      }, 8000); // 8 seconds

      return () => clearTimeout(timer);
    }
  }, [showClickbait, hasInteracted]);

  // Function to handle animation completion
  const handleAnimationComplete = () => {
    // Hide animation after it completes
    setTimeout(() => {
      setShowAnimation(false);
    }, 300);

    // Focus the input field
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
  };

  // Function to capture the button position
  const captureButtonPosition = () => {
    if (chatButtonRef.current) {
      const rect = chatButtonRef.current.getBoundingClientRect();
      setButtonPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
  };

  // Function to handle clickbait click
  const handleClickbaitClick = () => {
    captureButtonPosition();
    setShowClickbait(false);
    setHasInteracted(true);
    localStorage.setItem("hasInteractedWithAI", "true");
    // Additional open logic can be placed here
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      type: "user" as const,
      content: input.trim(),
      timestamp: new Date(),
    };

    const assistantMessage = {
      type: "assistant" as const,
      content: "...",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");

    try {
      // Process the message
      const response = await processMessage(userMessage.content);

      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1
            ? {
                ...msg,
                content: response.content,
                structuredContent: response.structuredContent,
              }
            : msg
        )
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1
            ? { ...msg, content: `Error: ${errorMessage}` }
            : msg
        )
      );
    }
  };

  // Function to check if a click event is trusted
  const handleButtonClick = (e: React.MouseEvent, callback: () => void) => {
    if (isTrustedClick(e)) {
      callback();
    } else {
      setError("Automated clicks are not allowed (Nice try kiddo)");
      console.warn("Detected programmatic click attempt");
    }
  };

  // Handle key press events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  // Render structured content based on type
  const renderStructuredContent = (content: StructuredContent) => {
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

  return (
    <>
      {/* Clickbait prompt */}
      <AnimatePresence>
        {showClickbait && !isOpen && !hasInteracted && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              delay: 1,
            }}
            className="fixed bottom-24 right-6 max-w-xs bg-[#0E1016]/95 backdrop-blur-md border border-[#e4ded7]/20 p-4 rounded-2xl shadow-2xl shadow-[#e4ded7]/10 z-40 cursor-pointer hover:border-[#e4ded7]/40 transition-all duration-300"
            onClick={handleClickbaitClick}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#e4ded7]/20 to-[#e4ded7]/10 border border-[#e4ded7]/30 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                >
                  <RobotIcon className="w-5 h-5 text-[#e4ded7]" />
                </motion.div>
              </div>
              <div className="flex-1">
                <motion.p
                  className="text-[#e4ded7] text-sm font-medium mb-2 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  {clickbaitText}
                </motion.p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 8,
                    ease: "linear",
                    repeat: 0,
                  }}
                  className="h-0.5 bg-gradient-to-r from-[#e4ded7]/60 to-[#e4ded7]/20 rounded-full"
                />
              </div>
            </div>
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 bg-[#0E1016] rounded-full flex items-center justify-center border border-[#e4ded7]/30 cursor-pointer hover:border-[#e4ded7]/60 transition-colors shadow-md"
              whileHover={{ scale: 1.15, rotate: 90 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              onClick={(e) => {
                e.stopPropagation();
                setShowClickbait(false);
              }}
            >
              <XIcon className="w-3 h-3 text-[#e4ded7]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* Show animation when opening */}
        {isOpen && showAnimation && (
          <AIChatAnimation
            onAnimationComplete={handleAnimationComplete}
            buttonPosition={buttonPosition}
          />
        )}

        {/* Show chat modal after animation */}
        {isOpen && !showAnimation && (
          <motion.div
            data-chat-modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E1016]/60 backdrop-blur-md"
            onClick={onClose}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl mx-4 sm:mx-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="bg-[#0E1016]/95 backdrop-blur-xl border border-[#e4ded7]/20 rounded-3xl overflow-hidden shadow-2xl shadow-[#e4ded7]/5">
                <ChatHeader onClose={onClose} onClearChat={handleClearChat} />

                <div className="h-[500px] flex flex-col">
                  <MessageDisplay
                    messages={messages}
                    isSearching={isSearching}
                    error={error}
                    renderStructuredContent={renderStructuredContent}
                  />

                  <div ref={messagesEndRef} />

                  <InputArea
                    input={input}
                    setInput={setInput}
                    isLoading={isLoading}
                    handleSubmit={(e) =>
                      handleButtonClick(e as unknown as React.MouseEvent, () =>
                        handleSubmit(e)
                      )
                    }
                    handleKeyDown={handleKeyDown}
                    inputRef={inputRef as React.RefObject<HTMLTextAreaElement>}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AIChatModal;
