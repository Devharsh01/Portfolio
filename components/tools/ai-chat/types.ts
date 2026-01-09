import { ReactNode } from "react";

/**
 * Message interface for chat messages
 */
export interface Message {
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  structuredContent?: StructuredContent | null;
}

/**
 * Structured content interface for formatted display elements
 */
export interface StructuredContent {
  type: "skills" | "projects" | "experience" | "contact" | "links" | "general";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

/**
 * Props for the AIChatModal component
 */
export interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Props for the header component
 */
export interface HeaderProps {
  onClose: () => void;
  onClearChat: () => void;
}

/**
 * Props for the message display component
 */
export interface MessageDisplayProps {
  messages: Message[];
  isSearching: boolean;
  error: string;
  renderStructuredContent: (content: StructuredContent) => ReactNode;
}

/**
 * Props for the input area component
 */
export interface InputAreaProps {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<HTMLTextAreaElement>;
}


