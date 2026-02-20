# Manual Testing Checklist - Mero Tech Website

## Overview
This checklist provides a comprehensive guide for manually testing the Mero Tech marketing website. Complete each section to ensure all functionality, responsive behavior, interactions, and animations work as expected.

**Testing Date:** _____________  
**Tester Name:** _____________  
**Browser/Device:** _____________

---

## 1. Navigation Flow Testing

### Desktop Navigation
- [ ] Navigate to Home page (/) - page loads successfully
- [ ] Click "What We Do" link - navigates to /what-we-do
- [ ] Click "Services" link - navigates to /services
- [ ] Click "Portfolio" link - navigates to /portfolio
- [ ] Click "Contact" link - navigates to /contact
- [ ] Verify current page is highlighted in navigation menu
- [ ] Navigation header is visible and consistent across all pages
- [ ] Logo/brand name links back to home page

### Mobile Navigation (< 768px)
- [ ] Hamburger menu icon is visible on mobile
- [ ] Click hamburger icon - mobile menu slides in
- [ ] All 5 navigation links are visible in mobile menu
- [ ] Click each link - navigates correctly and menu closes
- [ ] Click outside menu or close button - menu closes
- [ ] Menu animation is smooth (slide-in/slide-out)

### Hero Section CTAs
- [ ] Home page: "Book a Consultation" button navigates to /contact
- [ ] Home page: "View Our Work" button navigates to /portfolio
- [ ] CTA buttons are clearly visible and styled correctly

---

## 2. Form Submission Testing

### Valid Data Submission
- [ ] Navigate to Contact page (/contact)
- [ ] Fill in Name: "John Doe"
- [ ] Fill in Email: "john@example.com"
- [ ] Fill in Company: "Acme Corp"
- [ ] Select Project Type: "Web Application"
- [ ] Fill in Message: "I need help building a web application for my business"
- [ ] Click Submit button
- [ ] Form shows loading state during submission
- [ ] Success message appears: "Form submitted successfully" or similar
- [ ] Form fields are cleared after successful submission

### Invalid Data - Empty Fields
- [ ] Navigate to Contact page
- [ ] Leave all fields empty
- [ ] Click Submit button
- [ ] Validation errors appear for all required fields
- [ ] Error messages are clear and specific:
  - [ ] Name: "Name must be at least 2 characters"
  - [ ] Email: "Please enter a valid email address"
  - [ ] Company: "Company name must be at least 2 characters"
  - [ ] Project Type: "Please select a project type"
  - [ ] Message: "Message must be at least 10 characters"

### Invalid Data - Email Format
- [ ] Fill in Name: "John Doe"
- [ ] Fill in Email: "invalid-email" (no @ symbol)
- [ ] Fill in Company: "Acme Corp"
- [ ] Select Project Type: "Web Application"
- [ ] Fill in Message: "Test message"
- [ ] Click Submit button
- [ ] Email validation error appears: "Please enter a valid email address"

### Invalid Data - Field Length Constraints
- [ ] Test Name field with 1 character - shows error
- [ ] Test Name field with 101+ characters - shows error
- [ ] Test Message field with < 10 characters - shows error
- [ ] Test Message field with 1001+ characters - shows error

### Form Error Recovery
- [ ] Submit form with errors
- [ ] Correct one field
- [ ] Verify error for that field disappears
- [ ] Verify other field errors remain
- [ ] Correct all fields
- [ ] Submit successfully

### Location Display
- [ ] Verify "Mt Pleasant, Harare" is displayed on Contact page

---

## 3. Responsive Behavior Testing

### Mobile (< 768px)
Test on actual mobile device or browser DevTools at 375px width:

#### Layout
- [ ] Navigation switches to hamburger menu
- [ ] Hero section text is readable and properly sized
- [ ] Service cards stack vertically (1 column)
- [ ] Portfolio items stack vertically (1 column)
- [ ] Contact form fields stack vertically
- [ ] All text is readable without horizontal scrolling
- [ ] Images scale appropriately
- [ ] Buttons are touch-friendly (adequate size)

#### Content
- [ ] All content is accessible without horizontal scroll
- [ ] Spacing between sections is appropriate
- [ ] No overlapping elements
- [ ] Glass cards render correctly with blur effect

### Tablet (768px - 1024px)
Test at 768px and 1024px widths:

#### Layout
- [ ] Navigation shows full horizontal menu
- [ ] Service cards display in 2 columns
- [ ] Portfolio items display in 2 columns
- [ ] Hero section scales appropriately
- [ ] Form layout is comfortable to use
- [ ] Spacing is balanced

