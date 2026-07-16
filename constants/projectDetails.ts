export type ProjectProps = {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  keywords: string[];
  github: string;
  demo: string;
  image: string;
  available: boolean;
};

export const devProjects = [
  {
    id: 0,
    name: "Rendition",
    description: 'The official digital presence of Rendition, the premier Theatre Society of LNMIIT. Features a 3D immersive experience, enrollment system, and complete club management.',
    technologies: ["React", "Nodejs", "MongoDB", "JavaScript", "Tailwind CSS", "Framer Motion"],
    keywords: ["rendition", "lnmiit", "javascript", "theatre", "society", "club-website", "auditions", "recruitment","enrollment-form", "gallery", "contact-form", "3d", "3d-visuals", "3d-animations", "react", "reactjs", "vite", "tailwind", "tailwindcss", "postcss", "threejs", "three.js", "react-three-fiber", "drei", "gsap", "framer-motion","lucide-react", "cloudinary", "emailjs", "nodemailer", "node", "nodejs", "express", "mongodb", "mongoose", "jwt", "jsonwebtoken", "bcryptjs", "multer", "smooth-page-transitions", "registration" , "authentication", "protected-routes", "file", "uploads", "media-management", "contact-and-inquiries", "responsive", "mobile", "friendly"],
    github: "https://github.com/Devharsh01/Rendition-Website",
    demo: "https://rendition.onrender.com/",
    image: require("public/projects/rendition(2).png"),
    available: true,
  },
  {
    id: 1,
    name: "Fashion Cave",
    description:
      "A modern, full-stack e-commerce platform tailored for fashion retail, featuring a dynamic storefront, a dedicated admin dashboard, and a robust backend API.",
    technologies: ["React", "Nodejs", "Express", "MongoDB", "Stripe"],
    keywords: ["fashion-cave", "fashion", "javascript", "retail", "ecommerce", "e-commerce", "infinite-scroll", "infinite-product-scroll", "admin", "inventory-management", "checkout", "cart", "react", "reactjs", "react-router-dom", "node", "nodejs", "express", "mongodb", "mongoose", "stripe", "stripe-api","nodemailer", "multer", "gsap", "locomotive-scroll", "lottie", "lottie-web", "jwt", "jsonwebtoken", "bcryptjs", "validator", "dotenv", "responsive-design", "mobile-first", "infinite-scrolling-catalog", "client-side-cart", "server-side-api", "authentication","admin-panel", "payment", "stripe", "email", "file"],
    github: "https://github.com/Devharsh01/Fashion-Cave",
    demo: "https://fashion-cave-frontend.onrender.com/",
    image: require("public/projects/FashionCave.png"),
    available: true,
  },
  {
    id: 2,
    name: "Patient MS",
    description:
      "A microservices-based Patient Management System decomposing the application into 5+ independent services (patient, appointment, billing), improving modularity and enabling 60% faster feature development.",
    technologies: ["Java", "Spring Boot", "Microservices", "Kafka", "Docker", "AWS LocalStack"],
    keywords: ["patient-management", "java", "spring-boot", "microservices", "kafka", "docker", "localstack", "aws", "backend", "scalable", "distributed-systems", "billing", "appointment", "rest-api", "rest", "api", "spring-cloud", "sql", "postgresql", "maven", "containers", "sqs", "sns", "s3", "cloud-computing", "spring", "spring-mvc", "spring-data-jpa", "jpa", "hibernate", "message-broker", "localstack-aws", "aws-localstack"],
    github: "https://github.com/Devharsh01/Patient-Management-System",
    demo: "",
    image: require("public/projects/PMS.png"),
    available: true,
  },
  {
    id: 3,
    name: "Exec OS",
    description:
      "A full-stack autonomous AI 'Executive Assistant' SaaS that runs background tasks autonomously, processes Gmail/Calendar data via Claude API and OAuth 2.0, with Drizzle ORM and PostgreSQL.",
    technologies: ["Next.js", "React", "TypeScript", "Vercel AI SDK", "Claude API", "Drizzle ORM", "PostgreSQL"],
    keywords: ["exec-os", "ai-agent", "autonomous", "vercel-ai-sdk", "claude-api", "cron", "drizzle", "postgresql", "saas", "agentic-workflows", "react", "reactjs", "nextjs", "next.js", "typescript", "ts", "javascript", "js", "node", "nodejs", "anthropic", "claude", "gmail", "calendar", "google-calendar", "oauth", "oauth-2.0", "google-oauth", "gmail-api", "google-apis", "database", "orm", "tailwindcss", "tailwind", "tailwind-css", "ai", "artificial-intelligence", "llm", "large-language-models", "background-tasks", "scheduler", "automation", "productivity", "saas-platform", "openai-alternative", "serverless", "vercel", "edge-functions", "react-query", "tanstack-query", "shadcn-ui", "radix-ui", "lucide-react", "zod", "email-automation", "workflow-automation", "task-management", "autonomous-agents"],
    github: "https://github.com/Devharsh01/Exec-OS",
    demo: "https://exec-os-executive-assistant.vercel.app/",
    image: require("public/projects/ExecOS.png"),
    available: true,
  }
];
