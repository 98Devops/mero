# Design Document: Mero Tech Marketing Website

## Overview

The Mero Tech marketing website is a modern, performant Next.js application that showcases the company's AI automation and development services. The architecture follows Next.js 14 App Router conventions with a focus on performance, maintainability, and clean design aesthetics.

The system consists of five main pages (Home, What We Do, Services, Portfolio, Contact) with shared components for navigation, service cards, portfolio items, and a contact form. The design emphasizes performance through image optimization, lazy loading, and minimal JavaScript bundle size while providing subtle animations using Framer Motion.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Next.js App Router                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Home   │  │ What We  │  │ Services │  │Portfolio │   │
│  │   Page   │  │ Do Page  │  │   Page   │  │   Page   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                               │
│  ┌──────────┐                                                │
│  │ Contact  │                                                │
│  │   Page   │                                                │
│  └──────────┘                                                │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                    Shared Components                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Navigation│  │  Service │  │Portfolio │  │ Contact  │   │
│  │  Header  │  │   Card   │  │   Item   │  │   Form   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │  Glass   │  │ Animated │  │   Hero   │                  │
│  │   Card   │  │   Icon   │  │ Section  │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
├─────────────────────────────────────────────────────────────┤
│                      API Routes                              │
│  ┌──────────────────────────────────────┐                   │
│  │  POST /api/contact                   │                   │
│  │  - Validates form data               │                   │
│  │  - Sanitizes input                   │                   │
│  │  - Processes submission              │                   │
│  └──────────────────────────────────────┘                   │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animation**: Framer Motion
- **Image Optimization**: next/image
- **Form Validation**: Zod (lightweight schema validation)
- **HTTP Client**: Native fetch API

### Folder Structure

```
/app
  /api
    /contact
      route.ts          # Contact form API endpoint
  /(pages)
    /page.tsx           # Home page
    /what-we-do
      /page.tsx         # What We Do page
    /services
      /page.tsx         # Services page
    /portfolio
      /page.tsx         # Portfolio page
    /contact
      /page.tsx         # Contact page
  /layout.tsx           # Root layout with navigation
  /globals.css          # Global styles

/components
  /ui
    /GlassCard.tsx      # Glassmorphism card component
    /Button.tsx         # CTA button component
    /AnimatedIcon.tsx   # Animated icon component
  /sections
    /HeroSection.tsx    # Hero section component
    /ServicesGrid.tsx   # Services grid component
    /PortfolioGrid.tsx  # Portfolio grid component
  /forms
    /ContactForm.tsx    # Contact form component
  /navigation
    /Header.tsx         # Navigation header
    /MobileMenu.tsx     # Mobile navigation menu

/lib
  /validation.ts        # Form validation schemas
  /constants.ts         # Service and portfolio data
  /utils.ts             # Utility functions

/styles
  /animations.ts        # Framer Motion animation variants

/public
  /images               # Optimized images
  /icons                # SVG icons
```

## Components and Interfaces

### Core Components

#### 1. Navigation Header

```typescript
interface NavigationProps {
  currentPath: string;
}

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" }
];

// Component renders navigation with active state highlighting
// Mobile: Hamburger menu with slide-in drawer
// Desktop: Horizontal navigation bar
```

#### 2. Hero Section

```typescript
interface HeroSectionProps {
  headline: string;
  subheadline: string;
  primaryCTA: CTAButton;
  secondaryCTA: CTAButton;
}

interface CTAButton {
  label: string;
  href: string;
  variant: "primary" | "secondary";
}

// Renders hero with animated gradient background
// Uses Framer Motion for subtle gradient animation
// Responsive text sizing and button layout
```

#### 3. Glass Card

```typescript
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

// Styling:
// - Semi-transparent background (bg-white/5)
// - Backdrop blur (backdrop-blur-lg)
// - Subtle border (border border-white/10)
// - Rounded corners (rounded-xl)
// - Optional hover lift and glow effect
```

#### 4. Service Card

```typescript
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Renders as GlassCard with:
// - Animated icon at top
// - Service title
// - Service description
// - Hover: lift animation + subtle glow
```

#### 5. Portfolio Item

```typescript
interface PortfolioItemProps {
  project: ProjectData;
}

interface ProjectData {
  id: string;
  name: string;
  category: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  projectUrl?: string;
}

// Renders as GlassCard with:
// - Optimized image (next/image with lazy loading)
// - Project metadata
// - Tech stack tags
// - Hover: overlay with "View Project"
```

#### 6. Contact Form

