import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import Header from "../Header";

// Mock Next.js navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("Header", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/");
  });

  it("displays all five navigation links", () => {
    render(<Header />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("What We Do")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("displays the Mero Tech logo", () => {
    render(<Header />);

    expect(screen.getByText("Mero Tech")).toBeInTheDocument();
  });

  it("highlights the active page (Home)", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    render(<Header />);

    const homeLink = screen.getByText("Home");
    expect(homeLink).toHaveClass("text-accent-primary");
  });

  it("highlights the active page (Services)", () => {
    (usePathname as jest.Mock).mockReturnValue("/services");
    render(<Header />);

    const servicesLink = screen.getByText("Services");
    expect(servicesLink).toHaveClass("text-accent-primary");
  });

  it("highlights the active page (Portfolio)", () => {
    (usePathname as jest.Mock).mockReturnValue("/portfolio");
    render(<Header />);

    const portfolioLink = screen.getByText("Portfolio");
    expect(portfolioLink).toHaveClass("text-accent-primary");
  });

  it("applies glassmorphism styling to header", () => {
    const { container } = render(<Header />);

    const header = container.querySelector("header");
    expect(header).toHaveClass("bg-white/5");
    expect(header).toHaveClass("backdrop-blur-lg");
    expect(header).toHaveClass("border-b");
    expect(header).toHaveClass("border-white/10");
  });

  it("renders navigation links with correct hrefs", () => {
    render(<Header />);

    const homeLink = screen.getByText("Home").closest("a");
    const whatWeDoLink = screen.getByText("What We Do").closest("a");
    const servicesLink = screen.getByText("Services").closest("a");
    const portfolioLink = screen.getByText("Portfolio").closest("a");
    const contactLink = screen.getByText("Contact").closest("a");

    expect(homeLink).toHaveAttribute("href", "/");
    expect(whatWeDoLink).toHaveAttribute("href", "/what-we-do");
    expect(servicesLink).toHaveAttribute("href", "/services");
    expect(portfolioLink).toHaveAttribute("href", "/portfolio");
    expect(contactLink).toHaveAttribute("href", "/contact");
  });

  it("applies inactive styles to non-active links", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    render(<Header />);

    const servicesLink = screen.getByText("Services");
    expect(servicesLink).toHaveClass("text-white/70");
    expect(servicesLink).not.toHaveClass("text-accent-primary");
  });

  it("hides desktop navigation on mobile and shows mobile menu", () => {
    render(<Header />);

    // Desktop navigation should have hidden class for mobile
    const desktopNav = screen.getByText("Home").closest("ul");
    expect(desktopNav).toHaveClass("hidden");
    expect(desktopNav).toHaveClass("md:flex");

    // Mobile menu button should be present
    const mobileMenuButton = screen.getByLabelText("Toggle menu");
    expect(mobileMenuButton).toBeInTheDocument();
    expect(mobileMenuButton).toHaveClass("md:hidden");
  });
});
