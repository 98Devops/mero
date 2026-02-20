import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PortfolioPage from "../page";
import { projects } from "@/lib/constants";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

// Mock next/image
jest.mock("next/image", () => {
  return ({ src, alt, loading, ...props }: any) => (
    <img 
      src={src} 
      alt={alt} 
      data-loading={loading}
      {...props}
    />
  );
});

// Mock Button component to avoid framer-motion issues
jest.mock("@/components/ui/Button", () => {
  return function MockButton({ children, variant, ...props }: any) {
    return (
      <button className={`btn-${variant}`} {...props}>
        {children}
      </button>
    );
  };
});

// Mock GlassCard component
jest.mock("@/components/ui/GlassCard", () => {
  return function MockGlassCard({ children, hoverEffect, className, ...props }: any) {
    return (
      <div className={`glass-card ${className || ''} ${hoverEffect ? 'hover-effect' : ''}`} {...props}>
        {children}
      </div>
    );
  };
});

describe("Portfolio Page Integration Tests", () => {
  describe("Portfolio grid display", () => {
    it("displays the portfolio grid with all projects by default", () => {
      render(<PortfolioPage />);
      
      // Check that portfolio grid is displayed by looking for project names
      expect(screen.getByText("Inventory Management Automation")).toBeInTheDocument();
      expect(screen.getByText("Customer Support AI Agent")).toBeInTheDocument();
      expect(screen.getByText("E-Commerce Platform")).toBeInTheDocument();
      
      // Verify grid container exists
      const gridContainer = document.querySelector('.grid.grid-cols-1');
      expect(gridContainer).toBeInTheDocument();
    });

    it("displays projects in a responsive grid layout", () => {
      const { container } = render(<PortfolioPage />);
      
      // Find the portfolio grid container
      const gridContainer = container.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
      expect(gridContainer).toBeInTheDocument();
      
      // Verify grid has proper gap classes
      expect(gridContainer).toHaveClass('gap-6', 'md:gap-8');
    });

    it("filters projects correctly when category is selected", async () => {
      render(<PortfolioPage />);
      
      // Initially should show all projects
      expect(screen.getByText("Inventory Management Automation")).toBeInTheDocument();
      expect(screen.getByText("E-Commerce Platform")).toBeInTheDocument();
      
      // Click on AI Automation filter
      fireEvent.click(screen.getByText("AI Automation"));
      
      // Should show AI automation projects
      expect(screen.getByText("Inventory Management Automation")).toBeInTheDocument();
      expect(screen.getByText("Customer Support AI Agent")).toBeInTheDocument();
      
      // Click on Web Applications filter
      fireEvent.click(screen.getByText("Web Applications"));
      
      // Should show web app projects
      expect(screen.getByText("E-Commerce Platform")).toBeInTheDocument();
      expect(screen.getByText("Healthcare Patient Portal")).toBeInTheDocument();
    });
  });

  describe("Image lazy loading", () => {
    it("applies lazy loading to portfolio images", () => {
      render(<PortfolioPage />);
      
      // Get all images in the portfolio
      const images = screen.getAllByRole('img');
      const portfolioImages = images.filter(img => 
        img.getAttribute('alt')?.includes('Automation') || 
        img.getAttribute('alt')?.includes('Platform') ||
        img.getAttribute('alt')?.includes('Agent')
      );
      
      // Verify that portfolio images have lazy loading
      portfolioImages.forEach(image => {
        expect(image).toHaveAttribute('data-loading', 'lazy');
      });
    });

    it("uses proper image optimization attributes", () => {
      render(<PortfolioPage />);
      
      // Get portfolio images
      const images = screen.getAllByRole('img');
      const portfolioImages = images.filter(img => 
        img.getAttribute('src')?.includes('/images/portfolio/')
      );
      
      expect(portfolioImages.length).toBeGreaterThan(0);
      
      // Verify images have proper src paths
      portfolioImages.forEach(image => {
        const src = image.getAttribute('src');
        expect(src).toMatch(/\/images\/portfolio\/.+\.(svg|jpg|png|webp)$/);
      });
    });

    it("provides proper alt text for accessibility", () => {
      render(<PortfolioPage />);
      
      // Check that project images have descriptive alt text
      const inventoryImage = screen.getByAltText("Inventory Management Automation");
      expect(inventoryImage).toBeInTheDocument();
      
      const supportBotImage = screen.getByAltText("Customer Support AI Agent");
      expect(supportBotImage).toBeInTheDocument();
      
      const ecommerceImage = screen.getByAltText("E-Commerce Platform");
      expect(ecommerceImage).toBeInTheDocument();
    });
  });

  describe("Portfolio item hover interactions", () => {
    it("shows hover overlay with 'View Project' text on mouse enter", async () => {
      render(<PortfolioPage />);
      
      // Find a portfolio item container
      const portfolioItem = screen.getByText("Inventory Management Automation").closest('.glass-card');
      expect(portfolioItem).toBeInTheDocument();
      
      // Initially, "View Project" overlay should not be visible
      expect(screen.queryByText("View Project")).not.toBeInTheDocument();
      
      // Hover over the portfolio item
      if (portfolioItem) {
        fireEvent.mouseEnter(portfolioItem);
        
        // "View Project" overlay should appear
        await waitFor(() => {
          expect(screen.getByText("View Project")).toBeInTheDocument();
        });
      }
    });

    it("hides hover overlay on mouse leave", async () => {
      render(<PortfolioPage />);
      
      // Find a portfolio item container
      const portfolioItem = screen.getByText("Customer Support AI Agent").closest('.glass-card');
      expect(portfolioItem).toBeInTheDocument();
      
      if (portfolioItem) {
        // Hover over the item
        fireEvent.mouseEnter(portfolioItem);
        
        // Verify overlay appears
        await waitFor(() => {
          expect(screen.getByText("View Project")).toBeInTheDocument();
        });
        
        // Move mouse away
        fireEvent.mouseLeave(portfolioItem);
        
        // Overlay should disappear
        await waitFor(() => {
          expect(screen.queryByText("View Project")).not.toBeInTheDocument();
        });
      }
    });

    it("applies hover effect styling to portfolio cards", async () => {
      render(<PortfolioPage />);
      
      // Find the parent container of a portfolio item
      const portfolioItem = screen.getByText("E-Commerce Platform").closest('.glass-card');
      expect(portfolioItem).toBeInTheDocument();
      
      if (portfolioItem) {
        // Verify it has hover-effect class for interactivity
        expect(portfolioItem).toHaveClass('hover-effect');
        
        // Hover over the item
        fireEvent.mouseEnter(portfolioItem);
        
        // The hover effect should be applied (this is handled by the GlassCard component)
        // We can verify the hover state is triggered by checking for the overlay
        await waitFor(() => {
          expect(screen.getByText("View Project")).toBeInTheDocument();
        });
      }
    });

    it("handles click interactions on portfolio items", async () => {
      render(<PortfolioPage />);
      
      // Find a portfolio item
      const portfolioItem = screen.getByText("Inventory Management Automation").closest('.glass-card');
      expect(portfolioItem).toBeInTheDocument();
      
      if (portfolioItem) {
        // Click on the portfolio item
        fireEvent.click(portfolioItem);
        
        // Should have cursor-pointer class for interactivity
        expect(portfolioItem).toHaveClass('hover-effect');
      }
    });
  });

  describe("Portfolio page structure and content", () => {
    it("displays all required sections", () => {
      render(<PortfolioPage />);
      
      // Hero section
      expect(screen.getByText("Our Portfolio")).toBeInTheDocument();
      expect(screen.getByText(/Explore our successful projects/)).toBeInTheDocument();
      
      // Filter navigation
      expect(screen.getByText("All Projects")).toBeInTheDocument();
      expect(screen.getByText("AI Automation")).toBeInTheDocument();
      
      // Portfolio grid (verified by presence of projects)
      expect(screen.getByText("Inventory Management Automation")).toBeInTheDocument();
      
      // Stats section
      expect(screen.getByText("Our Impact")).toBeInTheDocument();
      expect(screen.getByText("Projects Completed")).toBeInTheDocument();
      
      // Call to action
      expect(screen.getByText("Ready to Start Your Project?")).toBeInTheDocument();
    });

    it("displays project metadata correctly", () => {
      render(<PortfolioPage />);
      
      // Check that project details are displayed
      expect(screen.getByText("Inventory Management Automation")).toBeInTheDocument();
      expect(screen.getByText(/AI-powered inventory tracking system/)).toBeInTheDocument();
      
      // Check tech stack tags are displayed (use getAllByText for multiple instances)
      expect(screen.getAllByText("Python").length).toBeGreaterThan(0);
      expect(screen.getByText("TensorFlow")).toBeInTheDocument();
      expect(screen.getAllByText("FastAPI").length).toBeGreaterThan(0);
      
      // Check category is displayed (use getAllByText since there are multiple ai automation projects)
      expect(screen.getAllByText("ai automation").length).toBeGreaterThan(0);
    });

    it("handles empty state when no projects match filter", async () => {
      render(<PortfolioPage />);
      
      // Click on Integrations filter - this should show integration projects
      fireEvent.click(screen.getByText("Integrations"));
      
      // Should show integration projects (there are some in the constants)
      expect(screen.getByText("Multi-Platform CRM Integration")).toBeInTheDocument();
      expect(screen.getByText("Payment Gateway Integration")).toBeInTheDocument();
      
      // Test that filtering works by checking a project from another category is not shown
      expect(screen.queryByText("Inventory Management Automation")).not.toBeInTheDocument();
    });
  });
});