```typescript
interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
}

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
}

interface FormState {
  status: "idle" | "submitting" | "success" | "error";
  message?: string;
}

// Form validation using Zod schema
// Client-side validation before submission
// Displays validation errors inline
// Shows success/error messages after submission
```

### API Routes

#### Contact Form Endpoint

```typescript
// POST /api/contact

interface ContactRequest {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
}

// Validation:
// - All fields required
// - Email format validation
// - String length limits (name: 2-100, message: 10-1000)
// - Input sanitization to prevent XSS

// Response codes:
// - 200: Success
// - 400: Validation error
// - 500: Server error
```

## Data Models

### Service Data

```typescript
interface Service {
  id: string;
  icon: string;          // Icon identifier
  title: string;
  description: string;
  category: ServiceCategory;
}

type ServiceCategory = 
  | "ai-automation"
  | "development"
  | "infrastructure"
  | "consulting";

// Services stored in /lib/constants.ts
const services: Service[] = [
  {
    id: "ai-automations",
    icon: "automation",
    title: "AI Automations & Workflows",
    description: "Streamline operations with intelligent automation",
    category: "ai-automation"
  },
  // ... 8 more services
];
```

### Portfolio Data

```typescript
interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  description: string;
  techStack: string[];
  imageUrl: string;
  projectUrl?: string;
  featured: boolean;
}

type ProjectCategory =
  | "ai-automation"
  | "web-app"
  | "internal-tool"
  | "infrastructure"
  | "integration";

// Projects stored in /lib/constants.ts
// Images stored in /public/images/portfolio/
// Optimized using next/image with:
// - width/height specified
// - quality: 85
// - format: webp
// - loading: lazy (except above fold)
```

### Form Validation Schema

```typescript
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  
  email: z.string()
    .email("Please enter a valid email address"),
  
  company: z.string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),
  
  projectType: z.string()
    .min(1, "Please select a project type"),
  
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters")
});

type ContactFormData = z.infer<typeof contactFormSchema>;
```

## Animation System

### Framer Motion Variants

```typescript
// Hover lift effect for cards
const cardHoverVariant = {
  rest: {
    y: 0,
    boxShadow: "0 0 0 rgba(0, 0, 0, 0)"
  },
  hover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Gradient animation for hero
const gradientVariant = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 10,
      ease: "linear",
      repeat: Infinity
    }
  }
};

// Fade in on scroll
const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Stagger children animation
const staggerContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

### Animation Guidelines

- Use `initial`, `animate`, and `whileHover` props
- Keep animation durations under 0.6s
- Use easing functions: "easeOut", "easeInOut"
- Avoid animating expensive properties (width, height)
- Prefer transforms (translateY, scale) and opacity
- Use `layoutId` for shared element transitions between pages

## Performance Optimization

### Image Optimization Strategy

```typescript
// next/image configuration
const imageConfig = {
  quality: 85,
  formats: ["webp"],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
};

// Usage pattern:
<Image
  src="/images/portfolio/project.jpg"
  alt="Project name"
  width={600}
  height={400}
  loading="lazy"  // except hero images
  placeholder="blur"
  blurDataURL="data:image/..."
/>
```

### Code Splitting Strategy

- Use dynamic imports for heavy components
- Lazy load portfolio images below the fold
- Split animation variants into separate file
- Use React.lazy() for mobile menu (only loads when opened)

```typescript
// Example: Lazy load mobile menu
const MobileMenu = dynamic(() => import("@/components/navigation/MobileMenu"), {
  ssr: false,
  loading: () => <div>Loading...</div>
});
```

### Bundle Size Optimization

- Avoid heavy libraries (Three.js, GSAP, Lottie)
- Use Framer Motion selectively (only import needed functions)
- Tree-shake TailwindCSS (purge unused classes)
- Minimize custom CSS (prefer Tailwind utilities)
- Use native browser APIs where possible

### Performance Targets

- Lighthouse Performance: 90+
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.0s
- Time to Interactive (TTI): < 2.0s
- Cumulative Layout Shift (CLS): < 0.1
- Total Bundle Size: < 200KB (gzipped)

## Design System

### Color Palette

```typescript
// TailwindCSS theme extension
const colors = {
  background: {
    primary: "#0a0a0a",      // Dark background
    secondary: "#141414",    // Slightly lighter
    gradient: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)"
  },
  glass: {
    background: "rgba(255, 255, 255, 0.05)",
    border: "rgba(255, 255, 255, 0.1)"
  },
  accent: {
    primary: "#00f5ff",      // Neon cyan
    secondary: "#7c3aed"     // Purple
  },
  text: {
    primary: "#ffffff",
    secondary: "#a0a0a0",
    muted: "#666666"
  }
};
```

### Typography

```typescript
// Font configuration
const fonts = {
  sans: ["Inter", "system-ui", "sans-serif"],
  mono: ["JetBrains Mono", "monospace"]
};

