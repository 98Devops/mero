# Implementation Plan: Mero Tech Marketing Website

## Overview

This implementation plan breaks down the Mero Tech marketing website into discrete, incremental coding tasks. The approach follows a bottom-up strategy: establishing the foundation (project setup, design system, shared components), then building individual pages, and finally integrating everything together with testing and optimization.

The implementation uses Next.js 14 with App Router, TypeScript, TailwindCSS, and Framer Motion. Each task builds on previous work, ensuring no orphaned code and continuous integration.

## Tasks

- [x] 1. Project setup and configuration
  - Initialize Next.js 14 project with TypeScript and App Router
  - Configure TailwindCSS with custom theme (dark background, glass effects, neon accents)
  - Install and configure Framer Motion, Zod, and DOMPurify
  - Set up folder structure: /app, /components, /lib, /styles
  - Configure next.config.js for image optimization
  - Create tsconfig.json with strict type checking
  - Set up ESLint and Prettier
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.6_

- [ ] 2. Design system and base components
  - [x] 2.1 Create TailwindCSS theme configuration
    - Define color palette (dark background, glass colors, neon accents)
    - Configure typography scale and font families
    - Set up spacing system and responsive breakpoints
    - Add custom utilities for glassmorphism effects
    - _Requirements: 8.1, 8.2, 8.3, 8.4_
  
  - [x] 2.2 Create GlassCard component
    - Implement glassmorphism styling (semi-transparent, backdrop blur, border)
    - Add optional hover effect prop (lift + glow)
    - Support className prop for customization
    - _Requirements: 8.2_
  
  - [x] 2.3 Write property test for GlassCard styling
    - **Property 10: Glass card styling consistency**
    - **Validates: Requirements 8.2**
  
  - [x] 2.4 Create Button component
    - Implement primary and secondary variants
    - Add hover animations using Framer Motion
    - Support loading and disabled states
    - _Requirements: 2.3, 9.1_
  
  - [x] 2.5 Write property test for Button hover feedback
    - **Property 11: Interactive element hover feedback**
    - **Validates: Requirements 9.4**
  
  - [x] 2.6 Create animation variants file
    - Define cardHoverVariant (lift + shadow)
    - Define gradientVariant (subtle background animation)
    - Define fadeInVariant (scroll animations)
    - Define staggerContainerVariant (stagger children)
    - _Requirements: 9.1, 9.2_

- [ ] 3. Navigation system
  - [x] 3.1 Create Header component
    - Implement navigation with all five links (Home, What We Do, Services, Portfolio, Contact)
    - Add active state highlighting based on current path
    - Style with glassmorphism effect
    - _Requirements: 1.1, 1.2, 1.4_
  
  - [x] 3.2 Create MobileMenu component
    - Implement hamburger menu button
    - Create slide-in drawer with navigation links
    - Add Framer Motion animations for open/close
    - Use dynamic import for code splitting
    - _Requirements: 1.5_
  
  - [x] 3.3 Create root layout with navigation
    - Add Header component to app/layout.tsx
    - Configure global styles and fonts
    - Set up metadata for SEO
    - _Requirements: 1.2_
  
  - [x] 3.4 Write unit tests for navigation
    - Test that all five navigation links are present
    - Test active state highlighting
    - Test mobile menu rendering at mobile breakpoint
    - _Requirements: 1.1, 1.2, 1.4, 1.5_
  
  - [x] 3.5 Write property test for navigation consistency
    - **Property 1: Navigation consistency across pages**
    - **Validates: Requirements 1.2, 1.4**
  
  - [x] 3.6 Write property test for navigation routing
    - **Property 2: Navigation link routing**
    - **Validates: Requirements 1.3**

- [ ] 4. Home page - Hero section
  - [x] 4.1 Create HeroSection component
    - Implement headline: "Building Intelligent Systems for Modern Businesses"
    - Implement subheadline: "AI Automation. Internal Tools. Scalable Infrastructure."
    - Add two CTA buttons: "Book a Consultation" (links to /contact) and "View Our Work" (links to /portfolio)
    - Add animated gradient background using Framer Motion
    - Make responsive for mobile, tablet, desktop
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_
  
  - [x] 4.2 Write unit tests for Hero section
    - Test correct headline and subheadline text
    - Test both CTA buttons are present
    - Test CTA button navigation links
    - Test gradient animation is applied
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [ ] 5. Services data and components
  - [x] 5.1 Create services data in lib/constants.ts
    - Define Service interface (id, icon, title, description, category)
    - Create array of 9 services: AI Automations & Workflows, AI Agents & Chatbots, Internal Business Tools, Web Applications, Website Development, API Integrations, Cloud Infrastructure, DevOps Engineering, AI Consulting
    - _Requirements: 3.1_
  
  - [x] 5.2 Create AnimatedIcon component
    - Implement icon component with Framer Motion animations
    - Support different icon types for each service
    - Add subtle hover animation
    - _Requirements: 3.5_
  
  - [x] 5.3 Create ServiceCard component
    - Render as GlassCard with hoverEffect enabled
    - Display AnimatedIcon, title, and description
    - Apply hover lift and glow animations
    - _Requirements: 3.3, 3.4, 3.5_
  
  - [x] 5.4 Create ServicesGrid component
    - Render grid layout of ServiceCard components
    - Make responsive (1 column mobile, 2 columns tablet, 3 columns desktop)
    - Map over services data
    - _Requirements: 3.1, 3.2_
  
  - [x] 5.5 Write unit test for services data
    - Test that exactly 9 services are defined
    - Test all required service titles are present
    - _Requirements: 3.1_
  
  - [x] 5.6 Write property test for ServiceCard structure
    - **Property 3: Service card structure completeness**
    - **Validates: Requirements 3.3, 3.4, 3.5**

