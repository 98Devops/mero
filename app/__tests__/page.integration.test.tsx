import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import Home from "../page";

// Mock Next.js navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

// Mock next/dynamic to return components synchronously
jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: (fn: any) => {
    const Component = fn();
    return Component.default || Component;
  },
}));

// Mock Framer Motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

// Mock the Button component to avoid Framer Motion issues
jest.mock("@/components/ui/Button", () => {
  return function MockButton({ children, variant, className, ...props }: any) {
    return (
      <button className={`btn btn-${variant} ${className || ""}`} {...props}>
        {children}
      </button>
    );
  };
});

// Mock the child components to focus on integration testing
jest.mock("@/components/sections/HeroSection", () => {
  return function MockHeroSection() {
    return (
      <section data-testid="hero-section">
        <h1>Building Intelligent Systems for Modern Businesses</h1>
        <p>AI Automation. Internal Tools. Scalable Infrastructure.</p>
        <a href="/contact">Book a Consultation</a>
        <a href="/portfolio">View Our Work</a>
      </section>
    );
  };
});

jest.mock("@/components/sections/ServicesGrid", () => {
  const MockServicesGrid = () => {
    return (
      <div data-testid="services-grid">
        <div>AI Automations & Workflows</div>
        <div>AI Agents & Chatbots</div>
        <div>Internal Business Tools</div>
      </div>
    );
  };
  return {
    __esModule: true,
    default: MockServicesGrid,
  };
});

jest.mock("@/components/sections/PortfolioGrid", () => {
  const MockPortfolioGrid = ({ showFeaturedOnly }: { showFeaturedOnly?: boolean }) => {
    return (
      <div data-testid="portfolio-grid" data-featured-only={showFeaturedOnly}>
        <div>Featured Project 1</div>
        <div>Featured Project 2</div>
      </div>
    );
  };
  return {
    __esModule: true,
    default: MockPortfolioGrid,
  };
});

