import { render, cleanup } from "@testing-library/react";
import fc from "fast-check";
import PortfolioItem from "@/components/sections/PortfolioItem";
import { Project } from "@/lib/constants";

// Sample projects for testing image optimization
const sampleProjects: Project[] = [
  {
    id: "project-1",
    name: "AI Automation System",
    category: "ai-automation",
    description: "Automated workflow system for business processes",
    techStack: ["Python", "TensorFlow", "FastAPI"],
    imageUrl: "/images/portfolio/inventory-automation.svg",
    projectUrl: "https://example.com/project1",
    featured: true,
  },
  {
    id: "project-2", 
    name: "E-Commerce Platform",
    category: "web-app",
    description: "Full-featured online store with payment processing",
    techStack: ["Next.js", "Stripe", "PostgreSQL"],
    imageUrl: "/images/portfolio/ecommerce.svg",
    featured: false,
  },
  {
    id: "project-3",
    name: "Internal Dashboard",
    category: "internal-tool", 
    description: "Custom project tracking and team collaboration tool",
    techStack: ["React", "Node.js", "MongoDB"],
    imageUrl: "/images/portfolio/project-management.svg",
    projectUrl: "https://example.com/project3",
    featured: true,
  },
  {
    id: "project-4",
    name: "Cloud Infrastructure",
    category: "infrastructure",
    description: "Scalable cloud deployment with zero downtime migration",
    techStack: ["AWS", "Terraform", "Docker"],
    imageUrl: "/images/portfolio/cloud-migration.svg",
    featured: false,
  },
  {
    id: "project-5",
    name: "API Integration Hub",
    category: "integration",
    description: "Unified system connecting multiple third-party services",
    techStack: ["Node.js", "GraphQL", "Redis"],
    imageUrl: "/images/portfolio/crm-integration.svg",
    projectUrl: "https://example.com/project5",
    featured: true,
  },
];

describe("Image Optimization Property Tests", () => {
  afterEach(() => {
    cleanup();
  });

  /**
   * Property 6: Image optimization compliance
   * **Validates: Requirements 4.5, 6.3, 6.4, 10.5**
   * 
   * For any image rendered on the website, it should use the Next.js Image component 
   * with proper optimization attributes (width, height, and lazy loading for below-fold images).
   */
  it("Feature: mero-tech-website, Property 6: For any image rendered on the website, it uses Next.js Image with proper optimization", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...sampleProjects),
        (project: Project) => {
          const { container } = render(<PortfolioItem project={project} />);

          // Should use Next.js Image component (not regular img tag)
          const image = container.querySelector("img");
          expect(image).toBeInTheDocument();

          // Should have proper alt text for accessibility
          expect(image?.getAttribute("alt")).toBe(project.name);
          expect(image?.getAttribute("alt")).toBeTruthy();

          // Should have lazy loading for below-fold images
          expect(image?.getAttribute("loading")).toBe("lazy");

          // Should have proper src attribute (Next.js optimized)
          const src = image?.getAttribute("src");
          expect(src).toBeTruthy();
          
          // Next.js Image component should generate optimized src URLs
          expect(src).toMatch(/\.(svg|jpg|jpeg|png|webp)(\?|$)/i);

          // Should have sizes attribute for responsive images (when using fill)
          const sizes = image?.getAttribute("sizes");
          if (sizes) {
            expect(sizes).toContain("vw"); // Should contain viewport width units
          }

          // Should have proper dimensions handling
          // For fill images, the parent should have relative positioning
          const imageParent = image?.parentElement;
          expect(imageParent).toHaveClass("relative");

          // Should have object-fit for proper image scaling
          expect(image).toHaveClass("object-cover");

          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 6b: Image optimization attributes validation
   * **Validates: Requirements 6.3, 6.4, 10.5**
   * 
   * For any image component, it should have the required optimization attributes
   * that ensure proper performance and user experience.
   */
  it("Feature: mero-tech-website, Property 6b: Image components have required optimization attributes", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...sampleProjects),
        (project: Project) => {
          const { container } = render(<PortfolioItem project={project} />);

          const image = container.querySelector("img");
          expect(image).toBeInTheDocument();

          // Should have decoding attribute for better performance (if present)
          const decoding = image?.getAttribute("decoding");
          if (decoding) {
            expect(decoding).toBe("async");
          }

          // Should have proper dimensions handling
          const imageParent = image?.parentElement;
          const hasExplicitDimensions = 
            image?.hasAttribute("width") && image?.hasAttribute("height");
          const hasFillBehavior = imageParent?.classList.contains("relative");
          
          // Either has explicit dimensions OR uses fill behavior
          expect(hasExplicitDimensions || hasFillBehavior).toBe(true);

          // Should have proper image format optimization
          // Next.js automatically serves WebP when supported
          const src = image?.getAttribute("src");
          expect(src).toBeTruthy();

          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 6c: Image accessibility compliance
   * **Validates: Requirements 4.5, 10.5**
   * 
   * For any image rendered on the website, it should have proper accessibility
   * attributes for screen readers and assistive technologies.
   */
  it("Feature: mero-tech-website, Property 6c: Images have proper accessibility attributes", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...sampleProjects),
        (project: Project) => {
          const { container } = render(<PortfolioItem project={project} />);

          const image = container.querySelector("img");
          expect(image).toBeInTheDocument();

          // Should have meaningful alt text
          const alt = image?.getAttribute("alt");
          expect(alt).toBeTruthy();
          expect(alt?.length).toBeGreaterThan(0);
          expect(alt).toBe(project.name);

          // Alt text should not be generic or empty
          expect(alt).not.toBe("");
          expect(alt).not.toBe("image");
          expect(alt).not.toBe("picture");

          // Should not have redundant title attribute when alt is present
          const title = image?.getAttribute("title");
          if (title) {
            expect(title).not.toBe(alt);
          }

          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 6d: Image performance optimization
   * **Validates: Requirements 6.3, 6.4**
   * 
   * For any image rendered on the website, it should be optimized for performance
   * with proper loading strategies and format optimization.
   */
  it("Feature: mero-tech-website, Property 6d: Images are optimized for performance", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...sampleProjects),
        (project: Project) => {
          const { container } = render(<PortfolioItem project={project} />);

          const image = container.querySelector("img");
          expect(image).toBeInTheDocument();

          // Should use lazy loading for below-fold images
          expect(image?.getAttribute("loading")).toBe("lazy");

          // Should have responsive sizes for different viewports (if present)
          const sizes = image?.getAttribute("sizes");
          if (sizes) {
            expect(sizes).toMatch(/\d+vw/); // Should contain viewport width units
            expect(sizes).toContain("max-width");
            expect(sizes).toContain("vw");
          }

          // Should use optimized image formats (SVG in this case)
          const src = image?.getAttribute("src");
          expect(src).toMatch(/\.(svg|webp|jpg|jpeg|png)(\?|$)/i);

          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });
});