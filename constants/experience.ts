export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: "Software Engineer Intern",
    company: "Flexport",
    period: "Jan 2026 - Jun 2026",
    description: [
      "Architected, designed, implemented, and delivered a highly scalable Progressive Web App (PWA) by designing automation frameworks and writing unit/functional tests to drive up code coverage; drove 480+ daily scans and cut non-compliance resolution time by 50%.",
      "Resolved a critical device security vulnerability by debugging an Android scanner over ADB to trace bearer token leakage, architecting a secure HMAC signed-token authentication flow and replacing long-lived JWTs.",
      "Optimized cloud infrastructure by diagnosing and decommissioning silently failing services (AWS Lambda, RDS, SQS, API Gateway) using Terraform, generating USD 900+/month in cloud cost savings.",
      "Utilized telemetry and metrics to drive operational excellence by integrating real-time Slack and PagerDuty alerting, transforming silent sync failures into proactive on-call notifications to ensure platform stability."
    ],
    technologies: ["TypeScript", "Node.js", "React.js", "AWS", "MySQL", "Snowflake", "Terraform", "CI/CD"]
  },
  {
    id: 2,
    role: "Product Engineer Summer Intern",
    company: "Deloitte",
    period: "May 2025 - Jul 2025",
    description: [
      "Built a scalable full-stack Performance Management System to optimize employee goal tracking, performance evaluation, and role-based workflow communication.",
      "Analyzed, designed, and developed robust test cases, implementing automated test suites for the backend (Node.js, Express.js, PostgreSQL) to ensure secure REST API communication.",
      "Collaborated closely with a team of engineers, product managers, and user experience experts to build new scalable features, optimizing employee goal tracking and multi-team communication."
    ],
    technologies: ["HTML/CSS", "TypeScript", "React.js", "Express.js", "Node.js", "PostgreSQL", "MSAL Authentication"]
  }
];
