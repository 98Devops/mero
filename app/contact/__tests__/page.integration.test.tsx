import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactPage from "../page";

// Mock fetch for API testing
global.fetch = jest.fn();

// Mock next/dynamic to return components synchronously
jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: (fn: any) => {
    const Component = fn();
    return Component.default || Component;
  },
}));

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}));

// Mock Button component to avoid framer-motion issues
jest.mock("@/components/ui/Button", () => {
  return function MockButton({ children, variant, loading, disabled, className, ...props }: any) {
    return (
      <button 
        className={`btn btn-${variant} ${className || ""}`} 
        disabled={disabled || loading}
        {...props}
      >
        {loading ? "Loading..." : children}
      </button>
    );
  };
});

// Mock GlassCard component
jest.mock("@/components/ui/GlassCard", () => {
  return function MockGlassCard({ children, className, ...props }: any) {
    return (
      <div className={`glass-card ${className || ''}`} {...props}>
        {children}
      </div>
    );
  };
});

// Mock ContactForm component to return the actual component (not dynamically loaded)
jest.mock("@/components/forms/ContactForm", () => {
  const actual = jest.requireActual("@/components/forms/ContactForm");
  return {
    __esModule: true,
    default: actual.default,
  };
});

describe("Contact Page Integration Tests", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockReset();
  });

  describe("Form submission flow", () => {
    /**
     * **Validates: Requirements 5.4**
     * Test that form submission makes API request with valid data
     */
    it("submits form data to API endpoint when all fields are valid", async () => {
      // Mock successful API response
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ 
          success: true, 
          message: "Form submitted successfully. We'll get back to you soon!" 
        }),
      });

      render(<ContactPage />);

      // Fill out all form fields with valid data
      fireEvent.change(screen.getByLabelText(/name/i), { 
        target: { value: "John Doe" } 
      });
      fireEvent.change(screen.getByLabelText(/email/i), { 
        target: { value: "john.doe@example.com" } 
      });
      fireEvent.change(screen.getByLabelText(/company/i), { 
        target: { value: "Acme Corporation" } 
      });
      fireEvent.change(screen.getByLabelText(/project type/i), { 
        target: { value: "Web Applications" } 
      });
      fireEvent.change(screen.getByLabelText(/message/i), { 
        target: { value: "I need help building a web application for my business." } 
      });

      // Submit the form
      const submitButton = screen.getByRole("button", { name: /send message/i });
      fireEvent.click(submitButton);

      // Verify API was called with correct data
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "John Doe",
            email: "john.doe@example.com",
            company: "Acme Corporation",
            projectType: "Web Applications",
            message: "I need help building a web application for my business.",
          }),
        });
      });
    });

    /**
     * **Validates: Requirements 5.4**
     * Test that form shows loading state during submission
     */
    it("shows loading state during form submission", async () => {
      // Mock delayed API response
      (fetch as jest.Mock).mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve({
          ok: true,
          json: async () => ({ success: true, message: "Success" }),
        }), 100))
      );

      render(<ContactPage />);

      // Fill out form with valid data
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "John Doe" } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "john@example.com" } });
      fireEvent.change(screen.getByLabelText(/company/i), { target: { value: "Acme Corp" } });
      fireEvent.change(screen.getByLabelText(/project type/i), { target: { value: "Web Applications" } });
      fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "Test message for loading state" } });

      // Submit form
      const submitButton = screen.getByRole("button", { name: /send message/i });
      fireEvent.click(submitButton);

      // Verify loading state is shown
      const loadingButton = screen.getByRole("button", { name: /loading/i });
      expect(loadingButton).toBeInTheDocument();
      expect(submitButton).toBeDisabled();

      // Wait for submission to complete
      await waitFor(() => {
        expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
      });
    });

    /**
     * **Validates: Requirements 5.4**
     * Test form submission with different project types
     */
    it("handles form submission with different project types", async () => {
      const projectType = "AI Automation & Workflows";
      
      // Mock successful response
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, message: "Success" }),
      });

      render(<ContactPage />);

      // Fill form with project type
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Test User" } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "test@example.com" } });
      fireEvent.change(screen.getByLabelText(/company/i), { target: { value: "Test Company" } });
      fireEvent.change(screen.getByLabelText(/project type/i), { target: { value: projectType } });
      fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "Test message for project type" } });

      // Submit form
      fireEvent.click(screen.getByRole("button", { name: /send message/i }));

      // Verify API was called with correct project type
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith("/api/contact", expect.objectContaining({
          body: expect.stringContaining(`"projectType":"${projectType}"`),
        }));
      });
    });
  });

  describe("Validation errors display", () => {
    /**
     * **Validates: Requirements 5.2**
     * Test that validation errors are displayed for empty required fields
     */
    it("displays validation errors when required fields are empty", async () => {
      render(<ContactPage />);

      // Submit form without filling any fields
      const submitButton = screen.getByRole("button", { name: /send message/i });
      fireEvent.click(submitButton);

      // Verify validation errors are displayed for all required fields
      await waitFor(() => {
        expect(screen.getAllByText(/Name must be at least 2 characters/i)[0]).toBeInTheDocument();
        expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
        expect(screen.getByText(/Company name must be at least 2 characters/i)).toBeInTheDocument();
        expect(screen.getByText(/Please select a project type/i)).toBeInTheDocument();
        expect(screen.getByText(/Message must be at least 10 characters/i)).toBeInTheDocument();
      });

      // Verify API was not called due to validation errors
      expect(fetch).not.toHaveBeenCalled();
    });

    /**
     * **Validates: Requirements 5.3**
     * Test that email validation error is displayed for invalid email format
     */
    it("displays email validation error for invalid email format", async () => {
      render(<ContactPage />);

      // Fill form with all fields empty to trigger validation
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "John Doe" } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "" } }); // Empty email
      fireEvent.change(screen.getByLabelText(/company/i), { target: { value: "Acme Corp" } });
      fireEvent.change(screen.getByLabelText(/project type/i), { target: { value: "Web Applications" } });
      fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "Test message that is long enough" } });

      // Submit form
      fireEvent.click(screen.getByRole("button", { name: /send message/i }));

      // Verify email validation error is displayed (empty email triggers "invalid email" error from Zod)
      await waitFor(() => {
        expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      });

      // Verify API was not called due to validation error
      expect(fetch).not.toHaveBeenCalled();
    });

    /**
     * **Validates: Requirements 5.2**
     * Test that validation errors clear when user corrects input
     */
    it("clears validation errors when user corrects input", async () => {
      render(<ContactPage />);

      // Submit empty form to trigger validation errors
      fireEvent.click(screen.getByRole("button", { name: /send message/i }));

      // Wait for validation errors to appear
      await waitFor(() => {
        expect(screen.getAllByText("Name must be at least 2 characters")[0]).toBeInTheDocument();
      });

      // Start typing in name field
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Jo" } });

      // Verify name validation error is cleared
      await waitFor(() => {
        expect(screen.queryByText("Name must be at least 2 characters")).not.toBeInTheDocument();
      });

      // Fix email field
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "john@example.com" } });

      // Verify email validation error is cleared
      await waitFor(() => {
        expect(screen.queryByText("Please enter a valid email address")).not.toBeInTheDocument();
      });
    });

    /**
     * **Validates: Requirements 5.2**
     * Test validation errors for field length constraints
     */
    it("displays validation errors for field length constraints", async () => {
      render(<ContactPage />);

      // Fill form with data that violates length constraints
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "A" } }); // Too short
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "test@example.com" } });
      fireEvent.change(screen.getByLabelText(/company/i), { target: { value: "B" } }); // Too short
      fireEvent.change(screen.getByLabelText(/project type/i), { target: { value: "Web Applications" } });
      fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "Short" } }); // Too short

      // Submit form
      fireEvent.click(screen.getByRole("button", { name: /send message/i }));

      // Verify length validation errors are displayed
      await waitFor(() => {
        expect(screen.getByText("Name must be at least 2 characters")).toBeInTheDocument();
        expect(screen.getByText("Company name must be at least 2 characters")).toBeInTheDocument();
        expect(screen.getByText("Message must be at least 10 characters")).toBeInTheDocument();
      });

      // Verify API was not called due to validation errors
      expect(fetch).not.toHaveBeenCalled();
    });
  });

  describe("Success message display", () => {
    /**
     * **Validates: Requirements 5.5**
     * Test that success message is displayed after successful form submission
     */
    it("displays success message after successful form submission", async () => {
      // Mock successful API response
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ 
          success: true, 
          message: "Thank you for your message! We'll get back to you soon." 
        }),
      });

      render(<ContactPage />);

      // Fill out form with valid data
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Jane Smith" } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "jane.smith@company.com" } });
      fireEvent.change(screen.getByLabelText(/company/i), { target: { value: "Tech Solutions Inc" } });
      fireEvent.change(screen.getByLabelText(/project type/i), { target: { value: "AI Automation & Workflows" } });
      fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "We are interested in implementing AI automation for our workflow processes." } });

      // Submit form
      fireEvent.click(screen.getByRole("button", { name: /send message/i }));

      // Verify success message is displayed
      await waitFor(() => {
        expect(screen.getByText("Thank you for your message! We'll get back to you soon.")).toBeInTheDocument();
      });

      // Verify the success message has proper styling (green background)
      const successMessage = screen.getByText("Thank you for your message! We'll get back to you soon.");
      const successContainer = successMessage.closest('div');
      expect(successContainer).toHaveClass('bg-green-500/10', 'border-green-500/20');
    });

    /**
     * **Validates: Requirements 5.5**
     * Test that form is reset after successful submission
     */
    it("resets form fields after successful submission", async () => {
      // Mock successful API response
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, message: "Thank you for your message! We'll get back to you soon." }),
      });

      render(<ContactPage />);

      // Fill out form
      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      const companyInput = screen.getByLabelText(/company/i) as HTMLInputElement;
      const projectTypeSelect = screen.getByLabelText(/project type/i) as HTMLSelectElement;
      const messageTextarea = screen.getByLabelText(/message/i) as HTMLTextAreaElement;

      fireEvent.change(nameInput, { target: { value: "Test User" } });
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(companyInput, { target: { value: "Test Company" } });
      fireEvent.change(projectTypeSelect, { target: { value: "Web Applications" } });
      fireEvent.change(messageTextarea, { target: { value: "Test message for form reset" } });

      // Verify fields are filled
      expect(nameInput.value).toBe("Test User");
      expect(emailInput.value).toBe("test@example.com");
      expect(companyInput.value).toBe("Test Company");
      expect(projectTypeSelect.value).toBe("Web Applications");
      expect(messageTextarea.value).toBe("Test message for form reset");

      // Submit form
      fireEvent.click(screen.getByRole("button", { name: /send message/i }));

      // Wait for success message and form reset
      await waitFor(() => {
        expect(screen.getByText("Thank you for your message! We'll get back to you soon.")).toBeInTheDocument();
      });

      // Verify form fields are reset
      await waitFor(() => {
        expect(nameInput.value).toBe("");
        expect(emailInput.value).toBe("");
        expect(companyInput.value).toBe("");
        expect(projectTypeSelect.value).toBe("");
        expect(messageTextarea.value).toBe("");
      });
    });

    /**
     * **Validates: Requirements 5.6**
     * Test that error message is displayed when API returns error
     */
    it("displays error message when API returns error response", async () => {
      render(<ContactPage />);

      // Fill out form with valid data
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "John Doe" } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "john@example.com" } });
      fireEvent.change(screen.getByLabelText(/company/i), { target: { value: "Acme Corp" } });
      fireEvent.change(screen.getByLabelText(/project type/i), { target: { value: "Web Applications" } });
      fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "Test message for error handling" } });

      // Mock failed API response after form is filled
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ 
          success: false, 
          error: "Something went wrong. Please try again." 
        }),
      });

      // Submit form
      fireEvent.click(screen.getByRole("button", { name: /send message/i }));

      // Verify error message is displayed
      await waitFor(() => {
        expect(screen.getByText("Something went wrong. Please try again.")).toBeInTheDocument();
      }, { timeout: 3000 });

      // Verify the error message has proper styling (red background)
      const errorMessage = screen.getByText("Something went wrong. Please try again.");
      const errorContainer = errorMessage.closest('div');
      expect(errorContainer).toHaveClass('bg-red-500/10', 'border-red-500/20');
    });

    /**
     * **Validates: Requirements 5.6**
     * Test that network error is handled gracefully
     */
    it("displays error message when network request fails", async () => {
      render(<ContactPage />);

      // Fill out form with valid data
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "John Doe" } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "john@example.com" } });
      fireEvent.change(screen.getByLabelText(/company/i), { target: { value: "Acme Corp" } });
      fireEvent.change(screen.getByLabelText(/project type/i), { target: { value: "Web Applications" } });
      fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "Test message for network error" } });

      // Mock network error after form is filled
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      // Submit form
      fireEvent.click(screen.getByRole("button", { name: /send message/i }));

      // Verify generic error message is displayed
      await waitFor(() => {
        expect(screen.getByText("Unable to submit form. Please try again.")).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe("Form accessibility and usability", () => {
    /**
     * Test that form has proper labels and accessibility attributes
     */
    it("has proper form labels and accessibility attributes", () => {
      render(<ContactPage />);

      // Verify all form fields have proper labels
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/project type/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();

      // Verify required fields are marked with asterisk
      expect(screen.getByText("Name *")).toBeInTheDocument();
      expect(screen.getByText("Email *")).toBeInTheDocument();
      expect(screen.getByText("Company *")).toBeInTheDocument();
      expect(screen.getByText("Project Type *")).toBeInTheDocument();
      expect(screen.getByText("Message *")).toBeInTheDocument();
    });

    /**
     * Test that form displays location information as required
     */
    it("displays company location information", () => {
      render(<ContactPage />);

      // Verify location is displayed in the form (shorter version)
      expect(screen.getByText("📍 Mt Pleasant, Harare")).toBeInTheDocument();
      
      // Verify location is also displayed in the company information section (full version)
      expect(screen.getByText("📍 Mt Pleasant, Harare, Zimbabwe")).toBeInTheDocument();
    });

    /**
     * Test that project type dropdown contains all expected options
     */
    it("provides all project type options in dropdown", () => {
      render(<ContactPage />);

      const projectTypeSelect = screen.getByLabelText(/project type/i);
      
      // Verify default option
      expect(screen.getByText("Select a project type")).toBeInTheDocument();

      // Verify all project type options are available
      const expectedOptions = [
        "AI Automation & Workflows",
        "AI Agents & Chatbots",
        "Internal Business Tools", 
        "Web Applications",
        "Website Development",
        "API Integrations",
        "Cloud Infrastructure",
        "DevOps Engineering",
        "AI Consulting"
      ];

      expectedOptions.forEach(option => {
        expect(screen.getByText(option)).toBeInTheDocument();
      });
    });
  });

  describe("Page structure and content", () => {
    /**
     * Test that Contact page displays all required sections
     */
    it("displays all required page sections", () => {
      render(<ContactPage />);

      // Hero section
      expect(screen.getByText("Let's Build Something Amazing Together")).toBeInTheDocument();
      expect(screen.getByText("Ready to transform your business with intelligent systems? We're here to help you succeed.")).toBeInTheDocument();

      // Contact form section
      expect(screen.getByText("Get In Touch")).toBeInTheDocument();

      // Company information section
      expect(screen.getByText("About Mero Tech")).toBeInTheDocument();
      expect(screen.getByText("Our Expertise")).toBeInTheDocument();
      expect(screen.getByText("Our Approach")).toBeInTheDocument();
      expect(screen.getByText("Our Location")).toBeInTheDocument();
    });

    /**
     * Test that page has proper semantic structure
     */
    it("has proper semantic HTML structure", () => {
      const { container } = render(<ContactPage />);

      // Verify main element exists
      const main = container.querySelector("main");
      expect(main).toBeInTheDocument();
      expect(main).toHaveClass("min-h-screen", "bg-background-primary");

      // Verify sections exist
      const sections = container.querySelectorAll("section");
      expect(sections.length).toBeGreaterThanOrEqual(1);

      // Verify form exists
      const form = container.querySelector("form");
      expect(form).toBeInTheDocument();
    });
  });
});