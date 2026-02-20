import { render, screen } from "@testing-library/react";
import HeroSection from "../HeroSection";

describe("HeroSection", () => {
  it("displays correct headline and subheadline", () => {
    render(<HeroSection />);
    expect(
      screen.getByText("Building Intelligent Systems for Modern Businesses")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "AI Automation. Internal Tools. Scalable Infrastructure."
      )
    ).toBeInTheDocument();
  });

  it("renders both CTA buttons", () => {
    render(<HeroSection />);
    expect(screen.getByText("Book a Consultation")).toBeInTheDocument();
    expect(screen.getByText("View Our Work")).toBeInTheDocument();
  });

  it("CTA buttons have correct navigation links", () => {
    render(<HeroSection />);
    
    const primaryButton = screen.getByText("Book a Consultation").closest("a");
    const secondaryButton = screen.getByText("View Our Work").closest("a");
    
    expect(primaryButton).toHaveAttribute("href", "/contact");
    expect(secondaryButton).toHaveAttribute("href", "/portfolio");
  });

  it("applies gradient animation to background", () => {
    const { container } = render(<HeroSection />);
    const gradientDiv = container.querySelector(".bg-gradient-to-br");
    expect(gradientDiv).toBeInTheDocument();
  });

  it("renders with responsive text sizing classes", () => {
    render(<HeroSection />);
    const headline = screen.getByText("Building Intelligent Systems for Modern Businesses");
    expect(headline).toHaveClass("text-5xl", "md:text-6xl", "lg:text-7xl");
  });

  it("renders with responsive spacing classes", () => {
    const { container } = render(<HeroSection />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("py-20", "md:py-32");
  });
});