describe("Home Page Integration", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/");
  });

  describe("Page Structure", () => {
    it("renders all required sections", () => {
      render(<Home />);

      // Hero Section (Requirement 2.1)
      expect(screen.getByTestId("hero-section")).toBeInTheDocument();
      expect(screen.getByText("Building Intelligent Systems for Modern Businesses")).toBeInTheDocument();
      expect(screen.getByText("AI Automation. Internal Tools. Scalable Infrastructure.")).toBeInTheDocument();

      // What We Do Section
      expect(screen.getByText("What We Do")).toBeInTheDocument();
      expect(screen.getByText(/We partner with forward-thinking businesses/)).toBeInTheDocument();

      // Services Section (Requirement 3.1)
      expect(screen.getByText("Our Services")).toBeInTheDocument();
      expect(screen.getByTestId("services-grid")).toBeInTheDocument();

      // Featured Portfolio Section (Requirement 4.1)
      expect(screen.getByText("Featured Work")).toBeInTheDocument();
      expect(screen.getByTestId("portfolio-grid")).toBeInTheDocument();

      // Contact CTA Section
      expect(screen.getByText("Ready to Build Something Great?")).toBeInTheDocument();
      expect(screen.getByText("Get In Touch")).toBeInTheDocument();
    });

    it("displays correct section headings", () => {
      render(<Home />);

      const headings = [
        "What We Do",
        "Our Services", 
        "Featured Work",
        "Ready to Build Something Great?"
      ];

      headings.forEach(heading => {
        expect(screen.getByText(heading)).toBeInTheDocument();
      });
    });

    it("displays section descriptions", () => {
      render(<Home />);

      expect(screen.getByText("Comprehensive technology solutions tailored to your business needs")).toBeInTheDocument();
      expect(screen.getByText("Recent projects that showcase our expertise and impact")).toBeInTheDocument();
      expect(screen.getByText(/Let's discuss how we can help transform your business/)).toBeInTheDocument();
    });
  });

  describe("CTA Navigation", () => {
    it("provides navigation to contact page from hero section", () => {
      render(<Home />);

      const bookConsultationLink = screen.getByText("Book a Consultation").closest("a");
      expect(bookConsultationLink).toHaveAttribute("href", "/contact");
    });

    it("provides navigation to portfolio page from hero section", () => {
      render(<Home />);

      const viewWorkLink = screen.getByText("View Our Work").closest("a");
      expect(viewWorkLink).toHaveAttribute("href", "/portfolio");
    });

    it("provides navigation to contact page from bottom CTA section", () => {
      render(<Home />);

      const getInTouchLink = screen.getByText("Get In Touch").closest("a");
      expect(getInTouchLink).toHaveAttribute("href", "/contact");
    });
  });

  describe("Component Integration", () => {
    it("passes correct props to PortfolioGrid for featured projects", () => {
      render(<Home />);

      const portfolioGrid = screen.getByTestId("portfolio-grid");
      expect(portfolioGrid).toHaveAttribute("data-featured-only", "true");
    });

    it("renders services grid in services section", () => {
      render(<Home />);

      const servicesSection = screen.getByText("Our Services").closest("section");
      expect(servicesSection).toContainElement(screen.getByTestId("services-grid"));
    });

    it("renders portfolio grid in featured work section", () => {
      render(<Home />);

      const portfolioSection = screen.getByText("Featured Work").closest("section");
      expect(portfolioSection).toContainElement(screen.getByTestId("portfolio-grid"));
    });
  });

  describe("Responsive Layout", () => {
    it("applies responsive container classes", () => {
      const { container } = render(<Home />);

      // Check for responsive container classes
      const containers = container.querySelectorAll(".container");
      expect(containers.length).toBeGreaterThan(0);

      containers.forEach(containerEl => {
        expect(containerEl).toHaveClass("mx-auto");
        expect(containerEl).toHaveClass("px-6");
        expect(containerEl).toHaveClass("md:px-12");
        expect(containerEl).toHaveClass("lg:px-24");
      });
    });

    it("applies responsive section spacing", () => {
      const { container } = render(<Home />);

      const sections = container.querySelectorAll("section");
      sections.forEach(section => {
        // Most sections should have responsive padding or be the hero section
        const hasResponsivePadding = 
          section.classList.contains("py-20") || 
          section.classList.contains("md:py-32") ||
          section.classList.contains("min-h-screen") ||
          section.classList.contains("min-h-[80vh]") || // Hero section specific
          section.getAttribute("data-testid") === "hero-section"; // Mock hero section
        
        expect(hasResponsivePadding).toBe(true);
      });
    });
  });

  describe("Content Requirements", () => {
    it("displays value proposition in What We Do section", () => {
      render(<Home />);

      const valueProposition = screen.getByText(/We partner with forward-thinking businesses to build intelligent systems/);
      expect(valueProposition).toBeInTheDocument();
      
      // Check for key value proposition elements
      expect(screen.getByText(/AI-powered automation/)).toBeInTheDocument();
      expect(screen.getByText(/scalable cloud infrastructure/)).toBeInTheDocument();
      expect(screen.getByText(/technical solutions that solve real problems/)).toBeInTheDocument();
    });

    it("displays call-to-action messaging", () => {
      render(<Home />);

      expect(screen.getByText("Ready to Build Something Great?")).toBeInTheDocument();
      expect(screen.getByText(/Let's discuss how we can help transform your business with intelligent technology solutions/)).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper heading hierarchy", () => {
      render(<Home />);

      // Main hero heading should be h1
      const h1 = screen.getByRole("heading", { level: 1 });
      expect(h1).toHaveTextContent("Building Intelligent Systems for Modern Businesses");

      // Section headings should be h2
      const h2Headings = screen.getAllByRole("heading", { level: 2 });
      const expectedH2Texts = ["What We Do", "Our Services", "Featured Work", "Ready to Build Something Great?"];
      
      expect(h2Headings).toHaveLength(expectedH2Texts.length);
      expectedH2Texts.forEach(text => {
        expect(screen.getByRole("heading", { level: 2, name: text })).toBeInTheDocument();
      });
    });

    it("has semantic section structure", () => {
      const { container } = render(<Home />);

      const main = container.querySelector("main");
      expect(main).toBeInTheDocument();

      const sections = container.querySelectorAll("section");
      expect(sections.length).toBeGreaterThanOrEqual(4); // Hero, What We Do, Services, Portfolio, Contact CTA
    });
  });
});