- [ ] 6. Portfolio data and components
  - [x] 6.1 Create portfolio data in lib/constants.ts
    - Define Project interface (id, name, category, description, techStack, imageUrl, projectUrl, featured)
    - Create array of sample projects with varied categories
    - _Requirements: 4.1, 4.2_
  
  - [x] 6.2 Create PortfolioItem component
    - Render as GlassCard with project image (using next/image)
    - Display project name, category, description, and tech stack tags
    - Add hover overlay with "View Project" text
    - Implement click handler for navigation
    - Configure image lazy loading
    - _Requirements: 4.2, 4.3, 4.4, 4.5_
  
  - [x] 6.3 Create PortfolioGrid component
    - Render grid layout of PortfolioItem components
    - Make responsive (1 column mobile, 2 columns tablet, 3 columns desktop)
    - Map over portfolio data
    - _Requirements: 4.1_
  
  - [x] 6.4 Write property test for PortfolioItem structure
    - **Property 4: Portfolio item structure completeness**
    - **Validates: Requirements 4.2, 4.3**
  
  - [x] 6.5 Write property test for PortfolioItem navigation
    - **Property 5: Portfolio item navigation**
    - **Validates: Requirements 4.4**
  
  - [x] 6.6 Write property test for image optimization
    - **Property 6: Image optimization compliance**
    - **Validates: Requirements 4.5, 6.3, 6.4, 10.5**

- [ ] 7. Contact form and validation
  - [x] 7.1 Create form validation schema in lib/validation.ts
    - Define contactFormSchema using Zod
    - Validate name (2-100 characters)
    - Validate email (valid email format)
    - Validate company (2-100 characters)
    - Validate projectType (required)
    - Validate message (10-1000 characters)
    - _Requirements: 5.2, 5.3_
  
  - [x] 7.2 Create ContactForm component
    - Implement form with 5 fields: Name, Email, Company, Project Type, Message
    - Add client-side validation using Zod schema
    - Display inline validation errors
    - Implement form submission handler
    - Show loading state during submission
    - Display success message after successful submission
    - Display error message on submission failure
    - Add location text: "Mt Pleasant, Harare"
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_
  
  - [x] 7.3 Write unit tests for ContactForm
    - Test all 5 form fields are present
    - Test location text is displayed
    - Test error message on empty form submission
    - Test success message after successful submission
    - _Requirements: 5.1, 5.7, 5.5, 5.6_
  
  - [x] 7.4 Write property test for required field validation
    - **Property 7: Form validation for required fields**
    - **Validates: Requirements 5.2**
  
  - [x] 7.5 Write property test for email validation
    - **Property 8: Email validation**
    - **Validates: Requirements 5.3**
  
  - [x] 7.6 Write property test for form submission
    - **Property 9: Form submission with valid data**
    - **Validates: Requirements 5.4**

- [ ] 8. Contact form API endpoint
  - [x] 8.1 Create API route at app/api/contact/route.ts
    - Implement POST handler
    - Validate request data using contactFormSchema
    - Sanitize user input using DOMPurify
    - Return 400 error for invalid data with validation details
    - Return 200 success for valid data
    - Implement error handling and logging
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_
  
  - [x] 8.2 Write property test for API validation
    - **Property 12: API request validation**
    - **Validates: Requirements 12.2**
  
  - [x] 8.3 Write property test for API error handling
    - **Property 13: API error handling for invalid data**
    - **Validates: Requirements 12.3**
  
  - [x] 8.4 Write property test for API success handling
    - **Property 14: API success handling for valid data**
    - **Validates: Requirements 12.4**
  
  - [x] 8.5 Write property test for input sanitization
    - **Property 15: Input sanitization**
    - **Validates: Requirements 12.5**

- [x] 9. Checkpoint - Core components complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Build Home page
  - [x] 10.1 Create app/page.tsx (Home page)
    - Add HeroSection component
    - Add "What We Do" section with value proposition paragraph
    - Add ServicesGrid component
    - Add PortfolioGrid component (show featured projects only)
    - Add Contact section with CTA to contact page
    - Apply section spacing and animations
    - _Requirements: 2.1, 2.2, 2.3, 3.1, 4.1, 11.4_
  
  - [x] 10.2 Write integration test for Home page
    - Test all sections are present
    - Test navigation to other pages from CTAs
    - _Requirements: 2.1, 3.1, 4.1_

