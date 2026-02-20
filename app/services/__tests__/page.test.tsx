import { render, screen } from "@testing-library/react";
import ServicesPage from "../page";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

// Mock components that use complex dependencies
jest.mock("@/components/sections/ServicesGrid", () => {
  return function MockServicesGrid() {
    return <div data-testid="services-grid">Services Grid Component</div>;
  };
});

jest.mock("@/components/ui/GlassCard", () => {
  return function MockGlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={className} data-testid="glass-card">{children}</div>;
  };
});

jest.mock("@/components/ui/Button", () => {
  return function MockButton({ children, variant }: { children: React.ReactNode; variant?: string }) {
    return <button data-variant={variant}>{children}</button>;
  };
});

describe("Services Page", () => {
  it("displays the page title and subtitle", () => {
    render(<ServicesPage />);
    
    expect(screen.getByText("Our Services")).toBeInTheDocument();
    expect(screen.getByText("Comprehensive technology solutions to accelerate your business growth")).toBeInTheDocument();
  });

  it("displays the services grid section", () => {
    render(<ServicesPage />);
    
    expect(screen.getByText("What We Do")).toBeInTheDocument();
    expect(screen.getByText("We specialize in nine core service areas, each designed to address specific business challenges with modern technology solutions.")).toBeInTheDocument();
  });

  it("displays all four service categories with descriptions", () => {
    render(<ServicesPage />);
    
    // Check category titles
    expect(screen.getByText("AI Automation & Intelligence")).toBeInTheDocument();
    expect(screen.getByText("Custom Development Solutions")).toBeInTheDocument();
    expect(screen.getByText("Cloud Infrastructure & DevOps")).toBeInTheDocument();
    expect(screen.getByText("Strategic AI Consulting")).toBeInTheDocument();
  });

  it("displays the call to action section", () => {
    render(<ServicesPage />);
    
    expect(screen.getByText("Ready to Transform Your Business?")).toBeInTheDocument();
    expect(screen.getByText("Let's discuss how our services can help you achieve your goals. Book a consultation to explore the possibilities.")).toBeInTheDocument();
  });

  it("displays CTA buttons linking to contact and portfolio", () => {
    render(<ServicesPage />);
    
    const consultationButtons = screen.getAllByText("Book a Consultation");
    const portfolioButtons = screen.getAllByText("View Our Work");
    
    expect(consultationButtons.length).toBeGreaterThan(0);
    expect(portfolioButtons.length).toBeGreaterThan(0);
    
    // Check that at least one of each button has the correct href
    const consultationLinks = consultationButtons.map(btn => btn.closest('a')).filter(Boolean);
    const portfolioLinks = portfolioButtons.map(btn => btn.closest('a')).filter(Boolean);
    
    expect(consultationLinks.some(link => link?.getAttribute('href') === '/contact')).toBe(true);
    expect(portfolioLinks.some(link => link?.getAttribute('href') === '/portfolio')).toBe(true);
  });

  it("displays service counts for each category", () => {
    render(<ServicesPage />);
    
    // Should display the number of services in each category
    const serviceCountElements = screen.getAllByText(/^\d+$/);
    expect(serviceCountElements.length).toBeGreaterThan(0);
    
    // Should display "Specialized Services" text
    const specializedServicesElements = screen.getAllByText("Specialized Services");
    expect(specializedServicesElements.length).toBe(4); // One for each category
  });

  it("displays services listed under each category", () => {
    render(<ServicesPage />);
    
    // Check that "Services in this category:" appears for each category
    const categoryServiceHeaders = screen.getAllByText("Services in this category:");
    expect(categoryServiceHeaders.length).toBe(4);
  });
});