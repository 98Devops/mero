import { render, screen } from "@testing-library/react";
import PortfolioGrid from "../PortfolioGrid";
import { projects } from "@/lib/constants";

// Mock the PortfolioItem component
jest.mock("../PortfolioItem", () => {
  return function MockPortfolioItem({ project }: { project: { id: string; name: string } }) {
    return (
      <div data-testid={`portfolio-item-${project.id}`}>
        {project.name}
      </div>
    );
  };
});

describe("PortfolioGrid", () => {
  it("renders all projects when showFeaturedOnly is false", () => {
    render(<PortfolioGrid showFeaturedOnly={false} />);
    
    // Should render all projects
    projects.forEach((project) => {
      expect(screen.getByTestId(`portfolio-item-${project.id}`)).toBeInTheDocument();
    });
  });

  it("renders only featured projects when showFeaturedOnly is true", () => {
    render(<PortfolioGrid showFeaturedOnly={true} />);
    
    const featuredProjects = projects.filter((project) => project.featured);
    const nonFeaturedProjects = projects.filter((project) => !project.featured);
    
    // Should render featured projects
    featuredProjects.forEach((project) => {
      expect(screen.getByTestId(`portfolio-item-${project.id}`)).toBeInTheDocument();
    });
    
    // Should not render non-featured projects
    nonFeaturedProjects.forEach((project) => {
      expect(screen.queryByTestId(`portfolio-item-${project.id}`)).not.toBeInTheDocument();
    });
  });

  it("renders all projects by default when showFeaturedOnly is not specified", () => {
    render(<PortfolioGrid />);
    
    // Should render all projects by default
    projects.forEach((project) => {
      expect(screen.getByTestId(`portfolio-item-${project.id}`)).toBeInTheDocument();
    });
  });

  it("applies responsive grid classes", () => {
    const { container } = render(<PortfolioGrid />);
    const gridElement = container.firstChild as HTMLElement;
    
    expect(gridElement).toHaveClass("grid");
    expect(gridElement).toHaveClass("grid-cols-1");
    expect(gridElement).toHaveClass("md:grid-cols-2");
    expect(gridElement).toHaveClass("lg:grid-cols-3");
    expect(gridElement).toHaveClass("gap-6");
    expect(gridElement).toHaveClass("md:gap-8");
  });

  it("applies custom className when provided", () => {
    const customClass = "custom-portfolio-grid";
    const { container } = render(<PortfolioGrid className={customClass} />);
    const gridElement = container.firstChild as HTMLElement;
    
    expect(gridElement).toHaveClass(customClass);
  });
});