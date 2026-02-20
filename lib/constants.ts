export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  category: "ai-automation" | "development" | "infrastructure" | "consulting";
}

export interface Project {
  id: string;
  name: string;
  category: "ai-automation" | "web-app" | "internal-tool" | "infrastructure" | "integration";
  description: string;
  techStack: string[];
  imageUrl: string;
  projectUrl?: string;
  featured: boolean;
}

export const services: Service[] = [
  {
    id: "ai-automations",
    icon: "automation",
    title: "AI Automations & Workflows",
    description: "Streamline operations with intelligent automation",
    category: "ai-automation",
  },
  {
    id: "ai-agents",
    icon: "bot",
    title: "AI Agents & Chatbots",
    description: "Build intelligent conversational interfaces",
    category: "ai-automation",
  },
  {
    id: "internal-tools",
    icon: "tools",
    title: "Internal Business Tools",
    description: "Custom solutions for your team's workflow",
    category: "development",
  },
  {
    id: "web-apps",
    icon: "app",
    title: "Web Applications",
    description: "Scalable, modern web applications",
    category: "development",
  },
  {
    id: "websites",
    icon: "globe",
    title: "Website Development",
    description: "Professional websites that convert",
    category: "development",
  },
  {
    id: "api-integrations",
    icon: "link",
    title: "API Integrations",
    description: "Connect your systems seamlessly",
    category: "development",
  },
  {
    id: "cloud-infrastructure",
    icon: "cloud",
    title: "Cloud Infrastructure",
    description: "Reliable, scalable cloud solutions",
    category: "infrastructure",
  },
  {
    id: "devops",
    icon: "gear",
    title: "DevOps Engineering",
    description: "Streamline deployment and operations",
    category: "infrastructure",
  },
  {
    id: "ai-consulting",
    icon: "lightbulb",
    title: "AI Consulting",
    description: "Strategic guidance for AI adoption",
    category: "consulting",
  },
];

export const projects: Project[] = [
  {
    id: "inventory-automation",
    name: "Inventory Management Automation",
    category: "ai-automation",
    description: "AI-powered inventory tracking system that automatically reorders stock and predicts demand patterns",
    techStack: ["Python", "TensorFlow", "FastAPI", "PostgreSQL"],
    imageUrl: "/images/portfolio/inventory-automation.png",
    projectUrl: "#",
    featured: true,
  },
  {
    id: "customer-support-bot",
    name: "Customer Support AI Agent",
    category: "ai-automation",
    description: "Intelligent chatbot handling 80% of customer inquiries with natural language understanding",
    techStack: ["OpenAI", "LangChain", "Next.js", "Redis"],
    imageUrl: "/images/portfolio/support-bot.png",
    projectUrl: "#",
    featured: true,
  },
  {
    id: "ecommerce-platform",
    name: "E-Commerce Platform",
    category: "web-app",
    description: "Full-featured online store with payment processing, inventory management, and analytics",
    techStack: ["Next.js", "Stripe", "PostgreSQL", "TailwindCSS"],
    imageUrl: "/images/portfolio/ecommerce.png",
    projectUrl: "#",
    featured: true,
  },
  {
    id: "project-management-tool",
    name: "Project Management Dashboard",
    category: "internal-tool",
    description: "Custom project tracking system with team collaboration, time tracking, and reporting features",
    techStack: ["React", "Node.js", "MongoDB", "Socket.io"],
    imageUrl: "/images/portfolio/project-management.svg",
    projectUrl: "#",
    featured: false,
  },
  {
    id: "healthcare-portal",
    name: "Healthcare Patient Portal",
    category: "web-app",
    description: "HIPAA-compliant patient portal for appointment scheduling, medical records, and telemedicine",
    techStack: ["Next.js", "AWS", "PostgreSQL", "Twilio"],
    imageUrl: "/images/portfolio/healthcare-portal.svg",
    projectUrl: "#",
    featured: false,
  },
  {
    id: "crm-integration",
    name: "Multi-Platform CRM Integration",
    category: "integration",
    description: "Unified CRM system integrating Salesforce, HubSpot, and custom databases with real-time sync",
    techStack: ["Node.js", "GraphQL", "Redis", "Docker"],
    imageUrl: "/images/portfolio/crm-integration.svg",
    projectUrl: "#",
    featured: false,
  },
  {
    id: "cloud-migration",
    name: "Enterprise Cloud Migration",
    category: "infrastructure",
    description: "Complete migration of legacy systems to AWS with zero downtime and 40% cost reduction",
    techStack: ["AWS", "Terraform", "Kubernetes", "Docker"],
    imageUrl: "/images/portfolio/cloud-migration.png",
    projectUrl: "#",
    featured: true,
  },
  {
    id: "hr-management-system",
    name: "HR Management System",
    category: "internal-tool",
    description: "Comprehensive HR platform for employee onboarding, performance reviews, and leave management",
    techStack: ["Vue.js", "Django", "PostgreSQL", "Celery"],
    imageUrl: "/images/portfolio/hr-system.svg",
    projectUrl: "#",
    featured: false,
  },
  {
    id: "analytics-dashboard",
    name: "Real-Time Analytics Dashboard",
    category: "web-app",
    description: "Business intelligence dashboard with real-time data visualization and custom reporting",
    techStack: ["React", "D3.js", "Python", "ClickHouse"],
    imageUrl: "/images/portfolio/analytics-dashboard.svg",
    projectUrl: "#",
    featured: false,
  },
  {
    id: "payment-gateway-integration",
    name: "Payment Gateway Integration",
    category: "integration",
    description: "Multi-currency payment system integrating Stripe, PayPal, and local payment providers",
    techStack: ["Node.js", "Express", "PostgreSQL", "Stripe"],
    imageUrl: "/images/portfolio/payment-gateway.svg",
    projectUrl: "#",
    featured: false,
  },
  {
    id: "devops-pipeline",
    name: "CI/CD Pipeline Automation",
    category: "infrastructure",
    description: "Automated deployment pipeline with testing, security scanning, and rollback capabilities",
    techStack: ["GitHub Actions", "Docker", "Kubernetes", "ArgoCD"],
    imageUrl: "/images/portfolio/devops-pipeline.svg",
    projectUrl: "#",
    featured: false,
  },
  {
    id: "document-processing",
    name: "AI Document Processing System",
    category: "ai-automation",
    description: "Automated document extraction and classification using computer vision and NLP",
    techStack: ["Python", "OpenCV", "spaCy", "FastAPI"],
    imageUrl: "/images/portfolio/document-processing.svg",
    projectUrl: "#",
    featured: false,
  },
];
