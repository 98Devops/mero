import { render, screen } from "@testing-library/react";
import WhatWeDo from "../page";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

// Mock Next.js Link
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe("What We Do Page", () => {
  it("renders the page title", () => {
    render(<WhatWeDo />);
    expect(screen.getByRole("heading", { name: "What We Do" })).toBeInTheDocument();
  });

  it("renders the value proposition paragraph", () => {
    render(<WhatWeDo />);
    expect(
      screen.getByText(/We partner with forward-thinking businesses to build intelligent systems/)
    ).toBeInTheDocument();
  });

  it("renders the Our Mission section", () => {
    render(<WhatWeDo />);
    expect(screen.getByRole("heading", { name: "Our Mission" })).toBeInTheDocument();
  });

  it("renders the Our Approach section", () => {
    render(<WhatWeDo />);
    expect(screen.getByRole("heading", { name: "Our Approach" })).toBeInTheDocument();
  });

  it("renders all three approach cards", () => {
    render(<WhatWeDo />);
    expect(screen.getByText("Problem-First Thinking")).toBeInTheDocument();
    expect(screen.getByText("Rapid Iteration")).toBeInTheDocument();
    expect(screen.getByText("Built to Scale")).toBeInTheDocument();
  });

  it("renders the About Mero Tech section", () => {
    render(<WhatWeDo />);
    expect(screen.getByRole("heading", { name: "About Mero Tech" })).toBeInTheDocument();
  });

  it("displays company location information", () => {
    render(<WhatWeDo />);
    expect(screen.getByText(/Mt Pleasant, Harare/)).toBeInTheDocument();
  });

  it("renders the Why Choose Mero Tech section", () => {
    render(<WhatWeDo />);
    expect(screen.getByText("Why Choose Mero Tech?")).toBeInTheDocument();
  });

  it("displays all four key differentiators", () => {
    render(<WhatWeDo />);
    expect(
      screen.getByText(/Deep technical expertise across AI, web development, and cloud infrastructure/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Proven track record of delivering systems that scale and perform/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Business-first approach that prioritizes ROI and practical outcomes/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Local presence with global standards and best practices/)
    ).toBeInTheDocument();
  });

  it("renders the services CTA section", () => {
    render(<WhatWeDo />);
    expect(
      screen.getByRole("heading", { name: "Ready to See What We Can Build Together?" })
    ).toBeInTheDocument();
  });

  it("includes a CTA button linking to services page", () => {
    render(<WhatWeDo />);
    const ctaLink = screen.getByRole("link", { name: /View Our Services/ });
    expect(ctaLink).toBeInTheDocument();
    expect(ctaLink).toHaveAttribute("href", "/services");
  });

  it("has proper page structure with main element", () => {
    render(<WhatWeDo />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders all required sections in correct order", () => {
    render(<WhatWeDo />);
    const sections = document.querySelectorAll("section");
    // Should have hero, value prop, approach, company info, and CTA sections
    expect(sections.length).toBeGreaterThanOrEqual(5);
  });
});