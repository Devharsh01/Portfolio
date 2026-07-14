/* eslint-disable */
import { ChatOpenAI, ChatOpenAICallOptions } from "@langchain/openai";
import { TavilySearch } from "@langchain/tavily";
import {
  HumanMessage,
  AIMessage,
  SystemMessage,
  BaseMessage,
} from "@langchain/core/messages";
import { StateGraph, MessagesAnnotation } from "@langchain/langgraph";
import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";
// import { queryVectorStore } from "@/lib/embeddings";
import jwt from "jsonwebtoken";
import { characterContent } from "@/constants/character";
import {
  PORTFOLIO_URL,
  RESUME_URL,
  EMAIL,
  PHONE_DISPLAY,
  GITHUB_URL,
  LINKEDIN_URL,
  LEETCODE_URL,
} from "@/constants/site";

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXPIRY = process.env.JWT_EXPIRY || "1m";

// JWT Token verification function
function verifyToken(token: string): {
  valid: boolean;
  payload?: any;
  error?: string;
} {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { valid: true, payload: decoded };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return { valid: false, error: "Token expired" };
    } else if (error instanceof jwt.JsonWebTokenError) {
      return { valid: false, error: "Invalid token" };
    } else {
      return { valid: false, error: "Token verification failed" };
    }
  }
}

// Function to generate JWT token (you might want to use this in a separate auth endpoint)
export function generateToken(payload: any): string {
  const options = {
    expiresIn: JWT_EXPIRY,
  } as jwt.SignOptions;
  console.log("Generating token with options:", options);
  return jwt.sign(payload, JWT_SECRET, options);
}

// Add CORS check middleware
function isAllowedOrigin(origin: string | null) {
  const allowedOrigins = [
    PORTFOLIO_URL,

    // Include localhost for development(uncomment for development)
    "http://localhost:3000",
  ];
  return origin && allowedOrigins.includes(origin);
}

// Function to detect if a message likely needs web search - optimized with Set for faster lookups
function needsWebSearch(message: string): boolean {
  const searchIndicators = new Set([
    "current",
    "latest",
    "recent",
    "news",
    "today",
    "update",
    "weather",
    "price",
    "stock",
    "event",
    "happened",
    "when did",
    "when will",
    "how much is",
    "what is the",
    "who is",
    "where is",
    "2023",
    "2024",
    "2025",
    "2026",
    "search",
  ]);

  const lowerMessage = message.toLowerCase();
  return Array.from(searchIndicators).some((indicator) =>
    lowerMessage.includes(indicator.toLowerCase())
  );
}

// Function to detect query type - optimized with regex patterns stored as constants
const SKILLS_PATTERN =
  /skills|technologies|tech stack|programming|languages|frameworks|tools|libraries|proficient|expertise|capable|abilities/i;
const PROJECTS_PATTERN =
  /projects|portfolio|work|applications|apps|websites|developed|built|created|made|showcase|fashion cave|rendition|stable diffusion|image generation|patient management|hospital system|exec os|executive assistant|execos/i;
const EXPERIENCE_PATTERN =
  /experience|work history|job|career|background|employment|company|flexport|deloitte|intern|internship|position|role/i;
const EDUCATION_PATTERN =
  /education|degree|university|college|school|academic|study|studied|lnmiit|lnm|engineering|btech|b\.tech|computer|jaipur/i;
const CONTACT_PATTERN =
  /contact|email|phone|reach|get in touch|connect|social media|message|call/i;
const AWARDS_PATTERN =
  /awards|achievements|recognition|won|prize|honor/i;
const LINKS_PATTERN =
  /links|urls|websites|resources|portfolio|social|profiles|connect|follow/i;

