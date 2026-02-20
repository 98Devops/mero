import { render, screen, fireEvent } from "@testing-library/react";
import PortfolioPage from "../page";

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

describe("Portfolio Page", () => {
  it("renders the portfolio page with hero section", () => {
    render(<PortfolioPage />);
    
    expect(screen.getByText("Our Portfolio")).toBeInTheDocument();
    expect(screen.getByText(/Explore our successful projects/)).toBeInTheDocument();
  });

  it("displays all category filter buttons", () => {
    render(<PortfolioPage />);
    
    expect(screen.getByText("All Projects")).toBeInTheDocument();
    expect(screen.getByText("AI Automation")).toBeInTheDocument();
    expect(screen.getByText("Web Applications")).toBeInTheDocument();
    expect(screen.getByText("Internal Tools")).toBeInTheDocument();
    expect(screen.getByText("Infrastructure")).toBeInTheDocument();
    expect(screen.getByText("Integrations")).toBeInTheDocument();
  });

  it("filters projects when category is selected", () => {
    render(<PortfolioPage />);
    
    // Initially shows all projects
    expect(screen.getByText("Inventory Management Automation")).toBeInTheDocument();
    expect(screen.getByText("E-Commerce Platform")).toBeInTheDocument();
    
    // Click on AI Automation filter
    fireEvent.click(screen.getByText("AI Automation"));
    
    // Should still show AI automation projects
    expect(screen.getByText("Inventory Management Automation")).toBeInTheDocument();
    expect(screen.getByText("Customer Support AI Agent")).toBeInTheDocument();
  });

  it("displays project statistics", () => {
    render(<PortfolioPage />);
    
    expect(screen.getByText("Our Impact")).toBeInTheDocument();
    expect(screen.getByText("Projects Completed")).toBeInTheDocument();
    expect(screen.getByText("Service Categories")).toBeInTheDocument();
    expect(screen.getByText("Featured Projects")).toBeInTheDocument();
  });

  it("displays call to action section", () => {
    render(<PortfolioPage />);
    
    expect(screen.getByText("Ready to Start Your Project?")).toBeInTheDocument();
    expect(screen.getByText("Start Your Project")).toBeInTheDocument();
    expect(screen.getByText("View Our Services")).toBeInTheDocument();
  });

  it("highlights selected category filter", () => {
    render(<PortfolioPage />);
    
    const allProjectsButton = screen.getByText("All Projects");
    const aiAutomationButton = screen.getByText("AI Automation");
    
    // Initially "All Projects" should be selected (has accent-primary background)
    expect(allProjectsButton).toHaveClass("bg-accent-primary");
    expect(aiAutomationButton).toHaveClass("bg-white/5");
    
    // Click AI Automation
    fireEvent.click(aiAutomationButton);
    
    // Now AI Automation should be selected
    expect(aiAutomationButton).toHaveClass("bg-accent-primary");
  });
});