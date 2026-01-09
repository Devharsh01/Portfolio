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
    image: require("E:\\All programs\\WebD\\Portfolio-v2\\public\\projects\\odunsi.png"),
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
    image: require("../public/projects/synthetix-flip.png"),
    available: true,
  }
];