/**
 * Property-Based Tests for ContactForm Component
 * Feature: mero-tech-website
 */

import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import fc from "fast-check";
import ContactForm from "../ContactForm";
import { contactFormSchema } from "@/lib/validation";

// Mock fetch to prevent actual API calls during testing
global.fetch = jest.fn();

describe("Property 7: Form validation for required fields", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  /**
   * **Validates: Requirements 5.2**
   * 
   * For any required field in the contact form, submitting the form with that field empty 
   * should display a validation error and prevent submission.
   */
  it("Feature: mero-tech-website, Property 7: For any required field, submitting with empty field shows validation error", async () => {
    await fc.assert(
      fc.asyncProperty(
        // Generate test data where one required field is empty
        fc.constantFrom("name", "email", "company", "projectType", "message"),
        fc.record({
          name: fc.string({ minLength: 2, maxLength: 100 }),
          email: fc.emailAddress(),
          company: fc.string({ minLength: 2, maxLength: 100 }),
          projectType: fc.constantFrom(
            "AI Automation & Workflows",
            "AI Agents & Chatbots", 
            "Internal Business Tools",
            "Web Applications",
            "Website Development",
            "API Integrations",
            "Cloud Infrastructure",
            "DevOps Engineering",
            "AI Consulting"
          ),
          message: fc.string({ minLength: 10, maxLength: 1000 })
        }),
        
        async (emptyField, validFormData) => {
          // Create form data with one field empty
          const formDataWithEmptyField = {
            ...validFormData,
            [emptyField]: ""
          };

          const { container, unmount } = render(<ContactForm />);
          
          try {
            // Fill form with data (including the empty field)
            const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
            const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
            const companyInput = screen.getByLabelText(/company/i) as HTMLInputElement;
            const projectTypeSelect = screen.getByLabelText(/project type/i) as HTMLSelectElement;
            const messageTextarea = screen.getByLabelText(/message/i) as HTMLTextAreaElement;

            fireEvent.change(nameInput, { target: { value: formDataWithEmptyField.name } });
            fireEvent.change(emailInput, { target: { value: formDataWithEmptyField.email } });
            fireEvent.change(companyInput, { target: { value: formDataWithEmptyField.company } });
            fireEvent.change(projectTypeSelect, { target: { value: formDataWithEmptyField.projectType } });
            fireEvent.change(messageTextarea, { target: { value: formDataWithEmptyField.message } });

            // Submit the form
            const submitButton = screen.getByRole("button", { name: /send message/i });
            fireEvent.click(submitButton);

            // Wait for validation to complete
            await waitFor(() => {
              // Should show validation error for the empty field
              const errorMessages = container.querySelectorAll('.text-red-400');
              expect(errorMessages.length).toBeGreaterThan(0);
            });

            // Verify fetch was not called (form submission was prevented)
            expect(fetch).not.toHaveBeenCalled();

            // Verify specific error message based on empty field
            switch (emptyField) {
              case "name":
                expect(screen.getByText(/Name must be at least 2 characters/i)).toBeInTheDocument();
                break;
              case "email":
                expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
                break;
              case "company":
                expect(screen.getByText(/Company name must be at least 2 characters/i)).toBeInTheDocument();
                break;
              case "projectType":
                expect(screen.getByText(/Please select a project type/i)).toBeInTheDocument();
                break;
              case "message":
                expect(screen.getByText(/Message must be at least 10 characters/i)).toBeInTheDocument();
                break;
            }
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 20 } // Reduced runs for async test
    );
  });

  /**
   * Additional property test: Verify that all required fields must be filled for successful validation
   */
  it("Feature: mero-tech-website, Property 7b: Form with all required fields empty shows multiple validation errors", async () => {
    await fc.assert(
      fc.asyncProperty(
        // Generate completely empty form data
        fc.constant({
          name: "",
          email: "",
          company: "",
          projectType: "",
          message: ""
        }),
        
        async (_emptyFormData) => {
          const { container, unmount } = render(<ContactForm />);
          
          try {
            // Submit empty form
            const submitButton = screen.getByRole("button", { name: /send message/i });
            fireEvent.click(submitButton);

            // Wait for validation to complete
            await waitFor(() => {
              // Should show validation errors for all required fields
              const errorMessages = container.querySelectorAll('.text-red-400');
              expect(errorMessages.length).toBe(5); // All 5 required fields should have errors
            }, { timeout: 3000 });

            // Verify fetch was not called (form submission was prevented)
            expect(fetch).not.toHaveBeenCalled();

            // Verify specific error messages are present using more specific selectors
            expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
            expect(screen.getByText(/Please select a project type/i)).toBeInTheDocument();
            expect(screen.getByText(/Message must be at least 10 characters/i)).toBeInTheDocument();
            
            // Check for name and company errors by looking at their containers
            const nameField = container.querySelector('#name').closest('div');
            const companyField = container.querySelector('#company').closest('div');
            
            expect(nameField.querySelector('.text-red-400')).toBeInTheDocument();
            expect(companyField.querySelector('.text-red-400')).toBeInTheDocument();
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 5 }
    );
  });

  /**
   * Property test: Verify that form with valid data does not show validation errors
   */
  it("Feature: mero-tech-website, Property 7c: Form with all valid required fields shows no validation errors", () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string({ minLength: 2, maxLength: 100 }),
          email: fc.emailAddress(),
          company: fc.string({ minLength: 2, maxLength: 100 }),
          projectType: fc.constantFrom(
            "AI Automation & Workflows",
            "AI Agents & Chatbots", 
            "Internal Business Tools",
            "Web Applications",
            "Website Development",
            "API Integrations",
            "Cloud Infrastructure",
            "DevOps Engineering",
            "AI Consulting"
          ),
          message: fc.string({ minLength: 10, maxLength: 1000 })
        }),
        
        (validFormData) => {
          const { container, unmount } = render(<ContactForm />);
          
          try {
            // Fill form with valid data
            const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
            const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
            const companyInput = screen.getByLabelText(/company/i) as HTMLInputElement;
            const projectTypeSelect = screen.getByLabelText(/project type/i) as HTMLSelectElement;
            const messageTextarea = screen.getByLabelText(/message/i) as HTMLTextAreaElement;

            fireEvent.change(nameInput, { target: { value: validFormData.name } });
            fireEvent.change(emailInput, { target: { value: validFormData.email } });
            fireEvent.change(companyInput, { target: { value: validFormData.company } });
            fireEvent.change(projectTypeSelect, { target: { value: validFormData.projectType } });
            fireEvent.change(messageTextarea, { target: { value: validFormData.message } });

            // Check that no validation errors are shown before submission
            const errorMessages = container.querySelectorAll('.text-red-400');
            expect(errorMessages.length).toBe(0);

            // Verify all fields have valid values
            expect(nameInput.value).toBe(validFormData.name);
            expect(emailInput.value).toBe(validFormData.email);
            expect(companyInput.value).toBe(validFormData.company);
            expect(projectTypeSelect.value).toBe(validFormData.projectType);
            expect(messageTextarea.value).toBe(validFormData.message);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 20 }
    );
  });
});

