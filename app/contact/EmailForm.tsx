"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Sparkles,
  Mail,
  FileText,
  LayoutTemplate,
  User,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { emailTemplates } from "@/components/tools/emailTemplates";
import { TextGenerationEffect } from "@/components/ui/TextGenerationEffect";
import Alert from "@/components/ui/alert";

// Add interface for EmailMessage
interface EmailMessage {
  id: string;
  content: string;
  subject: string;
  senderName?: string;
  senderEmail?: string;
  timestamp: number;
  mode: "manual" | "ai";
}

// Props interface for EmailForm component
interface EmailFormProps {
  onEmailSent: (email: EmailMessage) => void;
  onMessageCountChange: (count: number) => void;
}

export default function EmailForm({ onEmailSent, onMessageCountChange }: EmailFormProps) {
  const [mode, setMode] = useState<"manual" | "ai">("ai");
  const [prompt, setPrompt] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [isTextAnimating, setIsTextAnimating] = useState(false);
  
  // Multi-step form state
  const [currentStep, setCurrentStep] = useState<"details" | "compose">("details");
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Alert states
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  // Reset status when user starts typing
  const resetStatus = () => {
    if (status !== "idle") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleButtonClick = (e: React.MouseEvent, callback: () => void) => {
    if (e.isTrusted) {
      callback();
    } else {
      setAlertTitle("Security Warning");
      setAlertMessage("Automated clicks are not allowed (Nice try kiddo)");
      setShowErrorAlert(true);
      setStatus("error");
      setErrorMessage("Automated clicks are not allowed(Nice try kiddo)");
      console.warn("Detected programmatic click attempt");
    }
  };

  const handleGenerateEmail = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setEmailContent("");
    setIsTextAnimating(false);

    try {
      const response = await fetch("/api/generate-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        if (response.status === 504) {
          throw new Error(
            "The request timed out. Please try again with a simpler prompt or try later."
          );
        }
        throw new Error("Failed to generate email");
      }

      const { generatedContent } = await response.json();
      setEmailContent(generatedContent);
      setIsTextAnimating(true);
    } catch (error) {
      console.error("Error generating email:", error);
      
      // Show error alert for generation failure
      setAlertTitle("Generation Failed");
      setAlertMessage(
        error instanceof Error ? error.message : "Failed to generate email. Please try again."
      );
      setShowErrorAlert(true);
      
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to generate email"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isDetailsStepValid = (): boolean => {
    return (
      senderName.trim() !== "" &&
      senderEmail.trim() !== "" &&
      validateEmail(senderEmail) &&
      subject.trim() !== ""
    );
  };

  const isFormValid = (): boolean => {
    return (
      senderName.trim() !== "" &&
      senderEmail.trim() !== "" &&
      validateEmail(senderEmail) &&
      subject.trim() !== "" &&
      emailContent.trim() !== ""
    );
  };

  const handleNextStep = () => {
    if (!senderName.trim()) {
      setAlertTitle("Validation Error");
      setAlertMessage("Please enter your name");
      setShowErrorAlert(true);
      return;
    }
    if (!senderEmail.trim()) {
      setAlertTitle("Validation Error");
      setAlertMessage("Please enter your email");
      setShowErrorAlert(true);
      return;
    }
    if (!validateEmail(senderEmail)) {
      setAlertTitle("Invalid Email");
      setAlertMessage("Please enter a valid email address");
      setShowErrorAlert(true);
      return;
    }
    if (!subject.trim()) {
      setAlertTitle("Validation Error");
      setAlertMessage("Please enter a subject");
      setShowErrorAlert(true);
      return;
    }
    
    // Clear any previous alerts
    setShowErrorAlert(false);
    setShowSuccessAlert(false);
    setCurrentStep("compose");
  };

  const handleBackStep = () => {
    setCurrentStep("details");
    // Reset any status when going back, but preserve form data
    setStatus("idle");
    setErrorMessage("");
    setShowErrorAlert(false);
    setShowSuccessAlert(false);
  };

  const getMissingFields = (): string[] => {
    const missing: string[] = [];
    if (!senderName.trim()) missing.push("Name");
    if (!senderEmail.trim()) missing.push("Email");
    else if (!validateEmail(senderEmail)) missing.push("Valid Email");
    if (!subject.trim()) missing.push("Subject");
    return missing;
  };

  const extractEmailFromContent = (content: string): string | null => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const matches = content.match(emailRegex);
    return matches ? matches[0] : null;
  };

  const handleSendEmail = async () => {
    if (!emailContent || isSending) return;

    // Validation for all required fields (both AI and manual modes)
    if (!senderName.trim()) {
      setAlertTitle("Validation Error");
      setAlertMessage("Please enter your name");
      setShowErrorAlert(true);
      return;
    }
    if (!senderEmail.trim()) {
      setAlertTitle("Validation Error");
      setAlertMessage("Please enter your email");
      setShowErrorAlert(true);
      return;
    }
    if (!validateEmail(senderEmail)) {
      setAlertTitle("Invalid Email");
      setAlertMessage("Please enter a valid email address");
      setShowErrorAlert(true);
      return;
    }
    if (!subject.trim()) {
      setAlertTitle("Validation Error");
      setAlertMessage("Please enter a subject");
      setShowErrorAlert(true);
      return;
    }
    if (!emailContent.trim()) {
      setAlertTitle("Validation Error");
      setAlertMessage("Please enter email content");
      setShowErrorAlert(true);
      return;
    }

    setIsSending(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: emailContent,
          prompt: mode === "ai" ? prompt : "Manual Email",
          senderName: senderName,
          senderEmail: senderEmail,
          subject: subject,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      const newEmailMessage: EmailMessage = {
        id: Date.now().toString(),
        content: emailContent,
        subject: subject || "No Subject",
        senderName: senderName,
        senderEmail: senderEmail,
        timestamp: Date.now(),
        mode: mode,
      };
      
      onEmailSent(newEmailMessage);
      
      // Show success alert
      setAlertTitle("Email Sent!");
      setAlertMessage("Your message has been sent successfully. I'll get back to you soon!");
      setShowSuccessAlert(true);
      
      // Clear form
      setPrompt("");
      setEmailContent("");
      setSenderName("");
      setSenderEmail("");
      setSubject("");
      setStatus("success");
    } catch (error) {
      console.error("Error sending email:", error);
      
      // Show error alert
      setAlertTitle("Send Failed");
      setAlertMessage(
        error instanceof Error ? error.message : "Failed to send email. Please try again."
      );
      setShowErrorAlert(true);
      
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send email"
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleSelectTemplate = (index: number) => {
    setSelectedTemplate(index);
    setPrompt(emailTemplates[index].prompt);
    setShowTemplates(false);
  };

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

  return (
    <>
      <style jsx global>{customStyles}</style>
      <div className="w-full max-w-7xl mx-auto space-y-8">
        
        <AnimatePresence mode="wait">
          {/* Step 1: User Details */}
          {currentStep === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1 }}
              className="relative p-6 sm:p-7 md:p-8 rounded-2xl bg-[#0E1016]/60 backdrop-blur-sm border-2 border-[#e4ded7]/20 shadow-2xl transition-all duration-300 hover:border-[#e4ded7]/30 hover:shadow-3xl"
            >
              {/* Next Button - Top Right */}
              <div className="absolute top-6 right-6 z-10">
                <div 
                  className="relative"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <button
                    onClick={handleNextStep}
                    disabled={!isDetailsStepValid()}
                    className={`px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl text-sm font-bold uppercase tracking-wide transition-all duration-300 flex items-center gap-2 ${
                      isDetailsStepValid()
                        ? "bg-[#e4ded7] text-[#0E1016] border-2 border-[#e4ded7] shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                        : "bg-[#e4ded7]/20 text-[#e4ded7]/40 cursor-not-allowed border-2 border-[#e4ded7]/10"
                    }`}
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  
                  {/* Tooltip for missing fields */}
                  <AnimatePresence>
                    {showTooltip && !isDetailsStepValid() && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 px-4 py-3 bg-[#0E1016]/95 backdrop-blur-sm border-2 border-[#e4ded7]/30 rounded-xl shadow-xl min-w-[200px] max-w-[250px] z-20 sm:right-0 right-[-50px]"
                      >
                        <div className="text-xs text-[#e4ded7]/80 font-semibold uppercase tracking-wide mb-2">
                          Missing Fields:
                        </div>
                        <div className="text-xs text-[#e4ded7]/60 space-y-1">
                          {getMissingFields().map((field, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#e4ded7]/40"></div>
                              <span>{field}</span>
                            </div>
                          ))}
                        </div>
                        {/* Arrow pointing up */}
                        <div className="absolute -top-2 right-4 sm:right-4 right-16 w-4 h-4 bg-[#0E1016]/95 border-l-2 border-t-2 border-[#e4ded7]/30 transform rotate-45"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            <div className="pt-12">
              <h2 className="text-lg sm:text-xl font-bold uppercase text-[#e4ded7] flex items-center gap-3 mb-6 sm:mb-7 tracking-wide">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-[#e4ded7]/80" />
                Your Details
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="">
                  <label
                    htmlFor="sender-name"
                    className="block text-sm font-bold uppercase text-[#e4ded7]/80 mb-3 flex items-center gap-2 tracking-wide"
                  >
                    <User className="w-4 h-4 text-[#e4ded7]/60" />
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="sender-name"
                    value={senderName}
                    onChange={(e) => {
                      setSenderName(e.target.value);
                      resetStatus();
                    }}
                    className="w-full bg-[#0E1016]/40 border-2 border-[#e4ded7]/20 rounded-xl px-4 py-3.5 text-sm text-[#e4ded7] placeholder-[#e4ded7]/50 focus:ring-2 focus:ring-[#e4ded7]/20 focus:border-[#e4ded7]/50 transition-all duration-300 font-medium"
                    placeholder="Your Name"
                  />
                </div>
                
                <div className="">
                  <label
                    htmlFor="sender-email"
                    className="block text-sm font-bold uppercase text-[#e4ded7]/80 mb-3 flex items-center gap-2 tracking-wide"
                  >
                    <Mail className="w-4 h-4 text-[#e4ded7]/60" />
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="sender-email"
                    value={senderEmail}
                    onChange={(e) => {
                      setSenderEmail(e.target.value);
                      resetStatus();
                    }}
                    className="w-full bg-[#0E1016]/40 border-2 border-[#e4ded7]/20 rounded-xl px-4 py-3.5 text-sm text-[#e4ded7] placeholder-[#e4ded7]/50 focus:ring-2 focus:ring-[#e4ded7]/20 focus:border-[#e4ded7]/50 transition-all duration-300 font-medium"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label
                  htmlFor="email-subject"
                  className="block text-sm font-bold uppercase text-[#e4ded7]/80 mb-3 flex items-center gap-2 tracking-wide"
                >
                  <MessageSquare className="w-4 h-4 text-[#e4ded7]/60" />
                  Subject *
                </label>
                <input
                  type="text"
                  id="email-subject"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    resetStatus();
                  }}
                  className="w-full bg-[#0E1016]/40 border-2 border-[#e4ded7]/20 rounded-xl px-4 py-3.5 text-sm text-[#e4ded7] placeholder-[#e4ded7]/50 focus:ring-2 focus:ring-[#e4ded7]/20 focus:border-[#e4ded7]/50 transition-all duration-300 font-medium"
                  placeholder="Email Subject"
                />
              </div>
            </div>
            </motion.div>
          )}

          {/* Step 2: Compose Email */}
          {currentStep === "compose" && (
            <motion.div
              key="compose"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1 }}
              className="relative space-y-6"
            >
            {/* User Details Summary with Back Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 sm:p-5 rounded-xl bg-[#0E1016]/40 border border-[#e4ded7]/20"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#e4ded7]/80">
                  <span className="font-semibold">From:</span>
                  <span>{senderName} ({senderEmail})</span>
                  <span className="text-[#e4ded7]/40">|</span>
                  <span className="font-semibold">Subject:</span>
                  <span>{subject}</span>
                </div>
                <button
                  onClick={handleBackStep}
                  className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-all duration-300 flex items-center gap-2 bg-[#0E1016]/80 text-[#e4ded7] border-2 border-[#e4ded7]/30 hover:border-[#e4ded7]/50 hover:bg-[#e4ded7]/5 hover:scale-[1.02] active:scale-[0.98] self-start sm:self-center"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Details</span>
                </button>
              </div>
            </motion.div>

            {/* Single Main Dialog Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative p-4 sm:p-5 md:p-6 rounded-2xl bg-[#0E1016]/60 backdrop-blur-sm border-2 border-[#e4ded7]/20 shadow-2xl transition-all duration-300 hover:border-[#e4ded7]/30 hover:shadow-3xl min-h-[350px]"
            >
              {/* Mode Selector - Top Left */}
              <div className="absolute top-6 left-6 z-10">
                <div className="inline-flex p-1.5 space-x-1.5 bg-[#0E1016]/80 backdrop-blur-lg rounded-xl border-2 border-[#e4ded7]/20 shadow-lg">
                  {["ai", "manual"].map((m) => (
                    <motion.button
                      key={m}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setMode(m as "ai" | "manual");
                        setShowTemplates(false);
                        if (m === "ai" && emailContent) {
                          // Clear email content when switching to AI mode if there's generated content
                          setEmailContent("");
                        }
                      }}
                      className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-300 flex items-center gap-2 ${
                        mode === m
                          ? "bg-[#e4ded7] text-[#0E1016] shadow-md"
                          : "text-[#e4ded7]/70 hover:text-[#e4ded7] hover:bg-[#e4ded7]/5"
                      }`}
                    >
                      {m === "ai" ? (
                        <>
                          <Sparkles className="w-3 h-3" />
                          AI
                        </>
                      ) : (
                        <>
                          <FileText className="w-3 h-3" />
                          Manual
                        </>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Content Area */}
              <div className="pt-12">
                <AnimatePresence mode="wait">
                  {/* AI Mode: Show Prompt Input or Generated Email */}
                  {mode === "ai" && (
                    <>
                      {/* AI Prompt Input */}
                      {!emailContent && (
                        <motion.div
                          key="ai-prompt"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-4 sm:mb-5">
                            <h2 className="text-lg sm:text-xl font-bold pt-4 uppercase text-[#e4ded7] flex items-center gap-3 tracking-wide">
                              <span className="text-2xl">💭</span> 
                              AI Prompt
                            </h2>
                            <div className="flex gap-3">
                              <button
                                onClick={() => setShowTemplates(!showTemplates)}
                                className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wide transition-all duration-300 flex items-center gap-2 bg-[#0E1016]/80 text-[#e4ded7]/70 border-2 border-[#e4ded7]/20 hover:border-[#e4ded7]/40 hover:text-[#e4ded7] hover:bg-[#e4ded7]/5 hover:scale-[1.02]"
                              >
                                <LayoutTemplate className="w-4 h-4" />
                                <span className="hidden sm:inline">Templates</span>
                              </button>
                              <button
                                onClick={(e) => handleButtonClick(e, handleGenerateEmail)}
                                disabled={isGenerating || !prompt.trim()}
                                className={`relative px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wide transition-all duration-300 flex items-center gap-2 overflow-hidden ${
                                  isGenerating || !prompt.trim()
                                    ? "bg-[#e4ded7]/20 text-[#e4ded7]/40 cursor-not-allowed border-2 border-[#e4ded7]/10"
                                    : "bg-[#e4ded7] text-[#0E1016] border-2 border-[#e4ded7] shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                                }`}
                              >
                                <div className="relative z-10 flex items-center gap-2">
                                  {isGenerating ? (
                                    <div className="flex items-center gap-1">
                                      <div className="w-1.5 h-1.5 rounded-full bg-[#0E1016]/80 animate-bounce [animation-delay:-0.3s]" />
                                      <div className="w-1.5 h-1.5 rounded-full bg-[#0E1016]/80 animate-bounce [animation-delay:-0.15s]" />
                                      <div className="w-1.5 h-1.5 rounded-full bg-[#0E1016]/80 animate-bounce" />
                                    </div>
                                  ) : (
                                    <>
                                      <Sparkles className="w-4 h-4" />
                                      Generate
                                    </>
                                  )}
                                </div>
                              </button>
                            </div>
                          </div>

                          <div className="relative space-y-4">
                            <textarea
                              value={prompt}
                              onChange={(e) => {
                                setPrompt(e.target.value);
                                resetStatus();
                              }}
                              className="w-full h-[200px] sm:h-[220px] bg-[#0E1016]/40 border-2 border-[#e4ded7]/20 rounded-xl px-4 py-4 text-sm text-[#e4ded7] placeholder-[#e4ded7]/50 focus:border-[#e4ded7]/50 focus:ring-2 focus:ring-[#e4ded7]/20 transition-all duration-300 resize-none font-medium focus:outline-none leading-relaxed"
                              placeholder="Describe what kind of email you'd like to send..."
                            />
                          </div>
                        </motion.div>
                      )}

                      {/* AI Generated Email Display */}
                      {emailContent && (
                        <motion.div
                          key="ai-generated"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-4 sm:mb-5">
                            <h2 className="pt-4 text-lg sm:text-xl font-bold uppercase text-[#e4ded7] flex items-center gap-3 tracking-wide">
                              <span className="text-2xl">📧</span>
                              Generated Email
                            </h2>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                              {/* Regenerate Button */}
                              <button
                                onClick={() => {
                                  setEmailContent("");
                                  setIsTextAnimating(false);
                                }}
                                className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wide transition-all duration-300 flex items-center gap-2 bg-[#0E1016]/80 text-[#e4ded7]/70 border-2 border-[#e4ded7]/20 hover:border-[#e4ded7]/40 hover:text-[#e4ded7] hover:bg-[#e4ded7]/5 hover:scale-[1.02]"
                              >
                                <Sparkles className="w-4 h-4" />
                                <span>Regenerate</span>
                              </button>
                              
                              {/* Send Button */}
                              {isFormValid() && (
                                <button
                                  onClick={(e) => handleButtonClick(e, handleSendEmail)}
                                  disabled={isSending}
                                  className={`relative px-6 py-2.5 sm:px-8 sm:py-3 rounded-xl text-sm font-bold uppercase tracking-wide transition-all duration-300 flex items-center gap-3 overflow-hidden ${
                                    isSending
                                      ? "bg-[#e4ded7]/20 text-[#e4ded7]/40 cursor-not-allowed border-2 border-[#e4ded7]/10"
                                      : "bg-[#e4ded7] text-[#0E1016] border-2 border-[#e4ded7] shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                                  }`}
                                >
                                  <div className="relative z-10 flex items-center gap-2">
                                    {isSending ? (
                                      <div className="flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#0E1016]/80 animate-bounce [animation-delay:-0.3s]" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#0E1016]/80 animate-bounce [animation-delay:-0.15s]" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#0E1016]/80 animate-bounce" />
                                      </div>
                                    ) : (
                                      <>
                                        <Send className="w-4 h-4" />
                                        Send Email
                                      </>
                                    )}
                                  </div>
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="relative h-[200px] sm:h-[220px] rounded-xl overflow-hidden border-2 border-[#e4ded7]/20 hover:border-[#e4ded7]/30 transition-all duration-300">
                            <div className="absolute inset-0 w-full h-full bg-[#0E1016]/40 px-4 py-4 text-[#e4ded7] overflow-auto custom-scrollbar">
                              {isTextAnimating ? (
                                <TextGenerationEffect
                                  text={emailContent}
                                  className="text-sm leading-relaxed font-medium"
                                  speed="fast"
                                  onComplete={() => setIsTextAnimating(false)}
                                />
                              ) : (
                                <textarea
                                  value={emailContent}
                                  onChange={(e) => {
                                    setEmailContent(e.target.value);
                                    resetStatus();
                                  }}
                                  className="absolute inset-0 w-full h-full bg-transparent px-2 py-2 text-sm text-[#e4ded7] border-none focus:ring-0 resize-none leading-relaxed font-medium focus:outline-none"
                                />
                              )}
                            </div>
                          </div>

                          {/* AI Attribution */}
                          <div className="mt-4 flex items-center justify-center lg:justify-end">
                            <div className="text-xs text-[#e4ded7]/50 flex items-center gap-2 px-4 py-2.5 bg-[#0E1016]/70 rounded-xl border border-[#e4ded7]/20 font-semibold uppercase tracking-wide backdrop-blur-sm">
                              <Sparkles className="w-3 h-3 text-[#e4ded7]/60" />
                              <span>AI Generated</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </>
                  )}

                  {/* Manual Mode: Show Email Composition Area */}
                  {mode === "manual" && (
                    <motion.div
                      key="manual-compose"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-4 sm:mb-5">
                        <h2 className="pt-4 text-lg sm:text-xl font-bold uppercase text-[#e4ded7] flex items-center gap-3 tracking-wide">
                          <span className="text-2xl">📧</span>
                          Your Message
                        </h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          {/* Validation Status Indicator */}
                          {!isFormValid() && (
                            <div className="text-xs text-[#e4ded7]/60 bg-[#0E1016]/70 px-4 py-2.5 rounded-xl border border-[#e4ded7]/20 backdrop-blur-sm">
                              <span className="font-semibold text-[#e4ded7]/80">Missing: </span>
                              {!emailContent.trim() && "Message"}
                            </div>
                          )}
                          
                          {/* Send Button */}
                          {isFormValid() && (
                            <button
                              onClick={(e) => handleButtonClick(e, handleSendEmail)}
                              disabled={isSending}
                              className={`relative px-6 py-2.5 sm:px-8 sm:py-3 rounded-xl text-sm font-bold uppercase tracking-wide transition-all duration-300 flex items-center gap-3 overflow-hidden ${
                                isSending
                                  ? "bg-[#e4ded7]/20 text-[#e4ded7]/40 cursor-not-allowed border-2 border-[#e4ded7]/10"
                                  : "bg-[#e4ded7] text-[#0E1016] border-2 border-[#e4ded7] shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                              }`}
                            >
                              <div className="relative z-10 flex items-center gap-2">
                                {isSending ? (
                                  <div className="flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#0E1016]/80 animate-bounce [animation-delay:-0.3s]" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#0E1016]/80 animate-bounce [animation-delay:-0.15s]" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#0E1016]/80 animate-bounce" />
                                  </div>
                                ) : (
                                  <>
                                    <Send className="w-4 h-4" />
                                    Send Email
                                  </>
                                )}
                              </div>
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="relative h-[200px] sm:h-[220px] rounded-xl overflow-hidden border-2 border-[#e4ded7]/20 hover:border-[#e4ded7]/30 transition-all duration-300">
                        <textarea
                          value={emailContent}
                          onChange={(e) => {
                            setEmailContent(e.target.value);
                            resetStatus();
                          }}
                          className="absolute inset-0 w-full h-full bg-[#0E1016]/40 px-4 py-4 text-sm text-[#e4ded7] border-none focus:ring-0 focus:outline-none resize-none leading-relaxed placeholder-[#e4ded7]/50 font-medium"
                          placeholder="Write your message here..."
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Templates Overlay */}
              <AnimatePresence>
                {showTemplates && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 z-20 bg-[#0E1016]/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 overflow-auto flex flex-col border-2 border-[#e4ded7]/30"
                  >
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-xl font-bold uppercase text-[#e4ded7] tracking-wide flex items-center gap-3">
                        <LayoutTemplate className="w-6 h-6" />
                        Select Template
                      </h2>
                      <button
                        onClick={() => setShowTemplates(false)}
                        className="text-[#e4ded7]/60 hover:text-[#e4ded7] font-bold text-2xl hover:scale-110 transition-all duration-200 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#e4ded7]/10"
                      >
                        ×
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
                      {emailTemplates.map((template, index) => (
                        <motion.button
                          key={index}
                          onClick={() => handleSelectTemplate(index)}
                          whileHover={{ y: -5, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex flex-col items-center justify-center p-6 rounded-xl text-center h-full min-h-[200px] transition-all duration-300 ${
                            selectedTemplate === index
                              ? "bg-[#e4ded7]/10 border-2 border-[#e4ded7]"
                              : "bg-[#0E1016]/60 border-2 border-[#e4ded7]/20 hover:border-[#e4ded7]/40 hover:bg-[#e4ded7]/5"
                          }`}
                        >
                          <div className="text-3xl mb-4">
                            {template.icon}
                          </div>
                          <h3 className="font-bold text-[#e4ded7] mb-3 uppercase tracking-wide text-sm">
                            {template.title}
                          </h3>
                          <p className="text-xs text-[#e4ded7]/70 mb-4 font-medium leading-relaxed">
                            {template.description}
                          </p>
                          <span className="px-4 py-2 bg-[#e4ded7]/20 rounded-full text-xs text-[#e4ded7] border border-[#e4ded7]/30 font-semibold uppercase tracking-wide">
                            {template.tags[0]}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Alert Components */}
        <Alert
          type="success"
          title={alertTitle}
          message={alertMessage}
          isVisible={showSuccessAlert}
          onClose={() => setShowSuccessAlert(false)}
          autoClose={true}
          autoCloseDelay={5000}
        />
        
        <Alert
          type="error"
          title={alertTitle}
          message={alertMessage}
          isVisible={showErrorAlert}
          onClose={() => setShowErrorAlert(false)}
          autoClose={true}
          autoCloseDelay={7000}
        />
      </div>
    </>
  );
}