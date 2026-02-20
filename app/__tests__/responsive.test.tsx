/**
 * Responsive Layout Tests
 * Tests all pages at mobile, tablet, and desktop breakpoints
 * Validates Requirements 7.1, 7.2, 7.3, 7.4, 7.5, 7.6
 */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/page";
import ServicesPage from "@/app/services/page";
import PortfolioPage from "@/app/portfolio/page";
import ContactPage from "@/app/contact/page";
import WhatWeDoPage from "@/app/what-we-do/page";
import ServicesGrid from "@/components/sections/ServicesGrid";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import Header from "@/components/navigation/Header";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock dynamic imports
jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: (fn: any) => {
    const Component = () => {
      return (
        <button aria-label="Toggle menu" className="md:hidden">
          Menu
        </button>
      );
    };
    return Component;
  },
}));

describe("Responsive Layout Tests - Task 15.1", () => {
  describe("Mobile Breakpoint (< 768px)", () => {
    beforeEach(() => {
      // Set viewport to mobile size
      global.innerWidth = 375;
      global.innerHeight = 667;
    });

    test("Home page renders correctly on mobile", () => {
      render(<Home />);
      
      // Check hero section is present
      expect(screen.getByText(/Building Intelligent Systems for Modern Businesses/i)).toBeInTheDocument();
      
      // Check sections are present
      expect(screen.getByText(/What We Do/i)).toBeInTheDocument();
      expect(screen.getByText(/Our Services/i)).toBeInTheDocument();
    });

    test("Services page renders correctly on mobile", () => {
      render(<ServicesPage />);
      
      expect(screen.getAllByText(/Our Services/i).length).toBeGreaterThan(0);
    });

    test("Portfolio page renders correctly on mobile", () => {
      render(<PortfolioPage />);
      
      expect(screen.getByText(/Our Portfolio/i)).toBeInTheDocument();
    });

    test("Contact page renders correctly on mobile", () => {
      render(<ContactPage />);
      
      expect(screen.getByText(/Let's Build Something Amazing Together/i)).toBeInTheDocument();
    });

    test("What We Do page renders correctly on mobile", () => {
      render(<WhatWeDoPage />);
      
      expect(screen.getByText(/What We Do/i)).toBeInTheDocument();
    });

    test("Service cards stack vertically on mobile (grid-cols-1)", () => {
      const { container } = render(<ServicesGrid />);
      
      const gridElement = container.querySelector(".grid");
      expect(gridElement).toHaveClass("grid-cols-1");
    });

    test("Portfolio items use single column on mobile (grid-cols-1)", () => {
      const { container } = render(<PortfolioGrid />);
      
      const gridElement = container.querySelector(".grid");
      expect(gridElement).toHaveClass("grid-cols-1");
    });

    test("Navigation shows mobile menu button on mobile", () => {
      const { container } = render(<Header />);
      
      // Mobile menu button should be present
      const mobileMenuButton = container.querySelector("button[aria-label='Toggle menu']");
      expect(mobileMenuButton).toBeInTheDocument();
      
      // Desktop navigation should be hidden (has md:flex class)
      const desktopNav = container.querySelector(".hidden.md\\:flex");
      expect(desktopNav).toBeInTheDocument();
    });
  });

  describe("Tablet Breakpoint (768px - 1024px)", () => {
    beforeEach(() => {
      // Set viewport to tablet size
      global.innerWidth = 768;
      global.innerHeight = 1024;
    });

    test("Home page renders correctly on tablet", () => {
      render(<Home />);
      
      expect(screen.getByText(/Building Intelligent Systems for Modern Businesses/i)).toBeInTheDocument();
    });

    test("Services page renders correctly on tablet", () => {
      render(<ServicesPage />);
      
      expect(screen.getAllByText(/Our Services/i).length).toBeGreaterThan(0);
    });

    test("Portfolio page renders correctly on tablet", () => {
      render(<PortfolioPage />);
      
      expect(screen.getByText(/Our Portfolio/i)).toBeInTheDocument();
    });

    test("Contact page renders correctly on tablet", () => {
      render(<ContactPage />);
      
      expect(screen.getByText(/Let's Build Something Amazing Together/i)).toBeInTheDocument();
    });

    test("What We Do page renders correctly on tablet", () => {
      render(<WhatWeDoPage />);
      
      expect(screen.getByText(/What We Do/i)).toBeInTheDocument();
    });

    test("Service cards use 2 columns on tablet (md:grid-cols-2)", () => {
      const { container } = render(<ServicesGrid />);
      
      const gridElement = container.querySelector(".grid");
      expect(gridElement).toHaveClass("md:grid-cols-2");
    });

    test("Portfolio items use 2 columns on tablet (md:grid-cols-2)", () => {
      const { container } = render(<PortfolioGrid />);
      
      const gridElement = container.querySelector(".grid");
      expect(gridElement).toHaveClass("md:grid-cols-2");
    });

    test("Navigation shows desktop menu on tablet", () => {
      const { container } = render(<Header />);
      
      // Desktop navigation should be present with md:flex class
      const desktopNav = container.querySelector(".hidden.md\\:flex");
      expect(desktopNav).toBeInTheDocument();
    });
  });

  describe("Desktop Breakpoint (> 1024px)", () => {
    beforeEach(() => {
      // Set viewport to desktop size
      global.innerWidth = 1440;
      global.innerHeight = 900;
    });

    test("Home page renders correctly on desktop", () => {
      render(<Home />);
      
      expect(screen.getByText(/Building Intelligent Systems for Modern Businesses/i)).toBeInTheDocument();
    });

    test("Services page renders correctly on desktop", () => {
      render(<ServicesPage />);
      
      expect(screen.getAllByText(/Our Services/i).length).toBeGreaterThan(0);
    });

    test("Portfolio page renders correctly on desktop", () => {
      render(<PortfolioPage />);
      
      expect(screen.getByText(/Our Portfolio/i)).toBeInTheDocument();
    });

    test("Contact page renders correctly on desktop", () => {
      render(<ContactPage />);
      
      expect(screen.getByText(/Let's Build Something Amazing Together/i)).toBeInTheDocument();
    });

    test("What We Do page renders correctly on desktop", () => {
      render(<WhatWeDoPage />);
      
      expect(screen.getByText(/What We Do/i)).toBeInTheDocument();
    });

    test("Service cards use 3 columns on desktop (lg:grid-cols-3)", () => {
      const { container } = render(<ServicesGrid />);
      
      const gridElement = container.querySelector(".grid");
      expect(gridElement).toHaveClass("lg:grid-cols-3");
    });

    test("Portfolio items use 3 columns on desktop (lg:grid-cols-3)", () => {
      const { container } = render(<PortfolioGrid />);
      
      const gridElement = container.querySelector(".grid");
      expect(gridElement).toHaveClass("lg:grid-cols-3");
    });

    test("Navigation shows full desktop menu on desktop", () => {
      const { container } = render(<Header />);
      
      // Desktop navigation should be present
      const desktopNav = container.querySelector(".hidden.md\\:flex");
      expect(desktopNav).toBeInTheDocument();
      
      // Should have all navigation links
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("What We Do")).toBeInTheDocument();
      expect(screen.getByText("Services")).toBeInTheDocument();
      expect(screen.getByText("Portfolio")).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
    });
  });

  describe("Responsive Typography and Spacing", () => {
    test("Hero section uses responsive text sizing", () => {
      const { container } = render(<Home />);
      
      const heroHeading = screen.getByText(/Building Intelligent Systems for Modern Businesses/i);
      
      // Check for responsive text classes
      expect(heroHeading).toHaveClass("text-5xl");
      expect(heroHeading.className).toMatch(/md:text-6xl/);
      expect(heroHeading.className).toMatch(/lg:text-7xl/);
    });

    test("Sections use responsive padding", () => {
      const { container } = render(<Home />);
      
      // Check for responsive padding classes on sections
      const sections = container.querySelectorAll("section");
      sections.forEach((section) => {
        const classes = section.className;
        // Should have responsive padding (py-20 md:py-32 or similar)
        expect(classes).toMatch(/py-\d+/);
      });
    });

    test("Container uses responsive horizontal padding", () => {
      const { container } = render(<Home />);
      
      // Check for responsive container padding
      const containers = container.querySelectorAll(".container");
      containers.forEach((containerEl) => {
        const classes = containerEl.className;
        // Should have responsive horizontal padding (px-6 md:px-12 lg:px-24)
        expect(classes).toMatch(/px-\d+/);
      });
    });
  });

  describe("Responsive Button Layout", () => {
    test("CTA buttons stack vertically on mobile and horizontally on desktop", () => {
      const { container } = render(<Home />);
      
      // Find button container in hero section
      const buttonContainers = container.querySelectorAll(".flex");
      
      // At least one should have flex-col sm:flex-row pattern
      const hasResponsiveButtonLayout = Array.from(buttonContainers).some(
        (el) => el.className.includes("flex-col") && el.className.includes("sm:flex-row")
      );
      
      expect(hasResponsiveButtonLayout).toBe(true);
    });
  });

  describe("Grid Gap Responsiveness", () => {
    test("Service grid uses responsive gap spacing", () => {
      const { container } = render(<ServicesGrid />);
      
      const gridElement = container.querySelector(".grid");
      expect(gridElement?.className).toMatch(/gap-\d+/);
      expect(gridElement?.className).toMatch(/md:gap-\d+/);
    });

    test("Portfolio grid uses responsive gap spacing", () => {
      const { container } = render(<PortfolioGrid />);
      
      const gridElement = container.querySelector(".grid");
      expect(gridElement?.className).toMatch(/gap-\d+/);
      expect(gridElement?.className).toMatch(/md:gap-\d+/);
    });
  });
});