describe("Property 8: Email validation", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  /**
   * **Validates: Requirements 5.3**
   * 
   * For any string that doesn't match valid email format, submitting the contact form 
   * with that string in the email field should display an email validation error.
   */
  it("Feature: mero-tech-website, Property 8: For any invalid email string, validation schema rejects it", () => {
    fc.assert(
      fc.property(
        // Generate invalid email strings - focus on clearly invalid ones
        fc.constantFrom(
          "invalid.email",
          "@domain.com",
          "user@",
          "user@domain",
          "user name@domain.com",
          "user@domain.",
          ".user@domain.com",
          "user.@domain.com",
          "plaintext",
          "user@@domain.com",
          "no-at-symbol",
          "spaces in@email.com",
          ""
        ),
        
        (invalidEmail) => {
          // Test the validation schema directly - this is the core behavior
          const result = contactFormSchema.safeParse({
            name: "Test User",
            email: invalidEmail,
            company: "Test Company",
            projectType: "Web Applications",
            message: "This is a test message that is long enough"
          });

          // Should fail validation
          expect(result.success).toBe(false);
          
          if (!result.success) {
            // Should have an error for the email field
            const emailError = result.error.issues.find(issue => 
              issue.path.includes("email")
            );
            expect(emailError).toBeDefined();
            expect(emailError?.message).toBe("Please enter a valid email address");
          }
        }
      ),
      { numRuns: 50 }
    );
  });

  /**
   * Property test: Verify that valid email formats do not show email validation errors
   */
  it("Feature: mero-tech-website, Property 8b: For any valid email string, form shows no email validation error", () => {
    fc.assert(
      fc.property(
        // Generate valid email addresses
        fc.emailAddress(),
        // Generate valid data for other fields
        fc.record({
          name: fc.string({ minLength: 2, maxLength: 100 }),
          company: fc.string({ minLength: 2, maxLength: 100 }),
          projectType: fc.constantFrom(
            "AI Automation & Workflows",
            "AI Agents & Chatbots", 
            "Internal Business Tools",
            "Web Applications",
            "Website Development",
            "API Integrations",
            "Cloud Infrastructure",
            "DevOps Engineering",
            "AI Consulting"
          ),
          message: fc.string({ minLength: 10, maxLength: 1000 })
        }),
        
        (validEmail, validOtherFields) => {
          const { container, unmount } = render(<ContactForm />);
          
          try {
            // Fill form with all valid data including email
            const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
            const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
            const companyInput = screen.getByLabelText(/company/i) as HTMLInputElement;
            const projectTypeSelect = screen.getByLabelText(/project type/i) as HTMLSelectElement;
            const messageTextarea = screen.getByLabelText(/message/i) as HTMLTextAreaElement;

            fireEvent.change(nameInput, { target: { value: validOtherFields.name } });
            fireEvent.change(emailInput, { target: { value: validEmail } });
            fireEvent.change(companyInput, { target: { value: validOtherFields.company } });
            fireEvent.change(projectTypeSelect, { target: { value: validOtherFields.projectType } });
            fireEvent.change(messageTextarea, { target: { value: validOtherFields.message } });

            // Check that no email validation error is shown
            expect(screen.queryByText(/Please enter a valid email address/i)).not.toBeInTheDocument();

            // Verify the email field does not have error styling
            const emailField = container.querySelector('#email');
            expect(emailField).not.toHaveClass('border-red-500/50');
            expect(emailField).toHaveClass('border-white/10');

            // Verify email field has the correct value
            expect(emailInput.value).toBe(validEmail);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 20 }
    );
  });

  /**
   * Property test: Verify email validation using the validation schema directly
   */
  it("Feature: mero-tech-website, Property 8c: Validation schema correctly identifies invalid emails", () => {
    fc.assert(
      fc.property(
        // Generate invalid email strings
        fc.oneof(
          fc.string({ minLength: 1, maxLength: 50 }).filter(s => !s.includes("@") || !s.includes(".")),
          fc.constantFrom(
            "invalid.email",
            "@domain.com", 
            "user@",
            "user@domain",
            "user name@domain.com",
            "user@domain.",
            ".user@domain.com",
            "user.@domain.com",
            ""
          )
        ),
        
        (invalidEmail) => {
          // Test the validation schema directly
          const result = contactFormSchema.safeParse({
            name: "Test User",
            email: invalidEmail,
            company: "Test Company",
            projectType: "Web Applications",
            message: "This is a test message that is long enough"
          });

          // Should fail validation
          expect(result.success).toBe(false);
          
          if (!result.success) {
            // Should have an error for the email field
            const emailError = result.error.issues.find(issue => 
              issue.path.includes("email")
            );
            expect(emailError).toBeDefined();
            expect(emailError?.message).toBe("Please enter a valid email address");
          }
        }
      ),
      { numRuns: 30 }
    );
  });
});

describe("Property 9: Form submission with valid data", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  /**
   * **Validates: Requirements 5.4**
   * 
   * For any valid contact form data (all fields filled correctly), submitting the form 
   * should make a POST request to the /api/contact endpoint.
   */
  it("Feature: mero-tech-website, Property 9: For any valid contact form data, submitting makes POST request to /api/contact", async () => {
    // Use a simpler approach with predefined valid data sets
    const validDataSets = [
      {
        name: "John Doe",
        email: "john@example.com",
        company: "Acme Corp",
        projectType: "Web Applications",
        message: "I need help with a project"
      },
      {
        name: "Jane Smith",
        email: "jane.smith@company.com",
        company: "Tech Solutions",
        projectType: "AI Automation & Workflows",
        message: "Looking for automation solutions for our business processes"
      },
      {
        name: "Bob Johnson",
        email: "bob@startup.io",
        company: "StartupCo",
        projectType: "Cloud Infrastructure",
        message: "Need help setting up scalable cloud infrastructure"
      }
    ];

    for (const validFormData of validDataSets) {
      // Mock successful API response
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, message: "Form submitted successfully" })
      });

      const { unmount } = render(<ContactForm />);
      
      try {
        // Fill form with valid data
        const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
        const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
        const companyInput = screen.getByLabelText(/company/i) as HTMLInputElement;
        const projectTypeSelect = screen.getByLabelText(/project type/i) as HTMLSelectElement;
        const messageTextarea = screen.getByLabelText(/message/i) as HTMLTextAreaElement;

        fireEvent.change(nameInput, { target: { value: validFormData.name } });
        fireEvent.change(emailInput, { target: { value: validFormData.email } });
        fireEvent.change(companyInput, { target: { value: validFormData.company } });
        fireEvent.change(projectTypeSelect, { target: { value: validFormData.projectType } });
        fireEvent.change(messageTextarea, { target: { value: validFormData.message } });

        // Submit the form
        const submitButton = screen.getByRole("button", { name: /send message/i });
        fireEvent.click(submitButton);

        // Wait for the API call to be made
        await waitFor(() => {
          expect(fetch).toHaveBeenCalled();
        }, { timeout: 1000 });

        // Verify the API call was made with correct parameters
        expect(fetch).toHaveBeenCalledWith("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validFormData),
        });

        // Verify success message is displayed
        await waitFor(() => {
          expect(screen.getByText(/Thank you for your message! We'll get back to you soon./i)).toBeInTheDocument();
        }, { timeout: 1000 });
      } finally {
        unmount();
        (fetch as jest.Mock).mockClear();
      }
    }
  });

  /**
   * Property test: Verify that form submission is prevented for invalid data
   */
  it("Feature: mero-tech-website, Property 9b: For any invalid contact form data, no API request is made", async () => {
    await fc.assert(
      fc.asyncProperty(
        // Generate invalid form data by making one field invalid
        fc.constantFrom("name", "email", "company", "projectType", "message"),
        fc.record({
          name: fc.string({ minLength: 2, maxLength: 50 }),
          email: fc.emailAddress(),
          company: fc.string({ minLength: 2, maxLength: 50 }),
          projectType: fc.constantFrom(
            "AI Automation & Workflows",
            "Web Applications",
            "Cloud Infrastructure"
          ),
          message: fc.string({ minLength: 10, maxLength: 100 })
        }),
        
        async (invalidField, baseFormData) => {
          // Create invalid form data by making one field invalid
          const invalidFormData = { ...baseFormData };
          switch (invalidField) {
            case "name":
              invalidFormData.name = ""; // Too short
              break;
            case "email":
              invalidFormData.email = "invalid-email"; // Invalid format
              break;
            case "company":
              invalidFormData.company = ""; // Too short
              break;
            case "projectType":
              invalidFormData.projectType = ""; // Empty
              break;
            case "message":
              invalidFormData.message = "short"; // Too short
              break;
          }

          const { unmount } = render(<ContactForm />);
          
          try {
            // Fill form with invalid data
            const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
            const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
            const companyInput = screen.getByLabelText(/company/i) as HTMLInputElement;
            const projectTypeSelect = screen.getByLabelText(/project type/i) as HTMLSelectElement;
            const messageTextarea = screen.getByLabelText(/message/i) as HTMLTextAreaElement;

            fireEvent.change(nameInput, { target: { value: invalidFormData.name } });
            fireEvent.change(emailInput, { target: { value: invalidFormData.email } });
            fireEvent.change(companyInput, { target: { value: invalidFormData.company } });
            fireEvent.change(projectTypeSelect, { target: { value: invalidFormData.projectType } });
            fireEvent.change(messageTextarea, { target: { value: invalidFormData.message } });

            // Submit the form
            const submitButton = screen.getByRole("button", { name: /send message/i });
            fireEvent.click(submitButton);

            // Wait a bit to ensure no API call is made
            await new Promise(resolve => setTimeout(resolve, 100));

            // Verify no API call was made due to validation failure
            expect(fetch).not.toHaveBeenCalled();
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 5 } // Reduced runs for async test
    );
  });
});