/**
 * Unit tests for loading state component
 * 
 * **Validates: Requirements 5.4**
 */

import { render, screen } from "@testing-library/react";
import Loading from "../loading";

describe("Loading Component", () => {
  /**
   * Test that loading component renders skeleton loaders
   * 
   * **Validates: Requirements 5.4**
   */
  it("renders skeleton loaders for page content", () => {
    const { container } = render(<Loading />);
    
    // Should render skeleton elements
    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  /**
   * Test that loading component has proper structure
   * 
   * **Validates: Requirements 5.4**
   */
  it("renders hero section skeleton", () => {
    const { container } = render(<Loading />);
    
    // Should have hero section
    const heroSection = container.querySelector("section");
    expect(heroSection).toBeInTheDocument();
    expect(heroSection).toHaveClass("min-h-[80vh]");
  });

  /**
   * Test that loading component renders grid skeleton
   * 
   * **Validates: Requirements 5.4**
   */
  it("renders grid skeleton with multiple cards", () => {
    const { container } = render(<Loading />);
    
    // Should have grid of skeleton cards
    const gridCards = container.querySelectorAll(".glass-card");
    expect(gridCards.length).toBe(6);
  });

  /**
   * Test that skeleton cards have staggered animation
   * 
   * **Validates: Requirements 5.4**
   */
  it("applies staggered animation delays to skeleton cards", () => {
    const { container } = render(<Loading />);
    
    const gridCards = container.querySelectorAll(".glass-card");
    
    // Each card should have an animation delay
    gridCards.forEach((card, index) => {
      const style = (card as HTMLElement).style;
      expect(style.animationDelay).toBe(`${index * 100}ms`);
    });
  });

  /**
   * Test that loading component uses glass card styling
   * 
   * **Validates: Requirements 5.4, 8.2**
   */
  it("uses glass card styling for skeleton elements", () => {
    const { container } = render(<Loading />);
    
    const glassCards = container.querySelectorAll(".glass-card");
    expect(glassCards.length).toBeGreaterThan(0);
    
    // Glass cards should have the glass-card class
    glassCards.forEach(card => {
      expect(card).toHaveClass("glass-card");
    });
  });
});
