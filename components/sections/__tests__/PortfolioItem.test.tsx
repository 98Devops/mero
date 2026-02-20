import { render, screen, fireEvent } from "@testing-library/react";
import PortfolioItem from "../PortfolioItem";
import { Project } from "@/lib/constants";

const mockProject: Project = {
  id: "test-project",
  name: "Test Project",
  category: "web-app",
  description: "A test project description",
  techStack: ["React", "TypeScript", "Next.js"],
  imageUrl: "/images/test.jpg",
  projectUrl: "/projects/test",
  featured: true,
};

describe("PortfolioItem", () => {
  it("renders project name", () => {
    render(<PortfolioItem project={mockProject} />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("renders project category", () => {
    render(<PortfolioItem project={mockProject} />);
    expect(screen.getByText("web app")).toBeInTheDocument();
  });

  it("renders project description", () => {
    render(<PortfolioItem project={mockProject} />);
    expect(screen.getByText("A test project description")).toBeInTheDocument();
  });

  it("renders all tech stack tags", () => {
    render(<PortfolioItem project={mockProject} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
  });

  it("renders project image with lazy loading", () => {
    render(<PortfolioItem project={mockProject} />);
    const image = screen.getByAltText("Test Project");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("loading", "lazy");
  });

  it("shows 'View Project' overlay on hover", () => {
    render(<PortfolioItem project={mockProject} />);
    const card = screen.getByText("Test Project").closest("div")?.parentElement?.parentElement;
    
    if (card) {
      fireEvent.mouseEnter(card);
      expect(screen.getByText("View Project")).toBeInTheDocument();
    }
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<PortfolioItem project={mockProject} onClick={handleClick} />);
    
    const card = screen.getByText("Test Project").closest("div")?.parentElement?.parentElement;
    if (card) {
      fireEvent.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    }
  });

  it("has cursor-pointer class for clickability", () => {
    const { container } = render(<PortfolioItem project={mockProject} />);
    const clickableElement = container.querySelector(".cursor-pointer");
    expect(clickableElement).toBeInTheDocument();
  });
});