### Desktop (> 1024px)
Test at 1280px, 1440px, and 1920px widths:

#### Layout
- [ ] Navigation shows full horizontal menu
- [ ] Service cards display in 3 columns
- [ ] Portfolio items display in 3 columns
- [ ] Hero section is centered and well-proportioned
- [ ] Maximum content width is reasonable (not too wide)
- [ ] Whitespace is used effectively

### Orientation Changes
- [ ] Rotate mobile device from portrait to landscape
- [ ] Layout adapts appropriately
- [ ] No broken layouts or overlapping content

---

## 4. Hover Interactions Testing

### Navigation
- [ ] Hover over navigation links - visual feedback (color change, underline, etc.)
- [ ] Active page link has distinct styling
- [ ] Hover effects are smooth and immediate

### Buttons
- [ ] Hover over primary CTA buttons - visual feedback
- [ ] Hover over secondary CTA buttons - visual feedback
- [ ] Button hover animation is smooth
- [ ] Cursor changes to pointer on hover

### Service Cards
- [ ] Hover over each service card - lift animation occurs
- [ ] Card elevates (moves up slightly)
- [ ] Subtle glow effect appears
- [ ] Animation is smooth (not jarring)
- [ ] Card returns to original state when hover ends
- [ ] Test all 9 service cards

### Portfolio Items
- [ ] Hover over each portfolio item - overlay appears
- [ ] "View Project" text is visible in overlay
- [ ] Overlay animation is smooth
- [ ] Image remains visible through overlay
- [ ] Hover effect works on all portfolio items

### Glass Cards
- [ ] Hover over glass cards - background becomes slightly more opaque
- [ ] Border color intensifies slightly
- [ ] Transition is smooth

### Links
- [ ] Hover over text links - color change or underline appears
- [ ] Cursor changes to pointer

---

## 5. Animation Performance Testing

### Hero Section Gradient Animation
- [ ] Gradient background animates subtly
- [ ] Animation is smooth (no stuttering)
- [ ] Animation doesn't cause performance issues
- [ ] Animation is not distracting or overwhelming

### Page Transitions
- [ ] Navigate between pages - smooth transitions
- [ ] No jarring layout shifts
- [ ] Content fades in smoothly

### Scroll Animations
- [ ] Scroll down home page - elements fade in as they enter viewport
- [ ] Fade-in animations are subtle and smooth
- [ ] Animations don't cause scroll jank
- [ ] Stagger effect on service cards (if implemented)

### Card Hover Animations
- [ ] Service card hover - lift animation is smooth (< 0.3s)
- [ ] Portfolio item hover - overlay animation is smooth
- [ ] No lag or stuttering during hover
- [ ] Multiple rapid hovers don't break animation

### Mobile Menu Animation
- [ ] Open mobile menu - slide-in animation is smooth
- [ ] Close mobile menu - slide-out animation is smooth
- [ ] Animation duration feels natural (not too fast or slow)

### Icon Animations
- [ ] Service icons have subtle animation on hover
- [ ] Icon animations are lightweight
- [ ] No performance impact

### Performance Checks
- [ ] Open browser DevTools Performance tab
- [ ] Record while interacting with animations
- [ ] Verify frame rate stays at 60fps
- [ ] No long tasks or layout thrashing
- [ ] CPU usage remains reasonable

### Animation Subtlety
- [ ] Animations enhance experience without being distracting
- [ ] No overdone or gimmicky effects
- [ ] Animations follow clean, professional aesthetic
- [ ] No 3D effects or GPU particle systems

---

## 6. Image Loading and Optimization

### Image Display
- [ ] All images load correctly
- [ ] No broken image icons
- [ ] Images are sharp and clear (not pixelated)
- [ ] Images maintain aspect ratio

### Lazy Loading
- [ ] Open DevTools Network tab
- [ ] Navigate to Portfolio page
- [ ] Scroll down slowly
- [ ] Verify images below fold load only when scrolled into view
- [ ] Check Network tab for lazy loading behavior

### Image Optimization
- [ ] Images use WebP format (check Network tab)
- [ ] Images have appropriate dimensions (not oversized)
- [ ] Blur placeholders appear while images load (if implemented)

---

## 7. Cross-Browser Testing

Test on multiple browsers:

### Chrome/Edge (Chromium)
- [ ] All functionality works
- [ ] Animations are smooth
- [ ] Layout is correct
- [ ] Forms submit successfully

