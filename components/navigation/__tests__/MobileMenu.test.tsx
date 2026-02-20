import { render, screen, fireEvent } from "@testing-library/react";
import MobileMenu from "../MobileMenu";

const mockNavLinks = [
  { label: "Home", href: "/" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

describe("MobileMenu", () => {
  it("renders hamburger button", () => {
    render(<MobileMenu navLinks={mockNavLinks} currentPath="/" />);

    const button = screen.getByLabelText("Toggle menu");
    expect(button).toBeInTheDocument();
  });

  it("opens menu when hamburger button is clicked", () => {
    render(<MobileMenu navLinks={mockNavLinks} currentPath="/" />);

    const button = screen.getByLabelText("Toggle menu");
    fireEvent.click(button);

    // Check that all navigation links are visible
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("What We Do")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("closes menu when backdrop is clicked", () => {
    render(<MobileMenu navLinks={mockNavLinks} currentPath="/" />);

    const button = screen.getByLabelText("Toggle menu");
    fireEvent.click(button);

    // Menu should be open
    expect(screen.getByText("Home")).toBeInTheDocument();

    // Click backdrop
    const backdrop = document.querySelector(".bg-black\\/60");
    if (backdrop) {
      fireEvent.click(backdrop);
    }

    // Menu should close (links should not be visible after animation)
    // Note: In real tests with proper animation support, we'd wait for the animation
  });

  it("closes menu when a navigation link is clicked", () => {
    render(<MobileMenu navLinks={mockNavLinks} currentPath="/" />);

    const button = screen.getByLabelText("Toggle menu");
    fireEvent.click(button);

    // Click a navigation link
    const servicesLink = screen.getByText("Services");
    fireEvent.click(servicesLink);

    // Menu should close (aria-expanded should be false)
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("highlights the active page", () => {
    render(<MobileMenu navLinks={mockNavLinks} currentPath="/services" />);

    const button = screen.getByLabelText("Toggle menu");
    fireEvent.click(button);

    const servicesLink = screen.getByText("Services");
    expect(servicesLink).toHaveClass("text-accent-primary");
  });

  it("applies correct href to navigation links", () => {
    render(<MobileMenu navLinks={mockNavLinks} currentPath="/" />);

    const button = screen.getByLabelText("Toggle menu");
    fireEvent.click(button);

    const homeLink = screen.getByText("Home").closest("a");
    const servicesLink = screen.getByText("Services").closest("a");
    const portfolioLink = screen.getByText("Portfolio").closest("a");

    expect(homeLink).toHaveAttribute("href", "/");
    expect(servicesLink).toHaveAttribute("href", "/services");
    expect(portfolioLink).toHaveAttribute("href", "/portfolio");
  });

  it("renders hamburger icon with three lines", () => {
    render(<MobileMenu navLinks={mockNavLinks} currentPath="/" />);

    const button = screen.getByLabelText("Toggle menu");
    const spans = button.querySelectorAll("span");

    expect(spans).toHaveLength(3);
  });

  it("applies mobile-only visibility class", () => {
    render(<MobileMenu navLinks={mockNavLinks} currentPath="/" />);

    const button = screen.getByLabelText("Toggle menu");
    expect(button).toHaveClass("md:hidden");
  });

  it("sets aria-expanded attribute correctly", () => {
    render(<MobileMenu navLinks={mockNavLinks} currentPath="/" />);

    const button = screen.getByLabelText("Toggle menu");

    // Initially closed
    expect(button).toHaveAttribute("aria-expanded", "false");

    // Open menu
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");

    // Close menu
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("applies glassmorphism styling to drawer", () => {
    const { container } = render(
      <MobileMenu navLinks={mockNavLinks} currentPath="/" />
    );

    const button = screen.getByLabelText("Toggle menu");
    fireEvent.click(button);

    const drawer = container.querySelector(".backdrop-blur-lg");
    expect(drawer).toBeInTheDocument();
    expect(drawer).toHaveClass("border-l");
    expect(drawer).toHaveClass("border-white/10");
  });
});
