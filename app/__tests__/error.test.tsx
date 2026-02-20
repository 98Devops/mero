import { render, screen, fireEvent } from "@testing-library/react";
import ErrorBoundary from "../error";

// Mock console.error to avoid cluttering test output
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe("Error Boundary", () => {
  let mockError: Error;
  let mockReset: jest.Mock;

  beforeEach(() => {
    mockError = new Error("Test error message");
    mockReset = jest.fn();
    (console.error as jest.Mock).mockClear();
  });

  it("displays error heading", () => {
    render(<ErrorBoundary error={mockError} reset={mockReset} />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("displays error description", () => {
    render(<ErrorBoundary error={mockError} reset={mockReset} />);
    expect(
      screen.getByText(
        /We encountered an unexpected error. Please try again or contact support if the problem persists./
      )
    ).toBeInTheDocument();
  });

  it("displays Try again button", () => {
    render(<ErrorBoundary error={mockError} reset={mockReset} />);
    expect(screen.getByText("Try again")).toBeInTheDocument();
  });

  it("displays Go home button", () => {
    render(<ErrorBoundary error={mockError} reset={mockReset} />);
    expect(screen.getByText("Go home")).toBeInTheDocument();
  });

  it("calls reset function when Try again button is clicked", () => {
    render(<ErrorBoundary error={mockError} reset={mockReset} />);
    const tryAgainButton = screen.getByText("Try again");
    fireEvent.click(tryAgainButton);
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("logs error to console", () => {
    render(<ErrorBoundary error={mockError} reset={mockReset} />);
    expect(console.error).toHaveBeenCalledWith("Application error:", mockError);
  });

  it("applies glass card styling", () => {
    const { container } = render(<ErrorBoundary error={mockError} reset={mockReset} />);
    const glassCard = container.querySelector(".glass-card");
    expect(glassCard).toBeInTheDocument();
  });

  it("displays error icon", () => {
    const { container } = render(<ErrorBoundary error={mockError} reset={mockReset} />);
    const errorIcon = container.querySelector("svg");
    expect(errorIcon).toBeInTheDocument();
  });

  it("centers content on screen", () => {
    const { container } = render(<ErrorBoundary error={mockError} reset={mockReset} />);
    const wrapper = container.querySelector(".min-h-screen");
    expect(wrapper).toHaveClass("flex", "items-center", "justify-center");
  });
});