// Add more specific patterns for individual link types
const RESUME_PATTERN = /resume|cv|curriculum vitae/i;
const GITHUB_PATTERN = /github|code|repository|repositories|source code/i;
const LINKEDIN_PATTERN = /linkedin|professional profile|professional network/i;
const LEETCODE_PATTERN = /leetcode|competitive programming|knight|rating/i;
const PORTFOLIO_PATTERN = /portfolio website|personal website|portfolio site/i;
const PROJECT_LINKS_PATTERN =
  /project links|project urls|project websites|github projects/i;

// Add more specific patterns for individual contact types
const EMAIL_PATTERN =
  /email|e-mail|mail|send.*email|send.*mail|electronic mail/i;
const PHONE_PATTERN = /phone|call|mobile|cell|telephone|contact number/i;
const LOCATION_PATTERN =
  /location|address|where.*live|where.*based|city|town|where.*from/i;

// Add specific patterns for individual projects
const FASHION_CAVE_PATTERN =
  /fashion cave|fashion-cave|ecommerce|e-commerce|online store|shopping platform/i;
const RENDITION_PATTERN =
  /rendition|theatre|theater|club website|society website|3d experience/i;
const STABLE_DIFFUSION_PATTERN =
  /stable diffusion|image generation|super-resolution|super resolution|diffusion model|ldm|satellite imagery/i;
const PATIENT_MANAGEMENT_PATTERN =
  /patient management|patient-management|medical system|hospital system|appointment service/i;
const EXEC_OS_PATTERN =
  /exec os|exec-os|execos|autonomous AI|executive assistant|Vercel AI SDK|Claude API/i;

// Update the detectQueryType function to handle specific project types
function detectQueryType(message: string): string | null {
  const lowerMessage = message.toLowerCase();

  // Check for specific project types
  if (
    FASHION_CAVE_PATTERN.test(lowerMessage) &&
    !RENDITION_PATTERN.test(lowerMessage) &&
    !STABLE_DIFFUSION_PATTERN.test(lowerMessage) &&
    !PATIENT_MANAGEMENT_PATTERN.test(lowerMessage) &&
    !EXEC_OS_PATTERN.test(lowerMessage)
  )
    return "fashion_cave_project";
  if (
    RENDITION_PATTERN.test(lowerMessage) &&
    !FASHION_CAVE_PATTERN.test(lowerMessage) &&
    !STABLE_DIFFUSION_PATTERN.test(lowerMessage) &&
    !PATIENT_MANAGEMENT_PATTERN.test(lowerMessage) &&
    !EXEC_OS_PATTERN.test(lowerMessage)
  )
    return "rendition_project";
  if (
    STABLE_DIFFUSION_PATTERN.test(lowerMessage) &&
    !FASHION_CAVE_PATTERN.test(lowerMessage) &&
    !RENDITION_PATTERN.test(lowerMessage) &&
    !PATIENT_MANAGEMENT_PATTERN.test(lowerMessage) &&
    !EXEC_OS_PATTERN.test(lowerMessage)
  )
    return "stable_diffusion_project";
  if (
    PATIENT_MANAGEMENT_PATTERN.test(lowerMessage) &&
    !FASHION_CAVE_PATTERN.test(lowerMessage) &&
    !RENDITION_PATTERN.test(lowerMessage) &&
    !STABLE_DIFFUSION_PATTERN.test(lowerMessage) &&
    !EXEC_OS_PATTERN.test(lowerMessage)
  )
    return "patient_management_project";
  if (
    EXEC_OS_PATTERN.test(lowerMessage) &&
    !FASHION_CAVE_PATTERN.test(lowerMessage) &&
    !RENDITION_PATTERN.test(lowerMessage) &&
    !STABLE_DIFFUSION_PATTERN.test(lowerMessage) &&
    !PATIENT_MANAGEMENT_PATTERN.test(lowerMessage)
  )
    return "exec_os_project";

  // Check for specific contact types
  if (
    EMAIL_PATTERN.test(lowerMessage) &&
    !PHONE_PATTERN.test(lowerMessage) &&
    !LOCATION_PATTERN.test(lowerMessage)
  )
    return "email_contact";
  if (PHONE_PATTERN.test(lowerMessage) && !EMAIL_PATTERN.test(lowerMessage))
    return "phone_contact";
  if (LOCATION_PATTERN.test(lowerMessage)) return "location_contact";

  // Check for specific link types
  if (
    RESUME_PATTERN.test(lowerMessage) &&
    !lowerMessage.includes("skills") &&
    !lowerMessage.includes("experience")
  )
    return "resume_link";
  if (GITHUB_PATTERN.test(lowerMessage) && !lowerMessage.includes("projects"))
    return "github_link";
  if (LINKEDIN_PATTERN.test(lowerMessage)) return "linkedin_link";
  if (LEETCODE_PATTERN.test(lowerMessage)) return "leetcode_link";
  if (PORTFOLIO_PATTERN.test(lowerMessage)) return "portfolio_link";
  if (PROJECT_LINKS_PATTERN.test(lowerMessage)) return "project_links";

  // Then check for general categories
  if (SKILLS_PATTERN.test(lowerMessage)) return "skills";
  if (PROJECTS_PATTERN.test(lowerMessage)) return "projects";
  if (EXPERIENCE_PATTERN.test(lowerMessage)) return "experience";
  if (EDUCATION_PATTERN.test(lowerMessage)) return "education";
  if (CONTACT_PATTERN.test(lowerMessage)) return "contact";
  if (AWARDS_PATTERN.test(lowerMessage)) return "awards";
  if (LINKS_PATTERN.test(lowerMessage)) return "links";

  return null;
}

