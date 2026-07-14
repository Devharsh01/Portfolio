import { useState, useCallback, useEffect, useRef } from "react";
import { Message, StructuredContent } from "./types";

const useJWTAuth = () => {
  const [isTokenLoading, setIsTokenLoading] = useState(false);

  // Function to generate a new token for each request
  const generateNewToken = useCallback(async (): Promise<string | null> => {
    if (isTokenLoading) {
      return null;
    }

    setIsTokenLoading(true);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "anonymous",
          sessionId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Unique session ID
        }),
      });

      if (response.ok) {
        const { token: newToken } = await response.json();
        return newToken;
      }
    } catch (error) {
      console.error("Failed to get authentication token:", error);
    } finally {
      setIsTokenLoading(false);
    }

    return null;
  }, [isTokenLoading]);

  // Function to clear any stored tokens (if needed for logout)
  const clearToken = useCallback(() => {
    sessionStorage.removeItem("jwt_token");
  }, []);

  return {
    generateNewToken,
    clearToken,
    isTokenLoading,
  };
};



/**
 * Hook for handling messages and API calls
 */
export const useMessageHandler = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Use JWT auth hook
  const { generateNewToken } = useJWTAuth();



  // Parse structured content from response
  const parseStructuredContent = useCallback(
    (content: string): StructuredContent | null => {
      try {
        // Check if the content contains JSON structure markers
        if (content.includes("```json") && content.includes("```")) {
          const jsonMatch = content.match(/```json([\s\S]*?)```/);
          if (jsonMatch && jsonMatch[1]) {
            const jsonData = JSON.parse(jsonMatch[1].trim());
            return jsonData;
          }
        }
        return null;
      } catch (error) {
        console.error("Failed to parse structured content:", error);
        return null;
      }
    },
    []
  );

  // Process regular messages
  const processMessage = useCallback(
    async (userMessage: string) => {
      setIsLoading(true);
      setError("");

      try {
        // Generate a new token for this specific request
        const authToken = await generateNewToken();

        if (!authToken) {
          throw new Error("Unable to authenticate. Please try again.");
        }

        // Regular chat processing with JWT header
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            prompt: userMessage,
            messages: messages,
            structuredResponse: true,
          }),
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Authentication failed. Please try again.");
          }
          throw new Error("Failed to get response");
        }

        const data = await response.json();

        // If search was performed, show search animation for a moment
        if (data.isSearchPerformed) {
          setIsSearching(true);
          // Keep search animation visible for at least 1.5 seconds
          await new Promise((resolve) => setTimeout(resolve, 1500));
          setIsSearching(false);
        }

        // Parse structured content if available
        const structuredContent = parseStructuredContent(data.response);

        // Remove the JSON code block from the text content
        let cleanContent = data.response;
        if (structuredContent) {
          // Remove the JSON code block from the displayed text
          cleanContent = data.response
            .replace(/```json[\s\S]*?```/g, "")
            .trim();
        }

        return {
          content: cleanContent,
          structuredContent,
          hasStructuredData: data.hasStructuredData,
          structuredDataType: data.structuredDataType,
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, parseStructuredContent, generateNewToken]
  );

  // Remove the auto-refresh token effect since we're generating new tokens for each request
  // No need for token refresh when each request gets a new token

  // Scroll to bottom after messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return {
    messages,
    setMessages,
    isLoading,
    isSearching,
    error,
    setError,
    messagesEndRef,
    processMessage,
    parseStructuredContent,
  };
};

/**
 * Check if a click event is trusted
 */
export const isTrustedClick = (e: React.MouseEvent): boolean => {
  return e.isTrusted;
};

/**
 * Initialize the chat with a welcome message
 */
export const initializeChat = async (
  setMessages: (messages: Message[]) => void,
  setError: (error: string) => void
) => {
  try {
    // Get main content excluding specific sections
    const mainElement = document.querySelector("main");
    if (!mainElement) return;

    // Clone the main content
    const mainContent = mainElement.cloneNode(true) as HTMLElement;

    // Remove unwanted sections
    const elementsToRemove = [
      "[data-chat-modal]",
      "#contact",
      "[data-contact-section]",
      "form",
      ".contact-section",
      "script",
      "style",
      "noscript",
      "iframe",
    ];

    elementsToRemove.forEach((selector) => {
      const elements = mainContent.querySelectorAll(selector);
      elements.forEach((element) => element.remove());
    });

    // Set initial message with clear creator identification
    setMessages([
      {
        type: "assistant",
        content:
          "👋 Hey! I'm your AI assistant for this portfolio. I was created by Dev Harsh to help you learn about his work and experience. What would you like to know?",
        timestamp: new Date(),
      },
    ]);
  } catch (error) {
    console.error("Failed to initialize chat:", error);
    setError("Failed to initialize chat. Please try again.");
  }
};