// Type scale
const typography = {
  h1: "text-5xl md:text-6xl lg:text-7xl font-bold",
  h2: "text-4xl md:text-5xl font-bold",
  h3: "text-3xl md:text-4xl font-semibold",
  h4: "text-2xl md:text-3xl font-semibold",
  body: "text-base md:text-lg",
  small: "text-sm md:text-base"
};
```

### Spacing System

```typescript
// Consistent spacing using Tailwind scale
const spacing = {
  section: "py-20 md:py-32",      // Vertical section padding
  container: "px-6 md:px-12 lg:px-24",  // Horizontal container padding
  cardGap: "gap-6 md:gap-8",      // Grid gap for cards
  elementGap: "space-y-4 md:space-y-6"  // Vertical element spacing
};
```

### Glassmorphism Style

```css
/* Glass card base styles */
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
}

/* Glass card hover effect */
.glass-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 30px rgba(0, 245, 255, 0.1);
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Navigation consistency across pages

*For any* page in the website, the navigation header should be present and display all five navigation links with the current page highlighted as active.

**Validates: Requirements 1.2, 1.4**

### Property 2: Navigation link routing

*For any* navigation link, clicking it should navigate to the correct corresponding page route.

**Validates: Requirements 1.3**

### Property 3: Service card structure completeness

*For any* service card rendered on the page, it should display an icon, title, and description, and hovering over it should trigger a lift animation.

**Validates: Requirements 3.3, 3.4, 3.5**

### Property 4: Portfolio item structure completeness

*For any* portfolio item rendered on the page, it should display project name, category, description, and tech stack tags, and hovering should reveal an overlay.

**Validates: Requirements 4.2, 4.3**

### Property 5: Portfolio item navigation

*For any* portfolio item, clicking it should navigate to the project detail view.

**Validates: Requirements 4.4**

### Property 6: Image optimization compliance

*For any* image rendered on the website, it should use the Next.js Image component with proper optimization attributes (width, height, and lazy loading for below-fold images).

**Validates: Requirements 4.5, 6.3, 6.4, 10.5**

### Property 7: Form validation for required fields

*For any* required field in the contact form, submitting the form with that field empty should display a validation error and prevent submission.

**Validates: Requirements 5.2**

### Property 8: Email validation

*For any* string that doesn't match valid email format, submitting the contact form with that string in the email field should display an email validation error.

**Validates: Requirements 5.3**

### Property 9: Form submission with valid data

*For any* valid contact form data (all fields filled correctly), submitting the form should make a POST request to the /api/contact endpoint.

**Validates: Requirements 5.4**

### Property 10: Glass card styling consistency

*For any* glass card component rendered on the website, it should have glassmorphism styling properties (semi-transparent background, backdrop blur, and subtle border).

**Validates: Requirements 8.2**

### Property 11: Interactive element hover feedback

*For any* interactive element (buttons, cards, links), hovering over it should provide visual feedback through state changes.

**Validates: Requirements 9.4**

### Property 12: API request validation

*For any* POST request to the /api/contact endpoint, the API should validate the request data against the schema before processing.

**Validates: Requirements 12.2**

### Property 13: API error handling for invalid data

*For any* invalid contact form data sent to the API, the endpoint should return a 400 status code with validation error details.

**Validates: Requirements 12.3**

### Property 14: API success handling for valid data

*For any* valid contact form data sent to the API, the endpoint should return a 200 status code with a success response.

**Validates: Requirements 12.4**

### Property 15: Input sanitization

*For any* user input containing potentially dangerous characters (HTML tags, script tags, SQL injection patterns), the API should sanitize the input before processing.

**Validates: Requirements 12.5**

## Error Handling

### Client-Side Error Handling

**Form Validation Errors**:
- Display inline validation errors below each field
- Show field-specific error messages (e.g., "Email is required", "Invalid email format")
- Prevent form submission until all validation passes
- Clear errors when user corrects the input

**Network Errors**:
- Catch fetch errors and display user-friendly message
- Show "Unable to submit form. Please try again." message
- Provide retry mechanism
- Log errors to console for debugging

**Image Loading Errors**:
- Use next/image built-in error handling
- Provide fallback placeholder for failed images
- Log image loading errors