// Define types for OpenRouter API
interface OpenRouterMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

interface OpenRouterFields {
  temperature?: number;
  [key: string]: unknown;
}

// Function to call OpenRouter API directly
async function callOpenRouter(messages: BaseMessage[], isSearchQuery: boolean): Promise<AIMessage> {
  // Format messages for OpenRouter
  const formattedMessages: OpenRouterMessage[] = messages.map((msg) => ({
    role:
      msg._getType() === "human"
        ? "user"
        : msg._getType() === "system"
        ? "system"
        : "assistant",
    content: msg.content as string,
  }));

  // Check if the last message is from a human and might need search
  const lastMessage = formattedMessages[formattedMessages.length - 1];
  if (lastMessage.role === "user" && isSearchQuery) {
    try {
      // Perform a search directly
      const searchTool = new TavilySearch({
        maxResults: 3,
      });
      const searchResults = await searchTool.invoke({ query: lastMessage.content});

      // Add search results as a system message
      formattedMessages.splice(formattedMessages.length - 1, 0, {
        role: "system",
        content: `Relevant web search results that might help with the user's question:\n${searchResults}\n\nUse these results if they're helpful for answering the question.`,
      });
    } catch (error) {
      console.error("Error performing search:", error);
      // Continue without search results if there's an error
    }
  }

  try {
    // Debug environment variables
    console.log("OpenRouter API Key exists:", !!process.env.OPENROUTER_API_KEY);
    
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error("OPENROUTER_API_KEY environment variable is not set");
    }

    // Make direct API call to OpenRouter
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": PORTFOLIO_URL,
          "X-Title": "Dev Harsh's Portfolio",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.1-8b-instruct",
          messages: formattedMessages,
          temperature: 0,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter API error:", errorData);
      throw new Error(`OpenRouter API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();

    // Return AIMessage directly
    return new AIMessage({
      content: data.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error calling OpenRouter:", error);
    throw error;
  }
}

// Define the type for chat history messages
interface ChatMessage {
  type: "user" | "assistant";
  content: string;
}

// Simple in-memory cache for vector search results
const vectorSearchCache = new Map<string, string>();
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

// Update the generateStructuredResponse function to handle specific project types
function generateStructuredResponse(queryType: string): string {
  // Define individual project templates
  const projectTemplates: Record<string, any> = {
    patient_management_project: [
      {
        title: "Patient Management System",
        description:
          "A microservices-based Patient Management System with 5+ independent services (patient, appointment, billing), utilizing Spring Boot, Docker, Apache Kafka for event-driven messaging, and AWS LocalStack.",
        technologies: ["Java", "Spring Boot", "Microservices", "Kafka", "Docker", "AWS LocalStack"],
        link: "https://github.com/Devharsh01/Patient-Management-System",
      },
    ],
    exec_os_project: [
      {
        title: "Exec OS: Autonomous AI Agent SaaS",
        description:
          "A full-stack autonomous AI 'Executive Assistant' SaaS that runs background tasks autonomously, processes Gmail/Calendar data, features a heartbeat mechanism via Cron, and reasoning logs transparency.",
        technologies: ["Next.js 15", "React 19", "TypeScript", "Vercel AI SDK", "Claude API", "Drizzle ORM", "PostgreSQL"],
        link: "https://github.com/Devharsh01/Exec-OS",
      },
    ],
    fashion_cave_project: [
      {
        title: "Fashion Cave",
        description:
          "A modern, full-stack fashion e-commerce platform with a dynamic storefront, admin dashboard, and a scalable Node.js/Express backend over MongoDB.",
        technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Stripe", "REST APIs"],
        link: "https://github.com/Devharsh01/Fashion-Cave",
      },
    ],
    rendition_project: [
      {
        title: "Rendition",
        description:
          "The official digital presence of Rendition, the Theatre Society of LNMIIT — featuring a 3D immersive experience, enrollment system, and complete club management.",
        technologies: ["React", "Node.js", "MongoDB", "Three.js", "Tailwind CSS", "Framer Motion"],
        link: "https://github.com/Devharsh01/Rendition-Website",
      },
    ],
    stable_diffusion_project: [
      {
        title: "High-Resolution Image Generation using Stable Diffusion",
        description:
          "Implemented Diffusion and Latent Diffusion Models achieving 4x super-resolution on satellite imagery, with +2.47 dB PSNR and +0.044 SSIM improvements over GANs.",
        technologies: ["Python", "PyTorch", "TensorFlow", "Stable Diffusion", "Hugging Face", "GANs"],
        link: "https://github.com/Devharsh01/",
      },
    ],
  };

  // Define individual contact templates
  const contactTemplates: Record<string, any> = {
    email_contact: {
      email: EMAIL,
      type: "Email",
    },
    phone_contact: {
      phone: PHONE_DISPLAY,
      type: "Phone",
    },
    location_contact: {
      location: "India",
      type: "Location",
    },
  };

  // Define individual link templates
  const linkTemplates: Record<string, any> = {
    resume_link: [
      {
        title: "Resume",
        url: RESUME_URL,
        description:
          "View my detailed resume with skills, experience, and education",
      },
    ],
    github_link: [
      {
        title: "GitHub Profile",
        url: GITHUB_URL,
        description:
          "Check out my code repositories and open-source contributions",
      },
    ],
    linkedin_link: [
      {
        title: "LinkedIn Profile",
        url: LINKEDIN_URL,
        description: "Connect with me professionally on LinkedIn",
      },
    ],
    leetcode_link: [
      {
        title: "LeetCode Profile",
        url: LEETCODE_URL,
        description: "Knight badge holder (Rating: 1874) — see my problem-solving",
      },
    ],
    portfolio_link: [
      {
        title: "Portfolio Website",
        url: PORTFOLIO_URL,
        description: "My personal portfolio showcasing projects and skills",
      },
    ],
    project_links: [
      {
        title: "Patient Management System",
        url: "https://github.com/Devharsh01/Patient-Management-System",
        description: "Microservices-based Patient Management System",
      },
      {
        title: "Exec OS",
        url: "https://github.com/Devharsh01/Exec-OS",
        description: "Autonomous AI Agent SaaS",
      },
      {
        title: "Fashion Cave",
        url: "https://github.com/Devharsh01/Fashion-Cave",
        description: "Full-stack fashion e-commerce platform",
      },
      {
        title: "Rendition Website",
        url: "https://github.com/Devharsh01/Rendition-Website",
        description: "Theatre society website with a 3D immersive experience",
      },
      {
        title: "GitHub",
        url: GITHUB_URL,
        description: "All my repositories and open-source work",
      },
    ],
  };

  // Define the structured data templates for general categories
  const structuredDataTemplates: Record<string, any> = {
    skills: [
      { name: "Java", category: "Programming Language" },
      { name: "Python", category: "Programming Language" },
      { name: "C++", category: "Programming Language" },
      { name: "JavaScript", category: "Programming Language" },
      { name: "TypeScript", category: "Programming Language" },
      { name: "React.js", category: "Frontend Framework" },
      { name: "Next.js", category: "Frontend Framework" },
      { name: "Node.js", category: "Backend" },
      { name: "Express.js", category: "Backend" },
      { name: "REST APIs", category: "Backend" },
      { name: "TailwindCSS", category: "Frontend" },
      { name: "PyTorch", category: "AI/ML" },
      { name: "TensorFlow", category: "AI/ML" },
      { name: "AWS", category: "Cloud" },
      { name: "Terraform", category: "Cloud" },
      { name: "Snowflake", category: "Data" },
      { name: "Databricks", category: "Data" },
      { name: "MySQL", category: "Database" },
      { name: "PostgreSQL", category: "Database" },
      { name: "MongoDB", category: "Database" },
      { name: "CI/CD", category: "DevOps" },
      { name: "Git", category: "Version Control" },
    ],
    projects: [
      {
        title: "Patient Management System",
        description:
          "A microservices-based Patient Management System with 5+ independent services (patient, appointment, billing), utilizing Spring Boot, Docker, Apache Kafka for event-driven messaging, and AWS LocalStack.",
        technologies: ["Java", "Spring Boot", "Microservices", "Kafka", "Docker", "AWS LocalStack"],
        link: "https://github.com/Devharsh01/Patient-Management-System",
      },
      {
        title: "Exec OS: Autonomous AI Agent SaaS",
        description:
          "A full-stack autonomous AI 'Executive Assistant' SaaS that runs background tasks autonomously, processes Gmail/Calendar data, features a heartbeat mechanism via Cron, and reasoning logs transparency.",
        technologies: ["Next.js 15", "React 19", "TypeScript", "Vercel AI SDK", "Claude API", "Drizzle ORM", "PostgreSQL"],
        link: "https://github.com/Devharsh01/Exec-OS",
      },
      {
        title: "Fashion Cave",
        description:
          "A modern, full-stack fashion e-commerce platform with a dynamic storefront, admin dashboard, and a scalable Node.js/Express backend over MongoDB.",
        technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Stripe", "REST APIs"],
        link: "https://github.com/Devharsh01/Fashion-Cave",
      },
      {
        title: "Rendition",
        description:
          "The official digital presence of Rendition, the Theatre Society of LNMIIT — featuring a 3D immersive experience, enrollment system, and complete club management.",
        technologies: ["React", "Node.js", "MongoDB", "Three.js", "Tailwind CSS", "Framer Motion"],
        link: "https://github.com/Devharsh01/Rendition-Website",
      },
      {
        title: "High-Resolution Image Generation using Stable Diffusion",
        description:
          "Implemented Diffusion and Latent Diffusion Models achieving 4x super-resolution on satellite imagery, outperforming GANs while preserving structural integrity.",
        technologies: ["Python", "PyTorch", "TensorFlow", "Stable Diffusion", "Hugging Face", "GANs"],
        link: "https://github.com/Devharsh01/",
      },
    ],
    experience: [
      {
        title: "Software Engineer Intern",
        company: "Flexport",
        period: "Jan 2026 - Jun 2026",
        description:
          "Architected and delivered a highly scalable PWA with automation frameworks and tests, driving 480+ daily scans and cutting non-compliance resolution time by 50%. Resolved a device security vulnerability with an HMAC signed-token auth flow, optimized cloud infra with Terraform (USD 900+/month savings), and integrated Slack/PagerDuty on-call alerting.",
      },
      {
        title: "Product Engineer Summer Intern",
        company: "Deloitte",
        period: "May 2025 - Jul 2025",
        description:
          "Built a scalable full-stack Performance Management System for employee goal tracking and role-based workflows. Designed automated backend test suites (Node.js, Express.js, PostgreSQL) ensuring secure REST API communication, collaborating with engineers, PMs, and UX experts.",
      },
    ],
    education: [
      {
        title: "B.Tech in Computer Science and Engineering",
        institution: "The LNM Institute of Information Technology, Jaipur",
        period: "Oct 2022 - May 2026",
        description: "CGPA: 7.86",
      },
    ],
    contact: {
      email: EMAIL,
      phone: PHONE_DISPLAY,
      location: "India",
      linkedin: LINKEDIN_URL,
      github: GITHUB_URL,
      portfolio: PORTFOLIO_URL,
    },
    awards: [
      {
        title: "LeetCode Knight Badge (Rating: 1874)",
        description:
          "Earned the Knight badge through a self-motivated approach to consistent problem-solving, algorithmic optimization, and analytical thinking.",
      },
      {
        title: "Coordinator of Rendition (Theatre Club of LNMIIT)",
        description:
          "Directed 7 event teams, driving a 25% growth in sponsorship revenue and improving overall attendee satisfaction.",
      },
    ],
    links: [
      {
        title: "Portfolio Website",
        url: PORTFOLIO_URL,
        description: "My personal portfolio showcasing projects and skills",
      },
      {
        title: "Resume",
        url: RESUME_URL,
        description: "View my detailed resume",
      },
      {
        title: "GitHub Profile",
        url: GITHUB_URL,
        description: "Check out my code repositories and contributions",
      },
      {
        title: "LinkedIn",
        url: LINKEDIN_URL,
        description: "Connect with me professionally",
      },
      {
        title: "LeetCode",
        url: LEETCODE_URL,
        description: "Knight badge holder (Rating: 1874)",
      },
      {
        title: "Fashion Cave",
        url: "https://github.com/Devharsh01/Fashion-Cave",
        description: "Full-stack fashion e-commerce platform",
      },
      {
        title: "Rendition Website",
        url: "https://github.com/Devharsh01/Rendition-Website",
        description: "Theatre society website with a 3D immersive experience",
      },
    ],
  };

  // Check if it's a specific project type
  if (queryType.includes("_project")) {
    return JSON.stringify(
      {
        type: "projects",
        data: projectTemplates[queryType],
      },
      null,
      2
    );
  }

  // Check if it's a specific contact type
  if (queryType.includes("_contact")) {
    return JSON.stringify(
      {
        type: "contact",
        data: contactTemplates[queryType],
      },
      null,
      2
    );
  }

  // Check if it's a specific link type
  if (queryType.includes("_link")) {
    return JSON.stringify(
      {
        type: "links",
        data: linkTemplates[queryType],
      },
      null,
      2
    );
  }

  // Otherwise return the general category data
  return JSON.stringify(
    {
      type: queryType,
      data: structuredDataTemplates[queryType],
    },
    null,
    2
  );
}

export async function POST(req: Request) {
  // Performance monitoring
  const startTime = performance.now();

  // Check origin
  const headersList = await headers();
  const origin = headersList.get("origin");

  // If origin is not allowed, return 403 Forbidden
  if (!isAllowedOrigin(origin)) {
    return new NextResponse(
      JSON.stringify({ error: "Unauthorized origin" }),
      {
        status: 403,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // JWT Authentication
  const authHeader = headersList.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new NextResponse(
      JSON.stringify({
        error: "Authentication required",
        message: "Missing or invalid authorization header",
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": origin || "",
        },
      }
    );
  }

  const token = authHeader.substring(7); // Remove "Bearer " prefix
  const tokenVerification = verifyToken(token);

  if (!tokenVerification.valid) {
    return new NextResponse(
      JSON.stringify({
        error: "Authentication failed",
        message: tokenVerification.error,
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": origin || "",
        },
      }
    );
  }

  // Optional: Add rate limiting based on JWT payload
  const userPayload = tokenVerification.payload;
  console.log("Authenticated user:", userPayload);

  try {
    const text = await new Response(req.body).text();
    const body = text ? JSON.parse(text) : {};
    const {
      prompt,
      messages: chatHistory,
      sessionId,
    } = body as {
      prompt: string;
      messages: ChatMessage[];
      sessionId?: string;
    };

    console.log("Received authenticated request with prompt:", prompt);

    // Check if the prompt likely needs web search
    const isSearchQuery = needsWebSearch(prompt);

    // Detect query type for structured response
    const queryType = detectQueryType(prompt);

    // Store the search query flag for later use
    const shouldPerformSearch = isSearchQuery;

    // Define the function that calls the model with context
    const callModel = async (state: typeof MessagesAnnotation.State) => {
      try {
        // Get the last user message to use for vector search
        const lastUserMessage = state.messages
          .filter((msg) => msg._getType() === "human")
          .pop();

        const userQuery = lastUserMessage
          ? (lastUserMessage.content as string)
          : "";

        // Detect if this is a query that will have structured data
        const willHaveStructuredData = !!queryType;

        // Optimization: Use cached vector search results if available
        let characterInfo = characterContent;

        // Modify system prompt based on whether structured data will be added
        let systemContent = `You are Dev Harsh Agarwal, a Full Stack Engineer with expertise in TypeScript, Node.js, React.js, Next.js, and AWS.`;

        if (willHaveStructuredData) {
          // For queries that will have structured data, instruct the model to be brief
          systemContent += ` For this query, provide a VERY BRIEF conversational introduction only. DO NOT list specific details like skills, projects, contact info, or links - these will be displayed separately in a structured format. Keep your response to 1-2 sentences maximum.`;
        } else {
          // For queries without structured data, allow normal detailed responses
          systemContent += ` Keep responses concise and use "I" statements.`;
        }

        // Only include character info if we have it
        if (characterInfo) {
          systemContent += `\n\nRelevant information about me:\n${characterInfo}`;
        }

        // Add specific instructions based on query type
        if (queryType && queryType.includes("_project")) {
          const projectName = queryType
            .replace("_project", "")
            .replace("_", " ");
          systemContent += `\n\nThis question is about my ${projectName} project. Just provide a brief introduction - the details will be shown in a structured format.`;
        } else if (queryType && queryType.includes("_contact")) {
          const contactType = queryType.replace("_contact", "");
          systemContent += `\n\nThis question is about my ${contactType}. Just acknowledge the request - the actual ${contactType} will be shown in a structured format.`;
        } else if (queryType && queryType.includes("_link")) {
          const linkType = queryType.replace("_link", "");
          systemContent += `\n\nThis question is about my ${linkType} link. Just acknowledge the request - the actual link will be shown in a structured format.`;
        } else if (queryType === "skills") {
          systemContent += `\n\nThis question is about my skills. Just provide a brief introduction - the detailed skills list will be shown in a structured format.`;
        } else if (queryType === "projects") {
          systemContent += `\n\nThis question is about my projects. Just provide a brief introduction - the detailed project list will be shown in a structured format.`;
        } else if (queryType === "experience") {
          systemContent += `\n\nThis question is about my experience. Just provide a brief introduction - the detailed experience will be shown in a structured format.`;
        } else if (queryType === "education") {
          systemContent += `\n\nThis question is about my education. Just provide a brief introduction - the detailed education info will be shown in a structured format.`;
        } else if (queryType === "contact") {
          systemContent += `\n\nThis question is about my contact information. Just acknowledge the request - the actual contact details will be shown in a structured format.`;
        } else if (queryType === "links") {
          systemContent += `\n\nThis question is about my online profiles and resources. Just acknowledge the request - the actual links will be shown in a structured format.`;
        } else if (queryType) {
          systemContent += `\n\nThis question is about my ${queryType}. Just provide a brief introduction - the details will be shown in a structured format.`;
        }

        systemContent += `\n\nRules:
        1. Speak as Dev Harsh using "I" and "my"
        2. Keep responses concise and focused
        3. If unsure about specific details, say "Feel free to contact me directly for more information"
        4. Use web search results when provided for up-to-date information
        5. Maintain a professional tone`;

        // Manage system message efficiently
        if (
          state.messages.length === 0 ||
          !(state.messages[0] instanceof SystemMessage)
        ) {
          state.messages.unshift(new SystemMessage(systemContent));
        } else {
          // Replace the existing system message with the updated one
          state.messages[0] = new SystemMessage(systemContent);
        }
        const modelLabel = `Model generation ${Date.now()}`;
        // Performance monitoring for model generation
        console.time(modelLabel);
        const aiMessage = await callOpenRouter(state.messages, shouldPerformSearch);
        console.timeEnd(modelLabel);
        
        // Return the response
        return { messages: [aiMessage] };
      } catch (error) {
        console.error("Error in callModel:", error);
        // Return a fallback message
        return {
          messages: [
            new AIMessage(
              "I'm sorry, I encountered an error processing your request. Please try again later."
            ),
          ],
        };
      }
    };

    // Define a new graph
    const workflow = new StateGraph(MessagesAnnotation)
      .addNode("agent", callModel)
      .addEdge("__start__", "agent")
      .addEdge("agent", "__end__");

    // Compile it into a LangChain Runnable
    const app = workflow.compile();

    // Convert chat history to the format expected by LangGraph
    const formattedMessages = chatHistory
      ? chatHistory.map((msg: ChatMessage) =>
          msg.type === "user"
            ? new HumanMessage(msg.content)
            : new AIMessage(msg.content)
        )
      : [];

    // Add the current prompt as a human message
    formattedMessages.push(new HumanMessage(prompt));

    // Generate a thread ID for this conversation
    // Use the provided sessionId or generate a new one
    const threadId = sessionId || Date.now().toString();

    // Use the agent
    console.log("Invoking agent workflow with thread ID:", threadId);
    const finalState = await app.invoke(
      { messages: formattedMessages }
    );
    console.log("Agent workflow completed");

    // Get the last message (the response)
    let response = finalState.messages[finalState.messages.length - 1]
      .content as string;

    // If we have a query type, append the structured data JSON to the response
    let hasStructuredData = false;
    if (queryType) {
      const structuredData = generateStructuredResponse(queryType);
      response += `\n\n\`\`\`json\n${structuredData}\n\`\`\``;
      hasStructuredData = true;
    }

    // Performance monitoring
    const endTime = performance.now();
    console.log(
      `Total request processing time: ${(endTime - startTime).toFixed(2)}ms`
    );

    // Return response with CORS headers and include isSearchPerformed flag and threadId
    return new NextResponse(
      JSON.stringify({
        response,
        isSearchPerformed: isSearchQuery,
        hasStructuredData: hasStructuredData,
        structuredDataType: queryType,
        sessionId: threadId,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": origin || "",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    console.error("Chat API Error:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Failed to generate response",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": origin || "",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  const headersList = headers();
  const origin = (await headersList).get("origin");

  if (!isAllowedOrigin(origin)) {
    return new NextResponse(null, { status: 403 });
  }

  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": origin || "",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