### Firefox
- [ ] All functionality works
- [ ] Animations are smooth
- [ ] Layout is correct
- [ ] Forms submit successfully
- [ ] Backdrop blur effect works

### Safari (macOS/iOS)
- [ ] All functionality works
- [ ] Animations are smooth
- [ ] Layout is correct
- [ ] Forms submit successfully
- [ ] Backdrop blur effect works
- [ ] Touch interactions work on iOS

---

## 8. Accessibility Quick Checks

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Focus indicators are visible
- [ ] Can navigate entire site with keyboard only
- [ ] Can submit form with Enter key
- [ ] Can close mobile menu with Escape key

### Screen Reader (Optional)
- [ ] Navigation links are announced correctly
- [ ] Form labels are associated with inputs
- [ ] Error messages are announced
- [ ] Images have alt text

---

## 9. Content Verification

### Home Page
- [ ] Headline: "Building Intelligent Systems for Modern Businesses"
- [ ] Subheadline: "AI Automation. Internal Tools. Scalable Infrastructure."
- [ ] "What We Do" section with value proposition paragraph
- [ ] Services grid with 9 services
- [ ] Portfolio section with featured projects
- [ ] Contact CTA section

### What We Do Page
- [ ] Page title/hero section
- [ ] Detailed value proposition content
- [ ] Company information and approach
- [ ] CTA to services page

### Services Page
- [ ] Page title/hero section
- [ ] All 9 services displayed:
  - [ ] AI Automations & Workflows
  - [ ] AI Agents & Chatbots
  - [ ] Internal Business Tools
  - [ ] Web Applications
  - [ ] Website Development
  - [ ] API Integrations
  - [ ] Cloud Infrastructure
  - [ ] DevOps Engineering
  - [ ] AI Consulting
- [ ] Service descriptions are clear and accurate
- [ ] CTA to contact page

### Portfolio Page
- [ ] Page title/hero section
- [ ] Portfolio grid with all projects
- [ ] Each project shows: name, category, description, tech stack
- [ ] Projects are clickable

### Contact Page
- [ ] Page title/hero section
- [ ] Contact form with all 5 fields
- [ ] Location: "Mt Pleasant, Harare"
- [ ] Company information

---

## 10. Performance Perception

### Load Times
- [ ] Home page loads quickly (feels under 2 seconds)
- [ ] Subsequent pages load quickly
- [ ] No long white screens or loading delays
- [ ] Images appear progressively

### Interaction Responsiveness
- [ ] Buttons respond immediately to clicks
- [ ] Form inputs respond immediately to typing
- [ ] Navigation is instant
- [ ] No lag or delay in interactions

### Smooth Experience
- [ ] Scrolling is smooth (no jank)
- [ ] Animations don't cause stuttering
- [ ] Page feels fast and responsive
- [ ] No layout shifts during page load

---

## 11. Error Scenarios

### Network Errors
- [ ] Disconnect internet
- [ ] Try to submit contact form
- [ ] Verify error message appears
- [ ] Reconnect internet
- [ ] Retry submission - works successfully

### Invalid Routes
- [ ] Navigate to /invalid-page
- [ ] Verify 404 page or error handling
- [ ] Can navigate back to valid pages

---

## 12. Visual Design Verification

### Design System
- [ ] Dark background with subtle gradient
- [ ] Glass cards have semi-transparent background
- [ ] Glass cards have backdrop blur effect
- [ ] Glass cards have subtle border
- [ ] Neon accent colors used sparingly
- [ ] Typography is clear and readable
- [ ] Plenty of whitespace between sections

### Consistency
- [ ] All pages follow same design language
- [ ] Navigation is consistent across pages
- [ ] Buttons have consistent styling
- [ ] Cards have consistent styling
- [ ] Spacing is consistent

### Professional Appearance
- [ ] Design looks modern and professional
- [ ] No outdated or amateurish elements
- [ ] Clean SaaS aesthetic (like Vercel, Stripe, Linear)
- [ ] No overdone animations or gimmicks

---

## Summary

**Total Items Tested:** _____  
**Items Passed:** _____  
**Items Failed:** _____  
**Critical Issues:** _____

### Critical Issues Found
1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

### Minor Issues Found
1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

### Notes
_______________________________________________
_______________________________________________
_______________________________________________

**Overall Assessment:** [ ] Pass [ ] Fail [ ] Pass with Minor Issues

**Tester Signature:** _______________ **Date:** _______________
