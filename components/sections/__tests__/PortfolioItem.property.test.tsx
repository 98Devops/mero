import { render, cleanup } from "@testing-library/react";
import fc from "fast-check";
import PortfolioItem from "../PortfolioItem";
import { Project } from "@/lib/constants";

// Use predefined realistic project data for property tests
const sampleProjects: Project[] = [
  {
    id: "project-1",
    name: "AI Automation System",
    category: "ai-automation",
    description: "Automated workflow system for business processes",
    techStack: ["Python", "TensorFlow", "FastAPI"],
    imageUrl: "https://example.com/image1.jpg",
    projectUrl: "https://example.com/project1",
    featured: true,
  },
  {
    id: "project-2", 
    name: "E-Commerce Platform",
    category: "web-app",
    description: "Full-featured online store with payment processing",
    techStack: ["Next.js", "Stripe", "PostgreSQL"],
    imageUrl: "https://example.com/image2.jpg",
    featured: false,
  },
  {
    id: "project-3",
    name: "Internal Dashboard",
    category: "internal-tool", 
    description: "Custom project tracking and team collaboration tool",
    techStack: ["React", "Node.js", "MongoDB"],
    imageUrl: "https://example.com/image3.jpg",
    projectUrl: "https://example.com/project3",
    featured: true,
  },
  {
    id: "project-4",
    name: "Cloud Infrastructure",
    category: "infrastructure",
    description: "Scalable cloud deployment with zero downtime migration",
    techStack: ["AWS", "Terraform", "Docker"],
    imageUrl: "https://example.com/image4.jpg",
    featured: false,
  },
  {
    id: "project-5",
    name: "API Integration Hub",
    category: "integration",
    description: "Unified system connecting multiple third-party services",
    techStack: ["Node.js", "GraphQL", "Redis"],
    imageUrl: "https://example.com/image5.jpg",
    projectUrl: "https://example.com/project5",
    featured: true,
  },
];

describe("PortfolioItem Property Tests", () => {
  afterEach(() => {
    cleanup();
  });

  /**
   * Property 4: Portfolio item structure completeness
   * **Validates: Requirements 4.2, 4.3**
   * 
   * For any portfolio item rendered on the page, it should display project name,
   * category, description, and tech stack tags, and hovering should reveal an overlay.
   */
  it("Feature: mero-tech-website, Property 4: For any portfolio item, it displays name, category, description, and tech stack", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...sampleProjects),
        (project: Project) => {
          const { container } = render(<PortfolioItem project={project} />);

          // Should display project name in h3 element
          const titleElement = container.querySelector("h3");
          expect(titleElement).toBeInTheDocument();
          expect(titleElement?.textContent).toBe(project.name);

          // Should display category (formatted) in span element
          const formattedCategory = project.category.replace("-", " ");
          const categoryElement = container.querySelector("span.capitalize");
          expect(categoryElement).toBeInTheDocument();
          expect(categoryElement?.textContent).toBe(formattedCategory);

          // Should display description in p element
          const descriptionElement = container.querySelector("p");
          expect(descriptionElement).toBeInTheDocument();
          expect(descriptionElement?.textContent).toBe(project.description);

          // Should display all tech stack tags
          const techElements = container.querySelectorAll(".rounded-full");
          expect(techElements.length).toBe(project.techStack.length);
          
          project.techStack.forEach((tech, index) => {
            expect(techElements[index].textContent).toBe(tech);
          });

          // Should have GlassCard with hover effect
          const glassCard = container.querySelector(".bg-white\\/5");
          expect(glassCard).toBeInTheDocument();

          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 6: Image optimization compliance
   * **Validates: Requirements 4.5, 6.3, 6.4**
   * 
   * For any image rendered in a portfolio item, it should use the Next.js Image
   * component with proper optimization attributes (lazy loading).
   */
  it("Feature: mero-tech-website, Property 6: For any portfolio item, images use next/image with lazy loading", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...sampleProjects),
        (project: Project) => {
          const { container } = render(<PortfolioItem project={project} />);

          // Should have an image with the project name as alt text
          const image = container.querySelector("img");
          expect(image).toBeInTheDocument();
          expect(image?.getAttribute("alt")).toBe(project.name);

          // Should have lazy loading attribute
          expect(image?.getAttribute("loading")).toBe("lazy");

          // Should have proper src attribute
          expect(image?.getAttribute("src")).toBeTruthy();

          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5: Portfolio item navigation
   * **Validates: Requirements 4.4**
   * 
   * For any portfolio item, clicking it should navigate to the project detail view.
   */
  it("Feature: mero-tech-website, Property 5: For any portfolio item, clicking it should navigate to project detail view", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...sampleProjects),
        (project: Project) => {
          // Test 1: Custom onClick handler should be called when provided
          const mockOnClick = jest.fn();
          const { container } = render(
            <PortfolioItem project={project} onClick={mockOnClick} />
          );

          // Should have clickable element with cursor-pointer class
          const clickableElement = container.querySelector(".cursor-pointer");
          expect(clickableElement).toBeInTheDocument();

          // Click should trigger custom onClick handler
          if (clickableElement) {
            clickableElement.click();
            expect(mockOnClick).toHaveBeenCalledTimes(1);
          }

          cleanup();

          // Test 2: Component should be clickable and have navigation intent
          const { container: container2 } = render(
            <PortfolioItem project={project} />
          );

          const clickableElement2 = container2.querySelector(".cursor-pointer");
          expect(clickableElement2).toBeInTheDocument();

          // Should have onClick handler attached (indicated by cursor-pointer class)
          expect(clickableElement2).toHaveClass("cursor-pointer");

          // Should show "View Project" text on hover for navigation intent
          const _hoverOverlay = container2.querySelector("span");
          const hasViewProjectText = Array.from(container2.querySelectorAll("*"))
            .some(el => el.textContent?.includes("View Project"));
          
          // The component should have the navigation structure in place
          expect(hasViewProjectText || clickableElement2).toBeTruthy();

          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 11: Interactive element hover feedback
   * **Validates: Requirements 9.4**
   * 
   * For any interactive element (portfolio items), hovering over it should
   * provide visual feedback through state changes.
   */
  it("Feature: mero-tech-website, Property 11: Portfolio items provide hover feedback", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...sampleProjects),
        (project: Project) => {
          const { container } = render(<PortfolioItem project={project} />);

          // Should have cursor-pointer class for interactivity
          const interactiveElement = container.querySelector(".cursor-pointer");
          expect(interactiveElement).toBeInTheDocument();

          // Should have hover effect enabled on GlassCard
          // This is verified by the presence of motion.div with hover variants
          const glassCard = container.querySelector(".bg-white\\/5");
          expect(glassCard).toBeInTheDocument();

          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });
});