### Server-Side Error Handling

**API Route Error Handling**:

```typescript
// Error response structure
interface ErrorResponse {
  success: false;
  error: string;
  details?: Record<string, string[]>;  // Validation errors
}

// Error handling pattern
try {
  // Validate input
  const validatedData = contactFormSchema.parse(requestData);
  
  // Sanitize input
  const sanitizedData = sanitizeInput(validatedData);
  
  // Process submission
  await processContactForm(sanitizedData);
  
  return Response.json({ success: true, message: "Form submitted successfully" });
  
} catch (error) {
  if (error instanceof z.ZodError) {
    // Validation error
    return Response.json(
      { 
        success: false, 
        error: "Validation failed",
        details: error.flatten().fieldErrors 
      },
      { status: 400 }
    );
  }
  
  // Server error
  console.error("Contact form error:", error);
  return Response.json(
    { success: false, error: "Internal server error" },
    { status: 500 }
  );
}
```

**Input Sanitization**:

```typescript
import DOMPurify from "isomorphic-dompurify";

function sanitizeInput(data: ContactFormData): ContactFormData {
  return {
    name: DOMPurify.sanitize(data.name.trim()),
    email: DOMPurify.sanitize(data.email.trim().toLowerCase()),
    company: DOMPurify.sanitize(data.company.trim()),
    projectType: DOMPurify.sanitize(data.projectType.trim()),
    message: DOMPurify.sanitize(data.message.trim())
  };
}
```

### Error Boundaries

```typescript
// Root error boundary for catching React errors
"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
        <button
          onClick={reset}
          className="px-6 py-3 bg-accent-primary text-white rounded-lg"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
```

## Testing Strategy

### Dual Testing Approach

The testing strategy employs both unit tests and property-based tests to ensure comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, and error conditions
- **Property tests**: Verify universal properties across all inputs

Both approaches are complementary and necessary. Unit tests catch concrete bugs in specific scenarios, while property tests verify general correctness across a wide range of inputs.

### Unit Testing

**Focus Areas**:
- Specific content rendering (hero text, service titles, etc.)
- Component integration points
- Edge cases (empty states, error states)
- Responsive behavior at specific breakpoints
- API endpoint existence and configuration

**Testing Library**: React Testing Library + Jest

**Example Unit Tests**:

```typescript
// Hero section content
describe("HeroSection", () => {
  it("displays correct headline and subheadline", () => {
    render(<HeroSection />);
    expect(screen.getByText("Building Intelligent Systems for Modern Businesses")).toBeInTheDocument();
    expect(screen.getByText("AI Automation. Internal Tools. Scalable Infrastructure.")).toBeInTheDocument();
  });
  
  it("renders both CTA buttons", () => {
    render(<HeroSection />);
    expect(screen.getByText("Book a Consultation")).toBeInTheDocument();
    expect(screen.getByText("View Our Work")).toBeInTheDocument();
  });
});

// Navigation
describe("Navigation", () => {
  it("displays all five navigation links", () => {
    render(<Header currentPath="/" />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("What We Do")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });
});

// Form validation edge cases
describe("ContactForm", () => {
  it("shows error when submitting empty form", async () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByText("Submit"));
    expect(await screen.findByText(/Name must be at least 2 characters/)).toBeInTheDocument();
  });
  
  it("shows success message after successful submission", async () => {
    // Mock successful API response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true, message: "Form submitted" })
      })
    );
    
    render(<ContactForm />);
    // Fill form...
    fireEvent.click(screen.getByText("Submit"));
    expect(await screen.findByText(/Form submitted successfully/)).toBeInTheDocument();
  });
});
```

### Property-Based Testing

**Focus Areas**:
- Universal component behaviors (all cards, all images, all forms)
- Validation logic across all possible inputs
- API behavior across all request types
- Hover interactions across all interactive elements

**Testing Library**: fast-check (JavaScript property-based testing library)

**Configuration**:
- Minimum 100 iterations per property test
- Each test tagged with feature name and property number
- Tag format: `Feature: mero-tech-website, Property {N}: {property text}`

**Example Property Tests**:

```typescript
import fc from "fast-check";

// Property 3: Service card structure completeness
describe("Property 3: Service card structure", () => {
  it("Feature: mero-tech-website, Property 3: For any service card, it should display icon, title, and description", () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string(),
          icon: fc.string(),
          title: fc.string({ minLength: 1 }),
          description: fc.string({ minLength: 1 }),
          category: fc.constantFrom("ai-automation", "development", "infrastructure", "consulting")
        }),
        (service) => {
          const { container } = render(<ServiceCard {...service} />);
          
          // Should have icon
          expect(container.querySelector('[data-testid="service-icon"]')).toBeInTheDocument();
          
          // Should have title
          expect(screen.getByText(service.title)).toBeInTheDocument();
          
          // Should have description
          expect(screen.getByText(service.description)).toBeInTheDocument();
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Property 8: Email validation
describe("Property 8: Email validation", () => {
  it("Feature: mero-tech-website, Property 8: For any invalid email string, validation should fail", () => {
    fc.assert(
      fc.property(
        fc.string().filter(s => !s.includes("@") || !s.includes(".")),
        (invalidEmail) => {
          const result = contactFormSchema.safeParse({
            name: "Test User",
            email: invalidEmail,
            company: "Test Co",
            projectType: "Web App",
            message: "Test message"
          });
          
          expect(result.success).toBe(false);
          if (!result.success) {
            expect(result.error.issues.some(issue => issue.path.includes("email"))).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Property 13: API error handling
describe("Property 13: API error handling for invalid data", () => {
  it("Feature: mero-tech-website, Property 13: For any invalid data, API returns 400", async () => {
    fc.assert(
      fc.asyncProperty(
        fc.record({
          name: fc.string({ maxLength: 1 }),  // Too short
          email: fc.string(),
          company: fc.string(),
          projectType: fc.string(),
          message: fc.string()
        }),
        async (invalidData) => {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(invalidData)
          });
          
          expect(response.status).toBe(400);
          const data = await response.json();
          expect(data.success).toBe(false);
          expect(data.error).toBeDefined();
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Property 15: Input sanitization
describe("Property 15: Input sanitization", () => {
  it("Feature: mero-tech-website, Property 15: For any input with dangerous characters, they should be sanitized", () => {
    fc.assert(
      fc.property(
        fc.string().map(s => s + "<script>alert('xss')</script>"),
        (maliciousInput) => {
          const sanitized = DOMPurify.sanitize(maliciousInput);
          
          // Should not contain script tags
          expect(sanitized).not.toContain("<script>");
          expect(sanitized).not.toContain("</script>");
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Integration Testing

**Focus Areas**:
- End-to-end user flows (navigation, form submission)
- Page load performance
- Image optimization verification
- Responsive behavior across viewports

**Testing Library**: Playwright

**Example Integration Tests**:

```typescript
import { test, expect } from "@playwright/test";

test("user can navigate through all pages", async ({ page }) => {
  await page.goto("/");
  
  // Navigate to each page
  await page.click('text=What We Do');
  await expect(page).toHaveURL("/what-we-do");
  
  await page.click('text=Services');
  await expect(page).toHaveURL("/services");
  
  await page.click('text=Portfolio');
  await expect(page).toHaveURL("/portfolio");
  
  await page.click('text=Contact');
  await expect(page).toHaveURL("/contact");
});

test("user can submit contact form", async ({ page }) => {
  await page.goto("/contact");
  
  await page.fill('input[name="name"]', "John Doe");
  await page.fill('input[name="email"]', "john@example.com");
  await page.fill('input[name="company"]', "Acme Corp");
  await page.selectOption('select[name="projectType"]', "Web Application");
  await page.fill('textarea[name="message"]', "I need help with a project");
  
  await page.click('button[type="submit"]');
  
  await expect(page.locator('text=Form submitted successfully')).toBeVisible();
});

test("images are lazy loaded", async ({ page }) => {
  await page.goto("/portfolio");
  
  const images = page.locator("img");
  const count = await images.count();
  
  for (let i = 0; i < count; i++) {
    const loading = await images.nth(i).getAttribute("loading");
    // Images below fold should have loading="lazy"
    if (i > 2) {  // Assuming first 3 are above fold
      expect(loading).toBe("lazy");
    }
  }
});
```

### Performance Testing

**Lighthouse CI**:
- Run Lighthouse audits in CI pipeline
- Fail build if performance score < 90
- Monitor Core Web Vitals (LCP, FID, CLS)

**Bundle Size Monitoring**:
- Use @next/bundle-analyzer
- Set budget: < 200KB gzipped
- Alert on bundle size increases

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // ... other config
});
```

### Test Coverage Goals

- Unit test coverage: 80%+ for components and utilities
- Property test coverage: All universal properties (15 properties)
- Integration test coverage: All critical user flows
- Performance tests: All pages meet Lighthouse 90+ target

### Continuous Integration

```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:property
      - run: npm run test:integration
      - run: npm run lighthouse
```
