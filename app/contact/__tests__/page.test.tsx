import { render, screen } from "@testing-library/react";
import ContactPage from "../page";

// Mock the ContactForm component since it's already tested separately
jest.mock("@/components/forms/ContactForm", () => {
  return function MockContactForm() {
    return <div data-testid="contact-form">Contact Form</div>;
  };
});

describe("Contact Page", () => {
  it("displays the hero section with correct title", () => {
    render(<ContactPage />);
    
    expect(screen.getByText("Let's Build Something Amazing Together")).toBeInTheDocument();
    expect(screen.getByText(/Ready to transform your business with intelligent systems/)).toBeInTheDocument();
  });

  it("renders the ContactForm component", () => {
    render(<ContactPage />);
    
    expect(screen.getByTestId("contact-form")).toBeInTheDocument();
  });

  it("displays company information section", () => {
    render(<ContactPage />);
    
    expect(screen.getByText("About Mero Tech")).toBeInTheDocument();
    expect(screen.getByText("Our Expertise")).toBeInTheDocument();
    expect(screen.getByText("Our Approach")).toBeInTheDocument();
  });

  it("displays company location information", () => {
    render(<ContactPage />);
    
    expect(screen.getByText("Our Location")).toBeInTheDocument();
    expect(screen.getByText("📍 Mt Pleasant, Harare, Zimbabwe")).toBeInTheDocument();
    expect(screen.getByText("Serving clients locally and internationally")).toBeInTheDocument();
  });

  it("includes expertise description", () => {
    render(<ContactPage />);
    
    expect(screen.getByText(/We specialize in building intelligent systems/)).toBeInTheDocument();
    expect(screen.getByText(/AI automation and chatbots to scalable web applications/)).toBeInTheDocument();
  });

  it("includes approach description", () => {
    render(<ContactPage />);
    
    expect(screen.getByText(/We believe in clear communication, technical excellence/)).toBeInTheDocument();
    expect(screen.getByText(/build solutions that scale with your business/)).toBeInTheDocument();
  });

  it("has proper page structure with main element", () => {
    render(<ContactPage />);
    
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass("min-h-screen", "bg-background-primary");
  });

  it("applies consistent styling classes", () => {
    render(<ContactPage />);
    
    // Check hero section styling
    const heroSection = screen.getByText("Let's Build Something Amazing Together").closest("section");
    expect(heroSection).toHaveClass("py-20", "md:py-32");
    
    // Check container styling
    const container = screen.getByText("Let's Build Something Amazing Together").closest("div");
    expect(container?.parentElement).toHaveClass("container", "mx-auto", "px-6", "md:px-12", "lg:px-24");
  });
});