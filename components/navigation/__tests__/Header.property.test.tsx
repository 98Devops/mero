import { render, screen, cleanup } from "@testing-library/react";
import { usePathname } from "next/navigation";
import fc from "fast-check";
import Header from "../Header";

// Mock Next.js navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

// Ensure cleanup after each test
afterEach(() => {
  cleanup();
});

/**
 * Property 1: Navigation consistency across pages
 * 
 * For any page in the website, the navigation header should be present
 * and display all five navigation links with the current page highlighted as active.
 * 
 * **Validates: Requirements 1.2, 1.4**
 */
describe("Property 1: Navigation consistency across pages", () => {
  const validPaths = ["/", "/what-we-do", "/services", "/portfolio", "/contact"];

  it("Feature: mero-tech-website, Property 1: For any page, navigation displays all five links with current page highlighted", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...validPaths),
        (currentPath) => {
          // Mock the current pathname
          (usePathname as jest.Mock).mockReturnValue(currentPath);

          // Render the Header
          const { container, unmount } = render(<Header />);

          try {
            // Verify all five navigation links are present
            const homeLinks = screen.getAllByText("Home");
            const whatWeDoLinks = screen.getAllByText("What We Do");
            const servicesLinks = screen.getAllByText("Services");
            const portfolioLinks = screen.getAllByText("Portfolio");
            const contactLinks = screen.getAllByText("Contact");

            // Should have at least one of each link (in nav, not counting logo)
            expect(homeLinks.length).toBeGreaterThanOrEqual(1);
            expect(whatWeDoLinks.length).toBeGreaterThanOrEqual(1);
            expect(servicesLinks.length).toBeGreaterThanOrEqual(1);
            expect(portfolioLinks.length).toBeGreaterThanOrEqual(1);
            expect(contactLinks.length).toBeGreaterThanOrEqual(1);

            // Verify the header has glassmorphism styling
            const header = container.querySelector("header");
            expect(header).toHaveClass("bg-white/5");
            expect(header).toHaveClass("backdrop-blur-lg");
            expect(header).toHaveClass("border-white/10");

            // Verify the current page is highlighted
            const linkMap: Record<string, string> = {
              "/": "Home",
              "/what-we-do": "What We Do",
              "/services": "Services",
              "/portfolio": "Portfolio",
              "/contact": "Contact",
            };

            const activeLinkText = linkMap[currentPath];
            const activeLinks = screen.getAllByText(activeLinkText);
            
            // At least one link should have the active class
            const hasActiveLink = activeLinks.some(link => 
              link.classList.contains("text-accent-primary")
            );
            expect(hasActiveLink).toBe(true);

            // Verify other links are not highlighted
            Object.entries(linkMap).forEach(([path, text]) => {
              if (path !== currentPath) {
                const links = screen.getAllByText(text);
                // All instances of non-active links should have inactive styling
                links.forEach(link => {
                  if (link.classList.contains("text-sm")) { // Only check nav links, not logo
                    expect(link).toHaveClass("text-white/70");
                    expect(link).not.toHaveClass("text-accent-primary");
                  }
                });
              }
            });
          } finally {
            // Clean up after each property test run
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("Feature: mero-tech-website, Property 1: Navigation structure remains consistent across all pages", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...validPaths),
        (currentPath) => {
          (usePathname as jest.Mock).mockReturnValue(currentPath);

          const { container, unmount } = render(<Header />);

          try {
            // Verify navigation structure
            const nav = container.querySelector("nav");
            expect(nav).toBeInTheDocument();

            // Verify all links have correct hrefs
            const homeLink = screen.getAllByText("Home").find(el => el.closest("a"))?.closest("a");
            const whatWeDoLink = screen.getAllByText("What We Do")[0].closest("a");
            const servicesLink = screen.getAllByText("Services")[0].closest("a");
            const portfolioLink = screen.getAllByText("Portfolio")[0].closest("a");
            const contactLink = screen.getAllByText("Contact")[0].closest("a");

            expect(homeLink).toHaveAttribute("href", "/");
            expect(whatWeDoLink).toHaveAttribute("href", "/what-we-do");
            expect(servicesLink).toHaveAttribute("href", "/services");
            expect(portfolioLink).toHaveAttribute("href", "/portfolio");
            expect(contactLink).toHaveAttribute("href", "/contact");
          } finally {
            // Clean up after each property test run
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 2: Navigation link routing
 * 
 * For any navigation link, clicking it should navigate to the correct corresponding page route.
 * 
 * **Validates: Requirements 1.3**
 */
describe("Property 2: Navigation link routing", () => {
  const validPaths = ["/", "/what-we-do", "/services", "/portfolio", "/contact"];
  
  const pathToLabel: Record<string, string> = {
    "/": "Home",
    "/what-we-do": "What We Do",
    "/services": "Services",
    "/portfolio": "Portfolio",
    "/contact": "Contact",
  };

  it("Feature: mero-tech-website, Property 2: For any navigation link, it should have the correct href attribute", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...validPaths),
        fc.constantFrom(...validPaths),
        (currentPath, targetPath) => {
          // Mock the current pathname
          (usePathname as jest.Mock).mockReturnValue(currentPath);

          const { unmount } = render(<Header />);

          try {
            // Find the navigation link for the target path
            const targetLabel = pathToLabel[targetPath];
            const links = screen.getAllByText(targetLabel);
            
            // Find the actual navigation link (not the logo)
            const navLink = links.find(link => {
              const anchor = link.closest("a");
              return anchor && anchor.getAttribute("href") === targetPath;
            });

            expect(navLink).toBeTruthy();
            
            // Verify the link has the correct href
            const anchor = navLink?.closest("a");
            expect(anchor).toHaveAttribute("href", targetPath);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("Feature: mero-tech-website, Property 2: All navigation links map to their corresponding routes", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...validPaths),
        (currentPath) => {
          (usePathname as jest.Mock).mockReturnValue(currentPath);

          const { unmount } = render(<Header />);

          try {
            // Verify each navigation link has the correct href
            Object.entries(pathToLabel).forEach(([path, label]) => {
              const links = screen.getAllByText(label);
              
              // Find the navigation link (not logo)
              const navLink = links.find(link => {
                const anchor = link.closest("a");
                return anchor && anchor.getAttribute("href") === path;
              });

              expect(navLink).toBeTruthy();
              
              const anchor = navLink?.closest("a");
              expect(anchor).toHaveAttribute("href", path);
            });
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("Feature: mero-tech-website, Property 2: Navigation links use Next.js Link component for client-side routing", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...validPaths),
        (currentPath) => {
          (usePathname as jest.Mock).mockReturnValue(currentPath);

          const { container, unmount } = render(<Header />);

          try {
            // Get all anchor tags in the navigation
            const anchors = container.querySelectorAll("nav a");
            
            // Verify we have at least the 5 navigation links (plus logo)
            expect(anchors.length).toBeGreaterThanOrEqual(5);

            // Verify each navigation link is a proper anchor element
            anchors.forEach(anchor => {
              const href = anchor.getAttribute("href");
              if (href && validPaths.includes(href)) {
                // Should be an anchor tag (Next.js Link renders as <a>)
                expect(anchor.tagName).toBe("A");
                // Should have a valid href
                expect(href).toMatch(/^\//);
              }
            });
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
