import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactForm from "../ContactForm";

// Mock fetch
global.fetch = jest.fn();

describe("ContactForm", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("renders all form fields", () => {
    render(<ContactForm />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/project type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("displays location text", () => {
    render(<ContactForm />);
    
    expect(screen.getByText(/Mt Pleasant, Harare/i)).toBeInTheDocument();
  });

  it("shows validation errors for empty required fields", async () => {
    render(<ContactForm />);
    
    const submitButton = screen.getByRole("button", { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText(/Name must be at least 2 characters/i)[0]).toBeInTheDocument();
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Company name must be at least 2 characters/i)[0]).toBeInTheDocument();
      expect(screen.getByText(/Please select a project type/i)).toBeInTheDocument();
      expect(screen.getByText(/Message must be at least 10 characters/i)).toBeInTheDocument();
    });
  });

  it("shows success message after successful submission", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: "Form submitted successfully" }),
    });

    render(<ContactForm />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/company/i), { target: { value: "Acme Corp" } });
    fireEvent.change(screen.getByLabelText(/project type/i), { target: { value: "Web Applications" } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "I need help with a project" } });
    
    const submitButton = screen.getByRole("button", { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Thank you for your message! We'll get back to you soon./i)).toBeInTheDocument();
    });
  });

  it("shows error message on submission failure", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ success: false, error: "Server error" }),
    });

    render(<ContactForm />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/company/i), { target: { value: "Acme Corp" } });
    fireEvent.change(screen.getByLabelText(/project type/i), { target: { value: "Web Applications" } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "I need help with a project" } });
    
    const submitButton = screen.getByRole("button", { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Server error/i)).toBeInTheDocument();
    });
  });

  it("shows loading state during submission", async () => {
    (fetch as jest.Mock).mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(<ContactForm />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/company/i), { target: { value: "Acme Corp" } });
    fireEvent.change(screen.getByLabelText(/project type/i), { target: { value: "Web Applications" } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "I need help with a project" } });
    
    const submitButton = screen.getByRole("button", { name: /send message/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});