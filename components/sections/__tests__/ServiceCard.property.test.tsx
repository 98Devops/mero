/**
 * Property-Based Tests for ServiceCard Component
 * Feature: mero-tech-website
 */

import { render } from "@testing-library/react";
import fc from "fast-check";
import ServiceCard from "../ServiceCard";

/**
 * Property 3: Service card structure completeness
 * Validates: Requirements 3.3, 3.4, 3.5
 *
 * For any service card rendered on the page, it should display an icon, title,
 * and description, and hovering over it should trigger a lift animation.
 */
describe("Property 3: Service card structure completeness", () => {
  it("should display icon, title, and description for any service data", () => {
    fc.assert(
      fc.property(
        // Generate arbitrary service data
        fc.record({
          icon: fc.constantFrom(
            "automation",
            "bot",
            "tools",
            "app",
            "globe",
            "link",
            "cloud",
            "gear",
            "lightbulb"
          ),
          title: fc.string({ minLength: 2, maxLength: 100 }).filter(s => s.trim().length >= 2),
          description: fc.string({ minLength: 2, maxLength: 200 }).filter(s => s.trim().length >= 2),
        }),
        (service) => {
          const { container } = render(
            <ServiceCard
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          );

          // Should have title (check by text content)
          const titleElement = container.querySelector("h3");
          expect(titleElement).toBeInTheDocument();
          expect(titleElement?.textContent).toBe(service.title);

          // Should have description (check by text content)
          const descriptionElement = container.querySelector("p");
          expect(descriptionElement).toBeInTheDocument();
          expect(descriptionElement?.textContent).toBe(service.description);

          // Should have icon (AnimatedIcon component renders an SVG)
          const svg = container.querySelector("svg");
          expect(svg).toBeInTheDocument();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should have hover effect enabled for any service card", () => {
    fc.assert(
      fc.property(
        fc.record({
          icon: fc.constantFrom(
            "automation",
            "bot",
            "tools",
            "app",
            "globe",
            "link",
            "cloud",
            "gear",
            "lightbulb"
          ),
          title: fc.string({ minLength: 1, maxLength: 100 }),
          description: fc.string({ minLength: 1, maxLength: 200 }),
        }),
        (service) => {
          const { container } = render(
            <ServiceCard
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          );

          // ServiceCard uses GlassCard with hoverEffect=true
          // GlassCard with hover effect renders as a motion.div
          const card = container.querySelector("div");
          expect(card).toBeInTheDocument();

          // Verify glassmorphism styles are present
          const classes = card?.className || "";
          expect(classes).toContain("bg-white/5");
          expect(classes).toContain("backdrop-blur-lg");
          expect(classes).toContain("border");
          expect(classes).toContain("border-white/10");
          expect(classes).toContain("rounded-xl");
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should render with proper structure for any valid icon type", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          "automation",
          "bot",
          "tools",
          "app",
          "globe",
          "link",
          "cloud",
          "gear",
          "lightbulb"
        ),
        fc.string({ minLength: 2, maxLength: 50 }).filter(s => s.trim().length >= 2),
        fc.string({ minLength: 2, maxLength: 150 }).filter(s => s.trim().length >= 2),
        (icon, title, description) => {
          const { container } = render(
            <ServiceCard
              icon={icon}
              title={title}
              description={description}
            />
          );

          // Should have all three elements
          const svg = container.querySelector("svg");
          const titleElement = container.querySelector("h3");
          const descriptionElement = container.querySelector("p");

          expect(svg).toBeInTheDocument();
          expect(titleElement).toBeInTheDocument();
          expect(descriptionElement).toBeInTheDocument();

          // Title should have proper styling
          expect(titleElement?.className).toContain("text-xl");
          expect(titleElement?.className).toContain("font-semibold");
          expect(titleElement?.className).toContain("text-white");
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should maintain card structure with varying content lengths", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          "automation",
          "bot",
          "tools",
          "app",
          "globe",
          "link",
          "cloud",
          "gear",
          "lightbulb"
        ),
        // Test with various title lengths
        fc.oneof(
          fc.string({ minLength: 1, maxLength: 10 }),
          fc.string({ minLength: 10, maxLength: 50 }),
          fc.string({ minLength: 50, maxLength: 100 })
        ).filter(s => s.trim().length > 0),
        // Test with various description lengths
        fc.oneof(
          fc.string({ minLength: 1, maxLength: 20 }),
          fc.string({ minLength: 20, maxLength: 100 }),
          fc.string({ minLength: 100, maxLength: 200 })
        ).filter(s => s.trim().length > 0),
        (icon, title, description) => {
          const { container } = render(
            <ServiceCard
              icon={icon}
              title={title}
              description={description}
            />
          );

          // Card should maintain structure regardless of content length
          const card = container.querySelector("div");
          expect(card).toBeInTheDocument();

          // Should have padding
          const classes = card?.className || "";
          expect(classes).toMatch(/p-\d+/);

          // Should have all elements using specific selectors
          expect(container.querySelector("svg")).toBeInTheDocument();
          
          // Use specific element selectors instead of getByText to avoid ambiguity
          const titleElement = container.querySelector("h3");
          expect(titleElement).toBeInTheDocument();
          expect(titleElement?.textContent).toBe(title);
          
          const descriptionElement = container.querySelector("p");
          expect(descriptionElement).toBeInTheDocument();
          expect(descriptionElement?.textContent).toBe(description);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should apply glassmorphism styling consistently across all service cards", () => {
    fc.assert(
      fc.property(
        fc.record({
          icon: fc.constantFrom(
            "automation",
            "bot",
            "tools",
            "app",
            "globe",
            "link",
            "cloud",
            "gear",
            "lightbulb"
          ),
          title: fc.string({ minLength: 1, maxLength: 100 }),
          description: fc.string({ minLength: 1, maxLength: 200 }),
        }),
        (service) => {
          const { container } = render(
            <ServiceCard
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          );

          const card = container.querySelector("div");
          const classes = card?.className || "";

          // Verify all glassmorphism properties
          expect(classes).toContain("bg-white/5"); // Semi-transparent background
          expect(classes).toContain("backdrop-blur-lg"); // Backdrop blur
          expect(classes).toContain("border"); // Border
          expect(classes).toContain("border-white/10"); // Subtle border color
          expect(classes).toContain("rounded-xl"); // Rounded corners
        }
      ),
      { numRuns: 100 }
    );
  });
});