- [ ] 11. Build What We Do page
  - [x] 11.1 Create app/what-we-do/page.tsx
    - Add hero section with page title
    - Add detailed value proposition content
    - Add company information and approach
    - Add CTA to services page
    - Apply consistent styling and animations
    - _Requirements: 1.1, 11.4_
  
  - [x] 11.2 Write unit test for What We Do page
    - Test value proposition paragraph is present
    - Test page structure and content
    - _Requirements: 11.4_

- [ ] 12. Build Services page
  - [x] 12.1 Create app/services/page.tsx
    - Add hero section with page title
    - Add ServicesGrid component (all services)
    - Add detailed descriptions for each service category
    - Add CTA to contact page
    - Apply consistent styling and animations
    - _Requirements: 1.1, 3.1, 3.2_
  
  - [x] 12.2 Write unit test for Services page
    - Test all 9 services are displayed
    - Test grid layout is applied
    - _Requirements: 3.1, 3.2_

- [ ] 13. Build Portfolio page
  - [x] 13.1 Create app/portfolio/page.tsx
    - Add hero section with page title
    - Add PortfolioGrid component (all projects)
    - Add filter/category navigation (optional)
    - Apply consistent styling and animations
    - _Requirements: 1.1, 4.1_
  
  - [x] 13.2 Write integration test for Portfolio page
    - Test portfolio grid is displayed
    - Test image lazy loading
    - Test portfolio item hover interactions
    - _Requirements: 4.1, 4.3, 4.5_

- [ ] 14. Build Contact page
  - [x] 14.1 Create app/contact/page.tsx
    - Add hero section with page title
    - Add ContactForm component
    - Add company information and location
    - Apply consistent styling
    - _Requirements: 1.1, 5.1, 5.7_
  
  - [x] 14.2 Write integration test for Contact page
    - Test form submission flow
    - Test validation errors display
    - Test success message display
    - _Requirements: 5.2, 5.3, 5.4, 5.5, 5.6_

- [ ] 15. Responsive design implementation
  - [x] 15.1 Verify and refine responsive layouts
    - Test all pages at mobile breakpoint (< 768px)
    - Test all pages at tablet breakpoint (768px - 1024px)
    - Test all pages at desktop breakpoint (> 1024px)
    - Ensure service cards stack vertically on mobile
    - Ensure portfolio items adjust grid columns on mobile
    - Verify navigation switches to mobile menu on mobile
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_
  
  - [x] 15.2 Write unit tests for responsive behavior
    - Test mobile layout rendering
    - Test tablet layout rendering
    - Test desktop layout rendering
    - _Requirements: 7.1, 7.2, 7.3_

- [ ] 16. Performance optimization
  - [x] 16.1 Optimize images
    - Ensure all images use next/image component
    - Configure proper width and height attributes
    - Set loading="lazy" for below-fold images
    - Add blur placeholders where appropriate
    - Optimize image file sizes
    - _Requirements: 6.3, 6.4_
  
  - [x] 16.2 Optimize bundle size
    - Review and remove unused dependencies
    - Verify no heavy libraries are included (Three.js, etc.)
    - Use dynamic imports for heavy components
    - Configure TailwindCSS purging
    - _Requirements: 6.5, 6.6_
  
  - [x] 16.3 Add metadata and SEO
    - Configure metadata in each page
    - Add Open Graph tags
    - Add structured data
    - Configure sitemap
    - _Requirements: 1.1_
  
  - [x] 16.4 Write unit test for dependency constraints
    - Test package.json doesn't include Three.js or heavy libraries
    - _Requirements: 6.6_

- [ ] 17. Error handling and boundaries
  - [x] 17.1 Create error boundary components
    - Create app/error.tsx for root error boundary
    - Add error logging
    - Style error pages consistently
    - _Requirements: 5.6_
  
  - [x] 17.2 Add loading states
    - Create app/loading.tsx for page loading states
    - Add skeleton loaders for async content
    - _Requirements: 5.4_

- [ ] 18. Final checkpoint and testing
  - [x] 18.1 Run all tests
    - Execute unit tests
    - Execute property-based tests
    - Execute integration tests
    - Verify all tests pass
  
  - [x] 18.2 Manual testing checklist
    - Test navigation flow through all pages
    - Test form submission with valid and invalid data
    - Test responsive behavior on different devices
    - Test hover interactions on all interactive elements
    - Verify animations are subtle and performant
  
  - [x] 18.3 Performance audit
    - Run Lighthouse audit on all pages
    - Verify performance score is 90+
    - Verify load time is under 2 seconds
    - Check Core Web Vitals (LCP, FID, CLS)
    - _Requirements: 6.1, 6.2_
  
  - [x] 18.4 Final review
    - Review code for consistency and best practices
    - Verify all requirements are met
    - Check for any console errors or warnings
    - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional testing tasks and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties across all inputs (minimum 100 iterations each)
- Unit tests validate specific examples, edge cases, and error conditions
- The implementation follows a bottom-up approach: foundation → components → pages → integration
- All images must use next/image for optimization
- All animations must use Framer Motion (no heavy libraries)
- Bundle size must remain under 200KB gzipped
- Performance target: Lighthouse score 90+, load time under 2 seconds
